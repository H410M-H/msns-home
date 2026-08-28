"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, BookOpen, Compass } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Header } from "~/components/blocks/nav/Header";
import { Footer } from "~/components/blocks/nav/footer/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-yellow-50 via-white to-green-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-28 md:py-36">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white p-3 shadow-xl border border-green-100">
            <Image
              src="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
              alt="M.S. Naz High School"
              width={70}
              height={70}
              priority
              className="object-contain"
            />
          </div>

          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-green-800">
            404 — Page Not Found
          </span>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl">
            Looking for something?
          </h1>

          <p className="mt-3 text-base text-green-800/80 leading-relaxed max-w-md mx-auto">
            The page you requested is not available. Please explore the main sections of our school website below.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 text-left">
            <Link
              href="/"
              className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-green-200"
            >
              <Home className="h-5 w-5 text-green-600 mb-1.5" />
              <div className="font-bold text-xs text-green-950">Home Page</div>
              <div className="text-[11px] text-green-700/70">Welcome & news</div>
            </Link>

            <Link
              href="/about"
              className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-green-200"
            >
              <Compass className="h-5 w-5 text-pink-600 mb-1.5" />
              <div className="font-bold text-xs text-green-950">About School</div>
              <div className="text-[11px] text-green-700/70">Mission & history</div>
            </Link>

            <Link
              href="/admission"
              className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-green-200"
            >
              <BookOpen className="h-5 w-5 text-amber-600 mb-1.5" />
              <div className="font-bold text-xs text-green-950">Admissions</div>
              <div className="text-[11px] text-green-700/70">Criteria & fees</div>
            </Link>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full sm:w-auto rounded-full border-green-200 bg-white text-green-800 hover:bg-green-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>

            <Button
              asChild
              className="w-full sm:w-auto rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Go to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
