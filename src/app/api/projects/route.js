import { NextResponse } from "next/server";
import { readProjects, writeProjects, generateId } from "@/lib/db";

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = await readProjects();

    // Sort by createdAt descending (newest first)
    projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const newProject = {
      _id: generateId(),
      title: body.title,
      description: body.description,
      longDescription: body.longDescription || "",
      image: body.image || "",
      tags: body.tags || [],
      demoLink: body.demoLink || "",
      codeLink: body.codeLink || "",
      featured: body.featured || false,
      challenges: body.challenges || "",
      solutions: body.solutions || "",
      createdAt: now,
      updatedAt: now,
    };

    const projects = await readProjects();
    projects.push(newProject);
    await writeProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    );
  }
}
