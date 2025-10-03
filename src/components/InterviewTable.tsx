"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { Circle, CircleCheckBig, Bookmark } from "lucide-react";

type TopicRow = {
  id: string;
  topic: string;
  videoRef: string;
  blog: string;
  status: boolean;
  bookmark: boolean;
};

interface InterviewTableProps {
  data: TopicRow[];
  onToggleStatus: (id: string, checked: boolean) => void;
  onToggleBookmark: (id: string, checked: boolean) => void;
}

export default function InterviewTable({
  data,
  onToggleStatus,
  onToggleBookmark,
}: InterviewTableProps) {
  const columns: ColumnDef<TopicRow>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isComplete = row.original.status;
        return (
          <button
            onClick={() => onToggleStatus(row.original.id, !isComplete)}
            className="p-1"
            title={isComplete ? "Mark Incomplete" : "Mark Complete"}
          >
            {isComplete ? (
              <CircleCheckBig className="w-5 h-5 cursor-pointer text-violet-600" />
            ) : (
              <Circle className="w-5 h-5 cursor-pointer text-violet-600" />
            )}
          </button>
        );
      },
    },
    {
      accessorKey: "topic",
      header: "Topic",
    },
    {
      accessorKey: "videoRef",
      header: "Video",
      cell: ({ row }) =>
        row.original.videoRef ? (
          <Link
            href={row.original.videoRef}
            className="text-violet-600 underline"
            target="_blank"
          >
            Watch
          </Link>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "blog",
      header: "Blog",
      cell: ({ row }) =>
        row.original.blog ? (
          <Link
            href={row.original.blog}
            className="text-violet-600 underline"
            target="_blank"
          >
            Read
          </Link>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "bookmark",
      header: "Bookmark",
      cell: ({ row }) => {
        const isBookmarked = row.original.bookmark;
        return (
          <button
            onClick={() => onToggleBookmark(row.original.id, !isBookmarked)}
            className="p-1"
            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            <Bookmark
              className={`w-5 h-5 cursor-pointer hover:fill-violet-300 ${
                isBookmarked
                  ? "text-violet-600 fill-violet-600"
                  : "text-gray-800"
              }`}
            />
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md border border-violet-300">
      <table className="min-w-full text-sm">
        <thead className="bg-violet-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-violet-200"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-violet-200">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b border-violet-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
