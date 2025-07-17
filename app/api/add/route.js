import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const doc = await collection.findOne({ handle: body.handle });
  if (doc) {
    return NextResponse.json({
      error: true,
      success: false,
      message: "Handle already exist",
    });
  }

  await collection.insertOne({ ...body });
  // Do something with the body
  return NextResponse.json({
    message: "Your Handle Generated",
    success: true,
    error: false,
  });
}
