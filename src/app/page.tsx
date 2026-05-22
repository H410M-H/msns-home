"use client";

import { HeroHome } from "~/components/blocks/landing/HeroSection";
import { QuickLinksSection } from "~/components/blocks/landing/QuickLinksSection";
import { FeaturesSection } from "~/components/blocks/landing/FeaturesSection";
import { CTASection } from "~/components/blocks/landing/CTASection";
import { TestimonialsSection } from "~/components/blocks/landing/Testimonials";
import PopupAd from "~/components/blocks/landing/popup-ad";
import { Toaster } from "~/components/ui/sonner";
import InfiniteGallery from "~/components/blocks/landing/InfiniteGallery";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

interface GalleryImage {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
}

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<{ src: string, alt: string }[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = (await res.json()) as { images: GalleryImage[] };

        if (data.images && data.images.length > 0) {
          const imagesOnly = data.images.filter((img) => {
            const filename = img.key.split("/").pop() ?? "";
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(filename) || img.key.startsWith("videos/");
            return !isVideo;
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

    void fetchGallery();
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
