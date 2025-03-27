import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/components/blocks/nav/footer/footer";
import { Header } from "~/components/blocks/nav/Header";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "MSNS® | LMS",
  description: "Developed by MSNS-DEV™",
  icons: [{ rel: "icon", url: "/logo-w.ico" }],
  other: {
    keywords: "msns, msnaz, msnazhighschool, lms, top schools, ghakkhar, gakhar, wazirabad, gujranwala, sialkot, lahore, punjab, pakistan, msns-dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
            <Header />
              <main className="flex-1">{children}
              <Analytics />
              </main>
            <Footer />
            <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}

