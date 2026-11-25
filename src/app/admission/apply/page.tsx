import { type Metadata } from "next";
import { OnlineAdmissionForm } from "~/components/blocks/landing/online-admission-form";

export const metadata: Metadata = {
  title: "Online Student Registration Form | Academic Year 2026–2027",
  description:
    "Apply for online student admission at M. S. Naz High School. Submit your registration form for Playgroup to Grade 10 Matriculation 2026–2027 academic sessions.",
  alternates: {
    canonical: "https://www.msns.edu.pk/admission/apply",
  },
  openGraph: {
    title: "Online Student Registration Form | Academic Year 2026–2027",
    description:
      "Apply online for admission at M. S. Naz High School for Playgroup to Grade 10 Matriculation, academic session 2026–2027.",
    url: "https://www.msns.edu.pk/admission/apply",
    siteName: "M. S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        alt: "M.S. Naz High School® Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OnlineAdmissionPage() {
  return <OnlineAdmissionForm />;
}
