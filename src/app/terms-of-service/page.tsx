import { type Metadata } from "next";
import TermsClient from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy | M. S. Naz High School®",
  description: "Read the institutional governance, terms of service, and privacy policies for M. S. Naz High School, including affiliations, society rules, and LMS documentation.",
  alternates: {
    canonical: "https://www.msns.edu.pk/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service & Privacy Policy | M. S. Naz High School®",
    description: "Read the institutional governance, terms of service, and privacy policies for M. S. Naz High School, including affiliations, society rules, and LMS documentation.",
    url: "https://www.msns.edu.pk/terms-of-service",
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
    title: "Terms of Service & Privacy Policy | M. S. Naz High School®",
    description: "Read the institutional governance, terms of service, and privacy policies for M. S. Naz High School, including affiliations, society rules, and LMS documentation.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function Terms() {
  return <TermsClient />;
}
