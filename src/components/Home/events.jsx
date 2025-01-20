import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { realTimeEvents } from "@/data/link";
import EventCard from "@/components/cui/event";

const Events = () => {
  const events = [
    {
      location: "Malta Capital",
      time: "3:00Pm - 5:00Pm",
      date: "24 Nov, 2024 - 25 Nov, 2024",
      title: "Valletta Food Festival",
      description:
        "Join us for a week-long food festival at the Malta Capital's iconic Old St. Stephen Hotel.",
      url: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      location: "Gozo Island",
      time: "10:00Am - 4:00Pm",
      date: "10 Dec, 2024",
      title: "Gozo Adventure Day",
      description:
        "Explore the breathtaking landscapes of Gozo Island with guided hikes, kayaking, and cultural tours.",
      url: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      location: "Valletta Waterfront",
      time: "6:00Pm - 11:00Pm",
      date: "31 Dec, 2024",
      title: "New Year's Eve Fireworks",
      description:
        "Celebrate the New Year with a stunning fireworks display at the picturesque Valletta Waterfront.",
      url: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="px-8 md:px-32 my-48 relative">
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
          {events.map((item, index) => (
            <EventCard
              key={index}
              location={item.location}
              time={item.time}
              date={item.date}
              title={item.title}
              description={item.description}
              url={item.url}
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
