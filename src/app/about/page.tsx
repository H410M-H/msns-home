import { type Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | M. S. Naz High School® | Mission & History",
  description: "Learn about the mission, values, and history of M. S. Naz High School. Explore a message from our leadership, our key statistics, and our commitment to educational excellence.",
  alternates: {
    canonical: "https://www.msns.edu.pk/about",
  },
  openGraph: {
    title: "About Us | M. S. Naz High School® | Mission & History",
    description: "Learn about the mission, values, and history of M. S. Naz High School. Explore a message from our leadership, our key statistics, and our commitment to educational excellence.",
    url: "https://www.msns.edu.pk/about",
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
    title: "About Us | M. S. Naz High School® | Mission & History",
    description: "Learn about the mission, values, and history of M. S. Naz High School. Explore a message from our leadership, our key statistics, and our commitment to educational excellence.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function About() {
  return <AboutClient />;
}
