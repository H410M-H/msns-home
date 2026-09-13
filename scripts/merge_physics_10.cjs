// scripts/merge_physics_10.cjs
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function mergePhysics10() {
  console.log('Merging 10th Physics 9 chapters...');
  const merged = await PDFDocument.create();
  const dir = 'F:/M.S.N.S\u00AE/DOCS/BOOKS/10';

  for (let i = 1; i <= 9; i++) {
    const chapPath = path.join(dir, '10th-physics-chaptr-' + i + '.pdf');
    if (!fs.existsSync(chapPath)) {
      console.error('Missing chapter:', chapPath);
      return;
    }
    console.log('Loading chapter ' + i + '...');
    const bytes = fs.readFileSync(chapPath);
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach(p => merged.addPage(p));
    console.log('Chapter ' + i + ' added (' + doc.getPageCount() + ' pages).');
  }

  console.log('Total merged pages: ' + merged.getPageCount() + '. Saving...');
  const outBytes = await merged.save();
  const outPath = 'c:/msns/msns-home/scratch/pctb-class-10-physics-full.pdf';
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, outBytes);
  console.log('Saved merged Physics 10 to ' + outPath + ' (' + (outBytes.length / 1024 / 1024).toFixed(1) + ' MB)');
}

mergePhysics10().catch(e => console.error(e));
