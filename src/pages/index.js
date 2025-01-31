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
import { motion } from "framer-motion";
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
import Weather from "@/components/Home/Weather";

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-br from-primary-foreground to-transparent">
        <main className="relative pt-16">
          <div className="min-h-[100vh] relative">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="w-full flex flex-col lg:flex-row justify-between items-start px-4 md:px-8 lg:px-12"
            >
              {/* Left Content */}
              <div className="w-full lg:w-2/3 space-y-6 md:space-y-8 pt-8 md:pt-12">
                <motion.div 
                  className="space-y-4 md:space-y-6"
                  variants={staggerContainer}
                >
                  <motion.p 
                    variants={fadeInUp}
                    className="font-semibold text-lg md:text-xl text-primary"
                  >
                    Discover Malta In One Place
                  </motion.p>
                  <motion.h1 
                    variants={fadeInUp}
                    className="text-4xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.3] font-bold"
                  >
                    Discover Malta's<br />
                    Best Experiences
                  </motion.h1>
                  <motion.p 
                    variants={fadeInUp}
                    className="text-base md:text-lg lg:text-xl leading-[1.5] max-w-2xl"
                  >
                    From tours and adventures to dining and relaxation,
                    find everything you need for the perfect trip to Malta - all
                    in one place
                  </motion.p>
                </motion.div>

                {/* Search Section */}
                <motion.div 
                  variants={fadeInUp}
                  className="w-full max-w-4xl"
                >
                  <HeroSearch className="transform-gpu" />
                </motion.div>

                {/* Stats Section */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4 md:pt-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <HappyCustomers />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ListingEveryDay />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Content - Weather */}
              <motion.div 
                variants={{
                  initial: { x: 100, opacity: 0 },
                  animate: { x: 0, opacity: 1 },
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
                }}
                className="w-full lg:w-1/3 mt-8 lg:mt-0"
              >
                <Weather className="max-w-sm mx-auto lg:ml-auto" />
              </motion.div>
            </motion.div>
          </div>

          {/* Rest of the sections */}
          <PhoneFeatures />
          <TopPicks />
          <CCategories />
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
