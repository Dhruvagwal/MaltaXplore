import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const HappyCustomers = ({ className }) => {
    return (
      <Card className={`rounded-full md:w-96 h-24 ${className}`}>
        <CardContent className="flex items-center justify-center gap-4">
          {/* Profile Images */}
          <div className="flex -space-x-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Avatar key={index} className="w-10 h-10">
                <AvatarImage
                  src={`https://picsum.photos/100/100?random=${index}`}
                  alt={`Profile ${index + 1}`}
                  className="rounded-full border-2 border-white"
                />
                <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                  {`+${index}`}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
  
          {/* Text Content */}
          <div>
            <p className="font-semibold text-base leading-tight">
              72k+ Happy <br />
              Customers
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };