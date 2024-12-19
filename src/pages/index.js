import Weather from "@/components/Home/Weather";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeSandboxLogoIcon,
  Component1Icon,
  DotFilledIcon,
  DotIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import localFont from "next/font/local";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Progress } from "@/components/ui/progress";
import Tilt from "react-parallax-tilt";
import { CommentRatings } from "@/components/ui/rating";

const Categories = () => {
  const [date, setDate] = useState();
  return (
    <div className="mt-16 flex items-center relative z-10 gap-2 p-4 border bg-white mx-auto w-fit shadow-lg rounded-xl">
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-red-500 py-2">
          <Component1Icon />
          Categories
        </p>
        <Select>
          <SelectTrigger className="w-[10vw]">
            <SelectValue placeholder="Select Category" />
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
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-red-500 py-2">
          <Component1Icon />
          Categories
        </p>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-red-500 py-2">
          <Component1Icon />
          Add Guest
        </p>
        <Input placeholder="Search Here..." type="number" />
      </div>
      <Button className="p-9 flex items-center gap-2 text-xl">
        <MagnifyingGlassIcon /> Search
      </Button>
    </div>
  );
};

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
          <Button size="lg" className="p-8">
            Start Exploring
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

const TopPicks = () => {
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
  const CarouselCard = ({ index, data }) => {
    return (
      <CarouselItem index={index} className="md:basis-1/2 lg:basis-1/3">
        <Card>
          <div className="relative">
            <Image
              height={500}
              width={400}
              className="rounded-t-xl w-full"
              src={`https://picsum.photos/500/400?random=${index}`}
            />
            <div className="backdrop-blur-sm bg-white bottom-4 right-4 rounded-full p-2 px-4 absolute z-10 flex items-center text-xs">
              <DotFilledIcon height={20} width={20} className="text-red-400" />{" "}
              {data.title} & More Info
            </div>
          </div>
          <CardContent className="p-8">
            <div className="flex justify-between items-center">
              <p className="text-base w-[50%] text-ellipsis font-semibold">
                {data.title}
              </p>
              <span className="">
                Starting at:{" "}
                <span className="text-primary font-bold text-base">$500</span>
              </span>
            </div>
            <br />
            <p className="text-muted-foreground text-ellipsis text-sm">
              {data.description}
            </p>
            <br />
            <Button className="w-full">Book Now</Button>
          </CardContent>
        </Card>
      </CarouselItem>
    );
  };
  return (
    <div className="my-48 px-32">
      <div className="flex lg:gap-64 justify-between">
        <p className="text-5xl font-bold">
          Top Picks for Your Maltese Adventure
        </p>
        <p className="text-xl text-right">
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
        <CarouselContent className="">
          {CARD_DATA.map((item, index) => (
            <CarouselCard data={item} index={index} />
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
  const CCategoriesCard = ({ data, index }) => {
    return (
      <Card className="col-span-2 group hover:text-white hover:bg-primary transition-all ease-in-out p-4 text-left">
        <Image
          height={400}
          width={400}
          className="rounded-xl w-full"
          src={`https://picsum.photos/500/400?random=${index}`}
        />

        <div className="mt-16">
          <p className="text-xl font-semibold">{data.name}</p>
          <p className="group-hover:text-gray-100 text-muted-foreground">
            {data.desc}
          </p>
        </div>
      </Card>
    );
  };
  return (
    <div className="p-16 px-32 relative text-center bg-red-100 mt-32 r_cut_corner">
      <div className="text-center">
        <p className="text-5xl font-bold">Explore by Categories</p>
        <br />
        <p className="text-2xl text-muted-foreground">
          What Would You Like to Do?
        </p>
      </div>
      <br />
      <div className="grid grid-cols-6 gap-6">
        {CATEGORIES.map((item, index) => (
          <CCategoriesCard index={index} data={item} />
        ))}
      </div>
      <br />
      <Button size="lg" className="p-8">
        Explore All Categories
      </Button>
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
  const DATA = [
    {
      name: "Valletta Food Festival",
      description: "Sample the best local dishes in Malta’s capital",
      location: "Malta’s capital",
      time: "3pm - 10pm",
      image:
        "https://images.pexels.com/photos/1540338/pexels-photo-1540338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Sunset Boat Party",
      description: "Dance the night away while cruising along the coast",
      location: "Malta’s capital",
      time: "Malta’s capital",
      image:
        "https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Open-Air Concert in Gozo",
      description: "Enjoy live music under the stars",
      location: "5pm - Midnight",
      time: "7pm - 11pm",
      image:
        "https://images.pexels.com/photos/769525/pexels-photo-769525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  const CCard = ({ data }) => {
    return (
      <div className="flex w-full items-center">
        <Tilt className="relative z-10" tiltAngleYManual={5}>
          <Image
            src={data.image}
            width={600}
            height={600}
            className="rounded-xl object-cover h-72"
          />
        </Tilt>
        <div className="relative h-[40vh] w-full">
          <Tilt
            tiltAngleYManual={-5}
            className="w-[calc(100%+10rem)] h-full z-[-1]"
          >
            <div className="border-2 pl-[10rem] ml-[-10rem] h-full w-full rounded-xl border-primary p-16"></div>
          </Tilt>
          <div className="absolute flex flex-col gap-4 p-16 top-0 left-0">
            <p className="font-bold text-2xl">{data.name}</p>
            <p>{data.description}</p>
            <p>
              <span className="text-muted-foreground">Location:</span>
              <span className="font-bold"> {data.location}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Time:</span>{" "}
              <span className="font-bold"> {data.time}</span>
            </p>
            <div className="flex gap-6 mt-6">
              <Button>Book Ticket</Button>
              <Button variant="outline">Book Ticket</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="px-32 my-48 relative">
      <div className="text-center">
        <p className="text-5xl font-bold">What’s Happening in Malta Today?</p>
        <br />
        <p className="text-2xl text-muted-foreground">
          Stay up to date with all the daily events, festivals, and activities
          happening across the island.
        </p>
      </div>
      <div className="flex flex-col items-center gap-16 mt-16">
        {DATA.map((item, index) => (
          <CCard data={item} key={index} />
        ))}
        <Button className="p-8 " size="lg">
          See All Events
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
        <Button variant="secondary" className="p-8">
          Get My Maltapass
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
    <div className="p-16 my-48 px-32 relative text-center bg-red-100 mt-32 cut_corner">
      <div className="text-center">
        <p className="text-5xl font-bold">Booking Made Simple</p>
        <br />
        <p className="text-2xl text-muted-foreground">
          We’ve made it easy to book your next adventure
        </p>
      </div>
      <br />
      <div className="grid grid-cols-3 gap-8">
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
      <Button size="lg" className="p-8">
        Start Exploring
      </Button>
    </div>
  );
};

const Guests = () => {
  const REVIEW_DATA = [
    {
      review:
        "We had the most amazing time! Booking through MaltaXplore was easy and seamless. Highly recommend the sunset boat tour!",
      name: "Sarah",
      location: "United Kingdom",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.5,
    },
    {
      review:
        "We had the most amazing time! Booking through MaltaXplore was easy and seamless. Highly recommend the sunset boat tour!",
      name: "Sarah",
      location: "United Kingdom",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.5,
    },
    {
      review:
        "We had the most amazing time! Booking through MaltaXplore was easy and seamless. Highly recommend the sunset boat tour!",
      name: "Sarah",
      location: "United Kingdom",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.5,
    },
  ];
  const ReviewCard = ({ data }) => (
    <Card className="p-8 border-2 hover:border-primary transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <Image src="images/el_quotes.svg" width={50} height={50} />

        <CommentRatings rating={data.rating} />
      </div>
      <br />
      <p>{data.review}</p>
      <br />
      <div className="flex items-center gap-4">
        <Image
          src={data.avatar}
          className="rounded-full h-12 object-cover w-12"
          width={50}
          height={50}
        />
        <div>
          <p className="text-xl font-semibold">{data.name}</p>
          <p className="text-muted-foreground">{data.location}</p>
        </div>
      </div>
    </Card>
  );
  return (
    <div className="my-48 text-center px-32">
      <div className="flex w-full justify-between">
        <div></div>
        <p className="text-5xl font-bold">What Our Guests Are Saying</p>
        <div className="flex gap-2 self-end items-center justify-end">
          <Button variant="outline">
            <ArrowLeftIcon />
          </Button>
          <Button variant="outline">
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
      <div className="grid text-left mt-16 grid-cols-3 gap-6">
        {REVIEW_DATA.map((item) => (
          <ReviewCard data={item} />
        ))}
      </div>
      <br />
      <Button size="lg" className="p-8">
        Read More Reviews
      </Button>
    </div>
  );
};

const River = () => {
  return (
    <div className="px-32 relative">
      <Image
        className="rounded-lg w-full"
        width={1000}
        height={1000}
        src="/images/river.png"
      />
      <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full">
        <div className="w-[50%] gap-6 flex items-center justify-center flex-col text-center ">
          <p className="text-5xl leading-[1.5] font-bold w-full h-full text-white">
            Ready to Experience Malta Like Never Before?
          </p>
          <p className="text-white">
            Start exploring now and book the best tours, activities, and dining
            experiences on the island.
          </p>
          <div className="flex gap-8">
            <Button className="p-8" variant="secondary" size="lg">
              Explore
            </Button>
            <Button className="p-8" size="lg">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="bg-gradient-to-br from-primary-foreground to-transparent">
        <Navbar />
        <main className="px-32 relative pt-16">
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
                  >
                    Explore Malta Verse
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
                find everything you need for the perfect trip to Malta - all in
                <br />
                one place
              </p>
              <br />
              <Button size="lg">Start Your Journey</Button>
            </div>
          </div>
        </main>
      </div>

      {/* Categories Search */}
      <Categories />
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
      <Guests />
      <River />
    </div>
  );
}
