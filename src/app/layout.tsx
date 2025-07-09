import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Navbar,
  Footer,
  ScrollProvider,
  MouseFollower,
  ScrollProgressIndicator,
  Professional3DBackground,
  ErrorBoundary,
  PerformanceProvider,
} from "@/components";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Analyzify360 - Stronger Together, Further Forever",
  description:
    "Analyzify360 unites top engineers and US/UK partners to deliver secure, seamless digital solutions. AI, Blockchain, Full-Stack Development, and Product Design services.",
  keywords:
    "AI, Machine Learning, Blockchain, DeFi, Full-Stack Development, Product Design, UX, Software Development, Tech Agency",
  authors: [{ name: "Analyzify360 Team" }],
  creator: "Analyzify360",
  publisher: "Analyzify360",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://analyzify360.com",
    title: "Analyzify360 - Stronger Together, Further Forever",
    description:
      "Analyzify360 unites top engineers and US/UK partners to deliver secure, seamless digital solutions.",
    siteName: "Analyzify360",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyzify360 - Stronger Together, Further Forever",
    description:
      "Analyzify360 unites top engineers and US/UK partners to deliver secure, seamless digital solutions.",
    creator: "@analyzify360",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <PerformanceProvider>
            <ScrollProvider>
              <ScrollProgressIndicator />
              <Professional3DBackground variant="mixed" />
              <MouseFollower />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </ScrollProvider>
          </PerformanceProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
