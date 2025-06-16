"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import ImageSelector from "@/components/ImageSelector";
import config from "@/config";
import toast, { Toaster } from "react-hot-toast";

// Function to fix ImgBB URLs
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

export default function EditProjectPage({ params }) {
  const router = useRouter();
  const projectId = params.id;
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

  const [loading, setLoading] = useState(true);

  // Fetch project data from backend
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        if (!projectId) {
          throw new Error("Project ID is missing");
        }

        // Validate MongoDB ObjectId format
        if (!/^[0-9a-fA-F]{24}$/.test(projectId)) {
          throw new Error("Invalid project ID format");
        }

        const response = await fetch(`${config.apiUrl}/api/projects/${projectId}`);

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Server returned non-JSON response: ${contentType}`);
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const project = await response.json();

        if (project) {
          // Ensure project.image is a string before passing to fixImgBBUrl
          const imageFromProject = project.image || "";
          const fixedImage = fixImgBBUrl(imageFromProject);

          setFormData({
            title: project.title || "",
            description: project.description || "",
            longDescription: project.longDescription || "",
            image: fixedImage,
            tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
            demoLink: project.demoLink || "",
            codeLink: project.codeLink || "",
            featured: project.featured || false,
            challenges: project.challenges || "",
            solutions: project.solutions || "",
          });
        } else {
          toast.error("Project not found");
        }
      } catch (error) {
        toast.error(`Error loading project: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

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

      const response = await fetch(`${config.apiUrl}/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedProject = await response.json();

      toast.success(`Project "${updatedProject.title}" updated successfully!`);

      // Redirect to projects page after 2 seconds
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      toast.error(`Error updating project: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Edit Project" />
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
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader title="Edit Project" />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Edit Project
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                Update an existing project in your portfolio.
              </p>
            </div>

            <div className="mt-12">
              <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Project Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">This information will be displayed publicly on your portfolio.</p>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Title
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="given-name"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.title}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Short Description
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="description"
                            name="description"
                            rows="3"
                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.description}
                            onChange={handleChange}
                            required
                          ></textarea>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">A brief description for your project.</p>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Long Description
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="longDescription"
                            name="longDescription"
                            rows="6"
                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.longDescription}
                            onChange={handleChange}
                          ></textarea>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">A more detailed description of your project, including its purpose, features, and technologies used.</p>
                        </div>
                      </div>

                      <ImageSelector
                        currentImage={formData.image}
                        onImageChange={handleImageChange}
                      />

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Tags
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="tags"
                            id="tags"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., React, Node.js, MongoDB"
                          />
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Comma-separated list of technologies or keywords.</p>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="demoLink" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Demo Link
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="url"
                            name="demoLink"
                            id="demoLink"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.demoLink}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="codeLink" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Code Link (GitHub)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="url"
                            name="codeLink"
                            id="codeLink"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.codeLink}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Challenges
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="challenges"
                            name="challenges"
                            rows="3"
                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.challenges}
                            onChange={handleChange}
                          ></textarea>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Describe any challenges faced during the project.</p>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <label htmlFor="solutions" className="block text-sm font-medium text-gray-700 dark:text-gray-200 sm:mt-px sm:pt-2">
                          Solutions
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="solutions"
                            name="solutions"
                            rows="3"
                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.solutions}
                            onChange={handleChange}
                          ></textarea>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">How you overcame the challenges.</p>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="featured"
                              name="featured"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
                              checked={formData.featured}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="featured" className="font-medium text-gray-700 dark:text-gray-200">
                              Featured Project
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">Display this project on the main landing page.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link href="/admin/projects">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
