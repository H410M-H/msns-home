"use client"

import { useEffect, useState } from "react"

export default function GeometricBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-900">
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900"></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        {/* Large shapes */}
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
        <div className="geometric-shape shape-4"></div>
        <div className="geometric-shape shape-5"></div>
        
        {/* Small floating particles */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              opacity: Math.random() * 0.5 + 0.3,
              backgroundColor: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/50"></div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        .geometric-shape {
          position: absolute;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(40px);
          opacity: 0.5;
          animation: morph 15s linear infinite alternate;
        }
        
        .shape-1 {
          top: -15%;
          left: -10%;
          width: 40%;
          height: 40%;
          background: linear-gradient(90deg, rgba(76, 0, 255, 0.5) 0%, rgba(76, 0, 255, 0.2) 100%);
          animation-delay: 0s;
        }
        
        .shape-2 {
          bottom: -15%;
          right: -10%;
          width: 35%;
          height: 35%;
          background: linear-gradient(90deg, rgba(255, 0, 221, 0.5) 0%, rgba(255, 0, 221, 0.2) 100%);
          animation-delay: -5s;
        }
        
        .shape-3 {
          top: 30%;
          right: 10%;
          width: 30%;
          height: 30%;
          background: linear-gradient(90deg, rgba(0, 183, 255, 0.5) 0%, rgba(0, 183, 255, 0.2) 100%);
          animation-delay: -2.5s;
        }
        
        .shape-4 {
          bottom: 20%;
          left: 10%;
          width: 25%;
          height: 25%;
          background: linear-gradient(90deg, rgba(0, 255, 170, 0.5) 0%, rgba(0, 255, 170, 0.2) 100%);
          animation-delay: -7.5s;
        }
        
        .shape-5 {
          top: 40%;
          left: 30%;
          width: 20%;
          height: 20%;
          background: linear-gradient(90deg, rgba(255, 166, 0, 0.5) 0%, rgba(255, 166, 0, 0.2) 100%);
          animation-delay: -10s;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float 15s ease-in-out infinite;
        }
        
        @keyframes morph {
          0% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
          50% {
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
          75% {
            border-radius: 30% 70% 70% 30% / 70% 30% 70% 30%;
          }
          100% {
            border-radius: 70% 30% 30% 70% / 30% 70% 30% 70%;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(10px) translateX(-15px) rotate(180deg);
          }
          75% {
            transform: translateY(-15px) translateX(-10px) rotate(270deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
