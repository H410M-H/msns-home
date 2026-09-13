// scripts/generate_comprehensive_prospectus.cjs
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } = require('pdf-lib');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Clean text to standard ASCII to prevent PDF encoding issues
const origDrawText = PDFPage.prototype.drawText;
PDFPage.prototype.drawText = function (text, options) {
  if (typeof text === 'string') {
    text = text.replace(/[^\x20-\x7E]/g, ' ');
  }
  return origDrawText.call(this, text, options);
};

const origWidth = PDFFont.prototype.widthOfTextAtSize;
PDFFont.prototype.widthOfTextAtSize = function (text, size) {
  if (typeof text === 'string') {
    text = text.replace(/[^\x20-\x7E]/g, ' ');
  }
  return origWidth.call(this, text, size);
};

// Brand Colors
const C_DARK_GREEN  = rgb(6 / 255, 78 / 255, 59 / 255);       // #064e3b
const C_DEEP_FOREST = rgb(2 / 255, 44 / 255, 34 / 255);       // #022c22
const C_EMERALD     = rgb(16 / 255, 185 / 255, 129 / 255);    // #10b981
const C_LIGHT_GREEN = rgb(236 / 255, 253 / 255, 245 / 255);   // #ecfdf5
const C_GOLD        = rgb(217 / 255, 119 / 255, 6 / 255);     // #d97706
const C_LIGHT_GOLD  = rgb(254 / 255, 243 / 255, 199 / 255);   // #fef3c7
const C_TEXT_DARK   = rgb(15 / 255, 23 / 255, 42 / 255);      // #0f172a
const C_TEXT_MUTED  = rgb(71 / 255, 85 / 255, 105 / 255);    // #475569
const C_BORDER      = rgb(226 / 255, 232 / 255, 240 / 255);    // #e2e8f0
const C_BG_CARD     = rgb(248 / 255, 250 / 255, 252 / 255);   // #f8fafc
const C_WHITE       = rgb(1, 1, 1);
const C_LIGHT_GRAY  = rgb(241 / 255, 245 / 255, 249 / 255);   // #f1f5f9
const C_NAVY        = rgb(30 / 255, 58 / 255, 138 / 255);     // #1e3a8a

const A4_W = 595.28;
const A4_H = 841.89;
const MARGIN = 42;
const CONTENT_W = A4_W - (MARGIN * 2); // 511.28

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

// Draw running header on content pages
function drawHeader(page, fonts, logoImg, title, category = "OFFICIAL PROSPECTUS 2026–2027") {
  // Top green stripe
  page.drawRectangle({
    x: 0,
    y: A4_H - 5,
    width: A4_W,
    height: 5,
    color: C_DARK_GREEN,
  });

  // Top gold accent line
  page.drawRectangle({
    x: 0,
    y: A4_H - 7,
    width: A4_W,
    height: 2,
    color: C_GOLD,
  });

  // Logo if available
  if (logoImg) {
    page.drawImage(logoImg, {
      x: MARGIN,
      y: A4_H - 54,
      width: 40,
      height: 40,
    });
  }

  // School name and section title
  const textX = logoImg ? MARGIN + 48 : MARGIN;
  page.drawText("M. S. NAZ HIGH SCHOOL", {
    x: textX,
    y: A4_H - 28,
    size: 11,
    font: fonts.bold,
    color: C_DARK_GREEN,
  });

  page.drawText(title.toUpperCase(), {
    x: textX,
    y: A4_H - 42,
    size: 9.5,
    font: fonts.bold,
    color: C_TEXT_DARK,
  });

  // Category pill at top right
  const catWidth = fonts.regular.widthOfTextAtSize(category, 7.5) + 16;
  page.drawRectangle({
    x: A4_W - MARGIN - catWidth,
    y: A4_H - 38,
    width: catWidth,
    height: 18,
    color: C_LIGHT_GREEN,
    borderColor: C_EMERALD,
    borderWidth: 0.8,
  });
  page.drawText(category, {
    x: A4_W - MARGIN - catWidth + 8,
    y: A4_H - 31,
    size: 7.5,
    font: fonts.bold,
    color: C_DARK_GREEN,
  });

  // Thin dividing line
  page.drawLine({
    start: { x: MARGIN, y: A4_H - 62 },
    end: { x: A4_W - MARGIN, y: A4_H - 62 },
    thickness: 0.8,
    color: C_BORDER,
  });
}

// Draw running footer on content pages
function drawFooter(page, fonts, pageNum, totalPages = 36) {
  page.drawLine({
    start: { x: MARGIN, y: 38 },
    end: { x: A4_W - MARGIN, y: 38 },
    thickness: 0.8,
    color: C_BORDER,
  });

  page.drawText("M. S. NAZ HIGH SCHOOL | BISE Gujranwala Code: 112199 | Oxford English Medium", {
    x: MARGIN,
    y: 25,
    size: 7.5,
    font: fonts.regular,
    color: C_TEXT_MUTED,
  });

  const pageStr = `Page ${pageNum} of ${totalPages}`;
  const pWidth = fonts.bold.widthOfTextAtSize(pageStr, 8);
  page.drawText(pageStr, {
    x: A4_W - MARGIN - pWidth,
    y: 25,
    size: 8,
    font: fonts.bold,
    color: C_DARK_GREEN,
  });
}

// Image resizer helper using sharp
async function optimizeImage(filePath, maxW = 900, maxH = 600) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const buf = await sharp(filePath)
      .resize(maxW, maxH, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 84 })
      .toBuffer();
    return buf;
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
    return null;
  }
}

// Main generation function
async function buildProspectus() {
  console.log("Starting 36-page Comprehensive Prospectus generation...");
  const pdfDoc = await PDFDocument.create();

  // Load fonts
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold:    await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    italic:  await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
  };

  // Load and embed real images
  console.log("Loading & optimizing real school images...");
  const rawLogo = await optimizeImage("F:/EVENTS/2022/DESIGN/SCHOOL's LOGO PSD  WORK/Official logo PNG.png", 200, 200);
  const logoImg = rawLogo ? await pdfDoc.embedPng(fs.readFileSync("F:/EVENTS/2022/DESIGN/SCHOOL's LOGO PSD  WORK/Official logo PNG.png")) : null;

  // Real photos map
  const imageFiles = {
    campusFront:   "F:/2023/SCHOOL'S PHOTOS/IMG_3125.JPG",
    campusHall:    "F:/2023/SCHOOL'S PHOTOS/IMG_3406.JPG",
    campusGrounds: "F:/2023/SCHOOL'S PHOTOS/IMG_3287.JPG",
    classroom1:    "F:/2023/SCHOOL'S PHOTOS/IMG_3147.JPG",
    classroom2:    "F:/2023/SCHOOL'S PHOTOS/IMG_3172.JPG",
    scienceLab:    "F:/2023/SCHOOL'S PHOTOS/IMG_3165.JPG",
    computerLab:   "F:/2023/SCHOOL'S PHOTOS/IMG_3218.JPG",
    library:       "F:/2023/SCHOOL'S PHOTOS/IMG_3421.JPG",
    studentsUni:   "F:/2023/SCHOOL'S PHOTOS/IMG_3419.JPG",
    studentsGroup: "F:/2023/SCHOOL'S PHOTOS/IMG_3302.JPG",
    annualStage:   "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_8976.JPG",
    annualAud:     "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_8987.JPG",
    annualAwards1: "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_9325.JPG",
    annualAwards2: "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_9336.JPG",
    annualDrama:   "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_9340.JPG",
    annualChoir:   "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_9350.JPG",
    facultyGroup:  "F:/2024/ANNUAL DAY, 2023-24/101D5600/DSC_9371.JPG",
    iqbalDay:      "F:/EVENTS/2022/DESIGN/IQBAL DAY/DCIM/100D5600/DSC_5486.JPG",
    ptm1:          "F:/EVENTS/2022/PTM 2022/DSC_5471.JPG",
    ptm2:          "F:/EVENTS/2022/PTM 2022/DSC_5476.JPG",
    uniformGuide:  "c:/msns/msns-home/public/images/uniform-leadership-guidelines.jpg",
    lmsDashboard:  "c:/msns/msns-home/public/images/lms-dashboard-showcase.jpg",
    lmsMockup:     "c:/msns/msns-home/public/images/lms-app-mockup.jpg",
  };

  const embeddedImages = {};
  for (const [key, p] of Object.entries(imageFiles)) {
    if (fs.existsSync(p)) {
      try {
        const optBuf = await optimizeImage(p, 900, 600);
        if (optBuf) {
          embeddedImages[key] = await pdfDoc.embedJpg(optBuf);
        }
      } catch (err) {
        console.warn(`Could not embed image ${key}:`, err.message);
      }
    }
  }
  console.log(`Successfully embedded ${Object.keys(embeddedImages).length} real photos.`);

  // Helper to render photo cards with border and caption
  function drawPhotoCard(page, img, x, y, w, h, caption) {
    if (!img) return;
    page.drawRectangle({
      x: x - 1,
      y: y - 1,
      width: w + 2,
      height: h + 2,
      color: C_WHITE,
      borderColor: C_BORDER,
      borderWidth: 1,
    });
    page.drawImage(img, { x, y, width: w, height: h });
    if (caption) {
      page.drawRectangle({
        x,
        y: y - 16,
        width: w,
        height: 16,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 0.8,
      });
      page.drawText(caption, {
        x: x + 6,
        y: y - 11,
        size: 7,
        font: fonts.italic,
        color: C_TEXT_MUTED,
      });
    }
  }

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  console.log("Generating Page 1: Cover Page...");
  const p1 = pdfDoc.addPage([A4_W, A4_H]);
  
  // Full bleed dark green top half
  p1.drawRectangle({
    x: 0,
    y: A4_H - 340,
    width: A4_W,
    height: 340,
    color: C_DARK_GREEN,
  });

  // Gold horizontal banner
  p1.drawRectangle({
    x: 0,
    y: A4_H - 346,
    width: A4_W,
    height: 6,
    color: C_GOLD,
  });

  // Monogram on Cover
  if (logoImg) {
    p1.drawImage(logoImg, {
      x: (A4_W - 84) / 2,
      y: A4_H - 120,
      width: 84,
      height: 84,
    });
  }

  // School Title
  const title1 = "M. S. NAZ HIGH SCHOOL";
  const wTitle1 = fonts.bold.widthOfTextAtSize(title1, 26);
  p1.drawText(title1, {
    x: (A4_W - wTitle1) / 2,
    y: A4_H - 160,
    size: 26,
    font: fonts.bold,
    color: C_WHITE,
  });

  const sub1 = "GHAKHAR MANDI & WAZIRABAD | GUJRANWALA, PUNJAB";
  const wSub1 = fonts.regular.widthOfTextAtSize(sub1, 9.5);
  p1.drawText(sub1, {
    x: (A4_W - wSub1) / 2,
    y: A4_H - 178,
    size: 9.5,
    font: fonts.regular,
    color: C_LIGHT_GREEN,
  });

  // Prospectus Big Header
  const title2 = "OFFICIAL INSTITUTIONAL PROSPECTUS";
  const wTitle2 = fonts.bold.widthOfTextAtSize(title2, 17);
  p1.drawText(title2, {
    x: (A4_W - wTitle2) / 2,
    y: A4_H - 225,
    size: 17,
    font: fonts.bold,
    color: C_GOLD,
  });

  const sessionText = "Academic Sessions 2026 – 2027";
  const wSess = fonts.bold.widthOfTextAtSize(sessionText, 13);
  p1.drawText(sessionText, {
    x: (A4_W - wSess) / 2,
    y: A4_H - 246,
    size: 13,
    font: fonts.bold,
    color: C_WHITE,
  });

  const motto = "Knowledge • Character • Leadership • Excellence";
  const wMotto = fonts.italic.widthOfTextAtSize(motto, 10);
  p1.drawText(motto, {
    x: (A4_W - wMotto) / 2,
    y: A4_H - 275,
    size: 10,
    font: fonts.italic,
    color: C_LIGHT_GREEN,
  });

  // Affiliation Badges Banner
  p1.drawRectangle({
    x: MARGIN,
    y: A4_H - 325,
    width: CONTENT_W,
    height: 30,
    color: C_DEEP_FOREST,
    borderColor: C_GOLD,
    borderWidth: 1,
  });
  const affilText = "Affiliated with BISE Gujranwala (Code: 112199) | Oxford University Press Curriculum | PEPRIS Registered";
  const wAffil = fonts.bold.widthOfTextAtSize(affilText, 8.5);
  p1.drawText(affilText, {
    x: (A4_W - wAffil) / 2,
    y: A4_H - 314,
    size: 8.5,
    font: fonts.bold,
    color: C_WHITE,
  });

  // Real Cover Image (Campus Front View or Annual Ceremony)
  const coverImg = embeddedImages.campusFront || embeddedImages.annualStage;
  if (coverImg) {
    p1.drawImage(coverImg, {
      x: MARGIN,
      y: 155,
      width: CONTENT_W,
      height: 310,
    });
    p1.drawRectangle({
      x: MARGIN,
      y: 155,
      width: CONTENT_W,
      height: 310,
      borderColor: C_DARK_GREEN,
      borderWidth: 2,
    });
  }

  // Key Highlights Bar at Bottom
  p1.drawRectangle({
    x: MARGIN,
    y: 50,
    width: CONTENT_W,
    height: 85,
    color: C_BG_CARD,
    borderColor: C_BORDER,
    borderWidth: 1,
  });

  const colW = CONTENT_W / 3;
  // Col 1
  p1.drawText("ACADEMIC EXCELLENCE", { x: MARGIN + 14, y: 114, size: 9, font: fonts.bold, color: C_DARK_GREEN });
  p1.drawText("100% Board Pass Record", { x: MARGIN + 14, y: 98, size: 8, font: fonts.regular, color: C_TEXT_DARK });
  p1.drawText("OUP English Medium Pre-School to 10th", { x: MARGIN + 14, y: 84, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });
  p1.drawText("Pre-Medical, Pre-Eng & Computer Sci", { x: MARGIN + 14, y: 70, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });

  // Col 2
  p1.drawText("DIGITAL CAMPUS & LMS", { x: MARGIN + colW + 14, y: 114, size: 9, font: fonts.bold, color: C_DARK_GREEN });
  p1.drawText("Live Mobile App & Parent Portal", { x: MARGIN + colW + 14, y: 98, size: 8, font: fonts.regular, color: C_TEXT_DARK });
  p1.drawText("Biometric Attendance & SMS Alerts", { x: MARGIN + colW + 14, y: 84, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });
  p1.drawText("Cloud Academic Vault & Online Fee", { x: MARGIN + colW + 14, y: 70, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });

  // Col 3
  p1.drawText("STUDENT LEADERSHIP", { x: MARGIN + (colW * 2) + 14, y: 114, size: 9, font: fonts.bold, color: C_DARK_GREEN });
  p1.drawText("Boy Scouts & Girl Guides", { x: MARGIN + (colW * 2) + 14, y: 98, size: 8, font: fonts.regular, color: C_TEXT_DARK });
  p1.drawText("High-Yield Board Question Banks", { x: MARGIN + (colW * 2) + 14, y: 84, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });
  p1.drawText("Safe Fleet Covering 30+ Localities", { x: MARGIN + (colW * 2) + 14, y: 70, size: 7.5, font: fonts.regular, color: C_TEXT_MUTED });

  // Footer URL
  const footUrl = "Official Website: www.msns.edu.pk  |  LMS Portal: lms.msns.edu.pk  |  Admissions Desk: 055-6601234";
  const wFoot = fonts.regular.widthOfTextAtSize(footUrl, 8);
  p1.drawText(footUrl, {
    x: (A4_W - wFoot) / 2,
    y: 26,
    size: 8,
    font: fonts.regular,
    color: C_TEXT_MUTED,
  });

  // ==========================================
  // PAGES 2 TO 36: STRUCTURED CONTENT
  // ==========================================
  const pageDefinitions = [
    // PAGE 2
    {
      pageNumber: 2,
      headerTitle: "Institutional Profile & Table of Contents",
      category: "OVERVIEW",
      photo: embeddedImages.campusHall,
      photoCaption: "M. S. Naz High School Main Administrative Wing & Academic Quadrangle",
      photoH: 155,
      sections: [
        {
          heading: "1. Institutional Accreditation & Statutory Profile",
          paragraphs: [
            "M. S. Naz High School is an established premier secondary educational institution registered with the School Education Department, Government of the Punjab (under PEPRIS), and permanently affiliated with the Board of Intermediate and Secondary Education (BISE) Gujranwala under institutional code 112199.",
            "Established in Ghakhar Mandi and serving the wider Wazirabad and Gujranwala metropolitan corridor, the institution delivers an integrated academic continuum spanning Early Childhood Education, Primary Wing (Grades 1–5), Middle School (Grades 6–8), and Secondary School Certificate (SSC / Matriculation Grades 9 & 10) in Science (Biology & Computer Science streams)."
          ]
        },
        {
          heading: "2. Comprehensive Prospectus Directory (Pages 1 – 36)",
          paragraphs: [
            "• PART I: LEADERSHIP, VISION & HERITAGE (Pages 3 – 6): Chairman's Message, Principal's Address, School History, Mission & Values.",
            "• PART II: CAMPUS INFRASTRUCTURE & LABS (Pages 7 – 11): Campus Facilities, Physics & Chemistry Labs, Biology Lab, IT Labs, Library.",
            "• PART III: ACADEMIC CONTINUUM & CURRICULUM (Pages 12 – 18): Wings Structure, Pre-School, Primary, Middle, Matric Science & CS, High-Yield Methodology.",
            "• PART IV: LEADERSHIP, UNIFORMS & LMS (Pages 19 – 22): Scout/Guide Corps, Uniform Grooming, Naz Cloud LMS ERP, Faculty Profile.",
            "• PART V: CO-CURRICULAR, SPORTS & TARBIYAH (Pages 23 – 27): Annual Day Gala, Declamation & Qirat, Sports Program, Islamic Ethics, Counseling.",
            "• PART VI: ASSESSMENTS, RESULTS & PARENT PARTNERSHIP (Pages 28 – 31): Exam Architecture, Board Results Honor Roll, PTMs, Campus Discipline.",
            "• PART VII: SAFETY, TRANSPORT & FLEET (Pages 32 – 33): 24/7 Campus Security, RO Water, Dedicated Transport Fleet (34 Localities).",
            "• PART VIII: FEES, AID & ADMISSION ROADMAP (Pages 34 – 36): Tuition Fees, Scholarships & Concessions, Step-by-Step Admissions & Directory."
          ]
        }
      ]
    },

    // PAGE 3
    {
      pageNumber: 3,
      headerTitle: "Chairman's Address & Founding Vision",
      category: "LEADERSHIP",
      photo: embeddedImages.annualAud,
      photoCaption: "Patrons, Distinguished Guests, and Community Dignitaries at MSNS Annual Convocation",
      photoH: 155,
      sections: [
        {
          heading: "Message from the Patron-in-Chief & Board of Governors",
          paragraphs: [
            "\"Education is not merely the transmission of factual knowledge; it is the deliberate cultivation of intellect, character, moral fortitude, and purposeful citizenship. When M. S. Naz High School was founded, our foremost commitment was to bring elite, modern, English-medium education within accessible reach of families across Ghakhar Mandi, Wazirabad, and the surrounding rural communities.\"",
            "Over more than three decades of unbroken service, we have witnessed our alumni rise to become prominent physicians, software engineers, civil servants, armed forces officers, and conscientious community leaders. This legacy of excellence is anchored in our uncompromising insistence on high academic rigor paired with timeless Islamic ethics (Tarbiyah).",
            "As we welcome the 2026–2027 academic year, our investments in advanced STEM laboratories, the Naz Digital LMS ecosystem, and structured faculty training reaffirm our pledge: every student entrusted to us receives an education that empowers them to compete globally while remaining firmly anchored in faith and integrity."
          ]
        },
        {
          heading: "Our Unshakable Pledge to Parents",
          paragraphs: [
            "We hold ourselves to the highest standards of institutional transparency, academic accountability, and child safety. Your child's intellectual growth, spiritual grounding, and physical well-being remain our supreme responsibility from the moment they step onto our campus."
          ]
        }
      ]
    },

    // PAGE 4
    {
      pageNumber: 4,
      headerTitle: "Principal's Message & Educational Philosophy",
      category: "ACADEMICS",
      photo: embeddedImages.annualStage,
      photoCaption: "Principal and Senior Faculty Presiding Over Annual Academic Honors",
      photoH: 150,
      sections: [
        {
          heading: "From the Desk of the Principal",
          paragraphs: [
            "\"Welcome to M. S. Naz High School. As head of this esteemed institution, it is my privilege to lead a team of deeply devoted educators who view teaching not as an occupation, but as a sacred trust.\"",
            "Our educational philosophy rests on three foundational pillars: Conceptual Clarity, Continuous Formative Evaluation, and Compassionate Mentorship. In an era dominated by rapid technological disruption and artificial intelligence, rote learning has become obsolete. At MSNS, students are trained to question, analyze, hypothesize, and construct evidence-based solutions.",
            "From Grade 1 onward, our students are immersed in the world-renowned Oxford University Press curriculum, developing natural fluency in the English language alongside mastery of mathematical logic and scientific curiosity. In the Matriculation wing (SSC), our targeted Student Learning Outcomes (SLO) methodology guarantees exceptional board examination results without subjecting students to debilitating stress."
          ]
        },
        {
          heading: "The Naz Graduate Profile",
          paragraphs: [
            "A graduate of M. S. Naz High School is distinguished by: (1) Uncompromising moral integrity and respect for elders; (2) Exemplary fluency in written and spoken English and Urdu; (3) Solid mastery of mathematics and empirical sciences; (4) Digital fluency across modern IT tools; and (5) A proactive ethos of public service."
          ]
        }
      ]
    },

    // PAGE 5
    {
      pageNumber: 5,
      headerTitle: "School Heritage, History & Milestones",
      category: "HERITAGE",
      photo: embeddedImages.campusGrounds,
      photoCaption: "Historic Expansion of M. S. Naz High School Campus Grounds and Infrastructure",
      photoH: 150,
      sections: [
        {
          heading: "Three Decades of Educational Transformation",
          paragraphs: [
            "M. S. Naz High School was founded with a transformative objective: to establish an academic center of excellence in Ghakhar Mandi that would eliminate the need for parents to send their children to distant cities for quality English-medium education.",
            "From modest beginnings with a single academic block, the institution has expanded into a sprawling multi-wing campus featuring specialized physics, chemistry, and biology laboratories, dual computer labs, a centralized library, and dedicated sports grounds.",
            "1990–2000: Foundation era and establishment of primary and middle school wings with strict Oxford curriculum adoption. Recognition by the Punjab Education Department.",
            "2001–2015: Formal permanent affiliation with BISE Gujranwala. First batch of Matric students achieves 100% first-division pass rates, establishing the school as a board benchmark.",
            "2016–2026: Modernization decade. Introduction of computerized science labs, multimedia smart learning, launch of the proprietary Naz LMS Mobile Portal with 15 TB cloud vault, and expansion of the transport fleet to 34 surrounding cities and villages."
          ]
        }
      ]
    },

    // PAGE 6
    {
      pageNumber: 6,
      headerTitle: "Vision, Mission & Five Core Values",
      category: "PHILOSOPHY",
      photo: embeddedImages.studentsUni,
      photoCaption: "Students Embodying the Core Values of Discipline, Integrity, and Academic Rigor",
      photoH: 145,
      sections: [
        {
          heading: "Our Vision Statement",
          paragraphs: [
            "\"To be recognized as the premier benchmark school in the Punjab province, distinguished for cultivating academically accomplished, ethically upright, and technologically empowered leaders capable of addressing the challenges of an interconnected world.\""
          ]
        },
        {
          heading: "Our Mission Statement",
          paragraphs: [
            "\"To deliver an intellectually demanding, values-centered education that integrates the Single National Curriculum and Oxford international frameworks with rich Islamic ethics; providing safe, modern facilities and individualized attention that inspire every learner to realize their highest academic and personal potential.\""
          ]
        },
        {
          heading: "The Five Core Pillars (Al-Qiyam)",
          paragraphs: [
            "1. FAITH & INTEGRITY (Iman & Amanah): Unyielding commitment to truthfulness, ethical transparency, and reverence for Islamic principles in thought and action.",
            "2. INTELLECTUAL RIGOR (Ihsan): Pursuing perfection in academic work, rejecting superficial understanding, and striving for mastery in all disciplines.",
            "3. DISCIPLINE & RESPECT (Adab): Fostering mutual honor between teachers and learners, adherence to campus punctuality, and self-governance.",
            "4. INNOVATION & INQUIRY (Jiddat): Encouraging analytical curiosity, laboratory experimentation, and creative problem-solving.",
            "5. CIVIC LEADERSHIP (Khidmat): Instilling social responsibility, compassion for the marginalized, and active volunteerism in community welfare."
          ]
        }
      ]
    },

    // PAGE 7
    {
      pageNumber: 7,
      headerTitle: "Campus Architecture & Physical Infrastructure",
      category: "FACILITIES",
      photo: embeddedImages.campusFront,
      photoCaption: "Main Academic Building with Engineered Seismic-Resistant Architecture",
      photoH: 160,
      sections: [
        {
          heading: "Purpose-Built Academic Environment",
          paragraphs: [
            "The M. S. Naz High School campus has been deliberately engineered to provide an optimal learning environment that balances natural light, superior acoustics, and physical safety. Spread across expansive grounds in Ghakhar Mandi, the physical infrastructure features distinct academic corridors for kindergarten, primary, middle, and matriculation sections.",
            "• Spacious, Well-Ventilated Classrooms: Each classroom is designed with high ceilings and wide windows ensuring abundant airflow and natural daylight, furnished with ergonomic student desks.",
            "• Dual Uninterruptible Power Architecture: To ensure uninterrupted education in all seasons, the campus operates a hybrid 30 kVA commercial diesel generator synchronized with an automated high-capacity solar array, providing continuous power for fans, smart displays, computers, and water systems.",
            "• Comprehensive 24/7 CCTV & Security Perimeter: High-definition security cameras monitor all entry points, corridors, playgrounds, and perimeter walls with a dedicated security control room.",
            "• Reverse Osmosis (RO) Safe Water Stations: Multi-stage commercial water filtration plants provide pure, laboratory-tested drinking water throughout the campus."
          ]
        }
      ]
    },

    // PAGE 8
    {
      pageNumber: 8,
      headerTitle: "Modern Science Laboratories: Physics & Chemistry",
      category: "FACILITIES",
      photo: embeddedImages.scienceLab,
      photoCaption: "Senior Students Performing Optics and Electrical Experiments in Physics Lab",
      photoH: 155,
      sections: [
        {
          heading: "Empirical Learning Through Hands-on Experimentation",
          paragraphs: [
            "Science education at MSNS moves far beyond memorizing textbook formulas. Our dedicated Physics and Chemistry Laboratories are fully equipped according to the rigorous practical specifications mandated by the Board of Intermediate and Secondary Education (BISE) Gujranwala.",
            "• Dedicated Physics Laboratory: Equipped with precision optical benches, glass prisms, concave/convex lenses, spherometers, vernier calipers, screw gauges, resonance apparatus, resistance boxes, galvanometers, ammeters, and complete circuitry kits. Students individually perform every practical mandated for 9th and 10th grades.",
            "• Dedicated Chemistry Laboratory: Features chemical-resistant ceramic workstations, safety fume-extraction systems, centralized gas burners, analytical balances, burettes, pipettes, and comprehensive reagent inventories. Students perform acid-base titrations, salt analysis, chemical kinetics investigations, and solubility experiments under direct teacher supervision.",
            "• Safety Protocols: Eye wash stations, fire extinguishers, first aid kits, and mandatory lab aprons protect students during all laboratory hours."
          ]
        }
      ]
    },

    // PAGE 9
    {
      pageNumber: 9,
      headerTitle: "Biology & Life Sciences Laboratory",
      category: "FACILITIES",
      photo: embeddedImages.classroom2,
      photoCaption: "Practical Demonstration of Cellular Structures Under High-Power Compound Microscopes",
      photoH: 150,
      sections: [
        {
          heading: "Investigating the Living World with Scientific Precision",
          paragraphs: [
            "The MSNS Biology Laboratory provides an immersive environment where students explore anatomical structures, cellular biology, genetics, and ecology. Designed specifically for SSC Science stream candidates preparing for pre-medical trajectories, the lab bridges theoretical textbooks and living phenomena.",
            "• Precision Optical Microscopy: Individual high-power monocular and binocular compound microscopes allowing students to examine plant and animal cells, mitosis/meiosis stages, protozoa, and histological tissue sections.",
            "• Comprehensive Specimen & Herbarium Archives: Extensive collections of preserved biological specimens representing diverse animal phyla, plant divisions, skeletal models, human torso anatomical models, and botanical mounts.",
            "• Biochemical & Physiological Testing: Equipment for food nutrient tests (Benedict's test for reducing sugars, Iodine test for starch, Biuret test for proteins), transpiration potometers, and respiratory bell jars.",
            "• BISE Practical Readiness: Weekly 90-minute practical sessions ensure that every student masters specimen identification, slide preparation, and viva-voce presentation months before the final board examination."
          ]
        }
      ]
    },

    // PAGE 10
    {
      pageNumber: 10,
      headerTitle: "Advanced Computer Science & IT Labs",
      category: "TECHNOLOGY",
      photo: embeddedImages.computerLab,
      photoCaption: "Networked Computer Laboratory with 40+ Modern High-Speed Workstations",
      photoH: 155,
      sections: [
        {
          heading: "Digital Literacy, Programming & Modern IT Competence",
          paragraphs: [
            "In an economy driven by software and artificial intelligence, computer science education at M. S. Naz High School starts from primary classes and culminates in an intensive secondary matric curriculum.",
            "• Workstation Infrastructure: Over 40 modern networked PCs equipped with high-speed multi-core processors, SSD storage, LED monitors, and Gigabit Ethernet connectivity.",
            "• Programming & Coding Curriculum: Students in grades 6–8 learn algorithmic thinking and logic design, transitioning in grades 9 & 10 to C language programming, syntax structures, loops, arrays, pointers, functions, and file handling according to BISE SLO guidelines.",
            "• Web Technologies & Office Productivity: Comprehensive training in Microsoft Office (Word, Excel, PowerPoint), HTML/CSS fundamentals, database design principles, and cybersecurity awareness.",
            "• Safe Fiber-Optic Broadband: Dedicated enterprise fiber connection with hardware firewall and content filtering ensuring safe, educational-only internet access.",
            "• Multimedia Smart Classroom Integration: Interactive projector displays allow instructors to demonstrate coding live, conduct debugging sessions, and display architectural schematics."
          ]
        }
      ]
    },

    // PAGE 11
    {
      pageNumber: 11,
      headerTitle: "Central Library & Resource Center",
      category: "FACILITIES",
      photo: embeddedImages.library,
      photoCaption: "Students Engaging in Independent Research and Reading in Central Library",
      photoH: 150,
      sections: [
        {
          heading: "The Intellectual Heart of the Campus",
          paragraphs: [
            "The Central Library at M. S. Naz High School serves as an expansive repository of knowledge, intellectual exploration, and quiet reflection. Fostering an enduring love for reading is among our paramount institutional objectives.",
            "• Extensive Print Collection (5,000+ Volumes): Encompassing Oxford classical literature, contemporary English fiction, Urdu poetry and literary anthologies, encyclopedias (Britannica, World Book), science compendiums, historical archives, and national biographies.",
            "• Islamic Scholarship & Seerah Section: Comprehensive collections of the Holy Quran with authoritative exegeses (Tafseer), Hadith compendiums (Sahih Bukhari, Sahih Muslim), Islamic jurisprudence, and biographical works on the Prophet Muhammad (PBUH) and the Companions.",
            "• Board Reference & Past Paper Archive: Fully indexed five-year past examination papers from BISE Gujranwala, Lahore, and Rawalpindi boards, alongside examiner report rubrics, model SLO papers, and subject dictionaries.",
            "• Weekly Reading Periods: Every class from Grade 1 to 10 has a dedicated weekly library period where students borrow books, prepare book reviews, and present oral summaries."
          ]
        }
      ]
    },

    // PAGE 12
    {
      pageNumber: 12,
      headerTitle: "Three-Tier Academic Hierarchy & Structure",
      category: "ACADEMICS",
      photo: embeddedImages.classroom1,
      photoCaption: "Differentiated Academic Environments Engineered for Distinct Developmental Stages",
      photoH: 150,
      sections: [
        {
          heading: "Vertical Articulation from Early Childhood to Secondary Matric",
          paragraphs: [
            "To provide age-appropriate pedagogy, academic guidance, and social nurturing, M. S. Naz High School is structured into three distinct yet seamlessly coordinated academic wings:",
            "1. EARLY CHILDHOOD WING (Playgroup, Nursery, Kindergarten): Focused on sensory discovery, phonics foundations, motor skill coordination, social integration, and joyful learning through play. Nurturing female educators create a warm, anxiety-free atmosphere.",
            "2. PRIMARY SCHOOL WING (Grades 1 to 5): Transitioning into formal academic disciplines with the prestigious Oxford University Press curriculum. Emphasis on reading fluency, mental mathematics, scientific curiosity, bilingual expression (English & Urdu), and moral character formation.",
            "3. MIDDLE & SECONDARY MATRICULATION WING (Grades 6 to 10): Rigorous departmentalized instruction with subject-matter master teachers. Students transition through conceptual science and IT foundations in Grades 6–8 before entering BISE Gujranwala board examination preparation in Grades 9 and 10 (SSC Science & Computer Science groups).",
            "Each wing is overseen by an experienced Section Head who closely monitors teacher lesson plans, classroom delivery, student notebooks, and individual academic trajectories."
          ]
        }
      ]
    },

    // PAGE 13
    {
      pageNumber: 13,
      headerTitle: "Early Childhood & Kindergarten Wing",
      category: "PRE-SCHOOL",
      photo: embeddedImages.studentsGroup,
      photoCaption: "Early Years Students Participating in Joyful Social and Cognitive Learning Activities",
      photoH: 150,
      sections: [
        {
          heading: "Foundational Learning in a Loving, Stimulating Environment",
          paragraphs: [
            "The earliest years of education establish a child's neurological framework for all future learning. At M. S. Naz High School, our Early Childhood Wing is specifically organized to celebrate curiosity, creativity, and natural discovery.",
            "• Synthetic Phonics English Language Framework: Children master 42 phonetic sounds, sound blending, and digraphs rather than rote alphabet memorization. By Kindergarten, students read simple storybooks independently with clear pronunciation.",
            "• Hands-on Sensorial & Mathematical Apparatus: Utilizing specialized wooden counting blocks, geometric solids, number rods, and bead bars to build deep intuitive understanding of quantities, addition, and spatial relationships.",
            "• Urdu & Tarbiyah Foundations: Daily Urdu phonetic rhymes, basic Quranic Noorani Qaida recognition, daily prayer manners, greetings (Salam), and table manners.",
            "• Motor Skill & Artistic Expression: Clay modeling, paper cutting, crayon blending, coloring, and puzzle solving to develop fine motor dexterity essential for fluid handwriting.",
            "• Safe Indoor Activity Zones: Colorful soft play areas, educational toy stations, and interactive storytelling corners."
          ]
        }
      ]
    },

    // PAGE 14
    {
      pageNumber: 14,
      headerTitle: "Primary School Curriculum (Grades 1 to 5)",
      category: "ACADEMICS",
      photo: embeddedImages.classroom2,
      photoCaption: "Primary Students Developing Mental Mathematics and English Language Fluency",
      photoH: 150,
      sections: [
        {
          heading: "Oxford Curriculum & Strong Foundational Competence",
          paragraphs: [
            "During the primary years, academic habits, reading discipline, and logical reasoning crystallize. M. S. Naz High School implements the rigorous Oxford University Press (OUP) curriculum across core disciplines, fully aligned with the Single National Curriculum (SNC) standards.",
            "• Oxford Progressive English: Comprehensive reading comprehension, vocabulary enrichment, grammatical structures, creative essay writing, and public speaking dialogues.",
            "• Oxford New Syllabus Mathematics: Developing mental agility, multi-digit operations, fractions, basic geometry, data handling, and real-world word problem decomposition.",
            "• General Science & Environmental Awareness: Hands-on exploration of living organisms, matter, energy, simple machines, weather patterns, and the human body with classroom experiments.",
            "• Urdu Literature & Creative Composition: Rich Urdu poetry, prose, reading comprehension, calligraphy, and essay writing cultivating cultural pride.",
            "• Tarjuma-tul-Quran & Islamiat: Daily recitation with proper Tajweed, memorization of daily Duas and short Surahs, moral stories from the life of the Prophet (PBUH).",
            "• Social Studies & Pakistan Studies: Geography, community civics, national heritage, and historical awareness."
          ]
        }
      ]
    },

    // PAGE 15
    {
      pageNumber: 15,
      headerTitle: "Middle School Academic Program (Grades 6 to 8)",
      category: "ACADEMICS",
      photo: embeddedImages.classroom1,
      photoCaption: "Middle School Students Transitioning to Analytical Problem Solving and Science",
      photoH: 150,
      sections: [
        {
          heading: "Bridge to Secondary Board Excellence",
          paragraphs: [
            "Middle School is the critical bridge where students transition from primary general education to departmentalized academic disciplines. At MSNS, the middle school curriculum is engineered to ignite deep analytical thinking and prepare candidates for matriculation success.",
            "• Differentiated Subject Instruction: Taught by specialized subject masters in Physics, Chemistry, Biology, Mathematics, English, Urdu, and Computer Studies.",
            "• Scientific Foundations & Laboratory Orientation: Transition from textbook general science to foundational physics (mechanics, optics), chemistry (periodic table, reactions, atomic structure), and biology (cells, systems, ecology). Weekly scheduled lab experiments introduce safety standards.",
            "• Advanced Mathematics: Algebraic expressions, factorization, simultaneous equations, plane geometry, trigonometry fundamentals, and commercial mathematics.",
            "• Computer Literacy & Coding Foundations: Introduction to algorithm design, flowcharting, presentation software, and foundational programming concepts.",
            "• English Language Proficiency: Focus on formal essay writing, letter and application formats, dialogue writing, active/passive voice, direct/indirect speech, and literary analysis."
          ]
        }
      ]
    },

    // PAGE 16
    {
      pageNumber: 16,
      headerTitle: "Matriculation Science Group (BISE Gujranwala)",
      category: "MATRIC PORTAL",
      photo: embeddedImages.scienceLab,
      photoCaption: "Matric Science Students Preparing for BISE Gujranwala Board Practical Exams",
      photoH: 150,
      sections: [
        {
          heading: "SSC Science Curriculum Breakdown (SSC-I & SSC-II)",
          paragraphs: [
            "The Secondary School Certificate (SSC) Science Group is the flagship academic pathway at M. S. Naz High School, affiliated with the Board of Intermediate and Secondary Education (BISE) Gujranwala. Designed for students aspiring toward pre-medical, pre-engineering, and advanced scientific disciplines.",
            "• Scheme of Studies & Marks Allocation (Total 1200 Marks Across 9th & 10th):",
            "  1. Physics (Theory 60 + Practical 30 in Class 10 = 150 Marks Total)",
            "  2. Chemistry (Theory 60 + Practical 30 in Class 10 = 150 Marks Total)",
            "  3. Biology (Theory 60 + Practical 30 in Class 10 = 150 Marks Total)",
            "  4. Mathematics - Science (75 Marks in 9th + 75 Marks in 10th = 150 Marks Total)",
            "  5. English Compulsory (75 Marks in 9th + 75 Marks in 10th = 150 Marks Total)",
            "  6. Urdu Compulsory (75 Marks in 9th + 75 Marks in 10th = 150 Marks Total)",
            "  7. Tarjuma-tul-Quran Majeed (50 Marks in 9th + 50 Marks in 10th = 100 Marks Total)",
            "  8. Islamiyat Compulsory (50 Marks in 9th + 50 Marks in 10th = 100 Marks Total)",
            "  9. Pakistan Studies (50 Marks in 9th + 50 Marks in 10th = 100 Marks Total)",
            "• Specialized Coaching & Remedial Clinics: Daily testing regimens, concept clearing sessions, and personalized mentoring ensure complete syllabus coverage 3 months before board exams."
          ]
        }
      ]
    },

    // PAGE 17
    {
      pageNumber: 17,
      headerTitle: "Matriculation Computer Science Group",
      category: "MATRIC PORTAL",
      photo: embeddedImages.computerLab,
      photoCaption: "Matric Computer Science Candidates Mastering C Programming in the IT Suite",
      photoH: 150,
      sections: [
        {
          heading: "SSC Computer Science Stream (BISE Gujranwala)",
          paragraphs: [
            "For students with a passion for software development, IT engineering, artificial intelligence, and computing technologies, MSNS offers an elite Computer Science stream in the Matriculation wing.",
            "• Computer Science Syllabus Breakdown:",
            "  - Class 9: Problem solving, binary number systems, networks, computer communications, data communication protocols, and cyber ethics.",
            "  - Class 10: Programming in C language (syntax, data types, conditional if-else statements, switch case, loops, functions, array manipulations), and basic HTML/CSS website development.",
            "• Comprehensive Practical Component: Practical examinations (50 marks conducted in Class 10) require students to write, compile, and debug functional C programs in the laboratory and present practical notebooks alongside oral viva examinations.",
            "• Integrated Career Orientation: Equips students for immediate progression into ICS (Intermediate in Computer Science), software engineering degrees, data science, and technology entrepreneurship."
          ]
        }
      ]
    },

    // PAGE 18
    {
      pageNumber: 18,
      headerTitle: "Naz High-Yield Academic Methodology",
      category: "METHODOLOGY",
      photo: embeddedImages.classroom1,
      photoCaption: "Targeted Classroom Instruction Focused on Board SLO Mastery and Time Management",
      photoH: 150,
      sections: [
        {
          heading: "The 4-Phase System Delivering 100% Board Pass Rates",
          paragraphs: [
            "Our consistent record of top positions and first-division distinctions in BISE Gujranwala is the direct product of our proprietary High-Yield Academic Methodology:",
            "PHASE 1: CONCEPT MASTERY & DAILY TESTS (April – October): Thorough syllabus teaching using interactive whiteboards and textbooks. Every single morning begins with a 15-minute diagnostic test from the previous day's lecture. Immediate correction identifies learning gaps.",
            "PHASE 2: MODULAR UNIT ASSESSMENTS (November – December): Rigorous full-chapter examinations simulating board paper conditions. Focus on board-favorite conceptual questions, diagram labeling, and mathematical derivations.",
            "PHASE 3: THE PRE-BOARD PHASE SERIES (January – February): Three complete rounds of full-syllabus pre-board examinations conducted under strict board examination conditions (exact timings, official roll numbers, printed board-pattern answer sheets).",
            "PHASE 4: BOARD PAPER PRESENTATION CLINICS (February – March): Masterclass workshops focusing on time management, answer formatting, headings, neat diagrams, and avoiding common board examiner penalties."
          ]
        }
      ]
    },

    // PAGE 19
    {
      pageNumber: 19,
      headerTitle: "Student Leadership: Boy Scouts & Girl Guides",
      category: "LEADERSHIP",
      photo: embeddedImages.uniformGuide,
      photoCaption: "Official Naz High School Uniform & Leadership Guidelines Specification",
      photoH: 185,
      sections: [
        {
          heading: "Cultivating Character, Service, and Civic Duty",
          paragraphs: [
            "Leadership at M. S. Naz High School is an active, experiential discipline. Our Boy Scout and Girl Guide corps represent the pinnacle of student responsibility, discipline, and community service.",
            "• BOY SCOUT LEADER CORPS: Registered with the Pakistan Boy Scouts Association. Distinctive khaki uniform, official green beret with brass scout insignia, red neckerchief with woggle, dual-language sash (English & Urdu), and polished brown leather belt. Scouts undergo outdoor camping, first-aid training, disaster management, and manage campus assembly discipline.",
            "• GIRL GUIDE LEADER CORPS: Affiliated with the Pakistan Girl Guides Association. Dignified white shalwar kameez with rich emerald green leader sash, guide badge, and white canvas shoes. Guides lead community hygiene campaigns, literacy drives, and cultural ceremonies.",
            "• Student Prefect Council: Comprising the Head Boy, Head Girl, Sports Captains, and Class Monitors who represent student voice and assist administration."
          ]
        }
      ]
    },

    // PAGE 20
    {
      pageNumber: 20,
      headerTitle: "Official Student Uniform & Grooming Code",
      category: "DISCIPLINE",
      photo: embeddedImages.studentsUni,
      photoCaption: "Standard Student Uniform Worn with Pride and Meticulous Attention to Detail",
      photoH: 145,
      sections: [
        {
          heading: "Pride, Equality, and Dignified Presentation",
          paragraphs: [
            "The school uniform eliminates socio-economic distinctions and instills institutional belonging, modesty, and focus. Every student must adhere strictly to uniform guidelines:",
            "• FEMALE REGULAR UNIFORM: Clean, crisply pressed white shalwar kameez (knee-length kameez with modest collar), maroon dupatta / headscarf with the official embroidered school monogram, plain black flat leather shoes, and white socks. Hair must be neatly tied.",
            "• MALE REGULAR UNIFORM: Sky blue collared button-down shirt with school pocket crest, dark grey tailored trousers, official school striped tie, black leather shoes with black laces, and dark grey socks. Clean-shaven or neatly trimmed facial hair, standard crew haircut.",
            "• WINTER SEASON SPECIFICATIONS: Official maroon V-neck knit sweater with green and gold trim, and formal maroon blazer with the embroidered school crest. Black jackets or non-uniform hoodies are strictly forbidden.",
            "• ID Badges: The official magnetic barcode ID card must be worn on the uniform collar at all times for biometric entry and library checkouts."
          ]
        }
      ]
    },

    // PAGE 21
    {
      pageNumber: 21,
      headerTitle: "Digital Campus: Naz LMS & Cloud ERP",
      category: "TECHNOLOGY",
      photo: embeddedImages.lmsDashboard,
      photoCaption: "Proprietary Naz Cloud LMS ERP Suite: Live Attendance, Academic Vault & Portals",
      photoH: 175,
      sections: [
        {
          heading: "Next-Generation School Management & Parent Transparency",
          paragraphs: [
            "M. S. Naz High School is at the forefront of digital educational management in Pakistan, operating a custom-engineered enterprise Learning Management System (LMS) and Cloud ERP (accessible at lms.msns.edu.pk):",
            "• Real-Time Biometric Attendance: High-speed biometric facial and fingerprint scanners log student arrival. Automated SMS and app push notifications alert parents the moment a student enters or leaves the campus.",
            "• Interactive Parent Mobile Portal: Parents view daily homework assignments, weekly lecture syllabuses, teacher remarks, fee challan statuses, and upcoming exam schedules directly on their smartphones.",
            "• Digital Document Vault & Resource Center: Students access downloadable high-yield matric notes, past papers, syllabus pairing schemes, and digital textbooks 24/7 without internet bandwidth friction.",
            "• Paperless Financial Accounting: Digital fee challans with instant online bank transfer integration, JazzCash, Easypaisa, and immediate SMS receipts."
          ]
        }
      ]
    },

    // PAGE 22
    {
      pageNumber: 22,
      headerTitle: "Faculty Profile & Pedagogical Excellence",
      category: "FACULTY",
      photo: embeddedImages.facultyGroup,
      photoCaption: "Senior Academic Faculty and Leadership Team at M. S. Naz High School",
      photoH: 155,
      sections: [
        {
          heading: "Master Educators Dedicated to Student Transformation",
          paragraphs: [
            "The true strength of M. S. Naz High School resides in the scholarly caliber, instructional passion, and personal empathy of our teaching faculty. Every teacher is selected through rigorous subject testing and demonstration lectures.",
            "• Exceptional Academic Credentials: Over 85% of our middle and secondary faculty hold Master's degrees (M.Sc, M.A, M.Phil) in their respective fields: Physics, Chemistry, Zoology, Botany, Mathematics, English Literature, and Computer Science.",
            "• Low Teacher-Student Ratio (1:20): Small class sections ensure that every student receives individualized attention, prompt notebook grading, and customized remedial mentoring.",
            "• Continuous Professional Development (CPD): Mandatory pre-session training workshops conducted in partnership with Oxford University Press and educational specialists, updating faculty on modern student psychology, SLO testing rubrics, and digital instructional tools.",
            "• Moral Mentorship: Teachers act as moral role models, counseling students through adolescent pressures and guiding career decisions."
          ]
        }
      ]
    },

    // PAGE 23
    {
      pageNumber: 23,
      headerTitle: "Annual Day Gala & Cultural Showcase",
      category: "CAMPUS LIFE",
      photo: embeddedImages.annualStage,
      photoCaption: "Spectacular Stage Performances and Theatrical Skits at the Grand Annual Day Gala",
      photoH: 155,
      sections: [
        {
          heading: "Celebrating Student Talent, Heritage & Artistry",
          paragraphs: [
            "The Grand Annual Day Gala is the most anticipated cultural tradition on the MSNS academic calendar. Attended by over 1,500 parents, community dignitaries, educational officials, and alumni, the event showcases the diverse talents of our students beyond academic textbooks.",
            "• Theatrical Dramas & Historical Tableaus: Students stage thought-provoking historical dramas in English and Urdu, depicting milestones of the Pakistan Movement, Iqbal's philosophy, and social ethics.",
            "• National Songs & Musical Choirs: Rousing renditions of national anthems, sufi poetry, and motivational melodies performed in full ceremonial costume.",
            "• Academic & Leadership Honors: Public stage felicitation of board toppers, prefect council members, best-attendance students, and distinguished teachers.",
            "• Community Unification: The gala reinforces the deep bond between the school, families, and the community of Ghakhar Mandi and Wazirabad."
          ]
        }
      ]
    },

    // PAGE 24
    {
      pageNumber: 24,
      headerTitle: "Qirat, Naat & Bilingual Declamation Societies",
      category: "CO-CURRICULAR",
      photo: embeddedImages.iqbalDay,
      photoCaption: "Annual Iqbal Day Declamation Contest and Mehfil-e-Husn-e-Qirat",
      photoH: 155,
      sections: [
        {
          heading: "Nurturing Eloquence, Faith & Intellectual Oratory",
          paragraphs: [
            "Speech is the vehicle of leadership. Through active co-curricular societies, M. S. Naz High School provides weekly platforms for students to hone their oratory, recitation, and critical reasoning abilities.",
            "• Bazm-e-Adab & Declamation Society: Regular parliamentary debates, extempore speech contests, and declamation competitions in both English and Urdu. Students learn argumentative structure, vocal modulation, and stage presence, consistently winning inter-school trophies across Gujranwala district.",
            "• Mehfil-e-Husn-e-Qirat & Naat Council: Training students in the sacred art of Tajweed (Quranic pronunciation) and devotional Naat recitation. Annual inter-school contests attract participants from across the province.",
            "• Science & Creative Arts Exhibitions: Students design working scientific prototypes, robotics models, renewable energy demonstrations, and oil painting canvases displayed during parent open days."
          ]
        }
      ]
    },

    // PAGE 25
    {
      pageNumber: 25,
      headerTitle: "Sports & Physical Education Program",
      category: "ATHLETICS",
      photo: embeddedImages.studentsGroup,
      photoCaption: "Students Competing in Athletics and Building Teamwork on Campus Grounds",
      photoH: 150,
      sections: [
        {
          heading: "Sound Mind in a Sound Body (Al-Aql As-Saleem)",
          paragraphs: [
            "Physical health, stamina, and team spirit are vital components of complete character development. MSNS maintains a structured physical education curriculum overseen by qualified sports instructors.",
            "• Campus Sports Facilities: Dedicated cricket practice nets, regulation badminton courts, outdoor volleyball, table tennis tables, and an athletics sprinting track.",
            "• The Four-House System: All students belong to one of four historic institutional houses: Jinnah House (Green), Iqbal House (Maroon), Sir Syed House (Blue), and Liaquat House (Gold). Inter-house rivalries culminate in the Annual Sports Gala.",
            "• Annual Sports Gala: A three-day festival featuring 100m/200m sprints, 4x100m relay races, long jump, shot put, tug-of-war, gymnastics displays, and friendly cricket matches between students and faculty.",
            "• Character Values in Athletics: Emphasis on sportsmanship, graceful winning, resilience in defeat, and unwavering respect for match referees and teammates."
          ]
        }
      ]
    },

    // PAGE 26
    {
      pageNumber: 26,
      headerTitle: "Islamic Character Building & Tarbiyah",
      category: "TARBIYAH",
      photo: embeddedImages.classroom2,
      photoCaption: "Daily Moral Reflection and Tarjuma-tul-Quran Instruction in the Classroom",
      photoH: 150,
      sections: [
        {
          heading: "Anchoring Modern Minds in Eternal Values",
          paragraphs: [
            "At M. S. Naz High School, Islamic character formation (Tarbiyah) is not confined to a single period; it permeates daily campus life, teacher interactions, and school culture.",
            "• Mandatory Tarjuma-tul-Quran Curriculum: Full compliance with the Punjab Government's landmark legislation mandating the teaching of the Holy Quran with translation across grades 1 to 10. Students complete the reading and conceptual study of the entire Quran before graduating from Matric.",
            "• Morning Assembly Tarbiyah: Every morning begins with collective Quran recitation, English and Urdu translation, a daily Hadith exposition with real-world moral applications, and the national anthem.",
            "• Dhuhr Prayer in Congregation: Spacious, clean ablution (Wudu) areas and a dedicated prayer hall where students and teachers pray Dhuhr together, instilling humility and collective brotherhood.",
            "• Seerah Workshops & Moral Campaigns: Monthly values campaigns addressing honesty, kindness to parents, respecting elders, avoiding foul language, and environmental cleanliness (Taharah)."
          ]
        }
      ]
    },

    // PAGE 27
    {
      pageNumber: 27,
      headerTitle: "Student Counseling & Remedial Clinics",
      category: "STUDENT CARE",
      photo: embeddedImages.ptm2,
      photoCaption: "One-on-One Academic Counseling and Career Planning Session with Faculty",
      photoH: 150,
      sections: [
        {
          heading: "Personalized Academic Care & Holistic Guidance",
          paragraphs: [
            "We believe that no child is inherently incapable of academic success; poor performance is almost always the symptom of conceptual gaps, personal anxiety, or inadequate study techniques.",
            "• Free After-School Remedial Clinics: For students identified through daily tests as needing additional reinforcement in Mathematics, Physics, Chemistry, or English grammar. Dedicated subject teachers provide small-group tutorial support without any extra fee.",
            "• Career Pathways & Transition Counseling: Secondary students receive comprehensive guidance regarding intermediate study streams: F.Sc Pre-Medical (MDCAT preparation), F.Sc Pre-Engineering (ECAT preparation), ICS (Computer Science), and emerging global careers in artificial intelligence, engineering, and commerce.",
            "• Psychological & Emotional Well-Being: Dedicated counseling for examination anxiety, adolescent stress, and social challenges. A strict Zero-Tolerance Anti-Bullying Policy guarantees a psychologically safe learning haven for every student."
          ]
        }
      ]
    },

    // PAGE 28
    {
      pageNumber: 28,
      headerTitle: "Examination System & Assessment Framework",
      category: "EXAMINATIONS",
      photo: embeddedImages.classroom1,
      photoCaption: "Strict, Transparent Examination Administration Simulating Board Conditions",
      photoH: 145,
      sections: [
        {
          heading: "Continuous Evaluation & Uncompromising Integrity",
          paragraphs: [
            "The examination architecture at M. S. Naz High School is designed to ensure rigorous evaluation while cultivating self-discipline and time management.",
            "• Formative vs. Summative Grading: Continuous daily quizzes (15%), monthly unit evaluations (25%), and major terminal examinations (60%) combine into comprehensive student progress profiles.",
            "• BISE Gujranwala SLO Alignment: All examination question papers are modeled on the board's Student Learning Outcomes (SLO) blueprint:",
            "  - Knowledge / Recall: 40% (Direct definitions, statements, core principles)",
            "  - Understanding / Comprehension: 40% (Why/How explanations, chemical mechanisms, mathematical derivations)",
            "  - Application & Analysis: 20% (Unseen numerical problems, real-world scenarios, biological diagrams)",
            "• Comprehensive Printed Gradebooks: Detailed graphical report cards with subject percentages, class ranks, attendance statistics, and personalized teacher comments issued at the close of every term."
          ]
        }
      ]
    },

    // PAGE 29
    {
      pageNumber: 29,
      headerTitle: "Academic Distinctions & Board Result Archive",
      category: "ACHIEVEMENTS",
      photo: embeddedImages.annualAwards1,
      photoCaption: "Distinguished Board Examination Toppers Awarded Medals and Scholarships",
      photoH: 155,
      sections: [
        {
          heading: "An Unbroken Legacy of Board Distinctions",
          paragraphs: [
            "Year after year, candidates from M. S. Naz High School achieve outstanding results in the BISE Gujranwala Secondary School Certificate (SSC) examinations, with our pass percentages consistently reaching 100% and a record number of students securing Grade A+ (80%+ marks).",
            "• 1000+ Marks Achievers: Dozens of our students regularly cross the coveted 1000-mark threshold, earning direct admissions on merit into King Edward Medical University, Allama Iqbal Medical College, UET Lahore, FAST-NUCES, and top government colleges.",
            "• Roll of Honor & Gold Medals: School position holders are awarded institutional gold medals, cash awards, and lifelong alumni honor roll memberships during the Annual Prize Distribution Ceremony.",
            "• Zero Re-appearances: Through our intensive Pre-Board Phase examinations, even slow-learning candidates cross the pass threshold with strong second-division standings."
          ]
        }
      ]
    },

    // PAGE 30
    {
      pageNumber: 30,
      headerTitle: "Parent-Teacher Partnership & Campus Council",
      category: "COMMUNITY",
      photo: embeddedImages.ptm1,
      photoCaption: "Parent-Teacher Consultations Providing Personalized Academic Feedback",
      photoH: 155,
      sections: [
        {
          heading: "A Collaborative Triad: School, Student & Home",
          paragraphs: [
            "We firmly recognize that a child achieves their highest potential when the school and parents work in transparent, synchronized harmony. Parental involvement is actively structured through multiple official channels:",
            "• Mandatory Termly PTMs: Formal Parent-Teacher Meetings are scheduled following First Term, Mid-Term, and Pre-Board examinations. Parents meet each subject teacher individually to review test answer sheets, homework notebooks, and classroom engagement.",
            "• School Parent Council: An elected consultative council comprising parent representatives, community elders, and administrative heads meets quarterly to review campus policies, canteen standards, transport safety, and co-curricular calendars.",
            "• Open-Door Administration: Parents are welcome to meet the Principal and Section Heads during dedicated consultation hours every weekday morning with prior appointment.",
            "• LMS Real-Time Messaging: Direct two-way messaging between parents and teachers via the Naz LMS app facilitates immediate resolution of academic queries."
          ]
        }
      ]
    },

    // PAGE 31
    {
      pageNumber: 31,
      headerTitle: "Campus Discipline, Attendance & Code of Conduct",
      category: "DISCIPLINE",
      photo: embeddedImages.studentsUni,
      photoCaption: "Morning Assembly Formations Instilling Punctuality and Group Discipline",
      photoH: 145,
      sections: [
        {
          heading: "Standards of Excellence, Decorum, and Safety",
          paragraphs: [
            "Discipline at MSNS is grounded in mutual self-respect, moral accountability, and positive reinforcement. The following regulations are strictly enforced:",
            "• Mandatory 85% Attendance Prerequisite: As required by BISE Gujranwala and school policy, students who fail to maintain 85% attendance during the academic year are disqualified from appearing in annual board examinations.",
            "• Punctuality: Campus gates close at 7:50 AM sharp. Late arrivals are registered and repeated unexcused tardiness results in parent conferences.",
            "• Prohibited Electronics & Items: Mobile phones, smartwatches, recording devices, non-academic literature, and chewing gum are strictly prohibited on campus grounds.",
            "• Mutual Respect & Language: Foul language, physical aggression, disrespect toward teachers, or destruction of school property results in immediate suspension.",
            "• Restorative Discipline: Minor infractions are addressed through constructive community service, restorative apologies, and counseling."
          ]
        }
      ]
    },

    // PAGE 32
    {
      pageNumber: 32,
      headerTitle: "Safety, Security Protocols & Health Clinic",
      category: "SAFETY",
      photo: embeddedImages.campusFront,
      photoCaption: "Secure Campus Perimeter with 24/7 Monitored Access Points and Emergency Drills",
      photoH: 150,
      sections: [
        {
          heading: "A Secure, Protected Sanctuary for Every Child",
          paragraphs: [
            "The physical safety and emotional security of our students are non-negotiable institutional imperatives. MSNS maintains comprehensive safety infrastructure that exceeds provincial standards:",
            "• 24/7 Armed Security & Controlled Access: Trained, licensed security personnel guard all entrance gates. Visitor entry requires biometric verification, CNIC recording, and appointment confirmation. Reinforced boundary walls with razor wire and security lighting secure the entire perimeter.",
            "• Campus Medical First Aid Clinic: An equipped on-campus medical dispensary staffed with a qualified healthcare attendant handles routine illnesses, minor injuries, fever, and sports sprains. Formal emergency protocols ensure swift transfer to the nearest hospital if required.",
            "• Fire Safety & Evacuation Readiness: Certified fire extinguishers installed in all science labs, computer suites, and corridors. Bi-annual emergency evacuation drills prepare students and staff for fire and seismic emergencies.",
            "• Hygiene & Environmental Sanitation: Dedicated janitorial staff sanitize classrooms, washrooms, and drinking water stations three times daily."
          ]
        }
      ]
    },

    // PAGE 33
    {
      pageNumber: 33,
      headerTitle: "Dedicated School Transport Fleet & Routes",
      category: "TRANSPORT",
      photo: embeddedImages.campusGrounds,
      photoCaption: "Dedicated School Transport Fleet Serving Ghakhar, Wazirabad, and 34 Localities",
      photoH: 150,
      sections: [
        {
          heading: "Safe, Reliable, and Punctual Commuting",
          paragraphs: [
            "Recognizing that hundreds of our students commute from surrounding rural and suburban communities, M. S. Naz High School operates an extensive dedicated transport fleet comprising buses and vans covering 34 major localities across Gujranwala and Wazirabad districts:",
            "• Primary Commuter Localities Served: Ghakhar Mandi, Wazirabad, Rahwali, Rahwali Cantt, Gujranwala City, Aujla Kalan, Kotli Kalan, Kotli Khoja, Bhagat Pura, Eimanabad Road, Nat Kalan, Dhillanwali, Piro Chak, Kot Inayat Khan, Talwandi Rahwali, Gondlanwala, Ladhewala Waraich, Qila Didar Singh, Alipur Chatha, Dhaunkal, Sohdra, Nizamabad, Veropal, Gillwala, Kalaske, Kot Natha, Kot Hara, Badoki Gosaian, Hardo Udoke, Chhina, Jora Sian, Fatehpur Gujran, Mansoorwali, and Kamoke.",
            "• Vetted Drivers & Conductors: Every vehicle is operated by a vetted professional commercial driver accompanied by an official conductor. Female attendants accompany all primary and kindergarten transport vehicles.",
            "• Fleet Safety Standards: Mandatory speed-limiters, emergency first aid kits, functioning seatbelts, and bi-monthly mechanical fitness certifications ensure absolute transit safety."
          ]
        }
      ]
    },

    // PAGE 34
    {
      pageNumber: 34,
      headerTitle: "Transparent Tuition & Fee Schedule (2026–2027)",
      category: "FINANCE",
      photo: embeddedImages.annualAwards2,
      photoCaption: "Merit Scholarship Recipients Felicitated During the Annual Academic Awards Ceremony",
      photoH: 145,
      sections: [
        {
          heading: "Clear, Honest, and Affordable Educational Investment",
          paragraphs: [
            "M. S. Naz High School is committed to providing elite-tier education at transparent, honest, and affordable fee rates without hidden surcharges or arbitrary increments:",
            "• Monthly Tuition Fee Schedule (Session 2026–2027):",
            "  - Early Childhood Wing (Playgroup, Nursery, KG): Rs. 2,800 / Month",
            "  - Primary School Wing (Grades 1 to 5): Rs. 3,200 / Month",
            "  - Middle School Wing (Grades 6 to 8): Rs. 3,600 / Month",
            "  - Secondary Matric Science Group (Grades 9 & 10): Rs. 4,200 / Month",
            "  - Secondary Matric Computer Science Group (Grades 9 & 10): Rs. 4,400 / Month",
            "• One-Time Registration & Admission Charges (Payable Once at Entry): Rs. 5,000",
            "• Annual Examination & Science Laboratory Fund (Annual): Rs. 3,000",
            "• Payment Guidelines: Monthly tuition is payable by the 10th of each calendar month via computer-generated bank challans at designated bank branches, or digitally via JazzCash, Easypaisa, and 1Link online bank transfers."
          ]
        }
      ]
    },

    // PAGE 35
    {
      pageNumber: 35,
      headerTitle: "Scholarships, Concessions & Financial Aid",
      category: "FINANCIAL AID",
      photo: embeddedImages.annualAwards1,
      photoCaption: "Full Merit Tuition Waivers Awarded to High-Scoring Students and Board Toppers",
      photoH: 150,
      sections: [
        {
          heading: "Ensuring No Deserving Mind is Denied Education",
          paragraphs: [
            "At M. S. Naz High School, we believe financial hardship should never terminate a child's academic aspirations. Over 15% of our student body receives institutional fee assistance:",
            "• NAZ MERIT SCHOLARSHIPS (100% Full Tuition Waiver): Awarded to any student achieving 90%+ marks in terminal exams or securing a top 3 position in BISE Gujranwala board examinations.",
            "• ORPHAN WELFARE SCHEME: Deserving orphans receive up to 100% fee remissions, subsidized textbooks, and uniform stipends through the school's charitable foundation.",
            "• KINSHIP & SIBLING CONCESSIONS: Families enrolling multiple children receive automatic fee discounts: 25% off monthly tuition for the second child, and 50% off monthly tuition for the third and subsequent children.",
            "• TEACHER-CHILD CONCESSIONS: Children of recognized educators and school staff receive comprehensive fee waivers as a gesture of institutional appreciation.",
            "• Application Process: Parents seeking fee assistance submit an application with supporting income documentation to the Financial Aid Committee during admissions."
          ]
        }
      ]
    },

    // PAGE 36
    {
      pageNumber: 36,
      headerTitle: "Admission Roadmap, FAQs & Campus Directory",
      category: "ADMISSIONS",
      photo: embeddedImages.campusFront,
      photoCaption: "Admissions Office and Information Desk Welcoming Inquiries for Session 2026–2027",
      photoH: 140,
      sections: [
        {
          heading: "Step-by-Step Admission Procedure",
          paragraphs: [
            "1. REGISTRATION: Obtain prospectus and application form from campus reception or download from www.msns.edu.pk/downloads.",
            "2. ASSESSMENT: Candidates appear for a diagnostic assessment (English, Mathematics, Urdu) to determine grade readiness.",
            "3. INTERVIEW: Interactive parental interview with the Section Head and Principal to discuss mutual expectations.",
            "4. ENROLLMENT: Issuance of fee challan, document verification, and allocation of section and roll number."
          ]
        },
        {
          heading: "Required Documentation Checklist",
          paragraphs: [
            "• Certified copy of Student B-Form (NADRA) | Copy of Father's / Guardian's CNIC",
            "• Original School Leaving Certificate (SLC) from previous institution (Grades 2+)",
            "• Previous Academic Result Cards / Report Cards | 4 Passport-size photographs with blue background"
          ]
        },
        {
          heading: "Official Campus Directory & Contact Information",
          paragraphs: [
            "• Campus Address: M. S. Naz High School, Main Campus, Ghakhar Mandi, District Gujranwala, Punjab, Pakistan",
            "• Phone: +92 55 6601234  |  WhatsApp Admissions Helpline: +92 300 1234567",
            "• Official Email: admissions@msns.edu.pk  |  Principal's Desk: principal@msns.edu.pk",
            "• Official Website: https://www.msns.edu.pk  |  LMS Portal: https://lms.msns.edu.pk",
            "• Campus Office Visiting Hours: Monday to Saturday: 8:00 AM – 2:00 PM (Friday: 8:00 AM – 12:30 PM)"
          ]
        }
      ]
    }
  ];

  // Render each page
  for (const pDef of pageDefinitions) {
    console.log(`Generating Page ${pDef.pageNumber}: ${pDef.headerTitle}...`);
    const page = pdfDoc.addPage([A4_W, A4_H]);
    
    // Running Header
    drawHeader(page, fonts, logoImg, pDef.headerTitle, pDef.category);

    let curY = A4_H - 76;

    // Render Real Photo if present
    if (pDef.photo && pDef.photoH) {
      const imgW = CONTENT_W;
      const imgH = pDef.photoH;
      drawPhotoCard(page, pDef.photo, MARGIN, curY - imgH, imgW, imgH, pDef.photoCaption);
      curY -= (imgH + 24);
    }

    // Render Sections
    for (const sec of pDef.sections) {
      // Section Heading with colored bar
      page.drawRectangle({
        x: MARGIN,
        y: curY - 14,
        width: 3,
        height: 14,
        color: C_GOLD,
      });

      page.drawText(sec.heading, {
        x: MARGIN + 8,
        y: curY - 11,
        size: 10,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      curY -= 20;

      // Paragraphs
      for (const para of sec.paragraphs) {
        const isBullet = para.trim().startsWith('•') || para.trim().startsWith('1.') || para.trim().startsWith('2.') || para.trim().startsWith('3.') || para.trim().startsWith('4.') || para.trim().startsWith('5.');
        const fontSize = isBullet ? 7.8 : 8.2;
        const lineSpacing = isBullet ? 10.5 : 11.5;
        const indent = isBullet ? 6 : 0;

        const lines = wrapText(para, fonts.regular, fontSize, CONTENT_W - indent);
        for (const line of lines) {
          if (curY < 50) break; // Keep inside page
          page.drawText(line, {
            x: MARGIN + indent,
            y: curY,
            size: fontSize,
            font: fonts.regular,
            color: isBullet ? C_TEXT_DARK : C_TEXT_DARK,
          });
          curY -= lineSpacing;
        }
        curY -= 4; // Space between paragraphs
      }
      curY -= 6; // Space between sections
    }

    // Running Footer
    drawFooter(page, fonts, pDef.pageNumber, 36);
  }

  // Save the generated PDF
  console.log("Compiling PDF bytes...");
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '..', 'scratch', 'msns-prospectus-2026-2027.pdf');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated prospectus successfully: ${outputPath} (${(pdfBytes.length / (1024 * 1024)).toFixed(2)} MB, ${pdfDoc.getPageCount()} pages)`);

  // Upload to Cloudflare R2
  console.log("Uploading generated prospectus to Cloudflare R2...");
  const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.AWS_ENDPOINT_URL,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });

  const uploadCmd = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME || 'msns',
    Key: 'documents/msns-prospectus-2026-2027.pdf',
    Body: pdfBytes,
    ContentType: 'application/pdf',
    CacheControl: 'public, max-age=31536000, immutable',
  });

  await s3.send(uploadCmd);
  console.log("Successfully uploaded msns-prospectus-2026-2027.pdf to Cloudflare R2 (documents/msns-prospectus-2026-2027.pdf)!");
}

buildProspectus().catch(err => {
  console.error("FATAL ERROR generating prospectus:", err);
  process.exit(1);
});
