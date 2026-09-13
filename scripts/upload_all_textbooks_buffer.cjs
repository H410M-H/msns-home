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
  maxAttempts: 5,
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'msns';

// Authentic Full Textbooks Mapping (All 20 verified local paths)
const TEXTBOOKS_MAP = [
  // Class 9
  {
    key: 'documents/pctb-class-9-physics.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/PHYSICS/Phyics 9 Complete book for watermark_compressed.pdf',
    title: 'Class 9 Physics'
  },
  {
    key: 'documents/pctb-class-9-chemistry.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/CHEMISTRY/Chemistry-9 complete-2025-26.pdf',
    title: 'Class 9 Chemistry'
  },
  {
    key: 'documents/pctb-class-9-biology.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/BIOLOGY/biology 9_2025-26.pdf',
    title: 'Class 9 Biology'
  },
  {
    key: 'documents/pctb-class-9-computer-science.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/COMPUTER/Computer-9 complete_compressed.pdf',
    title: 'Class 9 Computer Science'
  },
  {
    key: 'documents/pctb-class-9-mathematics.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/MATH/Math 9 EM.pdf',
    title: 'Class 9 Mathematics Science'
  },
  {
    key: 'documents/pctb-class-9-english.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/ENGLISH/English 9 2025-26 WATERMARK.pdf',
    title: 'Class 9 English Compulsory'
  },
  {
    key: 'documents/pctb-class-9-urdu.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/URDU/URDU TEXTBOOK CLASS 9 Watermark 2025-26.pdf',
    title: 'Class 9 Urdu Compulsory'
  },
  {
    key: 'documents/pctb-class-9-islamiat.pdf',
    source: 'D:/M.S.N.S\u2122/2025/E BOOKS/E BOOKS/9th -2025-26/ISLAMIAT/Islamiat 9 SNC 2024-25_compressed.pdf',
    title: 'Class 9 Islamiat Compulsory'
  },
  {
    key: 'documents/pctb-class-9-tarjuma-tul-quran.pdf',
    source: 'c:/msns/msns-home/scratch/pctb-class-9-tarjuma-tul-quran-full.pdf',
    title: 'Class 9 Tarjuma-tul-Quran'
  },
  {
    key: 'documents/pctb-class-9-pakistan-studies.pdf',
    source: 'c:/msns/msns-home/scratch/pctb-class-9-pakistan-studies-full.pdf',
    title: 'Class 9 Pakistan Studies'
  },

  // Class 10
  {
    key: 'documents/pctb-class-10-physics.pdf',
    source: 'c:/msns/msns-home/scratch/pctb-class-10-physics-full.pdf',
    title: 'Class 10 Physics (342 Pages)'
  },
  {
    key: 'documents/pctb-class-10-chemistry.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/chemistry 10.pdf',
    title: 'Class 10 Chemistry'
  },
  {
    key: 'documents/pctb-class-10-biology.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2831-10th Class Biology (EM) New PECTAA Text Book PDF-(taleem360.com).pdf',
    title: 'Class 10 Biology'
  },
  {
    key: 'documents/pctb-class-10-computer-science.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/10th Computer Science New Book.pdf',
    title: 'Class 10 Computer Science'
  },
  {
    key: 'documents/pctb-class-10-mathematics.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/Maths 10th New Punjab Textbook 2026..pdf',
    title: 'Class 10 Mathematics Science'
  },
  {
    key: 'documents/pctb-class-10-english.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2788-10th Class English New Text Book 2026-27 PECTAA PDF-(taleem360.com).pdf',
    title: 'Class 10 English Compulsory'
  },
  {
    key: 'documents/pctb-class-10-urdu.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2792-10th Class Urdu New PECTAA Punjab Text Book PDF-(taleem360.com).pdf',
    title: 'Class 10 Urdu Compulsory'
  },
  {
    key: 'documents/pctb-class-10-pakistan-studies.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/2832-10th Class Pak Studies (UM) PECTAA Text Book PDF-(taleem360.com).pdf',
    title: 'Class 10 Pakistan Studies'
  },
  {
    key: 'documents/pctb-class-10-tarjuma-tul-quran.pdf',
    source: 'D:/M.S.N.S\u2122/2026/E - BOOKS/10th - NEW SYLLABUS/Tarjama Tul Quran 10 14-04-23_compressed_Freeze.pdf',
    title: 'Class 10 Tarjuma-tul-Quran'
  },
  {
    key: 'documents/pctb-class-10-islamiat.pdf',
    source: 'c:/msns/msns-home/scratch/pctb-class-10-islamiat-full.pdf',
    title: 'Class 10 Islamiat Compulsory'
  }
];

async function uploadWithRetry(filePath, key, existingMap, maxRetries = 3) {
  if (!fs.existsSync(filePath)) {
    console.error(`[!] File not found: ${filePath}`);
    return false;
  }
  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);

  // Skip if already in R2 with matching size
  if (existingMap.has(key)) {
    const existingSize = existingMap.get(key);
    if (existingSize === stat.size) {
      console.log(`[SKIP] ${key} (${sizeMB} MB) already up to date in R2.`);
      return true;
    }
  }

  const buffer = fs.readFileSync(filePath);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[>>] Uploading ${key} (${sizeMB} MB) [Attempt ${attempt}/${maxRetries}]...`);
      const t0 = Date.now();
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: 'application/pdf',
        CacheControl: 'public, max-age=31536000, immutable',
      }));
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`[OK] Uploaded ${key} (${sizeMB} MB in ${elapsed}s)`);
      existingMap.set(key, stat.size);
      return true;
    } catch (err) {
      console.error(`Attempt ${attempt} error for ${key}:`, err.message);
      if (attempt === maxRetries) {
        console.error(`[FAILED] Giving up on ${key} after ${maxRetries} attempts.`);
        return false;
      }
      console.log(`Waiting 3 seconds before retry...`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  return false;
}

async function run() {
  console.log('========================================================');
  console.log(`Uploading Authentic Matric Textbooks to Cloudflare R2: ${BUCKET}`);
  console.log('========================================================\n');

  console.log('Querying current R2 objects list...');
  const existingMap = new Map();
  let continuationToken = undefined;

  do {
    const list = await s3Client.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'documents/',
      ContinuationToken: continuationToken,
    }));
    (list.Contents || []).forEach(o => {
      if (o.Key && o.Size) {
        existingMap.set(o.Key, o.Size);
      }
    });
    continuationToken = list.IsTruncated ? list.NextContinuationToken : undefined;
  } while (continuationToken);

  console.log(`Found ${existingMap.size} objects in R2.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < TEXTBOOKS_MAP.length; i++) {
    const item = TEXTBOOKS_MAP[i];
    console.log(`\n[${i + 1}/20] ${item.title}`);
    const ok = await uploadWithRetry(item.source, item.key, existingMap);
    if (ok) successCount++;
    else failCount++;
  }

  console.log('\n========================================================');
  console.log(`Finished: ${successCount} succeeded, ${failCount} failed.`);
  console.log('========================================================');
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
