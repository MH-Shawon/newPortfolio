import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const profileDir = path.join(process.cwd(), "public/assets/profile");

    // Ensure the directory exists
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
      return NextResponse.json({ images: [] });
    }

    // Read all files in the directory
    const files = fs.readdirSync(profileDir);

    // Filter for image files and create URLs
    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext);
      })
      .map((file) => `/assets/profile/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error("Error listing profile images:", error);
    return NextResponse.json(
      { error: "Failed to list profile images" },
      { status: 500 }
    );
  }
}
