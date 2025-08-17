// components/Services.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Palette } from "lucide-react";

const services = [
  {
    title: "Custom Websites",
    description: "Pixel-perfect, responsive, and SEO-friendly.",
    img: "/images/custom-web.jpg",
  },
  {
    title: "Web Apps",
    description: "Full-stack solutions tailored to your business logic.",
    img: "/images/webapp.jpg",
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform apps with smooth user experience.",
    img: "/images/appdev.jpg",
  },
  {
    title: "Brand & UI/UX",
    description: "Modern design that aligns with your vision.",
    icon: <Palette className="w-12 h-12 text-indigo-500" />,
    img: "/images/uiux.jpg",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Services</h2>
        <p className="text-gray-600 mb-12">
          Everything you need to launch and scale
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-md shadow-violet-200 hover:shadow-lg transition p-4 border border-gray-100 
                         hover:border-violet-200 hover:shadow-violet-300"
            >
              <div className="w-full h-46 flex items-center justify-center bg-gray-50 rounded-xl mb-4 overflow-hidden">
                {service.img ? (
                  <Image
                    src={service.img}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  service.icon
                )}
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-600 text-start">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
