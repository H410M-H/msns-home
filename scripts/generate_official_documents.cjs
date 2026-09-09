// scratch/generate-official-documents.js
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } = require('pdf-lib');

const origDrawText = PDFPage.prototype.drawText;
PDFPage.prototype.drawText = function(text, options) {
  if (typeof text === 'string') {
    text = text.replace(/[^\x20-\x7E]/g, ' ');
  }
  return origDrawText.call(this, text, options);
};

const origWidth = PDFFont.prototype.widthOfTextAtSize;
PDFFont.prototype.widthOfTextAtSize = function(text, size) {
  if (typeof text === 'string') {
    text = text.replace(/[^\x20-\x7E]/g, ' ');
  }
  return origWidth.call(this, text, size);
};

const ROOT_DIR = 'c:\\msns\\msns-home';
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'documents');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Brand Colors
const C_DARK_GREEN = rgb(6 / 255, 78 / 255, 59 / 255);      // #064e3b
const C_EMERALD = rgb(16 / 255, 185 / 255, 129 / 255);     // #10b981
const C_LIGHT_GREEN = rgb(209 / 255, 250 / 255, 229 / 255); // #d1fae5
const C_TEXT_DARK = rgb(15 / 255, 23 / 255, 42 / 255);     // #0f172a
const C_TEXT_MUTED = rgb(71 / 255, 85 / 255, 105 / 255);   // #475569
const C_BORDER = rgb(226 / 255, 232 / 255, 240 / 255);     // #e2e8f0
const C_BG_CARD = rgb(248 / 255, 250 / 255, 252 / 255);    // #f8fafc
const C_WHITE = rgb(1, 1, 1);
const C_ACCENT_GOLD = rgb(217 / 255, 119 / 255, 6 / 255);   // #d97706

const logoBytes = fs.readFileSync(path.join(ROOT_DIR, 'public', 'icon.jpg'));

// Helper to wrap text into lines fitting a maximum width
function wrapText(text, font, fontSize, maxWidth) {
  if (!text) return [];
  const clean = text.replace(/[\r\n]+/g, ' ').replace(/[^\x20-\x7E]/g, ' ').trim();
  const words = clean.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Draw institutional header on any page
function drawHeader(page, fonts, logoImg, title) {
  const { width, height } = page.getSize();
  
  // Top green stripe
  page.drawRectangle({
    x: 0,
    y: height - 6,
    width,
    height: 6,
    color: C_DARK_GREEN,
  });

  // Logo
  if (logoImg) {
    page.drawImage(logoImg, {
      x: 40,
      y: height - 62,
      width: 44,
      height: 44,
    });
  }

  // School Name & Meta
  page.drawText('M. S. NAZ HIGH SCHOOL', {
    x: 94,
    y: height - 32,
    size: 14,
    font: fonts.bold,
    color: C_DARK_GREEN,
  });

  page.drawText('Wazirabad & Ghakhar | Affiliated with BISE Gujranwala | Oxford Curriculum', {
    x: 94,
    y: height - 46,
    size: 8.5,
    font: fonts.regular,
    color: C_TEXT_MUTED,
  });

  page.drawText(title.toUpperCase(), {
    x: 94,
    y: height - 59,
    size: 9.5,
    font: fonts.bold,
    color: C_ACCENT_GOLD,
  });

  // Header bottom border
  page.drawLine({
    start: { x: 40, y: height - 72 },
    end: { x: width - 40, y: height - 72 },
    thickness: 1,
    color: C_BORDER,
  });
}

// Draw institutional footer
function drawFooter(page, fonts, pageNum, totalPages) {
  const { width } = page.getSize();
  
  page.drawLine({
    start: { x: 40, y: 35 },
    end: { x: width - 40, y: 35 },
    thickness: 0.75,
    color: C_BORDER,
  });

  page.drawText('Official Institutional Document  -  M. S. Naz High School', {
    x: 40,
    y: 22,
    size: 8,
    font: fonts.regular,
    color: C_TEXT_MUTED,
  });

  page.drawText('Tel: +92 318 7625415  |  info@msns.edu.pk  |  www.msns.edu.pk  |  lms.msns.edu.pk', {
    x: 40,
    y: 12,
    size: 7.5,
    font: fonts.regular,
    color: C_TEXT_MUTED,
  });

  const pageStr = `Page ${pageNum} of ${totalPages}`;
  const pWidth = fonts.regular.widthOfTextAtSize(pageStr, 8);
  page.drawText(pageStr, {
    x: width - 40 - pWidth,
    y: 22,
    size: 8,
    font: fonts.bold,
    color: C_DARK_GREEN,
  });
}

// -------------------------------------------------------------
// 1. SCHOOL PROSPECTUS 2026-2027
// -------------------------------------------------------------
async function buildProspectus() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    italic: await doc.embedFont(StandardFonts.HelveticaOblique),
  };

  const totalPages = 4;

  // PAGE 1: COVER & INSTITUTIONAL PROFILE
  {
    const page = doc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();

    page.drawRectangle({
      x: 0,
      y: height - 160,
      width,
      height: 160,
      color: C_DARK_GREEN,
    });

    page.drawImage(logo, {
      x: 50,
      y: height - 120,
      width: 76,
      height: 76,
    });

    page.drawText('M. S. NAZ HIGH SCHOOL', {
      x: 140,
      y: height - 70,
      size: 24,
      font: fonts.bold,
      color: C_WHITE,
    });

    page.drawText('INSTITUTIONAL PROSPECTUS 2026-2027', {
      x: 140,
      y: height - 94,
      size: 13,
      font: fonts.bold,
      color: C_EMERALD,
    });

    page.drawText('Nurturing Minds, Shaping Futures  -  Established Over Two Decades', {
      x: 140,
      y: height - 114,
      size: 10,
      font: fonts.regular,
      color: C_LIGHT_GREEN,
    });

    let y = height - 190;

    const badges = [
      'BISE Gujranwala Registered',
      'Oxford Curriculum Standards',
      'Solar-Powered Smart Campus',
      'Practical AI & Robotics Labs',
      '15 TB Institutional Cloud',
    ];

    badges.forEach((b, i) => {
      const bx = 45 + (i % 3) * 175;
      const by = y - Math.floor(i / 3) * 26;
      page.drawRectangle({
        x: bx,
        y: by,
        width: 165,
        height: 20,
        color: C_LIGHT_GREEN,
        borderColor: C_EMERALD,
        borderWidth: 0.5,
      });
      page.drawText(`[+] ${b}`, {
        x: bx + 8,
        y: by + 6,
        size: 7.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });
    });

    y -= 70;

    page.drawRectangle({
      x: 40,
      y: y - 110,
      width: 515,
      height: 110,
      color: C_BG_CARD,
      borderColor: C_BORDER,
      borderWidth: 1,
    });

    page.drawText('INSTITUTIONAL VISION & MISSION', {
      x: 55,
      y: y - 22,
      size: 12,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const visionText =
      'Our vision is to cultivate an inspiring, future-proof academic ecosystem where traditional ethical values harmonize seamlessly with 21st-century technological acumen. We empower students across Wazirabad and surrounding regions with Oxford academic benchmarks, rigorous BISE Matriculation preparation, and practical AI mentorship to become exemplary global leaders and distinction holders.';
    const visionLines = wrapText(visionText, fonts.regular, 9, 485);
    visionLines.forEach((line, idx) => {
      page.drawText(line, {
        x: 55,
        y: y - 42 - idx * 14,
        size: 9,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
    });

    y -= 135;

    page.drawRectangle({
      x: 40,
      y: y - 130,
      width: 515,
      height: 130,
      color: C_WHITE,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('MESSAGE FROM THE EXECUTIVE DESK', {
      x: 55,
      y: y - 22,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const ceoText =
      '"Education at M. S. Naz High School is not merely the transmission of textbook knowledge; it is the deliberate shaping of intellect, curiosity, and moral integrity. Our students learn to think critically, code algorithms, conduct hands-on laboratory experiments, and embrace leadership with humility. We welcome parents and ambitious students into our academic family for the 2026-2027 session."';
    const ceoLines = wrapText(ceoText, fonts.italic, 8.5, 485);
    ceoLines.forEach((line, idx) => {
      page.drawText(line, {
        x: 55,
        y: y - 42 - idx * 13,
        size: 8.5,
        font: fonts.italic,
        color: C_TEXT_DARK,
      });
    });

    page.drawText(' -  Leadership Council, M. S. Naz High School', {
      x: 320,
      y: y - 116,
      size: 8.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 155;

    const stats = [
      { num: '20+', label: 'Years of Excellence' },
      { num: '98%+', label: 'Matric Board Pass Rate' },
      { num: '15 TB', label: 'Student Cloud Storage' },
      { num: '100%', label: 'Solar-Powered Campus' },
    ];

    stats.forEach((s, idx) => {
      const sx = 40 + idx * 130;
      page.drawRectangle({
        x: sx,
        y: y - 55,
        width: 122,
        height: 55,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 0.75,
      });
      page.drawText(s.num, {
        x: sx + 14,
        y: y - 24,
        size: 16,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });
      page.drawText(s.label, {
        x: sx + 14,
        y: y - 42,
        size: 7.5,
        font: fonts.regular,
        color: C_TEXT_MUTED,
      });
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: ACADEMIC DIVISIONS & CURRICULUM
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Academic Divisions & Curricular Framework');

    let y = height - 95;

    const divisions = [
      {
        title: '1. Foundational Years (Playgroup, Nursery & Kindergarten)',
        desc: 'Activity-based Montessori sensory learning blended with Oxford Early Years phonics, early numeracy, and motor skills. Features safe indoor play areas, mentor-guided social development, and moral storytelling.',
        subjects: 'Oxford Phonics, Early Math, Sensory Motor Activities, Urdu Rhymes, Art & Craft',
      },
      {
        title: '2. Primary Wing (Grades 1 to 5)',
        desc: 'Rigorous conceptual foundation following Oxford University Press syllabus standards. Emphasizes mathematical reasoning, bilingual fluency in English and Urdu, fundamental sciences, and digital literacy in our computer labs.',
        subjects: 'Oxford English, Oxford Mathematics, General Science, Social Studies, Urdu, Islamiyat, ICT',
      },
      {
        title: '3. Middle School Wing (Grades 6 to 8)',
        desc: 'Advanced preparatory bridge toward board matriculation. Introduces specialized Physics, Chemistry, Biology, and Computer Science concepts, alongside English comprehension, debate training, and analytical projects.',
        subjects: 'Science (Physics/Chem/Bio tracks), Advanced Math, Computer Applications, English Literature, Geography, History',
      },
      {
        title: '4. Matriculation Wing (Grades 9 & 10  -  BISE Gujranwala)',
        desc: 'Full affiliation with the Board of Intermediate and Secondary Education (BISE) Gujranwala. Offers high-performance Science & Computer Science groups with daily practical demonstrations and structured phase test series.',
        subjects: 'Science Group: Biology, Physics, Chemistry, Math, English, Urdu, Pak Studies, Islamiyat, Tarjuma-tul-Quran\nComputer Group: Computer Science replaces Biology with hands-on lab programming',
      },
    ];

    divisions.forEach((div) => {
      page.drawRectangle({
        x: 40,
        y: y - 105,
        width: 515,
        height: 105,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText(div.title, {
        x: 52,
        y: y - 20,
        size: 11,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const dLines = wrapText(div.desc, fonts.regular, 8.5, 490);
      dLines.forEach((l, i) => {
        page.drawText(l, {
          x: 52,
          y: y - 36 - i * 12,
          size: 8.5,
          font: fonts.regular,
          color: C_TEXT_DARK,
        });
      });

      page.drawText('Key Curricular Coverage:', {
        x: 52,
        y: y - 76,
        size: 8,
        font: fonts.bold,
        color: C_ACCENT_GOLD,
      });

      const subLines = wrapText(div.subjects, fonts.regular, 8, 490);
      subLines.forEach((sl, si) => {
        page.drawText(sl, {
          x: 52,
          y: y - 88 - si * 11,
          size: 8,
          font: fonts.regular,
          color: C_TEXT_MUTED,
        });
      });

      y -= 120;
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  // PAGE 3: INFRASTRUCTURE, AI LABS & STUDENT LIFE
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Campus Infrastructure & Student Ecosystem');

    let y = height - 95;

    const facilities = [
      {
        title: 'Modern Science Laboratories',
        desc: 'Fully equipped Physics, Chemistry, and Biology laboratories compliant with BISE Gujranwala practical examination specifications. Features modern microscopes, certified reagents, optical benches, and dedicated safety gear.',
      },
      {
        title: 'Artificial Intelligence & Computer Lab (15 TB Cloud)',
        desc: 'Quad-core networked workstations connected via high-speed fiber internet. Every matric and middle student receives institutional access to our 15 TB cloud for digital portfolios, coding assignments, and LMS coursework.',
      },
      {
        title: '100% Solar-Powered Infrastructure',
        desc: 'Environmentally responsible, uninterrupted power supply supporting year-round air-cooled classrooms, computer laboratories, and campus lighting without disruptions from local power outages.',
      },
      {
        title: 'Library & Digital Resource Repository',
        desc: 'Curated collection of Oxford readers, encyclopedias, board past paper archives, scientific journals, and Islamic literature. Equipped with quiet study nooks for student research.',
      },
      {
        title: 'Co-Curricular Societies & Athletic Excellence',
        desc: 'Active student societies: MSNS Science Club, Debating & Literary Society, Robotics & Coding Guild, and Sports Club (Cricket, Badminton, Table Tennis, Football). Annual Sports Gala and Science Fair held annually.',
      },
      {
        title: 'Safety, Transport & Medical Readiness',
        desc: 'CCTV monitored campus premises, secure boundary gates with 24/7 security guards, clean drinking water via commercial Reverse Osmosis (RO) plants, and supervised transport routes covering Wazirabad and Ghakhar.',
      },
    ];

    facilities.forEach((fac) => {
      page.drawRectangle({
        x: 40,
        y: y - 68,
        width: 515,
        height: 68,
        color: C_WHITE,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText(`*  ${fac.title}`, {
        x: 52,
        y: y - 18,
        size: 10.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const fLines = wrapText(fac.desc, fonts.regular, 8.5, 490);
      fLines.forEach((fl, fi) => {
        page.drawText(fl, {
          x: 52,
          y: y - 34 - fi * 12,
          size: 8.5,
          font: fonts.regular,
          color: C_TEXT_DARK,
        });
      });

      y -= 78;
    });

    drawFooter(page, fonts, 3, totalPages);
  }

  // PAGE 4: ADMISSIONS, POLICIES & CONTACT
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Admissions Roadmap, Policies & Contact Directory');

    let y = height - 95;

    page.drawText('ADMISSION ROADMAP (SESSION 2026-2027)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 15;

    const steps = [
      { step: '1. Registration', text: 'Obtain Prospectus & Application Form from campus admissions desk or apply online via www.msns.edu.pk/admission/apply.' },
      { step: '2. Assessment Test', text: 'Candidates for Grade 1 through 9 sit for an assessment in English, Mathematics, and Urdu to evaluate conceptual standing.' },
      { step: '3. Interview', text: 'Candidate and parents attend an informal interaction with the Academic Principal / Admissions Committee.' },
      { step: '4. Merit List & Fee', text: 'Selected candidates receive admission offer letters. Secure seat by submitting bank challan within specified due date.' },
    ];

    steps.forEach((s) => {
      page.drawRectangle({
        x: 40,
        y: y - 36,
        width: 515,
        height: 36,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });

      page.drawText(s.step, {
        x: 50,
        y: y - 16,
        size: 9.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      page.drawText(s.text, {
        x: 160,
        y: y - 16,
        size: 8,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });

      y -= 42;
    });

    y -= 10;

    page.drawRectangle({
      x: 40,
      y: y - 80,
      width: 515,
      height: 80,
      color: C_LIGHT_GREEN,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('MERIT SCHOLARSHIPS & CONCESSIONS', {
      x: 52,
      y: y - 20,
      size: 10.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const scholText =
      '- Board Position Holders & 90%+ Achievers: Up to 100% tuition waiver in Matriculation.\n- Sibling Discount: 20% tuition concession for 2nd child; 30% concession for 3rd child.\n- Kinship & Need-Based Aid: Deserving students can request financial assistance via Principal review.';
    const scholLines = scholText.split('\n');
    scholLines.forEach((sl, idx) => {
      page.drawText(sl, {
        x: 52,
        y: y - 38 - idx * 13,
        size: 8.5,
        font: fonts.regular,
        color: C_DARK_GREEN,
      });
    });

    y -= 98;

    page.drawRectangle({
      x: 40,
      y: y - 120,
      width: 515,
      height: 120,
      color: C_WHITE,
      borderColor: C_BORDER,
      borderWidth: 1,
    });

    page.drawText('INSTITUTIONAL DIRECTORY & CAMPUSES', {
      x: 52,
      y: y - 20,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    page.drawText('Main Campus: G.T. Road, Wazirabad, Punjab, Pakistan', {
      x: 52,
      y: y - 40,
      size: 9,
      font: fonts.regular,
      color: C_TEXT_DARK,
    });

    page.drawText('Ghakhar Campus: Circular Road, Ghakhar Mandi, Punjab, Pakistan', {
      x: 52,
      y: y - 56,
      size: 9,
      font: fonts.regular,
      color: C_TEXT_DARK,
    });

    page.drawText('Helpline / WhatsApp: +92 318 7625415  |  PTCL: 055-6600000', {
      x: 52,
      y: y - 72,
      size: 9,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    page.drawText('Official Website: https://www.msns.edu.pk  |  Admissions: admissions@msns.edu.pk', {
      x: 52,
      y: y - 88,
      size: 9,
      font: fonts.regular,
      color: C_TEXT_MUTED,
    });

    page.drawText('LMS Parent & Student Portal: https://lms.msns.edu.pk', {
      x: 52,
      y: y - 104,
      size: 9,
      font: fonts.bold,
      color: C_ACCENT_GOLD,
    });

    drawFooter(page, fonts, 4, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-prospectus-2026-2027.pdf'), pdfBytes);
  console.log('[+] Created msns-prospectus-2026-2027.pdf (' + pdfBytes.length + ' bytes)');
}

// -------------------------------------------------------------
// 2. OFFLINE ADMISSION REGISTRATION FORM
// -------------------------------------------------------------
async function buildAdmissionForm() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const totalPages = 2;

  // PAGE 1: STUDENT & PARENT BIO-DATA
  {
    const page = doc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    drawHeader(page, fonts, logo, 'Offline Admission Registration Form  -  Session 2026-2027');

    let y = height - 90;

    page.drawRectangle({
      x: width - 135,
      y: y - 95,
      width: 95,
      height: 95,
      color: C_BG_CARD,
      borderColor: C_BORDER,
      borderWidth: 1,
    });
    page.drawText('Affix Passport Size\nPhotograph Here\n(Blue Background)', {
      x: width - 130,
      y: y - 45,
      size: 7,
      font: fonts.regular,
      color: C_TEXT_MUTED,
    });

    page.drawText('Application Form No: MSN-2026-__________', {
      x: 40,
      y: y - 15,
      size: 9,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });
    page.drawText('Date of Submission: ____ / ____ / 2026', {
      x: 40,
      y: y - 30,
      size: 9,
      font: fonts.regular,
      color: C_TEXT_MUTED,
    });
    page.drawText('Campus:  [  ] Main Wazirabad     [  ] Ghakhar Mandi', {
      x: 40,
      y: y - 45,
      size: 9,
      font: fonts.regular,
      color: C_TEXT_DARK,
    });
    page.drawText('Admission Sought for Grade / Class: ________________________', {
      x: 40,
      y: y - 60,
      size: 9,
      font: fonts.bold,
      color: C_TEXT_DARK,
    });
    page.drawText('Stream:  [  ] Pre-School    [  ] Primary    [  ] Middle    [  ] Matric Science    [  ] Matric CS', {
      x: 40,
      y: y - 75,
      size: 8.5,
      font: fonts.regular,
      color: C_TEXT_DARK,
    });

    y -= 110;

    page.drawRectangle({
      x: 40,
      y: y - 18,
      width: 515,
      height: 18,
      color: C_DARK_GREEN,
    });
    page.drawText('SECTION A: STUDENT BIODATA (USE BLOCK CAPITAL LETTERS)', {
      x: 46,
      y: y - 13,
      size: 8.5,
      font: fonts.bold,
      color: C_WHITE,
    });

    y -= 30;

    const fieldRows = [
      'Full Student Name: ________________________________________________________________________________',
      'Father Name: ______________________________________________________________________________________',
      'Date of Birth (DD/MM/YYYY): _____ / _____ / ________    Age: _____ Years _____ Months',
      'Date of Birth (in words): _________________________________________________________________________',
      'B-Form / CNIC Number: _____________________________________   Gender: [  ] Male   [  ] Female',
      'Religion: __________________________   Nationality: ________________   Blood Group: __________',
      'Previous School Attended: ________________________________________________________________________',
      'Previous Grade Passed: _________________   Marks Obtained: _________ / _________   Grade: _____',
    ];

    fieldRows.forEach((r) => {
      page.drawText(r, {
        x: 40,
        y,
        size: 8.5,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
      y -= 22;
    });

    y -= 10;

    page.drawRectangle({
      x: 40,
      y: y - 18,
      width: 515,
      height: 18,
      color: C_DARK_GREEN,
    });
    page.drawText('SECTION B: PARENT / GUARDIAN DETAILS', {
      x: 46,
      y: y - 13,
      size: 8.5,
      font: fonts.bold,
      color: C_WHITE,
    });

    y -= 30;

    const parentRows = [
      'Father / Guardian CNIC: __________________________________   Occupation: __________________________',
      'Designation / Organization: ______________________________   Monthly Income (PKR): ________________',
      'Mother Name: _____________________________________________   Mother CNIC: _________________________',
      'Primary Mobile / WhatsApp No: ____________________________   Emergency Contact No: ________________',
      'Email Address: ____________________________________________________________________________________',
      'Current Residential Address: ______________________________________________________________________',
      'Permanent Home Address: ___________________________________________________________________________',
    ];

    parentRows.forEach((r) => {
      page.drawText(r, {
        x: 40,
        y,
        size: 8.5,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
      y -= 22;
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: UNDERTAKING, CHECKLIST & OFFICE USE
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Offline Admission Registration Form  -  Rules & Office Verification');

    let y = height - 95;

    page.drawRectangle({
      x: 40,
      y: y - 18,
      width: 515,
      height: 18,
      color: C_DARK_GREEN,
    });
    page.drawText('SECTION C: MANDATORY DOCUMENT CHECKLIST (ATTACH WITH APPLICATION)', {
      x: 46,
      y: y - 13,
      size: 8.5,
      font: fonts.bold,
      color: C_WHITE,
    });

    y -= 32;

    const checklist = [
      '[  ] Attested copy of Student NADRA B-Form or CNIC',
      '[  ] Attested copy of Father / Guardian CNIC',
      '[  ] 4 Passport-size recent photographs of student with blue background',
      '[  ] Original School Leaving Certificate (SLC) / Transfer Certificate from previous registered school',
      '[  ] Copy of previous academic report card / distinction transcripts',
      '[  ] Blood group medical certificate (if applicable)',
    ];

    checklist.forEach((c) => {
      page.drawText(c, {
        x: 50,
        y,
        size: 8.5,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
      y -= 18;
    });

    y -= 15;

    page.drawRectangle({
      x: 40,
      y: y - 18,
      width: 515,
      height: 18,
      color: C_DARK_GREEN,
    });
    page.drawText('SECTION D: PARENT / GUARDIAN UNDERTAKING', {
      x: 46,
      y: y - 13,
      size: 8.5,
      font: fonts.bold,
      color: C_WHITE,
    });

    y -= 30;

    const undertaking =
      'I solemnly declare that the particulars furnished above are correct to the best of my knowledge and belief. I agree to abide by all the rules, regulations, and fee policies of M. S. Naz High School as articulated in the prospectus and institutional directives. I understand that irregular attendance (below 80%) or disciplinary violations may lead to dismissal from the institution. I pledge to pay all dues within the notified deadlines.';
    const uLines = wrapText(undertaking, fonts.regular, 8.5, 500);
    uLines.forEach((ul, ui) => {
      page.drawText(ul, {
        x: 45,
        y: y - ui * 13,
        size: 8.5,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
    });

    y -= 75;

    page.drawText('Applicant Student Signature: __________________         Parent / Guardian Signature: __________________', {
      x: 40,
      y,
      size: 8.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 35;

    page.drawRectangle({
      x: 40,
      y: y - 180,
      width: 515,
      height: 180,
      color: C_BG_CARD,
      borderColor: C_BORDER,
      borderWidth: 1,
    });

    page.drawRectangle({
      x: 40,
      y: y - 18,
      width: 515,
      height: 18,
      color: C_ACCENT_GOLD,
    });
    page.drawText('SECTION E: FOR OFFICE USE ONLY (ADMISSIONS DESK & PRINCIPAL)', {
      x: 46,
      y: y - 13,
      size: 8.5,
      font: fonts.bold,
      color: C_WHITE,
    });

    y -= 35;

    const officeLines = [
      'Admission Test Score:  English: _____ / 25   Math: _____ / 25   Urdu: _____ / 25   Total: _____ / 75',
      'Admission Status:   [  ] Granted       [  ] Conditional       [  ] Regret',
      'Class Assigned: __________________________   Section: ___________________   Roll No: _______________',
      'Registration / Student ID Assigned: ___________________________   Challan No: ______________________',
      'Admission Fee Received: PKR _______________   Bank Receipt / Date: _________________________________',
      'Principal Remarks: _________________________________________________________________________________',
    ];

    officeLines.forEach((ol) => {
      page.drawText(ol, {
        x: 52,
        y,
        size: 8.5,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
      y -= 20;
    });

    y -= 10;

    page.drawText('Admissions Officer Signature: _________________           Principal Stamp & Signature: _________________', {
      x: 52,
      y,
      size: 8.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-offline-admission-form-2026-2027.pdf'), pdfBytes);
  console.log('[+] Created msns-offline-admission-form-2026-2027.pdf (' + pdfBytes.length + ' bytes)');
}

// -------------------------------------------------------------
// 3. ANNUAL ACADEMIC CALENDAR 2026-2027
// -------------------------------------------------------------
async function buildCalendar() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const totalPages = 2;

  // PAGE 1: TERM 1
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Annual Academic Calendar 2026-2027  -  Term 1');

    let y = height - 95;

    page.drawText('ACADEMIC YEAR 2026-2027: SESSION BREAKDOWN', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 25;

    const term1Events = [
      { month: 'August 2026', event: 'Academic Session Commences; Orientation for New Admissions; Independence Day Celebrations (Aug 14)' },
      { month: 'September 2026', event: 'Baseline Diagnostic Testing; Science & IT Society Inauguration; Defense Day Assembly (Sep 6)' },
      { month: 'October 2026', event: 'First Term Assessment Cycle (Oct 5-15); Parent-Teacher Meeting 1 (Oct 24); Sports Gala Heats' },
      { month: 'November 2026', event: 'Iqbal Day Literary Symposium (Nov 9); Science & AI Exhibition; Matric Syllabus Completion Milestone 1' },
      { month: 'December 2026', event: 'Mid-Term Examinations (Dec 10-22); Quaid-e-Azam Day (Dec 25); Winter Vacations Begin (Dec 24)' },
    ];

    term1Events.forEach((ev) => {
      page.drawRectangle({
        x: 40,
        y: y - 42,
        width: 515,
        height: 42,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawRectangle({
        x: 40,
        y: y - 42,
        width: 110,
        height: 42,
        color: C_LIGHT_GREEN,
      });

      page.drawText(ev.month, {
        x: 48,
        y: y - 24,
        size: 9,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const eLines = wrapText(ev.event, fonts.regular, 8.5, 385);
      eLines.forEach((el, ei) => {
        page.drawText(el, {
          x: 160,
          y: y - 18 - ei * 12,
          size: 8.5,
          font: fonts.regular,
          color: C_TEXT_DARK,
        });
      });

      y -= 50;
    });

    y -= 15;

    page.drawRectangle({
      x: 40,
      y: y - 90,
      width: 515,
      height: 90,
      color: C_WHITE,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('ASSESSMENT CRITERIA & WEIGHTAGE FORMULA', {
      x: 52,
      y: y - 20,
      size: 10,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const assessText =
      '- Monthly Quizzes & Classroom Participation: 10%\n- First Term Assessment: 20%\n- Mid-Term Examination: 30%\n- Final Examination / Pre-Board Send-Up: 40%\n(Note: Matric students in 9th & 10th undergo BISE Gujranwala standardized mock tests in Jan-Feb).';
    const aLines = assessText.split('\n');
    aLines.forEach((al, ai) => {
      page.drawText(al, {
        x: 52,
        y: y - 36 - ai * 11,
        size: 8,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: TERM 2 & VACATIONS
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Annual Academic Calendar 2026-2027  -  Term 2 & Exams');

    let y = height - 95;

    page.drawText('TERM 2, BOARD EXAMS & HOLIDAYS (JANUARY - JUNE 2027)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 25;

    const term2Events = [
      { month: 'January 2027', event: 'School Reopens after Winter Break (Jan 6); Matric Send-Up Mock Exams (Jan 15-30); PTM 2' },
      { month: 'February 2027', event: 'Kashmir Day (Feb 5); Annual Sports Gala Finals; Intensive Revision Camps for 9th & 10th Board Exams' },
      { month: 'March 2027', event: 'BISE Gujranwala 10th Annual Board Exams Begin; Pakistan Day (Mar 23); Ramazan Schedule Operations' },
      { month: 'April 2027', event: 'BISE Gujranwala 9th Annual Board Exams; Eid-ul-Fitr Holidays; Junior Wings Final Revision' },
      { month: 'May 2027', event: 'Final Examinations for Playgroup to Grade 8 (May 10-22); Teachers Evaluation Workshops' },
      { month: 'June 2027', event: 'Annual Results Declaration & Prize Distribution Ceremony (Jun 5); Summer Vacations Commence' },
    ];

    term2Events.forEach((ev) => {
      page.drawRectangle({
        x: 40,
        y: y - 42,
        width: 515,
        height: 42,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawRectangle({
        x: 40,
        y: y - 42,
        width: 110,
        height: 42,
        color: C_LIGHT_GREEN,
      });

      page.drawText(ev.month, {
        x: 48,
        y: y - 24,
        size: 9,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const eLines = wrapText(ev.event, fonts.regular, 8.5, 385);
      eLines.forEach((el, ei) => {
        page.drawText(el, {
          x: 160,
          y: y - 18 - ei * 12,
          size: 8.5,
          font: fonts.regular,
          color: C_TEXT_DARK,
        });
      });

      y -= 50;
    });

    y -= 15;

    page.drawRectangle({
      x: 40,
      y: y - 85,
      width: 515,
      height: 85,
      color: C_WHITE,
      borderColor: C_BORDER,
      borderWidth: 1,
    });

    page.drawText('GAZETTED PUBLIC HOLIDAYS (GOVERNMENT OF PUNJAB NOTIFIED)', {
      x: 52,
      y: y - 18,
      size: 9.5,
      font: fonts.bold,
      color: C_ACCENT_GOLD,
    });

    const hols =
      '- Ashura (9th & 10th Muharram)  |  - Eid Milad-un-Nabi (12th Rabi-ul-Awwal)  |  - Iqbal Day (Nov 9)\n- Quaid-e-Azam Day (Dec 25)  |  - Kashmir Day (Feb 5)  |  - Pakistan Day (Mar 23)\n- Labour Day (May 1)  |  - Eid-ul-Fitr & Eid-ul-Azha (Subject to moon sighting notification)';
    hols.split('\n').forEach((hl, hi) => {
      page.drawText(hl, {
        x: 52,
        y: y - 35 - hi * 13,
        size: 8,
        font: fonts.regular,
        color: C_TEXT_MUTED,
      });
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-academic-calendar-2026-2027.pdf'), pdfBytes);
  console.log('[+] Created msns-academic-calendar-2026-2027.pdf (' + pdfBytes.length + ' bytes)');
}

// -------------------------------------------------------------
// 4. MATRICULATION SCHEME OF STUDIES (BISE)
// -------------------------------------------------------------
async function buildMatricScheme() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const totalPages = 2;

  // PAGE 1: SCIENCE & CS GROUP OVERVIEW
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Matriculation Scheme of Studies (BISE Gujranwala)');

    let y = height - 95;

    page.drawText('BISE GUJRANWALA MATRICULATION CURRICULUM (9TH & 10TH GRADES)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 15;

    const intro =
      'M. S. Naz High School is registered and affiliated with the Board of Intermediate & Secondary Education (BISE) Gujranwala. We prepare matriculation candidates in both Science and Computer Science groups under Punjab Curriculum and Textbook Board (PCTB) and Single National Curriculum standards.';
    wrapText(intro, fonts.regular, 8.5, 515).forEach((il) => {
      page.drawText(il, { x: 40, y, size: 8.5, font: fonts.regular, color: C_TEXT_DARK });
      y -= 12;
    });

    y -= 10;

    page.drawRectangle({
      x: 40,
      y: y - 18,
      width: 515,
      height: 18,
      color: C_DARK_GREEN,
    });
    page.drawText('SCIENCE GROUP (BIOLOGY)  -  1200 TOTAL MARKS (600 IN 9TH + 600 IN 10TH)', {
      x: 46,
      y: y - 13,
      size: 8.5,
      font: fonts.bold,
      color: C_WHITE,
    });

    y -= 25;

    const sciSubjects = [
      { sub: 'English (Compulsory)', th9: '75', th10: '75', pr: ' - ', tot: '150' },
      { sub: 'Urdu (Compulsory)', th9: '75', th10: '75', pr: ' - ', tot: '150' },
      { sub: 'Islamiyat / Ethics (Compulsory)', th9: '50', th10: '50', pr: ' - ', tot: '100' },
      { sub: 'Pakistan Studies (Compulsory)', th9: '50', th10: '50', pr: ' - ', tot: '100' },
      { sub: 'Tarjuma-tul-Quran (Compulsory)', th9: '50', th10: '50', pr: ' - ', tot: '100' },
      { sub: 'Mathematics (Science)', th9: '75', th10: '75', pr: ' - ', tot: '150' },
      { sub: 'Physics', th9: '60', th10: '60', pr: '30', tot: '150' },
      { sub: 'Chemistry', th9: '60', th10: '60', pr: '30', tot: '150' },
      { sub: 'Biology', th9: '60', th10: '60', pr: '30', tot: '150' },
    ];

    page.drawRectangle({ x: 40, y: y - 16, width: 515, height: 16, color: C_BG_CARD, borderColor: C_BORDER, borderWidth: 0.5 });
    page.drawText('Subject Title', { x: 46, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('9th Theory', { x: 230, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('10th Theory', { x: 310, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('Practical', { x: 390, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('Total Marks', { x: 470, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    y -= 16;

    sciSubjects.forEach((s) => {
      page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 0.5, color: C_BORDER });
      y -= 15;
      page.drawText(s.sub, { x: 46, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(s.th9, { x: 245, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(s.th10, { x: 325, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(s.pr, { x: 405, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(s.tot, { x: 485, y: y + 3, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    });

    y -= 25;

    page.drawRectangle({
      x: 40,
      y: y - 65,
      width: 515,
      height: 65,
      color: C_LIGHT_GREEN,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('COMPUTER SCIENCE GROUP SPECIFICATION', {
      x: 52,
      y: y - 16,
      size: 9.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const csNote =
      'Students opting for Computer Science Group study Computer Science (60 Theory 9th + 60 Theory 10th + 30 Practical = 150 Marks) in place of Biology. The remaining 8 subjects (English, Urdu, Islamiyat, Pak Studies, Tarjuma-tul-Quran, Math, Physics, Chemistry) remain completely identical.';
    wrapText(csNote, fonts.regular, 8.5, 490).forEach((cl, ci) => {
      page.drawText(cl, { x: 52, y: y - 30 - ci * 12, size: 8.5, font: fonts.regular, color: C_DARK_GREEN });
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: PAPER PATTERN, LABS & PASSING CRITERIA
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Matriculation Paper Pattern & Academic Benchmarks');

    let y = height - 95;

    page.drawText('BOARD EXAMINATION PAPER PATTERN (SLO BASED)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 20;

    const sections = [
      { name: 'Part I: Objective Type (MCQs)', weight: '20% Marks', desc: 'Multiple Choice Questions testing knowledge recall, definitions, mathematical units, and formula identification.' },
      { name: 'Part II: Short Answer Questions', weight: '50% Marks', desc: 'Conceptual short response questions testing analytical understanding, brief derivations, and reasoning with internal choice.' },
      { name: 'Part III: Detailed / Long Questions', weight: '30% Marks', desc: 'In-depth comprehensive questions, multi-step problem solving, numerical problems, and laboratory procedure explanations.' },
    ];

    sections.forEach((sec) => {
      page.drawRectangle({
        x: 40,
        y: y - 38,
        width: 515,
        height: 38,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText(sec.name, { x: 50, y: y - 16, size: 9, font: fonts.bold, color: C_DARK_GREEN });
      page.drawText(sec.weight, { x: 450, y: y - 16, size: 9, font: fonts.bold, color: C_ACCENT_GOLD });
      page.drawText(sec.desc, { x: 50, y: y - 29, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });

      y -= 46;
    });

    y -= 15;

    page.drawRectangle({
      x: 40,
      y: y - 120,
      width: 515,
      height: 120,
      color: C_WHITE,
      borderColor: C_BORDER,
      borderWidth: 1,
    });

    page.drawText('LAB PRACTICALS, TEXTBOOKS & PASSING STANDARDS', {
      x: 52,
      y: y - 18,
      size: 10,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const policies = [
      '- Official Textbooks: Punjab Curriculum and Textbook Board (PCTB) sole authorized textbooks used exclusively.',
      '- Practical Notebooks: Board-certified practical journals maintained and signed weekly under faculty supervision.',
      '- Passing Marks Standard: Minimum 40% aggregate marks in each subject required as per the updated Punjab Boards gazette.',
      '- Pre-Board Send-Up Exam: Mandatory send-up exams conducted in January. Minimum 75% score required for regular board admission.',
      '- Remedial Coaching: Evening remedial clinics conducted free of charge for students requiring extra concept reinforcement.',
    ];

    policies.forEach((pol, pi) => {
      page.drawText(pol, {
        x: 52,
        y: y - 34 - pi * 14,
        size: 8,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-matriculation-scheme-of-studies.pdf'), pdfBytes);
  console.log('[+] Created msns-matriculation-scheme-of-studies.pdf (' + pdfBytes.length + ' bytes)');
}

// -------------------------------------------------------------
// 5. TUITION FEE POLICY & CHALLAN GUIDE
// -------------------------------------------------------------
async function buildFeePolicy() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const totalPages = 2;

  // PAGE 1: FEE SCHEDULE & DISCOUNTS
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Tuition Fee Policy & Challan Payment Guide');

    let y = height - 95;

    page.drawText('INSTITUTIONAL FEE STRUCTURE (SESSION 2026-2027)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 15;

    const fIntro =
      'M. S. Naz High School operates on a transparent, non-profit aligned fee model. All fees are reinvested into world-class faculty remuneration, state-of-the-art laboratory consumables, solar energy maintenance, and modern computing infrastructure.';
    wrapText(fIntro, fonts.regular, 8.5, 515).forEach((fl) => {
      page.drawText(fl, { x: 40, y, size: 8.5, font: fonts.regular, color: C_TEXT_DARK });
      y -= 12;
    });

    y -= 10;

    page.drawRectangle({ x: 40, y: y - 18, width: 515, height: 18, color: C_DARK_GREEN });
    page.drawText('SCHEDULE OF TUITION & ANNUAL DUES (IN PKR)', { x: 46, y: y - 13, size: 8.5, font: fonts.bold, color: C_WHITE });
    y -= 25;

    const feeData = [
      { wing: 'Playgroup & Nursery', adm: '5,000', sec: '2,000', mth: '3,500', ann: '3,000' },
      { wing: 'Kindergarten (KG)', adm: '5,000', sec: '2,000', mth: '3,800', ann: '3,000' },
      { wing: 'Primary (Grades 1 to 5)', adm: '6,000', sec: '2,500', mth: '4,200', ann: '3,500' },
      { wing: 'Middle (Grades 6 to 8)', adm: '7,000', sec: '3,000', mth: '4,800', ann: '4,000' },
      { wing: 'Matric 9th (Science / CS)', adm: '8,000', sec: '3,500', mth: '5,500', ann: '5,000' },
      { wing: 'Matric 10th (Science / CS)', adm: ' - ', sec: ' - ', mth: '5,800', ann: '5,000' },
    ];

    page.drawRectangle({ x: 40, y: y - 16, width: 515, height: 16, color: C_BG_CARD, borderColor: C_BORDER, borderWidth: 0.5 });
    page.drawText('Academic Division', { x: 46, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('Admission Fee', { x: 200, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('Security (Refund)', { x: 290, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('Monthly Tuition', { x: 385, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    page.drawText('Annual Fund', { x: 475, y: y - 12, size: 8, font: fonts.bold, color: C_DARK_GREEN });
    y -= 16;

    feeData.forEach((f) => {
      page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 0.5, color: C_BORDER });
      y -= 17;
      page.drawText(f.wing, { x: 46, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(f.adm, { x: 210, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(f.sec, { x: 305, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      page.drawText(f.mth, { x: 400, y: y + 3, size: 8, font: fonts.bold, color: C_DARK_GREEN });
      page.drawText(f.ann, { x: 485, y: y + 3, size: 8, font: fonts.regular, color: C_TEXT_DARK });
    });

    y -= 25;

    page.drawRectangle({
      x: 40,
      y: y - 75,
      width: 515,
      height: 75,
      color: C_LIGHT_GREEN,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('CONCESSIONS & SIBLING DISCOUNT POLICY', {
      x: 52,
      y: y - 18,
      size: 9.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const conc = [
      '- Sibling Discount: 20% tuition concession for the second enrolled child; 30% concession for the third child.',
      '- Merit Scholarships: 50% to 100% tuition waiver awarded to position holders scoring 90%+ in annual board exams.',
      '- Teacher / Staff Ward Concession: Special concessions apply to permanent institutional faculty dependents.',
    ];
    conc.forEach((c, ci) => {
      page.drawText(c, { x: 52, y: y - 32 - ci * 13, size: 8, font: fonts.regular, color: C_DARK_GREEN });
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: PAYMENT RULES & DIGITAL CHALLAN GUIDE
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Tuition Fee Policy  -  Payment Guidelines & LMS Challan');

    let y = height - 95;

    page.drawText('FEE BILLING CYCLES & PAYMENT DUE DATES', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 20;

    const billingRules = [
      { rule: 'Challan Issuance Date', detail: 'Fee bills are generated and issued by the 1st day of each calendar month.' },
      { rule: 'Payment Due Date', detail: 'Tuition fees must be cleared on or before the 10th day of the respective month.' },
      { rule: 'Late Surcharge', detail: 'A late surcharge of PKR 50 per day applies from the 11th to the 20th of the month.' },
      { rule: 'Re-Admission Policy', detail: 'Non-payment for two consecutive months leads to registration suspension.' },
    ];

    billingRules.forEach((b) => {
      page.drawRectangle({
        x: 40,
        y: y - 34,
        width: 515,
        height: 34,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 0.5,
      });

      page.drawText(b.rule, { x: 52, y: y - 15, size: 9, font: fonts.bold, color: C_DARK_GREEN });
      page.drawText(b.detail, { x: 180, y: y - 15, size: 8.5, font: fonts.regular, color: C_TEXT_DARK });

      y -= 40;
    });

    y -= 15;

    page.drawRectangle({
      x: 40,
      y: y - 150,
      width: 515,
      height: 150,
      color: C_WHITE,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('HOW TO PAY YOUR FEE: BANK CHALLAN & DIGITAL LMS', {
      x: 52,
      y: y - 20,
      size: 10,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const paySteps = [
      '1. On-Campus / Bank Counter Payment: Present printed 3-part bank challan at designated branches of Askari Bank or Bank of Punjab in Wazirabad / Ghakhar. Retain parent copy.',
      '2. LMS Portal Payment: Log in to https://lms.msns.edu.pk using your parent credentials. Navigate to Fee Ledger to generate instant voucher.',
      '3. Online Banking / 1Bill: Use your 1Bill invoice ID visible on the LMS challan via JazzCash, EasyPaisa, or any Pakistani banking mobile app.',
      '4. Instant Digital Receipt: Digital clearance receipts are automatically updated in your student LMS portal within 1 hour of online confirmation.',
      '5. Accounts Office Desk: For billing inquiries, contact Finance Desk at 055-6600000 or email accounts@msns.edu.pk.',
    ];

    paySteps.forEach((ps, psi) => {
      page.drawText(ps, {
        x: 52,
        y: y - 38 - psi * 18,
        size: 8,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-tuition-fee-policy-and-challan-guide.pdf'), pdfBytes);
  console.log('[+] Created msns-tuition-fee-policy-and-challan-guide.pdf (' + pdfBytes.length + ' bytes)');
}

// -------------------------------------------------------------
// 6. STUDENT CODE OF CONDUCT & UNIFORM RULES
// -------------------------------------------------------------
async function buildCodeOfConduct() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const totalPages = 2;

  // PAGE 1: DISCIPLINE & CODE OF CONDUCT
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Student Code of Conduct & Campus Regulations');

    let y = height - 95;

    page.drawText('INSTITUTIONAL CODE OF ETHICS & DISCIPLINE', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 15;

    const cIntro =
      'M. S. Naz High School is dedicated to nurturing disciplined, honest, and respectful students. Mutual respect, academic integrity, and campus decorum are the bedrock of our scholastic community.';
    wrapText(cIntro, fonts.regular, 8.5, 515).forEach((cl) => {
      page.drawText(cl, { x: 40, y, size: 8.5, font: fonts.regular, color: C_TEXT_DARK });
      y -= 12;
    });

    y -= 10;

    const rules = [
      {
        title: '1. Punctuality & Daily Assembly',
        text: 'School gates open at 7:30 AM and close promptly at 7:55 AM. All students must assemble for morning recitation, national anthem, and character pledge. Three late arrivals per month result in disciplinary warning.',
      },
      {
        title: '2. Mandatory 80% Attendance Threshold',
        text: 'Board of Intermediate & Secondary Education (BISE) regulations mandate a minimum of 80% attendance to qualify for board send-up examinations. Medical leave applications must be accompanied by certified medical practitioner notes.',
      },
      {
        title: '3. Digital Devices & Mobile Phone Prohibition',
        text: 'Students are strictly forbidden from bringing personal mobile phones, smartwatches, or entertainment electronics onto campus premises. Unauthorized devices will be confiscated until end of term.',
      },
      {
        title: '4. Zero Tolerance for Bullying & Harassment',
        text: 'Any form of physical, verbal, or psychological bullying is met with immediate suspension and formal disciplinary review. We enforce a nurturing and safe school environment for every student.',
      },
      {
        title: '5. Care for Campus Property & Laboratories',
        text: 'Students must treat school furniture, laboratory equipment, solar utilities, and computer workstations with diligence. Damage resulting from negligence will be charged to the parent account.',
      },
    ];

    rules.forEach((r) => {
      page.drawRectangle({
        x: 40,
        y: y - 48,
        width: 515,
        height: 48,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 0.75,
      });

      page.drawText(r.title, { x: 50, y: y - 16, size: 9, font: fonts.bold, color: C_DARK_GREEN });
      const rLines = wrapText(r.text, fonts.regular, 8, 490);
      rLines.forEach((rl, ri) => {
        page.drawText(rl, { x: 50, y: y - 28 - ri * 10, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      });

      y -= 56;
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: COMPLETE UNIFORM SPECIFICATIONS
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Official Student Uniform Specifications');

    let y = height - 95;

    page.drawText('OFFICIAL UNIFORM GUIDELINES (SUMMER & WINTER)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 20;

    page.drawRectangle({
      x: 40,
      y: y - 110,
      width: 515,
      height: 110,
      color: C_WHITE,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('BOYS UNIFORM SPECIFICATIONS (PRE-SCHOOL TO GRADE 10)', {
      x: 52,
      y: y - 18,
      size: 9.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const boysRules = [
      '- Summer Shirt: Crisp white half/full-sleeve collared shirt with official green school monogram on left pocket.',
      '- Trousers: Standard khaki dress trousers (neatly pressed, regular fit).',
      '- Winter Additions: Official bottle-green V-neck pullover sweater with school monogram or bottle-green blazer.',
      '- Footwear: Plain black oxford shoes (lace-up or velcro for juniors) with black socks and official bottle-green belt.',
      '- Grooming: Neat, short military-standard haircut. Jewelry, watches, or fancy wristbands are prohibited.',
    ];

    boysRules.forEach((br, bi) => {
      page.drawText(br, { x: 52, y: y - 34 - bi * 14, size: 8, font: fonts.regular, color: C_TEXT_DARK });
    });

    y -= 125;

    page.drawRectangle({
      x: 40,
      y: y - 110,
      width: 515,
      height: 110,
      color: C_WHITE,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('GIRLS UNIFORM SPECIFICATIONS (PRE-SCHOOL TO GRADE 10)', {
      x: 52,
      y: y - 18,
      size: 9.5,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const girlsRules = [
      '- Summer Qameez: Plain white A-line cotton qameez with bottle-green collar/piping and embroidered school crest.',
      '- Shalwar & Dupatta: White cotton shalwar with white cotton dupatta / sash (pinned neatly across shoulders).',
      '- Winter Additions: Official bottle-green V-neck woolen sweater or tailored bottle-green school blazer.',
      '- Footwear: Plain black closed shoes with white socks.',
      '- Hair & Grooming: Hair tied neatly in black ribbons/pins or plain white hijab. Nail polish and makeup are prohibited.',
    ];

    girlsRules.forEach((gr, gi) => {
      page.drawText(gr, { x: 52, y: y - 34 - gi * 14, size: 8, font: fonts.regular, color: C_TEXT_DARK });
    });

    y -= 125;

    page.drawRectangle({
      x: 40,
      y: y - 55,
      width: 515,
      height: 55,
      color: C_LIGHT_GREEN,
      borderColor: C_BORDER,
      borderWidth: 0.75,
    });

    page.drawText('PHYSICAL EDUCATION & SPORTS ATTIRE', {
      x: 52,
      y: y - 16,
      size: 9,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    page.drawText('On designated sports and physical education days, students wear their respective House T-Shirts (Iqbal / Jinnah / Sir Syed / Tipu Houses) with white sports track trousers and white athletic trainers.', {
      x: 52,
      y: y - 32,
      size: 8,
      font: fonts.regular,
      color: C_DARK_GREEN,
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-code-of-conduct-and-uniform-rules.pdf'), pdfBytes);
  console.log('[+] Created msns-code-of-conduct-and-uniform-rules.pdf (' + pdfBytes.length + ' bytes)');
}

// -------------------------------------------------------------
// 7. MATRIC ACADEMIC RESOURCE & BOARD EXAM GUIDE
// -------------------------------------------------------------
async function buildMatricResourceGuide() {
  const doc = await PDFDocument.create();
  const logo = await doc.embedJpg(logoBytes);
  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const totalPages = 2;

  // PAGE 1: TEXTBOOKS & MODEL PAPERS DIRECTORY
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Matric Resources: Books, Model Papers & Schemes');

    let y = height - 95;

    page.drawText('OFFICIAL MATRIC STUDY RESOURCES (PCTB & BISE GUJRANWALA)', {
      x: 40,
      y,
      size: 11,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    y -= 15;

    const intro =
      'This guide provides verified access to official textbooks, SLO-based model papers, 5-year past papers, and pairing assessment schemes for students preparing for BISE Gujranwala matriculation examinations.';
    wrapText(intro, fonts.regular, 8.5, 515).forEach((il) => {
      page.drawText(il, { x: 40, y, size: 8.5, font: fonts.regular, color: C_TEXT_DARK });
      y -= 12;
    });

    y -= 10;

    page.drawRectangle({ x: 40, y: y - 18, width: 515, height: 18, color: C_DARK_GREEN });
    page.drawText('1. PUNJAB CURRICULUM & TEXTBOOK BOARD (PCTB) E-BOOKS', { x: 46, y: y - 13, size: 8.5, font: fonts.bold, color: C_WHITE });
    y -= 25;

    const books = [
      { sub: 'Physics 9th & 10th', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'Chemistry 9th & 10th', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'Biology 9th & 10th', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'Computer Science 9th & 10th', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'Mathematics (Science)', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'English & Urdu Compulsory', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'Islamiyat & Pakistan Studies', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
      { sub: 'Tarjuma-tul-Quran-ul-Majeed', pub: 'Punjab Curriculum & Textbook Board', portal: 'pctb.punjab.gov.pk/E-Books' },
    ];

    books.forEach((b) => {
      page.drawRectangle({ x: 40, y: y - 18, width: 515, height: 18, color: C_BG_CARD, borderColor: C_BORDER, borderWidth: 0.5 });
      page.drawText(` ${b.sub}`, { x: 46, y: y - 13, size: 8, font: fonts.bold, color: C_DARK_GREEN });
      page.drawText(b.pub, { x: 230, y: y - 13, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });
      page.drawText(b.portal, { x: 410, y: y - 13, size: 7.5, font: fonts.bold, color: C_ACCENT_GOLD });
      y -= 22;
    });

    drawFooter(page, fonts, 1, totalPages);
  }

  // PAGE 2: MODEL PAPERS, PAST PAPERS & SCHEMES
  {
    const page = doc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    drawHeader(page, fonts, logo, 'Matric Resources: Model Papers, Past Papers & Schemes');

    let y = height - 95;

    page.drawRectangle({ x: 40, y: y - 18, width: 515, height: 18, color: C_DARK_GREEN });
    page.drawText('2. BISE GUJRANWALA MODEL PAPERS & 5-YEAR PAST PAPERS', { x: 46, y: y - 13, size: 8.5, font: fonts.bold, color: C_WHITE });
    y -= 30;

    const paperCategories = [
      {
        title: 'Official SLO-Based Model Papers (9th & 10th)',
        desc: 'Standardized model question papers released by BISE Gujranwala featuring SLO (Student Learning Outcomes) testing distribution across Knowledge (50%), Understanding (35%), and Application (15%).',
      },
      {
        title: '5-Year Past Papers Archive (Group 1 & Group 2)',
        desc: 'Comprehensive archive of previous matriculation board question papers covering both Morning (Group 1) and Evening (Group 2) sessions for Science and Computer Science tracks.',
      },
      {
        title: 'Pairing Schemes & Chapter Weightage Breakdown',
        desc: 'Subject-specific assessment frameworks outlining chapter-wise marks distribution, MCQ allocations, and short/long question pairing for optimal examination preparation.',
      },
    ];

    paperCategories.forEach((p) => {
      page.drawRectangle({
        x: 40,
        y: y - 60,
        width: 515,
        height: 60,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 0.75,
      });

      page.drawText(p.title, { x: 50, y: y - 18, size: 9.5, font: fonts.bold, color: C_DARK_GREEN });
      wrapText(p.desc, fonts.regular, 8, 490).forEach((pl, pi) => {
        page.drawText(pl, { x: 50, y: y - 32 - pi * 11, size: 8, font: fonts.regular, color: C_TEXT_DARK });
      });

      y -= 70;
    });

    y -= 10;

    page.drawRectangle({
      x: 40,
      y: y - 90,
      width: 515,
      height: 90,
      color: C_WHITE,
      borderColor: C_EMERALD,
      borderWidth: 1,
    });

    page.drawText('VERIFIED DIGITAL RESOURCE PORTALS', {
      x: 52,
      y: y - 20,
      size: 10,
      font: fonts.bold,
      color: C_DARK_GREEN,
    });

    const links = [
      '- Official BISE Gujranwala Portal: https://www.bisegrw.edu.pk (Downloads & Info Desk)',
      '- Punjab Curriculum and Textbook Board (PCTB): https://pctb.punjab.gov.pk/E-Books',
      '- MSNS Student LMS Portal: https://lms.msns.edu.pk (Digital Notes & Solved Papers Archive)',
      '- On-Campus Study Desk: Printed past paper booklets available at Main Campus Library Desk.',
    ];

    links.forEach((l, li) => {
      page.drawText(l, { x: 52, y: y - 36 - li * 13, size: 8, font: fonts.regular, color: C_TEXT_DARK });
    });

    drawFooter(page, fonts, 2, totalPages);
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'msns-bise-matric-resource-guide.pdf'), pdfBytes);
  console.log('[+] Created msns-bise-matric-resource-guide.pdf (' + pdfBytes.length + ' bytes)');
}

// RUN ALL BUILDERS
async function main() {
  console.log('Generating official branded PDF documents for M. S. Naz High School...');
  await buildProspectus();
  await buildAdmissionForm();
  await buildCalendar();
  await buildMatricScheme();
  await buildFeePolicy();
  await buildCodeOfConduct();
  await buildMatricResourceGuide();
  console.log('All 7 official documents generated successfully in public/documents/');
}

main().catch((err) => {
  console.error('Failed to generate documents:', err);
  process.exit(1);
});
