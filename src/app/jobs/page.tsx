import type { Metadata } from "next";
import { Suspense } from "react";
import JobsContent from "@/components/JobsContent"; 
import { BackgroundBeams } from "@/components/ui/background-beams";

export const metadata: Metadata = {
  title: "Tech Jobs in India | Calqus Curated Job Board",
  description:
    "Find curated tech jobs, internships, and developer roles from verified companies. Updated daily by Calqus.",
  keywords: [
    "tech jobs India",
    "software engineer jobs",
    "frontend developer jobs",
    "backend jobs",
    "internships for developers",
    "remote jobs",
  ],
  alternates: { canonical: "https://calqus.com/jobs" },
  openGraph: {
    title: "Tech Jobs in India | Calqus Curated Job Board",
    description:
      "Discover the latest tech jobs and internships curated daily by Calqus.",
    url: "https://calqus.com/jobs",
    images: [
      {
        url: "https://calqus.com/og-jobs.jpg",
        width: 1200,
        height: 630,
        alt: "Calqus Job Board",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqus Curated Jobs | Software & Tech Roles",
    description: "Find your next developer job — curated daily by Calqus.",
    images: ["https://calqus.com/og-jobs.jpg"],
  },
};

export default function JobsPage() {
  return (
    <main>
      <section className="bg-white flex flex-col pt-20 px-5 justify-start relative">
        <div className="flex flex-col items-center justify-center pb-10 text-center">
          <div className="flex w-fit items-center mx-auto mb-2 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700 shadow-sm">
            Over 200+ jobs added this week
          </div>

          <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 text-center bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-5xl">
            Find Your Next{" "}
            <span className="text-violet-600">Developer Job</span> <br /> Curated by
            Calqus
          </h1>

          <p className="text-base max-w-2xl text-gray-600">
            Explore verified jobs, internships, and remote roles from trusted
            companies — all handpicked daily by Calqus. 
            Join hundreds of professionals who have found their dream jobs through Calqus curated jobs. 
          </p>
        </div>

        <div className="absolute inset-0 -z-10">
          <BackgroundBeams />
        </div>
      </section>

      {/* Job Listings */}
      <Suspense fallback={<p className="text-center py-10">Loading jobs...</p>}>
        <JobsContent />
      </Suspense>
    </main>
  );
}
