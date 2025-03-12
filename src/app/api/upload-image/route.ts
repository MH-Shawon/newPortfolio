import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

// Get ImgBB API key from environment variables
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

// Function to fix ImgBB URL if it has typos
const fixImgBBUrl = (url: string): string => {
  // Fix common typos in ImgBB URLs
  if (url.includes("i.ibb.co.com")) {
    return url.replace("i.ibb.co.com", "i.ibb.co");
  }
  if (url.includes("ibb.co.com")) {
    return url.replace("ibb.co.com", "ibb.co");
  }
  return url;
};

export async function POST(request: NextRequest) {
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
    const image = formData.get("image") as File;

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

    console.log(
      "Uploading to ImgBB with API key:",
      IMGBB_API_KEY.substring(0, 5) + "..."
    );

    // Upload to ImgBB
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      imgbbFormData,
      {
        headers: {
          ...imgbbFormData.getHeaders(),
        },
        timeout: 30000, // 30 seconds timeout
      }
    );

    console.log("ImgBB API response:", JSON.stringify(response.data, null, 2));

    // Check if the response contains the expected data
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from ImgBB API");
    }

    // Make a deep copy of the response data to avoid modifying the original
    const imgbbData = JSON.parse(JSON.stringify(response.data.data));

    // Fix all URLs in the response data
    if (imgbbData.url) imgbbData.url = fixImgBBUrl(imgbbData.url);
    if (imgbbData.display_url)
      imgbbData.display_url = fixImgBBUrl(imgbbData.display_url);
    if (imgbbData.delete_url)
      imgbbData.delete_url = fixImgBBUrl(imgbbData.delete_url);
    if (imgbbData.url_viewer)
      imgbbData.url_viewer = fixImgBBUrl(imgbbData.url_viewer);

    // Fix nested image URLs
    if (imgbbData.image && imgbbData.image.url) {
      imgbbData.image.url = fixImgBBUrl(imgbbData.image.url);
    }

    // Fix thumbnail URLs
    if (imgbbData.thumb && imgbbData.thumb.url) {
      imgbbData.thumb.url = fixImgBBUrl(imgbbData.thumb.url);
    }

    // Fix medium URLs
    if (imgbbData.medium && imgbbData.medium.url) {
      imgbbData.medium.url = fixImgBBUrl(imgbbData.medium.url);
    }

    // Extract the fixed URLs for convenience
    const url = imgbbData.url || "";
    const display_url = imgbbData.display_url || "";
    const delete_url = imgbbData.delete_url || "";
    const thumbnail = imgbbData.thumb?.url;
    const medium = imgbbData.medium?.url;

    // Log the fixed URLs
    console.log("Fixed image URL:", url);
    console.log("Fixed display URL:", display_url);

    // Return all possible image URLs from ImgBB to ensure the client can use the most appropriate one
    return NextResponse.json({
      success: true,
      url,
      display_url,
      delete_url,
      thumbnail,
      medium,
      // Include the full image object for more options
      image: imgbbData.image,
      // Include all fixed data
      data: imgbbData,
    });
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
