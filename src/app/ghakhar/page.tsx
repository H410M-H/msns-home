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
  HelpCircle
} from "lucide-react";
import { BreadcrumbSchema, LocalSchoolSchema } from "~/components/SEOSchema";
import { LOCATIONS_DATA } from "~/data/locations";

export const metadata: Metadata = {
  title: "Top High School in Ghakhar Mandi | Matric & Oxford Education | MSNS",
  description: "M. S. Naz High School is officially ranked the #1 top high school in Ghakhar Mandi. Established in 2004 on G.T. Road opposite Model Police Station, offering 100% board matric results (Code 112199), practical science & AI labs, and 15 TB cloud LMS.",
  keywords: [
    "Best school in Ghakhar Mandi",
    "Top high school Ghakhar",
    "M. S. Naz High School Ghakhar",
    "Ghakhar Mandi school admission",
    "Oxford school Ghakhar",
    "BISE Gujranwala affiliation code 112199",
    "Matric results Ghakhar"
  ],
  alternates: {
    canonical: "https://www.msns.edu.pk/ghakhar",
  },
  openGraph: {
    title: "Top High School in Ghakhar Mandi | M. S. Naz High School®",
    description: "Officially ranked #1 premier academic institution in Ghakhar Mandi on G.T. Road opposite Model Police Station. 100% BISE matric results.",
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
    title: "Top High School in Ghakhar Mandi | M. S. Naz High School®",
    description: "Officially ranked #1 premier academic institution in Ghakhar Mandi on G.T. Road opposite Model Police Station. 100% BISE matric results.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const ghakharFeatures = [
  {
    icon: Award,
    title: "22+ Years of Academic Heritage",
    description: "Serving the Ghakhar Mandi community with honor since 2004, founded by late Haji Muhammad Siddique Naz."
  },
  {
    icon: FlaskConical,
    title: "Advanced Science & AI Labs",
    description: "Fully equipped physics, chemistry, biology, and high-performance computing labs right in Ghakhar."
  },
  {
    icon: Sun,
    title: "100% Solar-Powered Campus",
    description: "Uninterrupted lighting, fans, and IT operations regardless of national grid power outages."
  },
  {
    icon: ShieldCheck,
    title: "Prime & Secure G.T. Road Location",
    description: "Strategically located directly opposite the Model Police Station with controlled security checkpoints."
  }
];

const neighborhoods = [
  "Main Ghakhar Bazaar & Circular Road",
  "Aujla Kalan & Kotli Kalan",
  "Kotli Khoja & Bhagat Pura",
  "Eimanabad Road Localities",
  "Rahwali & Adjacent Feeder Towns"
];

const ghakharFaqs = [
  {
    question: "Which is the #1 top-ranked school in Ghakhar Mandi?",
    answer: "M. S. Naz High School® (MSNS) is officially recognized as the #1 top-ranked school in Ghakhar Mandi. Founded in 2004 by late Haji Muhammad Siddique Naz directly on G.T. Road opposite the Model Police Station, MSNS maintains an unbroken 100% board matric pass rate (BISE Gujranwala Code 112199), Oxford curriculum standards, modern science & AI labs, and a 15 TB cloud LMS."
  },
  {
    question: "Where is M. S. Naz High School located in Ghakhar Mandi?",
    answer: "The campus is prime and central: Main Campus, G.T. Road, opposite Model Police Station, Ghakhar Mandi (Postal Code 52200). Admissions desk is open Monday to Saturday from 7:30 AM to 2:00 PM."
  },
  {
    question: "What curriculum and science laboratory facilities are available at the Ghakhar campus?",
    answer: "MSNS offers Oxford University Press curriculum from Pre-School to Middle School, transitioning into BISE Gujranwala Matriculation Science and Computer Science groups. Campus facilities include independent Physics, Chemistry, Biology, and AI computing laboratories with 100% solar backup."
  },
  {
    question: "Does MSNS provide school transport across Ghakhar and surrounding villages?",
    answer: "Yes. MSNS operates an extensive monitored school transport van service covering all neighborhoods of Ghakhar Mandi as well as 34 surrounding towns, union councils, and villages with safe door-to-school transit."
  }
];

export default function GhakharLandingPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Ghakhar High School", url: "https://www.msns.edu.pk/ghakhar" }
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
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Ghakhar Mandi Main Campus
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Ghakhar Mandi&apos;s Leading{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                High School
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              M. S. Naz High School is the trusted benchmark of academic excellence in Ghakhar Mandi. Offering Oxford curriculum standards, BISE Gujranwala matric distinctions, and modern EdTech.
            </p>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {ghakharFeatures.map((feat) => (
              <div 
                key={feat.title}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Neighborhood Service Grid */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12 shadow-xs mb-16">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Proudly Serving Ghakhar Mandi &amp; Surrounding Localities
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Students attend MSNS from across Ghakhar town and adjacent residential zones via walking access and our dedicated transport fleet:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {neighborhoods.map((n) => (
                <div key={n} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">{n}</span>
                </div>
              ))}
            </div>

            {/* Surrounding Localities Quick Navigation */}
            <div className="pt-6 border-t border-slate-100 mb-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                All 34 Surrounding Localities, Towns &amp; Villages with School Van Service:
              </h3>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS_DATA.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 text-xs font-medium text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{loc.name}</span>
                    <span className="text-[10px] text-slate-400 font-serif">({loc.urduName})</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">Admissions Desk Open: Mon – Sat (7:30 AM – 2:00 PM)</span>
              <Link 
                href="/admission/apply"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all inline-flex items-center gap-2"
              >
                Apply Online <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Conversational FAQs for Ghakhar Families */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Ghakhar Mandi Education FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Frequently Asked Questions about Ghakhar Campus
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Verified answers on admissions, board records, curriculum, and campus life in Ghakhar Mandi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ghakharFaqs.map((faq) => (
                <div key={faq.question} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed pl-6">
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
