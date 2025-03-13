"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectById, updateProject } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import ImageSelector from "@/components/ImageSelector";
import { use } from "react";

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

export default function EditProjectPage({
  params,
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    tags: "",
    demoLink: "",
    codeLink: "",
    featured: false,
    challenges: "",
    solutions: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const project = getProjectById(resolvedParams.id);
      if (project) {
        // Fix ImgBB URL if needed
        const fixedImage = fixImgBBUrl(project.image);

        setFormData({
          title: project.title,
          description: project.description,
          longDescription: project.longDescription || "",
          image: fixedImage,
          tags: project.tags.join(", "),
          demoLink: project.demoLink,
          codeLink: project.codeLink,
          featured: project.featured,
          challenges: project.challenges || "",
          solutions: project.solutions || "",
        });

        if (fixedImage !== project.image) {
          console.log(
            "Fixed ImgBB URL on load: " + project.image + " -> " + fixedImage
          );
        }
      } else {
        setMessage({
          text: "Project not found",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: `Error loading project: ${error instanceof Error ? error.message : "Unknown error"
          }`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  // Fix image URL when it changes
  useEffect(() => {
    if (formData.image && formData.image.includes("ibb.co")) {
      const fixedUrl = fixImgBBUrl(formData.image);
      if (fixedUrl !== formData.image) {
        setFormData((prev) => ({
          ...prev,
          image: fixedUrl,
        }));
        console.log("Fixed ImgBB URL");
      }
    }
  }, [formData.image]);

  /**
   * Handle form input changes
   * @param {Event} e - The change event from the input
   */
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

    if (fixedImagePath !== imagePath) {
      console.log(
        "Fixed ImgBB URL on image change: " + imagePath + " -> " + fixedImagePath
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      // Fix ImgBB URL if needed
      const fixedImage = fixImgBBUrl(formData.image);

      // Update the project with fixed image URL
      updateProject(resolvedParams.id, {
        ...formData,
        image: fixedImage,
        tags: tagsArray,
      });

      // Trigger storage event to notify other components
      window.dispatchEvent(new Event("storage"));

      // Show success message
      setMessage({
        text: `Project "${formData.title}" updated successfully!`,
        type: "success",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      // Show error message
      setMessage({
        text: `Error updating project: ${error instanceof Error ? error.message : "Unknown error"
          }`,
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="py-16 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Loading...
                </h1>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Edit Project
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Update the details of your project.
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
                  className={
                    "mb-6 p-4 rounded-md " +
                    (message.type === "success"
                      ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200")
                  }
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    required
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
                    rows={5}
                    value={formData.longDescription}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  ></textarea>
                </div>

                <ImageSelector
                  selectedImage={formData.image}
                  onChange={handleImageChange}
                />

                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tags * (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    required
                    placeholder="Next.js, React, Tailwind CSS"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="demoLink"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Demo Link *
                    </label>
                    <input
                      type="url"
                      id="demoLink"
                      name="demoLink"
                      value={formData.demoLink}
                      onChange={handleChange}
                      required
                      placeholder="https://example.com"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="codeLink"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Code Link *
                    </label>
                    <input
                      type="url"
                      id="codeLink"
                      name="codeLink"
                      value={formData.codeLink}
                      onChange={handleChange}

                      placeholder="https://github.com/username/repo"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
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
                    rows={3}
                    value={formData.challenges}
                    onChange={handleChange}
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
                    rows={3}
                    value={formData.solutions}
                    onChange={handleChange}
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

                <div className="flex justify-between">
                  <Link
                    href="/admin/projects"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
