"use client";

import React from "react";

type CourseCardProps = {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  cta: string;
};

export function CourseCard({
  title,
  description,
  duration,
  topics,
  cta,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      <p className="text-sm font-medium text-gray-700 mb-2">
        Duration: <span className="font-semibold">{duration}</span>
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {topics.map((topic, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>

      <button className="w-full px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition">
        {cta}
      </button>
    </div>
  );
}
