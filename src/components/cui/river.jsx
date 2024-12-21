import Image from "next/image";
import { Button } from "../ui/button";

export const River = () => {
    return (
      <div className="px-32 relative">
        <Image
          className="rounded-lg w-full"
          width={1000}
          height={1000}
          src="/images/river.png"
        />
        <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full">
          <div className="w-[50%] gap-6 flex items-center justify-center flex-col text-center ">
            <p className="text-5xl leading-[1.5] font-bold w-full h-full text-white">
              Ready to Experience Malta Like Never Before?
            </p>
            <p className="text-white">
              Start exploring now and book the best tours, activities, and dining
              experiences on the island.
            </p>
            <div className="flex gap-8">
              <Button className="p-8" variant="secondary" size="lg">
                Explore
              </Button>
              <Button className="p-8" size="lg">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };