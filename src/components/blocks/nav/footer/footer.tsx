"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
  Send
} from 'lucide-react';

type FooterProps = React.HTMLAttributes<HTMLElement>;

export const Footer = ({ className, ...props }: FooterProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={cn(
      "relative w-full overflow-hidden bg-linear-to-r from-yellow-50 via-pink-50 to-purple-50 text-green-800 border-t border-green-100",
      className
    )} {...props}>
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      {/* Scroll to top button */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-500",
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
        )}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full h-12 w-12 shadow-[0_8px_30px_rgba(22,163,74,0.3)] bg-green-600 hover:bg-green-700 text-white border-none transition-all hover:-translate-y-1"
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
              <Link href="/" className="inline-block relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                <div className="relative bg-white/80 p-3 rounded-2xl shadow-sm border border-white transition-transform duration-500 group-hover:scale-105 backdrop-blur-sm">
                  <Image
                    src="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
                    alt="School Logo"
                    width={110}
                    height={110}
                  />
                </div>
              </Link>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-green-900 tracking-tight">
                  M.S. NAZ HIGH SCHOOL
                </h2>
                <p className="text-sm text-green-700 font-bold tracking-widest uppercase font-serif">
                  Know Thyself | Pursuit of Excellence
                </p>
              </div>

              <p className="text-green-800/80 text-sm leading-relaxed max-w-md font-medium">
                Empowering minds and shaping the future through quality education, 
                fostering creativity, and instilling strong moral values.
              </p>

              <div className="flex space-x-4 pt-2">
                {[
                  { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50" },
                  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-sky-500 hover:border-sky-300 hover:bg-sky-50" },
                  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50" },
                  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50" },
                ].map(({ icon: Icon, label, href, color }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-2.5 rounded-full bg-white/60 border border-white shadow-xs text-green-700 transition-all duration-300",
                      "hover:-translate-y-1 hover:shadow-md",
                      color
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
            <h3 className="text-sm font-bold text-green-900 tracking-wider uppercase">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {["Home", "About Us", "Academics", "Admissions", "Campus Life", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="/#"
                  className="group flex items-center text-sm font-medium text-green-800 hover:text-pink-600 transition-colors"
                >
                  <span className="w-0 h-[2px] bg-pink-500 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2" />
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-sm font-bold text-green-900 tracking-wider uppercase">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 rounded-lg bg-white/60 border border-white shadow-xs group-hover:border-pink-300 group-hover:bg-pink-50 transition-colors">
                  <MapPin className="h-4 w-4 text-green-600 group-hover:text-pink-600 transition-colors" />
                </div>
                <div className="text-sm font-medium text-green-800 leading-relaxed mt-1">
                  <span className="block text-green-900 font-bold">G.T. Road, Ghakhar</span>
                  Opposite Model Police Station<br />
                  Gakkhar, 52200, Pakistan
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-white/60 border border-white shadow-xs group-hover:border-pink-300 group-hover:bg-pink-50 transition-colors">
                  <Phone className="h-4 w-4 text-green-600 group-hover:text-pink-600 transition-colors" />
                </div>
                <Link href="tel:+923187625415" className="text-sm font-medium text-green-800 hover:text-pink-600 transition-colors">
                  (92) 318 7625415
                </Link>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 rounded-lg bg-white/60 border border-white shadow-xs group-hover:border-pink-300 group-hover:bg-pink-50 transition-colors">
                  <Mail className="h-4 w-4 text-green-600 group-hover:text-pink-600 transition-colors" />
                </div>
                <Link href="mailto:info@msns.edu.pk" className="text-sm font-medium text-green-800 hover:text-pink-600 transition-colors">
                  info@msns.edu.pk
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/40 border border-white/60 shadow-sm backdrop-blur-xl rounded-3xl p-8 lg:p-10">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-green-900">Subscribe to our Newsletter</h3>
            <p className="text-sm font-medium text-green-800/80">Get the latest updates, news, and announcements directly to your inbox.</p>
          </div>
          <form className="relative max-w-md md:ml-auto w-full">
            <Input
              type="email"
              placeholder="Enter your email address..."
              className="pl-5 pr-14 h-14 bg-white/60 border-white text-green-900 placeholder:text-green-700/50 focus:border-green-500 focus:ring-green-500/20 rounded-2xl shadow-xs"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md transition-all hover:scale-105"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </Button>
          </form>
        </div>
 
        {/* Divider */}
        <div className="mt-12 mb-8 border-t border-green-200" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-center text-sm font-medium text-green-800/80">
            © {new Date().getFullYear()}{" "}
            <span className="text-green-900 font-bold">MSNS-DEV™</span> |{" "}
            <span className="text-green-900 font-bold">M.S. NAZ HIGH SCHOOL®</span>
            <span className="hidden md:inline"> | </span>
            <br className="md:hidden" />
            All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm font-medium text-green-800/80 hover:text-pink-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <div className="h-1 w-1 rounded-full bg-green-300" />
            <Link
              href="/terms-of-service"
              className="text-sm font-medium text-green-800/80 hover:text-pink-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};