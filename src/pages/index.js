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
import { motion } from "framer-motion";
import { HappyCustomers } from "@/components/Home/happy-customer";
import { ListingEveryDay } from "@/components/Home/listing-everyday";
import { HeroSearch } from "@/components/Home/hero-search";
import Weather from "@/components/Home/Weather";
import useFetchServices from "@/features/getAllServices";
import useFetchServiceBookingPersons from "@/features/getAllBookingPerson";
import HeroSection from "@/components/Home/hero-section";

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const { data: services, isLoading } = useFetchServices();
  const { data: serviceBookingPersons } = useFetchServiceBookingPersons();

  return (
    <div>
      <div className="">
        <main className="relative pt-16">
          <HeroSection
            serviceBookingPersons={serviceBookingPersons}
            services={services}
          />

          {/* Rest of the sections */}
          <PhoneFeatures />
          <TopPicks
            heading={"Top Picks for Your Maltese Adventure"}
            services={services}
            isLoading={isLoading}
          />
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
