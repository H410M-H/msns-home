/**
 * Content for the About page.
 *
 * Every fact here is taken from copy that already exists elsewhere on the
 * site (SEOSchema organization data, the founder's message, the academics,
 * campus, faculty and achievements pages). Do not add statistics, dates or
 * names that are not verified by the school.
 *
 * Sections that need content the site does not have yet are listed under
 * `pendingContent` with `TODO(content)` markers. They stay hidden until
 * `enabled` is switched on and real copy is supplied.
 */

export const FOUNDING_YEAR = 2004;

/** Years the school has been serving, computed at build/render time. */
export function yearsOfService(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDING_YEAR;
}

export const school = {
  name: "M. S. Naz High School®",
  shortName: "MSNS",
  motto: "Pursuit of Excellence | Know Thyself",
  tagline: "Nurturing Minds, Shaping Futures",
  founder: "Haji Muhammad Siddique Naz",
  boardAffiliation: "BISE Gujranwala",
  boardCode: "112199",
  registration: "PEPRIS (Punjab Education Sector Reform Programme) registered",
  address: {
    street: "G.T. Road, Opposite Model Police Station",
    locality: "Ghakhar Mandi",
    region: "Punjab",
    postalCode: "52200",
  },
  hours: "Monday – Saturday, 7:30 AM – 2:00 PM",
  phones: ["+92-318-7625415", "+92-301-6233609"],
  email: "info@msns.edu.pk",
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJ4RLlGhQnHzkRzxw0rAyLcko",
  lmsUrl: "https://lms.msns.edu.pk",
} as const;

export const mission =
  "At M.S.NAZ High School, we are committed to providing a nurturing and challenging educational environment that empowers students to become lifelong learners, critical thinkers, and responsible global citizens.";

export const founderMessage = {
  salutation: "Dear Students, Parents, and Esteemed Community Members",
  paragraphs: [
    "Welcome to M. S. Naz High School®, established in 2004 with a steadfast commitment to excellence in education. Our mission is to provide a nurturing and innovative environment that cultivates academic achievement, creativity, and strong character.",
    "We are proud of our dedicated educators who inspire critical thinking and prepare our students for the challenges of a dynamic world. Our success is a collaborative effort, and together we continue to shape future leaders with integrity, respect, and perseverance. Thank you for your continued trust and support.",
  ],
  name: "Haji Muhammad Siddique Naz",
  title: "Founder, M. S. Naz High School®",
  image: "/api/images/resolve/haji_muhammad_siddique_naz_d5ct3l.jpg",
} as const;

export const values = [
  {
    title: "Excellence",
    summary:
      "We strive for excellence in all aspects of education and personal development.",
    detail:
      "Our commitment to excellence is reflected in our rigorous academic programs, modern facilities, and highly qualified faculty.",
  },
  {
    title: "Integrity",
    summary:
      "We foster honesty, ethics, and accountability in all our interactions.",
    detail:
      "We believe that integrity is the foundation of character development and essential for creating a respectful and trustworthy community.",
  },
  {
    title: "Innovation",
    summary:
      "We embrace creativity, critical thinking, and forward-looking approaches to education.",
    detail:
      "Our teaching methods and curriculum prepare students for the challenges of a rapidly changing world and inspire them to become problem-solvers.",
  },
] as const;

/** Headline figures, as already published on the achievements and faculty pages. */
export const keyFigures = [
  { value: "100%", label: "Board matric pass rate", note: "BISE Gujranwala" },
  { value: "85%+", label: "A+ & A grade holders", note: "Science & CS groups" },
  { value: "1:16", label: "Student–teacher ratio", note: "Across all wings" },
  {
    value: "50+",
    label: "Regional trophies",
    note: "Debates, science, sports",
  },
] as const;

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

/**
 * Only milestones that can be dated from existing site content.
 * TODO(content): add verified milestones (e.g. when the matric wing, the
 * science labs, the solar system or the LMS were introduced).
 */
export const milestones: Milestone[] = [
  {
    year: "2004",
    title: "The school opens its doors",
    body: "Haji Muhammad Siddique Naz founds M. S. Naz High School on G.T. Road, Ghakhar Mandi, with a commitment to excellence in education.",
  },
  {
    year: "2016",
    title: "First entry on our honours roll",
    body: "The earliest BISE Gujranwala matric distinction recorded on our published honours roll.",
  },
  {
    year: "2025",
    title: "Highest recorded board score",
    body: "A Science-group student scores 1134 marks, the highest result on the school's honours roll.",
  },
  {
    year: "Today",
    title: "A modern, connected campus",
    body: "Oxford-standard primary and middle years, BISE matric Science and Computer Science groups, practical AI and science labs, a solar-powered campus and the MSNS-LMS parent portal.",
  },
];

export const academicWings = [
  {
    badge: "Foundation",
    title: "Early Years & Montessori",
    range: "Playgroup – Kindergarten",
    body: "Activity-based learning that combines sensory Montessori methods with Oxford phonics and early numeracy.",
  },
  {
    badge: "Core development",
    title: "Primary Wing",
    range: "Grades 1 – 5",
    body: "Oxford University Press standards with conceptual Mathematics, Science, English and Urdu, alongside moral education.",
  },
  {
    badge: "Preparatory stage",
    title: "Middle School Wing",
    range: "Grades 6 – 8",
    body: "Independent analytical thinking and pre-matric foundations in physics, chemistry, biology and computer science.",
  },
  {
    badge: "Board certified",
    title: "Matriculation Wing",
    range: "Grades 9 – 10",
    body: "BISE Gujranwala Science and Computer Science groups with experienced subject mentors, practicals and test series.",
  },
] as const;

export const facilities = [
  {
    key: "labs",
    title: "Advanced science labs",
    body: "Physics, chemistry and biology labs with modern apparatus for board practicals and STEM experiments.",
  },
  {
    key: "ai",
    title: "AI & computer science lab",
    body: "Individual workstations, filtered high-speed internet and a 15 TB institutional cloud for coursework.",
  },
  {
    key: "solar",
    title: "Solar-powered campus",
    body: "Classrooms, labs and water filtration keep running through grid load shedding.",
  },
  {
    key: "library",
    title: "Library & media",
    body: "Oxford graded readers, Urdu literature, Islamic scholarship and matric research material.",
  },
  {
    key: "safety",
    title: "Safety & security",
    body: "CCTV coverage, controlled entry points and trained guards, opposite the Model Police Station.",
  },
  {
    key: "transport",
    title: "Safe transport",
    body: "Monitored van routes across Ghakhar Mandi, Wazirabad, Rahwali and nearby areas.",
  },
] as const;

export const leadership = [
  {
    name: "Prof. Azam Siddique",
    role: "Principal & Academic Visionary",
    focus:
      "Institutional governance, curriculum development and teacher mentorship.",
  },
  {
    name: "Hafiz Faizan Azam",
    role: "Vice Principal & Academic Administrator",
    focus:
      "Board exam administration, Oxford syllabus oversight and student affairs.",
  },
  {
    name: "Hassan Azam",
    role: "Director of Technology & Systems",
    focus: "The MSNS-LMS, campus IT infrastructure and the AI lab curriculum.",
  },
] as const;

/** Areas the school serves that have their own location page. */
export const servedAreas = [
  { name: "Ghakhar Mandi", slug: "ghakhar-mandi" },
  { name: "Wazirabad", slug: "wazirabad" },
  { name: "Gujranwala", slug: "gujranwala" },
  { name: "Rahwali", slug: "rahwali" },
  { name: "Alipur Chatha", slug: "alipur-chatha" },
  { name: "Sohdra", slug: "sohdra" },
  { name: "Nizamabad", slug: "nizamabad" },
  { name: "Kot Inayat Khan", slug: "kot-inayat-khan" },
] as const;

/** 3D centerpiece "pillars": each maps to a real part of the school. */
export const pillars = [
  {
    key: "academic",
    label: "Academics",
    caption: "Oxford-standard early and middle years, BISE Gujranwala matric.",
  },
  {
    key: "stem",
    label: "STEM & AI",
    caption: "Practical science labs and an AI & computer science lab.",
  },
  {
    key: "eco",
    label: "Solar campus",
    caption: "Solar power keeps classrooms and labs running through outages.",
  },
] as const;

export type PillarKey = (typeof pillars)[number]["key"];

/**
 * Sections designed for the page that need content the site doesn't have.
 * Flip `enabled` once the school supplies verified copy.
 */
export const pendingContent = {
  vision: {
    enabled: false,
    // TODO(content): the school's official vision statement.
    text: "",
  },
  leadershipPhotos: {
    enabled: false,
    // TODO(content): approved portraits for the principal, vice principal and director.
    images: [] as string[],
  },
  testimonials: {
    enabled: false,
    // TODO(content): parent or alumni quotes with written consent.
    items: [] as { quote: string; name: string; relation: string }[],
  },
};
