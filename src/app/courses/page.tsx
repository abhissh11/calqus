import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "Calqus Courses | Learn Frontend, Backend & DSA for Placements",
  description:
    "Explore Calqus curated courses — from Frontend and Backend development to DSA for placements. Learn with structured, project-based content designed to make you job-ready.",
  keywords: [
    "frontend development course",
    "backend course",
    "DSA for placements",
    "Next.js course",
    "MERN stack course",
    "learn web development",
    "Calqus courses",
    "developer roadmap",
  ],
  alternates: {
    canonical: "https://calqus.com/courses",
  },
  openGraph: {
    title: "Calqus Courses | Build Your Developer Career",
    description:
      "Master Frontend, Backend, and DSA through structured Calqus courses — practical, project-based, and industry-aligned.",
    url: "https://calqus.com/courses",
    siteName: "Calqus",
    type: "website",
    images: [
      {
        url: "https://calqus.com/og-courses.jpg",
        width: 1200,
        height: 630,
        alt: "Calqus Courses - Learn Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqus Courses | Learn Frontend, Backend & DSA",
    description:
      "Structured developer courses curated by Calqus. Master coding, web development, and DSA for placements.",
    images: ["https://calqus.com/og-courses.jpg"],
  },
};

const courses = [
  {
    title: "Frontend Development 0-100 with Next.js",
    description:
      "Master HTML, CSS, JavaScript, React, and Next.js to build modern, responsive web applications and kickstart your frontend career.",
    duration: "3 Months",
    topics: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    cta: "Start Frontend",
  },
  {
    title: "Backend Development with Node.js & MongoDB",
    description:
      "Learn server-side programming with Node.js, Express, and MongoDB to build scalable APIs and real-world full-stack applications.",
    duration: "3 Months",
    topics: ["Node.js", "Express", "MongoDB"],
    cta: "Start Backend",
  },
  {
    title: "DSA for Placements",
    description:
      "Crack coding interviews with our 3-month structured course covering all essential Data Structures and Algorithms concepts.",
    duration: "3 Months",
    topics: ["Arrays", "Recursion", "Trees", "Graphs", "Dynamic Programming"],
    cta: "Start DSA",
  },
];

//  Main Page Component
export default function CoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      {/* === Structured Data for Courses === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Calqus Developer Courses",
            description:
              "Explore Calqus curated developer courses — Frontend, Backend, and DSA. Learn full-stack development and crack interviews.",
            itemListElement: courses.map((course, index) => ({
              "@type": "Course",
              position: index + 1,
              name: course.title,
              description: course.description,
              provider: {
                "@type": "Organization",
                name: "Calqus",
                sameAs: "https://calqus.com",
              },
            })),
          }),
        }}
      />

      {/* === CTA Banner === */}
      <div className="bg-gradient-to-tr from-violet-500 via-violet-700 to-violet-900 text-white flex flex-col gap-6 md:flex-row justify-between items-center rounded-2xl p-8 text-start mb-12 shadow-lg border border-violet-600">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Boost Your Preparation with Resources & Interview Sheets 🚀
          </h1>
          <p className="text-base text-gray-200">
            Explore curated learning paths for Frontend, Backend, DSA, ML, and AI to
            accelerate your career growth and become job-ready.
          </p>
        </div>
        <Link
          href="/interview"
          className="px-6 py-3 h-fit bg-white text-center text-violet-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Resources
        </Link>
      </div>

      {/* === Courses Grid === */}
      <section aria-labelledby="courses-heading">
        <h2
          id="courses-heading"
          className="text-2xl md:text-3xl font-bold text-center text-violet-700 mb-8"
        >
          Explore Our Developer Courses
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Choose from our structured, mentor-designed learning paths that take you
          from beginner to job-ready. Each course includes practical projects,
          interview prep, and placement assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}
