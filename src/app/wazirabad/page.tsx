import { type Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Bus, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Phone,
  Clock
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";
import { LOCATIONS_DATA } from "~/data/locations";

export const metadata: Metadata = {
  title: "Best High School in Wazirabad | Admissions & Top Matric Results | MSNS",
  description: "Looking for the best high school in Wazirabad? M. S. Naz High School offers Oxford syllabus, BISE Gujranwala matric distinctions, dedicated transport routes from Wazirabad, and hands-on AI labs.",
  alternates: {
    canonical: "https://www.msns.edu.pk/wazirabad",
  },
  openGraph: {
    title: "Best High School in Wazirabad | M. S. Naz High School®",
    description: "Oxford syllabus, BISE Gujranwala matric distinctions, and dedicated transport routes from Wazirabad.",
    url: "https://www.msns.edu.pk/wazirabad",
    siteName: "M.S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Wazirabad Campus",
      },
    ],
  },
};

const wazirabadHighlights = [
  "Dedicated daily school van service servicing all major neighborhoods of Wazirabad",
  "Convenient 10–12 minute commute via direct G.T. Road arterial access",
  "Top BISE Gujranwala matriculation scores with students crossing 1100+ marks",
  "Partnership with Oxford University Press from Early Childhood to Middle School",
  "60% practical science and modern AI computer laboratory curriculum",
  "Low 1:16 student-teacher ratio ensuring individualized academic attention"
];

const transportRoutes = [
  { area: "Wazirabad City Center & Kutchery Road", time: "Morning & Afternoon Runs" },
  { area: "Nizamabad & Sialkot Road Bypass", time: "Fixed Pickup Stations" },
  { area: "Railway Road & Circular Road Localities", time: "Door-to-Station Service" },
  { area: "Allahabad & Adjacent Residential Colonies", time: "Monitored Transport Fleet" },
];

export default function WazirabadLandingPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Wazirabad High School", url: "https://www.msns.edu.pk/wazirabad" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <MapPin className="w-3.5 h-3.5" /> Wazirabad Tehsil Premier Education
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              The Preferred High School for{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Wazirabad Families
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              M. S. Naz High School is just minutes away along G.T. Road, providing Wazirabad students with world-class Oxford education, BISE Gujranwala matric board honors, and safe door-to-door transit.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Why Wazirabad Parents Choose MSNS
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Parents residing in Wazirabad city seeking an alternative to overcrowded classrooms and conventional rote-learning find an optimal environment at MSNS. We blend academic rigor with character building and modern technology.
              </p>
              <div className="space-y-3">
                {wazirabadHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Dedicated Wazirabad Transport</h3>
                    <p className="text-xs text-slate-500">Safe and punctual daily student commute</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Our vetted drivers and dedicated school conductors ensure your child is picked up and dropped off safely on schedule across all key areas in Wazirabad.
                </p>
                <div className="space-y-2.5">
                  {transportRoutes.map((route) => (
                    <div key={route.area} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{route.area}</span>
                      <span className="text-emerald-700 font-medium">{route.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Transport desk: 0318-7625415</span>
                <Link 
                  href="/contact"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  Inquire Route <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Surrounding Localities Quick Navigation */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-10 shadow-xs mb-16">
            <div className="max-w-2xl mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Surrounding Wazirabad &amp; Gujranwala Localities Served by MSNS Fleet
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                In addition to Wazirabad city center, our school buses and vans provide scheduled daily transit across 34+ surrounding towns and rural localities:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Location & CTA */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
                Easy Direct Commute
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Visit Us on G.T. Road (Opposite Model Police Station)
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed mb-6">
                Our admissions desk is open Monday to Saturday from 7:30 AM to 2:00 PM. Experience our science laboratories, solar-powered campus, and meet our senior faculty.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/admission/apply"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  Apply for Admission <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/academics"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
                >
                  Explore Academic Wings
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
