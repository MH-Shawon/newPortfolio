import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

// Get ImgBB API key from environment variables
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

// Function to fix ImgBB URL if it has typos
const fixImgBBUrl = (url) => {
  // Fix common typos in ImgBB URLs
  if (url.includes("i.ibb.co.com")) {
    return url.replace("i.ibb.co.com", "i.ibb.co");
  }
  if (url.includes("ibb.co.com")) {
    return url.replace("ibb.co.com", "ibb.co");
  }
  return url;
};

export async function POST(request) {
  try {
    // Check if API key is configured
    if (!IMGBB_API_KEY) {
      return NextResponse.json(
        { error: "ImgBB API key is not configured" },
        { status: 500 }
      );
    }

    // Get the form data from the request
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Convert the file to buffer
    const buffer = Buffer.from(await image.arrayBuffer());

    // Create a new form data for the ImgBB API
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", buffer, {
      filename: image.name,
      contentType: image.type,
    });

    // Upload the image to ImgBB
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      imgbbFormData,
      {
        headers: imgbbFormData.getHeaders(),
      }
    );

    // Check if the upload was successful
    if (response.data && response.data.data && response.data.data.url) {
      // Fix the URL if needed
      const fixedUrl = fixImgBBUrl(response.data.data.url);

      return NextResponse.json({
        success: true,
        url: fixedUrl,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to upload image to ImgBB" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
