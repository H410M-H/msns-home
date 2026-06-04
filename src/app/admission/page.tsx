import { type Metadata } from "next";
import AdmissionClient from "./admission-client";

export const metadata: Metadata = {
  title: "Admissions & Tuition Fees | M. S. Naz High School®",
  description: "Apply for admission at M. S. Naz High School. Discover our fee structure, admission criteria, key dates, registration guidelines, and frequently asked questions.",
  alternates: {
    canonical: "https://www.msns.edu.pk/admission",
  },
};

export default function Admission() {
  return <AdmissionClient />;
}