"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const params = useSearchParams();
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(params.get("handle"));
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");
  const router = useRouter();

  const handleChange = (index, link, linktext) => {
    setlinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  };

  const addLink = () => {
    setlinks(links.concat({ link: "", linktext: "" }));
  };

  //   const submitlinks = async (link, linktext, handle) => {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     const raw = JSON.stringify({
  //       links: links,
  //       handle: handle,
  //       pic:pic
  //     });

  //     console.log(raw)
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     let r = await fetch("http://localhost:3000/api/add", requestOptions);
  //     let res = await r.json();
  //     if (res.success) {
  //   toast.success(res.message);
  //   setlinks([{ link: "", linktext: "" }]); // reset to one empty input
  //   setpic("");
  //   sethandle("");
  // } else {
  //   toast.error(res.message);
  // }

  //   };
  const submitlinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links,
      handle,
      pic,
      desc,
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let r = await fetch("http://localhost:3000/api/add", requestOptions);
    let res = await r.json();

    if (res.success) {
      toast.success(res.message);

      setlinks([{ link: "", linktext: "" }]);
      setpic("");
      setdesc("");
      sethandle("");
      router.push(`/${handle}`);
    } else {
      toast.error(res.message);
    }
  };

  const notify = () => toast("Wow so easy !");
  return (
    <>
      <Navbar />
      <div className="w-full h-screen text-slate-800  bg-green-300 ">
        <div className="grid grid-row-2  md:grid-cols-2 w-full min-h-screen bg-[#225ac0]">
          <div className="1 flex bg-amber-300 justify-center items-start px-10 md:px-20 pt-40 md:pt-30 flex-col ">
            <h1 className="font-bold text-xl  md:text-3xl">Create your linktree </h1>
            <p className="font-bold pb-1">Step 1: Claim your Hanlde *</p>
            <input
              value={handle}
              onChange={(e) => {
                sethandle(e.target.value);
              }}
              className="bg-white px-4 py-1 rounded-full "
              type="text"
              placeholder="Choose a Handle"
            />
            <p className="font-bold pb-1 pt-3">Step 2: Add links *</p>
            {links &&
              links.map((item, index) => {
                return (
                  <div key={index} className=" flex mt-2 justify-start gap-2">
                    <input
                      value={item.link || ""}
                      onChange={(e) => {
                        handleChange(index, e.target.value, item.linktext);
                      }}
                      className="bg-white w-1/3 px-4 py-1 rounded-full "
                      type="text"
                      placeholder="Enter link  "
                    />
                    <input
                      value={item.linktext || ""}
                      onChange={(e) => {
                        handleChange(index, item.link, e.target.value);
                      }}
                      className="bg-white w-1/4 px-4 py-1 rounded-full "
                      type="text"
                      placeholder="Enter link text "
                    />
                  </div>
                );
              })}
            <button
              onClick={() => {
                addLink();
              }}
              className="bg-slate-800 mt-3 text-white px-2 py-1 rounded-full"
            >
              + Add Link
            </button>
            <p className="font-bold pb-1 pt-3">Step 3: Add Picture * and Bio</p>
            <input
              value={pic}
              onChange={(e) => {
                setpic(e.target.value);
              }}
              className="bg-white px-4 w-1/2 py-1 rounded-full "
              type="text"
              placeholder="Enter your picture *"
            />
            <input
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              className="bg-white px-4 w-1/2 py-1 my-2 rounded-full "
              type="text"
              placeholder="Enter your Bio (optional)"
            />
            <button
              disabled={pic == "" || handle == "" || links[0].linktext == ""}
              onClick={() => {
                submitlinks();
              }}
              className="disabled:bg-gray-500 bg-slate-800 mb-5 text-white px-2  py-1 mt-2 rounded-full"
            >
              Create your linktree
            </button>
          </div>
          <div className="2 min-h-screen bg-[#225ac0]">
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
