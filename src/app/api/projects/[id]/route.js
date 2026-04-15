import { NextResponse } from "next/server";
import { readProjects, writeProjects } from "@/lib/db";

// GET /api/projects/[id] - Get a single project
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const projects = await readProjects();
    const project = projects.find((p) => p._id === id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Error fetching project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const projects = await readProjects();
    const index = projects.findIndex((p) => p._id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Update the project, preserving _id and createdAt
    projects[index] = {
      ...projects[index],
      ...body,
      _id: projects[index]._id,
      createdAt: projects[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    await writeProjects(projects);

    return NextResponse.json(projects[index]);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const projects = await readProjects();
    const index = projects.findIndex((p) => p._id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    projects.splice(index, 1);
    await writeProjects(projects);

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}
