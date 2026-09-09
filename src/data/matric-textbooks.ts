export interface MatricTextbook {
  id: string;
  grade: "Class 9" | "Class 10";
  subject: string;
  urduSubject: string;
  group: "Science" | "Computer Science" | "Compulsory";
  medium: "English & Urdu" | "English" | "Urdu" | "Urdu & Arabic";
  publisher: string;
  edition: string;
  totalChapters: number;
  filename: string;
  fileSize: string;
  downloadUrl: string;
  officialPortalUrl: string;
  description: string;
  keyChapters: string[];
}

export const MATRIC_TEXTBOOKS: MatricTextbook[] = [
  // --- CLASS 9 ---
  {
    id: "physics-9",
    grade: "Class 9",
    subject: "Physics",
    urduSubject: "فزکس",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 9,
    filename: "pctb-class-9-physics.pdf",
    fileSize: "18.2 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-physics.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Official Punjab Board textbook covering Physical Quantities, Kinematics, Dynamics, Turning Effect of Forces, Gravitation, Work & Energy, Properties of Matter, Thermal Properties, and Transfer of Heat.",
    keyChapters: [
      "Ch 1: Physical Quantities & Measurement",
      "Ch 2: Kinematics (Equations of Motion)",
      "Ch 3: Dynamics (Newton's Laws & Friction)",
      "Ch 4: Turning Effect of Forces (Torque & Equilibrium)",
      "Ch 5: Gravitation (Law of Gravitation & Satellites)",
      "Ch 6: Work and Energy",
      "Ch 7: Properties of Matter (Density & Pressure)",
      "Ch 8: Thermal Properties of Matter",
      "Ch 9: Transfer of Heat"
    ]
  },
  {
    id: "chemistry-9",
    grade: "Class 9",
    subject: "Chemistry",
    urduSubject: "کیمسٹری",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 8,
    filename: "pctb-class-9-chemistry.pdf",
    fileSize: "16.4 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-chemistry.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Official textbook detailing Fundamentals of Chemistry, Structure of Atoms, Periodic Table, Structure of Molecules, Physical States of Matter, Solutions, Electrochemistry, and Chemical Reactivity.",
    keyChapters: [
      "Ch 1: Fundamentals of Chemistry (Mole & Avogadro)",
      "Ch 2: Structure of Atoms (Bohr & Rutherford)",
      "Ch 3: Periodic Table & Periodicity of Properties",
      "Ch 4: Structure of Molecules (Chemical Bonds)",
      "Ch 5: Physical States of Matter",
      "Ch 6: Solutions (Molarity & Solubility)",
      "Ch 7: Electrochemistry (Redox & Cells)",
      "Ch 8: Chemical Reactivity (Metals & Non-metals)"
    ]
  },
  {
    id: "biology-9",
    grade: "Class 9",
    subject: "Biology",
    urduSubject: "بائیولوجی",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 9,
    filename: "pctb-class-9-biology.pdf",
    fileSize: "21.5 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-biology.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Complete Punjab board biology syllabus covering Introduction to Biology, Solving a Biological Problem, Biodiversity, Cells and Tissues, Cell Cycle, Enzymes, Bioenergetics, Nutrition, and Transport.",
    keyChapters: [
      "Ch 1: Introduction to Biology & Careers",
      "Ch 2: Solving a Biological Problem",
      "Ch 3: Biodiversity & Classification",
      "Ch 4: Cells and Tissues (Organelles)",
      "Ch 5: Cell Cycle (Mitosis & Meiosis)",
      "Ch 6: Enzymes & Mechanism of Action",
      "Ch 7: Bioenergetics (Photosynthesis & Respiration)",
      "Ch 8: Nutrition (Human Digestive System)",
      "Ch 9: Transport (Circulation in Humans & Plants)"
    ]
  },
  {
    id: "computer-science-9",
    grade: "Class 9",
    subject: "Computer Science",
    urduSubject: "کمپیوٹر سائنس",
    group: "Computer Science",
    medium: "English",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 5,
    filename: "pctb-class-9-computer-science.pdf",
    fileSize: "14.8 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-computer-science.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Modernized digital curriculum focusing on Problem Solving, Binary Number Systems, Computer Networks & Architecture, Cyber Security & Ethical Computing, and HTML Web Designing.",
    keyChapters: [
      "Unit 1: Problem Solving (Flowcharts & Algorithms)",
      "Unit 2: Binary Number Systems & Data Representation",
      "Unit 3: Computer Networks & Communications",
      "Unit 4: Data and Cyber Security & Ethics",
      "Unit 5: Designing Website (HTML Fundamentals)"
    ]
  },
  {
    id: "mathematics-9",
    grade: "Class 9",
    subject: "Mathematics (Science Group)",
    urduSubject: "ریاضی (سائنس)",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 17,
    filename: "pctb-class-9-mathematics.pdf",
    fileSize: "22.1 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-mathematics.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Prescribed textbook for Science matriculants: Matrices & Determinants, Real & Complex Numbers, Logarithms, Algebraic Expressions, Factorization, Linear Equations, Trigonometric Theorems, and Geometry.",
    keyChapters: [
      "Ch 1: Matrices and Determinants",
      "Ch 2: Real and Complex Numbers",
      "Ch 3: Logarithms",
      "Ch 4: Algebraic Expressions and Formulas",
      "Ch 5: Factorization",
      "Ch 6: Algebraic Manipulation",
      "Ch 7: Linear Equations and Inequalities",
      "Ch 9: Introduction to Coordinate Geometry",
      "Ch 12: Line Bisectors & Angle Bisectors (Theorems)"
    ]
  },
  {
    id: "english-9",
    grade: "Class 9",
    subject: "English Compulsory",
    urduSubject: "انگریزی لازمی",
    group: "Compulsory",
    medium: "English",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 12,
    filename: "pctb-class-9-english.pdf",
    fileSize: "15.6 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-english.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Official English prose, poetry, and grammar textbook: The Saviour of Mankind, Patriotism, Daffodils, Media and Its Impact, Sultan Ahmad Mosque, Stopping by Woods, and formal writing.",
    keyChapters: [
      "Unit 1: The Saviour of Mankind (PBUH)",
      "Unit 2: Patriotism",
      "Unit 3: Media and Its Impact",
      "Unit 4: Hazrat Asma (RA)",
      "Unit 5: Daffodils (Poem)",
      "Unit 6: The Quaid's Vision and Pakistan",
      "Unit 7: Sultan Ahmad Mosque (Blue Mosque)",
      "Unit 8: Stopping by Woods on a Snowy Evening"
    ]
  },
  {
    id: "urdu-9",
    grade: "Class 9",
    subject: "Urdu Compulsory",
    urduSubject: "اردو لازمی",
    group: "Compulsory",
    medium: "Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 14,
    filename: "pctb-class-9-urdu.pdf",
    fileSize: "19.3 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-urdu.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Syllabus containing classical and modern Urdu essays, stories, Nazmein, and Ghazliyat by Mir Taqi Mir, Asadullah Khan Ghalib, Allama Iqbal, and Sir Syed Ahmad Khan.",
    keyChapters: [
      "سبق 1: ہجرتِ نبویؐ (مولانا شبلی نعمانی)",
      "سبق 2: مرزا غالب کے عادات و خصائل",
      "سبق 3: کاہلی (سر سید احمد خان)",
      "حصہ نظم: حمد، نعت، برسات کی بہاریں",
      "حصہ غزل: میر تقی میر، خواجہ حیدر علی آتش، اسد اللہ خان غالب"
    ]
  },
  {
    id: "tarjuma-tul-quran-9",
    grade: "Class 9",
    subject: "Tarjuma-tul-Quran-ul-Majeed",
    urduSubject: "ترجمۃ القرآن المجید",
    group: "Compulsory",
    medium: "Urdu & Arabic",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Single National Curriculum (50 Marks Compulsory)",
    totalChapters: 10,
    filename: "pctb-class-9-tarjuma-tul-quran.pdf",
    fileSize: "17.8 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-tarjuma-tul-quran.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Government of Punjab mandatory Quranic translation and tafseer textbook: Surah Maryam, Surah Taha, Surah Al-Anbiya, Surah Al-Hajj, Surah Al-Furqan, with vocabulary and moral virtues.",
    keyChapters: [
      "تعارف و پس منظر: سورۃ مریم",
      "تعارف و پس منظر: سورۃ طہٰ",
      "تعارف و پس منظر: سورۃ الانبیاء",
      "تعارف و پس منظر: سورۃ الحج",
      "تعارف و پس منظر: سورۃ الفرقان",
      "تعارف و پس منظر: سورۃ الشعراء و سورۃ النمل"
    ]
  },
  {
    id: "islamiat-9",
    grade: "Class 9",
    subject: "Islamiat Compulsory",
    urduSubject: "اسلامیات لازمی",
    group: "Compulsory",
    medium: "Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 6,
    filename: "pctb-class-9-islamiat.pdf",
    fileSize: "12.5 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-islamiat.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Core textbook covering Quranic selected verses, Ahadith-e-Nabawiyyah with translations, Islamic beliefs (Tauheed, Risalat, Akhirat), and Seerat-un-Nabi (PBUH).",
    keyChapters: [
      "باب اوّل: قرآن مجید و احادیثِ نبویہؐ",
      "باب دوم: ایمانیات و عبادات (توحید، رسالت، نماز، زکوٰۃ)",
      "باب سوم: سیرتِ طیبہ حضرت محمد رسول اللہؐ",
      "باب چہارم: اخلاق و آداب (صدق، امانت، والدین کا احترام)",
      "باب پنجم: حسنِ معاشرت اور سماجی ذمہ داریاں"
    ]
  },
  {
    id: "pakistan-studies-9",
    grade: "Class 9",
    subject: "Pakistan Studies",
    urduSubject: "مطالعہ پاکستان",
    group: "Compulsory",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 4,
    filename: "pctb-class-9-pakistan-studies.pdf",
    fileSize: "13.9 MB PDF",
    downloadUrl: "/api/documents/pctb-class-9-pakistan-studies.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Official text for Ideological Basis of Pakistan, Making of Pakistan (1857-1947), Land and Environment, and History of Pakistan (Phase I).",
    keyChapters: [
      "Ch 1: Ideological Basis of Pakistan (Two-Nation Theory)",
      "Ch 2: Making of Pakistan (1906 to 1947)",
      "Ch 3: Land and Environment of Pakistan (Geography & Climate)",
      "Ch 4: Women's Empowerment & Rights in Pakistan"
    ]
  },

  // --- CLASS 10 ---
  {
    id: "physics-10",
    grade: "Class 10",
    subject: "Physics",
    urduSubject: "فزکس",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 9,
    filename: "pctb-class-10-physics.pdf",
    fileSize: "19.5 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-physics.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Simple Harmonic Motion & Waves, Sound, Geometrical Optics, Electrostatics, Current Electricity, Electromagnetism, Basic Electronics, Information and Communication Technology, and Atomic and Nuclear Physics.",
    keyChapters: [
      "Ch 10: Simple Harmonic Motion and Waves",
      "Ch 11: Sound (Characteristics & Ultrasound)",
      "Ch 12: Geometrical Optics (Lenses & Mirrors)",
      "Ch 13: Electrostatics (Coulomb's Law & Capacitors)",
      "Ch 14: Current Electricity (Ohm's Law & Circuits)",
      "Ch 15: Electromagnetism (Faraday & Transformer)",
      "Ch 16: Basic Electronics (Logic Gates & Cathode Ray)",
      "Ch 17: Information and Communication Technology",
      "Ch 18: Atomic and Nuclear Physics (Radioactivity & Half-Life)"
    ]
  },
  {
    id: "chemistry-10",
    grade: "Class 10",
    subject: "Chemistry",
    urduSubject: "کیمسٹری",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 8,
    filename: "pctb-class-10-chemistry.pdf",
    fileSize: "17.8 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-chemistry.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Chemical Equilibrium, Acids, Bases and Salts, Organic Chemistry, Hydrocarbons, Biochemistry, Environmental Chemistry (The Atmosphere & Water), and Chemical Industries.",
    keyChapters: [
      "Ch 9: Chemical Equilibrium (Law of Mass Action)",
      "Ch 10: Acids, Bases and Salts (pH Scale & Neutralization)",
      "Ch 11: Organic Chemistry (Functional Groups & Isomerism)",
      "Ch 12: Hydrocarbons (Alkanes, Alkenes, Alkynes)",
      "Ch 13: Biochemistry (Carbohydrates, Proteins, Lipids, DNA)",
      "Ch 14: Environmental Chemistry I: The Atmosphere",
      "Ch 15: Environmental Chemistry II: Water (Hardness & Treatment)",
      "Ch 16: Chemical Industries (Metallurgy, Solvay Process, Urea)"
    ]
  },
  {
    id: "biology-10",
    grade: "Class 10",
    subject: "Biology",
    urduSubject: "بائیولوجی",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 9,
    filename: "pctb-class-10-biology.pdf",
    fileSize: "22.7 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-biology.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Gaseous Exchange, Homeostasis, Coordination and Control, Support and Movement, Reproduction, Inheritance, Biotechnology, and Pharmacology.",
    keyChapters: [
      "Ch 10: Gaseous Exchange in Plants & Humans",
      "Ch 11: Homeostasis (Kidney Anatomy & Dialysis)",
      "Ch 12: Coordination and Control (Nervous System & Brain)",
      "Ch 13: Support and Movement (Human Skeleton & Joints)",
      "Ch 14: Reproduction (Asexual, Sexual & Flowering Plants)",
      "Ch 15: Inheritance (Mendel's Laws & DNA Replication)",
      "Ch 16: Man and His Environment (Ecosystems & Pollution)",
      "Ch 17: Biotechnology (Genetic Engineering & Fermentation)",
      "Ch 18: Pharmacology (Medicinal & Addictive Drugs)"
    ]
  },
  {
    id: "computer-science-10",
    grade: "Class 10",
    subject: "Computer Science",
    urduSubject: "کمپیوٹر سائنس",
    group: "Computer Science",
    medium: "English",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 5,
    filename: "pctb-class-10-computer-science.pdf",
    fileSize: "16.1 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-computer-science.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Structured programming in C Language: Introduction to Programming, User Interface & Variables, Conditional Logic (If-Else & Switch), Loops & Control Structures, and Functions.",
    keyChapters: [
      "Unit 1: Introduction to Programming (C Environment & IDE)",
      "Unit 2: User Interface, Data Types, & Input/Output (printf/scanf)",
      "Unit 3: Conditional Logic (Relational Operators & If Statements)",
      "Unit 4: Data Structures & Loops (For, While, Do-While Loops)",
      "Unit 5: Functions (User-Defined Functions & Modular Code)"
    ]
  },
  {
    id: "mathematics-10",
    grade: "Class 10",
    subject: "Mathematics (Science Group)",
    urduSubject: "ریاضی (سائنس)",
    group: "Science",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 13,
    filename: "pctb-class-10-mathematics.pdf",
    fileSize: "23.4 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-mathematics.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Quadratic Equations, Theory of Quadratic Equations, Variations, Partial Fractions, Sets and Functions, Basic Statistics, Introduction to Trigonometry, and Circle Geometry Theorems.",
    keyChapters: [
      "Ch 1: Quadratic Equations (Factoring & Quadratic Formula)",
      "Ch 2: Theory of Quadratic Equations (Discriminant & Roots)",
      "Ch 3: Variations (Direct & Inverse Variation)",
      "Ch 4: Partial Fractions",
      "Ch 5: Sets and Functions (Venn Diagrams & Relations)",
      "Ch 6: Basic Statistics (Mean, Median, Mode & Deviation)",
      "Ch 7: Introduction to Trigonometry (Identities & Heights)",
      "Ch 9: Chords of a Circle (Mandatory 8-Mark Theorems)"
    ]
  },
  {
    id: "english-10",
    grade: "Class 10",
    subject: "English Compulsory",
    urduSubject: "انگریزی لازمی",
    group: "Compulsory",
    medium: "English",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 13,
    filename: "pctb-class-10-english.pdf",
    fileSize: "16.8 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-english.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Hazrat Muhammad (PBUH) an Embodiment of Justice, Chinese New Year, Try Again, First Aid, Television vs Newspapers, Little by Little One Walks Far, A World Without Books, and Peace.",
    keyChapters: [
      "Unit 1: Hazrat Muhammad (PBUH) an Embodiment of Justice",
      "Unit 2: Chinese New Year",
      "Unit 3: Try Again (Poem)",
      "Unit 4: First Aid",
      "Unit 5: The Rain (Poem by W. H. Davies)",
      "Unit 6: Television vs Newspapers",
      "Unit 7: Little by Little One Walks Far",
      "Unit 8: Peace (Poem by Dr. Hartmann)"
    ]
  },
  {
    id: "urdu-10",
    grade: "Class 10",
    subject: "Urdu Compulsory",
    urduSubject: "اردو لازمی",
    group: "Compulsory",
    medium: "Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 15,
    filename: "pctb-class-10-urdu.pdf",
    fileSize: "20.2 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-urdu.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Senior matric Urdu literature: Mirza Muhammad Saeed, Paristan ki Shehzadi, Urdu Adab mein Eid-ul-Fitr, Mujhe Mere Doston se Bachao, and classical poetry of Hasrat Mohani and Jigar Muradabadi.",
    keyChapters: [
      "سبق 1: مرزا محمد سعید (شاہد احمد دہلوی)",
      "سبق 2: نظریہ پاکستان (ڈاکٹر غلام مصطفیٰ خان)",
      "سبق 3: پرستان کی شہزادی (اشرف صبوحی)",
      "سبق 4: اردو ادب میں عید الفطر",
      "حصہ نظم: میدانِ کربلا میں صبح کا منظر (میر انیس)، فاطمہ بنتِ عبداللہ (اقبال)",
      "حصہ غزل: حسرت موہانی، جگر مراد آبادی، فراق گورکھپوری"
    ]
  },
  {
    id: "tarjuma-tul-quran-10",
    grade: "Class 10",
    subject: "Tarjuma-tul-Quran-ul-Majeed",
    urduSubject: "ترجمۃ القرآن المجید",
    group: "Compulsory",
    medium: "Urdu & Arabic",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Single National Curriculum (50 Marks Compulsory)",
    totalChapters: 10,
    filename: "pctb-class-10-tarjuma-tul-quran.pdf",
    fileSize: "18.5 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-tarjuma-tul-quran.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Prescribed translation, thematic commentary, and moral lessons from Surah Al-Qasas, Surah Al-Ankabut, Surah Ar-Rum, Surah Luqman, Surah As-Sajdah, and Surah Al-Ahzab.",
    keyChapters: [
      "تعارف و پس منظر: سورۃ القصص",
      "تعارف و پس منظر: سورۃ العنکبوت",
      "تعارف و پس منظر: سورۃ الروم",
      "تعارف و پس منظر: سورۃ لقمان (حکمت و تربیتِ اولاد)",
      "تعارف و پس منظر: سورۃ السجدہ",
      "تعارف و پس منظر: سورۃ الاحزاب (غزوہ احزاب و احکامِ پردہ)"
    ]
  },
  {
    id: "islamiat-10",
    grade: "Class 10",
    subject: "Islamiat Compulsory",
    urduSubject: "اسلامیات لازمی",
    group: "Compulsory",
    medium: "Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 6,
    filename: "pctb-class-10-islamiat.pdf",
    fileSize: "13.1 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-islamiat.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "Tafseer of selected Quranic Ayat, Ahadith-e-Nabawiyyah with context, Seerat-un-Nabi (PBUH) Conquest of Makkah and Farewell Pilgrimage, and contemporary Islamic ethics.",
    keyChapters: [
      "باب اوّل: قرآن مجید، فہمِ قرآن و احادیث مبارکہؐ",
      "باب دوم: ایمانیات و عبادات (جہاد، تقویٰ، استقامت)",
      "باب سوم: سیرتِ طیبہؐ (فتح مکہ، خطبہ حجۃ الوداع)",
      "باب چہارم: اسلامی ریاست اور شہریوں کے حقوق",
      "باب پنجم: اسلامی نظامِ عدل و انصاف"
    ]
  },
  {
    id: "pakistan-studies-10",
    grade: "Class 10",
    subject: "Pakistan Studies",
    urduSubject: "مطالعہ پاکستان",
    group: "Compulsory",
    medium: "English & Urdu",
    publisher: "Punjab Curriculum and Textbook Board (PCTB Lahore)",
    edition: "Latest Single National Curriculum (SNC) Revised Edition",
    totalChapters: 4,
    filename: "pctb-class-10-pakistan-studies.pdf",
    fileSize: "14.7 MB PDF",
    downloadUrl: "/api/documents/pctb-class-10-pakistan-studies.pdf",
    officialPortalUrl: "https://pctb.punjab.gov.pk/E-Books",
    description: "History of Pakistan (1971 to present), Foreign Policy of Pakistan & International Relations, Economic Development of Pakistan, and Population, Society & Culture.",
    keyChapters: [
      "Ch 5: History of Pakistan II (1971 to Modern Era & 1973 Constitution)",
      "Ch 6: Pakistan in World Affairs (Foreign Policy & CPEC)",
      "Ch 7: Economic Development of Pakistan (Agriculture, Industry & Energy)",
      "Ch 8: Population, Society and Culture of Pakistan"
    ]
  }
];

export function getTextbooksByGrade(grade: "Class 9" | "Class 10"): MatricTextbook[] {
  return MATRIC_TEXTBOOKS.filter((b) => b.grade === grade);
}

export function getTextbookById(id: string): MatricTextbook | undefined {
  return MATRIC_TEXTBOOKS.find((b) => b.id === id || b.filename === id);
}
