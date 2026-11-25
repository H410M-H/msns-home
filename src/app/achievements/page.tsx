import { type Metadata } from "next";
import Link from "next/link";
import { Trophy, Award, GraduationCap, ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Academic Achievements & Board Results | 100% Matric Pass",
  description:
    "Explore BISE Gujranwala board examination results and honors at MSNS. Over 22 years of academic excellence, 100% matric pass rates, and distinction holders.",
  alternates: {
    canonical: "https://www.msns.edu.pk/achievements",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Academic Achievements & Board Results | 100% Matric Pass",
    description:
      "Explore BISE Gujranwala board examination results and honors at MSNS. Over 22 years of academic excellence, 100% matric pass rates, and distinction holders.",
    url: "https://www.msns.edu.pk/achievements",
    siteName: "M. S. Naz High School®",
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
  twitter: {
    card: "summary_large_image",
    title: "Academic Achievements & Board Results | 100% Matric Pass",
    description:
      "Explore BISE Gujranwala board examination results and honors at MSNS. Over 22 years of academic excellence, 100% matric pass rates, and distinction holders.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const metrics = [
  {
    label: "Board Matric Pass Rate",
    value: "100%",
    detail: "Consistent BISE Gujranwala pass record",
  },
  {
    label: "A+ & A Grade Holders",
    value: "85%+",
    detail: "Across Science and Computer Science groups",
  },
  {
    label: "Years of Educational Legacy",
    value: "22+",
    detail: "Serving the community since 2004",
  },
  {
    label: "Regional Competition Trophies",
    value: "50+",
    detail: "Debates, Science Fairs, and Sports",
  },
];

const achieversList = [
  // --- BISE Gujranwala Matric Distinctions (2025–2026) ---
  {
    name: "M. Zaid Bin Haroon",
    year: 2025,
    rollNo: "403348",
    marks: "1134",
    group: "Science (Matric)",
  },
  {
    name: "Momina",
    year: 2026,
    rollNo: "489953",
    marks: "1122",
    group: "Science (Matric)",
  },
  {
    name: "M. Ali Rafay",
    year: 2025,
    rollNo: "403438",
    marks: "1121",
    group: "Science (Matric)",
  },
  {
    name: "Mukarram Fayaz Cheema",
    year: 2025,
    rollNo: "403773",
    marks: "1120",
    group: "Science (Matric)",
  },
  {
    name: "M. Ibraheem",
    year: 2025,
    rollNo: "403354",
    marks: "1047",
    group: "Science (Matric)",
  },
  {
    name: "Abdul Hadi Warraich",
    year: 2025,
    rollNo: "403623",
    marks: "1045",
    group: "Science (Matric)",
  },
  {
    name: "Umer Saleem",
    year: 2025,
    rollNo: "403497",
    marks: "1044",
    group: "Science (Matric)",
  },
  {
    name: "Faiqa Irfan",
    year: 2023,
    rollNo: "500490",
    marks: "1042",
    group: "Science (Matric)",
  },
  {
    name: "Rehan Akhtar",
    year: 2026,
    rollNo: "403428",
    marks: "1037",
    group: "Computer Science (Matric)",
  },
  {
    name: "Dawood Ali",
    year: 2024,
    rollNo: "402849",
    marks: "1017",
    group: "Science (Matric)",
  },
  {
    name: "Sibgha Farooq Cheema",
    year: 2025,
    rollNo: "482362",
    marks: "1016",
    group: "Science (Matric)",
  },
  {
    name: "Syeda Hadia Kazmi",
    year: 2024,
    rollNo: "484558",
    marks: "1014",
    group: "Science (Matric)",
  },
  {
    name: "Talha Akram",
    year: 2024,
    rollNo: "403068",
    marks: "1014",
    group: "Science (Matric)",
  },
  {
    name: "Nihad Ahmad Bajwa",
    year: 2018,
    rollNo: "406207",
    marks: "1012",
    group: "Science (Matric)",
  },
  {
    name: "Ateeqa Noreen",
    year: 2026,
    rollNo: "490206",
    marks: "1011",
    group: "Science (Matric)",
  },
  {
    name: "Ibrar Hussain Butt",
    year: 2022,
    rollNo: "403416",
    marks: "1005",
    group: "Science (Matric)",
  },
  {
    name: "Ali Hassan Hussain",
    year: 2017,
    rollNo: "416278",
    marks: "1001",
    group: "Science (Matric)",
  },
  {
    name: "Tehreem Naz",
    year: 2016,
    rollNo: "422042",
    marks: "990",
    group: "Science (Matric)",
  },
  {
    name: "Arbab Mushtaq",
    year: 2020,
    rollNo: "489996",
    marks: "970",
    group: "Science (Matric)",
  },
  {
    name: "Hajra Asif",
    year: 2022,
    rollNo: "483997",
    marks: "958",
    group: "Science (Matric)",
  },
  {
    name: "Ali Suleman Butt",
    year: 2019,
    rollNo: "413467",
    marks: "950",
    group: "Science (Matric)",
  },
  {
    name: "Hafsa Asif",
    year: 2015,
    rollNo: "404709",
    marks: "912",
    group: "Science (Matric)",
  },
  {
    name: "Saffa Irfan",
    year: 2016,
    rollNo: "421884",
    marks: "912",
    group: "Science (Matric)",
  },
  {
    name: "Saira Nasar",
    year: 2026,
    rollNo: "489817",
    marks: "909",
    group: "Science (Matric)",
  },
  {
    name: "Saqib Zafar",
    year: 2010,
    rollNo: "BISE-G",
    marks: "899",
    group: "Science (Matric)",
  },
  {
    name: "Shuja Ahmed",
    year: 2026,
    rollNo: "403666",
    marks: "894",
    group: "Computer Science (Matric)",
  },
  {
    name: "Faizan Ali",
    year: 2026,
    rollNo: "403605",
    marks: "892",
    group: "Computer Science (Matric)",
  },
];

const alumniDestinations = [
  {
    university: "NUST (National University of Sciences & Technology)",
    field: "Engineering & Computing",
  },
  {
    university: "FAST-NUCES",
    field: "Computer Science & Artificial Intelligence",
  },
  {
    university: "King Edward Medical University / AIMC",
    field: "MBBS & Medicine",
  },
  {
    university: "LUMS (Lahore University of Management Sciences)",
    field: "Business & Economics",
  },
  { university: "UET Lahore", field: "Mechanical & Electrical Engineering" },
  {
    university: "Armed Forces (PMA Kakul & PAF Academy)",
    field: "Commissioned Officers",
  },
];

export default function AchievementsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.msns.edu.pk" },
    { name: "Achievements", url: "https://www.msns.edu.pk/achievements" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Hero Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-700 uppercase">
              <Trophy className="h-3.5 w-3.5" /> Hall of Fame
            </span>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              A Proven Record of{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Board Distinctions
              </span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              For over two decades, M. S. Naz High School has produced
              exceptional academic achievers, board position holders, and
              distinguished alumni excelling globally.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-2 font-serif text-3xl font-extrabold text-emerald-600 md:text-4xl">
                  {m.value}
                </div>
                <div className="mb-1 text-sm font-bold text-slate-900">
                  {m.label}
                </div>
                <div className="text-xs text-slate-500">{m.detail}</div>
              </div>
            ))}
          </div>

          {/* Achievers Table */}
          <div className="mb-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Matric Board Distinction Holders
                </h2>
                <p className="text-xs text-slate-500 md:text-sm">
                  Affiliated with Board of Intermediate & Secondary Education
                  (BISE) Gujranwala.
                </p>
              </div>
              <span className="self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 md:self-auto">
                Verified Board Credentials
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] tracking-wider text-slate-400 uppercase">
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Exam Year</th>
                    <th className="px-4 py-3">Roll Number</th>
                    <th className="px-4 py-3">Discipline</th>
                    <th className="px-4 py-3 text-right">Marks Secured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {achieversList.map((achiever) => (
                    <tr
                      key={`${achiever.name}-${achiever.year}`}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      <td className="flex items-center gap-2 px-4 py-3.5 font-semibold text-slate-900">
                        <Award className="h-4 w-4 text-emerald-600" />
                        {achiever.name}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">
                        {achiever.year}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                        {achiever.rollNo}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {achiever.group}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-emerald-700">
                        {achiever.marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alumni Placements */}
          <div className="mb-16 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
            <div className="mb-8 max-w-3xl">
              <span className="mb-2 block text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Higher Education Placements
              </span>
              <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                Where Do MSNS Graduates Go?
              </h2>
              <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                Our solid conceptual grounding in Science, Mathematics, and
                Computer Science enables our alumni to secure admissions in
                Pakistan’s premier institutions and professional fields.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {alumniDestinations.map((dest) => (
                <div
                  key={dest.university}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xs"
                >
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <GraduationCap className="h-4 w-4" /> Higher Studies
                  </div>
                  <div className="mb-1 text-sm font-bold text-white">
                    {dest.university}
                  </div>
                  <div className="text-xs text-slate-300">{dest.field}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xs md:p-12">
            <h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
              Give Your Child the Advantage of Excellence
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-sm text-slate-600 md:text-base">
              Join a high school recognized for academic integrity, high board
              scores, and holistic character building.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/admission/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700"
              >
                Apply for Admission <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
