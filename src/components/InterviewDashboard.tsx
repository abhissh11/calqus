"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Cpu,
  FileText,
  TvMinimal,
} from "lucide-react";

export default function InterviewDashboard() {
  const [open, setOpen] = useState(true);

  const topics = [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Java",
    "Docker",
    "AWS",
  ];

  return (
    <aside className="w-full h-screen bg-white dark:bg-neutral-900 border-r shadow-sm shadow-violet-200 rounded-lg flex flex-col p-4">
      {/* Interview Questions dropdown */}
      <div className="mb-6">
        <button
          onClick={() => setOpen(!open)}
          className={`${
            open
              ? `bg-violet-500 hover:bg-violet-600 text-gray-100`
              : `text-gray-900  `
          } flex items-center justify-between w-full font-semibold  dark:text-gray-200 px-2 py-2 rounded hover:bg-violet-200 dark:hover:bg-neutral-800 cursor-pointer`}
        >
          <span className="flex items-center gap-2">
            <BookOpen size={20} />
            Interview
          </span>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {open && (
          <ul className="mt-1 pl-8 space-y-2 text-sm text-gray-700 bg-violet-100 rounded-md dark:text-gray-300">
            {topics.map((topic) => (
              <li key={topic}>
                <Link
                  href={`/interview/${topic.toLowerCase()}`}
                  className="block px-2 py-1 rounded hover:bg-violet-200 dark:hover:bg-neutral-800"
                >
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* AI Interview */}
      <Link
        href="/interview/ai"
        className="flex items-center gap-2 px-2 py-2 mb-3 rounded font-semibold text-gray-800 dark:text-gray-200 hover:bg-violet-200 dark:hover:bg-neutral-800"
      >
        <TvMinimal size={20} />
        AI-Interview
      </Link>

      {/* Blogs */}
      <Link
        href="/interview/blogs"
        className="flex items-center gap-2 px-2 py-2 rounded font-semibold text-gray-800 dark:text-gray-200 hover:bg-violet-200 dark:hover:bg-neutral-800"
      >
        <FileText size={18} />
        Blogs
      </Link>

      {/* Spacer */}
      <div className="flex-1"></div>
    </aside>
  );
}
