"use client";

import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";
import { useState, useEffect } from "react";

const Projects = ({ showAll = false }) => {
  const [projects, setProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  // Load projects when component mounts and when localStorage changes
  useEffect(() => {
    const allProjects = getAllProjects() || [];
    // If not showing all, only show the 3 most recent projects
    setProjects(Array.isArray(allProjects) ? (showAll ? allProjects : allProjects.slice(0, 3)) : []);

    // Listen for storage events to update projects when they change in another tab
    const handleStorageChange = () => {
      const updatedProjects = getAllProjects() || [];
      setProjects(Array.isArray(updatedProjects) ? (showAll ? updatedProjects : updatedProjects.slice(0, 3)) : []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [showAll]);

  // Handle image load error
  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({
      ...prev,
      [projectId]: true,
    }));
    console.error("Failed to load image");
  };

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Projects
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {showAll ? "All Projects" : "My Recent Work"}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            {showAll
              ? "A comprehensive list of all my projects."
              : "Here are some of my most recent projects. Each project represents a unique challenge and solution."}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 w-full bg-gray-300 dark:bg-gray-700">
                {imageErrors[project.id] ? (
                  <div className="flex items-center justify-center h-full w-full text-gray-500 dark:text-gray-400 text-sm">
                    <span>Image not available</span>
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized={true}
                    onError={() => handleImageError(project.id)}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  >
                    View Code
                  </a>
                </div>
                {project.featured && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  </div>
                )}
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && projects.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View All Projects
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
