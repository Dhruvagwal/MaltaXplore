import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { DotFilledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { tourListing } from "@/data/link";

export const ServiceCard = ({ index, data, className = "" }) => {
  return (
    <Card className={className}>
      <div className="relative">
        <Image
          height={500}
          width={400}
          className="rounded-t-xl w-full"
          src={`https://picsum.photos/500/400?random=${index}`}
        />
        <div className="backdrop-blur-sm bg-white bottom-4 right-4 rounded-full p-2 px-4 absolute z-10 flex items-center text-xs">
          <DotFilledIcon height={20} width={20} className="text-red-400" />{" "}
          {data.title} & More Info
        </div>
      </div>
      <CardContent className="p-8">
        <div className="flex justify-between items-center">
          <p className="text-base w-[50%] text-ellipsis font-semibold">
            {data.title}
          </p>
          <span className="">
            Starting at:{" "}
            <span className="text-primary font-bold text-base">
              ${data.price}
            </span>
          </span>
        </div>
        <br />
        <p className="text-muted-foreground text-ellipsis text-sm">
          {data.description}
        </p>
        <br />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
          <Button asChild className="w-full md:w-1/2">
            <Link href={`${tourListing.replace("[id]", data.id)}`}>
              Book Now
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-1/2 gap-1  text-muted-foreground"
          >
            <PlusIcon />
            Add to My Itenary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
