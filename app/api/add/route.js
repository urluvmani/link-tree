

import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import clientPromise from "@/lib/mongodb";

import path from "path";
import { mkdir } from "fs/promises";

export async function POST(req) {
  const formData = await req.formData();

  const handle = formData.get("handle");
  const desc = formData.get("desc");
  const links = JSON.parse(formData.get("links"));
  const pic = formData.get("pic"); // File object

  if (!pic || typeof pic.arrayBuffer !== "function") {
    return NextResponse.json({ success: false, message: "Image is missing or invalid." });
  }

  // Save image to public/uploads/
  const bytes = await pic.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}_${pic.name}`;
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  const picUrl = `/uploads/${filename}`;

  // Now save `handle`, `desc`, `links`, `picUrl` to your database
  // Example:
  // await db.collection("users").insertOne({ handle, desc, links, pic: picUrl });
  const client = await clientPromise;
const db = client.db("linktree"); // replace with your DB name
const collection = db.collection("links"); // or whatever collection you want

await collection.insertOne({
  handle,
  desc,
  links,
  pic: picUrl,
  createdAt: new Date()
});


  return NextResponse.json({ success: true, message: "Linktree created!", pic: picUrl });
}
