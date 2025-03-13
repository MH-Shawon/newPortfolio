import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Get the absolute path to the public/assets/projects directory
    const projectsDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "projects"
    );

    // Read the directory
    const files = fs.readdirSync(projectsDir);

    // Filter for image files and create full paths
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/assets/projects/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading project images:", error);
    return NextResponse.json(
      { error: "Failed to load project images" },
      { status: 500 }
    );
  }
}
