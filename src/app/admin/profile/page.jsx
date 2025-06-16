"use client";

import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "@/data/profile";

import AdminHeader from "@/components/AdminHeader";
import ProfileSelector from "../../../components/ProfileSelector";

// Function to fix ImgBB URLs
const fixImgBBUrl = (url) => {
  if (!url) return url;

  // Fix common typos in ImgBB URLs
  let fixedUrl = url;

  // Fix i.ibb.co.com to i.ibb.co
  fixedUrl = fixedUrl.replace(/i\.ibb\.co\.com/g, "i.ibb.co");

  // Fix other potential issues with ImgBB URLs
  if (fixedUrl.includes("ibb.co") && !fixedUrl.startsWith("http")) {
    fixedUrl = "https://" + fixedUrl;
  }

  return fixedUrl;
};

export default function AdminProfilePage() {
  const [formData, setFormData] = useState(() => {
    const profile = getProfile();
    // Fix ImgBB URL if needed
    if (profile.image && profile.image.includes("ibb.co")) {
      profile.image = fixImgBBUrl(profile.image);
    }
    return profile;
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  // Fix image URL when it changes
  useEffect(() => {
    if (formData.image && formData.image.includes("ibb.co")) {
      const fixedUrl = fixImgBBUrl(formData.image);
      if (fixedUrl !== formData.image) {
        setFormData((prev) => ({
          ...prev,
          image: fixedUrl,
        }));
      }
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested social media fields
    if (name.startsWith("social.")) {
      const socialField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (imagePath) => {
    // Fix ImgBB URL if needed
    const fixedImagePath = fixImgBBUrl(imagePath);

    setFormData((prev) => ({
      ...prev,
      image: fixedImagePath,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Fix ImgBB URL if needed
      const updatedFormData = {
        ...formData,
        image: fixImgBBUrl(formData.image),
      };

      // Update profile data
      updateProfile(updatedFormData);

      // Trigger storage event to notify other components
      window.dispatchEvent(new Event("storage"));

      // Show success message
      setMessage({
        text: "Profile updated successfully!",
        type: "success",
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    } catch (error) {
      // Show error message
      setMessage({
        text: `Error updating profile: ${error instanceof Error ? error.message : "Unknown error"
          }`,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen">
     
      <main className="">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Profile Settings
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Update your personal information and profile photo.
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
                  className={`mb - 6 p - 4 rounded - md ${message.type === "success"
                    ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <ProfileSelector
                  selectedImage={formData.image}
                  onChange={handleImageChange}
                />

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Bio *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Social Media
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="social.github"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        GitHub
                      </label>
                      <input
                        type="url"
                        id="social.github"
                        name="social.github"
                        value={formData.social.github}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="social.linkedin"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        id="social.linkedin"
                        name="social.linkedin"
                        value={formData.social.linkedin}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="social.twitter"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Twitter
                      </label>
                      <input
                        type="url"
                        id="social.twitter"
                        name="social.twitter"
                        value={formData.social.twitter}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
