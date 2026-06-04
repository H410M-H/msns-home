import { type Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | M. S. Naz High School® | Mission & History",
  description: "Learn about the mission, values, and history of M. S. Naz High School. Explore a message from our leadership, our key statistics, and our commitment to educational excellence.",
  alternates: {
    canonical: "https://www.msns.edu.pk/about",
  },
};

export default function About() {
  return <AboutClient />;
}
