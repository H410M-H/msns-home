import { type Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Faculty & Mentors | Experienced Educators & Subject Specialists",
  description:
    "Meet the qualified faculty and leadership at MSNS. Expert educators with a 1:16 student-teacher ratio committed to Oxford curriculum and board exam success.",
  alternates: {
    canonical: "https://www.msns.edu.pk/faculty",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Faculty & Mentors | Experienced Educators & Subject Specialists",
    description:
      "Meet the qualified faculty and leadership at MSNS. Expert educators with a 1:16 student-teacher ratio committed to Oxford curriculum and board exam success.",
    url: "https://www.msns.edu.pk/faculty",
    siteName: "M. S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Faculty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faculty & Mentors | Experienced Educators & Subject Specialists",
    description:
      "Meet the qualified faculty and leadership at MSNS. Expert educators with a 1:16 student-teacher ratio committed to Oxford curriculum and board exam success.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const leadership = [
  {
    name: "Prof. Azam Siddique",
    role: "Principal & Academic Visionary",
    qualification: "Senior Educationist",
    focus:
      "Institutional governance, curriculum development, and teacher mentorship.",
  },
  {
    name: "Hafiz Faizan Azam",
    role: "Vice Principal & Academic Administrator",
    qualification: "M.Phil / Academic Administration",
    focus:
      "Board exam administration, Oxford syllabus oversight, and student affairs.",
  },
  {
    name: "Hassan Azam",
    role: "Director of Technology & Systems",
    qualification: "IT Systems & EdTech Architect",
    focus:
      "Proprietary LMS management, campus IT infrastructure, and AI lab curriculum.",
  },
];

const secondaryFaculty = [
  {
    name: "Faiza Mushtaq",
    role: "Senior Science Incharge (10th Tulip)",
    department: "Biology & Chemistry",
    experience: "Senior Faculty",
    specialty:
      "BISE Gujranwala Matric Board exam preparation and laboratory practicals.",
  },
  {
    name: "M. Rehan Younus",
    role: "Senior Secondary Incharge (10th Rose)",
    department: "Physics & Mathematics",
    experience: "Senior Faculty",
    specialty:
      "Conceptual physics, quantitative mathematics, and analytical problem-solving.",
  },
  {
    name: "Shagufta Tawakul",
    role: "Senior Secondary Mentor (9th Senior Tulip)",
    department: "Languages & Social Sciences",
    experience: "Experienced Educator",
    specialty:
      "Bilingual English communication, Tarjuma-tul-Quran, and humanities.",
  },
  {
    name: "Sir Waqas Ahmed",
    role: "Secondary Wing Mentor (9th Junior Rose)",
    department: "General Science & Physics",
    experience: "Experienced Educator",
    specialty:
      "Pre-Matric conceptual foundational learning and experimental science.",
  },
  {
    name: "Esha Munir",
    role: "Secondary Class Incharge (9th Senior Rose)",
    department: "Mathematics & Computing",
    experience: "Educator",
    specialty:
      "Algebraic foundations, algorithms, and continuous student assessments.",
  },
  {
    name: "Aminah Noor",
    role: "Secondary Class Incharge (9th Junior Tulip)",
    department: "Chemistry & Biology",
    experience: "Educator",
    specialty: "Interactive science demonstrations and student study routines.",
  },
];

const foundationalFaculty = [
  {
    name: "Farah Naz",
    role: "Montessori Coordinator & Prep Incharge",
    department: "Early Childhood Education",
    specialty:
      "Oxford Phonics, sensory motor development, and foundational English literacy.",
  },
  {
    name: "Zoya Naz",
    role: "Play Group Incharge",
    department: "Early Learning Wing",
    specialty:
      "Socialization, rhyme-based learning, and creative motor activities.",
  },
  {
    name: "Mahnoor Khalid",
    role: "Nursery Wing Incharge",
    department: "Early Learning Wing",
    specialty:
      "Early numeracy, handwriting practice (Khushkhati), and spoken sounds.",
  },
  {
    name: "Fizza Waseem",
    role: "Primary Grade Specialist",
    department: "Primary Education (Oxford Curriculum)",
    specialty:
      "Oxford English reader journals, interactive mathematics, and moral education.",
  },
  {
    name: "Kinza Noreen",
    role: "Middle Wing Mentor",
    department: "General Studies & Urdu",
    specialty:
      "Urdu literature, creative writing, and public speaking coaching.",
  },
  {
    name: "Malaika Shahid",
    role: "Primary Science & STEM Teacher",
    department: "Primary STEM Wing",
    specialty:
      "Activity-based science learning and digital literacy for young learners.",
  },
];

export default function FacultyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Faculty", url: "https://www.msns.edu.pk/faculty" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-700 uppercase">
              <Users className="h-3.5 w-3.5" /> Dedicated Educators
            </span>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Mentorship That Drives{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Academic Success
              </span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              At M. S. Naz High School, our educators do not just deliver
              lectures—they mentor, inspire, and shape characters with a low
              1:16 student-teacher ratio.
            </p>
          </div>

          {/* Mentorship Highlights */}
          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-slate-900">
                  1:16 Student-Teacher Ratio
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  Small class sizes ensure every child receives targeted
                  guidance and individual feedback.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-slate-900">
                  Teacher Mentorship Program
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  Junior educators undergo structured apprenticeships under
                  senior master teachers with 15+ years experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-slate-900">
                  Parent-Teacher Partnership
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  Daily homework logs and attendance tracked in real-time via
                  the MSNS proprietary parent LMS.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Leadership */}
          <div className="mb-20">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Academic Leadership & Governance
              </h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                Providing vision, pedagogical oversight, and technological
                innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {leadership.map((lead) => (
                <div
                  key={lead.name}
                  className="rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {lead.name}
                  </h3>
                  <div className="mb-2 text-xs font-semibold text-emerald-600">
                    {lead.role}
                  </div>
                  <div className="mb-3 text-xs text-slate-400">
                    {lead.qualification}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {lead.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Faculty */}
          <div className="mb-20">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Secondary & Matriculation Department (BISE Gujranwala)
              </h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                Specialized in Science & Computer Science matric board exam
                preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {secondaryFaculty.map((teacher) => (
                <div
                  key={teacher.name}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-emerald-700 uppercase">
                      {teacher.department}
                    </span>
                    <span className="text-xs text-slate-400">
                      {teacher.experience}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-bold text-slate-900">
                    {teacher.name}
                  </h3>
                  <div className="mb-3 text-xs font-medium text-emerald-600">
                    {teacher.role}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {teacher.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Early Years & Primary Faculty */}
          <div className="mb-20">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Primary & Montessori Educators (Oxford Curriculum)
              </h2>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                Cultivating early literacy, phonics, numeracy, and sensory
                curiosity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {foundationalFaculty.map((teacher) => (
                <div
                  key={teacher.name}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                      {teacher.department}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-bold text-slate-900">
                    {teacher.name}
                  </h3>
                  <div className="mb-3 text-xs font-medium text-emerald-600">
                    {teacher.role}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {teacher.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:flex-row md:p-12">
            <div className="max-w-xl">
              <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                Experience Outstanding Teaching
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-200">
                Enroll your child at M. S. Naz High School to benefit from
                personalized instruction, rigorous Oxford academic standards,
                and compassionate mentoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-emerald-400"
                >
                  Apply for Admission <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                >
                  Visit Campus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
