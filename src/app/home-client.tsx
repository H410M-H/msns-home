"use client";

import { useEffect, useState } from "react";
import { HeroHome } from "~/components/blocks/landing/HeroSection";
import { QuickLinksSection } from "~/components/blocks/landing/QuickLinksSection";
import { FeaturesSection } from "~/components/blocks/landing/FeaturesSection";
import { CTASection } from "~/components/blocks/landing/CTASection";
import { TestimonialsSection } from "~/components/blocks/landing/Testimonials";
import dynamic from "next/dynamic";
import { Toaster } from "~/components/ui/sonner";

const InfiniteGallery = dynamic(
  () => import("~/components/blocks/landing/InfiniteGallery"),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[70vh] md:h-screen w-full bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400" />
          </div>
          <p className="text-sm text-white/40 tracking-wide uppercase">
            Loading Gallery…
          </p>
        </div>
      </div>
    ),
  }
);

// Lazy-load PopupAd — it shows after 4s anyway, no need to block initial paint
const PopupAd = dynamic(
  () => import("~/components/blocks/landing/popup-ad"),
  { ssr: false }
);

interface GalleryImage {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
}

export default function HomeClient() {
  const [galleryImages, setGalleryImages] = useState<{ src: string, alt: string }[]>([]);

  useEffect(() => {
    // Defer gallery fetch until after initial paint to avoid blocking LCP
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        void fetchGallery();
      }, 1500);
      return () => clearTimeout(timer);
    });

    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = (await res.json()) as { images: GalleryImage[] };

        if (data.images && data.images.length > 0) {
          const imagesOnly = data.images.filter((img) => {
            const filename = img.key.split("/").pop() ?? "";
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(filename) || img.key.startsWith("videos/");
            return !isVideo && img.key.toLowerCase().startsWith("gallery/landing/");
          });

          setGalleryImages(
            imagesOnly.map((img) => ({
              src: img.url,
              alt: img.key.split("/").pop()?.replace(/[-_]/g, " ") ?? "Gallery Image",
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-green-800/60 to-emerald-50 font-sans">
      <HeroHome />
      <PopupAd />
      <Toaster richColors closeButton />
      <FeaturesSection />
      <InfiniteGallery
        images={galleryImages}
        speed={1.0}
        visibleCount={12}
      />
      <QuickLinksSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
