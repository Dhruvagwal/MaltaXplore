import React from "react";
import { motion } from "framer-motion";
import { HappyCustomers } from "@/components/Home/happy-customer";
import { ListingEveryDay } from "@/components/Home/listing-everyday";
import { HeroSearch } from "@/components/Home/hero-search";
import Weather from "@/components/Home/Weather";
import { search } from "@/data/link";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

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

const HeroSection = ({ serviceBookingPersons, services }) => {
  return (
    <div className="relative lg:px-20">
      {/* Left Content */}
      <div className="w-full space-y-6 md:space-y-8">
        <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center px-8 lg:px-0">
          <div>
            <p className="font-semibold text-lg md:text-xl text-primary">
              Discover Malta In One Place
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-6xl leading-[1.2] md:leading-[1.3] font-bold">
              Discover Malta's
              <br />
              Best Experiences
            </h1>
          </div>
          <div>
            <p className="text-base md:text-lg lg:text-xl leading-[1.5] max-w-2xl">
              From tours and adventures to dining and relaxation, find
              everything you need for the perfect trip to Malta - all in one
              place
            </p>
            <br />
            <br />
            <Button
              asChild
              className="w-48 h-12 flex gap-2 text-base md:text-lg rounded-lg"
            >
              <Link
                href={{
                  pathname: search,
                }}
              >
                <span>Start Your Journey</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* underimage */}
        <div className="relative py-8 lg:py-6 px-8 lg:px-0">
          <Image
            width={1920}
            height={1080}
            className="max-lg:absolute max-lg:inset-0 w-full h-full object-cover rounded-xl z-[-1]"
            src={"/image.png"}
            alt="Banner background"
            priority
          />
          {/* search and weather */}
          <div className="flex flex-col-reverse md:flex-row gap-8 lg:gap-0 ">
            <div className="lg:absolute lg:top-56 lg:left-16 lg:inset-x-0 lg:max-w-lg">
              <HeroSearch className="transform-gpu" />
            </div>
            <div className="w-full flex flex-col md:flex-row lg:justify-end lg:items-end gap-4 md:gap-6 md:hidden">
              <div>
                <HappyCustomers
                  serviceBookingPersons={serviceBookingPersons?.length}
                />
              </div>
              <div>
                <ListingEveryDay services={services} />
              </div>
            </div>
            <div className="lg:absolute lg:top-1/2 lg:right-12 lg:transform lg:-translate-y-1/2">
              <Weather className="max-w-sm" />
            </div>
          </div>
        </div>

        {/* data card */}
        <div className="w-full flex flex-col md:flex-row lg:justify-end lg:items-end gap-4 md:gap-6 max-md:hidden">
          <div>
            <HappyCustomers
              serviceBookingPersons={serviceBookingPersons?.length}
            />
          </div>
          <div>
            <ListingEveryDay services={services} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

{
  /* <div className="relative px-20">
<motion.div
  initial="initial"
  animate="animate"
  variants={staggerContainer}
  className="w-full flex flex-col lg:flex-row justify-between items-start"
>
  {/* Left Content */
}
//   <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
//     <motion.div
//       className="space-y-4 md:space-y-6"
//       variants={staggerContainer}
//     >
//       <motion.p
//         variants={fadeInUp}
//         className="font-semibold text-lg md:text-xl text-primary"
//       >
//         Discover Malta In One Place
//       </motion.p>
//       <motion.h1
//         variants={fadeInUp}
//         className="text-4xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.3] font-bold"
//       >
//         Discover Malta's
//         <br />
//         Best Experiences
//       </motion.h1>
//       <motion.p
//         variants={fadeInUp}
//         className="text-base md:text-lg lg:text-xl leading-[1.5] max-w-2xl"
//       >
//         From tours and adventures to dining and relaxation, find
//         everything you need for the perfect trip to Malta - all in one
//         place
//       </motion.p>
//     </motion.div>

{
  /* Search Section */
}
{
  /* <motion.div variants={fadeInUp} className="w-full max-w-4xl">
      <HeroSearch className="transform-gpu" />
    </motion.div> */
}

{
  /* Stats Section */
}
{
  /* <motion.div
      variants={fadeInUp}
      className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4 md:pt-8"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <HappyCustomers
          serviceBookingPersons={serviceBookingPersons?.length}
        />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ListingEveryDay services={services} />
      </motion.div>
    </motion.div>
  </div> */
}

{
  /* Right Content - Weather */
}
//   <motion.div
//     variants={{
//       initial: { x: 100, opacity: 0 },
//       animate: { x: 0, opacity: 1 },
//       transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
//     }}
//   >
//     <Weather className="max-w-sm" />
//   </motion.div>
// </motion.div>
// </div> */}

// <div className="lg:relative py-6">
//   <Image
//     width={1920}
//     height={1080}
//     className="w-full h-full object-cover rounded-xl max-lg:hidden"
//     src={"/image.png"}
//     alt="Banner background"
//     priority
//   />
//   {/* search and weather */}
//   <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-0">
//     <div className="lg:absolute lg:top-56 lg:left-16 lg:inset-x-0 max-w-lg">
//       <HeroSearch className="transform-gpu" />
//     </div>

//     <div className="lg:absolute lg:top-1/2 lg:right-12 lg:transform lg:-translate-y-1/2">
//       <Weather className="max-w-sm" />
//     </div>
//   </div>
// </div>
