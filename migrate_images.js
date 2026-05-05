// @ts-nocheck
import fs from 'fs/promises';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fileURLToPath } from 'url';


const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

const CLOUDINARY_REGEX = /https:\/\/res\.cloudinary\.com\/dvvbxrs55\/(?:image|video)\/upload\/[^"'\s`]+/g;

async function run() {
  const allFiles = await getFiles(path.join(__dirname, 'src'));
  const tsFiles = allFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

  const processedUrls = new Map(); // original URL -> new S3 key

  for (const file of tsFiles) {
    let content = await fs.readFile(file, 'utf-8');
    const matches = content.match(CLOUDINARY_REGEX);
    
    if (matches && matches.length > 0) {
      console.log(`Found ${matches.length} URLs in ${path.relative(__dirname, file)}`);
      
      for (const url of matches) {
        if (!processedUrls.has(url)) {
          console.log(`Downloading: ${url}`);
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
            
            const buffer = Buffer.from(await res.arrayBuffer());
            const contentType = res.headers.get('content-type') || 'application/octet-stream';
            
            // Generate S3 Key from URL (last segment)
            let s3Key = url.split('/').pop();
            
            // If it's a video and lacks an extension, append .mp4
            if (url.includes('/video/upload/') && !s3Key.includes('.')) {
                s3Key += '.mp4';
            }
            
            console.log(`Uploading to S3 as: ${s3Key}`);
            await s3Client.send(new PutObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: s3Key,
              Body: buffer,
              ContentType: contentType,
              CacheControl: 'public, max-age=31536000, immutable'
            }));
            
            processedUrls.set(url, s3Key);
          } catch (error) {
            console.error(`Error processing ${url}:`, error.message);
            // Skip replacing if upload fails
          }
        }
        
        const newKey = processedUrls.get(url);
        if (newKey) {
          content = content.replace(url, `/api/images/${newKey}`);
        }
      }
      
      await fs.writeFile(file, content, 'utf-8');
      console.log(`Updated ${path.relative(__dirname, file)}`);
    }
  }
  
  console.log('Migration completed successfully!');
}

run().catch(console.error);
