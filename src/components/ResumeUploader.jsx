"use client";

import { useState, useRef } from "react";

export default function ResumeUploader({
  onResumeUploaded,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    // Reset states
    setError(null);
    setSuccess(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload resume");
      }

      setSuccess("Resume uploaded successfully!");
      onResumeUploaded(data.url);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to upload resume"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF files only
            </p>
          </div>
          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={isUploading}
          />
        </label>
      </div>

      {isUploading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Uploading...
          </span>
        </div>
      )}

      {error && (
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900 dark:text-green-200">
          {success}
        </div>
      )}
    </div>
  );
}
