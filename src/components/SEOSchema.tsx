// src/components/SEOSchema.tsx

export function SchoolSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['School', 'HighSchool', 'EducationalOrganization'],
    name: 'M.S. Naz High School®',
    url: 'https://www.msns.edu.pk',
    alternateName: ['MSNS', 'M.S. Naz High School', 'M.S. Naz High School® Wazirabad'],
    logo: 'https://lms.msns.edu.pk/api/images/gallery/about/Logo/1787988267420_247673.jpg',
    image: 'https://lms.msns.edu.pk/api/images/gallery/about/Logo/1787988267420_247673.jpg',
    description: 'Premier academic school in Wazirabad & Ghakhar, offering BISE Gujranwala matriculation, Oxford curriculum standards, modern science & practical AI labs since 2004.',
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
      'https://lms.msns.edu.pk',
    ],
    foundingDate: '2004',
    areaServed: ['Wazirabad', 'Ghakhar Mandi', 'Gujranwala', 'Rahwali', 'Alipur Chatha', 'Punjab'],
    educationalLevel: ['Primary Education', 'Secondary Education', 'High School'],
    curricula: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'BISE Gujranwala Matriculation',
        description: 'Recognized 9th and 10th grade Science & Computer Science certification',
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
      ratingValue: '4.8',
      reviewCount: '150',
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
      name: 'M.S. Naz High School®',
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
