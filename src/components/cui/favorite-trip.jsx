import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

function FavoriteTripComponent({ url, duration, title, price }) {
  return (
    <Card className="border rounded-2xl bg-zinc-50">
      <Image
        width={500}
        height={500}
        className="w-full rounded-t-2xl h-64 object-cover"
        src={url}
        alt={title}
      />
      <div className="flex flex-col my-4 gap-2 px-6">
        <div className="flex justify-between font-semibold text-sm gap-8">
          {/* Title with isolated hover */}
          <div className="relative group">
            <p className="text-lg font-bold line-clamp-1">
              {title}
            </p>
            {/* Full title on hover */}
            <span className="absolute top-full left-0 z-10 hidden w-max max-w-xs p-2 bg-white shadow-lg rounded-md group-hover:block">
              {title}
            </span>
          </div>
          <p className="text-lg font-semibold">${price}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5"/>
          <p className="font-medium text-base">{duration}</p>
        </div>
      </div>
    </Card>
  );
}

export default FavoriteTripComponent;
