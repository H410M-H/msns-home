'use client'

export function SchoolSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HighSchool',
    name: 'M.S. Naz High School®',
    url: 'https://msns.edu.pk',
    logo: 'https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267533/Official_LOGO_grn_ic9ldd.png',
    description: 'Premier high school in Pakistan offering educational excellence, leadership development, and modern education standards since 2004.',
    telephone: '+92-300-XXXXXXX',
    email: 'info@msns.edu.pk',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M.S. Naz High School',
      addressLocality: 'Wazirabad',
      addressRegion: 'Punjab',
      postalCode: '51700',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://www.facebook.com/msnazhighschool',
      'https://www.instagram.com/msnazhighschool',
      'https://twitter.com/msnazhighschool',
    ],
    foundingDate: '2004',
    areaServed: ['Wazirabad', 'Gujranwala', 'Sialkot', 'Lahore', 'Punjab', 'Pakistan'],
    educationalLevel: 'Secondary Education',
    curricula: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Science Labs',
        description: 'Advanced science programs with modern laboratory facilities',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AI Curriculum',
        description: 'Artificial Intelligence and technology-focused education',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Oxford Partnership',
        description: 'Academic excellence with Oxford-aligned curriculum',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Leadership Development',
        description: 'Comprehensive leadership and character development programs',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
}

export function AggregateOfferSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    priceCurrency: 'PKR',
    offers: [
      {
        '@type': 'Offer',
        name: 'Academic Programs',
        description: 'Comprehensive academic programs with modern curriculum',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
}
