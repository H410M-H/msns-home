import { type Metadata } from "next";
import Link from "next/link";
import { 
  GraduationCap, 
  Users, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Faculty & Academic Leadership | M. S. Naz High School®",
  description: "Meet the dedicated educators and academic leadership of M. S. Naz High School. Experienced subject specialists, mentor-to-student ratio of 1:16, and professional educator training.",
  alternates: {
    canonical: "https://www.msns.edu.pk/faculty",
  },
  openGraph: {
    title: "Faculty & Academic Leadership | M. S. Naz High School®",
    description: "Meet the dedicated educators and academic leadership of M. S. Naz High School.",
    url: "https://www.msns.edu.pk/faculty",
    siteName: "M.S. Naz High School®",
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
};

const leadership = [
  {
    name: "Prof. Azam Siddique",
    role: "Principal & Academic Visionary",
    qualification: "Senior Educationist",
    focus: "Institutional governance, curriculum development, and teacher mentorship."
  },
  {
    name: "Hafiz Faizan Azam",
    role: "Vice Principal & Academic Administrator",
    qualification: "M.Phil / Academic Administration",
    focus: "Board exam administration, Oxford syllabus oversight, and student affairs."
  },
  {
    name: "Hassan Azam",
    role: "Director of Technology & Systems",
    qualification: "IT Systems & EdTech Architect",
    focus: "Proprietary LMS management, campus IT infrastructure, and AI lab curriculum."
  }
];

const secondaryFaculty = [
  {
    name: "Faiza Mushtaq",
    role: "Senior Science Incharge (10th Tulip)",
    department: "Biology & Chemistry",
    experience: "Senior Faculty",
    specialty: "BISE Gujranwala Matric Board exam preparation and laboratory practicals."
  },
  {
    name: "M. Rehan Younus",
    role: "Senior Secondary Incharge (10th Rose)",
    department: "Physics & Mathematics",
    experience: "Senior Faculty",
    specialty: "Conceptual physics, quantitative mathematics, and analytical problem-solving."
  },
  {
    name: "Shagufta Tawakul",
    role: "Senior Secondary Mentor (9th Senior Tulip)",
    department: "Languages & Social Sciences",
    experience: "Experienced Educator",
    specialty: "Bilingual English communication, Tarjuma-tul-Quran, and humanities."
  },
  {
    name: "Sir Waqas Ahmed",
    role: "Secondary Wing Mentor (9th Junior Rose)",
    department: "General Science & Physics",
    experience: "Experienced Educator",
    specialty: "Pre-Matric conceptual foundational learning and experimental science."
  },
  {
    name: "Esha Munir",
    role: "Secondary Class Incharge (9th Senior Rose)",
    department: "Mathematics & Computing",
    experience: "Educator",
    specialty: "Algebraic foundations, algorithms, and continuous student assessments."
  },
  {
    name: "Aminah Noor",
    role: "Secondary Class Incharge (9th Junior Tulip)",
    department: "Chemistry & Biology",
    experience: "Educator",
    specialty: "Interactive science demonstrations and student study routines."
  }
];

const foundationalFaculty = [
  {
    name: "Farah Naz",
    role: "Montessori Coordinator & Prep Incharge",
    department: "Early Childhood Education",
    specialty: "Oxford Phonics, sensory motor development, and foundational English literacy."
  },
  {
    name: "Zoya Naz",
    role: "Play Group Incharge",
    department: "Early Learning Wing",
    specialty: "Socialization, rhyme-based learning, and creative motor activities."
  },
  {
    name: "Mahnoor Khalid",
    role: "Nursery Wing Incharge",
    department: "Early Learning Wing",
    specialty: "Early numeracy, handwriting practice (Khushkhati), and spoken sounds."
  },
  {
    name: "Fizza Waseem",
    role: "Primary Grade Specialist",
    department: "Primary Education (Oxford Curriculum)",
    specialty: "Oxford English reader journals, interactive mathematics, and moral education."
  },
  {
    name: "Kinza Noreen",
    role: "Middle Wing Mentor",
    department: "General Studies & Urdu",
    specialty: "Urdu literature, creative writing, and public speaking coaching."
  },
  {
    name: "Malaika Shahid",
    role: "Primary Science & STEM Teacher",
    department: "Primary STEM Wing",
    specialty: "Activity-based science learning and digital literacy for young learners."
  }
];

export default function FacultyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Faculty", url: "https://www.msns.edu.pk/faculty" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <Users className="w-3.5 h-3.5" /> Dedicated Educators
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Mentorship That Drives{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Academic Success
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              At M. S. Naz High School, our educators do not just deliver lectures—they mentor, inspire, and shape characters with a low 1:16 student-teacher ratio.
            </p>
          </div>

          {/* Mentorship Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">1:16 Student-Teacher Ratio</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Small class sizes ensure every child receives targeted guidance and individual feedback.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Teacher Mentorship Program</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Junior educators undergo structured apprenticeships under senior master teachers with 15+ years experience.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Parent-Teacher Partnership</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Daily homework logs and attendance tracked in real-time via the MSNS proprietary parent LMS.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Leadership */}
          <div className="mb-20">
            <div className="border-b border-slate-200 pb-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Academic Leadership & Governance
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Providing vision, pedagogical oversight, and technological innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadership.map((lead) => (
                <div key={lead.name} className="p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-xs hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{lead.name}</h3>
                  <div className="text-xs font-semibold text-emerald-600 mb-2">{lead.role}</div>
                  <div className="text-xs text-slate-400 mb-3">{lead.qualification}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{lead.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Faculty */}
          <div className="mb-20">
            <div className="border-b border-slate-200 pb-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Secondary & Matriculation Department (BISE Gujranwala)
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Specialized in Science & Computer Science matric board exam preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryFaculty.map((teacher) => (
                <div key={teacher.name} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      {teacher.department}
                    </span>
                    <span className="text-xs text-slate-400">{teacher.experience}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{teacher.name}</h3>
                  <div className="text-xs text-emerald-600 font-medium mb-3">{teacher.role}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{teacher.specialty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Early Years & Primary Faculty */}
          <div className="mb-20">
            <div className="border-b border-slate-200 pb-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Primary & Montessori Educators (Oxford Curriculum)
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                Cultivating early literacy, phonics, numeracy, and sensory curiosity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundationalFaculty.map((teacher) => (
                <div key={teacher.name} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {teacher.department}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{teacher.name}</h3>
                  <div className="text-xs text-emerald-600 font-medium mb-3">{teacher.role}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{teacher.specialty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Experience Outstanding Teaching
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed mb-6">
                Enroll your child at M. S. Naz High School to benefit from personalized instruction, rigorous Oxford academic standards, and compassionate mentoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/admission"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  Apply for Admission <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
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
