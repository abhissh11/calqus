"use client";

import { useState, useEffect } from "react";

export interface JobFilters {
    jobType?: string;
    experience?: string;
    title?: string;
}

export function useJobs(initialPage = 1, initialFilters: JobFilters = {}) {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<JobFilters>(initialFilters);

    const fetchJobs = async () => {
        setLoading(true);
        const query = new URLSearchParams({
            page: page.toString(),
            ...(filters.jobType && { jobType: filters.jobType }),
            ...(filters.experience && { experience: filters.experience }),
            ...(filters.title && { title: filters.title }),
        });

        const res = await fetch(`/api/jobs?${query}`);
        const data = await res.json();

        setJobs(data.jobs);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, [page, filters]);

    return { jobs, loading, page, setPage, totalPages, filters, setFilters };
}
