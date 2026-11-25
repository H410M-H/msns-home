"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

type FooterProps = React.HTMLAttributes<HTMLElement>;

export const Footer = ({ className, ...props }: FooterProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden border-t border-green-100 bg-linear-to-r from-yellow-50 via-pink-50 to-purple-50 text-green-800",
        className,
      )}
      {...props}
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-green-300/30 mix-blend-multiply blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-pink-300/30 mix-blend-multiply blur-[120px]" />

      {/* Scroll to top button */}
      <div
        className={cn(
          "fixed right-6 bottom-6 z-50 transition-all duration-500",
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-16 opacity-0",
        )}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-12 w-12 rounded-full border-none bg-green-600 text-white shadow-[0_8px_30px_rgba(22,163,74,0.3)] transition-all hover:-translate-y-1 hover:bg-green-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:pr-8">
            <div className="flex flex-col items-start space-y-6">
              <Link href="/" className="group relative inline-block">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-green-400 to-pink-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30" />
                <div className="relative rounded-2xl border border-white bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
                    alt="School Logo"
                    width={110}
                    height={110}
                  />
                </div>
              </Link>

              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-green-900">
                  M.S. NAZ HIGH SCHOOL
                </h2>
                <p className="font-serif text-sm font-bold tracking-widest text-green-700 uppercase">
                  Know Thyself | Pursuit of Excellence
                </p>
              </div>

              <p className="max-w-md text-sm leading-relaxed font-medium text-green-800/80">
                Empowering minds and shaping the future through quality
                education, fostering creativity, and instilling strong moral
                values.
              </p>
              <div className="flex space-x-4 pt-2">
                {[
                  {
                    icon: Facebook,
                    label: "Facebook",
                    href: "https://www.facebook.com/msnazhighschool",
                    color:
                      "hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    href: "https://twitter.com/msnazhighschool",
                    color:
                      "hover:text-sky-500 hover:border-sky-300 hover:bg-sky-50",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://www.instagram.com/msnazhighschool",
                    color:
                      "hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "#",
                    color:
                      "hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50",
                  },
                ].map(({ icon: Icon, label, href, color }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "rounded-full border border-white bg-white/60 p-2.5 text-green-700 shadow-xs transition-all duration-300",
                      "hover:-translate-y-1 hover:shadow-md",
                      color,
                    )}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 lg:ml-auto">
            <h3 className="text-sm font-bold tracking-wider text-green-900 uppercase">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Academics & Curricula", href: "/academics" },
                { label: "Admissions & Fees", href: "/admission" },
                { label: "Campus Facilities", href: "/campus" },
                { label: "Faculty & Mentors", href: "/faculty" },
                { label: "Board Distinctions", href: "/achievements" },
                { label: "Matric Resource Hub", href: "/resources" },
                { label: "Official Downloads", href: "/downloads" },
                { label: "Contact Us", href: "/contact" },
                { label: "MSNS LMS Portal", href: "https://lms.msns.edu.pk" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center text-sm font-medium text-green-800 transition-colors hover:text-pink-600"
                >
                  <span className="mr-0 h-[2px] w-0 bg-pink-500 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-sm font-bold tracking-wider text-green-900 uppercase">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="group flex items-start space-x-3">
                <div className="rounded-lg border border-white bg-white/60 p-2 shadow-xs transition-colors group-hover:border-pink-300 group-hover:bg-pink-50">
                  <MapPin className="h-4 w-4 text-green-600 transition-colors group-hover:text-pink-600" />
                </div>
                <div className="mt-1 text-sm leading-relaxed font-medium text-green-800">
                  <span className="block font-bold text-green-900">
                    G.T. Road, Ghakhar
                  </span>
                  Opposite Model Police Station
                  <br />
                  Gakkhar, 52200, Pakistan
                </div>
              </div>
              <div className="group flex items-center space-x-3">
                <div className="rounded-lg border border-white bg-white/60 p-2 shadow-xs transition-colors group-hover:border-pink-300 group-hover:bg-pink-50">
                  <Phone className="h-4 w-4 text-green-600 transition-colors group-hover:text-pink-600" />
                </div>
                <Link
                  href="tel:+923187625415"
                  className="text-sm font-medium text-green-800 transition-colors hover:text-pink-600"
                >
                  (92) 318 7625415
                </Link>
              </div>
              <div className="group flex items-center space-x-3">
                <div className="rounded-lg border border-white bg-white/60 p-2 shadow-xs transition-colors group-hover:border-pink-300 group-hover:bg-pink-50">
                  <Mail className="h-4 w-4 text-green-600 transition-colors group-hover:text-pink-600" />
                </div>
                <Link
                  href="mailto:info@msns.edu.pk"
                  className="text-sm font-medium text-green-800 transition-colors hover:text-pink-600"
                >
                  info@msns.edu.pk
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Feeder Links */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-green-200/60 pt-6 text-xs text-green-800/80">
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-900">
              Locations & Transport:
            </span>
            <Link
              href="/wazirabad"
              className="font-medium underline hover:text-emerald-700"
            >
              High School in Wazirabad
            </Link>
            <span>•</span>
            <Link
              href="/ghakhar"
              className="font-medium underline hover:text-emerald-700"
            >
              High School in Ghakhar Mandi
            </Link>
            <span>•</span>
            <Link
              href="/resources"
              className="font-medium underline hover:text-emerald-700"
            >
              BISE Gujranwala Resources
            </Link>
          </div>
          <span className="text-[11px] text-green-700/70">
            Postal Code: 52200 | G.T. Road, Ghakhar
          </span>
        </div>

        {/* Divider */}
        <div className="mt-6 mb-8 border-t border-green-200" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p
            className="text-center text-sm font-medium text-green-800/80"
            suppressHydrationWarning
          >
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-green-900">MSNS-DEV™</span> |{" "}
            <span className="font-bold text-green-900">
              M.S. NAZ HIGH SCHOOL®
            </span>
            <span className="hidden md:inline"> | </span>
            <br className="md:hidden" />
            All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm font-medium text-green-800/80 transition-colors hover:text-pink-600"
            >
              Privacy Policy
            </Link>
            <div className="h-1 w-1 rounded-full bg-green-300" />
            <Link
              href="/terms-of-service"
              className="text-sm font-medium text-green-800/80 transition-colors hover:text-pink-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
