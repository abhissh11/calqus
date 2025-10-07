"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function TopicUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const topicData = {
      subject: formData.get("subject"),
      topic: formData.get("topic"),
      videoRef: formData.get("videoRef"),
      blog: formData.get("blog"),
    };

    try {
      const res = await fetch("/api/interview-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topicData),
      });

      if (!res.ok) throw new Error("Failed to create topic");

      toast.success("Topic uploaded successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white dark:bg-neutral-900">
      <h2 className="text-lg font-semibold mb-4">Upload New Topic</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SUBJECT — SELECT DROPDOWN */}
        <div>
          <label className="block font-medium">Subject</label>
          <select
            name="subject"
            required
            className="w-full border p-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            <option value="JavaScript">JavaScript</option>
            <option value="ReactJs">ReactJs</option>
            <option value="NodeJs">NodeJs</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Docker">Docker</option>
            <option value="NextJs">NextJs</option>
            <option value="Java">Java</option>
          </select>
        </div>

        {/* TOPIC — TEXT INPUT */}
        <div>
          <label className="block font-medium">Topic</label>
          <input
            type="text"
            name="topic"
            required
            className="w-full border p-2 rounded"
            placeholder="Closures, Middleware, Virtual DOM..."
          />
        </div>

        {/* VIDEO REF */}
        <div>
          <label className="block font-medium">Video Reference (URL)</label>
          <input
            type="text"
            name="videoRef"
            className="w-full border p-2 rounded"
            placeholder="https://youtube.com/example"
          />
        </div>

        {/* BLOG REF */}
        <div>
          <label className="block font-medium">Blog Reference (URL)</label>
          <input
            type="text"
            name="blog"
            className="w-full border p-2 rounded"
            placeholder="https://myblog.com/resource"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Topic"}
        </button>
      </form>
    </div>
  );
}
