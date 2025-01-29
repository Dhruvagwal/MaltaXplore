import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/zoom_carousel";
import { ServiceCard } from "@/components/cui/ServiceCard";
import { useServicesState } from "@/context/servicesContext";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";

const TopPicks = () => {
  const { services, isLoading } = useServicesState();
  const { user } = useAuthState();
  const [likes, setLikes] = useState();
  useEffect(() => {
    const fetchLikes = async () => {
      const { data: likes, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user?.id);
      setLikes(likes);
    };
    fetchLikes();
  }, [user]);

  return (
    <div className="my-32 px-9 md:px-32">
      <div className="flex flex-col md:flex-row lg:gap-64 justify-between items-center">
        {isLoading ? (
          <div className="flex flex-col gap-4 w-1/2">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        ) : (
          <p className="text-4xl md:text-5xl font-bold">
            Top Picks for Your Maltese Adventure
          </p>
        )}
        {isLoading ? (
          <div className="flex flex-col gap-4 w-1/2 ">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>
        ) : (
          <p className="text-xl text-left md:text-right">
            "Start with our most popular experiences and tours perfect for
            getting the most out of Malta."
          </p>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-16"
      >
        <CarouselContent className="max-md:mr-10">
          {services?.map((item, index) => (
            <CarouselItem index={index} className="md:basis-1/2 lg:basis-1/3">
              <ServiceCard data={item} index={index} loading={isLoading} likes={likes} id={item?.id}/>
            </CarouselItem>
          ))}

          <CarouselItem
            index={services?.length}
            className="md:basis-1/2 lg:basis-1/3"
          />
          <CarouselItem
            index={services?.length + 1}
            className="md:basis-1/2 lg:basis-1/3"
          />
        </CarouselContent>
        <CarouselProgress length={services?.length} />
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TopPicks;
