"use client";

import { useState, useEffect } from "react";

export interface Job {
  _id: string;
  slug: string;
  title: string;
  company: string;
  location?: string;
  jobType: "Full Time" | "Part Time" | "Internship" | "Contract";
  salary: string;
  experience: string;
  companyLogo?: string;
  jobDescription?: string;
  applyLink?: string;
  postedAt?: string;
}

export interface JobFilters {
  jobType?: string;
  experience?: string;
  title?: string;
}

export function useJobs(initialPage = 1, initialFilters: JobFilters = {}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const fetchJobs = async (): Promise<void> => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: page.toString(),
        ...(filters.jobType ? { jobType: filters.jobType } : {}),
        ...(filters.experience ? { experience: filters.experience } : {}),
        ...(filters.title ? { title: filters.title } : {}),
      });

      const res = await fetch(`/api/jobs?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data: { jobs: Job[]; totalPages: number } = await res.json();

      setJobs(data.jobs || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filters]);

  return { jobs, loading, page, setPage, totalPages, filters, setFilters };
}
