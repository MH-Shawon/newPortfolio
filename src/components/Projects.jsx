"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import config from "@/config";

const Projects = ({ showAll = false }) => {
  const [projects, setProjects] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Load projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // If not showing all, only show the 3 most recent projects
        setProjects(showAll ? data : data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [showAll]);

  // Handle image load error
  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({
      ...prev,
      [projectId]: true,
    }));
  };

  // Animation variants for header elements
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for project cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Increased delay between each project
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase"
          >
            Projects
          </motion.h2>
          <motion.p
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {showAll ? "All Projects" : "My Recent Work"}
          </motion.p>
          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto"
          >
            {showAll
              ? "A comprehensive list of all my projects."
              : "Here are some of my most recent projects. Each project represents a unique challenge and solution."}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={imageErrors[project._id] ? "/assets/placeholder.png" : project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(project._id)}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-4">
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Demo
                      </motion.a>
                    )}
                    {project.codeLink && (
                      <motion.a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Code
                      </motion.a>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!showAll && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2 }} // Increased delay to appear after all projects
            className="mt-12 text-center"
          >
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
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
