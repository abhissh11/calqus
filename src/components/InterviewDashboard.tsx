"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Cpu,
  FileText,
  Briefcase,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

export default function InterviewDashboard({
  activeTab,
}: {
  activeTab: string | null;
}) {
  const [open, setOpen] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/interview-topics");
        const data = await res.json();

        const uniqueSubjects: string[] = Array.from(
          new Set(
            data
              .map((t: any) => t?.subject?.trim())
              .filter((s: string | undefined) => !!s)
          )
        );

        setSubjects(uniqueSubjects);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };
    fetchSubjects();
  }, []);

  const handleClick = (subject: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", subject.toLowerCase());
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-full h-fit md:h-screen bg-white dark:bg-neutral-900 border-r shadow-md flex flex-col p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-violet-600 etxt-center">
        Interview DB
      </h2>

      {/* Subjects Dropdown */}
      <div className="mb-6">
        <button
          onClick={() => setOpen(!open)}
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
            {subjects.map((subj) => {
              if (!subj) return null;
              const isActive = activeTab === subj.toLowerCase();
              return (
                <li key={subj}>
                  <button
                    onClick={() => handleClick(subj)}
                    className={`w-full text-left px-2 py-1 rounded cursor-pointer ${
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
        <button className="flex items-center gap-2 px-2 py-2 mb-2 rounded font-semibold text-gray-800 hover:bg-violet-200 cursor-pointer transition  ">
          <Cpu size={18} />
          AI-Interview
        </button>
      </Link>

      <Link href="/blogs">
        <button className="flex items-center gap-2 px-2 py-2 mb-2 rounded font-semibold text-gray-800 hover:bg-violet-200 cursor-pointer transition ">
          <FileText size={18} />
          Blogs
        </button>
      </Link>
      <Link href="jobs">
        <button className="flex items-center gap-2 px-2 py-2 mb-2 rounded font-semibold text-gray-800 hover:bg-violet-200 cursor-pointer transition ">
          <BriefcaseBusiness size={18} />
          Jobs
        </button>
      </Link>
    </aside>
  );
}
