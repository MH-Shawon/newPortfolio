export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  featured: boolean;
  challenges?: string;
  solutions?: string;
  createdAt: string; // ISO date string
}

// Initial projects data
const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Website",
    description:
      "A fully responsive e-commerce platform built with Next.js and Tailwind CSS.",
    longDescription:
      "This e-commerce platform provides a complete solution for online stores. It features product listings, categories, user authentication, shopping cart functionality, and secure payment processing through Stripe.",
    image: "/assets/projects/Screenshot from 2025-03-13 01-38-53.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe"],
    demoLink: "#",
    codeLink: "#",
    featured: true,
    challenges:
      "Implementing a secure and seamless checkout process was one of the main challenges.",
    solutions:
      "I used Stripe's secure payment API and implemented a multi-step checkout process with form validation.",
    createdAt: "2023-12-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A productivity app for managing tasks and projects with drag-and-drop functionality.",
    image: "/assets/projects/Screenshot from 2025-03-13 01-40-31.png",
    tags: ["React", "TypeScript", "Redux", "Firebase"],
    demoLink: "#",
    codeLink: "#",
    featured: false,
    createdAt: "2023-10-20T14:30:00Z",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "A weather application that displays current and forecasted weather data.",
    image: "/assets/projects/Screenshot from 2025-03-13 01-38-53.png",
    tags: ["JavaScript", "API Integration", "CSS3", "HTML5"],
    demoLink: "#",
    codeLink: "#",
    featured: false,
    createdAt: "2023-08-05T09:15:00Z",
  },
];

// Load projects from localStorage or use initial data
const loadProjects = (): Project[] => {
  if (typeof window === "undefined") {
    return initialProjects;
  }

  const savedProjects = localStorage.getItem("portfolio_projects");
  if (savedProjects) {
    try {
      return JSON.parse(savedProjects);
    } catch (error) {
      console.error("Failed to parse saved projects:", error);
      return initialProjects;
    }
  }

  // If no saved projects, save the initial ones
  localStorage.setItem("portfolio_projects", JSON.stringify(initialProjects));
  return initialProjects;
};

// Save projects to localStorage
const saveProjects = (projects: Project[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }
};

// Projects state
let projects: Project[] = initialProjects;

// Initialize projects on client side
if (typeof window !== "undefined") {
  projects = loadProjects();
}

// Get all projects sorted by creation date (newest first)
export const getAllProjects = (): Project[] => {
  if (typeof window !== "undefined") {
    // Ensure we have the latest data from localStorage when on client
    projects = loadProjects();
  }

  return [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get featured projects
export const getFeaturedProjects = (): Project[] => {
  return getAllProjects().filter((project) => project.featured);
};

// Add a new project
export const addProject = (
  project: Omit<Project, "id" | "createdAt">
): Project => {
  const newProject: Project = {
    ...project,
    id: Date.now().toString(), // Generate a unique ID
    createdAt: new Date().toISOString(), // Set current date
  };

  projects = [newProject, ...projects]; // Add to the beginning of the array
  saveProjects(projects); // Save to localStorage
  return newProject;
};

// Get a project by ID
export const getProjectById = (id: string): Project | undefined => {
  return getAllProjects().find((project) => project.id === id);
};

// Update a project
export const updateProject = (
  id: string,
  updatedProject: Partial<Project>
): Project | null => {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return null;

  projects[index] = { ...projects[index], ...updatedProject };
  saveProjects(projects); // Save to localStorage
  return projects[index];
};

// Delete a project
export const deleteProject = (id: string): boolean => {
  const initialLength = projects.length;
  projects = projects.filter((project) => project.id !== id);

  if (projects.length < initialLength) {
    saveProjects(projects); // Save to localStorage
    return true;
  }

  return false;
};
