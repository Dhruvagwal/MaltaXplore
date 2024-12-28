import Banner from "@/components/cui/banner";
import EventCard from "@/components/cui/event";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const popularEvents = [
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
  {
    location: "Mdina Old City",
    time: "2:00Pm - 6:00Pm",
    date: "5 Jan, 2025",
    title: "Mdina Cultural Festival",
    description:
      "Immerse yourself in the rich history and culture of Mdina with live performances, art displays, and local delicacies.",
    url: "https://images.pexels.com/photos/2775272/pexels-photo-2775272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    location: "Blue Lagoon, Comino",
    time: "8:00Am - 2:00Pm",
    date: "15 Jan, 2025",
    title: "Blue Lagoon Snorkeling",
    description:
      "Dive into the crystal-clear waters of the Blue Lagoon for an unforgettable snorkeling adventure.",
    url: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    location: "Sliema Promenade",
    time: "4:00Pm - 8:00Pm",
    date: "20 Jan, 2025",
    title: "Sliema Art Walk",
    description:
      "Stroll along the Sliema Promenade and enjoy art installations, live music, and food stalls.",
    url: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

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

function RealTimeEvents() {
  const [date, setDate] = useState();
  return (
    <div className="from-primary-foreground to-transparent">
      <main className="pt-16">
        {/* Banner */}
        <Banner url="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
          <p className="text-3xl font-bold text-white">Real Time Events</p>
        </Banner>

        <div className="px-8 md:px-32 py-16 mt-16">
          {/* heading */}
          <div className="flex flex-col md:flex-row justify-between items-center max-md:gap-4">
            <p className="text-3xl font-bold">Today’s Events</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search by character" />
                <Button className="p-2 px-3">
                  <SearchIcon width={15} height={15} />
                </Button>
              </div>
              <DatePicker date={date} setDate={setDate} />
              <Select>
                <SelectTrigger className="w-full md:w-[10vw]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="hotels">Hotels</SelectItem>
                    <SelectItem value="things">Things to do</SelectItem>
                    <SelectItem value="restaurants">Restaurants</SelectItem>
                    <SelectItem value="homes">Holiday Homes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* events */}
          <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {popularEvents.map((item, index) => (
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
        </div>

        <div className="px-8 md:px-32 py-16">
          <p className="text-3xl font-bold mb-8 text-center">Upcoming Events</p>
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
        </div>
        <div className="px-8 md:px-32 pt-16">
          <p className="text-3xl font-bold mb-8 text-center">
            Event locations and nearby services
          </p>
          <iframe
            width="600"
            className="w-full bg-zinc-50 p-4 border rounded-lg"
            height="800"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=New%20York&zoom=10&maptype=roadmap"
          ></iframe>
        </div>
      </main>
    </div>
  );
}

export default RealTimeEvents;
