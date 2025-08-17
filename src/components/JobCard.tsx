// components/JobCard.tsx
"use client";
import Image from "next/image";
import React from "react";

type JobCardProps = {
  companyLogo: string;
  title: string;
  company: string;
  location?: string;
  postedBy: string;
  date: string;
  type: string;
  salary: string;
  experience: string;
};

export function JobCard({
  companyLogo,
  title,
  company,
  location,
  postedBy,
  date,
  type,
  salary,
  experience,
}: JobCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      {/* Company Logo */}
      <div className="w-32 h-28 relative rounded-lg overflow-hidden">
        <Image
          src={companyLogo}
          alt={company}
          fill
          className="object-cover"
        />
      </div>

      {/* Job Info */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600">
            {company} {location && `| ${location}`}
          </p>
          <p className="text-xs text-gray-500">
            {postedBy} • {date}
          </p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-2">
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">
            {type}
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">
            {salary}
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">
            {experience}
          </span>
        </div>
      </div>
    </div>
  );
}
