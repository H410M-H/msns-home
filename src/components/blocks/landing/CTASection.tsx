import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KineticText } from "~/components/motion/KineticText";
import { Magnetic } from "~/components/motion/Magnetic";
import { MorphBlobs } from "~/components/motion/MorphBlobs";
import { Reveal } from "~/components/motion/Reveal";

export const CTASection = () => {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-900 px-6 py-16 text-center text-white shadow-[0_40px_80px_-40px_rgba(6,78,59,0.8)] sm:px-12 md:py-20">
        <MorphBlobs tone="emerald" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            <KineticText text="Ready to Join Our Community?" />
          </h2>
          <Reveal delay={0.15} y={16}>
            <p className="mt-5 text-lg text-emerald-50/90 md:text-xl">
              Take the first step towards a bright future with M.S. Naz High
              School.
            </p>
          </Reveal>
          <Reveal
            delay={0.25}
            y={16}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <Magnetic>
              <Link
                href="/admission"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-emerald-900 shadow-xl transition-colors hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
              >
                Start Your Journey
                <ArrowRight
                  aria-hidden
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Our Story
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
