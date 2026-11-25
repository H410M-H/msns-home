import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, BookOpen, Compass } from "lucide-react";
import { Button } from "~/components/ui/button";
import { BackButton } from "~/components/ui/back-button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist or has been moved. Explore M. S. Naz High School academic programs, admissions, and campus resources.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-yellow-50 via-white to-green-50">
      <main className="flex flex-1 items-center justify-center px-4 py-28 md:py-36">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-green-100 bg-white p-3 shadow-xl">
            <Image
              src="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
              alt="M.S. Naz High School"
              width={70}
              height={70}
              priority
              className="object-contain"
            />
          </div>

          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-bold tracking-wider text-green-800 uppercase">
            404 — Page Not Found
          </span>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl">
            Looking for something?
          </h1>

          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-green-800/80">
            The page you requested is not available. Please explore the main
            sections of our school website below.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-3">
            <Link
              href="/"
              className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <Home className="mb-1.5 h-5 w-5 text-green-600" />
              <div className="text-xs font-bold text-green-950">Home Page</div>
              <div className="text-[11px] text-green-700/70">
                Welcome & news
              </div>
            </Link>

            <Link
              href="/about"
              className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <Compass className="mb-1.5 h-5 w-5 text-pink-600" />
              <div className="text-xs font-bold text-green-950">
                About School
              </div>
              <div className="text-[11px] text-green-700/70">
                Mission & history
              </div>
            </Link>

            <Link
              href="/admission"
              className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <BookOpen className="mb-1.5 h-5 w-5 text-amber-600" />
              <div className="text-xs font-bold text-green-950">Admissions</div>
              <div className="text-[11px] text-green-700/70">
                Criteria & fees
              </div>
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BackButton />

            <Button
              asChild
              className="w-full rounded-full bg-green-600 text-white shadow-md hover:bg-green-700 sm:w-auto"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Go to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
