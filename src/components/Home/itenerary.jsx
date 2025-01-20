import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Iteneray = () => {
  return (
    <div className="my-48 px-8 md:px-32 xl:px-20">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-64 justify-between max-md:px-1">
        <p className="text-5xl font-bold">Create Your Own Perfect Itinerary</p>
        <p className="text-xl md:text-right">
          Customize your trip based on what you love. Whether you’re an
          adventure-seeker, a foodie, or a culture enthusiast, we’ll help you
          craft the perfect experience.
        </p>
      </div>
      <div className="relative mt-16">
        <Image
          src="/images/iteneray_back.svg"
          className="w-full max-md:hidden"
          width={2000}
          height={2000}
        />

        <div className="md:absolute top-0 left-0 w-full p-10 md:p-16 md:pr-0 max-md:bg-[#E03737] max-md:rounded-md">
          <div className="flex flex-col md:flex-row w-full justify-between">
            <p className="text-3xl md:text-5xl shrink-0 font-semibold leading-[1.5] text-white">
              Based on your preferences,
              <br /> we’ll suggest experiences you’ll <br />
              love, from sightseeing tours <br />
              to gourmet restaurants.
            </p>
            <p className="text-4xl md:text-6xl md:mt-[-2rem] shrink-0 md:text-right font-bold leading-[1.5]">
              Don’t know <br />
              where to start?{" "}
            </p>
          </div>
          <Button
            variant="secondary"
            className="p-8 mt-12 md:mt-40 md:px-16 md:ml-4 max-md:w-full"
            size="lg"
          >
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Iteneray;
