import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { maltapass } from "@/data/link";

const MaltaPass = () => {
  return (
    <div className="my-48 relative px-8 md:px-0">
      <Image
        src="/images/maltapass.svg"
        className="w-full hidden md:block"
        width={1000}
        height={1000}
      />
      <div className="md:absolute top-0 md:top-20 right-0 p-10 md:p-32 w-[100%] md:w-[50%] text-white max-md:bg-[#E03737] max-md:rounded-md">
        <p className="text-3xl md:text-5xl leading-[1.5] font-bold">
          Maltapass – Explore <br />
          More, Pay Less
        </p>
        <br />
        <p className="text-2xl md:text-3xl">
          Introducing Maltapass – Exclusive Discounts for Your Stay
        </p>
        <br />
        <p className="text-lg md:text-xl">
          Unlock free discounts on top attractions, dining, and more with
          Maltapass. Available for 1-day or 1-week, it’s the perfect way to save
          while you explore.
        </p>
        <br />
        <Button variant="secondary" asChild className="p-8">
          <Link href={maltapass}>Get My Maltapass</Link>
        </Button>
      </div>
    </div>
  );
};

export default MaltaPass;
