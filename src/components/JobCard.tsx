"use client";

import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  job: {
    _id: string;
    slug: string;
    title: string;
    company: string;
    location: string;
    jobType: string;
    companyLogo: string;
    salary?: string;
    experience?: string;
    postedAt?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="flex flex-col sm:flex-row gap-6 p-4 border border-gray-300 rounded-lg hover:shadow-md shadow-violet-200 transition bg-white"
    >
      {/* Company Logo / Image */}
      <div className="w-full sm:w-40 h-40 sm:h-28 flex-shrink-0 relative">
        <Image
          src={
            job.companyLogo ||
            "https://images.unsplash.com/photo-1549757521-4160565ff3de?q=80&w=774&auto=format&fit=crop"
          }
          alt={job.company}
          width={160} // fixed for optimization
          height={120} // fixed for optimization
          className="w-full h-full object-cover rounded-md"
          priority
        />
      </div>

      {/* Job Info */}
      <div className="flex flex-col justify-between flex-1 mt-3 sm:mt-0">
        <div>
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 leading-snug">
            {job.company} is hiring for {job.title} | {job.location}
          </h2>

          {/* Posted date */}
          <p className="text-sm text-gray-500 mt-1">
            Posted -{" "}
            {job.postedAt
              ? new Date(job.postedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Recently Posted"}
          </p>
        </div>

        {/* Badges */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border">
            {job.jobType}
          </span>
          {job.salary && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border">
              {job.salary}
            </span>
          )}
          {job.experience && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border">
              {job.experience}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
