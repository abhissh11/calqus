"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Code2, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Scalable Solutions",
    description: "Built to grow with you at every stage of your journey.",
    img: "/images/scalable.jpg",
    icon: <Zap className="w-8 h-8 text-indigo-500" />,
  },
  {
    title: "Cutting-Edge Tech",
    description:
      "Modern frameworks and AI incorporation powering your success.",
    img: "/images/tech-office.jpg",
    icon: <Code2 className="w-8 h-8 text-indigo-500" />,
  },
  {
    title: "End-to-End Support",
    description:
      "From concept to launch, we're with you every step of the way.",
    img: "/images/meeting.jpg",
    icon: <CheckCircle2 className="w-8 h-8 text-indigo-500" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white" id="why-choose-us">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us</h2>
        <p className="text-gray-600 text-lg mb-12">
          Built for growth, powered by innovation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
                <Image
                  src={feature.img}
                  alt={feature.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 max-w-xs">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
