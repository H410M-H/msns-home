"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Trophy, Medal, Award } from "lucide-react"
import Image from "next/image"

export default function PopupAd() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after 2 seconds delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      style={{
        background:
          "linear-gradient(135deg, rgba(74, 144, 226, 0.3) 0%, rgba(80, 200, 120, 0.3) 50%, rgba(255, 107, 107, 0.3) 100%)",
        backdropFilter: "blur(10px)",
        animation: "gradientShift 6s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background: linear-gradient(135deg, rgba(74, 144, 226, 0.3) 0%, rgba(80, 200, 120, 0.3) 50%, rgba(255, 107, 107, 0.3) 100%); }
          33% { background: linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(74, 144, 226, 0.3) 50%, rgba(80, 200, 120, 0.3) 100%); }
          66% { background: linear-gradient(135deg, rgba(80, 200, 120, 0.3) 0%, rgba(255, 107, 107, 0.3) 50%, rgba(74, 144, 226, 0.3) 100%); }
        }
      `}</style>

      <div
        className="max-w-2xl w-full relative animate-in fade-in zoom-in duration-300 transform-gpu max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
          transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1)"
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
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
        </button>

        <div className="p-8 text-center">
          <div
            className="inline-block text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "rgba(34, 197, 94, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            🎉 RESULTS ANNOUNCED
          </div>

          <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">M.S. Naz High School</h2>
          <p className="text-xl text-white/90 mb-6 drop-shadow-sm">Ranking 2nd in GHAKHAR City 🏆</p>

          <h3 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">Top 3 Achievers - 9th Grade Results</h3>

          {/* Top 3 Students */}
          <div className="space-y-4 mb-6">
            {/* 1st Position */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{
                background: "rgba(255, 215, 0, 0.3)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 215, 0, 0.4)",
              }}
            >
              <Trophy className="text-yellow-300 flex-shrink-0" size={32} />
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702038/MUHAMMAD_JUNAID_ALI_-_104478_m0uqaw.jpg"
                alt="Junaid Ali"
                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
              />
              <div className="text-left flex-1">
                <div className="text-yellow-500 font-bold text-lg">1st Position</div>
                <div className="text-green-900">Junaid Ali</div>
                <div className="text-red-800 text-sm">Roll No: 104478</div>
                <div className="text-red-600 font-semibold">Marks: 538/545</div>
              </div>
            </div>

            {/* 2nd Position */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{
                background: "rgba(192, 192, 192, 0.3)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(192, 192, 192, 0.4)",
              }}
            >
              <Medal className="text-gray-300 flex-shrink-0" size={32} />
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702038/SEHAL_BUTT_-_104613_g1mdxd.jpg"
                alt="Sehal Butt"
                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
              />
              <div className="text-left flex-1">
                <div className="text-yellow-700 font-bold text-lg">2nd Position</div>
                <div className="text-green-900">Sehal Butt</div>
                <div className="text-red-800 text-sm">Roll No: 104613</div>
                <div className="text-red-600 font-semibold">Marks: 532/545</div>
              </div>
            </div>

            {/* 3rd Position */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg"
              style={{
                background: "rgba(205, 127, 50, 0.3)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(205, 127, 50, 0.4)",
              }}
            >
              <Award className="text-orange-300 flex-shrink-0" size={32} />
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702296/MOMINA_MANSHA_ogl2jd.jpg"
                alt="Momina"
                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
              />
              <div className="text-left flex-1">
                <div className="text-yellow-500 font-bold text-lg">3rd Position</div>
                <div className="text-green-900">Momina</div>
                <div className="text-red-800 text-sm">Roll No: 206676</div>
                <div className="text-red-600 font-semibold">Marks: 538/545</div>
              </div>
            </div>
          </div>

          {/* All Results Button */}
          <div className="space-y-3">
            <a
              href="https://res.cloudinary.com/dvvbxrs55/image/upload/v1755702576/WhatsApp_Image_2025-08-20_at_6.26.30_PM_szf5ts.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              style={{
                background: "rgba(59, 130, 246, 0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
              }}
            >
              View All Remaining Results
            </a>
            <button onClick={handleClose} className="w-full text-white/70 hover:text-white transition-colors text-sm">
              Close
            </button>
          </div>

          <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
            <div className="text-xs text-white/70">Congratulations to all our students! 🎓</div>
          </div>
        </div>
      </div>
    </div>
  )
}
