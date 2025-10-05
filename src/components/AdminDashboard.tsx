"use client";

import { useState } from "react";
import { Briefcase, BookOpen, MessagesSquare } from "lucide-react";
import JobUploadForm from "./JobUploadForm"; 
import TopicUploader from "./TopicUploader";
// You can later create CourseUploadForm.tsx similarly

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "courses" | "topics">(
    "jobs"
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "jobs":
        return <JobUploadForm />;
      case "courses":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-violet-600">
              Upload Course
            </h2>
            <p className="text-gray-600 mb-4">
              (You can implement this form later for uploading new courses.)
            </p>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">Course Title</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Intro to Next.js"
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Course overview..."
                  rows={4}
                />
              </div>
              <div>
                <label className="block font-medium">Course URL</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="https://your-course-link.com"
                />
              </div>
              <button
                type="submit"
                className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
              >
                Upload Course
              </button>
            </form>
          </div>
        );
      case "topics":
        return <TopicUploader />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Tabs */}
      <aside className="md:w-1/4 bg-white border rounded-lg shadow-md p-4 flex md:flex-col gap-3 justify-around md:justify-start">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md font-semibold ${
            activeTab === "jobs"
              ? "bg-violet-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Briefcase size={18} />
          Jobs
        </button>

        <button
          onClick={() => setActiveTab("courses")}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md font-semibold ${
            activeTab === "courses"
              ? "bg-violet-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <BookOpen size={18} />
          Courses
        </button>

        <button
          onClick={() => setActiveTab("topics")}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md font-semibold ${
            activeTab === "topics"
              ? "bg-violet-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <MessagesSquare size={18} />
          Topics
        </button>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1">{renderTabContent()}</section>
    </div>
  );
}
