"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface NinthResultPopupProps {
  onClose: () => void;
}

export default function NinthResultPopup({ onClose }: NinthResultPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 500); // wait for animation to finish
  }, [onClose]);

  useEffect(() => {
    // Show popup shortly after mount
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }
        const particleCount = 50 * (timeLeft / duration);
        void confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
    }, 500);

    // Auto close after 5.5 seconds (500ms delay + 5s visible)
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 5500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isVisible) return null;

  const images = [
    "/api/images/resolve/270675",
    "/api/images/resolve/270676",
    "/api/images/resolve/270677",
    "/api/images/resolve/270678"
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      onClick={handleBackdropClick}
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
      }}
    >
      <style jsx>{`
        @keyframes slideIn {
          0% { transform: translateY(40px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes slideOut {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(30px) scale(0.95); opacity: 0; }
        }
      `}</style>

      <div
        className={`relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 shadow-2xl bg-gradient-to-br from-indigo-900/90 to-purple-900/90 transition-all duration-500 ${
          isClosing ? "animate-[slideOut_0.5s_ease-in_forwards]" : "animate-[slideIn_0.6s_ease-out]"
        }`}
        style={{
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all border border-white/10 hover:scale-105"
          aria-label="Close popup"
        >
          <X size={18} />
        </button>
        
        <div className="p-6 md:p-10 text-center">
          <div className="mb-4 inline-block rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-yellow-300 bg-yellow-500/20 border border-yellow-500/40">
            🎉 Results Announced
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md mb-2">
            9th Class Outstanding Results!
          </h2>
          <p className="text-purple-200 text-lg md:text-xl mb-8">
            Congratulations to our brilliant students for their exceptional performance ✨
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {images.map((src, idx) => (
              <a
                key={idx}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/20 shadow-lg group block bg-white/5"
              >
                <Image
                  src={src}
                  alt={`9th Class Result ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-white bg-indigo-600/90 px-3 py-1.5 rounded-full border border-indigo-400/30">
                    View Full Image
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
