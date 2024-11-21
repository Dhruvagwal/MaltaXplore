import Weather from "@/components/Home/Weather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
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

export default function Home() {
  const { t } = useTranslation();
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
                  src="/images/malta_hero.jpg"
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
                    src="/images/water.png"
                    className="w-full h-[68vh]"
                    width={200}
                    height={200}
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
                  className="w-full object-cover relative top-[-8rem] ml-12 h-full"
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
      <div className="mt-16 relative z-10 flex gap-2 p-4 border bg-white mx-auto w-fit shadow-lg rounded-xl">
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
        <Input className="w-[40vw] shrink-0" placeholder="Search Here..." />
        <Button>
          <MagnifyingGlassIcon /> Search
        </Button>
      </div>
      <div className="h-screen"></div>
    </div>
  );
}
