"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileImageUploader from "./ProfileImageUploader";

/**
 * Function to fix ImgBB URLs by correcting common typos and ensuring proper format
 * @param {string} url - The URL to fix
 * @returns {string} The fixed URL
 */
const fixImgBBUrl = (url) => {
  if (!url) return url;

  // Fix common typos in ImgBB URLs
  let fixedUrl = url;

  // Fix i.ibb.co.com to i.ibb.co
  fixedUrl = fixedUrl.replace(/i\.ibb\.co\.com/g, "i.ibb.co");

  // Fix other potential issues with ImgBB URLs
  if (fixedUrl.includes("ibb.co") && !fixedUrl.startsWith("http")) {
    fixedUrl = `https://${fixedUrl}`;
  }

  return fixedUrl;
};

/**
 * ProfileSelector component for managing profile images
 * @param {Object} props - Component props
 * @param {string} props.selectedImage - Currently selected image URL
 * @param {Function} props.onChange - Callback when image changes
 */
const ProfileSelector = ({ selectedImage, onChange }) => {
  const [showUploader, setShowUploader] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fix image URL when component mounts
  useEffect(() => {
    if (selectedImage && selectedImage.includes("ibb.co")) {
      const fixedUrl = fixImgBBUrl(selectedImage);
      if (fixedUrl !== selectedImage) {
        onChange(fixedUrl);
      }
    }
  }, [selectedImage, onChange]);

  // Function to handle custom image URL input
  const handleCustomImageUrl = (e) => {
    setImageError(false);
    const fixedImagePath = fixImgBBUrl(e.target.value);
    onChange(fixedImagePath);
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle image upload
  const handleImageUploaded = (imageUrl) => {
    setImageError(false);
    onChange(imageUrl);
    setShowUploader(false);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Profile Photo *
      </label>

      <div className="flex items-center space-x-4">
        <div className="relative h-32 w-32 border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden">
          {imageError ? (
            <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <span>Image not available</span>
            </div>
          ) : (
            <Image
              src={selectedImage || "/assets/profile/default-profile.jpg"}
              alt="Selected profile image"
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
          value={selectedImage || ""}
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
            Upload Profile Image
          </h3>
          <ProfileImageUploader onImageUploaded={handleImageUploaded} />
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
