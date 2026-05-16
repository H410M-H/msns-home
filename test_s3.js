// @ts-nocheck
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

async function test() {
  try {
    const data = await s3Client.send(new ListObjectsV2Command({ Bucket: process.env.S3_BUCKET_NAME }));
    console.log("Success! Bucket exists. Object count:", data.KeyCount);
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

test();
