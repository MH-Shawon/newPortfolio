import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check if the file is an image
    if (!file.type?.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name?.split(".")?.pop()?.toLowerCase() || "jpg";

    // Generate a unique filename
    const fileName = `profile-${uuidv4()}.${fileExtension}`;

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path where the file will be saved
    const profileDir = path.join(process.cwd(), "public/assets/profile");
    const filePath = path.join(profileDir, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }

    // Write the file to disk
    fs.writeFileSync(filePath, buffer);

    // Return the URL to the saved file
    return NextResponse.json({
      success: true,
      url: `/assets/profile/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload profile image" },
      { status: 500 }
    );
  }
}
