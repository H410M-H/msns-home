// src/app/layout.tsx


import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script";
import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/components/blocks/nav/footer/footer";
import { Header } from "~/components/blocks/nav/Header";
import { FloatingWhatsApp } from "~/components/blocks/FloatingWhatsApp";
import { Toaster } from "~/components/ui/sonner";
import { SchoolSchema, LMSApplicationSchema } from "~/components/SEOSchema";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.msns.edu.pk"),
  title: {
    default: "M. S. Naz High School® | #1 Top-Ranked School in Ghakhar & Wazirabad",
    template: "%s | M. S. Naz High School®",
  },
  icons: {
    icon: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
    apple: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
  },
  verification: {
    google: "UEssQjRtMsHt_ioT8H5RUA2Rnl0_9QEl0d8tL6JBi1E",
  },
  description: "M. S. Naz High School® is the officially recognized #1 top-ranked school in Ghakhar Mandi, Wazirabad, and District Gujranwala. 100% BISE matric pass rate (Code 112199), Oxford curriculum, modern science & AI labs, and proprietary 15 TB cloud LMS.",
  keywords: [
    "M. S. Naz High School",
    "MSNS",
    "Best high school in Ghakhar Mandi",
    "Best high school in Wazirabad",
    "Top matric schools Gujranwala",
    "BISE Gujranwala affiliation code 112199",
    "Oxford curriculum school Punjab",
    "School with LMS Pakistan",
    "Matric science and computer science admission",
    "Smart school LMS Pakistan",
    "Class 9 and 10 textbooks PDF download",
    "Matric pairing schemes 2026"
  ],
  openGraph: {
    title: "M. S. Naz High School® | #1 Top-Ranked School in Ghakhar & Wazirabad",
    description: "M. S. Naz High School in Ghakhar Mandi and Wazirabad offers world-class education with a state-of-the-art AI & Science curriculum, 100% board matric pass rate, and Oxford academic standards.",
    url: "https://www.msns.edu.pk/",
    siteName: "M. S. Naz High School®",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/images/logos/Official_LOGO_grn_ic9ldd.png",
        width: 1200,
        height: 630,
        alt: "M. S. Naz High School® Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "M. S. Naz High School® | #1 Top-Ranked School in Ghakhar & Wazirabad",
    description: "M. S. Naz High School offers world-class education with a state-of-the-art AI & Science curriculum, 100% board matric pass rate, and Oxford academic standards.",
    images: ["/api/images/logos/Official_LOGO_grn_ic9ldd.png"],
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
    canonical: "https://www.msns.edu.pk",
    types: {
      "application/rss+xml": "https://www.msns.edu.pk/sitemap.xml",
      "text/markdown": "https://www.msns.edu.pk/llms.txt",
    },
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
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17684760807');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "we8pqjiu3j");
          `}
        </Script>
        <SchoolSchema />
        <LMSApplicationSchema />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Knowledge Base" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Knowledge Base" />
      </head>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
