"use client";

import JobCard from "@/components/JobCard";
import { useJobs } from "../hooks/useJobs";
import { BriefcaseBusiness, SendHorizontal } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { Job } from "../../types/job";

// // ✅ Define a proper Job type for type safety
// interface Job {
//   _id: string;
//   slug: string;
//   title: string;
//   company: string;
//   location?: string; // ✅ optional — fixes build error
//   jobType: string;
//   companyLogo: string;
//   salary?: string;
//   experience?: string;
//   postedAt?: string;
// }

export default function JobsPage() {
  const { jobs, loading, page, setPage, totalPages, filters, setFilters } =
    useJobs();

  return (
    <>
      {/* Hero Section */}
      <div className="bg-white flex flex-col pt-20 px-5 justify-start">
        <div className="flex flex-col items-center justify-center pb-10 text-center">
          <div className="flex w-fit items-center mx-auto mb-2 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700 shadow-sm">
            <span className="mr-2">
              <BriefcaseBusiness />
            </span>
            Over 200+ jobs added this week
          </div>
          <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 text-center bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-5xl">
            The Last Job Board You'll Ever Need.
            <br />
            <span className="text-violet-600">Calqus</span> curated jobs
          </h1>
          <p className="text-base max-w-2xl text-gray-600">
            Join hundreds of professionals who have found their dream jobs
            through Calqus curated jobs. We search beyond the major job boards,
            bringing you unseen opportunities from every company career page on
            the internet.
          </p>
        </div>
        <div className="absolute inset-0 -z-10">
          <BackgroundBeams />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto min-h-screen px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* LEFT COLUMN - Dashboard/Ad */}
          <aside className="md:col-span-1">
            <div className="sticky flex flex-col gap-2 top-28 bg-white dark:bg-neutral-900 shadow rounded-lg p-6 border">
              <div className="border border-gray-400 p-2 rounded-lg flex flex-col gap-2">
                <h2 className="text-xl font-semibold">
                  Join the Premium Group
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Referral group is a private group where we share exclusive
                  referrals, direct recruiter contacts, Insider openings & more.
                  <br /> Everyday 30-40 verified referrals and openings are
                  being shared, which you{" "}
                  <span className="text-violet-600">won't find anywhere.</span>
                </p>
                <Link href="https://t.me/abhishek_dot" target="_blank">
                  <button className="group w-full flex gap-1 items-end px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
                    Message to Join
                    <span>
                      <SendHorizontal className="group-hover:translate-x-1.5 transition delay-75" />
                    </span>
                  </button>
                </Link>
              </div>
              <div className="border border-gray-400 p-2 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get jobs and internships posted on Calqus directly delivered
                  to your WhatsApp inbox.
                </p>
                <button className="w-full px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
                  Join WhatsApp Group
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN - Job Listings */}
          <div className="md:col-span-3">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <select
                value={filters.jobType || ""}
                onChange={(e) =>
                  setFilters({ ...filters, jobType: e.target.value })
                }
                className="border border-gray-400 p-2 rounded flex-1 min-w-[150px]"
              >
                <option value="">All Jobs</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>

              <input
                type="text"
                placeholder="Experience (e.g. 2+ years)"
                value={filters.experience || ""}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
                className="border border-gray-400 p-2 rounded flex-1 min-w-[150px]"
              />

              <input
                type="text"
                placeholder="Search title"
                value={filters.title || ""}
                onChange={(e) =>
                  setFilters({ ...filters, title: e.target.value })
                }
                className="border border-gray-400 p-2 rounded flex-1 min-w-[150px]"
              />
            </div>

            {/* Job List */}
            {loading ? (
              <p>Loading jobs...</p>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: Job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border text-white bg-violet-500 hover:bg-violet-600 cursor-pointer rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border text-white bg-violet-500 hover:bg-violet-600 cursor-pointer rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
