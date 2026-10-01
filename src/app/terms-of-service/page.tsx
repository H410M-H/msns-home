import { type Metadata } from "next";
import TermsClient from "./terms-client";

export const metadata: Metadata = {
  title: "Institutional Terms of Service & Code of Conduct",
  description: "Review institutional terms of service, campus enrollment policies, student code of conduct, and educational governance guidelines at M. S. Naz High School.",
  alternates: {
    canonical: "https://www.msns.edu.pk/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Institutional Terms of Service & Code of Conduct",
    description: "Review institutional terms of service, campus enrollment policies, student code of conduct, and educational governance guidelines at M. S. Naz High School.",
    url: "https://www.msns.edu.pk/terms-of-service",
    siteName: "M. S. Naz High School®",
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
    title: "Institutional Terms of Service & Code of Conduct",
    description: "Review institutional terms of service, campus enrollment policies, student code of conduct, and educational governance guidelines at M. S. Naz High School.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function Terms() {
  return <TermsClient />;
}
