"use client";

import { useEffect, useState } from "react";
import InterviewTable from "./InterviewTable";
import { useProgressSummary } from "@/app/hooks/useProgressSummary";

export default function TopicContent({ topic }: { topic: string | null }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    summary,
    loading: summaryLoading,
    updateSummary,
  } = useProgressSummary(topic);

  useEffect(() => {
    if (!topic) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/interview-topics/${topic}`);
        const data = await res.json();

        const progressRes = await fetch("/api/interview-progress");
        const progress = await progressRes.json();

        const mapped = data.map((t: any) => {
          const prog = progress.find((p: any) => p.topicId === t._id);
          return {
            id: t._id,
            topic: t.topic,
            videoRef: t.videoRef,
            blog: t.blog,
            status: prog?.status || false,
            bookmark: prog?.bookmark || false,
          };
        });

        setRows(mapped);
      } catch (err) {
        console.error("Failed to fetch topic", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic]);

  const updateProgress = async (id: string, changes: any) => {
    try {
      await fetch("/api/interview-progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: id, ...changes }),
      });
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  if (!topic) {
    return <p className="text-gray-500">Choose a subject from the sidebar.</p>;
  }

  const subjectSummary = topic ? summary[topic.toLowerCase()] : null;

  return (
    <div>
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

            // optimistic update
            updateSummary(topic, checked ? +1 : -1);

            updateProgress(id, { status: checked });
          }}
          onToggleBookmark={(id, checked) => {
            setRows((prev) =>
              prev.map((row) =>
                row.id === id ? { ...row, bookmark: checked } : row
              )
            );
            updateProgress(id, { bookmark: checked });
          }}
        />
      )}
    </div>
  );
}
