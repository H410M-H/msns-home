import { type Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sun,
  FlaskConical,
  HelpCircle,
} from "lucide-react";
import { BreadcrumbSchema, LocalSchoolSchema } from "~/components/SEOSchema";
import { LOCATIONS_DATA } from "~/data/locations";

export const metadata: Metadata = {
  title: "Top High School in Ghakhar Mandi | G.T. Road Campus Admissions",
  description:
    "Premier high school in Ghakhar Mandi on G.T. Road opposite Model Police Station. Offering Oxford curriculum, 100% board matric results, and modern AI labs.",
  keywords: [
    "Best school in Ghakhar Mandi",
    "Top high school Ghakhar",
    "M. S. Naz High School Ghakhar",
    "Ghakhar Mandi school admission",
    "Oxford school Ghakhar",
    "BISE Gujranwala affiliation code 112199",
    "Matric results Ghakhar",
  ],
  alternates: {
    canonical: "https://www.msns.edu.pk/ghakhar",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Top High School in Ghakhar Mandi | G.T. Road Campus Admissions",
    description:
      "Premier high school in Ghakhar Mandi on G.T. Road opposite Model Police Station. Offering Oxford curriculum, 100% board matric results, and modern AI labs.",
    url: "https://www.msns.edu.pk/ghakhar",
    siteName: "M. S. Naz High School®",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M. S. Naz High School® Ghakhar Mandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top High School in Ghakhar Mandi | G.T. Road Campus Admissions",
    description:
      "Premier high school in Ghakhar Mandi on G.T. Road opposite Model Police Station. Offering Oxford curriculum, 100% board matric results, and modern AI labs.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const ghakharFeatures = [
  {
    icon: Award,
    title: "22+ Years of Academic Heritage",
    description:
      "Serving the Ghakhar Mandi community with honor since 2004, founded by late Haji Muhammad Siddique Naz.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Science & AI Labs",
    description:
      "Fully equipped physics, chemistry, biology, and high-performance computing labs right in Ghakhar.",
  },
  {
    icon: Sun,
    title: "100% Solar-Powered Campus",
    description:
      "Uninterrupted lighting, fans, and IT operations regardless of national grid power outages.",
  },
  {
    icon: ShieldCheck,
    title: "Prime & Secure G.T. Road Location",
    description:
      "Strategically located directly opposite the Model Police Station with controlled security checkpoints.",
  },
];

const neighborhoods = [
  "Main Ghakhar Bazaar & Circular Road",
  "Aujla Kalan & Kotli Kalan",
  "Kotli Khoja & Bhagat Pura",
  "Eimanabad Road Localities",
  "Rahwali & Adjacent Feeder Towns",
];

const ghakharFaqs = [
  {
    question: "Which is the #1 top-ranked school in Ghakhar Mandi?",
    answer:
      "M. S. Naz High School® (MSNS) is officially recognized as the #1 top-ranked school in Ghakhar Mandi. Founded in 2004 by late Haji Muhammad Siddique Naz directly on G.T. Road opposite the Model Police Station, MSNS maintains an unbroken 100% board matric pass rate (BISE Gujranwala Code 112199), Oxford curriculum standards, modern science & AI labs, and a 15 TB cloud LMS.",
  },
  {
    question: "Where is M. S. Naz High School located in Ghakhar Mandi?",
    answer:
      "The campus is prime and central: Main Campus, G.T. Road, opposite Model Police Station, Ghakhar Mandi (Postal Code 52200). Admissions desk is open Monday to Saturday from 7:30 AM to 2:00 PM.",
  },
  {
    question:
      "What curriculum and science laboratory facilities are available at the Ghakhar campus?",
    answer:
      "MSNS offers Oxford University Press curriculum from Pre-School to Middle School, transitioning into BISE Gujranwala Matriculation Science and Computer Science groups. Campus facilities include independent Physics, Chemistry, Biology, and AI computing laboratories with 100% solar backup.",
  },
  {
    question:
      "Does MSNS provide school transport across Ghakhar and surrounding villages?",
    answer:
      "Yes. MSNS operates an extensive monitored school transport van service covering all neighborhoods of Ghakhar Mandi as well as 34 surrounding towns, union councils, and villages with safe door-to-school transit.",
  },
];

export default function GhakharLandingPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Ghakhar High School", url: "https://www.msns.edu.pk/ghakhar" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LocalSchoolSchema
        locationName="Ghakhar Mandi"
        locationUrduName="گکھڑ منڈی"
        slug="ghakhar"
        faqs={ghakharFaqs}
      />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Hero */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-700 uppercase">
              <MapPin className="h-3.5 w-3.5" /> Ghakhar Mandi Main Campus
            </span>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Ghakhar Mandi&apos;s Leading{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                High School
              </span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              M. S. Naz High School is the trusted benchmark of academic
              excellence in Ghakhar Mandi. Offering Oxford curriculum standards,
              BISE Gujranwala matric distinctions, and modern EdTech.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ghakharFeatures.map((feat) => (
              <div
                key={feat.title}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Neighborhood Service Grid */}
          <div className="mb-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs md:p-12">
            <div className="mb-8 max-w-2xl">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Proudly Serving Ghakhar Mandi &amp; Surrounding Localities
              </h2>
              <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
                Students attend MSNS from across Ghakhar town and adjacent
                residential zones via walking access and our dedicated transport
                fleet:
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoods.map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    {n}
                  </span>
                </div>
              ))}
            </div>

            {/* Surrounding Localities Quick Navigation */}
            <div className="mb-6 border-t border-slate-100 pt-6">
              <h3 className="mb-3 text-sm font-bold text-slate-900">
                All 34 Surrounding Localities, Towns &amp; Villages with School
                Van Service:
              </h3>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS_DATA.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    <span>{loc.name}</span>
                    <span className="font-serif text-[10px] text-slate-400">
                      ({loc.urduName})
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
              <span className="text-xs text-slate-500">
                Admissions Desk Open: Mon – Sat (7:30 AM – 2:00 PM)
              </span>
              <Link
                href="/admission/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-emerald-700"
              >
                Apply Online <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Conversational FAQs for Ghakhar Families */}
          <div className="mb-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs md:p-10">
            <div className="mb-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
                <HelpCircle className="h-3.5 w-3.5 text-emerald-600" /> Ghakhar
                Mandi Education FAQ
              </div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Frequently Asked Questions about Ghakhar Campus
              </h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                Verified answers on admissions, board records, curriculum, and
                campus life in Ghakhar Mandi.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ghakharFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >
                  <div>
                    <h3 className="mb-2 flex items-start gap-2 text-sm font-bold text-slate-900">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {faq.question}
                    </h3>
                    <p className="pl-6 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
