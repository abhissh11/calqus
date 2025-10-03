"use client";

import { useState } from "react";

export default function TopicUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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

      setSuccess("Topic uploaded successfully ✅");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white dark:bg-neutral-900">
      <h2 className="text-lg font-semibold mb-4">Upload New Topic</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            required
            className="w-full border p-2 rounded"
            placeholder="JavaScript"
          />
        </div>

        <div>
          <label className="block font-medium">Topic</label>
          <input
            type="text"
            name="topic"
            required
            className="w-full border p-2 rounded"
            placeholder="Closures"
          />
        </div>

        <div>
          <label className="block font-medium">Video Reference (URL)</label>
          <input
            type="text"
            name="videoRef"
            className="w-full border p-2 rounded"
            placeholder="https://youtube.com/example"
          />
        </div>

        <div>
          <label className="block font-medium">Blog Reference (URL)</label>
          <input
            type="text"
            name="blog"
            className="w-full border p-2 rounded"
            placeholder="https://myblog.com/resource"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Topic"}
        </button>
      </form>
    </div>
  );
}
