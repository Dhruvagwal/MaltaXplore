import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";


export const ServiceCard = ({ index, data, className="" }) => {
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
                <span className="text-primary font-bold text-base">$500</span>
              </span>
            </div>
            <br />
            <p className="text-muted-foreground text-ellipsis text-sm">
              {data.description}
            </p>
            <br />
            <Button className="w-full">Book Now</Button>
          </CardContent>
        </Card>
    );
  };