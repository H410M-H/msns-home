// src/components/SEOSchema.tsx
import { MATRIC_TEXTBOOKS } from "~/data/matric-textbooks";

export function SchoolSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['School', 'HighSchool', 'EducationalOrganization'],
    '@id': 'https://www.msns.edu.pk/#school',
    name: 'M. S. Naz High School®',
    legalName: 'M. S. Naz High School',
    url: 'https://www.msns.edu.pk',
    alternateName: [
      'MSNS',
      'M.S. Naz High School',
      'M. S. Naz High School® Wazirabad',
      'MS Naz High School Ghakhar',
      'M. S. Naz High School Ghakhar Mandi',
    ],
    slogan: '#1 Top-Ranked High School in Ghakhar Mandi & Wazirabad | 100% Board Pass Rate',
    award: [
      '#1 Top-Ranked High School in Ghakhar Mandi, Wazirabad & Gujranwala District',
      '100% Matriculation Board Pass Rate (BISE Gujranwala Code 112199)',
      'Oxford University Press Certified Academic Standards',
      'Best STEM & Artificial Intelligence School in Northern Gujranwala',
      'Distinction in Secondary School Certificate (SSC) Examinations',
    ],
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'BISE Gujranwala Affiliation Code',
        value: '112199',
      },
      {
        '@type': 'PropertyValue',
        name: 'PEPRIS Registration',
        value: 'Punjab Education Sector Reform Programme Registered',
      },
    ],
    logo: 'https://www.msns.edu.pk/api/images/logos/Official_LOGO_grn_ic9ldd.png',
    image: 'https://www.msns.edu.pk/api/images/logos/Official_LOGO_grn_ic9ldd.png',
    description:
      'M. S. Naz High School® is the officially recognized #1 top-ranked school in Ghakhar Mandi, Wazirabad, and District Gujranwala, offering BISE Gujranwala matriculation (Code 112199), Oxford curriculum standards, modern science & practical AI labs, and proprietary 15 TB cloud LMS ecosystem since 2004.',
    telephone: ['+92-318-7625415', '+92-301-6233609'],
    email: 'info@msns.edu.pk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'G.T. Road, Opposite Model Police Station',
      addressLocality: 'Ghakhar Mandi',
      addressRegion: 'Punjab',
      postalCode: '52200',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.2818,
      longitude: 74.1481,
    },
    hasMap: 'https://maps.google.com/?q=32.2818,74.1481',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:30',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/msnazhighschool',
      'https://www.instagram.com/msnazhighschool',
      'https://twitter.com/msnazhighschool',
      'https://www.youtube.com/@msns-edu-pk',
      'https://lms.msns.edu.pk',
    ],
    foundingDate: '2004',
    founder: {
      '@type': 'Person',
      name: 'Haji Muhammad Siddique Naz (Late)',
    },
    knowsAbout: [
      'BISE Gujranwala Matriculation Examination (Code 112199)',
      'Oxford University Press Curriculum',
      'Secondary Education in Wazirabad and Ghakhar Mandi',
      'Practical Artificial Intelligence Curriculum',
      'STEM Laboratory Education (Physics, Chemistry, Biology)',
      'Digital Learning Management Systems (15 TB Cloud Ecosystem)',
      'Matric Textbooks & Notes Downloads',
      'Single National Curriculum (SNC) of Pakistan',
    ],
    subjectOf: {
      '@type': 'WebApplication',
      '@id': 'https://lms.msns.edu.pk/#app',
      name: 'MSNS-LMS Portal',
      url: 'https://lms.msns.edu.pk',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      description:
        'Official 15 TB cloud Learning Management System and Parent Portal of M. S. Naz High School.',
    },
    areaServed: [
      'Ghakhar Mandi',
      'Wazirabad',
      'Gujranwala',
      'Rahwali',
      'Alipur Chatha',
      'Sohdra',
      'Nizamabad',
      'Kot Inayat Khan',
      'Kotli Pir Ahmed Shah',
      'Punjab',
    ],
    educationalLevel: [
      'Pre-School & Kindergarten',
      'Primary Education',
      'Middle School',
      'Secondary Education',
      'High School (Matriculation Grades 9 & 10)',
    ],
    curricula: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'BISE Gujranwala Matriculation (Affiliation Code 112199)',
        description: 'Recognized 9th and 10th grade Science & Computer Science certification with 100% pass rate',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Oxford Academic Partnership',
        description: 'Oxford University Press aligned curriculum from Early Years to Middle School',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Practical AI & STEM Education',
        description: 'Hands-on practical AI, computer science, and modern science laboratory curriculum',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ items }: { items: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseSchema({
  name,
  description,
  educationalLevel,
}: {
  name: string;
  description: string;
  educationalLevel: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'School',
      name: 'M. S. Naz High School®',
      sameAs: 'https://www.msns.edu.pk',
    },
    educationalLevel,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LearningResourceSchema({
  name,
  description,
  url,
  learningResourceType,
  educationalLevel,
}: {
  name: string;
  description: string;
  url: string;
  learningResourceType: string;
  educationalLevel: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    url,
    learningResourceType,
    educationalLevel,
    provider: {
      '@type': 'School',
      name: 'M. S. Naz High School®',
      url: 'https://www.msns.edu.pk',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LMSApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://lms.msns.edu.pk/#app',
    name: 'MSNS-LMS Portal',
    url: 'https://lms.msns.edu.pk',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web, Android (APK / PWA)',
    description:
      'Enterprise 15 TB Learning Management System & Parent Portal for M. S. Naz High School. Offers real-time student attendance notifications, digital homework diaries, marks card publishing, and fee challan tracking.',
    author: {
      '@type': 'EducationalOrganization',
      '@id': 'https://www.msns.edu.pk/#school',
      name: 'M. S. Naz High School®',
      url: 'https://www.msns.edu.pk',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR',
      description: 'Included for all enrolled students, parents, and faculty of M. S. Naz High School.',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Dedicated comprehensive Schema.org Graph for the Downloads Center (/downloads)
 * Includes: School, EducationalOrganization, AggregateRating, CollectionPage, Book, LearningResource, FAQPage
 */
export function MatricDownloadsSchema({ faqs }: { faqs?: Array<{ question: string; answer: string }> }) {
  const baseUrl = "https://www.msns.edu.pk";

  // Official Institutional Publications
  const officialDocuments = [
    {
      name: "M. S. Naz High School Official Prospectus 2026–2027",
      description: "Official comprehensive 36-page institutional prospectus featuring 23 authentic campus photographs, Oxford curriculum, matric science streams, fee schedules, and admission guidelines.",
      url: `${baseUrl}/api/documents/msns-prospectus-2026-2027.pdf`,
      learningResourceType: "School Prospectus",
      numberOfPages: 36,
    },
    {
      name: "Official Offline Admission Registration Form (2026–2027)",
      description: "Printable 2-page walk-in admission application form with guardian undertakings, document checklists, and medical emergency authorizations.",
      url: `${baseUrl}/api/documents/msns-offline-admission-form-2026-2027.pdf`,
      learningResourceType: "Application Form",
      numberOfPages: 2,
    },
    {
      name: "Annual Academic Calendar 2026–2027",
      description: "Term timetables, first/mid/final exam dates, gazetted public holidays, winter and summer vacations, sports galas, and parent-teacher conferences.",
      url: `${baseUrl}/api/documents/msns-academic-calendar-2026-2027.pdf`,
      learningResourceType: "Academic Calendar",
    },
    {
      name: "Matriculation Scheme of Studies (BISE Gujranwala)",
      description: "Detailed subject breakdown for 9th and 10th Science & Computer Science groups under BISE Gujranwala board guidelines and practical marks distribution.",
      url: `${baseUrl}/api/documents/msns-matriculation-scheme-of-studies.pdf`,
      learningResourceType: "Curriculum Blueprint",
    },
    {
      name: "Tuition Fee Policy & Challan Payment Guide",
      description: "Official schedule of monthly tuition fees, admission charges, sibling concession criteria, late fine policies, and online fee challan instructions.",
      url: `${baseUrl}/api/documents/msns-tuition-fee-policy-and-challan-guide.pdf`,
      learningResourceType: "Fee Schedule",
    },
    {
      name: "Student Code of Conduct & Visual Uniform Rules",
      description: "Institutional discipline policy: 85% attendance prerequisite, summer/winter uniform codes, lab safety guidelines, and student leadership uniform guidelines.",
      url: `${baseUrl}/api/documents/msns-code-of-conduct-and-uniform-rules.pdf`,
      learningResourceType: "Policy Guide",
    },
    {
      name: "BISE Gujranwala Matric Resource & Exam Guide",
      description: "Consolidated guide to BISE Gujranwala SLO model papers, 5-year past paper archives, 1200 marks grading scheme, and PCTB official textbook download portals.",
      url: `${baseUrl}/api/documents/msns-bise-matric-resource-guide.pdf`,
      learningResourceType: "Exam Guide",
    },
  ];

  // Map the 20 textbooks as Schema.org Books and LearningResources
  const textbookEntities = MATRIC_TEXTBOOKS.map((book) => ({
    '@type': ['Book', 'LearningResource'],
    '@id': `${baseUrl}${book.downloadUrl}`,
    name: `${book.grade} ${book.subject} Textbook (Punjab Board PCTB)`,
    alternateName: `${book.urduSubject} (${book.grade})`,
    author: {
      '@type': 'EducationalOrganization',
      name: book.publisher,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: book.publisher,
    },
    bookFormat: 'https://schema.org/EBook',
    encodingFormat: 'application/pdf',
    inLanguage: book.medium.includes('Urdu') && book.medium.includes('English') ? ['en', 'ur'] : book.medium.includes('Urdu') ? 'ur' : 'en',
    url: `${baseUrl}${book.downloadUrl}`,
    description: book.description,
    educationalLevel: `${book.grade} Matriculation (BISE Gujranwala)`,
    learningResourceType: 'Textbook',
    about: book.keyChapters.join(', '),
    isAccessibleForFree: true,
    provider: {
      '@type': 'School',
      '@id': `${baseUrl}/#school`,
      name: 'M. S. Naz High School®',
      url: baseUrl,
    },
  }));

  // Map the 20 notes as LearningResources
  const notesEntities = MATRIC_TEXTBOOKS.map((book) => ({
    '@type': 'LearningResource',
    '@id': `${baseUrl}${book.notesDownloadUrl}`,
    name: `${book.grade} ${book.subject} Revision Notes & Syllabus Blueprint`,
    alternateName: `${book.urduSubject} نوٹس`,
    creator: {
      '@type': 'School',
      '@id': `${baseUrl}/#school`,
      name: 'M. S. Naz High School® Faculty',
      url: baseUrl,
    },
    learningResourceType: 'Revision Notes & Exam Blueprint',
    educationalLevel: `${book.grade} Matriculation (BISE Gujranwala)`,
    encodingFormat: 'application/pdf',
    url: `${baseUrl}${book.notesDownloadUrl}`,
    description: `High-yield revision notes, key formulas, chapter breakdowns, and SLO exam tips for ${book.grade} ${book.subject} prepared by senior subject mentors at M. S. Naz High School.`,
    isAccessibleForFree: true,
  }));

  // Institutional docs entities
  const docEntities = officialDocuments.map((doc) => ({
    '@type': 'LearningResource',
    '@id': doc.url,
    name: doc.name,
    description: doc.description,
    url: doc.url,
    learningResourceType: doc.learningResourceType,
    encodingFormat: 'application/pdf',
    isAccessibleForFree: true,
    provider: {
      '@type': 'School',
      '@id': `${baseUrl}/#school`,
      name: 'M. S. Naz High School®',
      url: baseUrl,
    },
  }));

  const graph: unknown[] = [
    // 1. School & Educational Organization
    {
      '@type': ['School', 'EducationalOrganization'],
      '@id': `${baseUrl}/#school`,
      name: 'M. S. Naz High School®',
      url: baseUrl,
      slogan: '#1 Top-Ranked High School in Ghakhar Mandi & Wazirabad',
      award: [
        '#1 Top-Ranked High School in Ghakhar Mandi, Wazirabad & Gujranwala District',
        '100% Matriculation Board Pass Rate (BISE Gujranwala Code 112199)',
      ],
      identifier: [
        {
          '@type': 'PropertyValue',
          name: 'BISE Gujranwala Affiliation Code',
          value: '112199',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '250',
        bestRating: '5',
        worstRating: '1',
      },
    },
    // 2. Collection Page
    {
      '@type': 'CollectionPage',
      '@id': `${baseUrl}/downloads#page`,
      url: `${baseUrl}/downloads`,
      name: 'Official Downloads & Matric Academic Portal | M. S. Naz High School®',
      description: 'Download official M. S. Naz High School documents: 36-page 2026-2027 Prospectus, Admission Forms, Fee Schedules, Academic Calendars, plus BISE Gujranwala Matric model papers, past papers, 20 PCTB textbooks, and pairing schemes.',
      publisher: {
        '@id': `${baseUrl}/#school`,
      },
      hasPart: [
        ...docEntities.map((d) => ({ '@id': d['@id'] })),
        ...textbookEntities.map((t) => ({ '@id': t['@id'] })),
        ...notesEntities.map((n) => ({ '@id': n['@id'] })),
      ],
    },
    ...docEntities,
    ...textbookEntities,
    ...notesEntities,
  ];

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${baseUrl}/downloads#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Dedicated comprehensive Schema.org Graph for the Academic Resources Center (/resources)
 * Includes: School, EducationalOrganization, AggregateRating, Course, LearningResource, FAQPage
 */
export function MatricResourcesSchema({ faqs }: { faqs?: Array<{ question: string; answer: string }> }) {
  const baseUrl = "https://www.msns.edu.pk";

  const courses = [
    {
      '@type': 'Course',
      '@id': `${baseUrl}/resources#course-matric-science`,
      name: 'Secondary School Certificate (SSC) Science Group — Class 9 & 10',
      courseCode: 'SSC-SCI-BISE-112199',
      description: 'Comprehensive two-year secondary matriculation curriculum affiliated with BISE Gujranwala (Code 112199) covering Physics, Chemistry, Biology, Mathematics (Science), English, Urdu, Islamiat, Tarjuma-tul-Quran, and Pakistan Studies.',
      educationalLevel: 'High School / Secondary Education (Grades 9 & 10)',
      provider: {
        '@type': 'School',
        '@id': `${baseUrl}/#school`,
        name: 'M. S. Naz High School®',
        url: baseUrl,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Blended (Classroom Instruction + Laboratory Practicals + Naz LMS Digital Access)',
        instructor: {
          '@type': 'Organization',
          name: 'Senior Science Faculty at M. S. Naz High School®',
        },
      },
    },
    {
      '@type': 'Course',
      '@id': `${baseUrl}/resources#course-matric-cs`,
      name: 'Secondary School Certificate (SSC) Computer Science Group — Class 9 & 10',
      courseCode: 'SSC-CS-BISE-112199',
      description: 'Two-year matriculation computer science curriculum affiliated with BISE Gujranwala (Code 112199) covering C Language Programming, Computer Networks, Binary Systems, Cyber Security, HTML Web Design, Physics, Chemistry, and Mathematics.',
      educationalLevel: 'High School / Secondary Education (Grades 9 & 10)',
      provider: {
        '@type': 'School',
        '@id': `${baseUrl}/#school`,
        name: 'M. S. Naz High School®',
        url: baseUrl,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Blended (Classroom Instruction + Practical Computer Lab + Naz LMS Digital Access)',
        instructor: {
          '@type': 'Organization',
          name: 'Senior Computer Science & IT Mentors at M. S. Naz High School®',
        },
      },
    },
  ];

  const learningResources = [
    {
      '@type': 'LearningResource',
      '@id': `${baseUrl}/resources#pairing-schemes`,
      name: 'BISE Gujranwala 1200-Marks Assessment & Pairing Schemes',
      description: 'Official marks distribution across 9th and 10th grades: 550 theory + 50 Tarjuma-tul-Quran per year, plus board practical exams in Class 10.',
      url: `${baseUrl}/resources#pairing-schemes`,
      learningResourceType: 'Assessment Scheme',
      educationalLevel: 'Matriculation Grade 9 & 10',
    },
    {
      '@type': 'LearningResource',
      '@id': `${baseUrl}/resources#slo-pattern`,
      name: 'Student Learning Outcomes (SLO) Examination Framework',
      description: 'Punjab Examination Commission and BISE Gujranwala cognitive distribution: 50% Knowledge, 35% Understanding, and 15% Application/Synthesis.',
      url: `${baseUrl}/resources#slo-pattern`,
      learningResourceType: 'Curriculum Framework',
      educationalLevel: 'Matriculation Grade 9 & 10',
    },
    {
      '@type': 'LearningResource',
      '@id': `${baseUrl}/resources#past-papers`,
      name: '5-Year BISE Gujranwala Past Papers Solved Archive (2020–2025)',
      description: 'Morning and Evening shift objective MCQs and subjective questions solved by MSNS faculty.',
      url: `${baseUrl}/api/documents/msns-bise-matric-resource-guide.pdf`,
      learningResourceType: 'Past Papers Archive',
      educationalLevel: 'Matriculation Grade 9 & 10',
    },
    {
      '@type': 'LearningResource',
      '@id': `${baseUrl}/resources#exam-strategy`,
      name: 'MSNS 1000+ Marks Board Examination Blueprint',
      description: 'Three-phase test series, paper presentation rubrics with cut-markers, and laboratory practical rehearsals.',
      url: `${baseUrl}/resources#exam-strategy`,
      learningResourceType: 'Study Strategy',
      educationalLevel: 'Matriculation Grade 9 & 10',
    },
  ];

  const graph: unknown[] = [
    {
      '@type': ['School', 'EducationalOrganization'],
      '@id': `${baseUrl}/#school`,
      name: 'M. S. Naz High School®',
      url: baseUrl,
      slogan: '#1 Top-Ranked High School in Ghakhar Mandi & Wazirabad | 100% Board Pass Rate',
      award: [
        '#1 Top-Ranked High School in Ghakhar Mandi, Wazirabad & Gujranwala District',
        '100% Matriculation Board Pass Rate (BISE Gujranwala Code 112199)',
      ],
      identifier: [
        {
          '@type': 'PropertyValue',
          name: 'BISE Gujranwala Affiliation Code',
          value: '112199',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '250',
        bestRating: '5',
        worstRating: '1',
      },
    },
    ...courses,
    ...learningResources,
  ];

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${baseUrl}/resources#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
