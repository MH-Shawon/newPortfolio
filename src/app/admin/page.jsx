"use client";

import { useState, useEffect } from "react";
// Removed: import { addProject } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import ImageSelector from "@/components/ImageSelector";
import { useRouter } from "next/navigation";
import config from "@/config";

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

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "/assets/projects/Screenshot from 2025-03-13 01-38-53.png", // Default image
    tags: "",
    demoLink: "",
    codeLink: "",
    featured: false,
    challenges: "",
    solutions: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();

  // Fix image URL when component mounts or when image changes
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
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const fixedImage = fixImgBBUrl(formData.image);

      const projectData = {
        ...formData,
        image: fixedImage,
        tags: tagsArray,
      };

      const response = await fetch(`${config.apiUrl}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newProject = await response.json();

      setMessage({
        text: `Project "${newProject.title}" added successfully!`,
        type: "success",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        longDescription: "",
        image: "/assets/projects/Screenshot from 2025-03-13 01-38-53.png",
        tags: "",
        demoLink: "",
        codeLink: "",
        featured: false,
        challenges: "",
        solutions: "",
      });

      // Redirect to projects page after 2 seconds
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      setMessage({
        text: `Error adding project: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Add new projects to your portfolio. The most recent projects
                will appear first.
              </p>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdminHeader />

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Project
              </h2>
              <Link
                href="/admin/projects"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Manage Projects
              </Link>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-4 rounded-md ${message.type === "success"
                  ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title *
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
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Short Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="longDescription"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Long Description
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Image URL *
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
                <ImageSelector onImageSelect={handleImageChange} currentImage={formData.image} />
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Tags (comma-separated) *
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="demoLink"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Demo Link
                </label>
                <input
                  type="url"
                  id="demoLink"
                  name="demoLink"
                  value={formData.demoLink}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="codeLink"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Code Link
                </label>
                <input
                  type="url"
                  id="codeLink"
                  name="codeLink"
                  value={formData.codeLink}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="challenges"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Challenges
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="solutions"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Solutions
                </label>
                <textarea
                  id="solutions"
                  name="solutions"
                  value={formData.solutions}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Featured Project
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
