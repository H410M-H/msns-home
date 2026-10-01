import { type Metadata, type Viewport } from "next";
import HomeClient from "./home-client";

export const viewport: Viewport = {
  themeColor: "#064e3b",
};

export const metadata: Metadata = {
  title: {
    absolute: "M. S. Naz High School® | Top Matric & Oxford School in Wazirabad",
  },
  description: "Discover academic excellence at M. S. Naz High School Wazirabad. Offering Oxford curriculum, BISE Gujranwala matric distinctions, modern science labs, and LMS.",
  keywords: [
    "best school in Ghakhar Mandi",
    "top school in Wazirabad",
    "best matric school Gujranwala",
    "M. S. Naz High School",
    "MSNS",
    "BISE Gujranwala affiliation code 112199",
    "Oxford curriculum school Punjab",
    "school with LMS Pakistan",
    "matric science admission",
    "Ghakhar Mandi school",
    "Wazirabad high school",
    "high school G.T. Road",
    "Naz LMS portal"
  ],
  alternates: {
    canonical: "https://www.msns.edu.pk",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "M. S. Naz High School® | Top Matric & Oxford School in Wazirabad",
    description: "Discover academic excellence at M. S. Naz High School Wazirabad. Offering Oxford curriculum, BISE Gujranwala matric distinctions, modern science labs, and LMS.",
    url: "https://www.msns.edu.pk",
    siteName: "M. S. Naz High School®",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M. S. Naz High School® Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M. S. Naz High School® | Top Matric & Oxford School in Wazirabad",
    description: "Discover academic excellence at M. S. Naz High School Wazirabad. Offering Oxford curriculum, BISE Gujranwala matric distinctions, modern science labs, and LMS.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function Home() {
  return (
    <>
      {/* Preload logo for header and initial hero video */}
      <link
        rel="preload"
        href="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
        as="image"
      />
      <link
        rel="preload"
        href="/api/images/videos/clip1_awtegx.mp4"
        as="video"
        type="video/mp4"
      />
      <HomeClient />
    </>
  );
}
