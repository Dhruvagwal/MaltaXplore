import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const ListingEveryDay = ({ className, services }) => {
  console.log(services);
  return (
    <Card className={`rounded-full md:w-96 h-16 ${className}`}>
      <CardContent className="flex items-center justify-center gap-4 p-2">
        <Avatar className="">
          <AvatarImage
            src={
              JSON.parse(services?.[2]?.images?.[0] ?? "{}")?.url ??
              `https://picsum.photos/500/400?random=${1}`
            }
            alt={`Random image`}
            className="rounded-full w-12 h-12"
          />
          <AvatarFallback className="bg-gray-200 text-gray-700">
            Avatar
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold text-base leading-tight">
            {services?.length} New <br />
            Services Listed !
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
