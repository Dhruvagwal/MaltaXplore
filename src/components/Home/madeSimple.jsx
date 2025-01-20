import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { search } from "@/data/link";
import Tilt from "react-parallax-tilt";

const MadeSimple = () => {
  const CARD_DATA = [
    {
      name: "Browse",
      image: "/images/man_stude.png",
      description: "Browse our curated selection of experiences.",
    },
    {
      name: "Book",
      image: "/images/calender.png",
      description: "Book directly through the platform.",
    },
    {
      name: "Enjoy",
      image: "/images/enjoy.png",
      description: "Enjoy seamless experiences with our trusted partners.",
    },
  ];
  const CCard = ({ data }) => {
    return (
      <Tilt>
        <div className="">
          <div className="shadow-md relative z-10 p-4 w-fit rounded-md mx-auto mb-[-50px] bg-white">
            <Image src={data.image} height={100} width={100} />
          </div>
          <Card className="made_simple_drop_shadow h-72 flex justify-center items-center">
            <div className="text-center">
              <p className="font-bold mb-1 text-2xl">{data.name}</p>
              <p className="text-xl px-16 text-muted-foreground">
                {data.description}
              </p>
            </div>
          </Card>
        </div>
      </Tilt>
    );
  };
  return (
    <div className="p-16 my-48 px-8 md:px-32 relative text-center bg-red-100 mt-32 cut_corner">
      <div className="text-center">
        <p className="text-4xl md:text-5xl font-bold">Booking Made Simple</p>
        <br />
        <p className="text-xl md:text-2xl text-muted-foreground">
          We’ve made it easy to book your next adventure
        </p>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {CARD_DATA.map((item, index) => (
          <CCard key={index} data={item} />
        ))}
      </div>
      <br />
      <br />
      <p className="text-muted-foreground">
        <strong>Need Help?</strong> Use our <strong>Live Chat</strong> for
        real-time assistance with any questions or bookings.
      </p>
      <br />
      <Button size="lg" asChild className="p-8">
        <Link href={search}>Start Exploring</Link>
      </Button>
    </div>
  );
};

export default MadeSimple;
