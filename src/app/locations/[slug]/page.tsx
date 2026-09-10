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
  Compass
} from "lucide-react";
import { 
  LOCATIONS_DATA, 
  getLocationBySlug, 
  getAllLocationSlugs 
} from "~/data/locations";
import { BreadcrumbSchema, FAQSchema } from "~/components/SEOSchema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found | M. S. Naz High School®",
    };
  }

  const title = `Top School Serving ${location.name} (${location.urduName}) | Admissions & Transport | MSNS`;
  const description = `M. S. Naz High School serves students from ${location.name} with dedicated school transport (${location.commuteTimeMinutes} min commute), Oxford curriculum, BISE Gujranwala matric board honors, and STEM/AI labs.`;

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
    openGraph: {
      title,
      description,
      url: `https://www.msns.edu.pk/locations/${location.slug}`,
      siteName: "M.S. Naz High School®",
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
    { name: location.name, url: `https://www.msns.edu.pk/locations/${location.slug}` },
  ];

  // Surrounding / nearby locations (excluding current)
  const nearbyLocations = LOCATIONS_DATA.filter((l) => l.slug !== location.slug).slice(0, 8);

  const schoolLdJson = {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization", "LocalBusiness"],
    "@id": `https://www.msns.edu.pk/locations/${location.slug}#school`,
    name: "M. S. Naz High School®",
    url: "https://www.msns.edu.pk",
    logo: "https://www.msns.edu.pk/api/images/logos/Official_LOGO_grn_ic9ldd.png",
    image: "https://www.msns.edu.pk/api/images/logos/Official_LOGO_grn_ic9ldd.png",
    slogan: "#1 Top-Ranked High School in Ghakhar Mandi & Wazirabad | 100% Board Pass Rate",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "250",
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/ghakhar" className="hover:text-emerald-700 transition-colors">Localities</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{location.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 mb-4 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Serving {location.name}</span>
              <span className="font-serif text-emerald-950 px-1.5 py-0.5 rounded-md bg-emerald-200/60 text-[11px]">{location.urduName}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
              Premier Oxford &amp; Matric Education for{" "}
              <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                {location.name}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
              {location.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{location.commuteTimeMinutes} mins commute</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-700 font-medium">
                <Compass className="w-3.5 h-3.5 text-teal-600" />
                <span>{location.distanceKm} km from campus</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-emerald-800 font-semibold bg-emerald-50 rounded-lg">
                <Bus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dedicated Van Fleet</span>
              </div>
            </div>
          </div>

          {/* Transport & Commute Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-2xs">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Dedicated {location.name} Transport</h2>
                    <p className="text-xs text-slate-500">Punctual daily door-to-school service</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {location.transportRoute}. Our fleet is monitored with certified adult conductors and verified schedules, ensuring students arrive safely and comfortably.
                </p>

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Pickup &amp; Stop Points</h3>
                <div className="space-y-2 mb-6">
                  {location.pickupPoints.map((point) => (
                    <div key={point} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Transport Desk: 0318-7625415</span>
                <Link 
                  href="/contact"
                  className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                >
                  Verify Your Stop <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Academic Highlights */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shadow-2xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Why {location.name} Families Choose MSNS</h2>
                    <p className="text-xs text-slate-500">Excellence in ethics, academia &amp; technology</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Students from {location.name} benefit from our 22+ year institutional heritage, achieving 100% board pass rates, mastering bilingual English/Urdu communication, and building disciplined leadership habits.
                </p>

                <div className="space-y-3 mb-6">
                  {location.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Admissions Desk Open: Mon – Sat</span>
                <Link 
                  href="/admission/apply"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors inline-flex items-center gap-1.5"
                >
                  Apply Online <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Academic Wings Overview */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Curricular Programs Available for {location.name}
              </h2>
              <p className="text-xs md:text-sm text-slate-600">
                From Montessori sensory learning to BISE Gujranwala Matriculation board distinctions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-3 inline-block">Early Childhood</span>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">Playgroup &amp; Kindergarten</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Activity-based Montessori sensory development with Oxford Early Years phonics.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mb-3 inline-block">Primary Wing</span>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">Grades 1 to 5</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Oxford curriculum standards, English fluency workshops, and foundational mathematics.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mb-3 inline-block">Middle Wing</span>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">Grades 6 to 8</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Preparatory science bridge, hands-on computer coding, and public speaking clubs.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-200 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mb-3 inline-block">Matriculation</span>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">BISE Grades 9 &amp; 10</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Biology &amp; Computer Science groups with daily practical labs and 3-phase revision tests.</p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs mb-16">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">
                Local Admissions &amp; Inquiries
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions — {location.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {location.faqs.map((faq) => (
                <div key={faq.question} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs md:text-sm text-slate-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Surrounding Localities Navigation */}
          <div className="p-8 rounded-3xl bg-slate-100/80 border border-slate-200/90 mb-16">
            <div className="max-w-2xl mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Explore Other Localities &amp; Feeder Towns Served by MSNS
              </h3>
              <p className="text-xs text-slate-600">
                Our transit network connects 34+ towns and rural hubs across Tehsil Wazirabad and Gujranwala district:
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {nearbyLocations.map((nl) => (
                <Link
                  key={nl.slug}
                  href={`/locations/${nl.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 text-xs font-medium text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{nl.name}</span>
                  <span className="text-[10px] text-slate-400 font-serif">({nl.urduName})</span>
                </Link>
              ))}
              <Link
                href="/ghakhar"
                className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors inline-flex items-center gap-1 shadow-2xs"
              >
                View All 34 Locations <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Location CTA Banner */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-900/50">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
                Enroll Today
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Join M. S. Naz High School from {location.name}
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
                Give your child the advantage of Oxford quality instruction, 100% solar reliability, and guaranteed board matric distinction coaching. School transport seats are reserved on a first-come basis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/admission/apply"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
                >
                  Apply for Admission <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href="/downloads"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
                >
                  Download Prospectus &amp; Forms
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center md:text-left shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">Direct Helpline</span>
              <div className="text-xl font-bold text-white mb-2">+92 318 7625415</div>
              <p className="text-[11px] text-slate-400 mb-3">Mon – Sat (7:30 AM – 2:00 PM)</p>
              <a 
                href="tel:+923187625415"
                className="inline-block w-full py-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 text-xs font-medium border border-emerald-500/30 transition-colors"
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
