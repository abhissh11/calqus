"use client";

import { useEffect, useState } from "react";
import InterviewTable from "./InterviewTable";
import { useProgressSummary } from "@/app/hooks/useProgressSummary";

interface TopicRow {
  id: string;
  topic: string;
  videoRef: string;
  blog: string;
  status: boolean;
  bookmark: boolean;
}

interface TopicData {
  _id: string;
  topic: string;
  videoRef: string;
  blog: string;
}

interface ProgressEntry {
  topicId: string;
  status: boolean;
  bookmark: boolean;
}

export default function TopicContent({ topic }: { topic: string | null }) {
  const [rows, setRows] = useState<TopicRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    summary,
    loading: summaryLoading,
    updateSummary,
  } = useProgressSummary(topic);

  useEffect(() => {
    if (!topic) return;

    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        // Fetch topic-specific data
        const res = await fetch(`/api/interview-topics/${topic}`);
        if (!res.ok) throw new Error("Failed to fetch topic data");
        const data: TopicData[] = await res.json();

        // Fetch progress for the current user
        const progressRes = await fetch("/api/interview-progress");
        if (!progressRes.ok) throw new Error("Failed to fetch progress data");
        const progress: ProgressEntry[] = await progressRes.json();

        const mapped: TopicRow[] = data.map((t) => {
          const prog = progress.find((p) => p.topicId === t._id);
          return {
            id: t._id,
            topic: t.topic,
            videoRef: t.videoRef,
            blog: t.blog,
            status: prog?.status ?? false,
            bookmark: prog?.bookmark ?? false,
          };
        });

        setRows(mapped);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to fetch topic:", err.message);
        } else {
          console.error("Unknown error while fetching topic");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic]);

  const updateProgress = async (
    id: string,
    changes: Partial<Pick<ProgressEntry, "status" | "bookmark">>
  ): Promise<void> => {
    try {
      const res = await fetch("/api/interview-progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: id, ...changes }),
      });

      if (!res.ok) throw new Error("Failed to update progress");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to update progress:", err.message);
      } else {
        console.error("Unknown error updating progress");
      }
    }
  };

  if (!topic) {
    return <p className="text-gray-500">Choose a subject from the sidebar.</p>;
  }

  const subjectSummary = topic ? summary[topic.toLowerCase()] : null;

  return (
    <div className="bg-violet-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2 capitalize">{topic}</h1>

      {subjectSummary && !summaryLoading && (
        <p className="text-gray-600 mb-4">
          Progress:{" "}
          <span className="font-semibold text-violet-600">
            {subjectSummary.completed} / {subjectSummary.total}
          </span>{" "}
          topics completed
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <InterviewTable
          data={rows}
          onToggleStatus={(id, checked) => {
            setRows((prev) =>
              prev.map((row) =>
                row.id === id ? { ...row, status: checked } : row
              )
            );

            // Optimistic update of summary
            updateSummary(topic, checked ? 1 : -1);

            // Sync with backend
            void updateProgress(id, { status: checked });
          }}
          onToggleBookmark={(id, checked) => {
            setRows((prev) =>
              prev.map((row) =>
                row.id === id ? { ...row, bookmark: checked } : row
              )
            );

            void updateProgress(id, { bookmark: checked });
          }}
        />
      )}
    </div>
  );
}
