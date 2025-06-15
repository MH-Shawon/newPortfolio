"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploader from "./ImageUploader";

export default function ImageSelector({ currentImage, onImageSelect }) {
  const [availableImages, setAvailableImages] = useState([
    "/assets/projects/Screenshot from 2025-03-13 01-38-53.png",
    "/assets/projects/Screenshot from 2025-03-13 01-40-31.png",
  ]);
  const [showSelector, setShowSelector] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Function to fix ImgBB URL if it has typos
  const fixImgBBUrl = (url) => {
    if (!url) return url; // Handle null/undefined url input
    // Fix common typos in ImgBB URLs
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
    setImageError(false); // Reset error state whenever currentImage changes
  }, [currentImage, onImageSelect]);

  // Fetch available images when component mounts
  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/project-images");
        if (response.ok) {
          const data = await response.json();
          if (
            data.images &&
            Array.isArray(data.images) &&
            data.images.length > 0
          ) {
            setAvailableImages(data.images);
          } else {
            setImages([]);
            return;
          }
        } else {
          setError(
            `Failed to load images: ${response.status} ${response.statusText}`
          );
          setImages([]);
        }
      } catch (error) {
        setError(
          `Error loading images: ${error instanceof Error ? error.message : "Unknown error"
          }`
        );
        setImages([]);
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
    onImageSelect(imagePath);
    setShowSelector(false);
  };

  // Function to handle custom image URL input
  const handleCustomImageUrl = (e) => {
    const url = e.target.value;
    onImageSelect(url ? fixImgBBUrl(url) : ""); // Ensure url is not null/undefined before checking includes, return empty string for empty input
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

  // Ensure image source is always a valid string. If currentImage is falsy, set imageSrc to null.
  const imageSrc = currentImage || null; // Use null instead of empty string for better conditional rendering

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Project Image *
      </label>

      <div className="flex items-center space-x-4">
        <div className="relative h-24 w-24 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          {imageError || !imageSrc ? ( // Show placeholder if imageSrc is null/falsy or error occurred
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
          value={imageSrc || ""}
          onChange={handleCustomImageUrl}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="/assets/projects/your-image.jpg or https://i.ibb.co/..."
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter a URL, select from the gallery, or upload a new image
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

      {showSelector && (
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 border border-red-300 rounded-md bg-red-50 dark:bg-red-900 dark:border-red-700">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableImages.map((imagePath, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectImage(imagePath)}
                  className={`relative h-24 cursor-pointer border-2 rounded-md overflow-hidden ${imageSrc === imagePath
                    ? "border-indigo-500"
                    : "border-gray-300 dark:border-gray-700"
                    }`}
                >
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs text-center p-1">
                      Missing image
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
