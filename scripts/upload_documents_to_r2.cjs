const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: 'c:/msns/msns-home/.env' });

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION || 'auto',
  endpoint: process.env.AWS_ENDPOINT_URL || 'https://c678cf5c0fc5ef3806edacc18e6a762d.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'msns';
const DOCS_DIR = 'c:/msns/msns-home/public/documents';

async function uploadAll() {
  console.log('Uploading official documents to Cloudflare R2 bucket:', BUCKET);
  const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.pdf'));

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const body = fs.readFileSync(filePath);
    const key = `documents/${file}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: 'application/pdf',
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    console.log(`[+] Uploaded: ${key} (${body.length} bytes)`);
  }

  // Also upload the uniform guidelines image
  const imgPath = 'c:/msns/msns-home/public/images/uniform-leadership-guidelines.jpg';
  if (fs.existsSync(imgPath)) {
    const imgBody = fs.readFileSync(imgPath);
    const imgKey = 'documents/uniform-leadership-guidelines.jpg';
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: imgKey,
      Body: imgBody,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    console.log(`[+] Uploaded: ${imgKey} (${imgBody.length} bytes)`);
  }

  // Verify
  console.log('\nVerifying objects in Cloudflare R2...');
  const res = await s3Client.send(new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: 'documents/',
  }));

  console.log('Objects currently in Cloudflare R2 documents/ folder:');
  if (res.Contents) {
    res.Contents.forEach(obj => {
      console.log(` - ${obj.Key} (${obj.Size} bytes, modified: ${obj.LastModified})`);
    });
  } else {
    console.log('No objects found');
  }
}

uploadAll().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
