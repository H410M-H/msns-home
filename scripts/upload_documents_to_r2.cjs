const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// Load .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

let endpoint = process.env.AWS_ENDPOINT_URL || 'https://c678cf5c0fc5ef3806edacc18e6a762d.r2.cloudflarestorage.com';
try {
  const u = new URL(endpoint);
  if (u.pathname && u.pathname !== '/') {
    endpoint = u.origin;
  }
} catch (e) {
  // Ignore
}

const bucket = process.env.AWS_S3_BUCKET_NAME || 'msns';
const region = process.env.AWS_DEFAULT_REGION || 'auto';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  console.error('Missing AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY in environment!');
  process.exit(1);
}

const s3 = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

const docsDir = path.join(__dirname, '..', 'public', 'documents');

const DOCUMENT_METADATA = {
  'msns-prospectus-2026-2027.pdf': {
    title: 'M. S. Naz High School Institutional Prospectus (2026-2027)',
    category: 'Official',
  },
  'msns-offline-admission-form-2026-2027.pdf': {
    title: 'Official Offline Admission Form & Application Package (2026-2027)',
    category: 'Admissions',
  },
  'msns-academic-calendar-2026-2027.pdf': {
    title: 'Comprehensive Academic Year Calendar & Planner (2026-2027)',
    category: 'Academic',
  },
  'msns-matriculation-scheme-of-studies.pdf': {
    title: 'BISE Gujranwala Matriculation Scheme of Studies (Grades 9 & 10)',
    category: 'Examination',
  },
  'msns-tuition-fee-policy-and-challan-guide.pdf': {
    title: 'Tuition Fee Structure, Concessions & Digital Challan Payment Guide',
    category: 'Policy',
  },
  'msns-code-of-conduct-and-uniform-rules.pdf': {
    title: 'Student Code of Conduct & Visual Uniform Leadership Guidelines',
    category: 'Policy',
  },
  'msns-bise-matric-resource-guide.pdf': {
    title: 'BISE Matric Exam Preparation & Model Papers Resource Directory',
    category: 'Academic',
  },
};

async function uploadAllDocuments() {
  console.log(`[Cloudflare R2] Target Bucket: ${bucket}`);
  console.log(`[Cloudflare R2] Endpoint: ${endpoint}`);

  if (!fs.existsSync(docsDir)) {
    console.error(`Documents directory not found at: ${docsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.pdf'));
  console.log(`Found ${files.length} PDF documents to upload.`);

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const fileBytes = fs.readFileSync(filePath);
    const key = `documents/${file}`;
    const meta = DOCUMENT_METADATA[file] || { title: file, category: 'General' };

    console.log(`Uploading: ${file} (${fileBytes.length} bytes) -> ${key}...`);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileBytes,
      ContentType: 'application/pdf',
      ContentDisposition: `inline; filename="${file}"`,
      CacheControl: 'public, max-age=31536000, immutable',
      Metadata: {
        title: meta.title,
        category: meta.category,
        uploadedat: new Date().toISOString(),
        uploadedby: 'SYSTEM',
      },
    });

    await s3.send(command);
    console.log(`  [OK] Uploaded ${key}`);
  }

  console.log('\n--- Verifying R2 Bucket Contents under documents/ ---');
  const listCmd = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: 'documents/',
  });
  const listRes = await s3.send(listCmd);
  if (listRes.Contents) {
    listRes.Contents.forEach((obj) => {
      console.log(` - ${obj.Key} (${obj.Size} bytes, modified: ${obj.LastModified})`);
    });
  } else {
    console.log('No documents found in listing!');
  }
}

uploadAllDocuments().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});
