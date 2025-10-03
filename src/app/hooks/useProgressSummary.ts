"use client";

import { useEffect, useState } from "react";

interface Summary {
    [subject: string]: {
        total: number;
        completed: number;
    };
}

export function useProgressSummary(topic?: string | null) {
    const [summary, setSummary] = useState<Summary>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            if (!topic) return;
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/interview-progress/summary");
                if (!res.ok) throw new Error("Failed to fetch summary");
                const data = await res.json();

                // normalize keys
                const normalized: Summary = {};
                Object.keys(data).forEach((key) => {
                    normalized[key.toLowerCase()] = data[key];
                });

                setSummary(normalized);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [topic]);

    // Optimistic update
    const updateSummary = (subject: string, deltaCompleted: number) => {
        setSummary((prev) => {
            const key = subject.toLowerCase();
            if (!prev[key]) return prev;

            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    completed: Math.max(
                        0,
                        Math.min(prev[key].total, prev[key].completed + deltaCompleted)
                    ),
                },
            };
        });
    };

    return {
        summary,
        loading,
        error,
        updateSummary,
    };
}
