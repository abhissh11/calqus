"use client";
import { motion } from "framer-motion";
import { BookOpen, Users } from "lucide-react";

const items = [
  {
    title: "Learn Modern Development",
    description: "Master the latest frameworks and tools",
    buttonText: "View Courses",
    icon: <BookOpen className="w-12 h-12 text-violet-600" />,
  },
  {
    title: "Find Jobs ",
    description: "Open positions for talented developers",
    buttonText: "Browse Jobs",
    icon: <Users className="w-12 h-12 text-violet-600" />,
  },
];

export default function Explore() {
  return (
    <section className="py-20 bg-indigo-50" id="explore">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Upskill or Find Jobs, Internships curated for You
        </h2>
        <p className="text-gray-600 text-base mb-12">
          Your next career move starts here
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto ">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="group bg-gradient-to-br from-violet-200 to-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition hover:shadow-lg"
            >
              <div className="group-hover:shadow-2xl mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-violet-100">
                {item.icon}
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <button className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                  {item.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
