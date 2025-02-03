import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { realTimeEvents } from "@/data/link";
import EventCard from "@/components/cui/event";
import { useEvents } from "@/features/getEvents";

const Events = () => {
  const { data: events, isLoading, isError, error } = useEvents();
  console.log(events);
  return (
    <div className="px-8 md:px-20 my-48 relative">
      <div className="text-center">
        <p className="text-4xl md:text-5xl font-bold">
          What’s Happening in Malta Today?
        </p>
        <br />
        <p className="text-xl md:text-2xl text-muted-foreground">
          Stay up to date with all the daily events, festivals, and activities
          happening across the island.
        </p>
      </div>
      <div className="flex flex-col items-center gap-16 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((item, index) => (
            <EventCard
              key={index}
              title={item.title}
              description={item.description}
              start_time={item.start_time}
              end_time={item.end_time}
              date={item.date}
              url={item.image}
              location={item.location}
              redirect_url={item.redirect_url}
              more_info_url={item.more_info}
            />
          ))}
        </div>
        <Button asChild className="p-8 " size="lg">
          <Link href={realTimeEvents}>See All Events</Link>
        </Button>
      </div>
    </div>
  );
};

export default Events;
