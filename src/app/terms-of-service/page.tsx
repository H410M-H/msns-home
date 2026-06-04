import { type Metadata } from "next";
import TermsClient from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy | M. S. Naz High School®",
  description: "Read the institutional governance, terms of service, and privacy policies for M. S. Naz High School, including affiliations, society rules, and LMS documentation.",
  alternates: {
    canonical: "https://www.msns.edu.pk/terms-of-service",
  },
};

export default function Terms() {
  return <TermsClient />;
}
