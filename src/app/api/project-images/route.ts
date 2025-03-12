import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Define the directory path
    const projectsDir = path.join(process.cwd(), "public/assets/projects");

    // Read the directory
    const files = await fs.readdir(projectsDir);

    // Filter for image files and format the paths
    const imagePaths = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/assets/projects/${file}`);

    // Return the image paths as JSON
    return NextResponse.json({ images: imagePaths });
  } catch (error) {
    console.error("Error reading project images:", error);

    // Return default images if there's an error
    return NextResponse.json(
      {
        images: [
          "/assets/projects/Screenshot from 2025-03-13 01-38-53.png",
          "/assets/projects/Screenshot from 2025-03-13 01-40-31.png",
        ],
        error: "Failed to read project images directory",
      },
      { status: 500 }
    );
  }
}
