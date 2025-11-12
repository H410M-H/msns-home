"use client";

import { useState, useEffect } from "react";
import { X, Trophy, Medal, Award } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export default function PopupAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 4000); // appear after 4s
    const autoCloseTimer = setTimeout(() => handleClose(), 14000); // auto close after 10s visible

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
          "linear-gradient(135deg, rgba(74,144,226,0.2) 0%, rgba(80,200,120,0.3) 50%, rgba(255,107,107,0.3) 100%)",
        backdropFilter: "blur(10px)",
        animation: "gradientShift 6s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background: linear-gradient(
              135deg,
              rgba(74, 144, 226, 0.3),
              rgba(80, 200, 120, 0.3),
              rgba(255, 107, 107, 0.3)
            );
          }
          33% {
            background: linear-gradient(
              135deg,
              rgba(255, 107, 107, 0.3),
              rgba(74, 144, 226, 0.3),
              rgba(80, 200, 120, 0.3)
            );
          }
          66% {
            background: linear-gradient(
              135deg,
              rgba(80, 200, 120, 0.3),
              rgba(255, 107, 107, 0.3),
              rgba(74, 144, 226, 0.3)
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
            transform: translateY(30px) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className={`relative w-full max-w-[700px] md:max-w-[800px] overflow-hidden rounded-2xl border border-white/30 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
          isClosing ? "animate-[slideOut_0.5s_ease-in_forwards]" : "animate-[slideIn_0.6s_ease-out]"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
        }}
      >
        {/* Close Button */}
        <Button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white/80 transition hover:bg-white/30"
          aria-label="Close popup"
        >
          <X size={18} />
        </Button>

        <div className="p-6 md:p-10 text-center text-white">
          {/* Header */}
          <div
            className="mb-5 inline-block rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide shadow-sm"
            style={{
              background: "rgba(34,197,94,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            🎉 Results Announced
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">
            M.S. Naz High School
          </h2>
          <p className="mt-2 text-lg md:text-xl text-white/90">
            Ranking <span className="font-bold text-yellow-300">2nd</span> in
            GHAKHAR City 🏆
          </p>

          <h3 className="mt-6 text-lg md:text-2xl font-semibold text-white drop-shadow-md">
            Top 3 Achievers - 9th Grade Results
          </h3>

          {/* Top 3 Students Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <StudentCard
              position="1st Position"
              icon={<Trophy className="text-yellow-300" size={30} />}
              name="Junaid Ali"
              roll="104478"
              marks="538/545"
              img="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702038/MUHAMMAD_JUNAID_ALI_-_104478_m0uqaw.jpg"
              color="rgba(255,215,0,0.3)"
            />
            <StudentCard
              position="2nd Position"
              icon={<Medal className="text-gray-300" size={30} />}
              name="Sehal Butt"
              roll="104613"
              marks="532/545"
              img="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702038/SEHAL_BUTT_-_104613_g1mdxd.jpg"
              color="rgba(192,192,192,0.3)"
            />
            <StudentCard
              position="3rd Position"
              icon={<Award className="text-orange-300" size={30} />}
              name="Momina"
              roll="206676"
              marks="522/545"
              img="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702296/MOMINA_MANSHA_ogl2jd.jpg"
              color="rgba(205,127,50,0.3)"
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702576/WhatsApp_Image_2025-08-20_at_6.26.30_PM_szf5ts.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg bg-blue-500/70 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-500/90"
            >
              View All Remaining Results
            </a>
            <button
              onClick={handleClose}
              className="text-sm text-white/70 hover:text-white transition"
            >
              Close
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-white/20 pt-4 text-xs text-white/70">
            Congratulations to all our students! 🎓
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentCard({
  position,
  icon,
  name,
  roll,
  marks,
  img,
  color,
}: {
  position: string;
  icon: React.ReactNode;
  name: string;
  roll: string;
  marks: string;
  img: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-4 backdrop-blur-lg"
      style={{
        background: color,
        border: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      {icon}
      <Image
        src={img}
        alt={name}
        className="rounded-full border-2 border-white/40 object-cover"
        width={64}
        height={64}
      />
      <div className="flex flex-col text-left leading-snug">
        <span className="text-base font-bold text-white drop-shadow-sm">
          {position}
        </span>
        <span className="text-sm text-white/90">{name}</span>
        <span className="text-xs text-white/80">Roll No: {roll}</span>
        <span className="font-semibold text-yellow-200">Marks: {marks}</span>
      </div>
    </div>
  );
}