"use client";

import { motion } from "framer-motion";
import { CodeXml } from "lucide-react";

export default function HeroAnnouncement() {
  return (
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
  );
}
