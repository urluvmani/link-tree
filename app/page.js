"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [text, settext] = useState("");

  const createtree = () => {
    if (text.trim() !== "") {
      router.push(`/generate?handle=${text}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#254f1a] w-full home h-screen">
        <div className="grid h-full grid-cols-1 pt-18 md:grid-cols-2">
          {/* Left Side */}
          <div className="text-[#d2e823] homemain w-full px-8 md:pl-24 py-20 flex flex-col justify-center">
            <h1 className="text-6xl h1 md:text-7xl hover:text-yellow-200 cursor-pointer font-bold">
              Everything
            </h1>
            <h1 className="text-6xl h1 md:text-7xl hover:text-yellow-200 cursor-pointer font-bold">
              you are. In
            </h1>
            <h1 className="text-6xl h1 md:text-7xl hover:text-yellow-200 cursor-pointer font-bold">
              one, simple
            </h1>
            <h1 className="mb-4 h1 text-6xl md:text-7xl hover:text-yellow-200 cursor-pointer font-bold">
              link in bio.
            </h1>
            <p className=" para  h1text-white text-lg font-semibold max-w-xl">
              Join 70M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </p>

            {/* Input + Button */}
            <div className="flex inpbtn flex-col sm:flex-row gap-3 mt-6">
              <input
                value={text}
                onChange={(e) => settext(e.target.value)}
                className="bg-white input font-semibold rounded-md px-6 py-3 text-black focus:outline-green-700 w-full sm:w-auto"
                type="text"
                placeholder="Enter your handle"
              />
              <button
                onClick={createtree}
                disabled={text.trim() === ""}
                className="bg-pink-200 btn hover:bg-pink-300 disabled:bg-gray-400 transition-transform hover:scale-105 font-semibold rounded-full px-6 py-3 text-black"
              >
                Claim your Linktree
              </button>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="hidden img md:flex justify-center items-center">
            <Image
              src="/ss.png"
              width={450}
              height={400}
              alt="Linktree Preview"
              className="ml-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
