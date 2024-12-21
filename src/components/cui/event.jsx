import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Clock10, MapPin } from "lucide-react";
import { Button } from "../ui/button";

function EventCard({ url, location, time, date, title, description }) {
  return (
    <Card className="border p-4 bg-zinc-50">
      <Image
        width={500}
        height={500}
        className="w-full rounded-lg h-64 object-cover"
        src={url}
      />
      <div className="flex flex-col my-4 gap-2">
        <div className="flex font-semibold text-sm gap-8">
          <p className="flex gap-1 text-muted-foreground items-center">
            <MapPin className="text-primary h-4 w-4"/> {location}
          </p>
          <p className="flex gap-1  text-muted-foreground items-center">
            <Clock10 className="text-primary  h-4 w-4"/> {time}
          </p>
        </div>
        <p className="text-primary font-semibold">{date}</p>
        <p className="text-xl mt-2 font-bold">{title}</p>
        <p className="text-muted-foreground">{description}</p>
        <br/>
        <div className="flex items-center gap-4">
            <Button className="w-full py-6">Book Ticket</Button>
            <Button className="w-full py-6" variant="outline">More Info</Button>
        </div>
      </div>
    </Card>
  );
}

export default EventCard;
