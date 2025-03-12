"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

export default function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to fix ImgBB URL if it has typos
  const fixImgBBUrl = (url: string): string => {
    // Fix common typos in ImgBB URLs
    if (url.includes("i.ibb.co.com")) {
      return url.replace("i.ibb.co.com", "i.ibb.co");
    }
    return url;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to ImgBB
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      console.log("ImgBB API response:", data); // Log the response for debugging

      // ImgBB returns different URL formats, try to get the most reliable one
      // Prefer the direct image URL if available
      let imageUrl =
        data.data?.image?.url || data.data?.url || data.url || data.display_url;

      // Verify the URL is valid
      if (!imageUrl) {
        throw new Error("No image URL returned from ImgBB");
      }

      // Fix any URL issues
      imageUrl = fixImgBBUrl(imageUrl);

      console.log("Using image URL:", imageUrl);
      onImageUploaded(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
      console.error("Error uploading image:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-label="Upload image file"
        />

        {preview && (
          <div className="relative h-40 w-40 mb-4 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
            <Image
              src={preview}
              alt="Image preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <button
          type="button"
          onClick={triggerFileInput}
          disabled={isUploading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            "Upload from your device"
          )}
        </button>
      </div>

      {error && (
        <div className="text-red-500 p-4 border border-red-300 rounded-md bg-red-50 dark:bg-red-900 dark:border-red-700">
          {error}
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Images will be uploaded to ImgBB and hosted externally
      </p>
    </div>
  );
}
