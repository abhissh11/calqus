"use client";

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
      className="flex gap-6 p-4 border rounded-lg hover:shadow-md transition bg-white"
    >
      {/* Company Logo / Image */}
      <div className="w-40 h-28 flex-shrink-0">
        <img
          src={
            job.companyLogo ||
            "/images/tech-office.jpg"
          }
          alt={job.company}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Job Info */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900">
            {job.company} is hiring for {job.title} | {job.location}
          </h2>

          {/* Posted by & date */}
          <p className="text-sm text-gray-500 mt-1">
            Posted - <span> </span>
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
