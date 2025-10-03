"use client";

import { useState } from "react";
import {
  ChevronsUpDown,
  Menu,
  SquareChevronDown,
  SquareChevronUp,
  X,
} from "lucide-react";
import InterviewDashboard from "./InterviewDashboard";

export default function MobileDashboardWrapper({
  activeTab,
}: {
  activeTab: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-violet-500 text-white font-semibold"
      >
        <span>Interview Dashboard</span>
        {open ? <SquareChevronUp size={20} /> : <SquareChevronDown size={20} />}
      </button>

      {open && (
        <div className="mt-2 border rounded-lg shadow-lg overflow-hidden">
          <InterviewDashboard activeTab={activeTab} />
        </div>
      )}
    </>
  );
}
