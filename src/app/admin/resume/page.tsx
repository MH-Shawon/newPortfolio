"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import ResumeUploader from "@/components/ResumeUploader";

export default function AdminResumePage() {
  const [resumeUrl, setResumeUrl] = useState("/assets/resume/resume.pdf");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleResumeUploaded = (url: string) => {
    setResumeUrl(url);
    setMessage({
      text: "Resume uploaded successfully!",
      type: "success",
    });

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Manage Resume
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Upload and manage your resume for recruiters to view
              </p>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdminHeader />

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Upload Resume
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload your resume in PDF format. This will replace any
                    existing resume.
                  </p>
                  <ResumeUploader onResumeUploaded={handleResumeUploaded} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Current Resume
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          className="w-8 h-8 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          resume.pdf
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          View
                        </a>
                        <a
                          href={resumeUrl}
                          download="resume.pdf"
                          className="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Resume Page
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your resume is publicly available at the following URL:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-gray-700 dark:text-gray-300">
                        {typeof window !== "undefined"
                          ? `${window.location.origin}/resume`
                          : "/resume"}
                      </code>
                      <Link
                        href="/resume"
                        target="_blank"
                        className="px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
