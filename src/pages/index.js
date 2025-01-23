import React from "react";
import Reviews from "@/components/cui/review";
import { River } from "@/components/cui/river";
import { Categories } from "@/components/cui/category";
import PhoneFeatures from "@/components/Home/phoneFeatures";
import TopPicks from "@/components/Home/topPicks";
import Iteneray from "@/components/Home/itenerary";
import Events from "@/components/Home/events";
import MaltaPass from "@/components/Home/maltaPass";
import MadeSimple from "@/components/Home/madeSimple";
import CCategories from "@/components/Home/cCategories";
import DiscoverMalta from "@/components/Home/discoverMalta";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-br from-primary-foreground to-transparent">
        {/* <Navbar /> */}
        <main className="lg:relative pt-16">
          {/* Discover Malta Best Experiences */}
          <DiscoverMalta />
          {/* Categories Search */}
          <Categories className="max-md:w-[80%]" />
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
