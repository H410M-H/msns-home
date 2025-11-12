"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, Trophy, Medal, Award } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export default function PopupAd() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        background:
          "linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(80, 200, 120, 0.3) 50%, rgba(255, 107, 107, 0.3) 100%)",
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
              rgba(74, 144, 226, 0.3) 0%,
              rgba(80, 200, 120, 0.3) 50%,
              rgba(255, 107, 107, 0.3) 100%
            );
          }
          33% {
            background: linear-gradient(
              135deg,
              rgba(255, 107, 107, 0.3) 0%,
              rgba(74, 144, 226, 0.3) 50%,
              rgba(80, 200, 120, 0.3) 100%
            );
          }
          66% {
            background: linear-gradient(
              135deg,
              rgba(80, 200, 120, 0.3) 0%,
              rgba(255, 107, 107, 0.3) 50%,
              rgba(74, 144, 226, 0.3) 100%
            );
          }
        }
      `}</style>

      <div
        className="animate-in fade-in zoom-in relative max-h-[90vh] w-full max-w-screen transform-gpu overflow-y-auto duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
          transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1)";
        }}
      >
        {/* Close Button */}
        <Button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-white/70 transition-colors hover:text-white"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(30px)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close popup"
        >
          <X size={18} />
        </Button>




        <div className="p-8 text-center">
      {/*    <div className="flex flex-cols-1 justify-center">
          <Image
            src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1762044105/WhatsApp_Image_2025-11-01_at_5.26.28_PM_jg1kbs.jpg"
            alt="IQBAL DAY"
            className="rounded-lg border-2 border-white/30 object-cover"
            width={400}
            height={900}
          />
          </div> */}
          <div
            className="mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{
              background: "rgba(34, 197, 94, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            🎉 RESULTS ANNOUNCED
          </div>

          <h2 className="mb-2 text-3xl font-bold text-white drop-shadow-lg">
            M.S. Naz High School
          </h2>
          <p className="mb-6 text-xl text-white/90 drop-shadow-xs">
            Ranking 2nd in GHAKHAR City 🏆
          </p>

          <h3 className="mb-6 text-xl font-semibold text-white drop-shadow-lg">
            Top 3 Achievers - 9th Grade Results
          </h3>


          {/* Top 3 Students */}
          <div className="mb-6 grid grid-cols-3 p-6 gap-4 sm:grid-cols-1">
            {/* 1st Position */}
            <div
              className="flex sm:flex-cols-1 items-center gap-4 rounded-lg p-4"
              style={{
                background: "rgba(255, 215, 0, 0.3)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 215, 0, 0.4)",
              }}
            >
              <Trophy className="shrink-0 text-yellow-300" size={32} />
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702038/MUHAMMAD_JUNAID_ALI_-_104478_m0uqaw.jpg"
                alt="Junaid Ali"
                className="rounded-full border-2 border-white/30 object-cover"
                width={64}
                height={64}
              />
              <div className="flex-1 text-left">
                <div className="text-lg font-bold text-yellow-500">
                  1st Position
                </div>
                <div className="text-green-900">Junaid Ali</div>
                <div className="text-sm text-red-800">Roll No: 104478</div>
                <div className="font-semibold text-red-600">Marks: 538/545</div>
              </div>
            </div>

            {/* 2nd Position */}
            <div
              className="flex items-center gap-4 rounded-lg p-4"
              style={{
                background: "rgba(192, 192, 192, 0.3)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(192, 192, 192, 0.4)",
              }}
            >
              <Medal className="shrink-0 text-gray-300" size={32} />
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702038/SEHAL_BUTT_-_104613_g1mdxd.jpg"
                alt="Sehal Butt"
                className="rounded-full border-2 border-white/30 object-cover"
                width={64}
                height={64}
              />
              <div className="flex-1 text-left">
                <div className="text-lg font-bold text-yellow-700">
                  2nd Position
                </div>
                <div className="text-green-900">Sehal Butt</div>
                <div className="text-sm text-red-800">Roll No: 104613</div>
                <div className="font-semibold text-red-600">Marks: 532/545</div>
              </div>
            </div>

            {/* 3rd Position */}
            <div
              className="flex items-center gap-4 rounded-lg p-4"
              style={{
                background: "rgba(205, 127, 50, 0.3)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(205, 127, 50, 0.4)",
              }}
            >
              <Award className="shrink-0 text-orange-300" size={32} />
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702296/MOMINA_MANSHA_ogl2jd.jpg"
                alt="Momina"
                className="rounded-full border-2 border-white/30 object-cover"
                width={64}
                height={64}
              />
              <div className="flex-1 text-left">
                <div className="text-lg font-bold text-yellow-500">
                  3rd Position
                </div>
                <div className="text-green-900">Momina</div>
                <div className="text-sm text-red-800">Roll No: 206676</div>
                <div className="font-semibold text-red-600">Marks: 522/545</div>
              </div>
            </div>
          </div>

          {/* All Results Button */}
          <div className="space-y-3">
            <a
              href="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702576/WhatsApp_Image_2025-08-20_at_6.26.30_PM_szf5ts.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full transform rounded-lg px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(59, 130, 246, 0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
              }}
            >
              View All Remaining Results
            </a>
            <button
              onClick={handleClose}
              className="w-full text-sm text-white/70 transition-colors hover:text-white"
            >
              Close
            </button>
          </div>

          <div
            className="mt-6 pt-4"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
          >
            <div className="text-xs text-white/70">
              Congratulations to all our students! 🎓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
