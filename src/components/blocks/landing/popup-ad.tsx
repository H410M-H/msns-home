"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, GraduationCap } from "lucide-react"
import { Button } from "~/components/ui/button"

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
        className="max-w-md w-full relative animate-in fade-in zoom-in duration-300 transform-gpu"
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
        <Button
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
        </Button>

        {/* Popup Content */}
        <div className="p-8 text-center">
          <div
            className="inline-block text-white px-3 py-1 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "rgba(59, 130, 246, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            ACADEMIC SPECIAL
          </div>

          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="text-white mr-2 drop-shadow-lg" size={32} />
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Get Your 9th Result Free Copy</h2>
          </div>

          <p className="text-white/90 mb-6 leading-relaxed drop-shadow-sm">
            Access your academic results instantly! Get your 9th grade result copy absolutely free. Join thousands of
            students who trust us for their academic records.
          </p>



          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              style={{
                background: "rgba(59, 130, 246, 0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
              }}
            >
              Get My Free Result Copy
            </button>
            <button onClick={handleClose} className="w-full text-white/70 hover:text-white transition-colors text-sm">
              Maybe later
            </button>
          </div>

          <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
            <div className="flex items-center justify-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Official results
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure & verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
