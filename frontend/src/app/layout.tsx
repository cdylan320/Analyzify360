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
    "A Next-Generation Team-as-a-Service (TaaS) Software Agency",
  keywords:
    "AI, Machine Learning, Blockchain, DeFi, Full-Stack Development, Product Design, UX, Software Development, Tech Agency",
  authors: [{ name: "Analyzify360 Team" }],
  creator: "Analyzify360",
  publisher: "Analyzify360",
  robots: "index, follow",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: '/logo2.png' },
      { url: '/logo2.png', type: 'image/png', sizes: '192x192' },
      { url: '/logo2.png', type: 'image/png', sizes: '512x512' },
      { url: '/logo2.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/logo2.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://analyzify360.com",
    title: "Analyzify360 - Stronger Together, Further Forever",
    description:
      "A Next-Generation Team-as-a-Service (TaaS) Software Agency",
    siteName: "Analyzify360",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyzify360 - Stronger Together, Further Forever",
    description:
      "A Next-Generation Team-as-a-Service (TaaS) Software Agency",
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
