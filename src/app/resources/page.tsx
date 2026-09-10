import { type Metadata } from "next";
import Link from "next/link";
import { 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  HelpCircle,
  Clock,
  FlaskConical,
  Calculator,
  Cpu,
  Sparkles,
  BookOpen,
  Microscope,
  Compass
} from "lucide-react";
import { BreadcrumbSchema, MatricResourcesSchema } from "~/components/SEOSchema";
import { MatricTextbooksSection } from "~/components/blocks/downloads/MatricTextbooksSection";

export const metadata: Metadata = {
  title: "BISE Gujranwala Matric Resource Center | Pairing Schemes, Past Papers & Exam Tips | MSNS",
  description: "Official BISE Gujranwala Matric Resource Center by M. S. Naz High School (#1 top-ranked school in Ghakhar & Wazirabad). Access 9th & 10th class pairing schemes, paper patterns, SLO model papers, 5-year past papers, and expert exam strategies for 1050+ marks.",
  keywords: [
    "BISE Gujranwala matric resource center",
    "matric pairing schemes 2026",
    "9th class pairing scheme 2026",
    "10th class pairing scheme 2026",
    "BISE Gujranwala past papers solved",
    "SLO model papers matric",
    "matric 1200 marks scheme",
    "how to get 1050 marks in matric",
    "best matric school in Gujranwala",
    "best school in Ghakhar Mandi",
    "top high school Wazirabad",
    "M. S. Naz High School resources",
    "physics 10th class pairing scheme",
    "chemistry 10th class pairing scheme",
    "biology 10th class pairing scheme",
    "math 10th class theorems",
    "computer science 10th class c programming",
    "BISE Gujranwala affiliation code 112199"
  ],
  alternates: {
    canonical: "https://www.msns.edu.pk/resources",
  },
  openGraph: {
    title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Exam Tips | MSNS",
    description: "Official BISE Gujranwala Matric Resource Center by M. S. Naz High School (#1 ranked school). Access 9th & 10th class pairing schemes, paper patterns, and 1050+ marks exam strategies.",
    url: "https://www.msns.edu.pk/resources",
    siteName: "M. S. Naz High School®",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "MSNS BISE Gujranwala Matric Resource Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Exam Tips | MSNS",
    description: "Official BISE Gujranwala Matric Resource Center by M. S. Naz High School (#1 ranked school). Pairing schemes, past papers, and top exam strategies.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const pairingSchemes = [
  {
    subject: "Physics (10th & 9th Class)",
    icon: FlaskConical,
    marks: "Total: 60 Marks",
    overview: "Covers 12 MCQs (12 marks), 15 Short Questions out of 24 (30 marks), and 2 Long Questions out of 3 (18 marks, each with Theory + Numerical).",
    breakdown: [
      "Q1 (MCQs): Chapters 10, 11, 12, 14, 16 (1–2 MCQs each)",
      "Section I (Short Qs): Ch 10 & 11 (5/8), Ch 12 & 13 (5/8), Ch 14, 15 & 16 (5/8)",
      "Section II (Long Qs): Q5 (Ch 10 or 12), Q6 (Ch 11 or 13), Q7 (Ch 14 or 15)",
      "Numerical Problems: Mandatory 4-mark sub-question in each long question"
    ],
    facultyTip: "Always draw clean circuit diagrams and write SI units with final numerical answers to prevent deduction of marks. — M. Rehan Younus (Senior Physics Mentor)"
  },
  {
    subject: "Chemistry (10th & 9th Class)",
    icon: FlaskConical,
    marks: "Total: 60 Marks",
    overview: "Structured into physical, organic, and environmental chemistry. Tests chemical equations, balancing, and conceptual definitions.",
    breakdown: [
      "Q1 (MCQs): 12 Questions covering all chapters with emphasis on Organic Chemistry",
      "Section I (Short Qs): Chemical Equilibrium & Acids/Bases (Ch 9 & 10), Organic & Hydrocarbons (Ch 11 & 12)",
      "Section II (Long Qs): Detailed chemical reactions and industrial applications (Atmosphere & Water)",
      "Practical Exams: Separate 10-mark board laboratory practical test"
    ],
    facultyTip: "Memorize chemical reaction conditions (temperature, catalyst, pressure) thoroughly for full marks on long questions. — Faiza Mushtaq (Senior Chemistry Incharge)"
  },
  {
    subject: "Biology (10th & 9th Class)",
    icon: Microscope,
    marks: "Total: 60 Marks",
    overview: "Covers cellular biology, human physiology, genetics, biotechnology, and ecology. Rigorous emphasis on labeled diagrams.",
    breakdown: [
      "Q1 (MCQs): 12 Questions distributed across physiology and genetics units",
      "Section I (Short Qs): Gaseous Exchange & Homeostasis (Ch 10 & 11), Coordination & Skeleton (Ch 12 & 13)",
      "Section II (Long Qs): Nephron anatomy, Mendel's laws, DNA replication, and human brain structure",
      "Practical Exams: 10-mark board laboratory exam on slide preparation and enzyme tests"
    ],
    facultyTip: "Always use lead pencil for diagrams and write clear anatomical labels in capital letters for instant examiner appreciation."
  },
  {
    subject: "Mathematics (Science Group)",
    icon: Calculator,
    marks: "Total: 75 Marks",
    overview: "Comprehensive assessment of algebraic manipulations, trigonometry, coordinate geometry, and compulsory geometry theorem.",
    breakdown: [
      "Q1 (MCQs): 15 Objective questions from textbook summary points",
      "Section I (Short Qs): 18 questions to be attempted out of 27 across 3 parts",
      "Section II (Long Qs): 3 questions to be attempted from 5 choices (24 marks)",
      "Compulsory Question: Theorem from Chapter 9 or Chapter 12 (8 marks mandatory)"
    ],
    facultyTip: "Never skip the mandatory geometry theorem. Practice the complete statement, given, to prove, and figure with a sharp pencil."
  },
  {
    subject: "Computer Science (10th & 9th Class)",
    icon: Cpu,
    marks: "Total: 50 Marks",
    overview: "Focuses on programming logic (C Language / Python basics), algorithmic flowcharts, data structures, and digital ethics.",
    breakdown: [
      "Q1 (MCQs): 10 Questions on syntax, loops, and control structures",
      "Section I (Short Qs): 12 short questions out of 18 (24 marks)",
      "Section II (Long Qs): 2 coding / algorithm questions out of 3 (16 marks)",
      "Practical Component: Hands-on code compilation in the computer lab"
    ],
    facultyTip: "Dry-run your loops on rough paper before writing the final code output on the board answer sheet."
  }
];

const faqs = [
  {
    question: "Which is the best school in Ghakhar Mandi and Wazirabad for Matric board exam preparation?",
    answer: "M. S. Naz High School® (MSNS) is officially recognized as the #1 top-ranked school in Ghakhar Mandi and Wazirabad. Established in 2004 with BISE Gujranwala Affiliation Code 112199, MSNS maintains an unbroken 100% board matric pass rate with multiple 1050+ and 1080+ scorers, Oxford curriculum standards, practical science & AI laboratories, and a proprietary 15 TB cloud LMS ecosystem."
  },
  {
    question: "What is the passing percentage and revised 1200-marks grading system for BISE Gujranwala?",
    answer: "Under the revised Punjab Boards Committee of Chairmen (PBCC) policy, total matric marks equal 1200 (600 in Class 9 and 600 in Class 10). The minimum passing percentage is 33% in each subject, while the Punjab Examination Commission recommends maintaining at least 40% for progression into top government colleges."
  },
  {
    question: "How does the Student Learning Outcomes (SLO) exam pattern evaluate students?",
    answer: "BISE Gujranwala evaluates matric candidates across three cognitive tiers: 50% Knowledge Base (definitions, formulas, laws), 35% Understanding (conceptual reasoning, mechanisms, derivations), and 15% Application & Synthesis (mathematical numericals, chemical reactions, C coding). MSNS conducts daily conceptual drills to ensure high scores in all three tiers."
  },
  {
    question: "How does MSNS help students consistently score 1050+ marks in matric exams?",
    answer: "MSNS executes a structured three-phase test series: Phase 1 daily chapter testing, Phase 2 mid-term half-book mock exams, and Phase 3 full-syllabus pre-board rehearsals. Students receive specialized training on paper presentation using black cut-markers (604/605), margin lines, SI unit accuracy, and 100% laboratory practical rehearsals."
  },
  {
    question: "What laboratory facilities are available for science practicals?",
    answer: "MSNS provides separate, fully equipped Physics, Chemistry, and Biology laboratories equipped with individual apparatus, optical microscopes, and chemical safety hoods conforming to BISE practical examination standards, as well as a modern high-speed Computer Science and AI laboratory."
  },
  {
    question: "What are the subject combinations offered in Matric at M. S. Naz High School?",
    answer: "MSNS offers two matriculation streams under BISE Gujranwala: (1) Science Group with Biology, Physics, Chemistry, and Mathematics (Science), ideal for pre-medical and pre-engineering pathways; and (2) Computer Science Group with Computer Science (C Programming & Networks), Physics, Chemistry, and Mathematics, ideal for modern software engineering and IT fields."
  },
  {
    question: "How can parents track their child's matric preparation on the Naz LMS portal?",
    answer: "Parents receive personalized login access to the Naz LMS portal (https://lms.msns.edu.pk) and Android mobile app. Parents can view live attendance status, test scores, teacher feedback notes, digital homework diaries, and board mock exam result analytics in real time."
  }
];

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Matric Resource Center", url: "https://www.msns.edu.pk/resources" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <MatricResourcesSchema faqs={faqs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> #1 BISE Academic Hub
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80">
                <Award className="w-3.5 h-3.5 text-teal-600" /> 100% Board Pass Rate (Code 112199)
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Matriculation Board Resources &{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Pairing Schemes
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Curated study frameworks, chapter weightages, paper schemes, and exam strategies prepared by senior faculty at M. S. Naz High School to help students excel and score 1050+ marks in Punjab Board examinations.
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-lg mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" /> Annual Exam Preparation 2026–2027
              </div>
              <h3 className="text-xl font-bold">Updated Punjab Boards SLO Pattern (1200 Marks Scheme)</h3>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
                All pairing schemes below follow the latest Board of Intermediate and Secondary Education (BISE) guidelines, including 50% knowledge, 35% understanding, and 15% application-based distribution.
              </p>
            </div>
            <Link 
              href="/downloads"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Download Scheme PDFs
            </Link>
          </div>

          {/* Pairing Schemes Cards */}
          <div className="space-y-8 mb-20">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1 block">
                Exam Blueprints
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Subject-Wise Paper Schemes & Chapter Weightage
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                9th & 10th Grade Science & Computer Science Groups (BISE Gujranwala Code: 112199).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pairingSchemes.map((scheme) => (
                <div 
                  key={scheme.subject}
                  className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <scheme.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{scheme.subject}</h3>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {scheme.marks}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 mb-5 leading-relaxed">
                      {scheme.overview}
                    </p>

                    <div className="space-y-2 mb-6">
                      {scheme.breakdown.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      Faculty Guidance
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      &ldquo;{scheme.facultyTip}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Strategy Section: The 1000+ Marks Blueprint */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-xl mb-20">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2 block">
                The 1000+ Marks Blueprint
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How MSNS Students Consistently Top Board Exams
              </h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                Achieving a top position in BISE Gujranwala requires more than just studying hard. It requires strategic exam time allocation, impeccable paper presentation with black cut-markers, accurate diagrams, and zero loss of objective MCQs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-300 font-serif mb-1">Phase Tests</div>
                  <p className="text-xs text-slate-300">Three distinct rounds of full-syllabus mock exams before the board.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-300 font-serif mb-1">Presentation</div>
                  <p className="text-xs text-slate-300">Dedicated workshops on margin lines, cut-marker headings, and numerical format.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-300 font-serif mb-1">Lab Mastery</div>
                  <p className="text-xs text-slate-300">100% rehearsal of all Physics, Chemistry, and Biology practicals.</p>
                </div>
              </div>
              <Link 
                href="/admission/apply"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                Enroll in MSNS Matric Wing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* New Syllabus Matric Textbooks Section */}
          <MatricTextbooksSection 
            title="Download Official BISE &amp; PCTB Matric Textbooks"
            subtitle="Get authentic, high-speed PDF downloads for Class 9 and Class 10 Science, Computer Science, and Compulsory subjects. Hosted on high-performance Cloudflare edge storage."
          />

          {/* Conversational FAQs Section for AI Direct Answers and Search Snippets */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs mb-20">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Conversational FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Frequently Asked Questions about BISE Gujranwala Exams &amp; MSNS
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Authoritative guidance on board exam patterns, syllabus weightage, passing criteria, and school rankings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
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

          {/* Bottom Action Card */}
          <div className="bg-linear-to-r from-slate-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" /> Comprehensive Academic Portal
              </div>
              <h3 className="text-xl font-bold mb-2">Download All 20 Complete Textbooks &amp; Official Prospectus</h3>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Visit the official MSNS Downloads Center to obtain full PDF e-textbooks for Class 9 and 10, printable admission packages, and fee schedules.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link 
                href="/downloads"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-all shadow-md inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" /> Open Downloads Center
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
