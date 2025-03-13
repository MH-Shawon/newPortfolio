"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileImageUploader from "./ProfileImageUploader";

// Function to fix ImgBB URLs
const fixImgBBUrl = (url) {
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

  selectedImage;
  onChange: (imagePath) => void;
}

export default function ProfileSelector({
  selectedImage,
  onChange,
}: ProfileSelectorProps) {
  const [availableImages, setAvailableImages] = useState([
    "/assets/profile/IMG-20240913-WA0023.jpg",
  ]);
  const [showSelector, setShowSelector] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fix image URL when component mounts
  useEffect(() => {
    if (selectedImage && selectedImage.includes("ibb.co")) {
      const fixedUrl = fixImgBBUrl(selectedImage);
      if (fixedUrl !== selectedImage) {
        onChange(fixedUrl);
        console.log(
          `Fixed ImgBB URL on mount: ${selectedImage} -> ${fixedUrl}`
        );
      }
    }
  }, []);

  // Fetch available images when component mounts
  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      try {
        // In a client component, we need to fetch this data from an API
        const response = await fetch("/api/profile-images");
        if (response.ok) {
          const data = await response.json();
          setAvailableImages(data.images);
        }
      } catch (error) {
        console.error("Failed to load profile images, error);
      } finally {
        setIsLoading(false);
      }
    }

    if (showSelector) {
      loadImages();
    }
  }, [showSelector]);

  // Function to handle image selection
  const handleSelectImage = (imagePath) => {
    setImageError(false);
    const fixedImagePath = fixImgBBUrl(imagePath);
    onChange(fixedImagePath);
    setShowSelector(false);

    if (fixedImagePath !== imagePath) {
      console.log(
        `Fixed ImgBB URL on selection: ${imagePath} -> ${fixedImagePath}`
      );
    }
  };

  // Function to handle custom image URL input
  const handleCustomImageUrl = (e) => {
    setImageError(false);
    const fixedImagePath = fixImgBBUrl(e.target.value);
    onChange(fixedImagePath);

    if (fixedImagePath !== e.target.value) {
      console.log(
        `Fixed ImgBB URL on input: ${e.target.value} -> ${fixedImagePath}`
      );
    }
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image);
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
              src={selectedImage}
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
              setShowSelector(!showSelector);
              setShowUploader(false);
            }}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showSelector ? "Hide Gallery" : "Choose from Gallery"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowUploader(!showUploader);
              setShowSelector(false);
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
          value={selectedImage}
          onChange={handleCustomImageUrl}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="/assets/profile/your-image.jpg"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter a URL, select from the gallery, or upload a new image
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

      {showSelector && (
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableImages.map((imagePath, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectImage(imagePath)}
                  className={`relative h-24 cursor-pointer border-2 rounded-full overflow-hidden ${
                    selectedImage === imagePath
                      ? "border-indigo-500"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <Image
                    src={imagePath}
                    alt={`Profile image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
