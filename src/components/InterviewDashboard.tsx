"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Cpu,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

interface InterviewDashboardProps {
  activeTab: string | null;
}

interface ApiTopic {
  subject?: string;
}

export default function InterviewDashboard({ activeTab }: InterviewDashboardProps) {
  const [open, setOpen] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSubjects = async (): Promise<void> => {
      try {
        const res = await fetch("/api/interview-topics");
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data: ApiTopic[] = await res.json();

        const uniqueSubjects = Array.from(
          new Set(
            data
              .map((t) => t.subject?.trim())
              .filter((s): s is string => Boolean(s))
          )
        );

        setSubjects(uniqueSubjects);

        // Automatically select the first subject if no tab is set
        const currentTab = searchParams.get("tab");
        if (!currentTab && uniqueSubjects.length > 0) {
          const first = uniqueSubjects[0].toLowerCase();
          const params = new URLSearchParams(searchParams.toString());
          params.set("tab", first);
          router.replace(`?${params.toString()}`); 
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to fetch subjects:", err.message);
        } else {
          console.error("Unknown error fetching subjects");
        }
      }
    };

    fetchSubjects();
  }, []); 

  const handleClick = (subject: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", subject.toLowerCase());
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-full h-fit md:h-screen bg-white dark:bg-neutral-900 border-r shadow-md flex flex-col p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-violet-600 text-center">
        Interview DB
      </h2>

      {/* Subjects Dropdown */}
      <div className="mb-6">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full font-semibold text-gray-100 px-2 py-2 rounded bg-violet-500"
        >
          <span className="flex items-center gap-2">
            <BookOpen size={18} />
            Subjects
          </span>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {open && (
          <ul className="mt-2 px-4 py-4 space-y-2 text-sm text-gray-700 bg-violet-200 rounded-sm">
            {subjects.length === 0 && (
  <p className="text-gray-400 italic text-sm mt-3">Loading subjects...</p>
)}
            {subjects.map((subj) => {
              const isActive = activeTab === subj.toLowerCase();
              return (
                <li key={subj}>
                  <button
                    onClick={() => handleClick(subj)}
                    className={`w-full text-left px-2 py-1 rounded cursor-pointer transition ${
                      isActive
                        ? "bg-violet-300 text-violet-700 font-semibold"
                        : "hover:bg-violet-50 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {subj}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Other Tabs */}
      <Link href="/interview/practice">
        <button className="flex items-center gap-2 px-2 py-2 mb-2 rounded font-semibold text-gray-800 hover:bg-violet-200 cursor-pointer transition">
          <Cpu size={18} />
          AI-Interview
        </button>
      </Link>

      <Link href="/blogs">
        <button className="flex items-center gap-2 px-2 py-2 mb-2 rounded font-semibold text-gray-800 hover:bg-violet-200 cursor-pointer transition">
          <FileText size={18} />
          Blogs
        </button>
      </Link>

      <Link href="/jobs">
        <button className="flex items-center gap-2 px-2 py-2 mb-2 rounded font-semibold text-gray-800 hover:bg-violet-200 cursor-pointer transition">
          <BriefcaseBusiness size={18} />
          Jobs
        </button>
      </Link>
    </aside>
  );
}
