const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } = require('pdf-lib');

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

const ROOT_DIR = path.join(__dirname, '..');
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
const C_BLUE = rgb(29 / 255, 78 / 255, 216 / 255);

const logoPath = path.join(ROOT_DIR, 'public', 'icon.jpg');
const logoBytes = fs.existsSync(logoPath) ? fs.readFileSync(logoPath) : null;

function wrapText(text, font, fontSize, maxWidth) {
  if (!text) return [];
  const clean = text.replace(/[\r\n]+/g, ' ').replace(/[^\x20-\x7E]/g, ' ').trim();
  const words = clean.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, fontSize) <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function drawHeader(page, fonts, logo, title, grade) {
  const { width, height } = page.getSize();

  page.drawRectangle({
    x: 0,
    y: height - 70,
    width,
    height: 70,
    color: C_DARK_GREEN,
  });

  if (logo) {
    page.drawImage(logo, {
      x: 40,
      y: height - 58,
      width: 46,
      height: 46,
    });
  }

  page.drawText('M. S. NAZ HIGH SCHOOL - RESOURCE CENTER', {
    x: 96,
    y: height - 34,
    size: 13,
    font: fonts.bold,
    color: C_WHITE,
  });

  page.drawText(`OFFICIAL TEXTBOOK & SYLLABUS DIRECTORY (${grade.toUpperCase()})`, {
    x: 96,
    y: height - 50,
    size: 8.5,
    font: fonts.bold,
    color: C_EMERALD,
  });

  page.drawText('PUNJAB CURRICULUM & TEXTBOOK BOARD (PCTB) / BISE GUJRANWALA', {
    x: width - 360,
    y: height - 42,
    size: 7.5,
    font: fonts.regular,
    color: C_LIGHT_GREEN,
  });

  page.drawLine({
    start: { x: 0, y: height - 70 },
    end: { x: width, y: height - 70 },
    thickness: 2,
    color: C_EMERALD,
  });
}

function drawFooter(page, fonts, pageNum, totalPages) {
  const { width } = page.getSize();
  page.drawLine({
    start: { x: 40, y: 35 },
    end: { x: width - 40, y: 35 },
    thickness: 0.5,
    color: C_BORDER,
  });

  page.drawText('M. S. Naz High School - Main G.T. Road, Ghakhar Mandi - Helpline: +92 318 7625415 - www.msns.edu.pk', {
    x: 40,
    y: 22,
    size: 7.5,
    font: fonts.regular,
    color: C_TEXT_MUTED,
  });

  page.drawText(`Page ${pageNum} of ${totalPages}`, {
    x: width - 90,
    y: 22,
    size: 7.5,
    font: fonts.bold,
    color: C_DARK_GREEN,
  });
}

const TEXTBOOKS_LIST = [
  // Class 9
  {
    grade: 'Class 9',
    subject: 'Physics',
    code: 'PHY-9-SNC',
    filename: 'pctb-class-9-physics.pdf',
    chapters: [
      'Ch 1: Physical Quantities & Measurement (Base & Derived Units, Vernier Callipers, Micrometer)',
      'Ch 2: Kinematics (Rest & Motion, Scalars & Vectors, Equations of Motion under Gravity)',
      'Ch 3: Dynamics (Newton Laws of Motion, Momentum, Friction, Centripetal Force)',
      'Ch 4: Turning Effect of Forces (Like & Unlike Parallel Forces, Torque, Centre of Mass, Equilibrium)',
      'Ch 5: Gravitation (Law of Universal Gravitation, Mass of Earth, Artificial Satellites)',
      'Ch 6: Work and Energy (Kinetic & Potential Energy, Conservation of Energy, Efficiency, Power)',
      'Ch 7: Properties of Matter (Kinetic Molecular Theory, Density, Pressure, Archimedes Principle, Hooke Law)',
      'Ch 8: Thermal Properties of Matter (Temperature & Heat, Specific Heat Capacity, Latent Heat)',
      'Ch 9: Transfer of Heat (Conduction, Convection, Radiation, Greenhouse Effect)'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Chemistry',
    code: 'CHM-9-SNC',
    filename: 'pctb-class-9-chemistry.pdf',
    chapters: [
      'Ch 1: Fundamentals of Chemistry (Branches, Atomic Mass, Empirical/Molecular Formula, Mole & Avogadro)',
      'Ch 2: Structure of Atoms (Rutherford Model, Bohr Atomic Theory, Electronic Configuration, Isotopes)',
      'Ch 3: Periodic Table & Periodicity (Groups & Periods, Periodic Trends: Ionization Energy, Electronegativity)',
      'Ch 4: Structure of Molecules (Ionic, Covalent, Coordinate Bonds, Intermolecular Forces)',
      'Ch 5: Physical States of Matter (Gaseous State: Boyle & Charles Law, Liquid State, Solid State)',
      'Ch 6: Solutions (Saturated/Unsaturated Solutions, Molarity, Percentage Concentration, Solubility)',
      'Ch 7: Electrochemistry (Oxidation & Reduction, Electrochemical Cells, Corrosion and its Prevention)',
      'Ch 8: Chemical Reactivity (Metals & Non-metals, Reactivity Trends, Inert Gases)'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Biology',
    code: 'BIO-9-SNC',
    filename: 'pctb-class-9-biology.pdf',
    chapters: [
      'Ch 1: Introduction to Biology (Branches, Quran and Biology, Levels of Organization)',
      'Ch 2: Solving a Biological Problem (Biological Method, Hypotheses, Theory & Law, Malaria Study)',
      'Ch 3: Biodiversity (Classification, Five Kingdom System, Binomial Nomenclature, Conservation)',
      'Ch 4: Cells and Tissues (Microscopy, Cellular Structures, Organelles, Plant & Animal Tissues)',
      'Ch 5: Cell Cycle (Mitosis, Meiosis, Significance, Necrosis and Apoptosis)',
      'Ch 6: Enzymes (Characteristics, Mechanism of Enzyme Action, Factors Affecting Rate)',
      'Ch 7: Bioenergetics (Photosynthesis, Light & Dark Reactions, Respiration, ATP Cycle)',
      'Ch 8: Nutrition (Components of Human Food, Balanced Diet, Human Alimentary Canal)',
      'Ch 9: Transport (Transpiration in Plants, Human Circulatory System, Blood Groups & Heart)'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Computer Science',
    code: 'CS-9-SNC',
    filename: 'pctb-class-9-computer-science.pdf',
    chapters: [
      'Unit 1: Problem Solving (Defining Problem, Flowcharts, Algorithms, Trace Tables)',
      'Unit 2: Binary Number Systems (Decimal to Binary Conversion, Hexadecimal, ASCII Code, Logic Gates)',
      'Unit 3: Computer Networks (Client-Server, Network Topologies, IP Addressing, Routing & Protocols)',
      'Unit 4: Data and Cyber Security (Threats, Malware, Cryptography, Password Safety, Ethical Use)',
      'Unit 5: Designing Website (HTML Basics, Text Formatting, Hyperlinks, Lists, Tables and Images)'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Mathematics (Science Group)',
    code: 'MTH-9-SNC',
    filename: 'pctb-class-9-mathematics.pdf',
    chapters: [
      'Ch 1: Matrices and Determinants (Order, Types, Matrix Inversion & Cramer Rule)',
      'Ch 2: Real and Complex Numbers (Radicals, Properties of Real Numbers, Complex Numbers)',
      'Ch 3: Logarithms (Scientific Notation, Common & Natural Logarithms, Laws of Logarithms)',
      'Ch 4: Algebraic Expressions and Algebraic Formulas (Surds, Rationalization)',
      'Ch 5: Factorization (Formulas, Remainder & Factor Theorem, Cubic Polynomials)',
      'Ch 6: Algebraic Manipulation (HCF and LCM, Square Root of Algebraic Expression)',
      'Ch 7: Linear Equations and Inequalities (Radical Equations, Absolute Value Equations)',
      'Ch 9: Introduction to Coordinate Geometry (Distance Formula, Collinear Points)',
      'Ch 12: Line Bisectors and Angle Bisectors (Mandatory Board Theorems)'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'English Compulsory',
    code: 'ENG-9-SNC',
    filename: 'pctb-class-9-english.pdf',
    chapters: [
      'Unit 1: The Saviour of Mankind (PBUH) - Vocabulary & Comprehension',
      'Unit 2: Patriotism - Reading & Abstract Nouns',
      'Unit 3: Media and Its Impact - Modal Verbs & Essay Formulation',
      'Unit 4: Hazrat Asma (R.A) - Integrity, Conjunctions & Punctuation',
      'Unit 5: Daffodils (Poem by William Wordsworth) - Metaphor & Personification',
      'Unit 6: The Quaid Vision and Pakistan - Direct/Indirect Speech',
      'Unit 7: Sultan Ahmad Mosque (The Blue Mosque) - Descriptive Writing',
      'Unit 8: Stopping by Woods on a Snowy Evening (Poem) - Rhyme & Imagery',
      'Grammar & Composition: Active/Passive Voice, Tenses, Informal Letters, Story Writing'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Urdu Compulsory',
    code: 'URD-9-SNC',
    filename: 'pctb-class-9-urdu.pdf',
    chapters: [
      'سبق 1: ہجرتِ نبویؐ (مولانا شبلی نعمانی) - تفہیمِ متن و اقتباسات',
      'سبق 2: مرزا غالب کے عادات و خصائل (مولانا الطاف حسین حالی)',
      'سبق 3: کاہلی (سر سید احمد خان) - فکر و عمل کی اصلاح',
      'سبق 4: شاعروں کے لطیفے (مولانا محمد حسین آزاد)',
      'حصہ نظم: حمد (خواجہ الطاف حسین حالی)، نعت (امیر مینائی)، برسات کی بہاریں (نظیر اکبر آبادی)',
      'حصہ غزل: میر تقی میر، خواجہ حیدر علی آتش، مرزا اسد اللہ خان غالب',
      'قواعد و انشاء: اسم، فعل، حرف، مترادفات، متضادات، خطوط، درخواستیں، مکالمہ نگاری'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Tarjuma-tul-Quran-ul-Majeed',
    code: 'TTQ-9-SNC',
    filename: 'pctb-class-9-tarjuma-tul-quran.pdf',
    chapters: [
      'تعارف و خلاصہ: سورۃ مریم (حضرت زکریا و حضرت مریم علیہما السلام کا واقعہ)',
      'تعارف و خلاصہ: سورۃ طہٰ (حضرت موسیٰ علیہ السلام اور فرعون کی دعوت)',
      'تعارف و خلاصہ: سورۃ الانبیاء (انبیاء کرام کی استقامت اور توحید کی تعلیمات)',
      'تعارف و خلاصہ: سورۃ الحج (مناسکِ حج، شعائر اللہ اور قیامت کی ہولناکیاں)',
      'تعارف و خلاصہ: سورۃ الفرقان (عباد الرحمن کی صفات اور حق و باطل کا معیار)',
      'تعارف و خلاصہ: سورۃ الشعراء و سورۃ النمل (قرآنی قصص اور فصاحت و بلاغت)',
      'مشقی سوالات و معروضی پرچہ جات: 50 نمبر کا لازمی امتحانی نصاب'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Islamiat Compulsory',
    code: 'ISL-9-SNC',
    filename: 'pctb-class-9-islamiat.pdf',
    chapters: [
      'باب اوّل: قرآن مجید، فہمِ قرآن و احادیثِ نبویہؐ (منتخب آیات و احادیث مبارکہ مع ترجمہ و تشریح)',
      'باب دوم: ایمانیات و عبادات (توحید، رسالت، ملائکہ، کتبِ سماویہ، نماز، روزہ، زکوٰۃ، حج)',
      'باب سوم: سیرتِ طیبہ حضرت محمد رسول اللہؐ (مکی و مدنی دور، اسوہ حسنہ)',
      'باب چہارم: اخلاق و آداب (صدق و دیانت، حیا، ایثار، والدین اور پڑوسیوں کے حقوق)',
      'باب پنجم: حسنِ معاشرت اور سماجی امن و استحکام'
    ]
  },
  {
    grade: 'Class 9',
    subject: 'Pakistan Studies',
    code: 'PST-9-SNC',
    filename: 'pctb-class-9-pakistan-studies.pdf',
    chapters: [
      'Ch 1: Ideological Basis of Pakistan (Allama Iqbal & Quaid-e-Azam Vision, Two-Nation Concept)',
      'Ch 2: Making of Pakistan (Shimla Deputation 1906, Lahore Resolution 1940, Independence 1947)',
      'Ch 3: Land and Environment of Pakistan (Location, Relief Features, Climate, Drainage & Forests)',
      'Ch 4: History of Pakistan Phase I (Early Problems of Pakistan, Governor General Quaid-e-Azam)'
    ]
  },

  // Class 10
  {
    grade: 'Class 10',
    subject: 'Physics',
    code: 'PHY-10-SNC',
    filename: 'pctb-class-10-physics.pdf',
    chapters: [
      'Ch 10: Simple Harmonic Motion and Waves (Damped Oscillations, Wave Equation, Ripple Tank)',
      'Ch 11: Sound (Sound Waves, Speed of Sound, Audible Frequency Range, Ultrasound Applications)',
      'Ch 12: Geometrical Optics (Reflection, Refraction, Lenses, Mirror Formula, Optical Instruments)',
      'Ch 13: Electrostatics (Electric Field, Electrostatic Potential, Capacitors & Capacitance)',
      'Ch 14: Current Electricity (Electric Current, Potential Difference, Ohm Law, Series & Parallel Circuits)',
      'Ch 15: Electromagnetism (Magnetic Effect of Current, Electromagnetic Induction, Transformer)',
      'Ch 16: Basic Electronics (Thermionic Emission, Analogue & Digital Electronics, Logic Gates)',
      'Ch 17: Information and Communication Technology (ICT, Transmission of Electrical Signals, Internet)',
      'Ch 18: Atomic and Nuclear Physics (Atom & Nucleus, Radioactivity, Half-Life, Nuclear Fission/Fusion)'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Chemistry',
    code: 'CHM-10-SNC',
    filename: 'pctb-class-10-chemistry.pdf',
    chapters: [
      'Ch 9: Chemical Equilibrium (Reversible Reactions, Law of Mass Action, Equilibrium Constant Kc)',
      'Ch 10: Acids, Bases and Salts (Arrhenius, Bronsted-Lowry, Lewis Concepts, pH Scale, Indicators)',
      'Ch 11: Organic Chemistry (Classification, Functional Groups, Homologous Series, Isomerism)',
      'Ch 12: Hydrocarbons (Alkanes, Alkenes, Alkynes: Preparation, Physical & Chemical Reactions)',
      'Ch 13: Biochemistry (Carbohydrates, Proteins, Lipids, Nucleic Acids - DNA & RNA, Vitamins)',
      'Ch 14: Environmental Chemistry I: The Atmosphere (Layers of Atmosphere, Air Pollutants, Acid Rain)',
      'Ch 15: Environmental Chemistry II: Water (Properties, Soft & Hard Water, Water Pollution, Treatment)',
      'Ch 16: Chemical Industries (Basic Metallurgical Operations, Solvay Process, Manufacture of Urea)'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Biology',
    code: 'BIO-10-SNC',
    filename: 'pctb-class-10-biology.pdf',
    chapters: [
      'Ch 10: Gaseous Exchange (Gaseous Exchange in Plants & Humans, Respiratory Disorders)',
      'Ch 11: Homeostasis (Homeostasis in Plants, Human Urinary System, Kidney Disorders & Dialysis)',
      'Ch 12: Coordination and Control (Human Nervous System, Receptors, Endocrine System)',
      'Ch 13: Support and Movement (Human Skeleton, Joints, Muscles and Disorders of Skeletal System)',
      'Ch 14: Reproduction (Asexual & Sexual Reproduction, Pollination, Human Reproductive System)',
      'Ch 15: Inheritance (Introduction to Genetics, Mendel Laws of Inheritance, DNA Replication)',
      'Ch 16: Man and His Environment (Ecosystem Levels, Biogeochemical Cycles, Symbiosis, Pollution)',
      'Ch 17: Biotechnology (Fermentation, Genetic Engineering, Single-Cell Protein)',
      'Ch 18: Pharmacology (Medicinal Drugs, Antibiotics & Vaccines, Drug Addiction)'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Computer Science',
    code: 'CS-10-SNC',
    filename: 'pctb-class-10-computer-science.pdf',
    chapters: [
      'Unit 1: Introduction to Programming (Programming Languages, Compiler & IDE, Basic Structure of C)',
      'Unit 2: User Interface (Constants & Variables, Data Types, Printf & Scanf Functions, Operators)',
      'Unit 3: Conditional Logic (Sequential vs Conditional Control, If, If-Else, Nested If-Else Statements)',
      'Unit 4: Data Structures & Loops (For Loop, While Loop, Do-While Loop, Nested Loops, Arrays Overview)',
      'Unit 5: Functions (Definition, Advantages of Functions, Arguments & Return Values, Reusability)'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Mathematics (Science Group)',
    code: 'MTH-10-SNC',
    filename: 'pctb-class-10-mathematics.pdf',
    chapters: [
      'Ch 1: Quadratic Equations (Factorization, Completing Square, Quadratic Formula)',
      'Ch 2: Theory of Quadratic Equations (Discriminant, Nature of Roots, Cube Roots of Unity, Synthetic Division)',
      'Ch 3: Variations (Ratio, Proportion, Direct & Inverse Variation, Joint Variation)',
      'Ch 4: Partial Fractions (Proper & Improper Fractions, Linear & Quadratic Factors)',
      'Ch 5: Sets and Functions (Operations on Sets, Venn Diagrams, Binary Relations, Functions)',
      'Ch 6: Basic Statistics (Frequency Distribution, Mean, Median, Mode, Variance & Standard Deviation)',
      'Ch 7: Introduction to Trigonometry (Measurement of Angles, Trigonometric Ratios & Identities)',
      'Ch 9: Chords of a Circle (Board Compulsory 8-Mark Theorems)',
      'Ch 12: Angle in a Segment of a Circle (Alternate Compulsory Theorems)'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'English Compulsory',
    code: 'ENG-10-SNC',
    filename: 'pctb-class-10-english.pdf',
    chapters: [
      'Unit 1: Hazrat Muhammad (PBUH) an Embodiment of Justice - Theme & Character Sketch',
      'Unit 2: Chinese New Year - Customs & Cultural Conventions',
      'Unit 3: Try Again (Poem by W. E. Hickson) - Persistence & Perseverance',
      'Unit 4: First Aid - Medical Procedures & Crisis Management',
      'Unit 5: The Rain (Poem by W. H. Davies) - Social Equality & Symbolism',
      'Unit 6: Television vs Newspapers - Media Comparison & Critical Analysis',
      'Unit 7: Little by Little One Walks Far - Career Motivation & Perseverance',
      'Unit 8: Peace (Poem by Dr. Hartmann) - Destructive & Calming Powers of Nature',
      'Grammar & Composition: Essay Writing (150-200 Words), Direct/Indirect Speech, Pair of Words, Urdu to English Translation'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Urdu Compulsory',
    code: 'URD-10-SNC',
    filename: 'pctb-class-10-urdu.pdf',
    chapters: [
      'سبق 1: مرزا محمد سعید (شاہد احمد دہلوی) - خاکہ نگاری و اسلوب',
      'سبق 2: نظریہ پاکستان (ڈاکٹر غلام مصطفیٰ خان) - قومی تشخص اور اسلامی بنیادیں',
      'سبق 3: پرستان کی شہزادی (اشرف صبوحی) - داستانوی انداز اور کردار نگاری',
      'سبق 4: اردو ادب میں عید الفطر (ڈاکٹر وحید قریشی) - تہذیبی روایات',
      'حصہ نظم: میدانِ کربلا میں صبح کا منظر (میر انیس)، فاطمہ بنتِ عبداللہ (ڈاکٹر علامہ محمد اقبال)',
      'حصہ غزل: حسرت موہانی، جگر مراد آبادی، فراق گورکھپوری، ادا جعفری',
      'قواعد و انشاء: مضمون نویسی، تفہیمِ عبارات، جملوں کی درستی، ضرب الامثال'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Tarjuma-tul-Quran-ul-Majeed',
    code: 'TTQ-10-SNC',
    filename: 'pctb-class-10-tarjuma-tul-quran.pdf',
    chapters: [
      'تعارف و خلاصہ: سورۃ القصص (حضرت موسیٰ علیہ السلام اور قارون کا عبرتناک انجام)',
      'تعارف و خلاصہ: سورۃ العنکبوت (ایمان کی آزمائش اور باطل نظریات کی مکڑی کے جالے سے تشبیہ)',
      'تعارف و خلاصہ: سورۃ الروم (رومیوں کی پیشین گوئی اور قدرت کے دلائل)',
      'تعارف و خلاصہ: سورۃ لقمان (حضرت لقمان کی بیٹے کو سنہری اخلاقی و ایمانی نصیحتیں)',
      'تعارف و خلاصہ: سورۃ السجدہ (تخلیقِ انسان اور قیامت کے دن سجدہ شکر)',
      'تعارف و خلاصہ: سورۃ الاحزاب (غزوہ خندق، ازواجِ مطہرات کے احکام، خاتم النبیینؐ)',
      'امتحانی مشقیں: کلمات و تراکیب کا مفہوم اور بورڈ سوالنامہ گائیڈ'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Islamiat Compulsory',
    code: 'ISL-10-SNC',
    filename: 'pctb-class-10-islamiat.pdf',
    chapters: [
      'باب اوّل: قرآن مجید، فہمِ قرآن و احادیث مبارکہؐ (منتخب قرآنی سورتیں و نبویؐ ہدایات)',
      'باب دوم: ایمانیات و عبادات (جہاد فی سبیل اللہ، تقویٰ، استقامت، حقوق العباد)',
      'باب سوم: سیرتِ طیبہؐ (صلح حدیبیہ، فتح مکہ، خطبہ حجۃ الوداع کی عالمی اہمیت)',
      'باب چہارم: اسلامی ریاست اور شہریوں کے حقوق و فرائض (اقلیتوں کے حقوق، خواتین کے حقوق)',
      'باب پنجم: اسلامی نظامِ عدل، امربالمعروف و نہی عن المنکر'
    ]
  },
  {
    grade: 'Class 10',
    subject: 'Pakistan Studies',
    code: 'PST-10-SNC',
    filename: 'pctb-class-10-pakistan-studies.pdf',
    chapters: [
      'Ch 5: History of Pakistan II (1971 to Present: Z.A. Bhutto Era, 1973 Constitution, Zia Regime, Democracy, 21st Century)',
      'Ch 6: Pakistan in World Affairs (Foreign Policy Objectives, Relations with Neighbours, OIC, CPEC & Geo-strategic Position)',
      'Ch 7: Economic Development of Pakistan (Agriculture, Industries, Trade, Energy Resources & Challenges)',
      'Ch 8: Population, Society and Culture of Pakistan (Demography, Cultural Heritage, Languages, Tourism & Education)'
    ]
  }
];

async function generateAllTextbooks() {
  console.log(`Generating ${TEXTBOOKS_LIST.length} Matric Textbook PDFs...`);

  for (const tb of TEXTBOOKS_LIST) {
    const doc = await PDFDocument.create();
    const logo = logoBytes ? await doc.embedJpg(logoBytes) : null;
    const fonts = {
      regular: await doc.embedFont(StandardFonts.Helvetica),
      bold: await doc.embedFont(StandardFonts.HelveticaBold),
      italic: await doc.embedFont(StandardFonts.HelveticaOblique),
    };

    const totalPages = 2;

    // PAGE 1: OFFICIAL COVER, SYLLABUS BREAKDOWN & CHAPTER DIRECTORY
    {
      const page = doc.addPage([595.28, 841.89]);
      const { width, height } = page.getSize();
      drawHeader(page, fonts, logo, `${tb.subject} (${tb.grade})`, tb.grade);

      let y = height - 90;

      // Title Box
      page.drawRectangle({
        x: 40,
        y: y - 65,
        width: 515,
        height: 65,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText(`${tb.grade.toUpperCase()} ${tb.subject.toUpperCase()}`, {
        x: 52,
        y: y - 22,
        size: 15,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      page.drawText(`Official Punjab Curriculum & Textbook Board (PCTB) Syllabus - Course Code: ${tb.code}`, {
        x: 52,
        y: y - 38,
        size: 8.5,
        font: fonts.regular,
        color: C_TEXT_DARK,
      });

      page.drawText('Single National Curriculum (SNC) / BISE Gujranwala Examination Standard Edition', {
        x: 52,
        y: y - 52,
        size: 8,
        font: fonts.bold,
        color: C_ACCENT_GOLD,
      });

      y -= 80;

      // Chapters Box
      page.drawRectangle({
        x: 40,
        y: y - 380,
        width: 515,
        height: 380,
        color: C_WHITE,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText('COMPLETE CHAPTERS & TOPICAL CURRICULAR COVERAGE', {
        x: 52,
        y: y - 20,
        size: 10.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      let chapY = y - 40;
      tb.chapters.forEach((ch, ci) => {
        const lines = wrapText(`[${ci + 1}]  ${ch}`, fonts.regular, 8.2, 490);
        lines.forEach((l) => {
          page.drawText(l, {
            x: 52,
            y: chapY,
            size: 8.2,
            font: fonts.regular,
            color: C_TEXT_DARK,
          });
          chapY -= 12;
        });
        chapY -= 4;
      });

      y -= 395;

      // Official Source & Portal Card
      page.drawRectangle({
        x: 40,
        y: y - 85,
        width: 515,
        height: 85,
        color: C_LIGHT_GREEN,
        borderColor: C_EMERALD,
        borderWidth: 1,
      });

      page.drawText('OFFICIAL E-BOOK VERIFICATION & DOWNLOAD PORTAL', {
        x: 52,
        y: y - 18,
        size: 9.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const notice = 'This official document is compiled by M. S. Naz High School Academic Wing for matric students preparing for BISE Gujranwala annual board examinations. For complete digital scans and e-book releases, visit the Punjab Curriculum and Textbook Board portal at https://pctb.punjab.gov.pk/E-Books.';
      wrapText(notice, fonts.regular, 8, 490).forEach((nl, ni) => {
        page.drawText(nl, {
          x: 52,
          y: y - 34 - ni * 11,
          size: 8,
          font: fonts.regular,
          color: C_TEXT_DARK,
        });
      });

      drawFooter(page, fonts, 1, totalPages);
    }

    // PAGE 2: EXAMINATION BLUEPRINT, SLO PATTERNS & FACULTY MENTORSHIP
    {
      const page = doc.addPage([595.28, 841.89]);
      const { height } = page.getSize();
      drawHeader(page, fonts, logo, `${tb.subject} (${tb.grade})`, tb.grade);

      let y = height - 90;

      page.drawText('BISE GUJRANWALA BOARD EXAM BLUEPRINT & ASSESSMENT GUIDELINES', {
        x: 40,
        y,
        size: 11,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      y -= 22;

      // SLO Box
      page.drawRectangle({
        x: 40,
        y: y - 130,
        width: 515,
        height: 130,
        color: C_WHITE,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText('1. Student Learning Outcomes (SLO) Marks Breakdown', {
        x: 52,
        y: y - 18,
        size: 9.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const sloPoints = [
        '- 50% Knowledge-Based Assessment: Direct definitions, mathematical formulas, chemical equations, and textbook laws.',
        '- 35% Understanding-Based Assessment: Conceptual reasoning, comparative reasoning, mechanisms, and cause-effect questions.',
        '- 15% Application & Synthesis: Numerical problem solving, circuit analysis, algorithm logic, and real-world case applications.',
        '- Objective MCQs: 12 to 15 questions directly mapped from chapter summaries and review exercises.',
      ];

      let sloY = y - 36;
      sloPoints.forEach((sp) => {
        wrapText(sp, fonts.regular, 8.2, 490).forEach((spl) => {
          page.drawText(spl, { x: 52, y: sloY, size: 8.2, font: fonts.regular, color: C_TEXT_DARK });
          sloY -= 12;
        });
        sloY -= 3;
      });

      y -= 145;

      // MSNS Mentorship Advice
      page.drawRectangle({
        x: 40,
        y: y - 140,
        width: 515,
        height: 140,
        color: C_BG_CARD,
        borderColor: C_BORDER,
        borderWidth: 1,
      });

      page.drawText('2. MSNS Senior Faculty Top-Scorer Strategy (1000+ Marks Goal)', {
        x: 52,
        y: y - 18,
        size: 9.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const facultyAdvice = [
        '- Textbook Priority: Board examiners strictly adhere to PCTB textbook wording. Always cite textbook definitions verbatim.',
        '- Diagram Precision: Always use a sharp 2B pencil and clear labels for anatomical, physical, and chemical apparatus diagrams.',
        '- Presentation Rules: Draw double margin lines, highlight key terminology with 604/605 black cut markers, and leave 2 lines between answers.',
        '- Solved Past Papers: Practice past 5-year BISE Gujranwala Group 1 and Group 2 papers under timed exam hall conditions.',
      ];

      let facY = y - 36;
      facultyAdvice.forEach((fa) => {
        wrapText(fa, fonts.regular, 8.2, 490).forEach((fal) => {
          page.drawText(fal, { x: 52, y: facY, size: 8.2, font: fonts.regular, color: C_TEXT_DARK });
          facY -= 12;
        });
        facY -= 3;
      });

      y -= 155;

      // Practical & Lab Rehearsal (for Science/CS) or Language & Comprehension
      page.drawRectangle({
        x: 40,
        y: y - 120,
        width: 515,
        height: 120,
        color: C_WHITE,
        borderColor: C_EMERALD,
        borderWidth: 1,
      });

      page.drawText('3. Campus Science Labs, AI Workstations & Study Circles', {
        x: 52,
        y: y - 18,
        size: 9.5,
        font: fonts.bold,
        color: C_DARK_GREEN,
      });

      const labDesc = 'At M. S. Naz High School, matric students enjoy hands-on access to our fully equipped physics, chemistry, biology, and computer laboratories. Every practical syllabus experiment is rehearsed multiple times before board examinations. Students also access our 15 TB cloud storage for solved notes, past paper compilations, and model answer keys.';
      let labY = y - 36;
      wrapText(labDesc, fonts.regular, 8.2, 490).forEach((ll) => {
        page.drawText(ll, { x: 52, y: labY, size: 8.2, font: fonts.regular, color: C_TEXT_DARK });
        labY -= 12;
      });

      drawFooter(page, fonts, 2, totalPages);
    }

    const pdfBytes = await doc.save();
    const filePath = path.join(OUTPUT_DIR, tb.filename);
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`[+] Generated: ${tb.filename} (${pdfBytes.length} bytes)`);
  }

  console.log(`\nSuccessfully generated all ${TEXTBOOKS_LIST.length} matric textbook PDFs!`);
}

generateAllTextbooks().catch((err) => {
  console.error('Error generating textbooks:', err);
  process.exit(1);
});
