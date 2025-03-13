"use client";

import { useState, useEffect } from "react";
import { getAllProjects, deleteProject } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import Image from "next/image";

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState(getAllProjects());
  const [message, setMessage] = useState({ text: "", type: "" });

  // Refresh projects when component mounts and when localStorage changes
  useEffect(() => {
    setProjects(getAllProjects());

    // Listen for storage events to update projects when they change
    const handleStorageChange = () => {
      setProjects(getAllProjects());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDeleteProject = (id, title) => {
    // Confirm deletion
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        // Delete the project
        deleteProject(id);

        // Update projects list
        setProjects(getAllProjects());

        // Trigger storage event to notify other components
        window.dispatchEvent(new Event("storage"));

        // Show success message
        setMessage({
          text: `Project "${title}" deleted successfully!`,
          type: "success",
        });

        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage({ text: "", type: "" });
        }, 3000);
      } catch (error) {
        // Show error message
        setMessage({
          text: `Error deleting project: ${error instanceof Error ? error.message : "Unknown error"
            }`,
          type: "error",
        });
      }
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
                Manage Projects
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                View, edit, and delete your portfolio projects.
              </p>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdminHeader />

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Projects
              </h2>
              <Link
                href="/admin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New Project
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

            {projects.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            {/* Project Image */}
                            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Project Details */}
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {project.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Added on{" "}
                                {new Date(
                                  project.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              {project.featured && (
                                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/projects/edit/${project.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteProject(project.id, project.title)
                              }
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No projects found. Add your first project!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
