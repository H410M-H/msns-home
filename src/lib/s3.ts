import { S3Client, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env.js";

export const s3Client = new S3Client({
  region: env.AWS_DEFAULT_REGION,
  endpoint: env.AWS_ENDPOINT_URL,
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

export async function listGalleryImages(): Promise<GalleryImage[]> {
  const [galleryResponse, videosResponse] = await Promise.all([
    s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "gallery/" })),
    s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "videos/" }))
  ]);
  const contents = [
    ...(galleryResponse.Contents ?? []),
    ...(videosResponse.Contents ?? [])
  ];

  return contents
    .filter((obj) => obj.Key && !obj.Key.endsWith("/"))
    .map((obj) => ({
      key: obj.Key!,
      url: `/api/images/${obj.Key!}`,
      lastModified: obj.LastModified?.toISOString(),
      size: obj.Size,
    }))
    .sort((a, b) => {
      // Sort newest first
      if (a.lastModified && b.lastModified) {
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
      return 0;
    });
}

/**
 * Finds an image by its filename (basename) across all gallery folders and videos folder.
 * Returns the full S3 key if found, or null if not.
 * This allows msns-home components to reference images by filename only,
 * so moving images between folders in the admin gallery won't break references.
 */
export async function findImageByFilename(filename: string): Promise<string | null> {
  const [galleryResponse, videosResponse] = await Promise.all([
    s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "gallery/" })),
    s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "videos/" }))
  ]);
  const contents = [
    ...(galleryResponse.Contents ?? []),
    ...(videosResponse.Contents ?? [])
  ];

  for (const obj of contents) {
    if (!obj.Key || obj.Key.endsWith("/")) continue;
    const basename = obj.Key.split("/").pop();
    if (basename === filename) {
      return obj.Key;
    }
  }

  return null;
}

/**
 * Resolves multiple filenames to their full S3 keys in a single listing call.
 * Returns a map of filename -> full key (or null if not found).
 */
export async function resolveImageFilenames(filenames: string[]): Promise<Record<string, string | null>> {
  const [galleryResponse, videosResponse] = await Promise.all([
    s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "gallery/" })),
    s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: "videos/" }))
  ]);
  const contents = [
    ...(galleryResponse.Contents ?? []),
    ...(videosResponse.Contents ?? [])
  ];

  // Build a lookup map: basename -> full key
  const basenameMap = new Map<string, string>();
  for (const obj of contents) {
    if (!obj.Key || obj.Key.endsWith("/")) continue;
    const basename = obj.Key.split("/").pop();
    if (basename) {
      basenameMap.set(basename, obj.Key);
    }
  }

  // Resolve each requested filename
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
