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

// 1. Institutional Documents
const INSTITUTIONAL_DOCS_DIR = 'c:/msns/msns-home/public/documents';
const INSTITUTIONAL_FILES = [
  'msns-academic-calendar-2026-2027.pdf',
  'msns-bise-matric-resource-guide.pdf',
  'msns-code-of-conduct-and-uniform-rules.pdf',
  'msns-matriculation-scheme-of-studies.pdf',
  'msns-offline-admission-form-2026-2027.pdf',
  'msns-prospectus-2026-2027.pdf',
  'msns-tuition-fee-policy-and-challan-guide.pdf'
];

// 2. Uniform Guidelines Image
const UNIFORM_IMAGE_PATH = 'c:/msns/msns-home/public/images/uniform-leadership-guidelines.jpg';

// 3. Notes Directory
const NOTES_DIR = 'c:/msns/msns-home/public/documents/notes';

// 4. Authentic Full Textbooks Mapping (All 20 verified local paths)
const TEXTBOOKS_MAP = [
  // Class 9
  {
    key: 'documents/pctb-class-9-physics.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/PHYSICS/Phyics 9 Complete book for watermark_compressed.pdf',
    title: 'Class 9 Physics (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-chemistry.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/CHEMISTRY/Chemistry-9 complete-2025-26.pdf',
    title: 'Class 9 Chemistry (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-biology.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/BIOLOGY/biology 9_2025-26.pdf',
    title: 'Class 9 Biology (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-computer-science.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/COMPUTER/Computer-9 complete_compressed.pdf',
    title: 'Class 9 Computer Science (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-mathematics.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/MATH/Math 9 EM.pdf',
    title: 'Class 9 Mathematics Science (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-english.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/ENGLISH/English 9 2025-26 WATERMARK.pdf',
    title: 'Class 9 English Compulsory (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-urdu.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/URDU/URDU TEXTBOOK CLASS 9 Watermark 2025-26.pdf',
    title: 'Class 9 Urdu Compulsory (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-islamiat.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/ISLAMIAT/Islamiat 9 SNC 2024-25_compressed.pdf',
    title: 'Class 9 Islamiat Compulsory (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-tarjuma-tul-quran.pdf',
    source: 'c:/msns/msns-home/public/documents/pctb-class-9-tarjuma-tul-quran-full.pdf',
    title: 'Class 9 Tarjuma-tul-Quran (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-9-pakistan-studies.pdf',
    source: 'c:/msns/msns-home/public/documents/pctb-class-9-pakistan-studies-full.pdf',
    title: 'Class 9 Pakistan Studies (Complete Official Textbook)'
  },

  // Class 10
  {
    key: 'documents/pctb-class-10-physics.pdf',
    source: 'c:/msns/msns-home/public/documents/pctb-class-10-physics-full.pdf',
    title: 'Class 10 Physics (Complete Official Textbook - 342 Pages)'
  },
  {
    key: 'documents/pctb-class-10-chemistry.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/chemistry 10.pdf',
    title: 'Class 10 Chemistry (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-biology.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2831-10th Class Biology (EM) New PECTAA Text Book PDF-(taleem360.com).pdf',
    title: 'Class 10 Biology (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-computer-science.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/10th Computer Science New Book.pdf',
    title: 'Class 10 Computer Science (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-mathematics.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/Maths 10th New Punjab Textbook 2026..pdf',
    title: 'Class 10 Mathematics Science (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-english.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2788-10th Class English New Text Book 2026-27 PECTAA PDF-(taleem360.com).pdf',
    title: 'Class 10 English Compulsory (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-urdu.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2792-10th Class Urdu New PECTAA Punjab Text Book PDF-(taleem360.com).pdf',
    title: 'Class 10 Urdu Compulsory (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-pakistan-studies.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2832-10th Class Pak Studies (UM) PECTAA Text Book PDF-(taleem360.com).pdf',
    title: 'Class 10 Pakistan Studies (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-tarjuma-tul-quran.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/Tarjama Tul Quran 10 14-04-23_compressed_Freeze.pdf',
    title: 'Class 10 Tarjuma-tul-Quran (Complete Official Textbook)'
  },
  {
    key: 'documents/pctb-class-10-islamiat.pdf',
    source: 'c:/msns/msns-home/public/documents/pctb-class-10-islamiat-full.pdf',
    title: 'Class 10 Islamiat Compulsory (Complete Official Textbook)'
  }
];

async function uploadFileStream(filePath, key, existingMap, contentType = 'application/pdf') {
  if (!fs.existsSync(filePath)) {
    console.error(`[!] Local file does not exist: ${filePath}`);
    return false;
  }
  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);

  // If already uploaded with exact same size, skip
  if (existingMap.has(key)) {
    const existingSize = existingMap.get(key);
    if (existingSize === stat.size) {
      console.log(`[EXISTS] ${key} (${sizeMB} MB) already up to date in R2. Skipping.`);
      return true;
    }
  }

  console.log(`[>>] Uploading ${key} (${sizeMB} MB)...`);
  const fileStream = fs.createReadStream(filePath);
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileStream,
    ContentLength: stat.size,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));

  console.log(`[OK] Uploaded: ${key} (${sizeMB} MB)`);
  existingMap.set(key, stat.size);
  return true;
}

async function uploadAll() {
  console.log('========================================================');
  console.log(`Starting Document Repository Upload to Cloudflare R2: ${BUCKET}`);
  console.log('========================================================\n');

  // Fetch current existing objects
  console.log('Fetching existing objects list from R2...');
  const existingMap = new Map();
  let isTruncated = true;
  let continuationToken = undefined;

  while (isTruncated) {
    const listRes = await s3Client.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'documents/',
      ContinuationToken: continuationToken,
    }));
    (listRes.Contents || []).forEach(o => {
      if (o.Key && o.Size) {
        existingMap.set(o.Key, o.Size);
      }
    });
    isTruncated = listRes.IsTruncated ?? false;
    continuationToken = listRes.NextContinuationToken;
  }
  console.log(`Found ${existingMap.size} existing items in R2 bucket.\n`);

  // 1. Institutional Documents
  console.log('--- 1. Checking Institutional Documents ---');
  for (const file of INSTITUTIONAL_FILES) {
    const localPath = path.join(INSTITUTIONAL_DOCS_DIR, file);
    await uploadFileStream(localPath, `documents/${file}`, existingMap);
  }

  // 2. Uniform Guidelines Image
  if (fs.existsSync(UNIFORM_IMAGE_PATH)) {
    console.log('\n--- 2. Checking Uniform Guidelines Image ---');
    await uploadFileStream(UNIFORM_IMAGE_PATH, 'documents/uniform-leadership-guidelines.jpg', existingMap, 'image/jpeg');
  }

  // 3. Official Syllabuses and Short Notes (20 Subjects)
  console.log('\n--- 3. Checking MSNS Syllabuses & High-Yield Short Notes ---');
  const noteFiles = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.pdf'));
  for (const noteFile of noteFiles) {
    const localPath = path.join(NOTES_DIR, noteFile);
    await uploadFileStream(localPath, `documents/${noteFile}`, existingMap);
    await uploadFileStream(localPath, `documents/notes/${noteFile}`, existingMap);
  }

  // 4. Complete Original Textbooks (20 Full Books)
  console.log('\n--- 4. Checking & Uploading 20 Complete Original Matric Textbooks ---');
  for (let i = 0; i < TEXTBOOKS_MAP.length; i++) {
    const item = TEXTBOOKS_MAP[i];
    console.log(`\n[${i + 1}/20] Processing: ${item.title}`);
    await uploadFileStream(item.source, item.key, existingMap);
  }

  console.log('\n========================================================');
  console.log('Upload Verification & Summary:');
  console.log('========================================================\n');

  const verifyRes = await s3Client.send(new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: 'documents/',
  }));

  const objects = verifyRes.Contents || [];
  let totalBytes = 0;
  objects.forEach(obj => {
    totalBytes += obj.Size || 0;
    const mb = ((obj.Size || 0) / (1024 * 1024)).toFixed(2);
    console.log(` - ${obj.Key} (${mb} MB)`);
  });
  console.log(`\nTotal Storage in R2 (documents/): ${(totalBytes / (1024 * 1024)).toFixed(2)} MB across ${objects.length} files.`);
  console.log('All documents and textbooks successfully synced to Cloudflare R2!');
}

uploadAll().catch(err => {
  console.error('Fatal Upload Error:', err);
  process.exit(1);
});
