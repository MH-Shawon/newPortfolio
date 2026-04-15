"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploader from "./ImageUploader";

export default function ImageSelector({ currentImage, onImageSelect }) {
  const [showUploader, setShowUploader] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function to fix ImgBB URL if it has typos
  const fixImgBBUrl = (url) => {
    if (!url) return url;
    if (url.includes("i.ibb.co.com")) {
      return url.replace("i.ibb.co.com", "i.ibb.co");
    }
    if (url.includes("ibb.co.com")) {
      return url.replace("ibb.co.com", "ibb.co");
    }
    return url;
  };

  // Fix the current image URL if needed and reset imageError when currentImage changes
  useEffect(() => {
    if (currentImage && currentImage.includes("i.ibb.co.com")) {
      onImageSelect(fixImgBBUrl(currentImage));
    }
    setImageError(false);
  }, [currentImage, onImageSelect]);

  // Function to handle custom image URL input
  const handleCustomImageUrl = (e) => {
    const url = e.target.value;
    onImageSelect(url ? fixImgBBUrl(url) : "");
  };

  // Function to handle image upload
  const handleImageUploaded = (imageUrl) => {
    onImageSelect(imageUrl);
    setShowUploader(false);
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = currentImage || null;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Project Image *
      </label>

      <div className="flex items-center space-x-4">
        <div className="relative h-24 w-24 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          {imageError || !imageSrc ? (
            <div className="flex items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs text-center p-1">
              No image selected or failed to load.
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt="Selected project image"
              fill
              className="object-cover"
              unoptimized={true}
              onError={handleImageError}
            />
          )}
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={() => {
              setShowUploader(!showUploader);
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showUploader ? "Cancel Upload" : "Upload New Image"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL
        </label>
        <input
          type="text"
          value={imageSrc || ""}
          onChange={handleCustomImageUrl}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="https://i.ibb.co/..."
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter a URL, or upload a new image
        </p>
      </div>

      {showUploader && (
        <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upload Image to ImgBB
          </h3>
          <ImageUploader onImageUploaded={handleImageUploaded} />
        </div>
      )}
    </div>
  );
}
