import { type Metadata } from "next";
import Link from "next/link";
import { 
  Download, 
  FileText, 
  Calendar, 
  BookOpen, 
  FileSpreadsheet, 
  Sparkles, 
  ShieldAlert,
  ExternalLink,
  CheckCircle2,
  GraduationCap,
  Layers,
  Award
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Official Downloads & Matric Academic Portal | M. S. Naz High School®",
  description: "Download official M. S. Naz High School documents: 2026-2027 Prospectus, Admission Forms, Fee Schedules, Academic Calendars, plus BISE Gujranwala Matric model papers, past papers, PCTB textbooks, and pairing schemes.",
  alternates: {
    canonical: "https://www.msns.edu.pk/downloads",
  },
  openGraph: {
    title: "Official Downloads & Matric Academic Portal | M. S. Naz High School®",
    description: "Download official school prospectus, admission forms, fee schedule, and BISE Gujranwala Matric academic resources.",
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
    category: "Official Publication",
    size: "243 KB PDF",
    description: "Comprehensive institutional overview: Oxford English medium curriculum, BISE Gujranwala affiliations, AI labs, 15 TB cloud, fee structure, and admissions roadmap.",
    pdfUrl: "/documents/msns-prospectus-2026-2027.pdf",
    filename: "msns-prospectus-2026-2027.pdf",
    badge: "Updated Edition"
  },
  {
    icon: FileSpreadsheet,
    title: "Offline Admission Registration Form",
    category: "Admissions Desk",
    size: "238 KB PDF",
    description: "Standard printable 2-page walk-in admission application with guardian declarations, document checklists, and medical emergency authorizations.",
    pdfUrl: "/documents/msns-offline-admission-form-2026-2027.pdf",
    filename: "msns-offline-admission-form-2026-2027.pdf",
    badge: "Printable Form"
  },
  {
    icon: Calendar,
    title: "Annual Academic Calendar 2026–2027",
    category: "Schedules & Terms",
    size: "238 KB PDF",
    description: "Term timetables, first/mid/final exam dates, gazetted public holidays, winter & summer breaks, sports galas, and parent-teacher conferences.",
    pdfUrl: "/documents/msns-academic-calendar-2026-2027.pdf",
    filename: "msns-academic-calendar-2026-2027.pdf",
    badge: "Term Schedule"
  },
  {
    icon: BookOpen,
    title: "Matriculation Scheme of Studies (BISE)",
    category: "Academic Roadmap",
    size: "239 KB PDF",
    description: "Detailed subject breakdown for 9th and 10th Science & Computer Science groups under BISE Gujranwala board guidelines and practical marks division.",
    pdfUrl: "/documents/msns-matriculation-scheme-of-studies.pdf",
    filename: "msns-matriculation-scheme-of-studies.pdf",
    badge: "Board Affiliated"
  },
  {
    icon: FileText,
    title: "Tuition Fee Policy & Challan Guide",
    category: "Finance & Accounts",
    size: "238 KB PDF",
    description: "Official schedule of monthly tuition fees, admission charges, sibling concession criteria, late fine policies, and online fee challan instructions.",
    pdfUrl: "/documents/msns-tuition-fee-policy-and-challan-guide.pdf",
    filename: "msns-tuition-fee-policy-and-challan-guide.pdf",
    badge: "Transparent Fees"
  },
  {
    icon: ShieldAlert,
    title: "Student Code of Conduct & Uniform Rules",
    category: "Campus Discipline",
    size: "238 KB PDF",
    description: "Institutional discipline policy: 85% attendance prerequisite, summer/winter uniform codes, lab safety guidelines, and prohibited electronic devices.",
    pdfUrl: "/documents/msns-code-of-conduct-and-uniform-rules.pdf",
    filename: "msns-code-of-conduct-and-uniform-rules.pdf",
    badge: "Campus Rules"
  },
  {
    icon: Award,
    title: "BISE Matric Resource & Exam Guide",
    category: "Matric Portal",
    size: "238 KB PDF",
    description: "Consolidated guide to BISE Gujranwala SLO model papers, 5-year past paper archives, 1200 marks grading scheme, and PCTB official textbook download portals.",
    pdfUrl: "/documents/msns-bise-matric-resource-guide.pdf",
    filename: "msns-bise-matric-resource-guide.pdf",
    badge: "Exam Prep"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {documents.map((doc) => (
              <div 
                key={doc.title}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                      <doc.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                        {doc.badge}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    {doc.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">
                    {doc.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-400">{doc.size}</span>
                  <div className="flex items-center gap-1.5">
                    <a 
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Preview PDF in browser"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Preview
                    </a>
                    <a 
                      href={doc.pdfUrl}
                      download={doc.filename}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 transition-all px-3 py-1.5 rounded-xl shadow-xs hover:shadow-md"
                      title="Download branded official PDF"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Matric Academic Resources Hub */}
          <div className="mb-24 pt-8 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200 mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" /> BISE Gujranwala &amp; PCTB Portal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Matriculation Academic Hub{" "}
                <span className="bg-linear-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  (Class 9 &amp; 10)
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Official Punjab Curriculum and Textbook Board (PCTB) e-textbooks, BISE Gujranwala SLO-based model papers, 5-year past examinations, and the 1200-marks revised assessment schemes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* PCTB Official Books Card */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60">
                    PCTB Lahore
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Official Punjab Textbooks (9th &amp; 10th)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  All prescribed textbooks for Science and Computer Science groups available in authentic PDF format directly through the Punjab Curriculum and Textbook Board library:
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Physics (Eng &amp; Urdu)
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Chemistry (Eng &amp; Urdu)
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Biology (Eng &amp; Urdu)
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Computer Science
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Mathematics (Science)
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Tarjuma-tul-Quran
                  </div>
                </div>
                <a 
                  href="https://pctb.punjab.gov.pk/E-Books"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Visit Official PCTB E-Books Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* BISE Gujranwala SLO Model Papers Card */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                    SLO System
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  BISE Gujranwala SLO Model Papers
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Punjab Examination Commission and BISE Gujranwala Student Learning Outcomes (SLO) pattern tests conceptual mastery rather than rote learning:
                </p>
                <div className="space-y-2 mb-6">
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
                    <span className="font-bold text-emerald-950">50% Knowledge Base:</span> Direct definitions, laws, formulas, and textbook statements.
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 text-xs">
                    <span className="font-bold text-teal-950">35% Understanding:</span> Conceptual reasoning, comparative analysis, and mechanism explanations.
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-xs">
                    <span className="font-bold text-amber-950">15% Application &amp; Synthesis:</span> Real-world numerical problems, diagrams, and code snippets.
                  </div>
                </div>
                <a 
                  href="https://bisegrw.edu.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Open BISE Gujranwala Board Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 5-Year Board Past Papers Archive */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/60">
                    2020 - 2025 Archive
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  5-Year Board Past Papers Archive
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Comprehensive past papers across Morning (Group 1) and Evening (Group 2) exam shifts for BISE Gujranwala:
                </p>
                <ul className="space-y-2 mb-6 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span><strong>Objective Papers (12-19 MCQs):</strong> Verified answer keys to master repetitive board question patterns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span><strong>Subjective Short &amp; Long Questions:</strong> Chapter-wise high-frequency questions and paper presentation guides.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span><strong>MSNS Faculty Solved Solutions:</strong> Available in physical copies and campus study circles.</span>
                  </li>
                </ul>
                <a 
                  href="/documents/msns-bise-matric-resource-guide.pdf"
                  download="msns-bise-matric-resource-guide.pdf"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download Past Paper &amp; Exam Guide
                </a>
              </div>

              {/* Pairing & Assessment Schemes */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                    1200 Marks Total
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Pairing &amp; Assessment Schemes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Official Punjab Boards committee of chairmen marks distribution across 9th and 10th classes:
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-700">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-semibold">Class 9 Theoretical &amp; TTQ</span>
                    <span className="font-bold text-slate-900">550 + 50 = 600 Marks</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-semibold">Class 10 Theoretical &amp; TTQ</span>
                    <span className="font-bold text-slate-900">550 + 50 = 600 Marks</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-semibold">Practicals (Physics, Chem, Bio/CS)</span>
                    <span className="font-bold text-emerald-800">Conducted in Class 10</span>
                  </div>
                </div>
                <a 
                  href="/documents/msns-matriculation-scheme-of-studies.pdf"
                  download="msns-matriculation-scheme-of-studies.pdf"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download Scheme of Studies PDF
                </a>
              </div>
            </div>

            {/* Banner for Full Resource PDF */}
            <div className="p-6 md:p-8 rounded-3xl bg-linear-to-r from-emerald-900 to-teal-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <BookOpen className="w-7 h-7 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Download Complete BISE Matric Resource &amp; Exam Guide</h4>
                  <p className="text-xs text-emerald-100/90 mt-1 max-w-xl">
                    Official 3-page guide compiled by M. S. Naz High School faculty including textbook references, SLO blueprint breakdown, and board exam presentation rubrics.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a 
                  href="/documents/msns-bise-matric-resource-guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Preview
                </a>
                <a 
                  href="/documents/msns-bise-matric-resource-guide.pdf"
                  download="msns-bise-matric-resource-guide.pdf"
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download PDF (238 KB)
                </a>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-emerald-950 text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900">
            <div>
              <h3 className="text-xl font-bold mb-2">Need Printed Copies or Admissions Assistance?</h3>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Admissions officers are available on campus from 7:30 AM to 2:00 PM (Monday - Saturday) to provide printed prospectuses, academic calendars, and assist with registration.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href="tel:+923187625415"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
              >
                Call: +92 318 7625415
              </a>
              <Link 
                href="/contact"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md"
              >
                Contact Admissions
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
