import type { Metadata } from "next";
import InterviewDashboard from "@/components/InterviewDashboard";
import MobileDashboardWrapper from "@/components/MobileDashboardWrapper";
import TopicContent from "@/components/TopicContent";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calqus Interview Preparation | Curated Questions & AI Interview Practice",
  description:
    "Prepare for your next technical interview with calqus, role-specific questions and AI-powered mock interviews. Track progress and master your preparation with Calqus.",
  keywords: [
    "interview preparation",
    "technical interview questions",
    "AI interview practice",
    "software engineering interview",
    "data structures interview",
    "system design questions",
    "Calqus interview Dashboard",
  ],
  alternates: {
    canonical: "https://calqus.com/interview",
  },
  openGraph: {
    title: "Master Your Technical Interviews | Calqus Interview Prep",
    description:
      "Access top interview questions, track your progress, and practice AI-based mock interviews — all in one platform.",
    url: "https://calqus.com/interview",
    siteName: "Calqus",
    type: "website",
    images: [
      {
        url: "https://calqus.com/og-interview.jpg",
        width: 1200,
        height: 630,
        alt: "Calqus Interview Preparation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqus Interview Prep | Curated Questions & AI Practice",
    description:
      "Prepare smarter with Calqus — your AI-powered technical interview companion.",
    images: ["https://calqus.com/og-interview.jpg"],
  },
};

export default async function InterviewPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab || null;

  return (
    <main className="max-w-7xl mx-auto mt-16 px-4 md:px-8">
      {/* === JSON-LD STRUCTURED DATA === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Calqus Interview Preparation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Calqus Interview Preparation provides curated technical interview questions and AI-powered mock interviews to help candidates practice and track their progress efficiently.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Calqus Interview Prep for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can access curated questions freely. Additional premium features include advanced analytics and AI mock interviews.",
                },
              },
              {
                "@type": "Question",
                name: "How does the AI Interview feature work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The AI Interview simulates real interview conditions by asking job-role specific questions and giving instant feedback on your responses.",
                },
              },
            ],
          }),
        }}
      />

      {/* === Mobile Dashboard === */}
      <div className="md:hidden mb-4">
        <MobileDashboardWrapper activeTab={activeTab} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <aside className="hidden md:block md:col-span-1 lg:col-span-1">
          <InterviewDashboard activeTab={activeTab} />
        </aside>

        {/* === Main Content === */}
        <section className="md:col-span-3 lg:col-span-4 flex flex-col gap-6">
          {/* === Promotional Banner === */}
          <div className="bg-violet-500 min-h-[5rem] flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-2 rounded-lg border border-violet-600 shadow-sm shadow-violet-200">
            <div className="flex flex-col gap-1 items-start md:w-4/5 py-2">
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Assess & Track Your Preparation with AI-Interview
              </h1>
              <p className="text-gray-200 text-sm font-normal w-full md:w-4/5">
                Practice and take assessments of your interview preparation. Start a
                30-minute AI interview tailored to your job role and get instant
                performance feedback.
              </p>
            </div>
            <Link
              href="/interview/practice"
              className="group md:w-1/5 flex gap-1 items-center justify-center cursor-pointer text-sm md:text-base font-semibold px-4 py-2 rounded-md text-violet-500 bg-white hover:bg-gray-100"
            >
              Start Now
              <ArrowRight className="group-hover:translate-x-1.5 transition delay-75" />
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              Calqus Interview Questions & Topics
            </h1>
            <p className="text-gray-600 text-lg font-normal">
              Explore handpicked interview questions and concepts from top tech
              companies. These topics are aggregated from real candidate experiences
              and technical rounds to help you prepare efficiently.
            </p>
          </div>

          <TopicContent topic={activeTab} />
        </section>

        {/* === Right Sidebar === */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-1">
          <div className="h-full bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
            Advertisement / Promo Area
          </div>
        </aside>
      </div>
    </main>
  );
}
