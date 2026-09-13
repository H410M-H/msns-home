// @ts-nocheck
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpoint = 'https://c678cf5c0fc5ef3806edacc18e6a762d.r2.cloudflarestorage.com';
const bucket = 'msns';
const accessKeyId = 'f3afb5cbae3f64a15d4030d65e741736';
const secretAccessKey = '3d90d3b9db6197138dd290f0122c1fe3198ddc7767e77a22d9a6115dd3db7f91';

const s3 = new S3Client({
  endpoint,
  region: 'auto',
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

const CLOUDINARY_REGEX = /https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\/[^\s"'`\]\>]+/g;

function parseCloudinaryUrl(url) {
  const isVideo = url.includes('/video/upload/');
  const afterUpload = url.replace(/https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\//, '');
  const parts = afterUpload.split('/');
  const cleanParts = parts.filter(p => !p.includes(',') && !/^v\d+$/.test(p));
  let filename = cleanParts[cleanParts.length - 1];
  // Strip trailing punctuation
  filename = filename.replace(/[,\\"'\`\]\)>]+$/, '');
  const subPath = cleanParts.length > 1 ? cleanParts.slice(0, -1).join('/') + '/' : '';

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

  let s3Key = `${category}/${subPath}${filename}`;
  if (isVideo && !filename.includes('.')) {
    s3Key += '.mp4';
    filename += '.mp4';
  }

  return { filename, s3Key, category };
}

async function run() {
  console.log('🚀 Starting Cloudinary → Cloudflare R2 (msns) full migration');
  console.log(`   Bucket: ${bucket}`);
  console.log(`   Endpoint: ${endpoint}\n`);

  const urls = new Set();

  const file1 = path.join(__dirname, '..', 'old_urls.txt');
  const file2 = path.join(__dirname, '..', '..', 'msns-build', 'old_urls.txt');

  [file1, file2].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath);
      let str = raw.toString('utf16le');
      let matches = str.match(CLOUDINARY_REGEX);
      if (!matches || matches.length === 0) {
        str = raw.toString('utf-8');
        matches = str.match(CLOUDINARY_REGEX);
      }
      if (matches) {
        matches.forEach(u => {
          const clean = u.replace(/[,\\"'\`\]\)>]+$/, '');
          urls.add(clean);
        });
      }
    }
  });

  console.log(`📋 Found ${urls.size} unique Cloudinary URLs to migrate.\n`);

  let successCount = 0;
  let failCount = 0;

  for (const rawUrl of urls) {
    const cleanUrl = rawUrl.trim();
    if (!cleanUrl.startsWith('http')) continue;

    const { s3Key } = parseCloudinaryUrl(cleanUrl);

    try {
      console.log(`\n⬇️ Fetching: ${cleanUrl}`);
      const res = await fetch(cleanUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get('content-type') || (cleanUrl.includes('/video/') ? 'video/mp4' : 'image/jpeg');

      console.log(`⬆️ Uploading to R2: ${s3Key} (${(buffer.length / 1024).toFixed(1)} KB, ${contentType})`);

      await s3.send(new PutObjectCommand({
        Bucket: bucket,
        Key: s3Key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      successCount++;
      console.log(`✅ Success: ${s3Key}`);
    } catch (err) {
      console.error(`❌ Failed (${cleanUrl}): ${err.message}`);
      failCount++;
    }
  }

  console.log(`\n🎉 Migration finished!`);
  console.log(`   Successes: ${successCount}`);
  console.log(`   Failures: ${failCount}`);

  // List final objects in bucket
  try {
    const listRes = await s3.send(new ListObjectsV2Command({ Bucket: bucket }));
    console.log(`\n📦 Total objects in msns bucket: ${listRes.KeyCount}`);
  } catch (err) {
    console.error(`Failed to list final bucket contents: ${err.message}`);
  }
}

run().catch(console.error);
