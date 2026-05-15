// @ts-nocheck
import fs from 'fs/promises';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env from msns-home
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME;

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

const CLOUDINARY_REGEX = /https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\/[^"'\s`)\]]+/g;

/**
 * Extract a clean filename from a Cloudinary URL.
 * Strips version numbers, transform params, and folder prefixes.
 * Returns { filename, category } where category is used as the S3 folder prefix.
 */
function parseCloudinaryUrl(url) {
  // Determine category from URL type
  const isVideo = url.includes('/video/upload/');

  // Remove the base cloudinary URL to get the path after /upload/
  const afterUpload = url.replace(/https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\//, '');

  // Split by /
  const parts = afterUpload.split('/');

  // Filter out transform params (contain commas like w_1600,h_1200) and version strings (v1234567890)
  const cleanParts = parts.filter(p => !p.includes(',') && !/^v\d+$/.test(p));

  // The remaining parts form the path. Last part is the filename.
  const filename = cleanParts[cleanParts.length - 1];

  // Sub-folders if any (e.g., "designJpg/filename.png")
  const subPath = cleanParts.length > 1 ? cleanParts.slice(0, -1).join('/') + '/' : '';

  // Determine S3 category folder
  let category;
  if (isVideo) {
    category = 'videos';
  } else if (filename.includes('LOGO') || filename.includes('logo') || filename.includes('off_logo') || filename.includes('mono_MS_Naz')) {
    category = 'logos';
  } else if (filename.includes('whatsapp') || filename.includes('insta') || filename.includes('facebook') || filename.includes('mail-3d')) {
    category = 'social';
  } else if (filename.includes('hex-one')) {
    category = 'placeholders';
  } else {
    category = 'gallery';
  }

  // Build the S3 key
  const s3Key = `${category}/${subPath}${filename}`;

  // If it's a video and lacks an extension, append .mp4
  if (isVideo && !filename.includes('.')) {
    return { filename: filename + '.mp4', s3Key: s3Key + '.mp4', category };
  }

  return { filename, s3Key, category };
}

async function run() {
  console.log('🚀 Starting Cloudinary → S3 Migration');
  console.log(`   Bucket: ${BUCKET}`);
  console.log(`   Endpoint: ${process.env.AWS_ENDPOINT_URL}\n`);

  // Scan BOTH projects
  const projectDirs = [
    { name: 'msns-home', dir: path.join(__dirname, 'src') },
    { name: 'msns-build', dir: path.join(__dirname, '..', 'msns-build', 'src') },
  ];

  const processedUrls = new Map(); // original URL -> s3Key
  const allUrls = new Set();

  // Phase 1: Collect all unique URLs
  console.log('📋 Phase 1: Scanning for Cloudinary URLs...\n');

  for (const project of projectDirs) {
    try {
      const allFiles = await getFiles(project.dir);
      const tsFiles = allFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js'));

      for (const file of tsFiles) {
        const content = await fs.readFile(file, 'utf-8');
        const matches = content.match(CLOUDINARY_REGEX);

        if (matches && matches.length > 0) {
          console.log(`  [${project.name}] Found ${matches.length} URLs in ${path.relative(path.join(__dirname, '..'), file)}`);
          matches.forEach(url => allUrls.add(url));
        }
      }
    } catch (err) {
      console.warn(`  ⚠️  Could not scan ${project.name}: ${err.message}`);
    }
  }

  // Also scan next.config.js files
  for (const configFile of [
    path.join(__dirname, 'next.config.js'),
    path.join(__dirname, '..', 'msns-build', 'next.config.js'),
  ]) {
    try {
      const content = await fs.readFile(configFile, 'utf-8');
      const matches = content.match(CLOUDINARY_REGEX);
      if (matches) {
        matches.forEach(url => allUrls.add(url));
      }
    } catch { }
  }

  console.log(`\n  Total unique URLs found: ${allUrls.size}\n`);

  // Phase 2: Download and upload each unique URL
  console.log('📤 Phase 2: Downloading and uploading to S3...\n');

  let successCount = 0;
  let failCount = 0;

  for (const url of allUrls) {
    const { s3Key } = parseCloudinaryUrl(url);

    if (processedUrls.has(url)) continue;

    try {
      console.log(`  ⬇️  Downloading: ${url.substring(0, 80)}...`);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get('content-type') || 'application/octet-stream';

      console.log(`  ⬆️  Uploading as: ${s3Key} (${(buffer.length / 1024).toFixed(1)} KB)`);

      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      processedUrls.set(url, s3Key);
      successCount++;
      console.log(`  ✅  Done: ${s3Key}\n`);
    } catch (error) {
      console.error(`  ❌  Failed: ${url} → ${error.message}\n`);
      failCount++;
    }
  }

  // Phase 3: Print mapping
  console.log('\n📄 Phase 3: URL Mapping Report\n');
  console.log('━'.repeat(80));

  for (const [original, s3Key] of processedUrls.entries()) {
    console.log(`  ${original.substring(0, 70)}...`);
    console.log(`  → /api/images/${s3Key}\n`);
  }

  console.log('━'.repeat(80));
  console.log(`\n✅ Migration complete! ${successCount} uploaded, ${failCount} failed.`);
  console.log(`\n⚠️  IMPORTANT: Do NOT modify source files with this script.`);
  console.log(`   URL replacements will be done manually in the code.\n`);

  // Save mapping to file for reference
  const mapping = {};
  for (const [original, s3Key] of processedUrls.entries()) {
    mapping[original] = `/api/images/${s3Key}`;
  }

  await fs.writeFile(
    path.join(__dirname, 'migration_mapping.json'),
    JSON.stringify(mapping, null, 2),
    'utf-8'
  );
  console.log('📝 Saved mapping to migration_mapping.json');
}

run().catch(console.error);
