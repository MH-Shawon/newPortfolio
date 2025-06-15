// Projects data management

// Initial projects data
const initialProjects = [
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
      "Implementing a responsive design that works across all devices while maintaining performance was challenging. Additionally, integrating the payment system securely required careful attention to detail.",
    solutions:
      "Used Tailwind CSS for responsive design, implemented code splitting and lazy loading for performance, and followed Stripe's best practices for secure payment integration.",
    createdAt: "2023-06-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A productivity app for managing tasks and projects with team collaboration features.",
    image: "/assets/projects/Screenshot from 2025-03-13 01-39-10.png",
    tags: ["React", "Firebase", "Material UI"],
    demoLink: "#",
    codeLink: "#",
    featured: false,
    createdAt: "2023-04-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "A weather application that provides real-time forecasts and historical weather data.",
    image: "/assets/projects/Screenshot from 2025-03-13 01-39-25.png",
    tags: ["JavaScript", "OpenWeather API", "Chart.js"],
    demoLink: "#",
    codeLink: "#",
    featured: false,
    createdAt: "2023-02-10T00:00:00Z",
  },
  {
    id: "4",
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my projects and skills.",
    longDescription:
      "This portfolio website was built to showcase my work and skills as a web developer. It features a clean, modern design with dark mode support, responsive layouts, and smooth animations.",
    image: "/assets/projects/Screenshot from 2025-03-13 01-39-40.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demoLink: "#",
    codeLink: "#",
    featured: true,
    challenges:
      "Creating a design that effectively showcases my work while maintaining fast load times and accessibility standards.",
    solutions:
      "Implemented a minimalist design with optimized images, used Next.js for static generation, and ensured all components meet WCAG accessibility guidelines.",
    createdAt: "2023-01-05T00:00:00Z",
  },
];

// Store projects in localStorage
let projects = [...initialProjects];

// Load projects from localStorage if available
if (typeof window !== "undefined") {
  const savedProjects = localStorage.getItem("portfolio_projects");
  if (savedProjects) {
    try {
      projects = JSON.parse(savedProjects);
    } catch (error) {
      projects = [...initialProjects];
    }
  }
}

// Get all projects
export function getAllProjects() {
  return [...projects].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Get featured projects
export function getFeaturedProjects() {
  return [...projects]
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Get project by ID
export function getProjectById(id) {
  return projects.find((project) => project.id === id) || null;
}

// Add new project
export function addProject(project) {
  const newProject = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  projects = [newProject, ...projects];

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }

  return newProject;
}

// Update project
export function updateProject(id, updatedProject) {
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    throw new Error(`Project with ID ${id} not found`);
  }

  projects[index] = {
    ...projects[index],
    ...updatedProject,
  };

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }

  return projects[index];
}

// Delete project
export function deleteProject(id) {
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    throw new Error(`Project with ID ${id} not found`);
  }

  projects = projects.filter((project) => project.id !== id);

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }

  return true;
}
