"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Palette,
  Smartphone,
  Server,
  BookOpen,
  BriefcaseBusiness,
  FileQuestionMark,
  House,
  CodeXml,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import BookCallModal from "./BookCallModal";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black px-5 md:px-7 py-2 shadow-sm border-b flex gap-2 justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-neutral-800 dark:text-neutral-100 text-2xl font-bold flex items-center">
            <Image
              src="/images/calqus-logo.png"
              alt="logo"
              width={36}
              height={36}
            />{" "}
            Calqus
          </h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center text-gray-700 dark:text-gray-200 relative">
          <Link href="/" className="hover:text-violet-500 flex items-end gap-1">
            <House /> Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-end gap-1 hover:text-violet-500">
              <CodeXml size={24} /> Services
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute left-0 mt-5 w-64 rounded-lg border border-gray-200 bg-white dark:bg-neutral-900 shadow-lg p-3 z-50"
                >
                  <div className="grid grid-cols-1 gap-2">
                    <ServiceItem
                      icon={<Palette size={20} className="text-violet-500" />}
                      title="Web Design"
                    />
                    <ServiceItem
                      icon={
                        <Smartphone size={20} className="text-violet-500" />
                      }
                      title="App Development"
                    />
                    <ServiceItem
                      icon={<Server size={20} className="text-violet-500" />}
                      title="Fullstack Webapp Development"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/courses"
            className="hover:text-violet-500 flex items-end gap-1"
          >
            <BookOpen size={24} /> Courses
          </Link>
          <Link
            href="/courses"
            className="hover:text-violet-500 flex items-end gap-1"
          >
            <FileQuestionMark size={24} /> Interview-Questions
          </Link>
          <Link
            href="/jobs"
            className="hover:text-violet-500 flex items-end gap-1"
          >
            <BriefcaseBusiness size={24} /> Jobs
          </Link>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          <Link href="/login" className="hover:text-violet-500">
            Login
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1 text-gray-700 cursor-pointer hover:bg-violet-600 hover:text-white rounded-lg dark:text-gray-200"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              ref={drawerRef}
              className="fixed top-0 right-0 h-screen w-3/4 bg-white dark:bg-neutral-900 shadow-lg z-50 p-6 flex flex-col gap-6 items-start justify-center"
            >
              {/* Close Icon inside drawer */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-gray-100 p-1 rounded-lg bg-violet-500 cursor-pointer hover:bg-violet-600 dark:text-gray-200"
              >
                <X size={28} />
              </button>

              <Link
                href="/"
                className="hover:text-violet-500 flex items-end gap-1"
                onClick={() => setMobileOpen(false)}
              >
                <House size={24} /> Home
              </Link>

              <div>
                <p className="font-medium text-gray-700 flex items-end gap-1 dark:text-gray-200 mb-2">
                  <CodeXml size={24} /> Services
                </p>
                <div className="flex flex-col gap-2">
                  <ServiceItem
                    icon={<Palette size={20} className="text-violet-500" />}
                    title="Web Design"
                    onClick={() => setMobileOpen(false)}
                  />
                  <ServiceItem
                    icon={<Smartphone size={20} className="text-violet-500" />}
                    title="App Development"
                    onClick={() => setMobileOpen(false)}
                  />
                  <ServiceItem
                    icon={<Server size={20} className="text-violet-500" />}
                    title="Fullstack Webapp Development"
                    onClick={() => setMobileOpen(false)}
                  />
                </div>
              </div>

              <Link
                href="/courses"
                className="hover:text-violet-500 flex items-end gap-1"
                onClick={() => setMobileOpen(false)}
              >
                <BookOpen size={24} /> Courses
              </Link>
              <Link
                href="/courses"
                className="hover:text-violet-500 flex items-end gap-1"
                onClick={() => setMobileOpen(false)}
              >
                <FileQuestionMark size={24} /> Interview-Questions
              </Link>
              <Link
                href="/jobs"
                className="hover:text-violet-500 flex items-end gap-1"
                onClick={() => setMobileOpen(false)}
              >
                <BriefcaseBusiness size={24} /> Jobs
              </Link>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsModalOpen(true);
                }}
                className="mt-auto px-4 py-2 text-white rounded-lg bg-violet-600 hover:bg-violet-700 cursor-pointer"
              >
                Book a Call
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <BookCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

// Reusable service item
const ServiceItem = ({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}) => (
  <Link
    href="#services"
    onClick={onClick}
    className="flex items-center gap-3 p-2 rounded-md hover:bg-violet-50 dark:hover:bg-neutral-800 transition-colors"
  >
    {icon}
    <span className="text-sm text-gray-700 dark:text-gray-200">{title}</span>
  </Link>
);
