import InterviewDashboard from "@/components/InterviewDashboard";
import MobileDashboardWrapper from "@/components/MobileDashboardWrapper";
import TopicContent from "@/components/TopicContent";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function InterviewPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab || null;

  return (
    <main className="max-w-7xl mx-auto mt-16 px-4 md:px-8">
      {/* Mobile Dashboard (Client Component) */}
      <div className="md:hidden mb-4">
        <MobileDashboardWrapper activeTab={activeTab} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* Left Sidebar (hidden on mobile) */}
        <aside className="hidden md:block md:col-span-1 lg:col-span-1">
          <InterviewDashboard activeTab={activeTab} />
        </aside>

        {/* Center Content */}
        <section className="md:col-span-3 lg:col-span-4 flex flex-col gap-6">
          {/* Promo (SEO text) */}
          <div className="bg-violet-500 min-h-[5rem] flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-2 rounded-lg border border-violet-600 shadow-sm shadow-violet-200">
            <div className="flex flex-col gap-1 items-start md:w-4/5 py-2">
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Assess & Track Your Preparation with AI-Interview
              </h1>
              <p className="text-gray-200 text-sm font-normal w-full md:w-4/5">
                Practice and take assessment of level of preparation for your
                Interview. Start a 30 min Interview of the Job roles you're
                preparing for and get Instant Report card and feedback
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
            <h1 className="text-xl font-bold mb-2">
              Calqus Interview Questions
            </h1>
            <p className="text-gray-600 text-lg font-normal">
              The Interview questions are curated from all top asked, corner
              questions which are often left by students; Questions aggregated
              from candidates appearing for respective job roles.
            </p>
          </div>

          {/* Questions */}
          <TopicContent topic={activeTab} />
        </section>

        {/* Right Sidebar */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-1">
          <div className="h-full bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
            Advertisement / Promo Area
          </div>
        </aside>
      </div>
    </main>
  );
}
