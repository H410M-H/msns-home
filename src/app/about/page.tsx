import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bus,
  CalendarDays,
  Clock,
  Cpu,
  FlaskConical,
  GraduationCap,
  Library,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { BreadcrumbSchema } from "~/components/SEOSchema";
import { KineticText } from "~/components/motion/KineticText";
import { Magnetic } from "~/components/motion/Magnetic";
import { MorphBlobs } from "~/components/motion/MorphBlobs";
import { Reveal, RevealGroup, RevealItem } from "~/components/motion/Reveal";
import { TiltCard } from "~/components/motion/TiltCard";
import { PillarShowcase } from "~/components/blocks/about/PillarShowcase";
import { StoryTimeline } from "~/components/blocks/about/StoryTimeline";
import { ValuesMorph } from "~/components/blocks/about/ValuesMorph";
import {
  FOUNDING_YEAR,
  academicWings,
  facilities,
  founderMessage,
  keyFigures,
  leadership,
  milestones,
  mission,
  pendingContent,
  school,
  servedAreas,
  yearsOfService,
} from "~/content/about";

// Re-render daily so "years of service" stays correct without a redeploy.
export const revalidate = 86400;

const PAGE_URL = "https://www.msns.edu.pk/about";
const DESCRIPTION = `Since ${FOUNDING_YEAR}, M. S. Naz High School® in Ghakhar Mandi has offered Oxford-standard early and middle years, BISE Gujranwala matriculation (Code 112199), practical science and AI labs and a solar-powered campus. Our story, values and leadership.`;

export const metadata: Metadata = {
  title: "About Us | Our Story, Values & Leadership",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About M. S. Naz High School® | Our Story, Values & Leadership",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "M. S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        alt: "M. S. Naz High School® logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About M. S. Naz High School® | Our Story, Values & Leadership",
    description: DESCRIPTION,
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const FACILITY_ICONS: Record<(typeof facilities)[number]["key"], LucideIcon> = {
  labs: FlaskConical,
  ai: Cpu,
  solar: Sun,
  library: Library,
  safety: ShieldCheck,
  transport: Bus,
};

function initials(name: string) {
  return name
    .replace(/^(Prof\.|Hafiz)\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      <p
        className={`mb-3 text-sm font-semibold tracking-[0.2em] uppercase ${dark ? "text-amber-300" : "text-emerald-700"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-3xl leading-tight font-bold sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-emerald-950"}`}
      >
        <KineticText text={title} />
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${dark ? "text-emerald-50/80" : "text-slate-600"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  const years = yearsOfService();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "About M. S. Naz High School®",
    description: DESCRIPTION,
    inLanguage: "en",
    about: { "@id": "https://www.msns.edu.pk/#school" },
    mainEntity: {
      "@type": ["School", "EducationalOrganization"],
      "@id": "https://www.msns.edu.pk/#school",
      name: school.name,
      foundingDate: String(FOUNDING_YEAR),
      founder: { "@type": "Person", name: `${school.founder} (Late)` },
      slogan: school.motto,
      address: {
        "@type": "PostalAddress",
        streetAddress: school.address.street,
        addressLocality: school.address.locality,
        addressRegion: school.address.region,
        postalCode: school.address.postalCode,
        addressCountry: "PK",
      },
      employee: leadership.map((l) => ({
        "@type": "Person",
        name: l.name,
        jobTitle: l.role,
      })),
    },
  };

  return (
    <div className="overflow-x-clip bg-[#f6fbf8] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.msns.edu.pk" },
          { name: "About", url: PAGE_URL },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 pt-28 pb-32 text-white sm:pt-32 lg:pb-40">
        <MorphBlobs tone="dark" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-50 backdrop-blur">
              <Sparkles aria-hidden className="h-4 w-4 text-amber-300" />
              About {school.name}
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <KineticText
                mode="settle"
                text={`${school.tagline}, since ${FOUNDING_YEAR}.`}
                wordClassName="bg-gradient-to-r from-white via-emerald-100 to-amber-100 bg-clip-text text-transparent"
              />
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-emerald-50/85 sm:text-xl">
              For {years} years we have served families in Ghakhar Mandi,
              Wazirabad and the wider Gujranwala district, from the first day of
              Playgroup to the BISE Gujranwala matric exams.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5 text-sm">
              {[
                { icon: CalendarDays, text: `Established ${FOUNDING_YEAR}` },
                {
                  icon: BadgeCheck,
                  text: `${school.boardAffiliation} · Code ${school.boardCode}`,
                },
                { icon: GraduationCap, text: "Oxford curriculum standards" },
                { icon: Sun, text: "Solar-powered campus" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-emerald-50/90"
                >
                  <Icon aria-hidden className="h-4 w-4 text-emerald-300" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  href="/admission/apply"
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300 px-7 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-950/40 transition-shadow hover:shadow-amber-300/30 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  Apply for admission
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/campus"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  Explore the campus
                </Link>
              </Magnetic>
            </div>
          </div>

          <PillarShowcase />
        </div>
      </section>

      {/* ── Key figures ──────────────────────────────────────── */}
      <section
        aria-label="MSNS at a glance"
        className="relative z-10 container mx-auto -mt-16 px-4 sm:px-6 lg:-mt-20"
      >
        <RevealGroup
          margin="0px"
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        >
          {keyFigures.map((f) => (
            <RevealItem key={f.label}>
              <TiltCard
                wrapperClassName="h-full"
                className="h-full rounded-3xl border border-emerald-100 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(6,78,59,0.45)] sm:p-7"
              >
                <p className="bg-gradient-to-br from-emerald-700 to-teal-600 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl">
                  {f.value}
                </p>
                <p className="mt-2 font-semibold text-emerald-950">{f.label}</p>
                <p className="mt-1 text-sm text-slate-500">{f.note}</p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── Our story ────────────────────────────────────────── */}
      <section className="container mx-auto grid gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Our story"
            title="A school built by and for its community"
          />
          <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              {school.founder} founded M. S. Naz High School in {FOUNDING_YEAR}{" "}
              on G.T. Road in Ghakhar Mandi, opposite the Model Police Station,
              with a steadfast commitment to excellence in education.
            </p>
            <p>
              Today the school takes children from Playgroup through Grade 10.
              Primary and middle years follow Oxford University Press standards,
              and our matriculation wing is affiliated with{" "}
              {school.boardAffiliation} (Code {school.boardCode}) with Science
              and Computer Science groups.
            </p>
            <p>
              Learning is hands-on: practical science labs, an AI and computer
              science lab, and the MSNS-LMS portal that keeps parents connected
              to homework, results and attendance.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-8 rounded-3xl border-l-4 border-amber-400 bg-white p-6 font-serif text-xl text-emerald-900 shadow-sm sm:text-2xl">
              “{school.motto}”
              <footer className="mt-2 font-sans text-sm font-medium tracking-wide text-slate-500 uppercase">
                School motto
              </footer>
            </blockquote>
          </Reveal>
        </div>
        <StoryTimeline milestones={milestones} />
      </section>

      {/* ── Mission & values ─────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
        <MorphBlobs tone="light" className="opacity-70" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="What guides us"
            title="Mission and core values"
            align="center"
          />
          <Reveal className="mx-auto mt-12 max-w-4xl">
            <TiltCard
              max={4}
              className="rounded-[2rem] bg-gradient-to-br from-emerald-800 to-teal-800 p-8 text-white shadow-2xl sm:p-12"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-amber-200 uppercase">
                Our mission
              </p>
              <p className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">
                {mission}
              </p>
              {pendingContent.vision.enabled && pendingContent.vision.text && (
                <p className="mt-6 border-t border-white/15 pt-6 text-lg text-emerald-50/85">
                  <span className="font-semibold text-amber-200">
                    Our vision:{" "}
                  </span>
                  {pendingContent.vision.text}
                </p>
              )}
            </TiltCard>
          </Reveal>
          <div className="mt-14">
            <ValuesMorph />
          </div>
        </div>
      </section>

      {/* ── Founder's message ────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-emerald-950 py-24 text-white lg:py-32">
        <MorphBlobs tone="dark" />
        <div className="relative container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <Reveal>
            <TiltCard className="mx-auto w-full max-w-[340px] rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-emerald-900">
                <Image
                  src={founderMessage.image}
                  alt={`Portrait of ${founderMessage.name}`}
                  fill
                  sizes="340px"
                  className="object-contain"
                />
              </div>
            </TiltCard>
          </Reveal>
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Message from the founder"
              title="“Together we shape future leaders”"
            />
            <Reveal className="relative mt-8">
              <Quote
                aria-hidden
                className="absolute -top-4 -left-2 h-16 w-16 text-white/5"
              />
              <p className="text-sm font-semibold tracking-wide text-emerald-200 uppercase">
                {founderMessage.salutation}
              </p>
              {founderMessage.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-5 text-lg leading-relaxed text-emerald-50/85 sm:text-xl"
                >
                  {p}
                </p>
              ))}
              <p className="mt-8 font-serif text-2xl font-semibold">
                {founderMessage.name}{" "}
                <span className="font-sans text-sm font-medium tracking-widest text-emerald-300 uppercase">
                  (Late)
                </span>
              </p>
              <p className="text-sm tracking-wide text-emerald-200/80 uppercase">
                {founderMessage.title}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Leadership"
            title="The people who lead MSNS today"
          />
          <Link
            href="/faculty"
            className="group inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900 focus-visible:underline focus-visible:outline-none"
          >
            Meet our faculty
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
          {leadership.map((l) => (
            <RevealItem as="li" key={l.name}>
              <TiltCard
                wrapperClassName="h-full"
                className="h-full rounded-3xl border border-emerald-100 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(6,78,59,0.4)]"
              >
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 font-serif text-xl font-bold text-white shadow-lg"
                >
                  {initials(l.name)}
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold text-emerald-950">
                  {l.name}
                </h3>
                <p className="mt-1 text-sm font-semibold tracking-wide text-emerald-700 uppercase">
                  {l.role}
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">{l.focus}</p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── Academic journey ─────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-white to-emerald-50/60 py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Academics"
              title="One journey, Playgroup to matric"
              intro="Each wing builds on the last, so children move up with familiar teachers, routines and expectations."
            />
            <Link
              href="/academics"
              className="group inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900 focus-visible:underline focus-visible:outline-none"
            >
              Academic programmes
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <RevealGroup
            as="ol"
            className="relative mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {academicWings.map((w, i) => (
              <RevealItem as="li" key={w.title}>
                <TiltCard
                  wrapperClassName="h-full"
                  className="h-full rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 font-mono text-sm font-bold text-amber-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-800 uppercase">
                      {w.badge}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-emerald-950">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-teal-700">
                    {w.range}
                  </p>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {w.body}
                  </p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Campus & facilities ──────────────────────────────── */}
      <section className="container mx-auto px-4 py-24 sm:px-6 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Campus life"
            title="A campus designed for focus and safety"
          />
          <Link
            href="/campus"
            className="group inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900 focus-visible:underline focus-visible:outline-none"
          >
            Campus & facilities
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f, i) => {
            const Icon = FACILITY_ICONS[f.key];
            const feature = i === 0 || i === 2;
            return (
              <RevealItem
                key={f.key}
                className={feature ? "lg:row-span-1" : undefined}
              >
                <TiltCard
                  wrapperClassName="h-full"
                  className={`h-full rounded-3xl border p-7 ${
                    feature
                      ? "border-emerald-800 bg-gradient-to-br from-emerald-900 to-teal-900 text-white"
                      : "border-emerald-100 bg-white"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      feature
                        ? "bg-white/10 text-amber-200"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3
                    className={`mt-6 font-serif text-xl font-semibold ${feature ? "text-white" : "text-emerald-950"}`}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed ${feature ? "text-emerald-50/80" : "text-slate-600"}`}
                  >
                    {f.body}
                  </p>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* ── Achievements band ────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 py-20 text-white">
        <MorphBlobs tone="dark" className="opacity-80" />
        <div className="relative container mx-auto flex flex-col items-start gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-amber-300 uppercase">
              <Trophy aria-hidden className="h-4 w-4" />
              Results that speak
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              <KineticText text="1134 marks: our highest recorded board result" />
            </h2>
            <p className="mt-4 text-lg text-emerald-50/80">
              Our honours roll lists every BISE Gujranwala distinction holder,
              alongside a consistent 100% matric pass rate.
            </p>
          </div>
          <Magnetic>
            <Link
              href="/achievements"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-emerald-950 shadow-lg transition-colors hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
            >
              See the honours roll
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ── Visit us / communities ───────────────────────────── */}
      <section className="container mx-auto grid gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeading
            eyebrow="Visit us"
            title="One campus, many communities"
            intro="Families travel to our G.T. Road campus from across Wazirabad tehsil and the Gujranwala district, with school transport on major routes."
          />
          <Reveal className="mt-8">
            <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              Areas we serve
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {servedAreas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/locations/${a.slug}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition-colors hover:border-emerald-400 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal>
          <TiltCard
            max={4}
            className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_30px_70px_-35px_rgba(6,78,59,0.45)] sm:p-10"
          >
            <h3 className="font-serif text-2xl font-semibold text-emerald-950">
              {school.name}
            </h3>
            <dl className="mt-6 space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: `${school.address.street}, ${school.address.locality}, ${school.address.region} ${school.address.postalCode}`,
                },
                { icon: Clock, label: "School hours", value: school.hours },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <Icon
                    aria-hidden
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  />
                  <div>
                    <dt className="text-sm font-semibold text-slate-500">
                      {label}
                    </dt>
                    <dd className="text-slate-800">{value}</dd>
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <Phone
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                />
                <div>
                  <dt className="text-sm font-semibold text-slate-500">
                    Phone
                  </dt>
                  <dd className="flex flex-wrap gap-x-4">
                    {school.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/-/g, "")}`}
                        className="text-emerald-800 underline-offset-4 hover:underline"
                      >
                        {p}
                      </a>
                    ))}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                />
                <div>
                  <dt className="text-sm font-semibold text-slate-500">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${school.email}`}
                      className="text-emerald-800 underline-offset-4 hover:underline"
                    >
                      {school.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={school.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <MapPin aria-hidden className="h-4 w-4" />
                Get directions
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                Contact the office
              </Link>
            </div>
          </TiltCard>
        </Reveal>
      </section>

      {/* ── Admissions CTA ───────────────────────────────────── */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="relative isolate container mx-auto overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-900 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <MorphBlobs tone="emerald" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-bold sm:text-5xl">
              <KineticText text="Become part of the MSNS story" />
            </h2>
            <p className="mt-5 text-lg text-emerald-50/90">
              We admit students from Playgroup to Grade 10. Apply online or
              visit the campus to meet our team.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Link
                  href="/admission/apply"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-emerald-900 shadow-xl transition-colors hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
                >
                  Apply online
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/admission"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  Admission process & fees
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
