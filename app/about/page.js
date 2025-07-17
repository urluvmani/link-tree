"use client";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
    <Navbar/>
      
    <main className="min-h-screen px-6 py-32 bg-gray-400 text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About Linktree Clone</h1>
        <p className="text-lg mb-6 text-gray-700">
          This project is a modern and minimal Linktree-style platform built using{" "}
          <strong>Next.js 13 App Router</strong>. It allows users to create a personalized landing page with a unique handle, add multiple links, and share their social presence through a single bio link.
        </p>

        <div className="text-left space-y-4">
          <h2 className="text-2xl font-semibold">🚀 Features:</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li>Create a custom handle (e.g., <code>/yourname</code>)</li>
            <li>Add multiple links with titles</li>
            <li>Custom profile picture support</li>
            <li>Clean, responsive UI using Tailwind CSS</li>
            <li>Built with Next.js App Router for better performance</li>
            <li>MongoDB integration to store user data</li>
          </ul>

          <h2 className="text-2xl font-semibold pt-4">🔧 Tech Stack:</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li>Next.js 13 (App Router)</li>
            <li>React & Tailwind CSS</li>
            <li>MongoDB with Mongoose or native driver</li>
            <li>Vercel for deployment</li>
          </ul>

          <h2 className="text-2xl font-semibold pt-4">💡 Purpose:</h2>
          <p className="text-gray-700">
            This project was built to practice full-stack development using modern tools and frameworks.
            It mimics the core functionality of Linktree, allowing creators to consolidate their presence into a single smart link.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-green-600 hover:underline font-semibold">
            ← Back to Home
          </Link>
      </div></div>
    </main></>
  );
}
