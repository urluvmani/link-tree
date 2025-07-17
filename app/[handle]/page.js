import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
export default async function Page({ params }) {
  const { handle } = await params;

  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const item = await collection.findOne({ handle });


  if (!item) {
    return notFound();
  }

  return (<>
    
    <div className="w-full onediv h-screen py-10 flex  items-center bg-gray-800  justify-center ">
       <div className="absolute secdiv inset-2 blur z-0">
    <img src={item.pic} alt="Add ure pic" className="w-full h-full object-cover" />
  </div>
      {item && (
        <div className="photo relative md:z-10 md:shadow-2xl flex flex-col justify-start items-center py-10 bg-gray-800  w-lg h-screen  ">
          <img
            className=" rounded-full imagepic text-2xl"
            width={200}
            src={item.pic}
            alt="Image Not found"
          />
          <span className="font-bold handle text-xl text-center text-white ">@{item.handle}</span>
          <span className="shadow font-light desc text-white my-2 w-1/2 max-h-16 overflow-hidden text-center">
            {item.desc}
          </span>
          <div className="links flex w-6xl flex-col justify-center  items-center">
            {item.links.map((item, index) => {
              return (
                <div
                  className="bg-amber-50 overflow-hidden linkdiv w-1/3 shadow-2xl shadow-yellow-800 font-bold uppercase h-14 my-1 rounded-2xl px-4 py-2 flex items-center justify-center"
                  key={index}
                >
                  <Link href={item.link} target="_blank" key={index}>
                    
                    {item.linktext}
                  </Link>
                </div>
              );
            })}
          </div>
          <Link className="mt-20 link px-4 py-2 bg-slate-700 text-white rounded-md font-semibold" href={"/"}>Go to Web</Link>
        </div>
      )}
    </div>

    </>
  );
}
