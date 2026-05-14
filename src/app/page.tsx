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

// Fallback static images served from S3 proxy (used when API fails or during SSR)
const FALLBACK_IMAGES = [
  { src: "/api/images/logos/mono_MS_Naz_School_ue6upl.png", alt: "M.S. Naz School" },
  { src: "/api/images/gallery/IMG_3349_ldaqqy.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3360_h9xvsz.jpg", alt: "School Event" },
  { src: "/api/images/gallery/DSC_6774_zymsqa.jpg", alt: "School Event" },
  { src: "/api/images/gallery/POSTER_vb1tvs.jpg", alt: "School Poster" },
  { src: "/api/images/gallery/IMG_3135_dzhkaf.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3045_rrwon6.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3015_ocmbrn.jpg", alt: "School Event" },
  { src: "/api/images/gallery/H7H_1547_scojlx.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3033_fdu53k.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3101_tib63s.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_2930_kfkrzt.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3136_nufwsu.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3276_rgkfiv.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_2873_ecywt5.jpg", alt: "School Event" },
  { src: "/api/images/gallery/DSC_6199_elv8zj.jpg", alt: "School Event" },
  { src: "/api/images/gallery/20240211_154156_ptbmlx.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3037_djwx6t.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG-20240917-WA0095_mvfjpv.jpg", alt: "School Event" },
  { src: "/api/images/gallery/DSC_6184_ozj3hr.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3330_kneelc.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3218_jmv7n8.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3151_gsuhua.jpg", alt: "School Event" },
  { src: "/api/images/gallery/designJpg/j7enn3yegbeql8xvr5pm.png", alt: "Design" },
  { src: "/api/images/gallery/designJpg/t8qsbmfqaibg3eyktszk.png", alt: "Design" },
  { src: "/api/images/gallery/DSC_8987_pfrlog.jpg", alt: "School Event" },
  { src: "/api/images/gallery/DSC_5049_ojzbjj.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_3095_y27vai.jpg", alt: "School Event" },
  { src: "/api/images/gallery/DSC_6082_ogohxu.jpg", alt: "School Event" },
  { src: "/api/images/gallery/IMG_E2799_g5fgq7.jpg", alt: "School Event" },
  { src: "/api/images/gallery/DSC_6187_j6ovz3.jpg", alt: "School Event" },
  { src: "/api/images/gallery/H7H_4932_xjhmck.jpg", alt: "School Event" },
  { src: "/api/images/logos/mono_MS_Naz_School_ue6upl.png", alt: "M.S. Naz School" },
];

export default function Home() {
  const [galleryImages, setGalleryImages] = useState(FALLBACK_IMAGES);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = (await res.json()) as { images: GalleryImage[] };

        if (data.images && data.images.length > 0) {
          setGalleryImages(
            data.images.map((img) => ({
              src: img.url,
              alt: img.key.split("/").pop()?.replace(/[-_]/g, " ") ?? "Gallery Image",
            }))
          );
        }
      } catch {
        // Keep fallback images on error
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
