"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Link from "next/link";
import { getFeaturedProjects, Project } from "@/data/projects";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  // Load featured projects when component mounts and when localStorage changes
  useEffect(() => {
    setFeaturedProjects(getFeaturedProjects());

    // Listen for storage events to update projects when they change in another tab
    const handleStorageChange = () => {
      setFeaturedProjects(getFeaturedProjects());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle image load error
  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({
      ...prev,
      [projectId]: true,
    }));
    console.error(`Failed to load image for project`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                My Projects
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                A showcase of my work, featuring web applications and
                development projects.
              </p>
            </div>
          </div>
        </div>

        <Projects />

        {featuredProjects.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center mb-12">
                <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                  Featured Projects
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Detailed Case Studies
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                  Deep dives into some of my most significant projects,
                  exploring challenges and solutions.
                </p>
              </div>

              <div className="mt-12 space-y-16">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                  >
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                      <div className="relative h-64 lg:h-auto bg-gray-300 dark:bg-gray-700">
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
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {project.title}
                        </h3>
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
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {project.longDescription || project.description}
                        </p>

                        {project.challenges && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Challenges
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {project.challenges}
                            </p>
                          </div>
                        )}

                        {project.solutions && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Solutions
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {project.solutions}
                            </p>
                          </div>
                        )}

                        <div className="flex space-x-4">
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Live Demo
                          </a>
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            View Code
                          </a>
                        </div>

                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Interested in working together?
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
