import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { maltapass } from "@/data/link";
import { motion } from "framer-motion";

const MaltaPass = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const textHoverVariants = {
    hover: {
      x: 10,
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-24 md:my-48 relative px-4 sm:px-8 md:px-0"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={imageVariants.hover}
        viewport={{ once: true }}
        className="relative"
      >
        <Image
          src="/images/maltapass.svg"
          className="w-full hidden md:block object-cover"
          width={1000}
          height={1000}
          alt="Malta Pass background"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content Section */}
      <motion.div 
        variants={itemVariants}
        className="md:absolute top-0 md:top-20 right-0 p-6 sm:p-8 md:p-16 lg:p-32 w-full md:w-[60%] lg:w-[50%] text-white max-md:bg-[#E03737] max-md:rounded-lg"
      >
        <motion.div 
          className="space-y-6 md:space-y-8"
          variants={containerVariants}
        >
          <motion.p 
            variants={textHoverVariants}
            whileHover="hover"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.5] font-bold"
          >
            <motion.span
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              Maltapass – Explore <br />
              More, Pay Less
            </motion.span>
          </motion.p>
          
          <motion.p 
            variants={textHoverVariants}
            whileHover="hover"
            className="text-xl sm:text-2xl md:text-3xl"
          >
            Introducing Maltapass – Exclusive Discounts for Your Stay
          </motion.p>
          
          <motion.p 
            variants={textHoverVariants}
            whileHover="hover"
            className="text-base sm:text-lg md:text-xl max-w-2xl"
          >
            Unlock free discounts on top attractions, dining, and more with
            Maltapass. Available for 1-day or 1-week, it's the perfect way to save
            while you explore.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="secondary" 
              asChild 
              className="p-6 md:p-8 text-lg relative overflow-hidden group"
            >
              <Link href={maltapass}>
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Get My Maltapass
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MaltaPass;
