"use client";

import React from "react";

export default function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-violet-300 animate-pulse">
      <table className="min-w-full text-sm">
        <thead className="bg-violet-200">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-violet-300 w-1/6">
              Status
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-violet-300 w-1/4">
              Topic
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-violet-300 w-1/6">
              Video
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-violet-300 w-1/6">
              Blog
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-violet-300 w-1/6">
              Bookmark
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="hover:bg-violet-50">
              {[...Array(5)].map((__, j) => (
                <td key={j} className="px-4 py-3 border-b border-violet-200">
                  <div className="h-4 bg-violet-200 rounded w-3/4"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
