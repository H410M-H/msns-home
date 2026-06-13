"use client";

import { useState, useEffect } from "react";
import { X, Award, ExternalLink, ArrowRight, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
                <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3">
                  Top Achiever - 9th Grade
                </h3>
                
                {/* Gold Achiever Card */}
                <div
                  className="mx-auto md:mx-0 flex flex-col items-center md:items-start gap-4 rounded-2xl p-5 backdrop-blur-xl transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(202, 138, 4, 0.25) 100%)",
                    border: "2px solid rgba(234, 179, 8, 0.6)",
                    boxShadow: "0 0 25px rgba(234, 179, 8, 0.25)",
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

          {/* Right Column - Updates & Actions */}
          <div className="md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 pl-0 md:pl-6 text-left">
            <div>
              {/* Red Section: Social Media Posts */}
              <div className="flex items-center gap-2 mb-4">
                <Share2 size={18} className="text-red-400 animate-pulse" />
                <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                  Recent Announcements & Posts
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/api/images/gallery/Notifications/Social_posts/1781030111849_167300.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-red-500/40 bg-white/5 p-1 transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-black/10"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src="/api/images/gallery/Notifications/Social_posts/1781030111849_167300.jpg"
                      alt="Parents Meeting Announcement"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white bg-red-600/90 px-3 py-1 rounded-full border border-red-400/30 flex items-center gap-1 shadow-md">
                        View Image <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>
                </a>

                <a
                  href="/api/images/gallery/Notifications/Social_posts/1781030111865_167302.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-red-500/40 bg-white/5 p-1 transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-black/10"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src="/api/images/gallery/Notifications/Social_posts/1781030111865_167302.jpg"
                      alt="Parent-Teacher Conference Announcement"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white bg-red-600/90 px-3 py-1 rounded-full border border-red-400/30 flex items-center gap-1 shadow-md">
                        View Image <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Blue Section: Links & Buttons */}
              <div 
                className="mt-5 rounded-2xl p-4 transition-all duration-300 text-left"
                style={{
                  background: "rgba(59, 130, 246, 0.08)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 4px 20px -2px rgba(59, 130, 246, 0.1)",
                }}
              >
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                  Quick Actions & Links
                </h4>
                
                <div className="flex flex-col gap-2.5">
                  {/* Primary Link: View Remaining Results */}
                  <a
                    href="/api/images/resolve/WhatsApp_Image_2025-08-20_at_6.26.30_PM_szf5ts.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-xs font-extrabold text-white transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background: "linear-gradient(135deg, #1e40af 0%, #0369a1 100%)",
                      border: "1px solid rgba(59, 130, 246, 0.4)",
                      boxShadow: "0 4px 15px -3px rgba(30, 64, 175, 0.3)",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      🏆 View Remaining Results
                    </span>
                    <ArrowRight size={13} className="text-blue-200 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Secondary Links Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/admission"
                      className="group flex items-center justify-center gap-1.5 rounded-xl border border-blue-500/30 hover:border-blue-400 bg-blue-950/40 hover:bg-blue-900/40 py-2.5 text-center text-xs font-bold text-blue-200 hover:text-white transition-all"
                    >
                      Admission Open
                      <ExternalLink size={11} className="text-blue-400/70 group-hover:text-blue-300 transition-colors" />
                    </Link>

                    <a
                      href="https://lms.msns.edu.pk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-1.5 rounded-xl border border-blue-500/30 hover:border-blue-400 bg-blue-950/40 hover:bg-blue-900/40 py-2.5 text-center text-xs font-bold text-blue-200 hover:text-white transition-all"
                    >
                      LMS Portal
                      <ExternalLink size={11} className="text-blue-400/70 group-hover:text-blue-300 transition-colors" />
                    </a>
                  </div>

                  {/* Close Window Action */}
                  <button
                    onClick={handleClose}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 py-2.5 text-center text-xs font-bold text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}