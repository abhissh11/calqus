"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

export function CalqusCTA() {
  return (
    <div className="h-[32rem] w-full rounded-md bg-gradient-to-tl from-violet-200 to-white relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-6xl">
          Ready to Build with Calqus?
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto my-4 text-base relative z-10">
          Whether you need a custom website, a scalable web app, or end-to-end
          development support, Calqus has the expertise to bring your vision to
          life. Let’s start your journey today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 relative z-10">
          <button className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Background Beams */}
      <BackgroundBeams className="opacity-60" />
    </div>
  );
}
