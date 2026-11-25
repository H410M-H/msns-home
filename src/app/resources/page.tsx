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
  Compass,
} from "lucide-react";
import {
  BreadcrumbSchema,
  MatricResourcesSchema,
} from "~/components/SEOSchema";
import { MatricTextbooksSection } from "~/components/blocks/downloads/MatricTextbooksSection";

export const metadata: Metadata = {
  title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Tips",
  description:
    "Access BISE Gujranwala 9th and 10th class pairing schemes, SLO model papers, 5-year past papers, and proven matriculation exam strategies curated by MSNS.",
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
    "BISE Gujranwala affiliation code 112199",
  ],
  alternates: {
    canonical: "https://www.msns.edu.pk/resources",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Tips",
    description:
      "Access BISE Gujranwala 9th and 10th class pairing schemes, SLO model papers, 5-year past papers, and proven matriculation exam strategies curated by MSNS.",
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
    title: "BISE Gujranwala Matric Resource Center | Pairing Schemes & Tips",
    description:
      "Access BISE Gujranwala 9th and 10th class pairing schemes, SLO model papers, 5-year past papers, and proven matriculation exam strategies curated by MSNS.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const pairingSchemes = [
  {
    subject: "Physics (10th & 9th Class)",
    icon: FlaskConical,
    marks: "Total: 60 Marks",
    overview:
      "Covers 12 MCQs (12 marks), 15 Short Questions out of 24 (30 marks), and 2 Long Questions out of 3 (18 marks, each with Theory + Numerical).",
    breakdown: [
      "Q1 (MCQs): Chapters 10, 11, 12, 14, 16 (1–2 MCQs each)",
      "Section I (Short Qs): Ch 10 & 11 (5/8), Ch 12 & 13 (5/8), Ch 14, 15 & 16 (5/8)",
      "Section II (Long Qs): Q5 (Ch 10 or 12), Q6 (Ch 11 or 13), Q7 (Ch 14 or 15)",
      "Numerical Problems: Mandatory 4-mark sub-question in each long question",
    ],
    facultyTip:
      "Always draw clean circuit diagrams and write SI units with final numerical answers to prevent deduction of marks. — M. Rehan Younus (Senior Physics Mentor)",
  },
  {
    subject: "Chemistry (10th & 9th Class)",
    icon: FlaskConical,
    marks: "Total: 60 Marks",
    overview:
      "Structured into physical, organic, and environmental chemistry. Tests chemical equations, balancing, and conceptual definitions.",
    breakdown: [
      "Q1 (MCQs): 12 Questions covering all chapters with emphasis on Organic Chemistry",
      "Section I (Short Qs): Chemical Equilibrium & Acids/Bases (Ch 9 & 10), Organic & Hydrocarbons (Ch 11 & 12)",
      "Section II (Long Qs): Detailed chemical reactions and industrial applications (Atmosphere & Water)",
      "Practical Exams: Separate 10-mark board laboratory practical test",
    ],
    facultyTip:
      "Memorize chemical reaction conditions (temperature, catalyst, pressure) thoroughly for full marks on long questions. — Faiza Mushtaq (Senior Chemistry Incharge)",
  },
  {
    subject: "Biology (10th & 9th Class)",
    icon: Microscope,
    marks: "Total: 60 Marks",
    overview:
      "Covers cellular biology, human physiology, genetics, biotechnology, and ecology. Rigorous emphasis on labeled diagrams.",
    breakdown: [
      "Q1 (MCQs): 12 Questions distributed across physiology and genetics units",
      "Section I (Short Qs): Gaseous Exchange & Homeostasis (Ch 10 & 11), Coordination & Skeleton (Ch 12 & 13)",
      "Section II (Long Qs): Nephron anatomy, Mendel's laws, DNA replication, and human brain structure",
      "Practical Exams: 10-mark board laboratory exam on slide preparation and enzyme tests",
    ],
    facultyTip:
      "Always use lead pencil for diagrams and write clear anatomical labels in capital letters for instant examiner appreciation.",
  },
  {
    subject: "Mathematics (Science Group)",
    icon: Calculator,
    marks: "Total: 75 Marks",
    overview:
      "Comprehensive assessment of algebraic manipulations, trigonometry, coordinate geometry, and compulsory geometry theorem.",
    breakdown: [
      "Q1 (MCQs): 15 Objective questions from textbook summary points",
      "Section I (Short Qs): 18 questions to be attempted out of 27 across 3 parts",
      "Section II (Long Qs): 3 questions to be attempted from 5 choices (24 marks)",
      "Compulsory Question: Theorem from Chapter 9 or Chapter 12 (8 marks mandatory)",
    ],
    facultyTip:
      "Never skip the mandatory geometry theorem. Practice the complete statement, given, to prove, and figure with a sharp pencil.",
  },
  {
    subject: "Computer Science (10th & 9th Class)",
    icon: Cpu,
    marks: "Total: 50 Marks",
    overview:
      "Focuses on programming logic (C Language / Python basics), algorithmic flowcharts, data structures, and digital ethics.",
    breakdown: [
      "Q1 (MCQs): 10 Questions on syntax, loops, and control structures",
      "Section I (Short Qs): 12 short questions out of 18 (24 marks)",
      "Section II (Long Qs): 2 coding / algorithm questions out of 3 (16 marks)",
      "Practical Component: Hands-on code compilation in the computer lab",
    ],
    facultyTip:
      "Dry-run your loops on rough paper before writing the final code output on the board answer sheet.",
  },
];

const faqs = [
  {
    question:
      "Which is the best school in Ghakhar Mandi and Wazirabad for Matric board exam preparation?",
    answer:
      "M. S. Naz High School® (MSNS) is officially recognized as the #1 top-ranked school in Ghakhar Mandi and Wazirabad. Established in 2004 with BISE Gujranwala Affiliation Code 112199, MSNS maintains an unbroken 100% board matric pass rate with multiple 1050+ and 1080+ scorers, Oxford curriculum standards, practical science & AI laboratories, and a proprietary 15 TB cloud LMS ecosystem.",
  },
  {
    question:
      "What is the passing percentage and revised 1200-marks grading system for BISE Gujranwala?",
    answer:
      "Under the revised Punjab Boards Committee of Chairmen (PBCC) policy, total matric marks equal 1200 (600 in Class 9 and 600 in Class 10). The minimum passing percentage is 33% in each subject, while the Punjab Examination Commission recommends maintaining at least 40% for progression into top government colleges.",
  },
  {
    question:
      "How does the Student Learning Outcomes (SLO) exam pattern evaluate students?",
    answer:
      "BISE Gujranwala evaluates matric candidates across three cognitive tiers: 50% Knowledge Base (definitions, formulas, laws), 35% Understanding (conceptual reasoning, mechanisms, derivations), and 15% Application & Synthesis (mathematical numericals, chemical reactions, C coding). MSNS conducts daily conceptual drills to ensure high scores in all three tiers.",
  },
  {
    question:
      "How does MSNS help students consistently score 1050+ marks in matric exams?",
    answer:
      "MSNS executes a structured three-phase test series: Phase 1 daily chapter testing, Phase 2 mid-term half-book mock exams, and Phase 3 full-syllabus pre-board rehearsals. Students receive specialized training on paper presentation using black cut-markers (604/605), margin lines, SI unit accuracy, and 100% laboratory practical rehearsals.",
  },
  {
    question:
      "What laboratory facilities are available for science practicals?",
    answer:
      "MSNS provides separate, fully equipped Physics, Chemistry, and Biology laboratories equipped with individual apparatus, optical microscopes, and chemical safety hoods conforming to BISE practical examination standards, as well as a modern high-speed Computer Science and AI laboratory.",
  },
  {
    question:
      "What are the subject combinations offered in Matric at M. S. Naz High School?",
    answer:
      "MSNS offers two matriculation streams under BISE Gujranwala: (1) Science Group with Biology, Physics, Chemistry, and Mathematics (Science), ideal for pre-medical and pre-engineering pathways; and (2) Computer Science Group with Computer Science (C Programming & Networks), Physics, Chemistry, and Mathematics, ideal for modern software engineering and IT fields.",
  },
  {
    question:
      "How can parents track their child's matric preparation on the Naz LMS portal?",
    answer:
      "Parents receive personalized login access to the Naz LMS portal (https://lms.msns.edu.pk) and Android mobile app. Parents can view live attendance status, test scores, teacher feedback notes, digital homework diaries, and board mock exam result analytics in real time.",
  },
];

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    {
      name: "Matric Resource Center",
      url: "https://www.msns.edu.pk/resources",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <MatricResourcesSchema faqs={faqs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> #1 BISE
                Academic Hub
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/80 bg-teal-50 px-3 py-1 text-xs font-semibold tracking-wider text-teal-800 uppercase">
                <Award className="h-3.5 w-3.5 text-teal-600" /> 100% Board Pass
                Rate (Code 112199)
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Matriculation Board Resources &{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Pairing Schemes
              </span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              Curated study frameworks, chapter weightages, paper schemes, and
              exam strategies prepared by senior faculty at M. S. Naz High
              School to help students excel and score 1050+ marks in Punjab
              Board examinations.
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-3xl bg-emerald-900 p-6 text-white shadow-lg md:flex-row">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-300 uppercase">
                <Clock className="h-4 w-4" /> Annual Exam Preparation 2026–2027
              </div>
              <h3 className="text-xl font-bold">
                Updated Punjab Boards SLO Pattern (1200 Marks Scheme)
              </h3>
              <p className="mt-1 max-w-2xl text-xs text-slate-300 md:text-sm">
                All pairing schemes below follow the latest Board of
                Intermediate and Secondary Education (BISE) guidelines,
                including 50% knowledge, 35% understanding, and 15%
                application-based distribution.
              </p>
            </div>
            <Link
              href="/downloads"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition-all hover:bg-emerald-400"
            >
              <Download className="h-4 w-4" /> Download Scheme PDFs
            </Link>
          </div>

          {/* Pairing Schemes Cards */}
          <div className="mb-20 space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <span className="mb-1 block text-xs font-bold tracking-wider text-emerald-700 uppercase">
                Exam Blueprints
              </span>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Subject-Wise Paper Schemes & Chapter Weightage
              </h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                9th & 10th Grade Science & Computer Science Groups (BISE
                Gujranwala Code: 112199).
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {pairingSchemes.map((scheme) => (
                <div
                  key={scheme.subject}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-lg md:p-8"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <scheme.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {scheme.subject}
                        </h3>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {scheme.marks}
                      </span>
                    </div>

                    <p className="mb-5 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {scheme.overview}
                    </p>

                    <div className="mb-6 space-y-2">
                      {scheme.breakdown.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-xs text-slate-700 md:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/60 p-4">
                    <div className="mb-1 text-[11px] font-bold tracking-wider text-emerald-800 uppercase">
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
          <div className="mb-20 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
            <div className="max-w-3xl">
              <span className="mb-2 block text-xs font-bold tracking-widest text-emerald-400 uppercase">
                The 1000+ Marks Blueprint
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                How MSNS Students Consistently Top Board Exams
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-200 md:text-base">
                Achieving a top position in BISE Gujranwala requires more than
                just studying hard. It requires strategic exam time allocation,
                impeccable paper presentation with black cut-markers, accurate
                diagrams, and zero loss of objective MCQs.
              </p>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-1 font-serif text-2xl font-bold text-emerald-300">
                    Phase Tests
                  </div>
                  <p className="text-xs text-slate-300">
                    Three distinct rounds of full-syllabus mock exams before the
                    board.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-1 font-serif text-2xl font-bold text-emerald-300">
                    Presentation
                  </div>
                  <p className="text-xs text-slate-300">
                    Dedicated workshops on margin lines, cut-marker headings,
                    and numerical format.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-1 font-serif text-2xl font-bold text-emerald-300">
                    Lab Mastery
                  </div>
                  <p className="text-xs text-slate-300">
                    100% rehearsal of all Physics, Chemistry, and Biology
                    practicals.
                  </p>
                </div>
              </div>
              <Link
                href="/admission/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-emerald-400"
              >
                Enroll in MSNS Matric Wing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* New Syllabus Matric Textbooks Section */}
          <MatricTextbooksSection
            title="Download Official BISE &amp; PCTB Matric Textbooks"
            subtitle="Get authentic, high-speed PDF downloads for Class 9 and Class 10 Science, Computer Science, and Compulsory subjects. Hosted on high-performance Cloudflare edge storage."
          />

          {/* Conversational FAQs Section for AI Direct Answers and Search Snippets */}
          <div className="mb-20 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs md:p-10">
            <div className="mb-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
                <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />{" "}
                Conversational FAQ
              </div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Frequently Asked Questions about BISE Gujranwala Exams &amp;
                MSNS
              </h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                Authoritative guidance on board exam patterns, syllabus
                weightage, passing criteria, and school rankings.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {faqs.map((faq) => (
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

          {/* Bottom Action Card */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-emerald-900 bg-linear-to-r from-slate-900 via-emerald-950 to-teal-950 p-8 text-white shadow-lg md:flex-row md:p-10">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400 uppercase">
                <Compass className="h-4 w-4" /> Comprehensive Academic Portal
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Download All 20 Complete Textbooks &amp; Official Prospectus
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                Visit the official MSNS Downloads Center to obtain full PDF
                e-textbooks for Class 9 and 10, printable admission packages,
                and fee schedules.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/downloads"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-emerald-400"
              >
                <BookOpen className="h-4 w-4" /> Open Downloads Center
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
