import { type Metadata } from "next";
import { OnlineAdmissionForm } from "~/components/blocks/landing/online-admission-form";

export const metadata: Metadata = {
  title: "Online Student Registration Form | Academic Year 2026–2027",
  description: "Apply for online student admission at M. S. Naz High School. Submit your registration form for Playgroup to Grade 10 Matriculation 2026–2027 academic sessions.",
  alternates: {
    canonical: "https://www.msns.edu.pk/admission/apply",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OnlineAdmissionPage() {
  return <OnlineAdmissionForm />;
}
