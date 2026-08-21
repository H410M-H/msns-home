import React from "react";
import type { Metadata } from "next";
import { Header } from "~/components/blocks/nav/Header";
import { Footer } from "~/components/blocks/nav/footer/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | M.S. Naz High School",
  description: "Privacy Policy and data protection terms for M.S. Naz High School.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-yellow-50 via-white to-green-50">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-28 md:py-36 text-slate-800">
        <div className="rounded-3xl border border-green-100 bg-white/80 p-8 md:p-12 shadow-xl backdrop-blur-md">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-green-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-green-700 font-medium mb-8">
            Last updated: August 2026
          </p>

          <div className="space-y-6 text-slate-700 leading-relaxed text-base">
            <section>
              <h2 className="text-xl font-bold text-green-950 mb-2">1. Overview</h2>
              <p>
                M.S. Naz High School (&quot;MSNS&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the
                official school website and related digital services.
                This Privacy Policy informs students, parents, and visitors of our practices regarding the collection, use,
                and protection of information provided to us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-950 mb-2">2. Information Collection</h2>
              <p>
                When inquiring about admissions, submitting online applications, or contacting the school, we may collect
                contact information including name, parent contact details, email address, phone numbers, and academic history.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-950 mb-2">3. Data Security & Storage</h2>
              <p>
                We employ industry-standard encryption (HTTPS / SSL) and secure cloud infrastructure to protect all communications
                and submitted documents against unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-green-950 mb-2">4. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact the administrative office at{" "}
                <a href="mailto:info@msns.edu.pk" className="text-green-700 font-bold hover:underline">
                  info@msns.edu.pk
                </a>{" "}
                or call{" "}
                <a href="tel:+923187625415" className="text-green-700 font-bold hover:underline">
                  +92 318 7625415
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
