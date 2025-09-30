// app/not-found.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-5xl font-semibold text-violet-600">404</h1>
      <h2 className="mt-4 text-2xl md:text-2xl font-semibold text-gray-900 flex gap-2 items-center">
        <Frown /> Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        Oops! The page you’re looking for doesn’t exist. <br />
         Let’s get you back on
        track.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}
