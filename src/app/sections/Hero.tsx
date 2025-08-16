"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CodeXml } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-white text-center overflow-hidden px-6 dark:bg-black">
      {/* === Background Grid === */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial fade mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* === Content === */}
      <div className="z-10 max-w-3xl">
        {/* Top Announcement */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-fit items-center mx-auto mb-6 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700 shadow-sm"
        >
          <span className="mr-2">
            <CodeXml />
          </span>
          Exciting announcement 🎉
        </motion.div>

        {/* Headline */}
        <h1 className="z-20 bg-gradient-to-b from-neutral-400 to-neutral-700 bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-6xl">
          Where Bold Ideas Meet Seamless Execution.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Calqus crafts web and app solutions designed to attract, engage, and
          convert — so your business can grow faster, smarter, and stronger.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#book"
            className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
          >
            Book a Call
          </Link>
          <Link
            href="#explore"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Explore Jobs & Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
