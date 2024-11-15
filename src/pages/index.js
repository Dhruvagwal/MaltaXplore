import Weather from "@/components/Home/Weather";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import localFont from "next/font/local";
import Image from "next/image";
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
const adventures = [
  {
    name: "Explore Malta’s Ancient Wonders",
    desc: "From UNESCO World Heritage sites to hidden catacombs, explore Malta’s rich history with our guided tours.",
    image: "/images/party4_.jpg",
    price: "400",
  },
  {
    name: "Luxury Yacht Charters",
    desc: "Sail the Mediterranean in style. Enjoy breathtaking views, exclusive access to hidden coves, and VIP service.",
    image: "/images/party1.jpg",
    price: "400",
  },
  {
    name: "Dine by the Sea – Seaside Restaurants",
    desc: "Taste authentic Maltese cuisine at our top seaside restaurants. From fresh seafood to local delicacies, you’ll love the view as much as the food.",
    image: "/images/pool.jpg",
    price: "400",
  },
  {
    name: "Scuba Diving Adventures",
    desc: "Dive into the deep blue and discover Malta’s underwater treasures. Perfect for beginners and seasoned divers.",
    image: "/images/party3.webp",
    price: "400",
  },
];
const PickUpCard = ({ data, index }) => {
  return (
    <div className={`text-black`}>
      <div className="relative">
        <Image
          src={data.image}
          width={1000}
          className="h-64 rounded-3xl"
          height={1000}
        />
        <Button className="absolute bg-white text-black hover:text-white top-0 right-0 m-4">
          <ArrowRightIcon />
        </Button>
      </div>
      <div className="flex p-4 z-1 h-full flex-col justify-between rounded-3xl">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">{data.name}</h3>
          <p className="text-zinc-500 text-sm">{data.desc}</p>
        </div>
      </div>
    </div>
  );
};

const Steps = ({ data, index }) => {
  return (
    <div className="border rounded-3xl p-4">
      <p className="text-7xl text-zinc-300 mt-[-50px] font-bold">{index + 1}</p>
      <h2 className="text-xl font-bold">{data.name}</h2>
      <h4>{data.title}</h4>
    </div>
  );
};
const WhyChoose = [
  {
    name: "All-in-One Platform",
    title:
      "Find and book everything you need for an unforgettable Maltese adventure—tours, accommodations, dining, and more.",
  },
  {
    name: "Curated Experiences",
    title:
      "We’ve handpicked the best services, from luxury experiences to local hidden gems, so you don’t miss a thing.",
  },
  {
    name: "Easy Booking",
    title:
      "Simple, secure, and fast—whether you’re booking a tour, a restaurant, or an airport transfer, we’ve made the process hassle-free.",
  },
  {
    name: "Real-Time Assistance",
    title:
      "Need help with bookings? Our live chat feature is available for immediate support.",
  },
];

export default function Home() {
  const { t } = useTranslation();
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <Navbar />
      <main className=" flex flex-col gap-24">
        {/* Hero Section */}
        <div className="grid p-16 gap-16 grid-cols-10">
          {/* right side */}
          <div className="col-span-4 flex flex-col gap-8">
            <h1 className="text-7xl leading-[1.2] font-extrabold">
              {t("home.title")}
            </h1>
            <h4 className="text-xl text-zinc-500">{t("home.subTitle")}</h4>
            <br />
            <div className="flex border border-zinc-400 rounded-full overflow-clip">
              <input
                className="outline-none p-4 w-full"
                placeholder={t("home.placeholder")}
              />
              <button className="bg-primary rounded-full text-white p-6">
                <MagnifyingGlassIcon />
              </button>
            </div>

            <div className="flex items-center rounded-full">
              <Image
                src="/images/play.svg"
                className="w-32 h-32"
                width={200}
                height={200}
              />
              <div className="w-24 bg-cover ml-[-3rem] border-2 rounded-full border-gray-300 h-24 bg-[url('https://images.pexels.com/photos/800323/pexels-photo-800323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]" />
              <div className="w-24 bg-cover ml-[-2rem] border-2 rounded-full border-gray-300 h-24 bg-[url('https://images.pexels.com/photos/1234934/pexels-photo-1234934.jpeg?auto=compress&cs=tinysrgb&w=800')]" />
            </div>
          </div>

          {/* left side */}
          <div className="col-span-6 flex flex-col gap-4 pl-16">
            {/* ai trip builder */}
            <div className="bg-[url(/images/mdina_.jpg)] text-white overflow-clip bg-no-repeat h-[50vh] w-full rounded-3xl bg-cover">
              <div className="bg-[rgb(0,0,0,0.5)] w-full flex flex-col justify-between p-8 h-full">
                <div>
                  <p className="text-5xl mb-3">{t("home.banner.title")}</p>
                  <span className="text-zinc-200">
                    {t("home.banner.subTitle")}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl flex gap-8 p-2 pl-6 text-black w-fit"
                >
                  <span className="uppercase">{t("home.banner.button")}</span>
                  <span className="bg-primary p-2 text-white rounded-full">
                    <ArrowRightIcon />
                  </span>
                </Button>
              </div>
            </div>
            {/* places */}
            <div className="p-4 flex justify-between text-white text-3xl px-8 w-full rounded-full bg-primary">
              <span className="font-semibold">{t("home.places.count")}</span>
              <span className="font-thin">{t("home.places.text")}</span>
            </div>
            {/* recommended places, upcoming events */}
            <div className="flex gap-4 text-white items-center">
              {/* recommended palces */}
              <div className="bg-[url('/images/gozo.jpg')] overflow-clip rounded-3xl bg-cover bg-no-repeat w-full h-[30vh]">
                <div className="bg-[rgb(0,0,0,0.5)] w-full flex flex-col justify-between p-8 h-full">
                  <p className="text-4xl mb-3">{t("home.recommendPlaces")}</p>
                  <Button
                    variant="link"
                    size="lg"
                    className="text-lg p-0 text-white w-fit"
                  >
                    <span>{t("home.learnMore")}</span>
                  </Button>
                </div>
              </div>
              {/* upcoming events */}
              <div className="bg-[url('/images/party2.webp')] overflow-clip rounded-3xl bg-cover bg-no-repeat w-full h-[30vh]">
                <div className="bg-[rgb(0,0,0,0.5)] w-full flex flex-col justify-between p-8 h-full">
                  <p className="text-4xl mb-3">{t("home.events")}</p>
                  <Button
                    variant="link"
                    size="lg"
                    className="p-0 text-lg text-white w-fit"
                  >
                    <span>{t("home.learnMore")}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather */}
        <div className="p-16">
          <Weather />
        </div>

        {/* why choose malta */}
        <div className="grid p-16 gap-4 grid-cols-4">
          {WhyChoose.map((item, index) => (
            <Steps index={index} data={item} />
          ))}
        </div>

        {/* Best Places */}
        <div className="relative bg-zinc-100">
          <div className="flex p-16 flex-col gap-4">
            <h2 className="text-3xl font-bold">{t("home.discover.title")}</h2>
            <p className="text-xl text-zinc-500">
              {t("home.discover.subTitle")}
            </p>
            <div className="grid grid-cols-4 gap-4 mt-8">
              {adventures.map((item, index) => (
                <PickUpCard index={index} data={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Product Recommendations*/}
        <div className="p-16 bg-black">
          <div className="flex relative z-1 flex-col gap-4">
            <h3 className="text-9xl mb-[-10rem] font-bold text-zinc-300">
              {t("home.custom.title")}
            </h3>
          </div>
          <div className="grid bg-[url('/images/couple-looking-tablet.jpg')] overflow-clip mx-64  text-white rounded-3xl bg-no-repeat bg-cover h-[70vh] gap-6 mt-12 grid-cols-1">
            <div className="flex justify-end bg-[rgba(0,0,0,0.5)] flex-col p-16 gap-4">
              <h3 className="text-5xl font-bold">Build My Itinerary</h3>
              <h3 className="text-xl text-zinc-200">
                Based on your preferences, we’ll suggest experiences you’ll
                love, from sightseeing tours to gourmet restaurants.
              </h3>
              <Button
                size="lg"
                className="w-fit bg-white text-black hover:text-white px-8"
              >
                Start Building
              </Button>
            </div>
          </div>
        </div>
        <div className="h-screen"></div>
      </main>
    </div>
  );
}
