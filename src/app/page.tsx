import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Explore from "./sections/Explore";
import { CalqusCTA } from "./sections/CTA";
import BookCallModalClient from "./sections/BookCallModalClient";
import HeroAnnouncement from "../components/HeroAnnouncement";

// =============================
// SEO METADATA
// =============================
export const metadata: Metadata = {
  title: "Calqus – Build, Scale & Hire Smarter | Web & App Solutions",
  description:
    "Calqus crafts modern web & app solutions designed to attract, engage, and convert — helping your business and career grow smarter and stronger.",
  keywords: [
    "Calqus",
    "Calqus jobs",
    "web development agency",
    "AI chat-bot development agency",
    "AI development agency",
    "app development",
    "Next.js agency",
    "software jobs",
    "tech jobs India",
    "developers jobs India",
    "interview preparation",
    "hire developers",
    "frontend jobs",
    "fullstack jobs",
  ],
  authors: [{ name: "Calqus Team", url: "https://calqus.com" }],
  creator: "Calqus",
  publisher: "Calqus",
  metadataBase: new URL("https://calqus.com"),
  alternates: {
    canonical: "https://calqus.com",
  },
  openGraph: {
    title: "Calqus – Find Jobs and Prepare for Interview | Web & App Solutions",
    description:
      "Web & App & AI development, curated jobs, and interview prep tools — built to help you grow your career and business.",
    url: "https://calqus.com",
    siteName: "Calqus",
    type: "website",
    images: [
      {
        url: "https://calqus.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calqus Web & App Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqus – Build, Scale & Hire Smarter",
    description:
      "Web & App development, curated jobs, and interview prep tools to help you thrive.",
    creator: "@calqusHQ",
    images: ["https://calqus.com/og-image.jpg"],
  },
};


export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Calqus",
            url: "https://calqus.com",
            logo: "https://calqus.com",
            sameAs: [
              "https://twitter.com/calqusHQ",
              "https://www.linkedin.com/company/calqus",
            ],
            description:
              "Calqus builds powerful web & app solutions, curates job opportunities, and helps professionals upskill through interview prep and tech insights.",
          }),
        }}
      />

      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center h-fit mt-20 md:mt-0 md:min-h-screen bg-white text-center overflow-hidden px-6 dark:bg-black"
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        {/* Content */}
        <div className="z-10 max-w-3xl">
          <HeroAnnouncement />

          <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-6xl">
            Where Bold Ideas Meet Seamless Execution.
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Calqus crafts web and app solutions designed to attract, engage, and
            convert — so your business can grow faster, smarter, and stronger.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BookCallModalClient />
            <Link
              href="#explore"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Explore Jobs & Courses
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <Services />
      </section>

      <section id="why-choose-us" className="py-20 bg-gray-50 dark:bg-neutral-950">
        <WhyChooseUs />
      </section>

      <section id="explore" className="py-20">
        <Explore />
      </section>

      <section id="cta" className="py-20 bg-violet-50 dark:bg-neutral-900">
        <CalqusCTA />
      </section>
    </main>
  );
}
