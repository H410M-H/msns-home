import { type Metadata } from "next";
import AdmissionClient from "./admission-client";

export const metadata: Metadata = {
  title: "Admissions & Tuition Fees | M. S. Naz High School®",
  description: "Apply for admission at M. S. Naz High School. Discover our fee structure, admission criteria, key dates, registration guidelines, and frequently asked questions.",
  alternates: {
    canonical: "https://www.msns.edu.pk/admission",
  },
  openGraph: {
    title: "Admissions & Tuition Fees | M. S. Naz High School®",
    description: "Apply for admission at M. S. Naz High School. Discover our fee structure, admission criteria, key dates, registration guidelines, and frequently asked questions.",
    url: "https://www.msns.edu.pk/admission",
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
    title: "Admissions & Tuition Fees | M. S. Naz High School®",
    description: "Apply for admission at M. S. Naz High School. Discover our fee structure, admission criteria, key dates, registration guidelines, and frequently asked questions.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function Admission() {
  return <AdmissionClient />;
}