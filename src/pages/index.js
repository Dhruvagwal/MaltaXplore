import { useState, useEffect } from "react";
import Weather from "@/components/Home/Weather";
import { Button } from "@/components/ui/button";
import { CodeSandboxLogoIcon, DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/zoom_carousel";
import Reviews from "@/components/cui/review";
import { River } from "@/components/cui/river";
import Link from "next/link";
import { maltapass, realTimeEvents, search } from "@/data/link";
import EventCard from "@/components/cui/event";
import CategoryCard from "@/components/cui/CategoryCard";
import { Categories } from "@/components/cui/category";
import { ServiceCard } from "@/components/cui/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import useFirebase from "@/hooks/use-firebase";

const PhoneFeatures = () => {
  const FeatureCard = ({ title = "", desc = "" }) => (
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
            desc="Find and book everything you need for an unforgettable Maltese adventure—tours, accommodations, dining, and more."
          />
          <FeatureCard
            title="All-in-One Platform"
            desc="Find and book everything you need for an unforgettable Maltese adventure—tours, accommodations, dining, and more."
          />
          <Image
            src="/images/pool.jpg"
            className="object-cover rounded-[2rem] relative h-64 w-full md:w-64"
            width={200}
            height={200}
          />
        </div>
        <div className="max-md:flex max-md:items-center max-md:flex-col mt-8 md:mt-0">
          <img src="images/phone.png" />
          <br />
          <Button asChild size="lg" className="p-8">
            <Link href={search}> Start Exploring</Link>
          </Button>
        </div>
        <div className="flex items-center flex-col gap-8 mt-8 md:mt-0">
          <Image
            src="/images/malta_banner.jpg"
            className="object-cover rounded-[2rem] relative h-64 w-full md:w-64"
            width={200}
            height={200}
          />
          <FeatureCard
            title="All-in-One Platform"
            desc="Find and book everything you need for an unforgettable Maltese adventure—tours, accommodations, dining, and more."
          />
          <FeatureCard
            title="All-in-One Platform"
            desc="Find and book everything you need for an unforgettable Maltese adventure—tours, accommodations, dining, and more."
          />
        </div>
      </div>
    </div>
  );
};

export const TopPicks = ({ services, loading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="my-48 px-9 md:px-32">
      <div className="flex flex-col md:flex-row lg:gap-64 justify-between">
        {loading ? (
          <div className="flex flex-col gap-4 w-1/2">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        ) : (
          <p className="text-4xl md:text-5xl font-bold">
            Top Picks for Your Maltese Adventure
          </p>
        )}
        {loading ? (
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
              <ServiceCard data={item} index={index} loading={loading} />
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
const CCategories = () => {
  const CATEGORIES = [
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Tour Operator",
      image: "/tour-operator.jpg",
      category: "cat-1",
    },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Accommodation Provider",
      image: "/accomodation.jpg",
      category: "cat-2",
    },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Car Rental & Transportation",
      image: "/car-rental.jpg",
      category: "cat-3",
    },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Adventure Activities & Experiences",
      image: "/adventure.jpg",
      category: "cat-5",
    },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Photography & Videography Services",
      image: "/photography.jpg",
      category: "cat-6",
    },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Conference & Business Meeting Venues",
      image: "/conf-hall.jpg",
      category: "cat-7",
    },
  ];

  return (
    <div className="p-16 px-8 md:px-32 relative text-center bg-red-100 mt-32 r_cut_corner">
      <div className="text-center">
        <p className="text-4xl md:text-5xl font-bold">Explore by Categories</p>
        <br />
        <p className="text-xl md:text-2xl text-muted-foreground">
          What Would You Like to Do?
        </p>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((item, index) => (
          <CategoryCard index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

const Iteneray = () => {
  return (
    <div className="my-48 px-8 md:px-32 xl:px-20">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-64 justify-between max-md:px-1">
        <p className="text-5xl font-bold">Create Your Own Perfect Itinerary</p>
        <p className="text-xl md:text-right">
          Customize your trip based on what you love. Whether you’re an
          adventure-seeker, a foodie, or a culture enthusiast, we’ll help you
          craft the perfect experience.
        </p>
      </div>
      <div className="relative mt-16">
        <Image
          src="/images/iteneray_back.svg"
          className="w-full max-md:hidden"
          width={2000}
          height={2000}
        />

        <div className="md:absolute top-0 left-0 w-full p-10 md:p-16 md:pr-0 max-md:bg-[#E03737] max-md:rounded-md">
          <div className="flex flex-col md:flex-row w-full justify-between">
            <p className="text-3xl md:text-5xl shrink-0 font-semibold leading-[1.5] text-white">
              Based on your preferences,
              <br /> we’ll suggest experiences you’ll <br />
              love, from sightseeing tours <br />
              to gourmet restaurants.
            </p>
            <p className="text-4xl md:text-6xl md:mt-[-2rem] shrink-0 md:text-right font-bold leading-[1.5]">
              Don’t know <br />
              where to start?{" "}
            </p>
          </div>
          <Button
            variant="secondary"
            className="p-8 mt-12 md:mt-40 md:px-16 max-md:w-full"
            size="lg"
          >
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

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

const MaltaPass = () => {
  return (
    <div className="my-48 relative px-8 md:px-0">
      <Image
        src="/images/maltapass.svg"
        className="w-full hidden md:block"
        width={1000}
        height={1000}
      />
      <div className="md:absolute top-0 md:top-20 right-0 p-10 md:p-32 w-[100%] md:w-[50%] text-white max-md:bg-[#E03737] max-md:rounded-md">
        <p className="text-3xl md:text-5xl leading-[1.5] font-bold">
          Maltapass – Explore <br />
          More, Pay Less
        </p>
        <br />
        <p className="text-2xl md:text-3xl">
          Introducing Maltapass – Exclusive Discounts for Your Stay
        </p>
        <br />
        <p className="text-lg md:text-xl">
          Unlock free discounts on top attractions, dining, and more with
          Maltapass. Available for 1-day or 1-week, it’s the perfect way to save
          while you explore.
        </p>
        <br />
        <Button variant="secondary" asChild className="p-8">
          <Link href={maltapass}>Get My Maltapass</Link>
        </Button>
      </div>
    </div>
  );
};

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

export default function Home() {
  const {
    crud: { readData },
  } = useFirebase();
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedData = await readData("services");

      const allServices = Object.values(fetchedData || {}).flatMap((category) =>
        Object.values(category || {}).flatMap((subCategory) =>
          Object.values(subCategory || {}).filter(Boolean)
        )
      );
      setServices(allServices);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-primary-foreground to-transparent">
        {/* <Navbar /> */}
        <main className="lg:relative pt-16">
          <div className="md:px-32 xl:px-20 max-lg:flex max-lg:flex-col">
            <div className="lg:relative max-lg:order-2">
              <Image
                className="w-full max-lg:hidden"
                src={"images/Union.svg"}
                height={1000}
                width={1000}
              />
              <div className="lg:absolute w-full right-10 top-8 space-y-8">
                <div className="lg:flex lg:items-end lg:justify-end w-full h-full lg:h-[70vh] gap-6 max-lg:space-y-4 max-lg:px-8">
                  <Image
                    src="/images/malta_banner.jpg"
                    className="object-cover rounded-[2rem] lg:relative h-auto lg:h-40 w-full lg:w-40 top-8"
                    width={200}
                    height={200}
                  />
                  <Image
                    src="/images/malta_hero.jpg"
                    className="object-cover h-[40vh] lg:relative w-full lg:w-[15vw] rounded-[2rem] max-lg:hidden top-3"
                    width={200}
                    height={200}
                  />
                  <Weather />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 m-6 px-4">
                  <div className="mb-12 pb-8">
                    <Image
                      src="/images/gozo.jpg"
                      className="w-full p-2 ml-5 rounded-[3.5rem] lg:relative object-cover h-[400px] lg:h-[65vh] top-12 left-0"
                      width={2000}
                      height={2000}
                    />
                    <Button
                      className="relative text-white bottom-4 left-12 text-2xl"
                      variant="link"
                      asChild
                    >
                      <Link href={search}>Explore Malta Verse</Link>
                    </Button>
                  </div>
                  <Image
                    src="/images/lady.png"
                    className="w-full object-cover lg:relative top-[-8rem] ml-11 h-full max-lg:hidden"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
            <div className="lg:top-0 flex lg:absolute lg:pt-32 max-lg:my-20 max-lg:order-1 max-md:justify-center px-8 lg:px-0">
              <div>
                <p className="font-semibold text-xl text-primary">
                  Discover Malta In One Place
                </p>
                <br />
                <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.3] font-bold">
                  Discover Malta's Best <br /> Experiences
                </h1>
                <br />
                <p className="text-lg lg:text-xl leading-[1.5]">
                  From tours and adventures to dining and relaxation, <br />
                  find everything you need for the perfect trip to Malta - all
                  <br />
                  in one place
                </p>
                <br />
                <Button asChild size="lg" className="md:p-8">
                  <Link href={search}>Start Your Journey</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Categories Search */}
          <Categories className="lg:my-16 max-md:w-[80%]" />
          {/* Phone Features */}
          <PhoneFeatures />
          {/* Top Picks */}
          <TopPicks services={services} loading={isLoading} />
          {/* Categories */}
          <CCategories />
          {/* Itenary */}
          <Iteneray />
          <Events />
          <MaltaPass />
          <MadeSimple />
          <Reviews heading="What Our Guests Are Saying" />
          <River />
        </main>
      </div>
    </div>
  );
}
