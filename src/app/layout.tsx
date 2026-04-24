// src/app/layout.tsx


import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/components/blocks/nav/footer/footer";
import { Header } from "~/components/blocks/nav/Header";
import { Toaster } from "~/components/ui/sonner";
import { SchoolSchema } from "~/components/SEOSchema";

export const metadata: Metadata = {
  title: "M. S. NAZ HIGH SCHOOL®",
  verification: {
    google: "UEssQjRtMsHt_ioT8H5RUA2Rnl0_9QEl0d8tL6JBi1E",
  },
  other: {
    "google-adsense-account": "ca-pub-1351871288722699",
  },
  description: "Since - 2004 | Developed by MSNS-DEV™",
  keywords: ["msns", "m s naz", "m s naz high school", "msnaz", "m s naz oxford", " oxford", "msnazhighschool", "lms", "top schools", "ghakkhar", "gakhar", "wazirabad", "gujranwala", "sialkot", "lahore", "punjab", "pakistan", "msns-dev", "M.S. Naz High School®",
    "educational excellence",
    "academic achievement",
    "leadership development",
    "school admissions",
    "extra-curricular activities",
    "student-centered learning",
    "modern education standards",
    "high school education",
    "oxford school",
    "oxford contact",
    "msnz",
    "Pakistani education system"].join(", "),
  openGraph: {
    title: "M.S. Naz High School®",
    description: "Explore the premier educational experience at M.S. Naz High School® focused on excellence and student development.",
    url: "https://msns.edu.pk/",
    siteName: "M.S. Naz High School®",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267533/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M.S. Naz High School® Logo"
      }
    ]
  },
  appLinks: {
    web: {
      url: "https://lms.msns.edu.pk",
      should_fallback: true
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "Education",
  alternates: {
    canonical: "https://msns.edu.pk",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17684760807"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17684760807');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "we8pqjiu3j");
          `}
        </Script>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1351871288722699"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <SchoolSchema />
      </head>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <Header />
          <main className="flex-1">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
