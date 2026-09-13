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
  CheckCircle2
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Campus Life & Modern Facilities | M. S. Naz High School®",
  description: "Discover the state-of-the-art campus of M. S. Naz High School. Solar-powered infrastructure, modern Physics & Chemistry labs, AI computer labs with 15TB cloud, library, and secure transport.",
  alternates: {
    canonical: "https://www.msns.edu.pk/campus",
  },
  openGraph: {
    title: "Campus Life & Modern Facilities | M. S. Naz High School®",
    description: "Solar-powered infrastructure, modern Physics & Chemistry labs, AI computer labs with 15TB cloud, library, and secure transport.",
    url: "https://www.msns.edu.pk/campus",
    siteName: "M.S. Naz High School®",
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
};

const facilities = [
  {
    icon: FlaskConical,
    title: "Advanced Science Labs",
    subtitle: "Physics, Chemistry & Biology",
    description: "Fully equipped with modern apparatus, chemicals, microscopes, and safety measures. Our students conduct syllabus-mandated board practicals and STEM experiments under seasoned demonstrators.",
    points: [
      "Dedicated workstations for physics mechanics & optics",
      "Proper ventilation and chemical safety storage",
      "High-power biological microscopes & specimen sets",
      "Hands-on practice aligned with BISE Gujranwala practical exams"
    ]
  },
  {
    icon: Cpu,
    title: "AI & Computer Science Lab",
    subtitle: "High-Performance Workstations & 15 TB Cloud",
    description: "Equipped with quad-core workstations, high-speed fiber internet, and a dedicated 15 TB institutional cloud for student assignments, digital portfolios, and AI coursework.",
    points: [
      "Individual workstation access for every student",
      "Safe, filtered broadband internet connectivity",
      "15 TB secure central cloud for school resources",
      "Software suites for coding, graphics, and office tools"
    ]
  },
  {
    icon: Sun,
    title: "Solar-Powered Eco-Campus",
    subtitle: "100% Uninterrupted Learning",
    description: "With an extensive solar energy setup, classrooms, computer labs, and water filtration units remain fully operational without disruption during national grid load shedding.",
    points: [
      "Clean, sustainable green energy footprint",
      "Zero classroom interruptions during power outages",
      "Continuous airflow, fan ventilation, and digital board power",
      "Eco-awareness integrated into student environmental projects"
    ]
  },
  {
    icon: Library,
    title: "Comprehensive Library & Media",
    subtitle: "Cultivating Curiosity & Research",
    description: "A rich repository of Oxford reference texts, Urdu literature, Islamic scholarship, science journals, and digital e-resources to build independent reading habits from an early age.",
    points: [
      "Extensive collection of Oxford graded readers",
      "Curated research material for Matric board examinations",
      "Quiet individual study pods and group research tables",
      "Weekly dedicated library periods for all primary and middle grades"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Campus Safety & 24/7 Security",
    subtitle: "Complete Peace of Mind for Parents",
    description: "Strategically situated along G.T. Road opposite the Model Police Station, our campus features comprehensive physical security, boundary walls, and active surveillance.",
    points: [
      "CCTV camera coverage across all corridors and gates",
      "Controlled entry and exit points with trained security guards",
      "Direct proximity to local emergency services",
      "Disaster preparedness, fire extinguishers, and emergency drills"
    ]
  },
  {
    icon: Bus,
    title: "Safe Transport & Commute",
    subtitle: "Dedicated Vans & Routes",
    description: "Carefully monitored transport routes covering Ghakhar Mandi, Wazirabad, Rahwali, and neighboring rural feeder areas, operated by vetted, experienced drivers.",
    points: [
      "Fixed pickup and drop-off timings",
      "Trained conductors ensuring orderly boarding",
      "Covering major routes across Wazirabad tehsil",
      "Direct communication channel between parents and transport desk"
    ]
  },
  {
    icon: Droplets,
    title: "Hygiene & Filtered Water",
    subtitle: "Health-First Learning Atmosphere",
    description: "Multi-stage RO filtered drinking water stations, sanitized restrooms, and daily janitorial maintenance ensure student well-being throughout the academic day.",
    points: [
      "Regular testing of water quality and filtration filters",
      "Hygienic cafeteria providing nutritious refreshments",
      "First aid room with immediate medical supplies",
      "Emphasis on personal hygiene in morning assemblies"
    ]
  },
  {
    icon: Trophy,
    title: "Sports & Assembly Ground",
    subtitle: "Physical Fitness & Leadership",
    description: "Spacious assembly ground for daily morning parades, physical drills, speech presentations, cricket tournaments, badminton, and annual sports days.",
    points: [
      "Daily public speaking practice at the assembly dais",
      "Annual Inter-House Sports Championship trophies",
      "Badminton, table tennis, and athletics competitions",
      "Promoting teamwork, sportsmanship, and physical health"
    ]
  }
];

export default function CampusPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Campus Life", url: "https://www.msns.edu.pk/campus" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> World-Class Infrastructure
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              A Campus Built for{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Discovery & Safety
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Explore the cutting-edge facilities that empower MSNS students every day—from solar-powered classrooms to advanced AI computing and science laboratories.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {facilities.map((fac) => (
              <div 
                key={fac.title}
                className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5">
                    <fac.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                    {fac.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">
                    {fac.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {fac.description}
                  </p>
                  <div className="space-y-2.5">
                    {fac.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Location Map Banner */}
          <div className="rounded-3xl bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 md:p-12 shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
                Prime Location
              </span>
              <h2 className="text-3xl font-bold mb-3">
                Easily Accessible on G.T. Road, Ghakhar
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Conveniently located directly opposite Model Police Station, Ghakhar Mandi (Postal Code 52200), providing effortless transit from both Wazirabad and Gujranwala.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  Contact Admissions Office <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="https://maps.google.com/?q=32.2818,74.1481" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
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
