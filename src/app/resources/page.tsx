import { type Metadata } from "next";
import Link from "next/link";
import { 
  BookOpen, 
  FileText, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  HelpCircle,
  Clock,
  FlaskConical,
  Calculator,
  Cpu
} from "lucide-react";
import { BreadcrumbSchema, FAQSchema } from "~/components/SEOSchema";
import { MatricTextbooksSection } from "~/components/blocks/downloads/MatricTextbooksSection";

export const metadata: Metadata = {
  title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Exam Tips | MSNS",
  description: "Official BISE Gujranwala Matric Resource Center by M. S. Naz High School. Access 9th & 10th class pairing schemes, paper patterns, past papers, and expert exam tips for 1000+ marks.",
  alternates: {
    canonical: "https://www.msns.edu.pk/resources",
  },
  openGraph: {
    title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Exam Tips | MSNS",
    description: "Official BISE Gujranwala Matric Resource Center by M. S. Naz High School. Access 9th & 10th class pairing schemes and expert exam tips.",
    url: "https://www.msns.edu.pk/resources",
    siteName: "M.S. Naz High School®",
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
    question: "What is the passing percentage for BISE Gujranwala Matriculation?",
    answer: "As per updated Punjab Board regulations, the minimum passing percentage is 33% in each subject, while the Punjab Examination Commission recommends maintaining at least 40% for progression."
  },
  {
    question: "How does the SLO (Student Learning Outcomes) based paper pattern work?",
    answer: "BISE Gujranwala exams feature 70% knowledge-based questions and 30% conceptual/analytical (SLO-based) questions. MSNS prepares students with conceptual clarity rather than rote memorization."
  },
  {
    question: "When are the 9th and 10th class BISE Gujranwala annual board exams held?",
    answer: "10th Class annual exams typically commence in early March, followed by 9th Class exams in late March and April. Practical examinations for science subjects follow immediately after theory papers."
  },
  {
    question: "How does MSNS help students secure 1000+ marks in Matric?",
    answer: "MSNS conducts structured three-phase test series, daily past-paper drilling under BISE-experienced mentors, personalized weak-area remedial classes, and full laboratory practical rehearsals."
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
      <FAQSchema items={faqs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <Award className="w-3.5 h-3.5" /> BISE Gujranwala Academic Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Matriculation Board Resources &{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Pairing Schemes
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Curated study frameworks, chapter weightages, paper schemes, and exam strategies prepared by senior faculty at M. S. Naz High School to help students excel in Punjab Board examinations.
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-lg mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" /> Annual Exam Preparation 2026–2027
              </div>
              <h3 className="text-xl font-bold">Updated Punjab Boards SLO Pattern</h3>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
                All pairing schemes below follow the latest Board of Intermediate and Secondary Education (BISE) guidelines, including knowledge, understanding, and application-based distribution.
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Subject-Wise Paper Schemes & Chapter Weightage
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                9th & 10th Grade Science & Computer Science Groups (BISE Gujranwala).
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

          {/* Exam Strategy Section */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-xl mb-20">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2 block">
                The 1000+ Marks Blueprint
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How MSNS Students Consistently Top Board Exams
              </h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                Achieving a top position in BISE Gujranwala requires more than just studying hard. It requires strategic exam time allocation, impeccable paper presentation with black markers, accurate diagrams, and zero loss of objective MCQs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-300 font-serif mb-1">Phase Tests</div>
                  <p className="text-xs text-slate-300">Three distinct rounds of full-syllabus mock exams before the board.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-300 font-serif mb-1">Presentation</div>
                  <p className="text-xs text-slate-300">Dedicated workshops on margin lines, headings, and numerical format.</p>
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
            title="Download Official BISE & PCTB Matric Textbooks"
            subtitle="Get authentic, high-speed PDF downloads for Class 9 and Class 10 Science, Computer Science, and Compulsory subjects. Hosted on high-performance Cloudflare R2 storage."
          />

          {/* FAQs Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs mb-20">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">
                Common Inquiries
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Frequently Asked Questions about BISE Gujranwala Exams
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
