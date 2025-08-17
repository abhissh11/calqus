"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Calqus</h2>
          <p className="mt-3 text-sm text-gray-600">
            Building modern web solutions, tailored to your growth.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/services">Custom Websites</Link>
            </li>
            <li>
              <Link href="/services">Web Apps</Link>
            </li>
            <li>
              <Link href="/services">Mobile Apps</Link>
            </li>
            <li>
              <Link href="/services">Brand & UI/UX</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/services">About Us</Link>
            </li>
            <li>
              <Link href="/jobs">Find Jobs</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
          <div className="flex space-x-4">
            <Link href="mailto:abhishekkr.ssh@gmail.com" target="_blank">
              <Mail className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition" />
            </Link>
            <Link href="https://linkedin.com/in/abhishekkr-dev" target="_blank">
              <Linkedin className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition" />
            </Link>
            <Link href="https://x.com/abhissh11" target="_blank">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 mt-8 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Calqus. All rights reserved.
      </div>
    </footer>
  );
}
