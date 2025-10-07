"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import InterviewTable from "./InterviewTable";
import { useProgressSummary } from "@/app/hooks/useProgressSummary";
import TableSkeleton from "./TableSkeleton";
import { toast } from "sonner";
import Link from "next/link";

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
  const { data: session, status } = useSession();

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
        // ✅ Fetch topic data (always public)
        const res = await fetch(`/api/interview-topics/${topic}`);
        if (!res.ok) throw new Error("Failed to fetch topic data");
        const data: TopicData[] = await res.json();

        let progress: ProgressEntry[] = [];

        // ✅ Only fetch progress if authenticated
        if (status === "authenticated") {
          try {
            const progressRes = await fetch("/api/interview-progress");
            if (!progressRes.ok) throw new Error("Failed to fetch progress");
            progress = await progressRes.json();
          } catch (err) {
            console.warn("Progress not fetched (user not logged in).");
          }
        }

        // ✅ Combine both
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
        console.error("Failed to fetch topic:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [topic, status]);

  const updateProgress = async (
    id: string,
    changes: Partial<Pick<ProgressEntry, "status" | "bookmark">>
  ): Promise<void> => {
    if (status !== "authenticated") {
      toast.info("Please login to track progress or bookmark topics.");
      return;
    }

    try {
      const res = await fetch("/api/interview-progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: id, ...changes }),
      });

      if (!res.ok) throw new Error("Failed to update progress");
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  if (!topic) {
    return (
      <p className="text-gray-50 px-6 py-2 bg-violet-500 w-fit rounded-lg">
        Choose a subject from the Dashboard to see table content.
      </p>
    );
  }

  const subjectSummary = topic ? summary[topic.toLowerCase()] : null;

  return (
    <div className="bg-violet-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2 capitalize">{topic}</h1>

      {/*  Progress or Login */}
      {status === "unauthenticated" ? (
        <p className="text-gray-600 mb-4 italic flex gap-1 items-center">
         <Link href="/login" className="underline hover:text-violet-600">Login</Link> to see your progress and mark completed topics.
        </p>
      ) : (
        subjectSummary &&
        !summaryLoading && (
          <p className="text-gray-600 mb-4">
            Progress:{" "}
            <span className="font-semibold text-violet-600">
              {subjectSummary.completed} / {subjectSummary.total}
            </span>{" "}
            topics completed
          </p>
        )
      )}

      {loading ? (
        <TableSkeleton />
      ) : (
        <InterviewTable
          data={rows}
          onToggleStatus={(id, checked) => {
            if (status !== "authenticated") {
              toast.info("Please login to mark completion.");
              return;
            }

            setRows((prev) =>
              prev.map((row) =>
                row.id === id ? { ...row, status: checked } : row
              )
            );

            updateSummary(topic, checked ? 1 : -1);
            void updateProgress(id, { status: checked });
          }}
          onToggleBookmark={(id, checked) => {
            if (status !== "authenticated") {
              toast.info("Please login to bookmark topics.");
              return;
            }

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
