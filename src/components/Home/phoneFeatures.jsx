import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { search } from "@/data/link";
import Tilt from "react-parallax-tilt";

const PhoneFeatures = () => {
  const FeatureCard = ({ title = "", desc = "" }) => (
    <Tilt>
      <Card className="w-[350px] text-left max-md:w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="shadow-md border rounded-full p-2">
              <CodeSandboxLogoIcon />
            </div>
            {title}
          </CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
      </Card>
    </Tilt>
  );
  return (
    <div className="p-8 md:p-16 relative text-center bg-red-100 mt-32 cut_corner">
      <img
        src="images/curve_line.svg"
        className="md:absolute z-[-1] h-full w-full object-scale-down"
      />
      <p className="text-4xl md:text-5xl font-bold">Why Choose MaltaXplore?</p>
      <div className="md:flex mt-16 items-center gap-8 justify-center">
        <div className="flex items-center flex-col gap-8">
          <FeatureCard
            title="All-in-One Platform"
            desc="Manage everything effortlessly with our all-in-one platform, offering powerful tools and seamless functionality."
          />
          <FeatureCard
            title="Seamless Booking Process"
            desc="Enjoy a smooth and hassle-free booking experience with an intuitive interface and simple navigation. Secure your bookings."
          />
          <Tilt>
            <Image
              src="/images/pool.jpg"
              className="object-cover rounded-[2rem] relative h-64 w-full md:w-64"
              loading="lazy"
              width={200}
              height={200}
            />
          </Tilt>
        </div>
        <div className="max-md:flex max-md:items-center max-md:flex-col mt-8 md:mt-0">
          <Tilt>
            <Image
              src="/images/iphone.png"
              width={300}
              height={600}
              loading="lazy"
            />
          </Tilt>

          <br />
          <Button asChild size="lg" className="p-8">
            <Link href={search}> Start Exploring</Link>
          </Button>
        </div>
        <div className="flex items-center flex-col gap-8 mt-8 md:mt-0">
          <Tilt>
            <Image
              src="/images/malta_banner.jpg"
              className="object-cover rounded-[2rem] relative h-64 w-full md:w-64"
              loading="lazy"
              width={200}
              height={200}
            />
          </Tilt>

          <FeatureCard
            title="Comprehensive Service Selection"
            desc="We offer a wide range of services, from guided tours to car rentals and accommodation options, all in one convenient platform. Everything you need for your travels."
          />
          <FeatureCard
            title="Diverse and Specialized Options"
            desc="From unique adventure activities like rock climbing to specialized business meeting venues, our platform offers services for every aspect of your travel needs."
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneFeatures;
