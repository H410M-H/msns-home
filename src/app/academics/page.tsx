import { type Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Cpu,
  FlaskConical,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Academic Programs & Curriculum | Oxford & BISE Matric",
  description:
    "Explore academic programs at MSNS featuring Oxford curriculum for primary and middle grades, BISE Gujranwala matric science streams, and advanced STEM education.",
  alternates: {
    canonical: "https://www.msns.edu.pk/academics",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Academic Programs & Curriculum | Oxford & BISE Matric",
    description:
      "Explore academic programs at MSNS featuring Oxford curriculum for primary and middle grades, BISE Gujranwala matric science streams, and advanced STEM education.",
    url: "https://www.msns.edu.pk/academics",
    siteName: "M. S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Academics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Programs & Curriculum | Oxford & BISE Matric",
    description:
      "Explore academic programs at MSNS featuring Oxford curriculum for primary and middle grades, BISE Gujranwala matric science streams, and advanced STEM education.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const programs = [
  {
    badge: "Foundational Years",
    title: "Early Years & Montessori",
    subtitle: "Playgroup to Kindergarten",
    description:
      "A nurturing, activity-based environment combining sensory Montessori methodologies with Oxford phonics and early numeracy. Fostering curiosity, social skills, and self-confidence.",
    highlights: [
      "Oxford Early Years Phonics & Reading program",
      "Hands-on sensory motor activities",
      "Safe, vibrant and dedicated indoor play zone",
      "Individualized child care with high mentor-to-child ratio",
    ],
    color:
      "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600",
  },
  {
    badge: "Core Development",
    title: "Primary Wing",
    subtitle: "Grades 1 to 5",
    description:
      "Structured academic rigor following Oxford University Press standards. We emphasize conceptual understanding in Mathematics, Science, English, and Urdu alongside moral education.",
    highlights: [
      "Oxford University Press syllabus & reading journals",
      "Interactive Digital Literacy & early STEM concepts",
      "Daily public speaking & assembly presentations",
      "Continuous formative assessment with LMS homework tracking",
    ],
    color:
      "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600",
  },
  {
    badge: "Preparatory Stage",
    title: "Middle School Wing",
    subtitle: "Grades 6 to 8",
    description:
      "Transitioning students toward independent analytical thinking and deep conceptual mastery in preparation for the Board of Intermediate and Secondary Education (BISE) curriculum.",
    highlights: [
      "Pre-Matric foundational physics, chemistry, and biology",
      "Advanced computer science & coding algorithms",
      "Debating society, sports championships, and science fairs",
      "Remedial mentoring sessions for individual learning paces",
    ],
    color: "from-sky-500/10 to-blue-500/10 border-sky-500/20 text-sky-600",
  },
  {
    badge: "Board Certified",
    title: "Matriculation Wing (BISE Gujranwala)",
    subtitle: "Grades 9 & 10",
    description:
      "Officially affiliated with BISE Gujranwala. Comprehensive preparation with experienced subject mentors, regular past-paper drills, laboratory practicals, and test series.",
    highlights: [
      "Science Group (Physics, Chemistry, Biology & Mathematics)",
      "Computer Science Group (Modern IT, Coding, Physics & Math)",
      "Fully equipped science and computer laboratories",
      "Consistent 100% pass rates & top regional board marks",
    ],
    color:
      "from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-600",
  },
];

const pillars = [
  {
    icon: FlaskConical,
    title: "60% Practical Learning",
    description:
      "We bridge theoretical textbook knowledge with structured laboratory experiments and interactive models.",
  },
  {
    icon: Cpu,
    title: "AI & Modern STEM Curriculum",
    description:
      "Future-ready technology education covering algorithmic thinking, digital tools, and practical computing skills.",
  },
  {
    icon: BookOpen,
    title: "Oxford Partnership",
    description:
      "Collaboration with Oxford University Press ensures modern pedagogical techniques and international English benchmarks.",
  },
  {
    icon: Award,
    title: "BISE Gujranwala Excellence",
    description:
      "Proven track record of high achievement in 9th and 10th grade Punjab Board examinations.",
  },
];

export default function AcademicsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Academics", url: "https://www.msns.edu.pk/academics" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Header Banner */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-700 uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Academic Excellence
            </span>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Curricula Designed for the{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Future Generation
              </span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              At M. S. Naz High School, we combine Oxford academic standards,
              BISE Gujranwala board affiliation, and an industry-leading
              practical AI & science curriculum.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Programs Section */}
          <div className="mb-20 space-y-10">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Educational Wings & Offerings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                From early childhood discovery to Matriculation board
                distinctions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {programs.map((prog) => (
                <div
                  key={prog.title}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-lg"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${prog.color}`}
                      >
                        {prog.badge}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {prog.subtitle}
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-slate-900">
                      {prog.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-slate-600">
                      {prog.description}
                    </p>
                    <div className="mb-6 space-y-2.5">
                      {prog.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-emerald-700">
                      Admissions Open 2026–2027
                    </span>
                    <Link
                      href="/admission"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 transition-colors hover:text-emerald-600"
                    >
                      Apply for Wing <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI & STEM Deep Dive Banner */}
          <div className="mb-20 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
            <div className="max-w-3xl">
              <span className="mb-2 inline-block text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Tech-Forward Learning
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Why MSNS AI & Science Curriculum Leads Punjab
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-slate-200 md:text-base">
                Unlike traditional schools that teach computer studies solely
                from outdated theory textbooks, MSNS equips students with a 60%
                practical syllabus. Students interact with logic algorithms,
                multimedia editing, coding, and modern science experiments under
                experienced faculty.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/admission/apply"
                  className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-emerald-400"
                >
                  Enroll Your Child
                </Link>
                <Link
                  href="/campus"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                >
                  Explore Science & AI Labs
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8 text-center md:p-12">
            <h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
              Experience the MSNS Difference
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-sm text-slate-600 md:text-base">
              Visit our campus on G.T. Road, Ghakhar, opposite Model Police
              Station, or get in touch with our academic counselors today.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
              >
                Schedule Campus Visit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
