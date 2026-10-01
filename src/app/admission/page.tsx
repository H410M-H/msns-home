import { type Metadata } from "next";
import AdmissionClient from "./admission-client";
import { FAQSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "Admissions 2026–2027 | Fee Structure & Criteria",
  description: "Join M. S. Naz High School. Explore admissions criteria, transparent fee structures, merit scholarships, registration deadlines, and download the prospectus.",
  alternates: {
    canonical: "https://www.msns.edu.pk/admission",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Admissions 2026–2027 | Fee Structure & Criteria | M. S. Naz High School®",
    description: "Join M. S. Naz High School. Explore admissions criteria, transparent fee structures, merit scholarships, registration deadlines, and download the prospectus.",
    url: "https://www.msns.edu.pk/admission",
    siteName: "M. S. Naz High School®",
    type: "website",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M. S. Naz High School® Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admissions 2026–2027 | Fee Structure & Criteria | M. S. Naz High School®",
    description: "Join M. S. Naz High School. Explore admissions criteria, transparent fee structures, merit scholarships, registration deadlines, and download the prospectus.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
  },
};

const admissionFaqs = [
  {
    question: "When can I apply for admission at M.S. Naz High School?",
    answer: "Our main admission cycle begins in January for the academic year starting in August. We also accept mid-term admissions subject to seat availability in respective grades."
  },
  {
    question: "How can I check the status of my admission application?",
    answer: "You can log in to the MSNS parent portal using the credentials provided during submission, or contact our admissions office directly via phone or WhatsApp."
  },
  {
    question: "What is the student-teacher ratio at MSNS?",
    answer: "We maintain an optimal student-teacher ratio of 1:16 to guarantee personalized attention, targeted academic mentoring, and individual student care."
  },
  {
    question: "Do you offer merit-based scholarships or financial aid?",
    answer: "Yes, MSNS provides merit-based academic scholarships for top position holders as well as need-based financial aid for deserving families."
  },
  {
    question: "What curriculum does M.S. Naz High School follow?",
    answer: "Our school follows a comprehensive curriculum in partnership with Oxford University Press from Early Years to Middle School, and is affiliated with BISE Gujranwala for 9th and 10th grade Matriculation (Science and Computer Science), integrated with hands-on AI and science laboratory training."
  },
  {
    question: "Are school transport services available for students?",
    answer: "Yes, dedicated school transport services are available across Ghakhar Mandi, Wazirabad, and surrounding feeder localities."
  }
];

export default function Admission() {
  return (
    <>
      <FAQSchema items={admissionFaqs} />
      <AdmissionClient />
    </>
  );
}