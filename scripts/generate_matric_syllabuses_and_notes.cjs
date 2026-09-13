const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const OUT_DIR = path.join(__dirname, '..', 'public', 'documents', 'notes');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Logo image path
const LOGO_PATH = path.join(__dirname, '..', 'public', 'images', 'logo.png');

function clean(text) {
  if (!text) return '';
  return text
    .replace(/[θ]/g, 'theta')
    .replace(/[π]/g, 'pi')
    .replace(/[ω]/g, 'omega')
    .replace(/[α]/g, 'alpha')
    .replace(/[β]/g, 'beta')
    .replace(/[Δ]/g, 'delta')
    .replace(/[√]/g, 'sqrt')
    .replace(/[×]/g, 'x')
    .replace(/[±]/g, '+/-')
    .replace(/[≈]/g, '~')
    .replace(/[Σ]/g, 'sum')
    .replace(/[∝]/g, 'prop to')
    .replace(/[≠]/g, '!=')
    .replace(/[≤]/g, '<=')
    .replace(/[≥]/g, '>=')
    .replace(/[°]/g, ' deg')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/[•]/g, '-')
    .replace(/[★]/g, '*')
    .replace(/[^\x00-\x7F]/g, ''); // strip any remaining non-ascii
}

const SUBJECT_NOTES_DATA = [
  // ================= CLASS 9 =================
  {
    filename: 'msns-class-9-physics-notes.pdf',
    title: 'Class 9 Physics: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Physics',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 60 | Practical: 15)',
    timeAllowed: '2 Hours 45 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '12 Compulsory MCQs (1 Mark each = 12 Marks). 1-2 questions per unit testing definitions, SI units, and standard formulas.' },
      { section: 'Section B: Short Questions', details: 'Attempt 15 out of 24 Short Questions divided into 3 sub-parts (Q2, Q3, Q4: 5/8 each = 30 Marks). Focus on scientific laws, derivations, and reasoning.' },
      { section: 'Section C: Long / Numerical Questions', details: 'Attempt 2 out of 3 Long Questions (Q5, Q6, Q7: Part (a) Theory 5 Marks + Part (b) Numerical 4 Marks = 18 Marks).' },
      { section: 'SLO Cognitive Distribution', details: 'Knowledge: 50% | Understanding: 35% | Application & Numerical Analysis: 15%.' }
    ],
    chapters: [
      {
        title: 'Unit 1: Physical Quantities & Measurement',
        keyConcepts: 'Base vs Derived Quantities, 7 SI base units, Prefixes (micro, nano, pico), Scientific notation, Least count of Vernier Calipers (0.1 mm / 0.01 cm) and Screw Gauge (0.01 mm / 0.001 cm), Zero error correction, Significant figures rules.'
      },
      {
        title: 'Unit 2: Kinematics',
        keyConcepts: 'Rest vs Motion, Translatory, Rotatory, and Vibratory motion, Scalars vs Vectors, Distance vs Displacement, Speed vs Velocity, Acceleration, Derivations of 3 Equations of Motion (vf = vi + at; S = vi*t + 1/2*a*t^2; 2aS = vf^2 - vi^2), Motion under gravity (g = 9.8 m/s^2).'
      },
      {
        title: 'Unit 3: Dynamics',
        keyConcepts: "Force, Inertia, Momentum (p = mv), Newton's 3 Laws of Motion, Mass vs Weight (W = mg), Law of Conservation of Momentum (m1v1 + m2v2 = m1v1' + m2v2'), Friction (static vs kinetic, advantages & reducing methods), Centripetal force (Fc = mv^2/r) and Banking of roads."
      },
      {
        title: 'Unit 4: Turning Effect of Forces',
        keyConcepts: 'Like and Unlike Parallel Forces, Head to Tail Rule, Resolution of Vectors (Fx = F cos theta, Fy = F sin theta), Torque (tau = F x L), Principle of Moments, Centre of Mass vs Centre of Gravity, Couple, Equilibrium (1st Condition: sum F = 0, 2nd Condition: sum tau = 0), States of Equilibrium (Stable, Unstable, Neutral).'
      },
      {
        title: 'Unit 5: Gravitation',
        keyConcepts: "Newton's Law of Universal Gravitation (F = G*m1*m2/r^2), Determination of Mass of Earth (Me = g*R^2/G approx 6.0 x 10^24 kg), Variation of 'g' with altitude, Artificial satellites and Orbital velocity formula (vo = sqrt(g*R))."
      },
      {
        title: 'Unit 6: Work and Energy',
        keyConcepts: 'Work (W = F*S cos theta, Unit: Joule), Kinetic Energy (KE = 1/2*m*v^2), Potential Energy (PE = mgh), Major Forms of Energy, Interconversion of Energy, Efficiency = (Output/Input) x 100%, Power (P = W/t, Unit: Watt, 1 hp = 746 W).'
      },
      {
        title: 'Unit 7: Properties of Matter',
        keyConcepts: 'Kinetic Molecular Model, Density (rho = m/V), Pressure (P = F/A, Unit: Pascal), Atmospheric pressure (barometer), Pascal Law (hydraulic press: F2/A2 = F1/A1), Archimedes Principle (Upthrust = rho*g*V), Principle of Flotation, Elasticity and Hooke Law (Stress/Strain = Young Modulus Y).'
      },
      {
        title: 'Unit 8: Thermal Properties of Matter',
        keyConcepts: 'Temperature vs Heat, Thermometers, Specific Heat Capacity (c = Q / (m*delta T)), Heat of Fusion (Hf) and Vaporization (Hv), Evaporation and cooling effect, Thermal expansion of solids and liquids (Linear expansion: delta L = alpha*L0*delta T, Volume expansion: delta V = beta*V0*delta T, where beta = 3*alpha).'
      },
      {
        title: 'Unit 9: Transfer of Heat',
        keyConcepts: 'Conduction (thermal conductivity k), Convection (convection currents in coastal breeze), Radiation (Stefan-Boltzmann law, black bodies as best absorbers/emitters), Applications of greenhouse effect, Thermos flask design.'
      }
    ],
    tips: [
      'Always write given data, standard formula, calculation steps, and SI units with final answers in numericals.',
      'Draw neat, labeled ray and vector diagrams with a sharp pencil and ruler.',
      'Memorize least counts and standard constants (G = 6.673 x 10^-11 Nm^2/kg^2, Me = 6 x 10^24 kg, Re = 6400 km).',
      'Frame final answers in rectangular boxes to enable rapid scoring by board examiners.'
    ]
  },
  {
    filename: 'msns-class-9-chemistry-notes.pdf',
    title: 'Class 9 Chemistry: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Chemistry',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 60 | Practical: 15)',
    timeAllowed: '2 Hours 45 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '12 Compulsory MCQs (1 Mark each = 12 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 15 out of 24 Short Questions (3 sub-sections: Q2, Q3, Q4: 5/8 each = 30 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 2 out of 3 Long Questions (Q5, Q6, Q7: 9 Marks each = 18 Marks).' },
      { section: 'SLO Cognitive Weightage', details: 'Knowledge: 45% | Understanding: 40% | Chemical Equation Balancing & Application: 15%.' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Fundamentals of Chemistry',
        keyConcepts: 'Branches of Chemistry, Elements, Compounds vs Mixtures, Atomic Number (Z) vs Mass Number (A), Relative Atomic Mass and amu, Chemical Formula writing, Empirical vs Molecular formula, Mole and Avogadro number (NA = 6.02 x 10^23), Mole calculations.'
      },
      {
        title: 'Chapter 2: Structure of Atoms',
        keyConcepts: "Rutherford Atomic Model & its defects, Bohr Atomic Theory and Postulates, Electronic Configuration of first 18 elements (s, p, d, f subshells), Isotopes of Hydrogen, Carbon, Chlorine, Uranium and their industrial/medical uses."
      },
      {
        title: 'Chapter 3: Periodic Table & Periodicity',
        keyConcepts: 'Modern Periodic Law, Groups (1 to 18) and Periods (1 to 7), s, p, d, f blocks, Periodic Trends: Atomic radius, Ionic radius, Ionization energy, Electron affinity, Electronegativity (variation along periods and down groups).'
      },
      {
        title: 'Chapter 4: Structure of Molecules',
        keyConcepts: 'Octet and Duplet rule, Why atoms react, Chemical Bonds: Ionic Bond (NaCl), Covalent Bond (Single, Double, Triple), Dative/Coordinate Covalent Bond (NH4+, H3O+), Metallic Bond (electron sea model), Intermolecular Forces (Dipole-Dipole, Hydrogen Bonding in water).'
      },
      {
        title: 'Chapter 5: Physical States of Matter',
        keyConcepts: "Kinetic Molecular Theory of gases, Boyle Law (P1V1 = P2V2), Charles Law (V1/T1 = V2/T2, Kelvin scale), Absolute Zero (-273.15 deg C), Diffusion, Effusion, Liquid state (evaporation, vapor pressure, boiling point), Solid state (amorphous vs crystalline, allotropy of Sulfur, Carbon, Tin)."
      },
      {
        title: 'Chapter 6: Solutions',
        keyConcepts: 'Solute vs Solvent, Types of solutions (gas, liquid, solid), Saturated, Unsaturated, and Supersaturated solutions, Concentration Units: Percentage (% m/m, % m/v, % v/m, % v/v), Molarity (M = moles of solute / dm^3 of solution), Dilution of solution (M1V1 = M2V2), Solubility and "Like dissolves like", Colloids and Suspensions (Tyndall Effect).'
      },
      {
        title: 'Chapter 7: Electrochemistry',
        keyConcepts: 'Oxidation and Reduction in terms of electron loss/gain and oxidation state, Rules for assigning oxidation number, Oxidizing vs Reducing agents, Electrolytic Cell vs Galvanic (Voltaic) Cell, Nelson cell for NaOH manufacture, Down cell for Na, Rusting of iron and prevention (galvanizing, tin plating, sacrificial protection).'
      },
      {
        title: 'Chapter 8: Chemical Reactivity',
        keyConcepts: 'Metals and Non-metals properties, Electropositive character of metals and reactivity series, Alkali vs Alkaline earth metals, Inertness of noble metals (Gold, Platinum), Non-metals (Halogens reactivity trend F2 > Cl2 > Br2 > I2).'
      }
    ],
    tips: [
      'Write balanced chemical equations with state symbols (s, l, g, aq) for every chemical reaction.',
      'In electronic configuration questions, always specify principal energy levels (K, L, M) and subshells (1s, 2s, 2p).',
      'For Molarity numericals, always convert volume from cm^3 to dm^3 by dividing by 1000.'
    ]
  },
  {
    filename: 'msns-class-9-biology-notes.pdf',
    title: 'Class 9 Biology: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Biology',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 60 | Practical: 15)',
    timeAllowed: '2 Hours 45 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '12 Compulsory MCQs (1 Mark each = 12 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 15 out of 24 Short Questions (3 sub-sections: Q2, Q3, Q4: 5/8 each = 30 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 2 out of 3 Long Questions (Q5, Q6, Q7: 9 Marks each = 18 Marks).' },
      { section: 'SLO Cognitive Weightage', details: 'Knowledge: 50% | Understanding: 35% | Biological Diagram Labeling & Application: 15%.' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Introduction to Biology',
        keyConcepts: 'Major divisions (Botany, Zoology, Microbiology), Branches (Morphology, Anatomy, Histology, Physiology, Genetics, Biotechnology, Ecology), Relationship with other sciences, Careers, Holy Quran and biological concepts, Muslim scientists (Jabir Bin Hayan, Abdul Malik Asmai, Bu Ali Sina), Levels of Biological Organization (Subatomic to Biosphere).'
      },
      {
        title: 'Chapter 2: Solving a Biological Problem',
        keyConcepts: 'Biological Method steps: Observation (Quantitative vs Qualitative), Hypothesis formulation, Deductions (If... then logic), Experimentation, Control vs Experimental Group, Summarization of results, Theory and Law.'
      },
      {
        title: 'Chapter 3: Biodiversity',
        keyConcepts: 'Definition & importance of biodiversity, Aims of Classification, History of classification (Aristotle, Abu Usman Umer Al-Jahiz), Two-Kingdom to Five-Kingdom System (Robert Whittaker, Margulis & Schwartz), Binomial Nomenclature (Carl Linnaeus rules), Conservation of biodiversity, Endangered species of Pakistan (Indus Dolphin, Markhor, Houbara Bustard).'
      },
      {
        title: 'Chapter 4: Cells and Tissues',
        keyConcepts: 'Microscopy (Magnification vs Resolution, Light vs Electron microscope), Cell Theory (Schleiden, Schwann, Virchow), Prokaryotic vs Eukaryotic cells, Organelles: Nucleus, Mitochondria, Ribosomes, Endoplasmic Reticulum, Golgi apparatus, Plastids, Vacuoles, Cell wall, Cell membrane (Fluid Mosaic Model), Tissues: Plant (Meristematic, Permanent) and Animal (Epithelial, Connective, Muscle, Nervous).'
      },
      {
        title: 'Chapter 5: Cell Cycle',
        keyConcepts: 'Interphase (G1, S, G2 phases), Mitosis: Karyokinesis (Prophase, Metaphase, Anaphase, Telophase) and Cytokinesis, Significance of mitosis, Meiosis: Meiosis I (Prophase I crossing over, chiasmata), Significance of meiosis, Necrosis vs Apoptosis.'
      },
      {
        title: 'Chapter 6: Enzymes',
        keyConcepts: 'Definition, Active Site, Substrate, Co-factors and Co-enzymes, Characteristics of enzymes, Factors affecting rate: Temperature (Optimum temp, Denaturation), pH, Substrate concentration, Models: Lock and Key Model (Emil Fischer) and Induced Fit Model (Daniel Koshland).'
      },
      {
        title: 'Chapter 7: Bioenergetics',
        keyConcepts: 'Oxidation-Reduction in living organisms, ATP as Energy Currency (adenosine + 3 phosphate bonds), Photosynthesis: Light Reaction (Z-scheme, Photolysis, ATP & NADPH formation) and Dark Reaction (Calvin Cycle), Limiting factors of photosynthesis, Cellular Respiration: Aerobic vs Anaerobic (Alcoholic and Lactic acid fermentation), Glycolysis, Krebs cycle, Electron Transport Chain.'
      },
      {
        title: 'Chapter 8: Nutrition',
        keyConcepts: 'Autotrophic vs Heterotrophic, Mineral nutrition in plants (Nitrogen, Magnesium deficiency), Components of human food (Carbohydrates, Lipids, Proteins, Minerals, Vitamins A, C, D), Malnutrition (PEM: Marasmus, Kwashiorkor), Human Alimentary Canal: Mouth, Pharynx, Esophagus (Peristalsis), Stomach (Pepsin, Gastric juice), Small Intestine (Duodenum, Jejunum, Ileum, Villi absorption), Large Intestine, Liver & Pancreas functions.'
      },
      {
        title: 'Chapter 9: Transport',
        keyConcepts: 'Transport in Plants: Water and mineral uptake by roots, Transpiration (factors affecting rate), Transpiration as a necessary evil, Transpiration Pull Theory, Translocation of organic solutes (Pressure Flow Mechanism), Transport in Humans: Blood components (Plasma, RBCs, WBCs, Platelets), ABO & Rh blood group systems, Human Heart structure and cardiac cycle, Blood vessels (Arteries, Veins, Capillaries), Cardiovascular disorders (Atherosclerosis, Arteriosclerosis, Myocardial Infarction).'
      }
    ],
    tips: [
      'Draw large, clearly labeled anatomical diagrams with neat horizontal callout pointers.',
      'Highlight key terms like Peristalsis, Photolysis, Crossing Over, and Lock-and-Key.',
      'Distinguish clearly between terms with tabular side-by-side comparisons (e.g. Mitosis vs Meiosis, Arteries vs Veins).'
    ]
  },
  {
    filename: 'msns-class-9-computer-science-notes.pdf',
    title: 'Class 9 Computer Science: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Computer Science',
    group: 'Computer Science Group',
    totalMarks: '75 Marks (Theory: 50 | Practical: 25)',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (1 Mark each = 10 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 12 out of 18 Short Questions (3 sub-sections: Q2, Q3, Q4: 4/6 each = 24 Marks).' },
      { section: 'Section C: Long / Analytical Questions', details: 'Attempt 2 out of 3 Long Questions (Q5, Q6, Q7: 8 Marks each = 16 Marks).' },
      { section: 'SLO Cognitive Weightage', details: 'Algorithmic Problem Solving: 35% | Binary Logic & Security: 35% | Web Designing (HTML): 30%.' }
    ],
    chapters: [
      {
        title: 'Unit 1: Problem Solving',
        keyConcepts: 'Steps in Problem Solving (Defining, Understanding 5 Ws, Planning, Defining candid solutions, Selecting best solution), Flowcharts (Symbols: Terminal, Process, Decision, Input/Output, Connector, Flow lines), Importance of flowcharts, Algorithms (Formulation, Notation: Start, Input, Set, If-else, Output, Stop), Algorithm efficiency (Time & Space complexity), Verification vs Validation, Trace table and finding runtime errors.'
      },
      {
        title: 'Unit 2: Binary Number Systems',
        keyConcepts: 'Number Systems: Decimal (Base 10), Binary (Base 2), Hexadecimal (Base 16), Conversions (Decimal to Binary/Hex, Binary/Hex to Decimal, Binary to Hex grouping of 4 bits), Memory and Data Storage: Bit, Nibble, Byte, KB, MB, GB, TB, PB, Volatile (RAM) vs Non-Volatile (ROM) storage, Data Representation: Text (ASCII code, Unicode), Boolean Algebra (Propositions, Truth values, Logical Operators: AND, OR, NOT, Truth tables, Laws of Boolean Algebra).'
      },
      {
        title: 'Unit 3: Computer Networks',
        keyConcepts: 'Definition of Computer Network, Need for a network (file sharing, hardware sharing, internet sharing), Client-Server vs Peer-to-Peer architecture, Network Topologies (Bus, Star, Ring, Mesh - diagrams, pros & cons), Transmission Media: Guided (Twisted pair, Coaxial, Fiber optic) and Unguided (Radio waves, Microwaves, Infrared), Communication over Internet: TCP/IP Model (Application, Transport, Network, Data Link, Physical layer), IP Addressing (IPv4 32-bit vs IPv6 128-bit), Routers, DHCP, DNS.'
      },
      {
        title: 'Unit 4: Data and Cyber Security',
        keyConcepts: 'Ethical issues of security: Confidentiality, Integrity, Availability (CIA Triad), Piracy (Copyright, Patents, Trade Secrets), Cybercrimes: Identity theft, Phishing, DoS (Denial of Service) attacks, Hacking vs Cracking, Malware: Viruses, Worms, Trojan Horses, Spyware, Ransomware, Encryption: Plaintext, Ciphertext, Caesar cipher, Vigenere cipher, Strong passwords and 2FA.'
      },
      {
        title: 'Unit 5: Designing Website (HTML)',
        keyConcepts: 'Introduction to HyperText Markup Language (HTML), Web browser vs Web server, URL structure, HTML tags (Paired vs Unpaired/Self-closing tags), Structure of HTML page (html, head, title, body), Text formatting tags (b, i, u, p, br, hr, h1 to h6), Lists in HTML: Ordered (ol), Unordered (ul), Definition (dl), Hyperlinks (a href), Images (img src, alt, width, height), HTML Tables (table, tr, th, td, colspan, rowspan).'
      }
    ],
    tips: [
      'Practice drawing flowcharts with a ruler and correct diamond decision and oval terminal shapes.',
      'Master binary-hex conversions and ASCII bit calculation problems.',
      'Memorize HTML tag syntax with exact closing tags and quote-enclosed attributes.'
    ]
  },
  {
    filename: 'msns-class-9-mathematics-notes.pdf',
    title: 'Class 9 Mathematics: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Mathematics (Science Group)',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 75)',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '15 Compulsory MCQs (1 Mark each = 15 Marks). 1-2 questions from each chapter.' },
      { section: 'Section B: Short Questions', details: 'Attempt 18 out of 27 Short Questions (3 sub-sections: Q2, Q3, Q4: 6/9 each = 36 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 3 out of 5 Long Questions (8 Marks each = 24 Marks). Question 9 (Theorems from Ch 12 or Ch 16) is COMPULSORY.' },
      { section: 'Mandatory Theorem Requirement', details: 'Q9 has 8 marks dedicated to proving one geometry theorem from Chapter 12 or Chapter 16.' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Matrices and Determinants',
        keyConcepts: 'Order of matrix, Types of matrices (Row, Column, Square, Rectangular, Zero, Identity, Diagonal, Scalar), Transpose, Symmetric vs Skew-Symmetric, Matrix addition and multiplication condition, Determinant of 2x2 matrix, Singular vs Non-singular, Adjoint of matrix, Multiplicative Inverse (A^-1 = 1/|A| * adj A), Solving system of linear equations: Matrix Inversion Method and Cramer Rule.'
      },
      {
        title: 'Chapter 2: Real and Complex Numbers',
        keyConcepts: 'Real numbers classification (Rational vs Irrational), Radicals and Radicands, Laws of Exponents (x^a * x^b = x^(a+b), (x^a)^b = x^(ab)), Complex numbers (z = a + bi, i = sqrt(-1), i^2 = -1), Conjugate of complex number, Basic operations on complex numbers (+, -, *, /).'
      },
      {
        title: 'Chapter 3: Logarithms',
        keyConcepts: 'Scientific notation, Definition of Logarithm (y = log_b x <=> b^y = x), Common (Base 10) vs Natural (Base e) logarithms, Characteristic and Mantissa, Laws of Logarithms: log(mn) = log m + log n; log(m/n) = log m - log n; log(m^n) = n log m; Change of base rule; Application of logarithms in calculating complex numerical expressions.'
      },
      {
        title: 'Chapter 4: Algebraic Expressions & Algebraic Formulas',
        keyConcepts: 'Polynomials and Degree, Rational expressions, Value of algebraic expression, Core Formulas: (a+b)^2, (a-b)^2, a^2 - b^2, (a+b+c)^2, (a+b)^3, (a-b)^3, a^3 + b^3, a^3 - b^3, Surds and their conjugate (rationalization of denominator).'
      },
      {
        title: 'Chapter 5: Factorization',
        keyConcepts: 'Techniques of factorization: Common terms, Grouping, Using standard formulas, Completing the square, Mid-term break method, Remainder Theorem and Factor Theorem, Factorization of cubic polynomials.'
      },
      {
        title: 'Chapter 6: Algebraic Manipulation',
        keyConcepts: 'Highest Common Factor (HCF) by Factorization and Division methods, Least Common Multiple (LCM), Relation between HCF and LCM: HCF x LCM = p(x) x q(x), Square root of algebraic expressions by factorization and division.'
      },
      {
        title: 'Chapter 7: Linear Equations & Inequalities',
        keyConcepts: 'Linear equation in one variable, Equations involving absolute value (|x| = a => x = +/- a), Extraneous roots, Linear inequalities and their solution sets on real number line.'
      },
      {
        title: 'Chapter 9: Introduction to Coordinate Geometry',
        keyConcepts: 'Distance Formula: d = sqrt[(x2 - x1)^2 + (y2 - y1)^2], Collinear points condition, Types of triangles (Equilateral, Isosceles, Scalene, Right-angled using Pythagoras theorem), Mid-point Formula: R = ((x1+x2)/2, (y1+y2)/2).'
      },
      {
        title: 'Chapter 12: Line Bisectors and Angle Bisectors (Theorems)',
        keyConcepts: 'Theorem 12.1: Any point on the right bisector of a line segment is equidistant from its end points. Theorem 12.2: Any point equidistant from end points lies on right bisector. Theorem 12.4: Any point on bisector of an angle is equidistant from its arms.'
      }
    ],
    tips: [
      'Question 9 Theorem is MANDATORY: Always write Given, To Prove, Construction, and Table of Statements & Reasons with an accurate diagram.',
      'Show every step in Cramer Rule and Matrix Inversion method (Determinant, Adjoint, Inverse, Multiplication).',
      'For logarithm calculations, state the law of logarithm used before applying anti-logarithm.'
    ]
  },
  {
    filename: 'msns-class-9-english-notes.pdf',
    title: 'Class 9 English: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'English Compulsory',
    group: 'Compulsory for All Groups',
    totalMarks: '75 Marks',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '19 Compulsory MCQs (19 Marks): Correct form of verbs (5), Correct spelling (4), Correct meanings/synonyms (5), Grammar items (5).' },
      { section: 'Section B: Short Questions', details: 'Attempt 5 out of 8 comprehension questions from textbook prose lessons (10 Marks).' },
      { section: 'Section C: Translation & Summary', details: 'Translate 2 out of 3 prose paragraphs into Urdu (8 Marks). Write Summary of Poem (Daffodils or Stopping by Woods) (5 Marks).' },
      { section: 'Section D: Idioms, Letters & Comprehension', details: 'Use 5 idioms/phrases in sentences (5 Marks). Write formal Letter/Story/Dialogue (8 Marks). Reading Comprehension unseen paragraph (10 Marks). Translation into English sentences (5 Marks). Change of Voice: Active/Passive (5 Marks).' }
    ],
    chapters: [
      {
        title: 'High-Yield Prose Units',
        keyConcepts: 'Unit 1: The Saviour of Mankind (PBUH) - Divine mission, Arabia before Islam, determination against Pagan Arabs; Unit 2: Patriotism - Love for motherland, Quaid quotes, defense against aggression; Unit 4: Hazrat Asma (RA) - Role during Migration to Madinah, courage before Abu Jahl, generosity; Unit 6: The Quaid Vision and Pakistan - Ideology of Pakistan, unity, faith, and discipline; Unit 7: Sultan Ahmad Mosque - Blue Mosque architecture, royal kiosk, ceramic tiles; Unit 9: All is Not Lost - Nurse devotion, ICU recovery of Hira.'
      },
      {
        title: 'Poetry Summaries & Paraphrasing',
        keyConcepts: 'Poem 1: "Daffodils" by William Wordsworth - Theme of nature bliss, host of golden daffodils beside the lake, inward eye and bliss of solitude; Poem 2: "Stopping by Woods on a Snowy Evening" by Robert Frost - Theme of life responsibilities vs natural beauty, darkest evening of year, promises to keep and miles to go before I sleep.'
      },
      {
        title: 'Core Grammar & Writing Skills',
        keyConcepts: 'Parts of Speech identification, Types of Nouns (Abstract, Concrete, Collective), Pronoun-Antecedent Agreement, Gerunds vs Participles vs Infinitives, Conditionals (Type I & II), Tenses (Present, Past, Future all 4 aspects), Active & Passive Voice rules, Direct & Indirect Speech rules, High-yield Letters (To mother about health, to friend on exam success, to father for money).'
      }
    ],
    tips: [
      'In poem summaries, always begin with a strong 2-sentence introduction mentioning the poet name and core poetic theme.',
      'In translation, write natural, idiomatic Urdu rather than awkward literal word-for-word translation.',
      'Check verb tenses carefully in English translation sentences - pay special attention to continuous vs perfect tenses.'
    ]
  },
  {
    filename: 'msns-class-9-urdu-notes.pdf',
    title: 'Class 9 Urdu: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Urdu Compulsory',
    group: 'Compulsory for All Groups',
    totalMarks: '75 Marks',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '15 Compulsory MCQs (15 Marks): Prose lessons (5), Literary terms (Tashbeeh, Istiara, Radeef, Qafia) (5), Grammar & Ierab (5).' },
      { section: 'Section B: Poetry Explanation', details: 'Explanation of 3 couplets from Nazm and 2 from Ghazal with poet reference and central theme (10 Marks).' },
      { section: 'Section C: Prose Paragraph Explanation', details: 'Explanation of 2 prose passages with context, reference to author, and meanings of underlined words (10 Marks).' },
      { section: 'Section D: Lesson Summary & Short Questions', details: '5 short comprehension questions from prose (10 Marks). Summary of 1 out of 2 prescribed prose lessons (5 Marks).' },
      { section: 'Section E: Creative Writing & Composition', details: 'Summary or Central Idea of Poem (5 Marks). Formal Letter or Application (10 Marks). Moral Story or Dialogue (5 Marks). Correction or Completion of sentences (5 Marks).' }
    ],
    chapters: [
      {
        title: 'Core Prose Lessons',
        keyConcepts: 'Lesson 1: Hijrat-e-Nabawi (PBUH) by Shibli Nomani - Historical background, Hazrat Ali (RA) sleeping on Prophet bed, shelter at Cave Thawr; Lesson 2: Mirza Ghalib ke Aadaat-o-Khasail by Altaf Hussain Hali - Generosity, courtesy, love for mangoes and friends; Lesson 3: Kahili by Sir Syed Ahmad Khan - Leaving mental faculties idle, virtue of continuous effort; Lesson 4: Shaeron ke Lateefay by Maulana Muhammad Hussain Azad; Lesson 6: Panchayat by Munshi Premchand - Algu Chaudhry and Jumman Sheikh justice.'
      },
      {
        title: 'Nazm and Ghazal Section',
        keyConcepts: 'Nazm 1: Hamd by Altaf Hussain Hali - Divine majesty and human submission; Nazm 2: Naat by Ameer Meenai - Love and devotion to Prophet (PBUH); Nazm 3: Barsat ki Baharen by Nazeer Akbarabadi; Ghazal 1: Mir Taqi Mir (Hasti apni habab ki si hai); Ghazal 2: Khwaja Haider Ali Aatish (Yeh aarzoo thi tujhe gul ke roobaroo karte); Ghazal 3: Mirza Asadullah Khan Ghalib (Dil-e-nadan tujhe hua kya hai).'
      },
      {
        title: 'Literary Figures of Speech & Grammar',
        keyConcepts: 'Tashbeeh (Simile) 5 components: Mushabbah, Mushabbah-Bihi, Wajah-e-Shibh, Gharz-e-Tashbeeh, Harf-e-Tashbeeh; Istiara (Metaphor) 3 components: Mustaar-Lahu, Mustaar-Minhu, Wajah-e-Jami; Distinction between Radeef and Qafia; Official Letter format (Examination Hall, Date, Salutation, Body, Conclusion).'
      }
    ],
    tips: [
      'In prose explanation, always clearly state lesson title and author name, and provide accurate meanings for highlighted vocabulary.',
      'In couplet explanations, write at least 2 structured paragraphs connecting the poetic verse with Quranic verses or supporting couplets.',
      'Keep the lesson summary concise, approximately one-third (1/3) of the original textbook lesson length.'
    ]
  },
  {
    filename: 'msns-class-9-tarjuma-tul-quran-notes.pdf',
    title: 'Class 9 Tarjuma-tul-Quran: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Tarjuma-tul-Quran-ul-Majeed',
    group: 'Compulsory for All Groups',
    totalMarks: '50 Marks',
    timeAllowed: '2 Hours',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks): Surah introduction, Makki/Madani classification, core themes, and Quranic vocabulary meanings.' },
      { section: 'Section B: Short Questions', details: 'Attempt 5 out of 8 Short Questions (10 Marks) covering events, prophetic stories, and core moral teachings.' },
      { section: 'Section C: Quranic Vocabulary Meanings', details: 'Write Urdu meanings for 5 out of 8 selected Quranic Arabic words (5 Marks).' },
      { section: 'Section D: Translation of Selected Verses', details: 'Translate 3 out of 5 Quranic Ayat into fluent, idiomatic Urdu (15 Marks, 5 Marks per Ayah).' },
      { section: 'Section E: Comprehensive Surah Analysis', details: 'Write a comprehensive note on 1 out of 2 Surahs covering background, themes, and 5 practical life lessons (10 Marks).' }
    ],
    chapters: [
      {
        title: 'Prescribed Surahs & Background',
        keyConcepts: 'Surah Maryam (Makki, Supplication of Hazrat Zakariyya & birth of Yahya, miraculous birth of Hazrat Isa (AS)); Surah Taha (Mission of Hazrat Musa (AS), preaching to Pharaoh, magicians accepting faith); Surah Al-Anbiya (Prophets prayers in distress: Ibrahim in fire, Ayyub in illness, Yunus in whale belly); Surah Al-Hajj (Sacred rites of Hajj, earthquake of Day of Judgment, piety); Surah Al-Furqan (12 Virtues of Ibad-ur-Rahman, criteria of truth vs falsehood).'
      },
      {
        title: 'Core Quranic Vocabulary',
        keyConcepts: 'Mihrab (Chamber/Sanctuary), Aaqir (Barren), Ashiyya (Evening), Nasiyya (Forgotten), Hanana (Tender mercy), Sadafa (Turned away), Judhadha (Broken fragments), Makhaad (Birth pangs), Haseed (Harvested crop), Gharama (Inescapable punishment).'
      },
      {
        title: 'Virtues of Ibad-ur-Rahman (Servants of the Most Merciful)',
        keyConcepts: 'Walking with humility upon earth; Greeting arrogant mockers with words of peace; Spending nights in prostration and prayer; Praying for refuge from Hell; Practicing moderation in spending (neither extravagance nor miserliness); Avoiding shirk, unjust killing, adultery, and false testimony.'
      }
    ],
    tips: [
      'In Ayah translation, maintain both grammatical accuracy and fluent Urdu prose.',
      'In the comprehensive Surah question, clearly structure the answer: Name, Meaning, Makki/Madani status, Ruku/Ayat count, Central Theme, and 5 Practical Lessons.'
    ]
  },
  {
    filename: 'msns-class-9-islamiat-notes.pdf',
    title: 'Class 9 Islamiat: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Islamiat Compulsory',
    group: 'Compulsory for All Groups',
    totalMarks: '50 Marks',
    timeAllowed: '2 Hours',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 8 out of 12 Short Questions (16 Marks).' },
      { section: 'Section C: Quranic Ayat Translation', details: 'Translate 2 out of 3 selected Quranic verses into fluent Urdu (8 Marks).' },
      { section: 'Section D: Hadith Translation & Explanation', details: 'Translate and explain 1 selected Hadith Nabawi (6 Marks).' },
      { section: 'Section E: Comprehensive Essay Question', details: 'Write a comprehensive, referenced essay on 1 out of 2 Islamic topics (10 Marks).' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Quran Majeed & Hadith Nabawi',
        keyConcepts: 'Introduction and miraculous preservation of the Holy Quran; Compilation under Hazrat Abu Bakr (RA) and Hazrat Usman (RA); Status and authority of Hadith as primary source; Core Hadith: Seeking knowledge is an obligation on every Muslim; Best among you is the one who learns and teaches the Quran; Cleanliness is half of faith.'
      },
      {
        title: 'Chapter 2: Islamic Beliefs & Worship',
        keyConcepts: 'Tauheed (Absolute Oneness of Allah, categories of Shirk); Risalat (Finality of Prophethood Khatam-un-Nabiyyin with Quranic and Hadith proofs, universal prophethood); Belief in Angels, Divine Books, and Akhirah (Day of Judgment); Pillars of Islam: Salat (spiritual connection), Zakat (socio-economic justice), Sawm (piety & self-restraint).'
      },
      {
        title: 'Chapter 3: Seerat-un-Nabi (PBUH)',
        keyConcepts: 'Early preaching of Islam in Makkah; Patience during persecutions and Boycott in Shi\'b Abi Talib; Migration to Madinah; Charter of Madinah (Misaq-e-Madinah - first written constitution); Muakhat (Brotherhood of Madinah); Noble character: Honesty, mercy, justice, and courage.'
      },
      {
        title: 'Chapter 4: Ethics & Social Etiquette',
        keyConcepts: 'Truthfulness (Sidq); Fulfilling promises (Ahd); Rights of parents, teachers, elders, and neighbors; Dignity of labor and Halal earning; Prohibition of backbiting (Gheebah), jealousy (Hasad), and arrogance (Kibr).'
      }
    ],
    tips: [
      'Highlight Quranic verse translations and Hadith references using clear sub-headings.',
      'In Hadith explanation, dedicate at least one paragraph to modern practical implementation.'
    ]
  },
  {
    filename: 'msns-class-9-pakistan-studies-notes.pdf',
    title: 'Class 9 Pakistan Studies: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 9 (9th Matric)',
    subject: 'Pakistan Studies',
    group: 'Compulsory for All Groups',
    totalMarks: '50 Marks',
    timeAllowed: '2 Hours',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks): Dates, events, geographic features, and constitutional milestones.' },
      { section: 'Section B: Short Questions', details: 'Attempt 12 out of 18 Short Questions (Q2: 6/9, Q3: 6/9 = 24 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 2 out of 3 Long Questions (8 Marks each = 16 Marks).' },
      { section: 'SLO Cognitive Weightage', details: 'Historical Recall: 40% | Conceptual Analysis & Geography: 45% | Civic Understanding: 15%.' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Ideological Basis of Pakistan',
        keyConcepts: 'Definition and sources of Ideology; Islamic ethos and cultural heritage; Two-Nation Theory (Sir Syed Ahmad Khan and Aligarh Movement); Ideology in light of Allama Iqbal 1930 Allahabad Address and Quaid-e-Azam Muhammad Ali Jinnah speeches (1940-1948).'
      },
      {
        title: 'Chapter 2: Making of Pakistan (1857-1947)',
        keyConcepts: 'War of Independence 1857; All-India Muslim League 1906; Lucknow Pact 1916; Khilafat Movement 1919; Nehru Report 1928 vs Quaid 14 Points 1929; Lahore Resolution 23rd March 1940; Cripps Mission 1942; Cabinet Mission Plan 1946; 3rd June 1947 Partition Plan; Radcliffe Award injustices.'
      },
      {
        title: 'Chapter 3: Land and Environment of Pakistan',
        keyConcepts: 'Location, borders (India, Afghanistan, China, Iran, Arabian Sea) and strategic importance; Major physical features: Northern and Western Mountains, Plateaus, Indus Plains, Deserts, Coastline; Climate zones and monsoon system; River Indus river system; Environmental challenges: Salinity, Waterlogging, Deforestation, Pollution.'
      },
      {
        title: 'Chapter 4: Early History & Women Empowerment',
        keyConcepts: 'Early difficulties of Pakistan (Refugee influx, administrative setup, division of financial and military assets, Canal water dispute, princely states Kashmir, Junagadh, Hyderabad); Quaid-e-Azam role as Governor-General; Objectives Resolution 1949; Role of women in national development: Mohtarma Fatima Jinnah, Begum Rana Liaquat Ali Khan.'
      }
    ],
    tips: [
      'Write exact historical dates and years (e.g. 23rd March 1940, 3rd June 1947, 14th August 1947).',
      'In geography questions, sketch a neat outline map showing key mountain ranges and rivers.',
      'Organize long answers with clear headings and bulleted facts.'
    ]
  }
];

// ================= CLASS 10 =================
const CLASS_10_NOTES = [
  {
    filename: 'msns-class-10-physics-notes.pdf',
    title: 'Class 10 Physics: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Physics',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 60 | Practical: 15)',
    timeAllowed: '2 Hours 45 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '12 Compulsory MCQs (12 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 15 out of 24 Short Questions (Q2, Q3, Q4: 5/8 each = 30 Marks).' },
      { section: 'Section C: Long / Numerical Questions', details: 'Attempt 2 out of 3 Long Questions (Part a: Theory 5 Marks + Part b: Numerical 4 Marks = 18 Marks).' }
    ],
    chapters: [
      {
        title: 'Unit 10: Simple Harmonic Motion and Waves',
        keyConcepts: 'SHM conditions (a prop to -x), Mass-spring system, Simple Pendulum (T = 2*pi*sqrt(L/g)), Ball and bowl system, Wave motion, Mechanical vs Electromagnetic waves, Transverse vs Longitudinal waves, Wave equation (v = f*lambda), Ripple tank experiments (reflection, refraction, diffraction).'
      },
      {
        title: 'Unit 11: Sound',
        keyConcepts: 'Production and propagation of sound waves, Speed of sound in air (v ~ 343 m/s), Characteristics of sound (Loudness, Pitch, Quality/Timbre, Intensity), Decibel scale (Sound Level = 10 log(I/I0) dB), Echo, Audible frequency range (20 Hz to 20,000 Hz), Ultrasound applications in medicine and sonar.'
      },
      {
        title: 'Unit 12: Geometrical Optics',
        keyConcepts: 'Reflection of Light, Spherical Mirrors (Concave & Convex), Mirror Formula (1/f = 1/p + 1/q), Refraction of light, Snell Law (n = sin i / sin r), Total Internal Reflection (critical angle, optical fibers, periscope), Lenses (Convex & Concave), Lens formula, Defects of vision (Myopia vs Hypermetropia), Microscope and Telescope.'
      },
      {
        title: 'Unit 13: Electrostatics',
        keyConcepts: "Production of electric charges, Electrostatic induction, Gold Leaf Electroscope, Coulomb Law (F = k * q1*q2 / r^2, k = 9 x 10^9 Nm^2/C^2), Electric field and intensity (E = F/q), Electric potential (V = W/q), Capacitors (C = Q/V, Farad), Parallel and Series combinations of capacitors, Applications (photocopier, inkjet printer)."
      },
      {
        title: 'Unit 14: Current Electricity',
        keyConcepts: 'Electric current (I = Q/t, Ampere), Potential difference and EMF, Ohm Law (V = IR), Ohmic vs Non-Ohmic conductors, Factors affecting resistance (R = rho*L/A), Series and Parallel combination of resistors, Electric power (P = VI = I^2*R = V^2/R), Kilowatt-hour (1 kWh = 3.6 x 10^6 J), Safe use of electricity (Fuse, Breaker, Earth Wire).'
      },
      {
        title: 'Unit 15: Electromagnetism',
        keyConcepts: 'Magnetic effect of steady current (Right Hand Rule), Force on current conductor in magnetic field (F = ILB sin theta), Fleming Left-Hand Rule, DC Motor, Electromagnetic Induction (Faraday and Lenz Laws), Mutual Induction, AC Generator, Transformer (Vs/Vp = Ns/Np).'
      },
      {
        title: 'Unit 16: Basic Electronics',
        keyConcepts: 'Thermionic emission, Cathode Ray Oscilloscope (CRO components & uses), Analogue vs Digital electronics, Logic Gates: AND (Y = A.B), OR (Y = A+B), NOT (Y = A\'), NAND, NOR truth tables and symbols.'
      },
      {
        title: 'Unit 17: Information and Communication Technology (ICT)',
        keyConcepts: 'Components of CBIS (Hardware, Software, Data, Procedures, People), Transmission of light signals via optical fibers, Radio waves, Satellite communication, Internet, Email, Browsers, Data storage devices (Hard disk, Flash drive).'
      },
      {
        title: 'Unit 18: Atomic and Nuclear Physics',
        keyConcepts: 'Atom and Nucleus (Protons, Neutrons, Nucleons), Isotopes, Natural Radioactivity, Alpha, Beta, Gamma radiation properties, Nuclear Decay, Half-Life (N = N0 (1/2)^n), Nuclear Fission and Fusion reactions, Radiation hazards and safety.'
      }
    ],
    tips: [
      'In optics numericals, maintain sign convention strictly (concave mirror f is positive, convex f is negative; real images q is positive, virtual q is negative).',
      'Draw neat circuit diagrams showing correct voltmeter (parallel) and ammeter (series) connections.'
    ]
  },
  {
    filename: 'msns-class-10-chemistry-notes.pdf',
    title: 'Class 10 Chemistry: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Chemistry',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 60 | Practical: 15)',
    timeAllowed: '2 Hours 45 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '12 Compulsory MCQs (12 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 15 out of 24 Short Questions (Q2, Q3, Q4: 5/8 each = 30 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 2 out of 3 Long Questions (9 Marks each = 18 Marks).' }
    ],
    chapters: [
      {
        title: 'Chapter 9: Chemical Equilibrium',
        keyConcepts: 'Reversible vs Irreversible reactions, Dynamic equilibrium, Law of Mass Action (Kc = [products]/[reactants]), Units of Kc, Equilibrium constant importance (direction and extent of reaction).'
      },
      {
        title: 'Chapter 10: Acids, Bases and Salts',
        keyConcepts: 'Concepts of Acids & Bases: Arrhenius, Bronsted-Lowry (Conjugate acid-base pairs), Lewis (Electron pair donor/acceptor), Self-ionization of water (Kw = 1.0 x 10^-14 at 25 deg C), pH and pOH scale, Indicators, Salt preparation methods.'
      },
      {
        title: 'Chapter 11: Organic Chemistry',
        keyConcepts: 'Organic compounds definition, Vital Force Theory and Wohler synthesis of urea, Characteristics of organic compounds, Representation formulas (Molecular, Structural, Condensed, Dot & Cross), Functional Groups (Alcohol, Aldehyde, Ketone, Carboxylic acid, Ester, Amine), Isomerism.'
      },
      {
        title: 'Chapter 12: Hydrocarbons',
        keyConcepts: 'Alkanes (Saturated, Combustion, Halogenation substitution), Alkenes (Unsaturated, Dehydration of alcohols, Hydrogenation, Bromine water test), Alkynes (Unsaturated, Preparation of ethyne, Baeyer test, Acidity of alkynes).'
      },
      {
        title: 'Chapter 13: Biochemistry',
        keyConcepts: 'Carbohydrates (Monosaccharides, Oligosaccharides, Polysaccharides), Proteins (Amino acids, Peptide bond), Lipids (Fatty acids, Triglycerides), Nucleic Acids (DNA double helix model, RNA), Vitamins (Fat-soluble A, D, E, K vs Water-soluble B, C).'
      },
      {
        title: 'Chapter 14: Environmental Chemistry I: Atmosphere',
        keyConcepts: 'Layers of atmosphere (Troposphere, Stratosphere, Mesosphere, Thermosphere), Major Air Pollutants (CO, CO2, SO2, NOx), Greenhouse effect and Global Warming, Acid Rain formation and effects, Ozone depletion in Stratosphere by CFCs.'
      },
      {
        title: 'Chapter 15: Environmental Chemistry II: Water',
        keyConcepts: 'Properties of water, Soft vs Hard water, Causes of hardness (Calcium and Magnesium salts), Removing temporary (boiling, Clark method) and permanent hardness (washing soda, ion-exchange resin), Water pollution and waterborne diseases (Cholera, Typhoid, Hepatitis).'
      },
      {
        title: 'Chapter 16: Chemical Industries',
        keyConcepts: 'Basic metallurgical operations (Crushing, Concentration, Froth flotation, Roasting, Smelting, Bessemerization), Solvay Process for sodium carbonate (Flowsheet & reactions), Urea manufacture (Ammonia synthesis, Carbon dioxide reaction, Granulation), Petroleum refining fractions.'
      }
    ],
    tips: [
      'Write balanced chemical equations with state symbols for all Solvay process reactions and organic halogenations.',
      'Clearly define Bronsted-Lowry conjugate acid-base pairs with direct reaction examples.'
    ]
  },
  {
    filename: 'msns-class-10-biology-notes.pdf',
    title: 'Class 10 Biology: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Biology',
    group: 'Science Group',
    totalMarks: '75 Marks (Theory: 60 | Practical: 15)',
    timeAllowed: '2 Hours 45 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '12 Compulsory MCQs (12 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 15 out of 24 Short Questions (Q2, Q3, Q4: 5/8 each = 30 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 2 out of 3 Long Questions (9 Marks each = 18 Marks).' }
    ],
    chapters: [
      {
        title: 'Chapter 10: Gaseous Exchange',
        keyConcepts: 'Gaseous exchange in plants (Stomata, Lenticels), Human Respiratory System (Nasal cavity, Pharynx, Larynx, Trachea, Bronchi, Alveoli), Breathing mechanism (Inhalation vs Exhalation), Respiratory disorders: Bronchitis, Emphysema, Pneumonia, Asthma, Lung cancer, Smoking effects.'
      },
      {
        title: 'Chapter 11: Homeostasis',
        keyConcepts: 'Homeostasis in plants (Hydrophytes, Xerophytes, Halophytes), Human Urinary System (Kidney structure, Nephron anatomy: Bowman capsule, Glomerulus, Loop of Henle), Urine formation, Kidney disorders (Stones, Renal failure), Dialysis (Hemodialysis vs Peritoneal dialysis).'
      },
      {
        title: 'Chapter 12: Coordination and Control',
        keyConcepts: 'Nervous vs Chemical coordination, Components of coordinated action, Human Nervous System: Central (Brain, Spinal Cord) and Peripheral, Neurons (Sensory, Motor, Interneurons), Reflex Arc, Human Eye and Ear anatomy, Endocrine System: Pituitary, Thyroid, Adrenal, Pancreas.'
      },
      {
        title: 'Chapter 13: Support and Movement',
        keyConcepts: 'Human Skeleton (Axial: 80 bones vs Appendicular: 126 bones), Bone vs Cartilage, Joints (Ball and Socket, Hinge), Muscles: Skeletal, Smooth, Cardiac, Antagonism (Biceps & Triceps), Skeletal disorders (Osteoporosis, Arthritis).'
      },
      {
        title: 'Chapter 14: Reproduction',
        keyConcepts: 'Asexual Reproduction: Binary fission, Budding, Spore formation, Vegetative propagation, Sexual Reproduction in Plants: Flower structure, Pollination (Self vs Cross), Double Fertilization, Human Reproduction: Male & Female systems, AIDS.'
      },
      {
        title: 'Chapter 15: Inheritance',
        keyConcepts: 'Chromosomes and Genes, Watson-Crick model of DNA, DNA Replication, Mendel Laws: Law of Segregation, Law of Independent Assortment (Monohybrid vs Dihybrid cross), Incomplete Dominance and Co-dominance (ABO blood groups), Natural Selection.'
      },
      {
        title: 'Chapter 16: Man and His Environment',
        keyConcepts: 'Ecosystem components: Biotic (Producers, Consumers, Decomposers) and Abiotic, Food Chain and Food Web, Ecological Pyramids, Carbon and Nitrogen cycles, Symbiosis (Parasitism, Mutualism, Commensalism), Pollution and Conservation.'
      },
      {
        title: 'Chapter 17: Biotechnology',
        keyConcepts: 'Definition and scope, Fermentation (Alcoholic and Lactic acid), Fermenter types (Batch vs Continuous), Genetic Engineering: Steps in gene cloning (Restriction enzymes, Vector/Plasmid, Recombinant DNA), Applications: Human insulin, Interferon.'
      },
      {
        title: 'Chapter 18: Pharmacology',
        keyConcepts: 'Medicinal drugs vs Addictive drugs, Sources of drugs (Plants, Animals, Minerals, Microorganisms, Synthetic), Antibiotics (Penicillin, Cephalosporin), Antibiotic resistance, Sedatives, Narcotics, Hallucinogens.'
      }
    ],
    tips: [
      'Draw and label Nephron anatomy and Human Brain structures with sharp pencils and precise labels.',
      'Show clear Punnett Squares for Mendel monohybrid and dihybrid genetic crosses.'
    ]
  },
  {
    filename: 'msns-class-10-computer-science-notes.pdf',
    title: 'Class 10 Computer Science: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Computer Science',
    group: 'Computer Science Group',
    totalMarks: '75 Marks (Theory: 50 | Practical: 25)',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 12 out of 18 Short Questions (Q2, Q3, Q4: 4/6 each = 24 Marks).' },
      { section: 'Section C: Long Questions (Coding in C)', details: 'Attempt 2 out of 3 Long Questions (8 Marks each = 16 Marks). Includes writing complete C programs.' }
    ],
    chapters: [
      {
        title: 'Unit 1: Introduction to Programming',
        keyConcepts: 'Programming languages (Low-level vs High-level), Compiler vs Interpreter, Integrated Development Environment (IDE), Structure of a C program (#include <stdio.h>, main() function, body), Comments in C (// and /* */), Constants vs Variables, Rules for variable names, Data types: int, float, char.'
      },
      {
        title: 'Unit 2: User Interface (Input / Output in C)',
        keyConcepts: 'Standard input/output library, printf() function, Format specifiers (%d for int, %f for float, %c for char, %s for string), Escape sequences (\\n, \\t, \\\\), scanf() function and address-of operator (&), Statement terminator (;).'
      },
      {
        title: 'Unit 3: Conditional Logic',
        keyConcepts: 'Control statements, Sequential vs Selection structure, Relational Operators (<, <=, >, >=, ==, !=), Logical Operators (&&, ||, !), if statement, if-else statement, Nested if-else, switch statement (case, break, default).'
      },
      {
        title: 'Unit 4: Data Structures & Loops',
        keyConcepts: 'Types of loops in C: for loop (initialization, condition, increment/decrement), while loop, do-while loop, Nested loops, Infinite loops and prevention, Arrays definition, 1D array declaration, initialization, indexing (0 to n-1).'
      },
      {
        title: 'Unit 5: Functions',
        keyConcepts: 'Definition of Function, Benefits of modular programming (reusability, easier debugging), Built-in functions vs User-defined functions, Function Signature (Return type, function name, parameter list), Prototype, Function call, Passing arguments by value.'
      }
    ],
    tips: [
      'Write syntactically correct C code: always include header files, declare variable types, and terminate statements with semicolons.',
      'Double-check loop bounds and array index out-of-bounds errors in trace table exercises.'
    ]
  },
  {
    filename: 'msns-class-10-mathematics-notes.pdf',
    title: 'Class 10 Mathematics: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Mathematics (Science Group)',
    group: 'Science Group',
    totalMarks: '75 Marks',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '15 Compulsory MCQs (15 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 18 out of 27 Short Questions (Q2, Q3, Q4: 6/9 each = 36 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 3 out of 5 Long Questions (8 Marks each = 24 Marks). Question 9 (Circle Theorems from Ch 9 or Ch 12) is COMPULSORY.' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Quadratic Equations',
        keyConcepts: 'Standard form (ax^2 + bx + c = 0, a != 0), Pure quadratic (b = 0), Solution methods: 1. Factorization, 2. Completing the square, 3. Quadratic Formula (x = [-b +/- sqrt(b^2 - 4ac)] / 2a), Reducible equations (reciprocal, exponential, radical equations).'
      },
      {
        title: 'Chapter 2: Theory of Quadratic Equations',
        keyConcepts: 'Discriminant (b^2 - 4ac) and nature of roots (real, rational, irrational, imaginary), Cube roots of unity (1, omega, omega^2), Properties: 1 + omega + omega^2 = 0, omega^3 = 1, Sum (S = -b/a) and Product (P = c/a) of roots, Forming equation: x^2 - Sx + P = 0, Synthetic Division.'
      },
      {
        title: 'Chapter 3: Variations',
        keyConcepts: 'Ratio and Proportion, Direct Variation (y = kx), Inverse Variation (y = k/x), Joint Variation, Theorems: Invertendo, Alternando, Componendo, Dividendo, Componendo-Dividendo Theorem (a/b = c/d => (a+b)/(a-b) = (c+d)/(c-d)), K-method.'
      },
      {
        title: 'Chapter 4: Partial Fractions',
        keyConcepts: 'Proper vs Improper fractions, Resolution into partial fractions: Case I: Non-repeated linear factors, Case II: Repeated linear factors, Case III: Non-repeated irreducible quadratic factors.'
      },
      {
        title: 'Chapter 5: Sets and Functions',
        keyConcepts: 'Operations (Union, Intersection, Difference, Complement), De Morgan Laws: (A U B)\' = A\' int B\' and (A int B)\' = A\' U B\', Venn diagrams, Binary Relations, Domain and Range, Functions: Into, Onto, One-to-One, Bijective.'
      },
      {
        title: 'Chapter 6: Basic Statistics',
        keyConcepts: 'Frequency distribution, Measures of Central Tendency: Arithmetic Mean (Direct, Indirect methods), Geometric Mean, Harmonic Mean, Median, Mode, Measures of Dispersion: Range, Variance, Standard Deviation (S = sqrt[sum(x - mean)^2 / n]).'
      },
      {
        title: 'Chapter 7: Introduction to Trigonometry',
        keyConcepts: 'Measurement of angles (Degree/Minute/Second vs Radians: pi rad = 180 deg), Arc length (l = r*theta), Sector area (A = 1/2 * r^2 * theta), Trigonometric ratios (sin, cos, tan, csc, sec, cot), Fundamental identities: sin^2 theta + cos^2 theta = 1; 1 + tan^2 theta = sec^2 theta; 1 + cot^2 theta = csc^2 theta, Heights and distances (elevation & depression).'
      },
      {
        title: 'Chapter 9: Chords of a Circle (Theorems)',
        keyConcepts: 'Theorem 9.1: One and only one circle can pass through three non-collinear points. Theorem 9.2: A straight line drawn from the centre of a circle to bisect a chord is perpendicular to the chord. Theorem 9.4: Congruent chords of a circle are equidistant from the centre.'
      }
    ],
    tips: [
      'Question 9 Circle Theorem is COMPULSORY (8 marks): Always draw the circle with a compass, draw given chord with a ruler, and label center O.',
      'Show all calculation steps clearly when using Componendo-Dividendo theorem in variations.'
    ]
  },
  {
    filename: 'msns-class-10-english-notes.pdf',
    title: 'Class 10 English: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'English Compulsory',
    group: 'Compulsory for All Groups',
    totalMarks: '75 Marks',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '19 Compulsory MCQs (19 Marks): Verb forms (5), Spelling (4), Synonyms/Antonyms (5), Grammar (5).' },
      { section: 'Section B: Short Questions', details: 'Attempt 5 out of 8 comprehension questions from prose lessons (10 Marks).' },
      { section: 'Section C: Translation & Summary', details: 'Translate prose paragraph into Urdu (8 Marks). Write Summary of Poem ("Try Again" or "The Rain" or "Peace") (5 Marks).' },
      { section: 'Section D: Essay, Idioms & Translation', details: 'Write an Essay (150-200 words) on topics like "My Hobby", "A True Muslim", "Cricket Match" (15 Marks). Direct & Indirect Speech (5 Marks). Pair of Words (5 Marks). Translation from Urdu into English (8 Marks).' }
    ],
    chapters: [
      {
        title: 'High-Yield Prose Units',
        keyConcepts: 'Unit 1: Hazrat Muhammad (PBUH) an Embodiment of Justice - Justice for all, equality in Quraish woman case, justice between Jews; Unit 2: Chinese New Year - Customs, reunion dinner, red envelopes with money, zodiac animals; Unit 4: First Aid - Handling cuts, burns, bleeding, sterile dressings; Unit 6: Television vs Newspapers - Print vs electronic media, convenience and depth; Unit 7: Little by Little One Walks Far - Value of steady hard work.'
      },
      {
        title: 'Poetry Summaries',
        keyConcepts: 'Poem 1: "Try Again" by W. H. Hickson - Theme of persistence, overcoming failure, courage to strive again; Poem 2: "The Rain" by W. H. Davies - Upper leaves giving drop by drop to lower leaves, sun shining bright symbolizing hope; Poem 3: "Peace" by Dr. Hartmann - Wind as monster smashing all, yet gentle whisper at center bringing true peace.'
      },
      {
        title: 'English Essays & Direct/Indirect Speech',
        keyConcepts: 'Essay Topics: "A True Muslim", "My Last Day at School", "Sports and Games", "Courtesy", "Libraries", "A Rainy Day"; Direct and Indirect Speech conversion rules: Change of reporting verbs (said -> told/asked), Change of tenses, Change of pronouns (SON rule), Change of time/place adverbs.'
      }
    ],
    tips: [
      'Write essay in well-organized paragraphs (Introduction, 3 Body paragraphs, Quotations from Quaid/Iqbal/Bacon, Conclusion).',
      'Remember that universal truths do not change tense when converting from direct to indirect speech.'
    ]
  },
  {
    filename: 'msns-class-10-urdu-notes.pdf',
    title: 'Class 10 Urdu: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Urdu Compulsory',
    group: 'Compulsory for All Groups',
    totalMarks: '75 Marks',
    timeAllowed: '2 Hours 30 Minutes',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '15 Compulsory MCQs (15 Marks).' },
      { section: 'Section B: Poetry Explanation', details: 'Comprehensive explanation of couplets from Nazm and Ghazal with central themes (10 Marks).' },
      { section: 'Section C: Prose Paragraph Explanation', details: 'Explanation of 2 prose passages with context, author reference, and meanings of underlined words (10 Marks).' },
      { section: 'Section D: Lesson Summary & Short Questions', details: '5 short comprehension questions (10 Marks). Summary of 1 prescribed prose lesson (5 Marks).' },
      { section: 'Section E: Essay Writing & Comprehension', details: 'Detailed Essay on 1 out of 3 topics (15 Marks). Reading Comprehension passage with 5 questions (10 Marks).' }
    ],
    chapters: [
      {
        title: 'Core Prose Lessons',
        keyConcepts: 'Lesson 1: Mirza Muhammad Saeed by Shahid Ahmad Dehlavi - Academic modesty, literary contributions, passion for writing; Lesson 2: Nazria-e-Pakistan by Dr. Ghulam Mustafa Khan - Historical background, Islamic values, national unity; Lesson 3: Paristan ki Shehzadi by Ashraf Saboohi - Mir Sahib story, Syedani Bi craft; Lesson 4: Urdu Adab mein Eid-ul-Fitr by Dr. Waheed Qureshi - Poetic and literary traditions.'
      },
      {
        title: 'Nazm and Ghazal Section',
        keyConcepts: 'Nazm 1: Hamd by Hafeez Jalandhari - Creation through the word Kun; Nazm 2: Naat by Ehsan Danish - Helper and comforter of humanity; Nazm 3: Maidan-e-Karbala mein Subh ka Manzar by Mir Anis - Elegiac masterpiece stanzas; Ghazal 1: Hasrat Mohani (Bhulata lakh hoon lekin barabar yaad aate hain); Ghazal 2: Jigar Muradabadi (Aadmi aadmi se milta hai).'
      },
      {
        title: 'Key Examination Essays',
        keyConcepts: 'Essays: "Hubb-e-Watan" (Patriotism), "Mehnat ki Barkat" (Blessings of Hard Work), "Allama Iqbal", "Waqt ki Pabandi" (Punctuality), "Ilm ke Faide" (Benefits of Knowledge), "Aik Dilchasp Match" (An Exciting Match).'
      }
    ],
    tips: [
      'In Urdu essays, include relevant quotations and couplets centered on the page. Aim for 4 to 5 pages.',
      'In comprehension, write concise answers in your own words rather than copying whole sentences directly from the passage.'
    ]
  },
  {
    filename: 'msns-class-10-tarjuma-tul-quran-notes.pdf',
    title: 'Class 10 Tarjuma-tul-Quran: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Tarjuma-tul-Quran-ul-Majeed',
    group: 'Compulsory for All Groups',
    totalMarks: '50 Marks',
    timeAllowed: '2 Hours',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 5 out of 8 Short Questions (10 Marks).' },
      { section: 'Section C: Quranic Vocabulary Meanings', details: 'Meanings of 5 out of 8 selected Quranic Arabic words (5 Marks).' },
      { section: 'Section D: Verse Translation', details: 'Translate 3 out of 5 Quranic Ayat into fluent Urdu (15 Marks).' },
      { section: 'Section E: Comprehensive Surah Analysis', details: 'Write a comprehensive note on 1 out of 2 Surahs covering background, themes, and 5 practical life lessons (10 Marks).' }
    ],
    chapters: [
      {
        title: 'Prescribed Surahs & Background',
        keyConcepts: 'Surah Al-Qasas (Early life of Hazrat Musa, pride of Pharaoh, Qarun arrogance and sinking into earth); Surah Al-Ankabut (Spider web as metaphor for frail worldly reliance, patience through trials); Surah Ar-Rum (Prophecy of Roman victory, signs of divine power); Surah Luqman (Admonitions of Luqman to his son: avoid Shirk, establish prayer, enjoin good and forbid evil, walk with humility, lower voice); Surah Al-Ahzab (Battle of the Trench, etiquette of Ummahat-ul-Momineen, declaration of Khatam-un-Nabiyyin, obligation of sending Durood).'
      },
      {
        title: 'Core Quranic Vocabulary',
        keyConcepts: 'Taqarra Aynuha (Her eyes be cooled), Sarh (Palace/Paved floor), Fariheen (Exultant in arrogance), Wahnan ala wahn (Weakness upon weakness), Fisaaluhu (His weaning), Marahan (In insolence), Ghadheed (Low/Restrained), Khatam-un-Nabiyyin (Seal of the Prophets).'
      },
      {
        title: 'Wise Counsel of Hazrat Luqman',
        keyConcepts: '1. Shirk is indeed a grave injustice; 2. Dutifulness to parents who bore you through hardship; 3. Absolute accountability of even a mustard seed weight of action; 4. Regular establishment of prayer; 5. Enjoining right and forbidding wrong with steadfast patience; 6. Turning not your cheek to people with contempt nor walking insolently; 7. Moderation in pace and lowering one voice.'
      }
    ],
    tips: [
      'When translating verses from Surah Al-Ahzab, observe utmost reverence regarding the Holy Prophet (PBUH) and Ummahat-ul-Momineen.',
      'Present the counsel of Hazrat Luqman in clearly numbered bullet points in the answer sheet.'
    ]
  },
  {
    filename: 'msns-class-10-islamiat-notes.pdf',
    title: 'Class 10 Islamiat: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Islamiat Compulsory',
    group: 'Compulsory for All Groups',
    totalMarks: '50 Marks',
    timeAllowed: '2 Hours',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 8 out of 12 Short Questions (16 Marks).' },
      { section: 'Section C: Quranic Ayat Translation', details: 'Translate 2 out of 3 selected Quranic verses into fluent Urdu (8 Marks).' },
      { section: 'Section D: Hadith Translation & Explanation', details: 'Translate and explain 1 selected Hadith Nabawi (6 Marks).' },
      { section: 'Section E: Comprehensive Essay Question', details: 'Write a comprehensive, referenced essay on 1 out of 2 Islamic topics (10 Marks).' }
    ],
    chapters: [
      {
        title: 'Chapter 1: Quran Majeed & Sunnah of the Prophet (PBUH)',
        keyConcepts: 'Understanding and reflection upon Quranic guidance; Sunnah as primary explanatory source; Selected Ahadith: Jihad, Taqwa, standing for truth, moral purity.'
      },
      {
        title: 'Chapter 2: Islamic Beliefs & Worship',
        keyConcepts: 'Jihad fi Sabeelillah categories: Jihad bin-Nafs (against self), Jihad bil-Lisan (speech/preaching), Jihad bil-Maal (wealth), Jihad bis-Saif (defense); Conditions and ethics of warfare in Islam; Taqwa (God-consciousness) fruits; Steadfastness (Istiqaamah) and Sabr.'
      },
      {
        title: 'Chapter 3: Seerat-un-Nabi (PBUH)',
        keyConcepts: 'Treaty of Hudaibiyyah (Fath-um-Mubeen - manifest victory) causes and terms; Conquest of Makkah (Fath-e-Makkah) and general amnesty granted by the Holy Prophet (PBUH); The Farewell Pilgrimage (Khutba Hajjat-ul-Wida) - First Universal Charter of Human Rights: Sanctity of life and property, absolute equality of races, protection of women rights, abolition of usury (Riba).'
      },
      {
        title: 'Chapter 4: Islamic State & Citizens Rights',
        keyConcepts: 'Foundational features of an Islamic state; Responsibilities of rulers (Amanah and Shura); Rights of citizens (Muslims and non-Muslim minorities); Islamic system of justice and rule of law.'
      }
    ],
    tips: [
      'Detail the 6 major principles of Khutba Hajjat-ul-Wida in clear, bulleted sub-points.',
      'Support answers with direct references to authentic Hadith and Quranic concepts.'
    ]
  },
  {
    filename: 'msns-class-10-pakistan-studies-notes.pdf',
    title: 'Class 10 Pakistan Studies: Official Syllabus & High-Yield Examination Notes',
    grade: 'Class 10 (10th Matric)',
    subject: 'Pakistan Studies',
    group: 'Compulsory for All Groups',
    totalMarks: '50 Marks',
    timeAllowed: '2 Hours',
    blueprint: [
      { section: 'Section A: Objective (MCQs)', details: '10 Compulsory MCQs (10 Marks).' },
      { section: 'Section B: Short Questions', details: 'Attempt 12 out of 18 Short Questions (Q2: 6/9, Q3: 6/9 = 24 Marks).' },
      { section: 'Section C: Long Questions', details: 'Attempt 2 out of 3 Long Questions (8 Marks each = 16 Marks).' }
    ],
    chapters: [
      {
        title: 'Chapter 5: History of Pakistan II (1971 to Present)',
        keyConcepts: 'Zulfikar Ali Bhutto Era (1971-1977): 1973 Constitution features (Islamic, Federal, Parliamentary), Nationalization policy, Labor and educational reforms; General Zia-ul-Haq Era (1977-1988): Islamization steps (Hudood, Zakat & Ushr, Majlis-e-Shoora), Soviet-Afghan War; Democratic eras of Benazir Bhutto & Nawaz Sharif; General Pervez Musharraf Era (Devolution of Power Plan, 2002 Elections, privatization); 18th Constitutional Amendment and provincial autonomy.'
      },
      {
        title: 'Chapter 6: Pakistan in World Affairs (Foreign Policy)',
        keyConcepts: 'Objectives of Foreign Policy (National security, economic development, ideology, non-interference); Relations with neighbors: China (CPEC, friendship higher than Himalayas), India (Kashmir dispute, Indus Waters Treaty), Afghanistan, Iran; Pakistan & Islamic World (OIC role, Saudi Arabia, Turkey); Relations with Major Powers: USA, Russia, European Union; Pakistan role in United Nations (UN) peacekeeping.'
      },
      {
        title: 'Chapter 7: Economic Development of Pakistan',
        keyConcepts: 'Major sectors of economy: Agriculture (crops: wheat, cotton, rice, sugarcane; canal irrigation system, problems of farmers), Industries (Cottage, Small, Large-scale: Textile, Sugar, Cement, Fertilizer), Energy Resources (Hydel, Thermal, Nuclear, Solar, Wind; energy crisis solutions), International Trade (Exports: textiles, rice, surgical instruments; Imports: machinery, petroleum).'
      },
      {
        title: 'Chapter 8: Population, Society and Culture of Pakistan',
        keyConcepts: 'Demographics of Pakistan (Growth rate, urban vs rural distribution, census importance), Pakistani Culture characteristics (Islamic ethos, festivals Eid, Urs, crafts, dresses, foods), Regional languages (Punjabi, Sindhi, Pashto, Balochi, Saraiki), Educational structure and challenges, Health issues and facilities.'
      }
    ],
    tips: [
      'For the 1973 Constitution, clearly state its 10 main Islamic provisions (State religion Islam, President & PM must be Muslim, Quran & Sunnah supreme law).',
      'For Foreign Policy, highlight CPEC (China-Pakistan Economic Corridor) as a strategic game changer.'
    ]
  }
];

const ALL_NOTES = [...SUBJECT_NOTES_DATA, ...CLASS_10_NOTES];

async function generatePdf(noteData) {
  const pdfDoc = await PDFDocument.create();
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let logoImage = null;
  if (fs.existsSync(LOGO_PATH)) {
    try {
      const logoBytes = fs.readFileSync(LOGO_PATH);
      logoImage = await pdfDoc.embedPng(logoBytes);
    } catch (e) {
      // ignore
    }
  }

  // --- PAGE 1 ---
  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  // Decorative Border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderWidth: 1.5,
    borderColor: rgb(0.06, 0.45, 0.28), // Emerald
  });
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderWidth: 0.5,
    borderColor: rgb(0.75, 0.65, 0.35), // Gold Accent
  });

  // Top Header Banner
  page.drawRectangle({
    x: 25,
    y: height - 90,
    width: width - 50,
    height: 65,
    color: rgb(0.04, 0.38, 0.24), // Dark Emerald
  });

  // Draw Logo if exists
  if (logoImage) {
    page.drawImage(logoImage, {
      x: 35,
      y: height - 85,
      width: 55,
      height: 55,
    });
  }

  // Header Text
  page.drawText('M.S. NAZ HIGH SCHOOL', {
    x: 105,
    y: height - 48,
    size: 16,
    font: timesBold,
    color: rgb(1, 1, 1),
  });
  page.drawText('Excellence in Matriculation & Academic Leadership | Est. 1989 | BISE Gujranwala Code: 112199', {
    x: 105,
    y: height - 64,
    size: 8,
    font: helvetica,
    color: rgb(0.9, 0.95, 0.92),
  });
  page.drawText('Single National Curriculum (SNC) & PECTAA Standards Aligned - Session 2026-2027', {
    x: 105,
    y: height - 78,
    size: 7.5,
    font: helveticaBold,
    color: rgb(0.98, 0.85, 0.35),
  });

  let currentY = height - 110;

  // Title Box
  page.drawRectangle({
    x: 35,
    y: currentY - 32,
    width: width - 70,
    height: 36,
    color: rgb(0.94, 0.97, 0.95),
    borderColor: rgb(0.06, 0.45, 0.28),
    borderWidth: 1,
  });

  page.drawText(clean(`${noteData.grade.toUpperCase()} - ${noteData.subject.toUpperCase()}`), {
    x: 45,
    y: currentY - 14,
    size: 11,
    font: timesBold,
    color: rgb(0.06, 0.45, 0.28),
  });
  page.drawText(`Official Syllabus, Board Paper Scheme & High-Yield Examination Revision Notes`, {
    x: 45,
    y: currentY - 26,
    size: 8.5,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });

  currentY -= 48;

  // Metadata Grid
  page.drawText(clean(`Group: ${noteData.group}  |  Total Marks: ${noteData.totalMarks}  |  Time: ${noteData.timeAllowed}`), {
    x: 35,
    y: currentY,
    size: 8,
    font: helveticaBold,
    color: rgb(0.3, 0.3, 0.3),
  });

  currentY -= 18;

  // Section 1: Examination Blueprint & Scheme
  page.drawText('SECTION 1: BISE GUJRANWALA EXAMINATION BLUEPRINT & WEIGHTAGE', {
    x: 35,
    y: currentY,
    size: 9.5,
    font: timesBold,
    color: rgb(0.04, 0.38, 0.24),
  });
  currentY -= 6;
  page.drawLine({
    start: { x: 35, y: currentY },
    end: { x: width - 35, y: currentY },
    thickness: 1,
    color: rgb(0.75, 0.65, 0.35),
  });
  currentY -= 14;

  for (const bp of noteData.blueprint) {
    page.drawText(clean(`- ${bp.section}:`), {
      x: 40,
      y: currentY,
      size: 8,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 11;
    const words = clean(bp.details).split(' ');
    let line = '';
    for (const w of words) {
      if ((line + w).length > 95) {
        page.drawText(`    ${line}`, {
          x: 40,
          y: currentY,
          size: 7.5,
          font: helvetica,
          color: rgb(0.25, 0.25, 0.25),
        });
        currentY -= 10;
        line = '';
      }
      line += w + ' ';
    }
    if (line.length > 0) {
      page.drawText(`    ${line}`, {
        x: 40,
        y: currentY,
        size: 7.5,
        font: helvetica,
        color: rgb(0.25, 0.25, 0.25),
      });
      currentY -= 12;
    }
  }

  currentY -= 6;

  // Section 2: Chapter Core Concepts
  page.drawText('SECTION 2: CHAPTER-WISE HIGH-YIELD REVISION NOTES & CORE SLOs', {
    x: 35,
    y: currentY,
    size: 9.5,
    font: timesBold,
    color: rgb(0.04, 0.38, 0.24),
  });
  currentY -= 6;
  page.drawLine({
    start: { x: 35, y: currentY },
    end: { x: width - 35, y: currentY },
    thickness: 1,
    color: rgb(0.75, 0.65, 0.35),
  });
  currentY -= 14;

  let pageNum = 1;

  for (let i = 0; i < noteData.chapters.length; i++) {
    const ch = noteData.chapters[i];

    if (currentY < 120) {
      drawFooter(page, width, pageNum);
      page = pdfDoc.addPage([595.28, 841.89]);
      pageNum++;
      drawPageBorderAndHeader(page, width, height, noteData, pageNum);
      currentY = height - 85;
    }

    page.drawText(clean(`${ch.title}:`), {
      x: 40,
      y: currentY,
      size: 8.5,
      font: helveticaBold,
      color: rgb(0.06, 0.45, 0.28),
    });
    currentY -= 12;

    const words = clean(ch.keyConcepts).split(' ');
    let line = '';
    for (const w of words) {
      if ((line + w).length > 95) {
        if (currentY < 60) {
          drawFooter(page, width, pageNum);
          page = pdfDoc.addPage([595.28, 841.89]);
          pageNum++;
          drawPageBorderAndHeader(page, width, height, noteData, pageNum);
          currentY = height - 85;
        }
        page.drawText(`  ${line}`, {
          x: 40,
          y: currentY,
          size: 7.5,
          font: helvetica,
          color: rgb(0.2, 0.2, 0.2),
        });
        currentY -= 10;
        line = '';
      }
      line += w + ' ';
    }
    if (line.length > 0) {
      page.drawText(`  ${line}`, {
        x: 40,
        y: currentY,
        size: 7.5,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      });
      currentY -= 14;
    }
  }

  // Section 3: Exam Tips
  if (noteData.tips && noteData.tips.length > 0) {
    if (currentY < 140) {
      drawFooter(page, width, pageNum);
      page = pdfDoc.addPage([595.28, 841.89]);
      pageNum++;
      drawPageBorderAndHeader(page, width, height, noteData, pageNum);
      currentY = height - 85;
    }

    currentY -= 6;
    page.drawText('SECTION 3: MSNS SENIOR FACULTY BOARD EXAMINATION STRATEGY', {
      x: 35,
      y: currentY,
      size: 9.5,
      font: timesBold,
      color: rgb(0.04, 0.38, 0.24),
    });
    currentY -= 6;
    page.drawLine({
      start: { x: 35, y: currentY },
      end: { x: width - 35, y: currentY },
      thickness: 1,
      color: rgb(0.75, 0.65, 0.35),
    });
    currentY -= 14;

    for (const tip of noteData.tips) {
      page.drawText(clean(`* ${tip}`), {
        x: 40,
        y: currentY,
        size: 7.5,
        font: helveticaBold,
        color: rgb(0.15, 0.35, 0.2),
      });
      currentY -= 12;
    }
  }

  drawFooter(page, width, pageNum);

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(OUT_DIR, noteData.filename);
  fs.writeFileSync(targetPath, pdfBytes);
  console.log(`[+] Generated: ${noteData.filename} (${pdfBytes.length} bytes, ${pageNum} pages)`);
}

function drawFooter(page, width, pageNum) {
  page.drawLine({
    start: { x: 35, y: 45 },
    end: { x: width - 35, y: 45 },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });
  page.drawText('M.S. NAZ HIGH SCHOOL - Circular Road, Ghakhar Mandi, Gujranwala | Ph: 0300-6644023 | Web: https://msns.edu.pk', {
    x: 35,
    y: 33,
    size: 6.5,
    color: rgb(0.4, 0.4, 0.4),
  });
  page.drawText(`Page ${pageNum}`, {
    x: width - 70,
    y: 33,
    size: 7,
    color: rgb(0.3, 0.3, 0.3),
  });
}

function drawPageBorderAndHeader(page, width, height, noteData, pageNum) {
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderWidth: 1.5,
    borderColor: rgb(0.06, 0.45, 0.28),
  });
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderWidth: 0.5,
    borderColor: rgb(0.75, 0.65, 0.35),
  });

  page.drawRectangle({
    x: 25,
    y: height - 60,
    width: width - 50,
    height: 35,
    color: rgb(0.04, 0.38, 0.24),
  });
  page.drawText(clean(`M.S. NAZ HIGH SCHOOL - ${noteData.grade} ${noteData.subject} (SNC / PECTAA)`), {
    x: 35,
    y: height - 42,
    size: 9.5,
    color: rgb(1, 1, 1),
  });
  page.drawText('Official Matric Syllabus & High-Yield Examination Revision Notes', {
    x: 35,
    y: height - 54,
    size: 7.5,
    color: rgb(0.9, 0.95, 0.9),
  });
}

async function run() {
  console.log('Generating all 20 Matric Syllabuses and High-Yield Short Notes...');
  for (const n of ALL_NOTES) {
    await generatePdf(n);
  }
  console.log('All 20 Matric Syllabuses & Short Notes successfully generated!');
}

run().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
