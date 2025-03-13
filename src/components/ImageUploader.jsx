"use client";

import { useState } from "react";

export default function ImageUploader({ onImageUploaded }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("image", file);

      // Upload to ImgBB
      const response = await fetch("https://api.imgbb.com/1/upload?key=" + process.env.NEXT_PUBLIC_IMGBB_API_KEY, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onImageUploaded(data.data.url);
      } else {
        setError("Failed to upload image: " + (data.error?.message || "Unknown error"));
      }
    } catch (error) {
      setError("Error uploading image: " + (error.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Choose Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-indigo-50 file:text-indigo-700
            dark:file:bg-indigo-900 dark:file:text-indigo-300
            hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
        />
      </div>

      {isUploading && (
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Uploading...</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
