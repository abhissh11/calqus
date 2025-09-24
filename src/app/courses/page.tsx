import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";

const courses = [
  {
    title: "Frontend Development",
    description:
      "Master HTML, CSS, JavaScript, React, and Next.js to build modern and responsive web applications.",
    duration: "3 Months",
    topics: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    cta: "Start Frontend",
  },
  {
    title: "Backend Development with Node.js & MongoDB",
    description:
      "Learn server-side programming with Node.js, Express, and MongoDB to build scalable APIs and full-stack apps.",
    duration: "3 Months",
    topics: ["Node.js", "Express", "MongoDB"],
    cta: "Start Backend",
  },
  {
    title: "DSA for Placements",
    description:
      "Crack coding interviews with our 3-month structured course covering Data Structures & Algorithms.",
    duration: "3 Months",
    topics: ["Arrays", "Recursion", "Trees", "Graphs", "Dynamic Programming"],
    cta: "Start DSA",
  },
];

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      {/* CTA Banner */}
      <div className="bg-gradient-to-tr from-violet-500 via-violet-700 to-violet-900 text-white flex flex-col gap-6 md:flex-row justify-between items-center rounded-2xl p-8 text-start mb-12 shadow-lg border border-violet-600">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">
            Boost Your Learning with Roadmaps & Sheets 🚀
          </h1>
          <p className="text-base text-gray-200">
            Explore curated learning paths for MERN, Java, ML, AI and more to
            accelerate your career growth.
          </p>
        </div>
        <Link
          href="/resources"
          className="px-6 py-3 h-fit bg-white text-center text-violet-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Roadmaps
        </Link>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <CourseCard key={idx} {...course} />
        ))}
      </div>
    </div>
  );
}
