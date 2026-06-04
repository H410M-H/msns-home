"use client";

import { useState, useEffect } from "react";
import { X, Award, Megaphone, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsItemProps {
  title: string;
  description: string;
  date: string;
  badge?: string;
  href: string;
  isExternal?: boolean;
}

function NewsItem({ title, description, date, badge, href, isExternal }: NewsItemProps) {
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (isExternal) {
    return (
      <a
        href={href}
        {...linkProps}
        className="group flex flex-col gap-1 rounded-2xl p-4 bg-white/5 hover:bg-white/[0.08] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 text-left hover:-translate-y-0.5 shadow-sm cursor-pointer"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                {badge}
              </span>
            )}
            <span className="text-[11px] text-white/50">{date}</span>
          </div>
          <ExternalLink size={12} className="text-white/40 group-hover:text-emerald-400 transition-colors" />
        </div>
        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
          {title}
        </h4>
        <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col gap-1 rounded-2xl p-4 bg-white/5 hover:bg-white/[0.08] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 text-left hover:-translate-y-0.5 shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              {badge}
            </span>
          )}
          <span className="text-[11px] text-white/50">{date}</span>
        </div>
        <ArrowRight size={12} className="text-white/40 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
      </div>
      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
        {title}
      </h4>
      <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
        {description}
      </p>
    </Link>
  );
}

export default function PopupAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 4000); // appear after 4s
    const autoCloseTimer = setTimeout(() => handleClose(), 20000); // auto close after 20s visible

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 500); // wait for animation to finish
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={handleBackdropClick}
      style={{
        background:
          "linear-gradient(135deg, rgba(6,78,59,0.2) 0%, rgba(4,120,87,0.3) 50%, rgba(8,47,73,0.3) 100%)",
        backdropFilter: "blur(12px)",
        animation: "gradientShift 8s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background: linear-gradient(
              135deg,
              rgba(6, 78, 59, 0.25),
              rgba(4, 120, 87, 0.3),
              rgba(8, 47, 73, 0.3)
            );
          }
          50% {
            background: linear-gradient(
              135deg,
              rgba(8, 47, 73, 0.3),
              rgba(6, 78, 59, 0.25),
              rgba(4, 120, 87, 0.3)
            );
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateY(40px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className={`relative w-full max-w-[850px] overflow-hidden rounded-3xl border border-white/20 shadow-2xl backdrop-blur-2xl transition-all duration-500 ${
          isClosing ? "animate-[slideOut_0.5s_ease-in_forwards]" : "animate-[slideIn_0.6s_ease-out]"
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(6, 40, 25, 0.45) 0%, rgba(13, 72, 53, 0.5) 50%, rgba(6, 36, 48, 0.55) 100%)",
          boxShadow:
            "0 30px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
        }}
      >
        {/* Close Button Ring */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all border border-white/10 hover:scale-105"
          aria-label="Close popup"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 md:p-9">
          
          {/* Left Column - Achiever & School Info */}
          <div className="md:col-span-2 flex flex-col justify-between text-center md:text-left h-full">
            <div>
              {/* Badge */}
              <div
                className="mb-4 inline-block rounded-full px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300"
                style={{
                  background: "rgba(16, 185, 129, 0.25)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                }}
              >
                🎉 Results Announced
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
                M.S. Naz High School
              </h2>
              <p className="mt-1.5 text-sm md:text-base text-emerald-200">
                Ranking <span className="font-bold text-yellow-300 drop-shadow-sm">2nd</span> in Ghakhar City 🏆
              </p>
              
              <div className="mt-6 border-t border-white/10 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                  Top Achiever - 9th Grade
                </h3>
                
                {/* Gold Achiever Card */}
                <div
                  className="mx-auto md:mx-0 flex flex-col items-center md:items-start gap-4 rounded-2xl p-5 backdrop-blur-xl transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(202, 138, 4, 0.2) 100%)",
                    border: "1px solid rgba(234, 179, 8, 0.35)",
                    boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.08)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="relative">
                      <Image
                        src="/api/images/resolve/MOMINA_MANSHA_ogl2jd.jpg"
                        alt="Momina - 1st Position"
                        className="rounded-2xl border-2 border-yellow-400/50 object-cover shadow-md"
                        width={75}
                        height={75}
                      />
                      <div className="absolute -top-2 -left-2 bg-yellow-400 text-yellow-950 p-1.5 rounded-full shadow-lg border border-yellow-200">
                        <Award size={14} className="stroke-[2.5]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">
                        1st Position
                      </span>
                      <span className="text-lg font-extrabold text-white">Momina</span>
                      <span className="text-xs text-white/70">Roll No: 206676</span>
                      <span className="text-sm font-bold text-yellow-200 mt-1">Marks: 522/545</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Congratulations footer text */}
            <div className="mt-6 hidden md:block text-xs text-white/40 italic">
              Congratulations to all our outstanding students! 🎓
            </div>
          </div>

          {/* Right Column - Latest News & Updates */}
          <div className="md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 pl-0 md:pl-6 text-left">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Megaphone size={18} className="text-emerald-400 animate-pulse" />
                <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                  Latest News & Updates
                </h3>
              </div>

              {/* News Feed */}
              <div className="space-y-3">
                <NewsItem
                  title="School Admissions Open 2026-2028"
                  description="Admissions are officially active for the upcoming session. Review structures, requirements, and apply online."
                  date="June 2026"
                  badge="Admission"
                  href="/admission"
                />
                
                <NewsItem
                  title="Next-Gen LMS Portal Launched"
                  description="Our secure Portal is live for teachers, students, and employees to view schedules, marks, and fees."
                  date="June 2026"
                  badge="Portal"
                  href="https://lms.msns.edu.pk"
                  isExternal
                />

                <NewsItem
                  title="Oxford Academic Standards Integrated"
                  description="Partnering with Oxford University Press to deliver international study books and leadership frameworks."
                  date="May 2026"
                  badge="Academic"
                  href="/about"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/api/images/resolve/WhatsApp_Image_2025-08-20_at_6.26.30_PM_szf5ts.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] duration-300 text-center"
              >
                View Remaining Results
              </a>
              <button
                onClick={handleClose}
                className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] duration-300 text-center cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}