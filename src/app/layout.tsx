import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Providers from "@/lib/Providers";

// === Fonts ===
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// === GLOBAL SEO METADATA ===
export const metadata: Metadata = {
  metadataBase: new URL("https://calqus.com"),
  title: {
    default: "Calqus | AI-Powered Web & App Solutions",
    template: "%s | Calqus",
  },
  description:
    "Calqus builds intelligent digital experiences — from AI-powered web and app solutions to curated job boards, interview prep, and learning resources.",
  keywords: [
    "Calqus",
    "web development",
    "AI chatbot development",
    "app development",
    "fullstack development",
    "frontend backend jobs",
    "Next.js developer",
    "AI solutions",
    "interview preparation",
    "DSA for placements",
  ],
  applicationName: "Calqus",
  authors: [{ name: "Calqus Team", url: "https://calqus.com" }],
  creator: "Abhishek Kumar",
  publisher: "Calqus",
  alternates: {
    canonical: "https://calqus.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calqus.com",
    title: "Calqus | AI-Powered Web & App Solutions",
    description:
      "Calqus helps professionals and startups grow with modern AI, web, and app development services — plus curated jobs, courses, and interview prep.",
    siteName: "Calqus",
    images: [
      {
        url: "https://calqus.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calqus - AI-Powered Web and App Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Calqus",
    creator: "@Calqus",
    title: "Calqus | AI-Powered Web & App Solutions",
    description:
      "Explore Calqus — build modern web & app solutions, learn development, and discover curated job & interview resources.",
    images: ["https://calqus.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
  viewport: "width=device-width, initial-scale=1.0",
};

// === LAYOUT COMPONENT ===
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* === ORGANIZATION STRUCTURED DATA === */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Calqus",
              url: "https://calqus.com",
              logo: "https://calqus.com/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/calqus",
                "https://twitter.com/calqusHQ",
              ],
              description:
                "Calqus is an AI-driven web and app development platform offering services, interview prep tools, curated jobs, and learning paths for developers.",
              foundingDate: "2025",
              founder: {
                "@type": "Person",
                name: "Abhishek Kumar",
                jobTitle: "Founder",
              },
            }),
          }}
        />

        <main>
          <Providers>
            <Header />
            {children}
            <Toaster richColors position="top-center" />
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
