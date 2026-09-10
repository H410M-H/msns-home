import { type Metadata } from "next";
import Link from "next/link";
import { 
  BookOpen, 
  Cpu, 
  FlaskConical, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ArrowRight
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Academic Programs & Curricula | M. S. Naz High School® | Oxford & Matric",
  description: "Explore academic programs at M. S. Naz High School. Oxford-aligned primary & middle school curriculum, BISE Gujranwala matriculation in Science & Computer Science, and hands-on AI labs.",
  alternates: {
    canonical: "https://www.msns.edu.pk/academics",
  },
  openGraph: {
    title: "Academic Programs & Curricula | M. S. Naz High School®",
    description: "Oxford-aligned primary & middle school curriculum, BISE Gujranwala matriculation in Science & Computer Science, and hands-on AI labs.",
    url: "https://www.msns.edu.pk/academics",
    siteName: "M.S. Naz High School®",
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
};

const programs = [
  {
    badge: "Foundational Years",
    title: "Early Years & Montessori",
    subtitle: "Playgroup to Kindergarten",
    description: "A nurturing, activity-based environment combining sensory Montessori methodologies with Oxford phonics and early numeracy. Fostering curiosity, social skills, and self-confidence.",
    highlights: [
      "Oxford Early Years Phonics & Reading program",
      "Hands-on sensory motor activities",
      "Safe, vibrant and dedicated indoor play zone",
      "Individualized child care with high mentor-to-child ratio"
    ],
    color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600"
  },
  {
    badge: "Core Development",
    title: "Primary Wing",
    subtitle: "Grades 1 to 5",
    description: "Structured academic rigor following Oxford University Press standards. We emphasize conceptual understanding in Mathematics, Science, English, and Urdu alongside moral education.",
    highlights: [
      "Oxford University Press syllabus & reading journals",
      "Interactive Digital Literacy & early STEM concepts",
      "Daily public speaking & assembly presentations",
      "Continuous formative assessment with LMS homework tracking"
    ],
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600"
  },
  {
    badge: "Preparatory Stage",
    title: "Middle School Wing",
    subtitle: "Grades 6 to 8",
    description: "Transitioning students toward independent analytical thinking and deep conceptual mastery in preparation for the Board of Intermediate and Secondary Education (BISE) curriculum.",
    highlights: [
      "Pre-Matric foundational physics, chemistry, and biology",
      "Advanced computer science & coding algorithms",
      "Debating society, sports championships, and science fairs",
      "Remedial mentoring sessions for individual learning paces"
    ],
    color: "from-sky-500/10 to-blue-500/10 border-sky-500/20 text-sky-600"
  },
  {
    badge: "Board Certified",
    title: "Matriculation Wing (BISE Gujranwala)",
    subtitle: "Grades 9 & 10",
    description: "Officially affiliated with BISE Gujranwala. Comprehensive preparation with experienced subject mentors, regular past-paper drills, laboratory practicals, and test series.",
    highlights: [
      "Science Group (Physics, Chemistry, Biology & Mathematics)",
      "Computer Science Group (Modern IT, Coding, Physics & Math)",
      "Fully equipped science and computer laboratories",
      "Consistent 100% pass rates & top regional board marks"
    ],
    color: "from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-600"
  }
];

const pillars = [
  {
    icon: FlaskConical,
    title: "60% Practical Learning",
    description: "We bridge theoretical textbook knowledge with structured laboratory experiments and interactive models."
  },
  {
    icon: Cpu,
    title: "AI & Modern STEM Curriculum",
    description: "Future-ready technology education covering algorithmic thinking, digital tools, and practical computing skills."
  },
  {
    icon: BookOpen,
    title: "Oxford Partnership",
    description: "Collaboration with Oxford University Press ensures modern pedagogical techniques and international English benchmarks."
  },
  {
    icon: Award,
    title: "BISE Gujranwala Excellence",
    description: "Proven track record of high achievement in 9th and 10th grade Punjab Board examinations."
  }
];

export default function AcademicsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Academics", url: "https://www.msns.edu.pk/academics" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Academic Excellence
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Curricula Designed for the{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Future Generation
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              At M. S. Naz High School, we combine Oxford academic standards, BISE Gujranwala board affiliation, and an industry-leading practical AI & science curriculum.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {pillars.map((pillar) => (
              <div 
                key={pillar.title} 
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Programs Section */}
          <div className="space-y-10 mb-20">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Educational Wings & Offerings
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                From early childhood discovery to Matriculation board distinctions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((prog) => (
                <div 
                  key={prog.title}
                  className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${prog.color}`}>
                        {prog.badge}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {prog.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {prog.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {prog.description}
                    </p>
                    <div className="space-y-2.5 mb-6">
                      {prog.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700">Admissions Open 2026–2027</span>
                    <Link 
                      href="/admission"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      Apply for Wing <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI & STEM Deep Dive Banner */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-xl mb-20">
            <div className="max-w-3xl">
              <span className="inline-block text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2">
                Tech-Forward Learning
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why MSNS AI & Science Curriculum Leads Punjab
              </h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                Unlike traditional schools that teach computer studies solely from outdated theory textbooks, MSNS equips students with a 60% practical syllabus. Students interact with logic algorithms, multimedia editing, coding, and modern science experiments under experienced faculty.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/admission/apply"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all"
                >
                  Enroll Your Child
                </Link>
                <Link 
                  href="/campus"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
                >
                  Explore Science & AI Labs
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-emerald-50/60 rounded-3xl border border-emerald-100 p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Experience the MSNS Difference
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
              Visit our campus on G.T. Road, Ghakhar, opposite Model Police Station, or get in touch with our academic counselors today.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-sm"
              >
                Schedule Campus Visit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
