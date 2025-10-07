"use client";

import { useState } from "react";
import BookCallModal from "@/components/BookCallModal";

export default function BookCallModalClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors cursor-pointer"
      >
        Book a Call
      </button>

      <BookCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
