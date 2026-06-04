import { type Metadata } from "next";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "M. S. Naz High School® | Wazirabad's Top Academic School",
  description: "Welcome to M. S. Naz High School. Explore our student-centered learning programs, admissions details, latest announcements, and educational community.",
  alternates: {
    canonical: "https://www.msns.edu.pk",
  },
};

export default function Home() {
  return <HomeClient />;
}
