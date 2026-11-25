import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Bus,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  HelpCircle,
  Compass,
} from "lucide-react";
import {
  LOCATIONS_DATA,
  getLocationBySlug,
  getAllLocationSlugs,
} from "~/data/locations";
import { BreadcrumbSchema, FAQSchema } from "~/components/SEOSchema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  // Generate unique, context-tailored title per location
  let title = `Leading School Serving ${location.name} (${location.urduName}) | Safe Commute`;
  if (location.slug === "ghakhar-mandi") {
    title = `Top School in Ghakhar Mandi (${location.urduName}) | G.T. Road Campus Admissions`;
  } else if (location.slug === "wazirabad") {
    title = `Top School Serving Wazirabad (${location.urduName}) | Van Commute & Admissions`;
  } else if (location.type === "City" || location.type === "Tehsil") {
    title = `High School for ${location.name} (${location.urduName}) Students | Oxford & Matric`;
  } else if (location.type === "Town") {
    title = `Best School for ${location.name} (${location.urduName}) | Admissions & Transport`;
  } else if (location.type === "Village") {
    title = `Quality Schooling for ${location.name} (${location.urduName}) | Bus Pickup Available`;
  }

  // Generate unique 140-158 character meta description from location-specific data
  let description = location.description;
  if (description.length > 158) {
    const cut = description.slice(0, 155);
    const lastSpace = cut.lastIndexOf(" ");
    let sliced = cut.slice(0, lastSpace);
    if (!sliced.endsWith(".")) sliced += ".";
    description = sliced;
  } else if (description.length < 140) {
    const suffix = " Admissions open at MSNS.";
    if ((description + suffix).length <= 160) {
      description = description.endsWith(".")
        ? description.slice(0, -1) + suffix
        : description + suffix;
    }
  }

  return {
    title,
    description,
    keywords: [
      `School in ${location.name}`,
      `Best high school near ${location.name}`,
      `High school transport ${location.name}`,
      `Matric school ${location.name}`,
      `Oxford school ${location.name}`,
      `M. S. Naz High School ${location.name}`,
      location.urduName,
    ],
    alternates: {
      canonical: `https://www.msns.edu.pk/locations/${location.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `https://www.msns.edu.pk/locations/${location.slug}`,
      siteName: "M. S. Naz High School®",
      type: "website",
      images: [
        {
          url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
          width: 1200,
          height: 630,
          alt: `M. S. Naz High School Serving ${location.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Localities", url: "https://www.msns.edu.pk/ghakhar" },
    {
      name: location.name,
      url: `https://www.msns.edu.pk/locations/${location.slug}`,
    },
  ];

  // Surrounding / nearby locations (excluding current)
  const nearbyLocations = LOCATIONS_DATA.filter(
    (l) => l.slug !== location.slug,
  ).slice(0, 8);

  const schoolLdJson = {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization", "LocalBusiness"],
    "@id": `https://www.msns.edu.pk/locations/${location.slug}#school`,
    name: "M. S. Naz High School®",
    url: "https://www.msns.edu.pk",
    logo: "https://www.msns.edu.pk/api/images/logos/Official_LOGO_grn_ic9ldd.png",
    image:
      "https://www.msns.edu.pk/api/images/logos/Official_LOGO_grn_ic9ldd.png",
    slogan:
      "#1 Top-Ranked High School in Ghakhar Mandi & Wazirabad | 100% Board Pass Rate",
    award: [
      `#1 Top-Ranked School Serving ${location.name}`,
      "100% Matriculation Board Pass Rate (BISE Gujranwala Code 112199)",
      "Oxford University Press Academic Partnership",
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "BISE Gujranwala Affiliation Code",
        value: "112199",
      },
    ],
    description: `Officially recognized #1 top-ranked academic school serving families in ${location.name} (${location.urduName}) and Tehsil Wazirabad/Gujranwala. Oxford curriculum standards, BISE Gujranwala matric distinctions (Code 112199), and reliable door-to-school transport.`,
    telephone: ["+92-318-7625415", "+92-301-6233609"],
    email: "info@msns.edu.pk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "G.T. Road, Opposite Model Police Station",
      addressLocality: "Ghakhar Mandi",
      addressRegion: "Punjab",
      postalCode: "52200",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.2818,
      longitude: 74.1481,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location.name,
      alternateName: location.urduName,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:30",
        closes: "14:00",
      },
    ],
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema items={location.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolLdJson) }}
      />

      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="mb-6 flex items-center gap-2 text-xs text-slate-500"
          >
            <Link href="/" className="transition-colors hover:text-emerald-700">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/ghakhar"
              className="transition-colors hover:text-emerald-700"
            >
              Localities
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">
              {location.name}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/90 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase shadow-2xs">
              <MapPin className="h-3.5 w-3.5 text-emerald-700" />
              <span>Serving {location.name}</span>
              <span className="rounded-md bg-emerald-200/60 px-1.5 py-0.5 font-serif text-[11px] text-emerald-950">
                {location.urduName}
              </span>
            </div>

            <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-slate-900 md:text-5xl">
              Premier Oxford &amp; Matric Education for{" "}
              <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                {location.name}
              </span>
            </h1>

            <p className="mb-6 text-base leading-relaxed text-slate-600 md:text-lg">
              {location.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>{location.commuteTimeMinutes} mins commute</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700">
                <Compass className="h-3.5 w-3.5 text-teal-600" />
                <span>{location.distanceKm} km from campus</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <Bus className="h-3.5 w-3.5 text-emerald-600" />
                <span>Dedicated Van Fleet</span>
              </div>
            </div>
          </div>

          {/* Transport & Commute Card */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-2xs">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Dedicated {location.name} Transport
                    </h2>
                    <p className="text-xs text-slate-500">
                      Punctual daily door-to-school service
                    </p>
                  </div>
                </div>

                <p className="mb-6 text-xs leading-relaxed text-slate-600">
                  {location.transportRoute}. Our fleet is monitored with
                  certified adult conductors and verified schedules, ensuring
                  students arrive safely and comfortably.
                </p>

                <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Key Pickup &amp; Stop Points
                </h3>
                <div className="mb-6 space-y-2">
                  {location.pickupPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs font-medium text-slate-800"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                <span className="font-medium text-slate-500">
                  Transport Desk: 0318-7625415
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Verify Your Stop <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Academic Highlights */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-2xs">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Why {location.name} Families Choose MSNS
                    </h2>
                    <p className="text-xs text-slate-500">
                      Excellence in ethics, academia &amp; technology
                    </p>
                  </div>
                </div>

                <p className="mb-6 text-xs leading-relaxed text-slate-600">
                  Students from {location.name} benefit from our 22+ year
                  institutional heritage, achieving 100% board pass rates,
                  mastering bilingual English/Urdu communication, and building
                  disciplined leadership habits.
                </p>

                <div className="mb-6 space-y-3">
                  {location.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-500">
                  Admissions Desk Open: Mon – Sat
                </span>
                <Link
                  href="/admission/apply"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800"
                >
                  Apply Online <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Academic Wings Overview */}
          <div className="mb-16">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Curricular Programs Available for {location.name}
              </h2>
              <p className="text-xs text-slate-600 md:text-sm">
                From Montessori sensory learning to BISE Gujranwala
                Matriculation board distinctions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-200">
                <span className="mb-3 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                  Early Childhood
                </span>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  Playgroup &amp; Kindergarten
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Activity-based Montessori sensory development with Oxford
                  Early Years phonics.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-200">
                <span className="mb-3 inline-block rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-teal-700 uppercase">
                  Primary Wing
                </span>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  Grades 1 to 5
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Oxford curriculum standards, English fluency workshops, and
                  foundational mathematics.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-200">
                <span className="mb-3 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase">
                  Middle Wing
                </span>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  Grades 6 to 8
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Preparatory science bridge, hands-on computer coding, and
                  public speaking clubs.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-200">
                <span className="mb-3 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                  Matriculation
                </span>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                  BISE Grades 9 &amp; 10
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Biology &amp; Computer Science groups with daily practical
                  labs and 3-phase revision tests.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mb-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs md:p-10">
            <div className="mb-8 max-w-2xl">
              <span className="mb-1 block text-xs font-bold tracking-wider text-emerald-600 uppercase">
                Local Admissions &amp; Inquiries
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions — {location.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {location.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >
                  <h4 className="mb-2 flex items-start gap-2 text-xs font-bold text-slate-900 md:text-sm">
                    <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {faq.question}
                  </h4>
                  <p className="pl-6 text-xs leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Surrounding Localities Navigation */}
          <div className="mb-16 rounded-3xl border border-slate-200/90 bg-slate-100/80 p-8">
            <div className="mb-6 max-w-2xl">
              <h3 className="mb-1 text-lg font-bold text-slate-900">
                Explore Other Localities &amp; Feeder Towns Served by MSNS
              </h3>
              <p className="text-xs text-slate-600">
                Our transit network connects 34+ towns and rural hubs across
                Tehsil Wazirabad and Gujranwala district:
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {nearbyLocations.map((nl) => (
                <Link
                  key={nl.slug}
                  href={`/locations/${nl.slug}`}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span>{nl.name}</span>
                  <span className="font-serif text-[10px] text-slate-400">
                    ({nl.urduName})
                  </span>
                </Link>
              ))}
              <Link
                href="/ghakhar"
                className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-800"
              >
                View All 34 Locations <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Location CTA Banner */}
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-emerald-900/50 bg-linear-to-r from-emerald-950 via-slate-900 to-teal-950 p-8 text-white shadow-xl md:flex-row md:p-12">
            <div className="max-w-xl">
              <span className="mb-2 block text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Enroll Today
              </span>
              <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                Join M. S. Naz High School from {location.name}
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-slate-300 md:text-sm">
                Give your child the advantage of Oxford quality instruction,
                100% solar reliability, and guaranteed board matric distinction
                coaching. School transport seats are reserved on a first-come
                basis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admission/apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-emerald-400"
                >
                  Apply for Admission <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/downloads"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold text-white transition-all hover:bg-white/20"
                >
                  Download Prospectus &amp; Forms
                </Link>
              </div>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 text-center md:text-left">
              <span className="mb-1 block text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
                Direct Helpline
              </span>
              <div className="mb-2 text-xl font-bold text-white">
                +92 318 7625415
              </div>
              <p className="mb-3 text-[11px] text-slate-400">
                Mon – Sat (7:30 AM – 2:00 PM)
              </p>
              <a
                href="tel:+923187625415"
                className="inline-block w-full rounded-lg border border-emerald-500/30 bg-emerald-600/30 py-2 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-600/50"
              >
                Call Admissions Desk
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
