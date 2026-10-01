import { type Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Our School | Vision, Heritage & Leadership",
  description: "Explore the 20+ year legacy of M. S. Naz High School. Learn about our founding vision, academic leadership, core values, and dedication to student development.",
  alternates: {
    canonical: "https://www.msns.edu.pk/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Our School | Vision, Heritage & Leadership | M. S. Naz High School®",
    description: "Explore the 20+ year legacy of M. S. Naz High School. Learn about our founding vision, academic leadership, core values, and dedication to student development.",
    url: "https://www.msns.edu.pk/about",
    siteName: "M. S. Naz High School®",
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
    title: "About Our School | Vision, Heritage & Leadership | M. S. Naz High School®",
    description: "Explore the 20+ year legacy of M. S. Naz High School. Learn about our founding vision, academic leadership, core values, and dedication to student development.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function About() {
  return <AboutClient />;
}
