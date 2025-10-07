"use client";

import { useJobs } from "@/app/hooks/useJobs";
import JobCard from "@/components/JobCard";
import JobsLoadingSkeleton from "@/components/JobsLoadingSkeleton";
import Link from "next/link";
import { SendHorizontal, Users } from "lucide-react";

export default function JobsContent() {
  const { jobs, loading, page, setPage, totalPages, filters, setFilters } =
    useJobs();

  return (
    <section className="max-w-7xl mx-auto min-h-screen px-4 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* JOB LISTINGS */}
        <div className="md:col-span-3 order-1 md:order-2">
          {/* === FILTER BAR === */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by job title..."
              value={filters.title || ""}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
              className="border border-gray-400 p-2 rounded flex-1 min-w-[150px]"
            />

            <select
              value={filters.jobType || ""}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
              className="border border-gray-400 p-2 rounded flex-1 min-w-[150px]"
            >
              <option value="">All Job Types</option>
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
          </div>

          {/* === JOB CARDS === */}
          {loading ? (
            <JobsLoadingSkeleton />
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">No jobs found.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

          {/* === PAGINATION === */}
          <div className="flex items-center justify-between mt-8 text-sm text-gray-700">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="md:col-span-1 order-2 md:order-1">
          <div className="sticky md:top-28 flex flex-col gap-4 bg-white dark:bg-neutral-900 shadow rounded-lg p-6 border">
            {/* Premium Group */}
            <div className="border border-gray-300 p-3 rounded-lg flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Join the Premium Group</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Exclusive referrals, recruiter contacts, and insider openings.
                <br />
                Daily 30–40 verified referrals shared —{" "}
                <span className="text-violet-600 font-medium">
                  not found anywhere else.
                </span>
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

            {/* WhatsApp Group */}
            <div className="border border-gray-300 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Get Calqus job updates and internships directly on WhatsApp.
              </p>
              <Link href="https://chat.whatsapp.com/GOmUuEnTvJXCcY3Qbsj8xG?mode=ems_copy_t" target="_blank">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer">
                <Users /> Join WhatsApp Group
              </button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
