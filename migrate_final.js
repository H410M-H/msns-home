// @ts-nocheck
import fs from 'fs/promises';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env
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
const CLOUDINARY_REGEX = /https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\/[^"'\s`)\]]+/g;

function parseCloudinaryUrl(url) {
  const isVideo = url.includes('/video/upload/');
  const afterUpload = url.replace(/https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\//, '');
  const parts = afterUpload.split('/');
  const cleanParts = parts.filter(p => !p.includes(',') && !/^v\d+$/.test(p));
  const filename = cleanParts[cleanParts.length - 1];
  const subPath = cleanParts.length > 1 ? cleanParts.slice(0, -1).join('/') + '/' : '';
  
  let category;
  if (isVideo) category = 'videos';
  else if (filename.includes('LOGO') || filename.includes('logo') || filename.includes('off_logo') || filename.includes('mono_MS_Naz')) category = 'logos';
  else if (filename.includes('whatsapp') || filename.includes('insta') || filename.includes('facebook') || filename.includes('mail-3d')) category = 'social';
  else if (filename.includes('hex-one')) category = 'placeholders';
  else category = 'gallery';
  
  const s3Key = `${category}/${subPath}${filename}`;
  if (isVideo && !filename.includes('.')) return { filename: filename + '.mp4', s3Key: s3Key + '.mp4', category };
  return { filename, s3Key, category };
}

async function run() {
  console.log('🚀 Starting Final Migration from diff files');
  
  const allUrls = new Set();
  
  for (const proj of ['msns-home', 'msns-build']) {
    try {
      const txt = await fs.readFile(path.join(__dirname, '..', proj, 'old_urls.txt'), 'utf-16le'); // PowerShell out-file uses UTF-16LE
      const matches = txt.match(CLOUDINARY_REGEX);
      if (matches) {
        matches.forEach(u => allUrls.add(u));
      }
    } catch (e) {
      // Fallback to utf-8 just in case
      try {
        const txt2 = await fs.readFile(path.join(__dirname, '..', proj, 'old_urls.txt'), 'utf-8');
        const matches2 = txt2.match(CLOUDINARY_REGEX);
        if (matches2) matches2.forEach(u => allUrls.add(u));
      } catch (e2) {}
    }
  }

  console.log(`Found ${allUrls.size} unique URLs to migrate`);

  const processedUrls = new Map();
  let successCount = 0;
  let failCount = 0;

  for (const url of allUrls) {
    const { s3Key } = parseCloudinaryUrl(url);
    if (processedUrls.has(url)) continue;
    
    try {
      console.log(`\n⬇️ Downloading: ${url}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      
      const buffer = Buffer.from(await res.arrayBuffer());
      const contentType = res.headers.get('content-type') || 'application/octet-stream';
      
      console.log(`⬆️ Uploading as: ${s3Key} (${(buffer.length / 1024).toFixed(1)} KB)`);
      
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));
      
      processedUrls.set(url, s3Key);
      successCount++;
      console.log(`✅ Done`);
    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\nMigration complete! ${successCount} uploaded, ${failCount} failed.`);
}

run().catch(console.error);
