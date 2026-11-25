import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { unstable_cache } from "next/cache";
import { env } from "~/env.js";

// Clean endpoint host (strip bucket path suffix if present)
let endpointHost = env.AWS_ENDPOINT_URL;
try {
  const url = new URL(env.AWS_ENDPOINT_URL);
  if (url.pathname && url.pathname !== "/") {
    endpointHost = url.origin;
  }
} catch {
  // Ignore URL parse error
}

export const s3Client = new S3Client({
  region: env.AWS_DEFAULT_REGION ?? "auto",
  endpoint: endpointHost,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export const BUCKET = env.AWS_S3_BUCKET_NAME;

export interface GalleryImage {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
}

export interface ListedObject {
  key: string;
  lastModified?: string;
  size?: number;
}

/** Cache tag for every bucket listing; revalidate it after uploads or deletes. */
export const S3_LISTING_TAG = "s3-listing";

/**
 * Lists every object under a prefix, following ContinuationToken so results
 * past the 1000-key page limit are not silently dropped.
 */
async function listAllUncached(prefix: string): Promise<ListedObject[]> {
  const out: ListedObject[] = [];
  let token: string | undefined;
  do {
    const page = await s3Client.send(
      new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token }),
    );
    for (const obj of page.Contents ?? []) {
      if (!obj.Key || obj.Key.endsWith("/")) continue;
      out.push({ key: obj.Key, lastModified: obj.LastModified?.toISOString(), size: obj.Size });
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return out;
}

/**
 * Cached bucket listing (ListObjectsV2 is a billed Class-A operation). Results are
 * shared across requests for an hour, or until S3_LISTING_TAG is revalidated.
 */
export const listObjects = unstable_cache(listAllUncached, ["s3-list-objects"], {
  revalidate: 3600,
  tags: [S3_LISTING_TAG],
});

/** Gallery and video objects, newest first. */
async function listMediaObjects(): Promise<ListedObject[]> {
  const [gallery, videos] = await Promise.all([listObjects("gallery/"), listObjects("videos/")]);
  return [...gallery, ...videos].sort((a, b) => {
    if (a.lastModified && b.lastModified) {
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    }
    return 0;
  });
}

export async function listGalleryImages(): Promise<GalleryImage[]> {
  try {
    const contents = await listMediaObjects();
    return contents.map((obj) => ({
      key: obj.key,
      url: `/api/images/${obj.key}`,
      lastModified: obj.lastModified,
      size: obj.size,
    }));
  } catch (error) {
    console.error("Error fetching gallery images from S3:", error);
    return [];
  }
}

/**
 * Short names used by the site that match by substring rather than by full
 * filename. Substring matching is limited to these so arbitrary requests can't
 * resolve to an unrelated image (which would then be cached).
 */
const LEGACY_SUBSTRING_ALIASES = new Set([
  "270675",
  "270676",
  "270677",
  "270678",
  "ateeqa",
  "momina",
  "rehan",
]);

/**
 * Finds an image by its filename (basename) across all gallery folders and videos folder.
 * Returns the full S3 key if found, or null if not.
 * This allows msns-home components to reference images by filename only,
 * so moving images between folders in the admin gallery won't break references.
 */
export async function findImageByFilename(filename: string): Promise<string | null> {
  const contents = await listMediaObjects();

  const searchLower = filename.toLowerCase().trim();
  const searchClean = searchLower.replace(/\.[^/.]+$/, "");

  // 1. Exact basename match
  for (const obj of contents) {
    if (obj.key.split("/").pop() === filename) return obj.key;
  }

  // 2. Case-insensitive basename match (with or without extension)
  for (const obj of contents) {
    const baseLower = (obj.key.split("/").pop() ?? "").toLowerCase();
    const baseClean = baseLower.replace(/\.[^/.]+$/, "");
    if (baseLower === searchLower || baseClean === searchClean) return obj.key;
  }

  // 3. Social post index (e.g. social_posts_1, social_posts_2)
  if (searchClean.startsWith("social_posts_") || searchClean.startsWith("notification_")) {
    const indexMatch = /\d+$/.exec(searchClean);
    const index = indexMatch ? parseInt(indexMatch[0], 10) - 1 : 0;
    const matching = contents.filter((obj) => {
      const lower = obj.key.toLowerCase();
      return lower.includes("social_posts") || lower.includes("notification");
    });
    if (matching[index]) return matching[index].key;
  }

  // 4. Substring match, only for the known short names the site uses
  if (LEGACY_SUBSTRING_ALIASES.has(searchClean)) {
    for (const obj of contents) {
      if (obj.key.toLowerCase().includes(searchClean)) return obj.key;
    }
  }

  return null;
}

/**
 * Resolves multiple filenames to their full S3 keys using the cached listing.
 * Returns a map of filename -> full key (or null if not found).
 */
export async function resolveImageFilenames(filenames: string[]): Promise<Record<string, string | null>> {
  const contents = await listMediaObjects();
  const basenameMap = new Map<string, string>();
  for (const obj of contents) {
    const basename = obj.key.split("/").pop();
    if (basename) basenameMap.set(basename, obj.key);
  }
  const result: Record<string, string | null> = {};
  for (const filename of filenames) {
    result[filename] = basenameMap.get(filename) ?? null;
  }
  return result;
}

export async function uploadToS3(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  });

  await s3Client.send(command);
  return key;
}

export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  await s3Client.send(command);
}

export async function getFromS3(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return s3Client.send(command);
}
