import { type Metadata } from "next";
import Link from "next/link";
import { 
  Download, 
  FileText, 
  Calendar, 
  BookOpen, 
  FileSpreadsheet, 
  Sparkles, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Official Downloads & Student Resources | M. S. Naz High School®",
  description: "Download official school resources from M. S. Naz High School. Access the School Prospectus, Offline Admission Form, Fee Schedule, Academic Calendar, and Scheme of Studies.",
  alternates: {
    canonical: "https://www.msns.edu.pk/downloads",
  },
  openGraph: {
    title: "Official Downloads & Student Resources | M. S. Naz High School®",
    description: "Download official school prospectus, admission forms, fee schedule, and academic calendars.",
    url: "https://www.msns.edu.pk/downloads",
    siteName: "M.S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Downloads",
      },
    ],
  },
};

const documents = [
  {
    icon: FileText,
    title: "School Prospectus 2026–2027",
    category: "Information",
    size: "3.8 MB PDF",
    description: "Detailed institutional overview, curriculum breakdown, code of conduct, campus facilities, and admissions criteria.",
    link: "/admission"
  },
  {
    icon: FileSpreadsheet,
    title: "Offline Admission Registration Form",
    category: "Admissions",
    size: "1.2 MB PDF",
    description: "Printable registration form for walk-in admissions at our G.T. Road campus admissions desk.",
    link: "/admission/apply"
  },
  {
    icon: Calendar,
    title: "Annual Academic Calendar 2026–2027",
    category: "Schedules",
    size: "850 KB PDF",
    description: "Term dates, assessment schedules, gazetted public holidays, winter/summer vacations, and PTM timings.",
    link: "/admission"
  },
  {
    icon: BookOpen,
    title: "Matriculation Scheme of Studies (BISE)",
    category: "Academics",
    size: "1.5 MB PDF",
    description: "Subject outlines, textbook references, and paper patterns for 9th and 10th Science & Computer Science groups.",
    link: "/academics"
  },
  {
    icon: FileText,
    title: "Tuition Fee Policy & Challan Guide",
    category: "Finance",
    size: "920 KB PDF",
    description: "Breakdown of monthly tuition, annual funds, sibling discounts, and digital payment procedures via LMS.",
    link: "/admission"
  },
  {
    icon: ShieldAlert,
    title: "Student Code of Conduct & Uniform Rules",
    category: "Guidelines",
    size: "650 KB PDF",
    description: "Disciplinary standards, attendance minimums, summer/winter uniform specifications, and campus etiquette.",
    link: "/about"
  }
];

export default function DownloadsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Downloads", url: "https://www.msns.edu.pk/downloads" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Resource Center
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Official Downloads &{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Documents
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Access and download official forms, academic schedules, curriculums, and institutional guidelines for parents and students.
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {documents.map((doc) => (
              <div 
                key={doc.title}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <doc.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {doc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{doc.size}</span>
                  <Link 
                    href={doc.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    View Resource <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice */}
          <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Need Help with Admissions or Documents?</h3>
              <p className="text-slate-200 text-sm max-w-xl">
                Our admissions officers are available on campus from 7:30 AM to 2:00 PM to provide printed prospectuses and assist with form submissions.
              </p>
            </div>
            <Link 
              href="/contact"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shrink-0 transition-all shadow-md"
            >
              Contact Admissions
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
