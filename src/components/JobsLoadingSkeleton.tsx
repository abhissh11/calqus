"use client";

export default function JobsLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row gap-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          {/* Logo Placeholder */}
          <div className="w-full sm:w-40 h-40 sm:h-28 bg-gray-200 rounded-md flex-shrink-0" />

          {/* Content Placeholder */}
          <div className="flex flex-col justify-between flex-1 space-y-3">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
