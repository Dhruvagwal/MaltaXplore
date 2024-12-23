import Image from "next/image";
import React from "react";

function Banner({ url, children }) {
  return (
    <div className="mx-32 relative rounded-xl overflow-clip group bg-black">
      <Image
        width={500}
        height={200}
        className="w-full h-96 object-cover group-hover:scale-105 transition-all ease-in-out opacity-35"
        src={url}
      />
      <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Banner;
