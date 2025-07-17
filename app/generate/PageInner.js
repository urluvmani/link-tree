"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Page = () => {
  const params = useSearchParams();
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(params.get("handle") || "");
  // const [pic, setpic] = useState("");
  const [pic, setpic] = useState(null); // File object
const [previewUrl, setPreviewUrl] = useState(""); // for preview

  const [desc, setdesc] = useState("");
  const router = useRouter();

  const handleChange = (index, link, linktext) => {
    setlinks((initialLinks) =>
      initialLinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  const addLink = () => {
    setlinks([...links, { link: "", linktext: "" }]);
  };

  // const submitlinks = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const raw = JSON.stringify({ links, handle, pic, desc });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //   };

  //   let r = await fetch("/api/add", requestOptions);
  //   let res = await r.json();

  //   if (res.success) {
  //     toast.success(res.message);
  //     setlinks([{ link: "", linktext: "" }]);
  //     setpic("");
  //     setdesc("");
  //     sethandle("");
  //     router.push(`/${handle}`);
  //   } else {
  //     toast.error(res.message);
  //   }
  // };
const submitlinks = async () => {
  const formData = new FormData();
  formData.append("handle", handle);
  formData.append("desc", desc);
  formData.append("pic", pic);
  formData.append("links", JSON.stringify(links)); // convert array to string

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const r = await fetch("/api/add", requestOptions);
    const res = await r.json();

    if (res.success) {
      toast.success(res.message);
      setlinks([{ link: "", linktext: "" }]);
      setpic(null);
      setPreviewUrl("");
      setdesc("");
      sethandle("");
      router.push(`/${handle}`);
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }
};

  return (
    <>
      <Navbar />
      <div className="w-full h-screen text-slate-800 bg-green-300">
        <div className="grid grid-row-2 md:grid-cols-2 w-full min-h-screen bg-[#225ac0]">
          <div className="flex bg-amber-300 justify-center items-start px-10 md:px-20 pt-40 md:pt-30 flex-col">
            <h1 className="font-bold text-xl md:text-3xl">Create your linktree</h1>
            <p className="font-bold pb-1">Step 1: Claim your Handle *</p>
            <input
              value={handle}
              onChange={(e) => sethandle(e.target.value)}
              className="bg-white px-4 py-1 rounded-full"
              type="text"
              placeholder="Choose a Handle"
            />
            <p className="font-bold pb-1 pt-3">Step 2: Add links *</p>
            {links.map((item, index) => (
              <div key={index} className="flex mt-2 justify-start gap-2">
                <input
                  value={item.link || ""}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="bg-white w-1/3 px-4 py-1 rounded-full"
                  type="text"
                  placeholder="Enter link"
                />
                <input
                  value={item.linktext || ""}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="bg-white w-1/4 px-4 py-1 rounded-full"
                  type="text"
                  placeholder="Enter link text"
                />
              </div>
            ))}
            <button
              onClick={addLink}
              className="bg-slate-800 mt-3 text-white px-2 py-1 rounded-full"
            >
              + Add Link
            </button>
            <p className="font-bold pb-1 pt-3">Step 3: Add Picture * and Bio</p>
            {/* <input
              value={pic}
              onChange={(e) => setpic(e.target.value)}
              className="bg-white px-4 w-1/2 py-1 rounded-full"
              type="text"
              placeholder="Enter your picture *"
            /> */}
            <input
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setpic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }}
  accept="image/*"
  className="bg-white px-4 w-1/2 py-1 rounded-full"
  type="file"
/>

{previewUrl && (
  <img
    src={previewUrl}
    alt="Preview"
    className="w-32 h-32 mt-2 rounded-full object-cover border"
  />
)}

            <input
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              className="bg-white px-4 w-1/2 py-1 my-2 rounded-full"
              type="text"
              placeholder="Enter your Bio (optional)"
            />
            <button
              disabled={!pic || !handle || !links[0].linktext}
              onClick={submitlinks}
              className="disabled:bg-gray-500 bg-slate-800 mb-5 text-white px-2 py-1 mt-2 rounded-full"
            >
              Create your linktree
            </button>
          </div>
          <div className="min-h-screen bg-[#225ac0]">
            <img
              src="/img.webp"
              className="w-full min-h-screen h-screen object-cover"
              alt=""
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Page;
