import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const handle = formData.get("handle");
    const desc = formData.get("desc");
    const links = JSON.parse(formData.get("links"));
    const pic = formData.get("pic");

    if (!pic || typeof pic.arrayBuffer !== "function") {
      return NextResponse.json({ success: false, message: "Image is missing or invalid." });
    }

    // Convert image to buffer
    const bytes = await pic.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "linktree" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const picUrl = uploadResult.secure_url;

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("links");

    await collection.insertOne({
      handle,
      desc,
      links,
      pic: picUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Linktree created!", pic: picUrl });
  } catch (error) {
    console.error("Upload or DB error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong." });
  }
}
