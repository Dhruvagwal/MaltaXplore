import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";

const Iteneray = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-24 md:my-48 px-4 sm:px-8 md:px-16 lg:px-20"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-64 justify-between items-start md:items-center"
      >
        <motion.p
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px rgb(255,255,255)",
            transition: { type: "spring", stiffness: 300 },
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        >
          Create Your Own Perfect Itinerary
        </motion.p>
        <motion.p
          whileHover={{
            x: 10,
            transition: { type: "spring", stiffness: 200 },
          }}
          className="text-lg md:text-xl md:text-right max-w-xl"
        >
          Customize your trip based on what you love. Whether you're an
          adventure-seeker, a foodie, or a culture enthusiast, we'll help you
          craft the perfect experience.
        </motion.p>
      </motion.div>

      {/* Main Content Section */}
      <motion.div variants={itemVariants} className="relative mt-8 md:mt-16">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="w-full"
        >
          <Image
            src="/images/iteneray_back.svg"
            className="w-full max-md:hidden object-cover"
            width={2000}
            height={2000}
            alt="Itinerary background"
          />
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          className="md:absolute top-0 left-0 w-full p-6 sm:p-8 md:p-16 md:pr-0 max-md:bg-[#E03737] max-md:rounded-lg"
        >
          <div className="flex flex-col md:flex-row w-full justify-between gap-8 md:gap-16">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl shrink-0 font-semibold leading-[1.5] text-white">
              Based on your preferences,
              <br /> we'll suggest experiences you'll <br />
              love, from sightseeing tours <br />
              to gourmet restaurants.
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:mt-[-2rem] shrink-0 md:text-right font-bold leading-[1.5]">
              Don't know <br />
              where to start?{" "}
            </p>
          </div>
          <div>
            <Button
              variant="secondary"
              className="p-6 md:p-8 mt-8 md:mt-40 md:px-16 md:ml-4 max-md:w-full text-lg relative overflow-hidden group"
              size="lg"
            >
              <span className="absolute inset-0 bg-white/20" />
              Start Exploring
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Iteneray;
