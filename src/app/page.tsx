import { type Metadata } from "next";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "M. S. Naz High School® | Wazirabad's Top Academic School",
  description: "Welcome to M. S. Naz High School. Explore our student-centered learning programs, admissions details, latest announcements, and educational community.",
  alternates: {
    canonical: "https://www.msns.edu.pk",
  },
  openGraph: {
    title: "M. S. Naz High School® | Wazirabad's Top Academic School",
    description: "Welcome to M. S. Naz High School. Explore our student-centered learning programs, admissions details, latest announcements, and educational community.",
    url: "https://www.msns.edu.pk",
    siteName: "M.S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M. S. Naz High School® | Wazirabad's Top Academic School",
    description: "Welcome to M. S. Naz High School. Explore our student-centered learning programs, admissions details, latest announcements, and educational community.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
