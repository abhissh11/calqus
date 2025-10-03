"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

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
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.status}
          onChange={(e) => onToggleStatus(row.original.id, e.target.checked)}
        />
      ),
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
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.bookmark}
          onChange={(e) => onToggleBookmark(row.original.id, e.target.checked)}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold text-gray-700 border-b"
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
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b">
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
