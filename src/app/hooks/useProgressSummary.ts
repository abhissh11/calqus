"use client";

import { useEffect, useState } from "react";

export interface SubjectProgress {
  total: number;
  completed: number;
}

export interface ProgressSummary {
  [subject: string]: SubjectProgress;
}

export function useProgressSummary(topic?: string | null) {
  const [summary, setSummary] = useState<ProgressSummary>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async (): Promise<void> => {
      if (!topic) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/interview-progress/summary");
        if (!res.ok) throw new Error("Failed to fetch summary");

        const data: Record<string, SubjectProgress> = await res.json();

        // Normalize subject keys (e.g., "JavaScript" → "javascript")
        const normalized: ProgressSummary = {};
        Object.entries(data).forEach(([key, value]) => {
          normalized[key.toLowerCase()] = value;
        });

        setSummary(normalized);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [topic]);

  /**
   * Optimistically updates the local progress summary for a given subject.
   */
  const updateSummary = (subject: string, deltaCompleted: number): void => {
    setSummary((prev) => {
      const key = subject.toLowerCase();
      const current = prev[key];
      if (!current) return prev;

      const newCompleted = Math.max(
        0,
        Math.min(current.total, current.completed + deltaCompleted)
      );

      return {
        ...prev,
        [key]: { ...current, completed: newCompleted },
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
