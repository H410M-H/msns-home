import { type Metadata } from "next";
import Link from "next/link";
import { 
  Trophy, 
  Award, 
  GraduationCap, 
  ArrowRight
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Board Results & Academic Achievements | M. S. Naz High School®",
  description: "Explore the academic achievements and BISE Gujranwala matriculation results of M. S. Naz High School students. Consistent 100% pass rates, distinction holders, and university alumni success.",
  alternates: {
    canonical: "https://www.msns.edu.pk/achievements",
  },
  openGraph: {
    title: "Board Results & Academic Achievements | M. S. Naz High School®",
    description: "Explore the academic achievements and BISE Gujranwala matriculation results of M. S. Naz High School students.",
    url: "https://www.msns.edu.pk/achievements",
    siteName: "M.S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Achievements",
      },
    ],
  },
};

const metrics = [
  { label: "Board Matric Pass Rate", value: "100%", detail: "Consistent BISE Gujranwala pass record" },
  { label: "A+ & A Grade Holders", value: "85%+", detail: "Across Science and Computer Science groups" },
  { label: "Years of Educational Legacy", value: "22+", detail: "Serving the community since 2004" },
  { label: "Regional Competition Trophies", value: "50+", detail: "Debates, Science Fairs, and Sports" },
];

const achieversList = [
  // --- BISE Gujranwala Matric Distinctions (2025–2026) ---
  { name: "M. Zaid Bin Haroon", year: 2025, rollNo: "403348", marks: "1134", group: "Science (Matric)" },
  { name: "Momina", year: 2026, rollNo: "489953", marks: "1122", group: "Science (Matric)" },
  { name: "M. Ali Rafay", year: 2025, rollNo: "403438", marks: "1121", group: "Science (Matric)" },
  { name: "Mukarram Fayaz Cheema", year: 2025, rollNo: "403773", marks: "1120", group: "Science (Matric)" },
  { name: "M. Ibraheem", year: 2025, rollNo: "403354", marks: "1047", group: "Science (Matric)" },
  { name: "Abdul Hadi Warraich", year: 2025, rollNo: "403623", marks: "1045", group: "Science (Matric)" },
  { name: "Umer Saleem", year: 2025, rollNo: "403497", marks: "1044", group: "Science (Matric)" },
  { name: "Faiqa Irfan", year: 2023, rollNo: "500490", marks: "1042", group: "Science (Matric)" },
  { name: "Rehan Akhtar", year: 2026, rollNo: "403428", marks: "1037", group: "Computer Science (Matric)" },
  { name: "Dawood Ali", year: 2024, rollNo: "402849", marks: "1017", group: "Science (Matric)" },
  { name: "Sibgha Farooq Cheema", year: 2025, rollNo: "482362", marks: "1016", group: "Science (Matric)" },
  { name: "Syeda Hadia Kazmi", year: 2024, rollNo: "484558", marks: "1014", group: "Science (Matric)" },
  { name: "Talha Akram", year: 2024, rollNo: "403068", marks: "1014", group: "Science (Matric)" },
  { name: "Nihad Ahmad Bajwa", year: 2018, rollNo: "406207", marks: "1012", group: "Science (Matric)" },
  { name: "Ateeqa Noreen", year: 2026, rollNo: "490206", marks: "1011", group: "Science (Matric)" },
  { name: "Ibrar Hussain Butt", year: 2022, rollNo: "403416", marks: "1005", group: "Science (Matric)" },
  { name: "Ali Hassan Hussain", year: 2017, rollNo: "416278", marks: "1001", group: "Science (Matric)" },
  { name: "Tehreem Naz", year: 2016, rollNo: "422042", marks: "990", group: "Science (Matric)" },
  { name: "Arbab Mushtaq", year: 2020, rollNo: "489996", marks: "970", group: "Science (Matric)" },
  { name: "Hajra Asif", year: 2022, rollNo: "483997", marks: "958", group: "Science (Matric)" },
  { name: "Ali Suleman Butt", year: 2019, rollNo: "413467", marks: "950", group: "Science (Matric)" },
  { name: "Hafsa Asif", year: 2015, rollNo: "404709", marks: "912", group: "Science (Matric)" },
  { name: "Saffa Irfan", year: 2016, rollNo: "421884", marks: "912", group: "Science (Matric)" },
  { name: "Saira Nasar", year: 2026, rollNo: "489817", marks: "909", group: "Science (Matric)" },
  { name: "Saqib Zafar", year: 2010, rollNo: "BISE-G", marks: "899", group: "Science (Matric)" },
  { name: "Shuja Ahmed", year: 2026, rollNo: "403666", marks: "894", group: "Computer Science (Matric)" },
  { name: "Faizan Ali", year: 2026, rollNo: "403605", marks: "892", group: "Computer Science (Matric)" },
];

const alumniDestinations = [
  { university: "NUST (National University of Sciences & Technology)", field: "Engineering & Computing" },
  { university: "FAST-NUCES", field: "Computer Science & Artificial Intelligence" },
  { university: "King Edward Medical University / AIMC", field: "MBBS & Medicine" },
  { university: "LUMS (Lahore University of Management Sciences)", field: "Business & Economics" },
  { university: "UET Lahore", field: "Mechanical & Electrical Engineering" },
  { university: "Armed Forces (PMA Kakul & PAF Academy)", field: "Commissioned Officers" },
];

export default function AchievementsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Achievements", url: "https://www.msns.edu.pk/achievements" }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 mb-4">
              <Trophy className="w-3.5 h-3.5" /> Hall of Fame
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              A Proven Record of{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Board Distinctions
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              For over two decades, M. S. Naz High School has produced exceptional academic achievers, board position holders, and distinguished alumni excelling globally.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {metrics.map((m) => (
              <div 
                key={m.label}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-600 font-serif mb-2">
                  {m.value}
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">{m.label}</div>
                <div className="text-xs text-slate-500">{m.detail}</div>
              </div>
            ))}
          </div>

          {/* Achievers Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Matric Board Distinction Holders
                </h2>
                <p className="text-xs md:text-sm text-slate-500">
                  Affiliated with Board of Intermediate & Secondary Education (BISE) Gujranwala.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start md:self-auto">
                Verified Board Credentials
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Exam Year</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4 text-right">Marks Secured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {achieversList.map((achiever) => (
                    <tr key={`${achiever.name}-${achiever.year}`} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        {achiever.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{achiever.year}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{achiever.rollNo}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                          {achiever.group}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                        {achiever.marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alumni Placements */}
          <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-xl mb-16">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2 block">
                Higher Education Placements
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Where Do MSNS Graduates Go?
              </h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                Our solid conceptual grounding in Science, Mathematics, and Computer Science enables our alumni to secure admissions in Pakistan’s premier institutions and professional fields.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alumniDestinations.map((dest) => (
                <div key={dest.university} className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-1">
                    <GraduationCap className="w-4 h-4" /> Higher Studies
                  </div>
                  <div className="font-bold text-sm text-white mb-1">{dest.university}</div>
                  <div className="text-xs text-slate-300">{dest.field}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="text-center bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xs">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Give Your Child the Advantage of Excellence
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
              Join a high school recognized for academic integrity, high board scores, and holistic character building.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/admission/apply"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md"
              >
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
