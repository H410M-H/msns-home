"use client";

import { HeroHome } from "~/components/blocks/landing/HeroSection";
import { QuickLinksSection } from "~/components/blocks/landing/QuickLinksSection";
import { FeaturesSection } from "~/components/blocks/landing/FeaturesSection";
import { CTASection } from "~/components/blocks/landing/CTASection";
import { TestimonialsSection } from "~/components/blocks/landing/Testimonials";
import PopupAd from "~/components/blocks/landing/popup-ad";
import { Toaster } from "~/components/ui/sonner";
import InfiniteGallery from "~/components/blocks/landing/InfiniteGallery";

export const dynamic = "force-dynamic";
export default function Home() {
  const sampleImages = [
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761399181/IMG_3349_ldaqqy.jpg",
  alt: "Artwork 1",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761399166/IMG_3360_h9xvsz.jpg",
  alt: "Artwork 2",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761399472/DSC_6774_zymsqa.jpg",
  alt: "Artwork 3",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761399399/POSTER_vb1tvs.jpg",
  alt: "Artwork 4",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761399141/IMG_3135_dzhkaf.jpg",
  alt: "Artwork 5",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398991/IMG_3045_rrwon6.jpg",
  alt: "Artwork 6",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398989/IMG_3015_ocmbrn.jpg",
  alt: "Artwork 7",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398835/H7H_1547_scojlx.jpg",
  alt: "Artwork 8",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398748/IMG_3033_fdu53k.jpg",
  alt: "Artwork 9",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398687/IMG_3101_tib63s.jpg",
  alt: "Artwork 10",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398670/IMG_2930_kfkrzt.jpg",
  alt: "Artwork 11",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398555/IMG_3136_nufwsu.jpg",
  alt: "Artwork 12",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398973/IMG_3276_rgkfiv.jpg",
  alt: "Artwork 13",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398501/IMG_2873_ecywt5.jpg",
  alt: "Artwork 14",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398304/DSC_6199_elv8zj.jpg",
  alt: "Artwork 15",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1729267664/20240211_154156_ptbmlx.jpg",
  alt: "Artwork 16",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761398737/IMG_3037_djwx6t.jpg",
  alt: "Artwork 17",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1762035328/IMG-20240917-WA0095_mvfjpv.jpg",
  alt: "Artwork 18",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/IMG_3330_kneelc.jpg",
  alt: "Artwork 29",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/IMG_3218_jmv7n8.jpg",
  alt: "Artwork 20",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1761399118/IMG_3151_gsuhua.jpg",
  alt: "Artwork 21",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1737373454/designJpg/j7enn3yegbeql8xvr5pm.png",
  alt: "Artwork 22",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1737373440/designJpg/t8qsbmfqaibg3eyktszk.png",
  alt: "Artwork 23",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/w_1600,h_1200,c_fill,q_auto,f_auto/v1762033772/DSC_5049_ojzbjj.jpg",
  alt: "Artwork 24",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/IMG_3095_y27vai.jpg",
  alt: "Artwork 25",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/DSC_6082_ogohxu.jpg",
  alt: "Artwork 26",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/IMG_E2799_g5fgq7.jpg",
  alt: "Artwork 27",
},
{
  src: "https://res.cloudinary.com/dvvbxrs55/image/upload/DSC_6187_j6ovz3.jpg",
  alt: "Artwork 28",
},  
];
  return (
    <main className="min-h-screen bg-linear-to-br from-green-800/60 to-emerald-50 font-sans">
      <HeroHome />
      <PopupAd />
      <Toaster richColors closeButton />
      <FeaturesSection />
        <InfiniteGallery
          images={sampleImages}
          speed={1.2}
          visibleCount={11}
          className="h-[70vh] w-full overflow-hidden rounded-lg shadow-lg"
          style={{ background: "transparent" }}
        />
            <QuickLinksSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
