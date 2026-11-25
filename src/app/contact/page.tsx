import { type Metadata } from "next";
import { ContactInfo } from "~/components/blocks/landing/ContactInfo";
import { GeometricBackground } from "~/components/blocks/landing/GeometricBg";

export const metadata: Metadata = {
  title: "Contact Admissions & Campus Office | Directions & Helplines",
  description:
    "Contact M. S. Naz High School campus in Ghakhar Mandi & Wazirabad. Get admission helplines, official emails, campus visiting hours, and Google Maps directions.",
  alternates: {
    canonical: "https://www.msns.edu.pk/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Admissions & Campus Office | Directions & Helplines",
    description:
      "Contact M. S. Naz High School campus in Ghakhar Mandi & Wazirabad. Get admission helplines, official emails, campus visiting hours, and Google Maps directions.",
    url: "https://www.msns.edu.pk/contact",
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
    title: "Contact Admissions & Campus Office | Directions & Helplines",
    description:
      "Contact M. S. Naz High School campus in Ghakhar Mandi & Wazirabad. Get admission helplines, official emails, campus visiting hours, and Google Maps directions.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GeometricBackground />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4 py-16">
        <div className="w-full max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="mb-6 bg-linear-to-r from-white to-blue-300 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80 md:text-xl">
              We are here to help! Reach out to us through any of the contact
              methods below and our team will get back to you as soon as
              possible.
            </p>
          </div>

          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
