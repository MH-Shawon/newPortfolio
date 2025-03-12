"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ResumePage() {
  const [resumeUrl, setResumeUrl] = useState("/assets/resume/resume.pdf");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // You could fetch the resume URL from an API if needed
    // For now, we'll use a static URL
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                My Resume
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                View or download my professional resume
              </p>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md text-red-800 dark:text-red-200">
                {error}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  <div className="h-[800px] w-full">
                    <iframe
                      src={resumeUrl}
                      className="w-full h-full"
                      title="Resume"
                    ></iframe>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a
                    href={resumeUrl}
                    download="resume.pdf"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Download Resume
                  </a>
                </div>

                <div className="text-center mt-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Interested in discussing opportunities? Feel free to reach
                    out.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Contact Me
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
