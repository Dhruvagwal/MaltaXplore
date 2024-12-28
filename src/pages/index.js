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

const PhoneFeatures = () => {
  const FeatureCard = ({ title = "", desc = "" }) => (
    <Card className="w-[350px] text-left">
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
    <div className="p-16 relative text-center bg-red-100 mt-32 cut_corner">
      <img
        src="images/curve_line.svg"
        className="absolute z-[-1] h-full w-full object-scale-down"
      />
      <p className="text-5xl font-bold">Why Choose MaltaXplore?</p>
      <div className="flex mt-16 items-center gap-8 justify-center">
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
            className="object-cover rounded-[2rem] relative h-64 w-64"
            width={200}
            height={200}
          />
        </div>
        <div>
          <img src="images/phone.png" />
          <br />
          <Button asChild size="lg" className="p-8">
            <Link href={search}> Start Exploring</Link>
          </Button>
        </div>
        <div className="flex items-center flex-col gap-8">
          <Image
            src="/images/malta_banner.jpg"
            className="object-cover rounded-[2rem] relative h-64 w-64"
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

export const TopPicks = () => {
  const CARD_DATA = [
    {
      image: "",
      title: "Explore Malta’s Ancient Wonders",
      description:
        "From UNESCO World Heritage sites to hidden catacombs, explore Malta’s rich history with our guided tours.",
    },
    {
      image: "",
      title: "Luxury Yacht Charters",
      description:
        "Sail the Mediterranean in style. Enjoy breathtaking views, exclusive access to hidden coves, and VIP service.",
    },
    {
      image: "",
      title: "Dine by the Sea",
      description:
        "Taste authentic Maltese cuisine at our top seaside restaurants. From fresh seafood to local delicacies...",
    },
    {
      image: "",
      title: "Scuba Diving Adventures",
      description:
        "Dive into the deep blue and discover Malta’s underwater treasures. Perfect for beginners and seasoned divers.",
    },
  ];
  return (
    <div className="my-48 px-9 md:px-32">
      <div className="flex flex-col md:flex-row lg:gap-64 justify-between">
        <p className="text-4xl md:text-5xl font-bold">
          Top Picks for Your Maltese Adventure
        </p>
        <p className="text-xl text-left md:text-right">
          Start with our most popular experiences and tours perfect for getting
          the most out of Malta.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-16"
      >
        <CarouselContent className="max-md:mr-10">
          {CARD_DATA.map((item, index) => (
            <CarouselItem index={index} className="md:basis-1/2 lg:basis-1/3">
              <ServiceCard data={item} index={index} />
            </CarouselItem>
          ))}

          <CarouselItem
            index={CARD_DATA.length}
            className="md:basis-1/2 lg:basis-1/3"
          />
          <CarouselItem
            index={CARD_DATA.length + 1}
            className="md:basis-1/2 lg:basis-1/3"
          />
        </CarouselContent>
        <CarouselProgress length={CARD_DATA.length} />
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
const CCategories = () => {
  const CATEGORIES = [
    { desc: "Lorem Ipsum Dolor simit", name: "Tours & Excursions", image: "" },
    { desc: "Lorem Ipsum Dolor simit", name: "Restaurants & Cafés", image: "" },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Private Drivers & Airport Transfers",
      image: "",
    },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Adventure Activities",
      image: "",
    },
    { desc: "Lorem Ipsum Dolor simit", name: "Wellness & Spa", image: "" },
    {
      desc: "Lorem Ipsum Dolor simit",
      name: "Shopping & Souvenirs",
      image: "",
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
    <div className="my-48 px-32">
      <div className="flex lg:gap-64 justify-between">
        <p className="text-5xl font-bold">Create Your Own Perfect Itinerary</p>
        <p className="text-xl text-right">
          Customize your trip based on what you love. Whether you’re an
          adventure-seeker, a foodie, or a culture enthusiast, we’ll help you
          craft the perfect experience.
        </p>
      </div>
      <div className="relative mt-16">
        <Image
          src="/images/iteneray_back.svg"
          className="w-full"
          width={2000}
          height={2000}
        />

        <div className="absolute top-0 left-0 w-full p-16 pr-0">
          <div className="flex w-full justify-between">
            <p className="text-5xl shrink-0 font-semibold leading-[1.5] text-white">
              Based on your preferences,
              <br /> we’ll suggest experiences you’ll <br />
              love, from sightseeing tours <br />
              to gourmet restaurants.
            </p>
            <p className="text-6xl mt-[-4rem] shrink-0 text-right font-bold leading-[1.5]">
              Don’t know <br />
              where to start?{" "}
            </p>
          </div>
          <Button variant="secondary" className="p-8 mt-32 px-16" size="lg">
            Build My Itinerary
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
        <p className="text-4xl md:text-5xl font-bold">What’s Happening in Malta Today?</p>
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
    <div className="my-48 relative px-0">
      <Image
        src="/images/maltapass.svg"
        className="w-full"
        width={1000}
        height={1000}
      />
      <div className="absolute top-20 right-0 p-32 w-[50%] text-white">
        <p className="text-5xl leading-[1.5] font-bold">
          Maltapass – Explore <br />
          More, Pay Less
        </p>
        <br />
        <p className="text-3xl">
          Introducing Maltapass – Exclusive Discounts for Your Stay
        </p>
        <br />
        <p className="text-xl">
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
  return (
    <div>
      <div className="bg-gradient-to-br from-primary-foreground to-transparent">
        {/* <Navbar /> */}
        <main className="relative pt-16">
          <div className="px-32">
            <div className="relative">
              <Image
                className="w-full"
                src={"images/Union.svg"}
                height={1000}
                width={1000}
              />
              <div className="absolute w-full right-5 top-5">
                <div className="flex items-end justify-end w-full h-[70vh] gap-6">
                  <Image
                    src="/images/malta_banner.jpg"
                    className="object-cover rounded-[2rem] relative h-40 w-40"
                    width={200}
                    height={200}
                  />
                  <Image
                    src="/images/malta_hero.jpg"
                    className="object-cover h-[41vh] w-[15vw] rounded-[2rem]"
                    width={200}
                    height={200}
                  />
                  <Weather />
                </div>
                <div className="grid grid-cols-2 m-6 px-4">
                  <div className="mb-12 pb-8">
                    <Image
                      src="/images/gozo.jpg"
                      className="w-full rounded-3xl object-cover h-[68vh]"
                      width={2000}
                      height={2000}
                    />
                    <Button
                      className="relative text-white bottom-12 text-xl"
                      variant="link"
                      asChild
                    >
                      <Link href={search}>Explore Malta Verse</Link>
                    </Button>
                  </div>
                  <Image
                    src="/images/lady.png"
                    className="w-full object-cover relative top-[-8rem] ml-11 h-full"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
            <div className="top-0 flex absolute pt-32">
              <div>
                <p className="font-semibold text-xl text-primary">
                  Discover Malta In One Place
                </p>
                <br />
                <h1 className="text-7xl leading-[1.3] font-bold">
                  Discover Malta's Best <br /> Experiences
                </h1>
                <br />
                <p className="text-xl leading-[1.5]">
                  From tours and adventures to dining and relaxation, <br />
                  find everything you need for the perfect trip to Malta - all
                  in
                  <br />
                  one place
                </p>
                <br />
                <Button asChild size="lg">
                  <Link href={search}>Start Your Journey</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Categories Search */}
          <Categories className="mt-16" />
          {/* Phone Features */}
          <PhoneFeatures />
          {/* Top Picks */}
          <TopPicks />
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
