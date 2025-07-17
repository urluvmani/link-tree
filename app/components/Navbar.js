import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (<> 
    <nav className="flex w-[80vw] absolute top-11 justify-between bg-white rounded-full right-[10vw] h-20 px-7 items-center ">
      <Link  className="flex gap-18  w-1/2" href={"/"}> <div className="flex gap-18  w-1/2">
       <img className="hover:cursor-pointer" width={110}
          src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
          alt=""
        />
      
      </div></Link>
      <div className="btns flex items-center  gap-2">
        <ul className="flex gap-5 pr-5">
        <Link href={"/"} className="hover:cursor-pointer font-semibold hover:bg-gray-700 hover:text-white text-center rounded-2xl px-2 py-1  min-w-15">Home</Link>
        <Link href={"/about"} className="hover:cursor-pointer font-semibold hover:bg-gray-700 hover:text-white text-center rounded-2xl px-2 py-1  min-w-15">About</Link>
        <Link target="_blank" href={"https://github.com/urluvmani"} className="hover:cursor-pointer font-semibold hover:bg-gray-700 hover:text-white text-center rounded-2xl px-2 py-1  min-w-15">My Git</Link>
      </ul>
        <button className="bg-gray-100 hover:bg-gray-200 hover:scale-103 px-5 font-semibold rounded-md py-4">Log in</button>
        <button className="bg-slate-800 text-white px-5 hover:scale-103 font-semibold rounded-full py-4">Sign up free</button>
      </div>
    </nav>
 </> );
};

export default Navbar;
