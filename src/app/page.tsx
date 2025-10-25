import { HeroHome } from "~/components/blocks/landing/HeroSection";
import { QuickLinksSection } from "~/components/blocks/landing/QuickLinksSection";
import { FeaturesSection } from "~/components/blocks/landing/FeaturesSection";
import { CTASection } from "~/components/blocks/landing/CTASection";
import { TestimonialsSection } from "~/components/blocks/landing/Testimonials";
import PopupAd from "~/components/blocks/landing/popup-ad";
import { Toaster } from "~/components/ui/sonner";
import InfiniteGallery from "~/components/blocks/landing/InfiniteGallery";

export default function Home() {
  const sampleImages = [
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3014_icmkop.jpg', alt: 'Artwork 1' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3135_dpeqqk', alt: 'Artwork 2' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3033_fdu53k', alt: 'Artwork 3' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/H7H_1546_sgmxes', alt: 'Artwork 4' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/DSC_7276_bzzyos', alt: 'Artwork 5' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3206_hmqckk', alt: 'Artwork 6' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3151_gsuhua', alt: 'Artwork 7' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/DSC_5468_rguj4x', alt: 'Artwork 8' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/v1761399399/POSTER_vb1tvs.jpg', alt: 'Artwork 9' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/v1761399472/DSC_6774_zymsqa.jpg', alt: 'Artwork 10' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3330_kneelc', alt: 'Artwork 11' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3254_rf7grp', alt: 'Artwork 11' },
    { src: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3276_rgkfiv', alt: 'Artwork 11' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-800/60 to-emerald-50 font-sans">
      <HeroHome />
      <section className="relative py-12">
        <InfiniteGallery
          images={sampleImages}
          speed={1.2}
          zSpacing={3}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-[70vh] w-full rounded-lg overflow-hidden shadow-lg"
          style={{ background: 'transparent' }}
        />

      </section>
      <PopupAd />
      <Toaster richColors closeButton />
      <QuickLinksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}