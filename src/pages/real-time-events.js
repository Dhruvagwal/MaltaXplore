import Banner from "@/components/cui/banner";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import React from "react";

function RealTimeEvents() {
  return (
    <div className="from-primary-foreground to-transparent">
      <Navbar />
      <main className="pt-16">
        {/* Banner */}
        <Banner url="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
          <p className="text-3xl font-bold text-white">Real Time Events</p>
        </Banner>
      </main>
    </div>
  );
}

export default RealTimeEvents;
