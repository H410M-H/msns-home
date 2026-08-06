import { type Metadata } from "next";
import { OnlineAdmissionForm } from "~/components/blocks/landing/online-admission-form";

export const metadata: Metadata = {
  title: "Online Admission Application Form | M. S. Naz High School®",
  description: "Apply for online admission at M. S. Naz High School. Fill out the application form for student registration.",
  alternates: {
    canonical: "https://www.msns.edu.pk/admission/apply",
  },
};

export default function OnlineAdmissionPage() {
  return <OnlineAdmissionForm />;
}
