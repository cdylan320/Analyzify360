import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollProvider, MouseFollower } from "@/components/ScrollAnimations";
import {
  ScrollProgressIndicator,
  Professional3DBackground,
} from "@/components/ProfessionalMotions";
import { ErrorBoundary } from "@/components/PerformanceOptimizations";
import { PerformanceProvider } from "@/components/PerformanceProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Super2025 - Global Tech Expertise Meets Local Trust",
  description:
    "Super2025 unites top engineers and US/UK partners to deliver secure, seamless digital solutions. AI, Blockchain, Full-Stack Development, and Product Design services.",
  keywords:
    "AI, Machine Learning, Blockchain, DeFi, Full-Stack Development, Product Design, UX, Software Development, Tech Agency",
  authors: [{ name: "Super2025 Team" }],
  creator: "Super2025",
  publisher: "Super2025",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://super2025.com",
    title: "Super2025 - Global Tech Expertise Meets Local Trust",
    description:
      "Super2025 unites top engineers and US/UK partners to deliver secure, seamless digital solutions.",
    siteName: "Super2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "Super2025 - Global Tech Expertise Meets Local Trust",
    description:
      "Super2025 unites top engineers and US/UK partners to deliver secure, seamless digital solutions.",
    creator: "@super2025",
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
