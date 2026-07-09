import { type Metadata, type Viewport } from "next";
import HomeClient from "./home-client";

export const viewport: Viewport = {
  themeColor: "#064e3b",
};

export const metadata: Metadata = {
  title: "M. S. Naz High School® | Wazirabad's Top Academic School",
  description: "Welcome to M. S. Naz High School. Explore our student-centered learning programs, admissions details, latest announcements, and educational community.",
  alternates: {
    canonical: "https://www.msns.edu.pk",
  },
};

export default function Home() {
  return (
    <>
      {/* Preload the first hero video for faster LCP */}
      <link
        rel="preload"
        href="/api/images/videos/clip1_awtegx.mp4"
        as="video"
        type="video/mp4"
      />
      {/* Preload logo for header */}
      <link
        rel="preload"
        href="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
        as="image"
      />
      <HomeClient />
    </>
  );
}
