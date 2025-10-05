"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      jobType: formData.get("jobType"),
      salary: formData.get("salary"),
      experience: formData.get("experience"),
      companyLogo: formData.get("companyLogo"),
      applyLink: formData.get("applyLink"),
      jobDescription: formData.get("jobDescription"), 
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) {
        throw new Error("Failed to post job");
      }

      const job = await res.json();
      router.push(`/jobs/${job.slug}`); // redirect to job page
    } catch (err: unknown) {
      if (err instanceof Error) { 
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto my-20 shadow-lg p-8 rounded-xl shadow-violet-300">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border p-2 rounded"
            placeholder="Frontend Developer"
          />
        </div>

        {/* Apply Link */}
        <div>
          <label className="block font-medium">Apply Link</label>
          <input
            type="text"
            name="applyLink"
            className="w-full border p-2 rounded"
            placeholder="https://apply.example.com"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block font-medium">Company</label>
          <input
            type="text"
            name="company"
            required
            className="w-full border p-2 rounded"
            placeholder="Calqus"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border p-2 rounded"
            placeholder="Remote / Bangalore"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium">Job Type</label>
          <select name="jobType" required className="w-full border p-2 rounded">
            <option value="">Select...</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block font-medium">Salary</label>
          <input
            type="text"
            name="salary"
            required
            className="w-full border p-2 rounded"
            placeholder="₹8 LPA / ₹20k per month"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium">Experience</label>
          <input
            type="text"
            name="experience"
            required
            className="w-full border p-2 rounded"
            placeholder="2+ years / Fresher"
          />
        </div>

        {/* Company Logo */}
        <div>
          <label className="block font-medium">Company Logo URL</label>
          <input
            type="text"
            name="companyLogo"
            className="w-full border p-2 rounded"
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/*  Job Description */}
        <div>
          <label className="block font-medium">Job Description</label>
          <textarea
            name="jobDescription"
            required
            rows={6}
            className="w-full border p-2 rounded"
            placeholder="Write the job responsibilities, required skills, and perks..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </main>
  );
}
