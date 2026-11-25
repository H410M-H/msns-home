import { type Metadata } from "next";
import Link from "next/link";
import {
  Sun,
  Cpu,
  ShieldCheck,
  FlaskConical,
  Library,
  Trophy,
  Bus,
  Droplets,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Campus Facilities & Infrastructure | Solar, STEM & Transport",
  description:
    "Tour M. S. Naz High School campus facilities: uninterrupted solar power, high-tech AI computer labs, modern science laboratories, and reliable bus transport.",
  alternates: {
    canonical: "https://www.msns.edu.pk/campus",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Campus Facilities & Infrastructure | Solar, STEM & Transport",
    description:
      "Tour M. S. Naz High School campus facilities: uninterrupted solar power, high-tech AI computer labs, modern science laboratories, and reliable bus transport.",
    url: "https://www.msns.edu.pk/campus",
    siteName: "M. S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Campus Facilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Facilities & Infrastructure | Solar, STEM & Transport",
    description:
      "Tour M. S. Naz High School campus facilities: uninterrupted solar power, high-tech AI computer labs, modern science laboratories, and reliable bus transport.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const facilities = [
  {
    icon: FlaskConical,
    title: "Advanced Science Labs",
    subtitle: "Physics, Chemistry & Biology",
    description:
      "Fully equipped with modern apparatus, chemicals, microscopes, and safety measures. Our students conduct syllabus-mandated board practicals and STEM experiments under seasoned demonstrators.",
    points: [
      "Dedicated workstations for physics mechanics & optics",
      "Proper ventilation and chemical safety storage",
      "High-power biological microscopes & specimen sets",
      "Hands-on practice aligned with BISE Gujranwala practical exams",
    ],
  },
  {
    icon: Cpu,
    title: "AI & Computer Science Lab",
    subtitle: "High-Performance Workstations & 15 TB Cloud",
    description:
      "Equipped with quad-core workstations, high-speed fiber internet, and a dedicated 15 TB institutional cloud for student assignments, digital portfolios, and AI coursework.",
    points: [
      "Individual workstation access for every student",
      "Safe, filtered broadband internet connectivity",
      "15 TB secure central cloud for school resources",
      "Software suites for coding, graphics, and office tools",
    ],
  },
  {
    icon: Sun,
    title: "Solar-Powered Eco-Campus",
    subtitle: "100% Uninterrupted Learning",
    description:
      "With an extensive solar energy setup, classrooms, computer labs, and water filtration units remain fully operational without disruption during national grid load shedding.",
    points: [
      "Clean, sustainable green energy footprint",
      "Zero classroom interruptions during power outages",
      "Continuous airflow, fan ventilation, and digital board power",
      "Eco-awareness integrated into student environmental projects",
    ],
  },
  {
    icon: Library,
    title: "Comprehensive Library & Media",
    subtitle: "Cultivating Curiosity & Research",
    description:
      "A rich repository of Oxford reference texts, Urdu literature, Islamic scholarship, science journals, and digital e-resources to build independent reading habits from an early age.",
    points: [
      "Extensive collection of Oxford graded readers",
      "Curated research material for Matric board examinations",
      "Quiet individual study pods and group research tables",
      "Weekly dedicated library periods for all primary and middle grades",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Campus Safety & 24/7 Security",
    subtitle: "Complete Peace of Mind for Parents",
    description:
      "Strategically situated along G.T. Road opposite the Model Police Station, our campus features comprehensive physical security, boundary walls, and active surveillance.",
    points: [
      "CCTV camera coverage across all corridors and gates",
      "Controlled entry and exit points with trained security guards",
      "Direct proximity to local emergency services",
      "Disaster preparedness, fire extinguishers, and emergency drills",
    ],
  },
  {
    icon: Bus,
    title: "Safe Transport & Commute",
    subtitle: "Dedicated Vans & Routes",
    description:
      "Carefully monitored transport routes covering Ghakhar Mandi, Wazirabad, Rahwali, and neighboring rural feeder areas, operated by vetted, experienced drivers.",
    points: [
      "Fixed pickup and drop-off timings",
      "Trained conductors ensuring orderly boarding",
      "Covering major routes across Wazirabad tehsil",
      "Direct communication channel between parents and transport desk",
    ],
  },
  {
    icon: Droplets,
    title: "Hygiene & Filtered Water",
    subtitle: "Health-First Learning Atmosphere",
    description:
      "Multi-stage RO filtered drinking water stations, sanitized restrooms, and daily janitorial maintenance ensure student well-being throughout the academic day.",
    points: [
      "Regular testing of water quality and filtration filters",
      "Hygienic cafeteria providing nutritious refreshments",
      "First aid room with immediate medical supplies",
      "Emphasis on personal hygiene in morning assemblies",
    ],
  },
  {
    icon: Trophy,
    title: "Sports & Assembly Ground",
    subtitle: "Physical Fitness & Leadership",
    description:
      "Spacious assembly ground for daily morning parades, physical drills, speech presentations, cricket tournaments, badminton, and annual sports days.",
    points: [
      "Daily public speaking practice at the assembly dais",
      "Annual Inter-House Sports Championship trophies",
      "Badminton, table tennis, and athletics competitions",
      "Promoting teamwork, sportsmanship, and physical health",
    ],
  },
];

export default function CampusPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Campus Life", url: "https://www.msns.edu.pk/campus" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-700 uppercase">
              <Sparkles className="h-3.5 w-3.5" /> World-Class Infrastructure
            </span>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              A Campus Built for{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Discovery & Safety
              </span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              Explore the cutting-edge facilities that empower MSNS students
              every day—from solar-powered classrooms to advanced AI computing
              and science laboratories.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
            {facilities.map((fac) => (
              <div
                key={fac.title}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                    <fac.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                    {fac.subtitle}
                  </span>
                  <h3 className="mt-1 mb-3 text-2xl font-bold text-slate-900">
                    {fac.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {fac.description}
                  </p>
                  <div className="space-y-2.5">
                    {fac.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Location Map Banner */}
          <div className="mb-16 flex flex-col items-center justify-between gap-8 rounded-3xl bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 text-white shadow-xl md:flex-row md:p-12">
            <div className="max-w-xl">
              <span className="mb-2 block text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Prime Location
              </span>
              <h2 className="mb-3 text-3xl font-bold">
                Easily Accessible on G.T. Road, Ghakhar
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-300 md:text-base">
                Conveniently located directly opposite Model Police Station,
                Ghakhar Mandi (Postal Code 52200), providing effortless transit
                from both Wazirabad and Gujranwala.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-emerald-400"
                >
                  Contact Admissions Office <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://maps.google.com/?q=32.2818,74.1481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
