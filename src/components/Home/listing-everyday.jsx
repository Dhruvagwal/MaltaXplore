import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const ListingEveryDay = ({ className }) => {
    return (
      <Card className={`rounded-full md:w-96 h-16 ${className}`}>
        <CardContent className="flex items-center justify-center gap-4">
            <Avatar className="">
              <AvatarImage
                src={`https://picsum.photos/600/400?random=${0}`}
                alt={`Random image`}
                className="rounded-full w-12 h-12"
              />
              <AvatarFallback className="bg-gray-200 text-gray-700">
                Avatar
              </AvatarFallback>
            </Avatar>
  
          <div>
            <p className="font-semibold text-base leading-tight">
              200+ New <br />
              Listings Everyday!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };
  