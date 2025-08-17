// components/JobBoard.tsx
"use client";

import { JobCard } from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import React, { useState } from "react";

// Mock Data (can later fetch from API)
const jobs = [
  {
    companyLogo: "/company1.png",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangalore",
    postedBy: "HR Manager",
    date: "2 days ago",
    type: "Full Time",
    salary: "₹10-15 LPA",
    experience: "2-4 years",
  },
  {
    companyLogo: "/company2.png",
    title: "Backend Engineer",
    company: "DataSoft",
    location: "Remote",
    postedBy: "Recruiter",
    date: "1 week ago",
    type: "Part Time",
    salary: "₹6-8 LPA",
    experience: "1-3 years",
  },
  {
    companyLogo: "/company3.png",
    title: "Product Manager",
    company: "InnovateX",
    location: "Delhi",
    postedBy: "Hiring Team",
    date: "5 days ago",
    type: "Full Time",
    salary: "₹18-22 LPA",
    experience: "5+ years",
  },
];

export default function JobBoard() {
  const [filters, setFilters] = useState<{
    jobType: string[];
    experience: string[];
    salary: string[];
  }>({
    jobType: [],
    experience: [],
    salary: [],
  });

  // Filtering logic
  const filteredJobs = jobs.filter((job) => {
    const matchesJobType =
      filters.jobType.length === 0 || filters.jobType.includes(job.type);

    const matchesExperience =
      filters.experience.length === 0 ||
      filters.experience.includes(job.experience);

    const matchesSalary =
      filters.salary.length === 0 || filters.salary.includes(job.salary);

    return matchesJobType && matchesExperience && matchesSalary;
  });

  return (
    <div className="flex gap-6">
      {/* Sidebar Filters */}
      <JobFilters
        jobTypes={["Full Time", "Part Time", "Internship", "Contract"]}
        experiences={["0-1 years", "1-3 years", "2-4 years", "5+ years"]}
        salaries={["₹0-5 LPA", "₹6-8 LPA", "₹10-15 LPA", "₹18-22 LPA"]}
        onFilterChange={setFilters}
      />

      {/* Job Listings */}
      <div className="flex-1 flex flex-col gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, idx) => <JobCard key={idx} {...job} />)
        ) : (
          <p className="text-gray-600">No jobs match your filters.</p>
        )}
      </div>
    </div>
  );
}
