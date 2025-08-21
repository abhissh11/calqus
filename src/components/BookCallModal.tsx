"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type BookCallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://formspree.io/f/mabcdxyz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSuccess("Your request has been sent successfully!");
        setForm({ name: "", email: "", subject: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 hover:bg-violet-200 p-1 rounded-lg cursor-pointer text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Book a Session With Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject / Topic of Discussion"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>

            {/* Success / Error messages */}
            {success && (
              <p className="text-green-600 text-sm mt-3 text-center">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
            )}

            {/* Email Info */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              or email us at{" "}
              <a
                href="mailto:abc@gmail.com"
                className="text-violet-600 font-medium"
              >
                abc@gmail.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
