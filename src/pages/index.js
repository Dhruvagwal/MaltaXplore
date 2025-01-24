import React from "react";
import Reviews from "@/components/cui/review";
import { River } from "@/components/cui/river";
import PhoneFeatures from "@/components/Home/phoneFeatures";
import TopPicks from "@/components/Home/topPicks";
import Iteneray from "@/components/Home/itenerary";
import Events from "@/components/Home/events";
import MaltaPass from "@/components/Home/maltaPass";
import MadeSimple from "@/components/Home/madeSimple";
import CCategories from "@/components/Home/cCategories";
import DiscoverMalta from "@/components/Home/discoverMalta";
import Link from "next/link";
import Image from "next/image";
import { search } from "@/data/link";
import { Button } from "@/components/ui/button";
import { Component1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useServiceTypeState } from "@/context/servicesContext";
import { HeroCarousel } from "@/components/Home/hero-carousel";
import { HappyCustomers } from "@/components/Home/happy-customer";
import { ListingEveryDay } from "@/components/Home/listing-everyday";
import { HeroSearch } from "@/components/Home/hero-search";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-br from-primary-foreground to-transparent">
        {/* <Navbar /> */}
        <main className="relative pt-16">
          <div className="lg:relative">
            <Image
              src={"/hero-bg.png"}
              width={200}
              height={200}
              className="w-full max-lg:hidden"
            />
            <div className="flex flex-col lg:flex-row justify-around items-center">
              <div className="lg:absolute lg:left-32 z-50 top-0">
                <div className="mx-12 md:mx-0 space-y-4">
                  <p className="font-semibold text-xl text-primary">
                    Discover Malta In One Place
                  </p>
                  <br />
                  <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.3] font-bold">
                    Discover Malta's <br />
                    Best Experiences
                  </h1>
                  <p className="text-lg lg:text-xl leading-[1.5]">
                    From tours and adventures to dining and relaxation, <br />
                    find everything you need for the perfect trip to Malta - all
                    <br />
                    in one place
                  </p>
                </div>
                <HeroCarousel className="pt-12 md:pt-6" />
              </div>
              <HeroSearch className="lg:absolute right-32 top-20 my-12  " />
              <div className="flex flex-col md:flex-row lg:absolute justify-center gap-6">
                <HappyCustomers />
                <ListingEveryDay />
              </div>
            </div>
          </div>
          {/* Discover Malta Best Experiences */}
          {/* <DiscoverMalta /> */}
          {/* Categories Search */}
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
