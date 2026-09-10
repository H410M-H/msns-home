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
  Award,
  HelpCircle,
  Phone,
  ArrowRight,
  HardDrive
} from "lucide-react";
import { BreadcrumbSchema, MatricDownloadsSchema } from "~/components/SEOSchema";
import { MatricTextbooksSection } from "~/components/blocks/downloads/MatricTextbooksSection";

export const metadata: Metadata = {
  title: "Official Downloads & Matric Academic Portal | M. S. Naz High School®",
  description: "Download official M. S. Naz High School documents: 36-page 2026–2027 Prospectus, Admission Forms, Fee Schedules, Academic Calendars, plus BISE Gujranwala Matric model papers, past papers, 20 PCTB textbooks, and pairing schemes.",
  keywords: [
    "M. S. Naz High School downloads",
    "MSNS downloads portal",
    "Class 9 textbooks PDF download",
    "Class 10 textbooks PDF download",
    "PCTB textbooks PDF Punjab board",
    "BISE Gujranwala matric model papers",
    "matric pairing schemes 2026",
    "school prospectus 2026 2027",
    "offline admission form pdf",
    "9th class physics book pdf",
    "10th class physics book pdf",
    "9th class chemistry book pdf",
    "10th class chemistry book pdf",
    "10th class computer science c language",
    "matric past papers BISE Gujranwala",
    "best school in Ghakhar Mandi",
    "top high school Wazirabad",
    "Naz LMS portal downloads",
    "Single National Curriculum textbooks"
  ],
  alternates: {
    canonical: "https://www.msns.edu.pk/downloads",
  },
  openGraph: {
    title: "Official Downloads & Matric Academic Portal | M. S. Naz High School®",
    description: "Download official 36-page school prospectus, admission forms, fee schedule, and BISE Gujranwala Matric academic resources & 20 PCTB textbooks.",
    url: "https://www.msns.edu.pk/downloads",
    siteName: "M. S. Naz High School®",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M. S. Naz High School® Downloads & Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Downloads & Matric Academic Portal | M. S. Naz High School®",
    description: "Download official 36-page prospectus, admission forms, fee schedules, and complete BISE Gujranwala matric textbooks and notes.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const documents = [
  {
    icon: FileText,
    title: "School Prospectus 2026–2027",
    category: "Official Publication",
    size: "36-Page Official Edition",
    description: "Complete comprehensive 36-page institutional prospectus: campus infrastructure, 23 real photographs, Oxford English medium, matric science & CS syllabuses, student leadership uniforms, Naz LMS ecosystem, fee schedules, and admission roadmap.",
    pdfUrl: "/api/documents/msns-prospectus-2026-2027.pdf",
    filename: "msns-prospectus-2026-2027.pdf",
    badge: "36-Page Edition"
  },
  {
    icon: FileSpreadsheet,
    title: "Offline Admission Registration Form",
    category: "Admissions Desk",
    size: "Printable PDF",
    description: "Standard printable 2-page walk-in admission application with guardian declarations, document checklists, and medical emergency authorizations.",
    pdfUrl: "/api/documents/msns-offline-admission-form-2026-2027.pdf",
    filename: "msns-offline-admission-form-2026-2027.pdf",
    badge: "Printable Form"
  },
  {
    icon: Calendar,
    title: "Annual Academic Calendar 2026–2027",
    category: "Schedules & Terms",
    size: "Academic Schedule",
    description: "Term timetables, first/mid/final exam dates, gazetted public holidays, winter & summer breaks, sports galas, and parent-teacher conferences.",
    pdfUrl: "/api/documents/msns-academic-calendar-2026-2027.pdf",
    filename: "msns-academic-calendar-2026-2027.pdf",
    badge: "Term Schedule"
  },
  {
    icon: BookOpen,
    title: "Matriculation Scheme of Studies (BISE)",
    category: "Academic Roadmap",
    size: "Official Blueprint",
    description: "Detailed subject breakdown for 9th and 10th Science & Computer Science groups under BISE Gujranwala board guidelines and practical marks division.",
    pdfUrl: "/api/documents/msns-matriculation-scheme-of-studies.pdf",
    filename: "msns-matriculation-scheme-of-studies.pdf",
    badge: "Board Affiliated"
  },
  {
    icon: FileText,
    title: "Tuition Fee Policy & Challan Guide",
    category: "Finance & Accounts",
    size: "Fee Schedule",
    description: "Official schedule of monthly tuition fees, admission charges, sibling concession criteria, late fine policies, and online fee challan instructions.",
    pdfUrl: "/api/documents/msns-tuition-fee-policy-and-challan-guide.pdf",
    filename: "msns-tuition-fee-policy-and-challan-guide.pdf",
    badge: "Transparent Fees"
  },
  {
    icon: ShieldAlert,
    title: "Student Code of Conduct & Uniform Rules",
    category: "Campus Discipline",
    size: "Illustrated Policy",
    description: "Institutional discipline policy: 85% attendance prerequisite, summer/winter uniform codes, lab safety guidelines, and leadership uniform guidelines.",
    pdfUrl: "/api/documents/msns-code-of-conduct-and-uniform-rules.pdf",
    filename: "msns-code-of-conduct-and-uniform-rules.pdf",
    badge: "Campus Rules"
  },
  {
    icon: Award,
    title: "BISE Matric Resource & Exam Guide",
    category: "Matric Portal",
    size: "Exam Prep Guide",
    description: "Consolidated guide to BISE Gujranwala SLO model papers, 5-year past paper archives, 1200 marks grading scheme, and PCTB official textbook download portals.",
    pdfUrl: "/api/documents/msns-bise-matric-resource-guide.pdf",
    filename: "msns-bise-matric-resource-guide.pdf",
    badge: "Exam Prep"
  }
];

const downloadFaqs = [
  {
    question: "Are all textbooks and notes in the MSNS Downloads Center completely free to download?",
    answer: "Yes. All 20 official Punjab Curriculum and Textbook Board (PCTB) e-textbooks for Class 9 and Class 10 (Science and Computer Science groups) and MSNS high-yield revision notes are 100% free with direct, unrestricted Cloudflare edge delivery."
  },
  {
    question: "What official school publications are available for parents and prospective students?",
    answer: "The downloads portal provides the complete 36-page Institutional Prospectus (2026–2027) featuring 23 real campus photographs, the printable offline Admission Registration Form, Annual Academic Calendar, Matriculation Scheme of Studies, Tuition Fee Policy, and Student Code of Conduct."
  },
  {
    question: "What is the BISE Gujranwala affiliation code for M. S. Naz High School?",
    answer: "M. S. Naz High School is officially affiliated with the Board of Intermediate and Secondary Education (BISE) Gujranwala under School Affiliation Code 112199 and is registered with the Punjab Education Sector Reform Programme (PEPRIS)."
  },
  {
    question: "Why is M. S. Naz High School considered the #1 school in Ghakhar Mandi and Wazirabad?",
    answer: "MSNS is top-ranked due to its unbroken 100% matriculation pass rate, multiple board distinctions, Oxford curriculum partnership from early years to middle school, modern practical science & AI laboratories, safe transport servicing 34 localities, and a proprietary 15 TB cloud LMS ecosystem."
  },
  {
    question: "How does the Naz LMS portal connect with downloadable academic resources?",
    answer: "While public textbooks and brochures are available on the website, enrolled students and parents receive personalized credentials to the 15 TB Naz LMS portal (https://lms.msns.edu.pk) for daily homework diaries, video lectures, test scores, digital fee challans, and attendance SMS alerts."
  },
  {
    question: "Can I download and read these textbook PDFs on mobile phones and tablets?",
    answer: "Yes. All PDF files are optimized for fast rendering on Android smartphones, iPhones, iPads, laptops, and desktop computers. You can also view them directly in your browser using the 'Preview' option."
  },
  {
    question: "Where can parents obtain physical printed copies of the Prospectus and Admission Form?",
    answer: "Printed 36-page prospectuses and offline admission registration forms can be collected in person from the Admissions Office at the Main Campus, G.T. Road, opposite Model Police Station, Ghakhar Mandi (Open Monday to Saturday, 7:30 AM to 2:00 PM)."
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
      <MatricDownloadsSchema faqs={downloadFaqs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> #1 Academic Downloads Portal
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80">
                <Award className="w-3.5 h-3.5 text-teal-600" /> BISE Gujranwala Code: 112199
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Official Downloads &{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Matric E-Library
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Access and download official institutional publications, 2026–2027 36-page Prospectus, admission packages, academic schedules, plus complete official PCTB textbooks and high-yield notes for Class 9 and 10.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
              <div className="text-2xl font-bold text-emerald-700 font-serif">20 Books</div>
              <div className="text-xs text-slate-600 mt-0.5">PCTB 9th & 10th E-Books</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
              <div className="text-2xl font-bold text-emerald-700 font-serif">36 Pages</div>
              <div className="text-xs text-slate-600 mt-0.5">Official 2026–2027 Prospectus</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
              <div className="text-2xl font-bold text-emerald-700 font-serif">100% Free</div>
              <div className="text-xs text-slate-600 mt-0.5">Cloudflare Edge Delivery</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
              <div className="text-2xl font-bold text-emerald-700 font-serif">15 TB LMS</div>
              <div className="text-xs text-slate-600 mt-0.5">Connected Cloud Ecosystem</div>
            </div>
          </div>

          {/* Section: Official Institutional Documents */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1 block">
                  Institutional Records
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Official School Publications &amp; Forms
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-2 md:mt-0 max-w-md">
                Verified PDF documents approved by the school administration for prospective and enrolled families.
              </p>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>

          {/* Interactive Matric Textbooks & Notes Download Directory (Clean Single Instance) */}
          <MatricTextbooksSection />

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
                  All prescribed textbooks for Science and Computer Science groups available in authentic PDF format directly through our official institutional repository:
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
                  href="#matric-textbooks"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Browse & Download Complete Textbooks Above
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
                <Link 
                  href="/resources"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Award className="w-3.5 h-3.5" /> View Pairing Schemes &amp; Exam Tips
                </Link>
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
                  href="/api/documents/msns-bise-matric-resource-guide.pdf"
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
                  href="/api/documents/msns-matriculation-scheme-of-studies.pdf"
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
                  href="/api/documents/msns-bise-matric-resource-guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Preview
                </a>
                <a 
                  href="/api/documents/msns-bise-matric-resource-guide.pdf"
                  download="msns-bise-matric-resource-guide.pdf"
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download PDF (Guide)
                </a>
              </div>
            </div>
          </div>

          {/* Natural-Language Conversational FAQ Section for AI Direct Answer Extraction */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs mb-20">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Knowledge Base &amp; FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Frequently Asked Questions About MSNS Downloads &amp; Matric Resources
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Direct answers to common inquiries regarding textbooks, board affiliation, prospectuses, and admissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloadFaqs.map((faq) => (
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

          {/* Quick Notice Banner & Admissions Contact */}
          <div className="bg-emerald-950 text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <HardDrive className="w-4 h-4" /> Main Campus Admissions Desk
              </div>
              <h3 className="text-xl font-bold mb-2">Need Printed Copies or Admissions Assistance?</h3>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Admissions officers are available on campus from 7:30 AM to 2:00 PM (Monday – Saturday) to provide printed prospectuses, academic calendars, past paper booklets, and assist with registration.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href="tel:+923187625415"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" /> +92 318 7625415
              </a>
              <Link 
                href="/admission/apply"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md inline-flex items-center gap-1.5"
              >
                Apply Online <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
