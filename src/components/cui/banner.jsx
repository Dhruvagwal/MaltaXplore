import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function Banner({ url, children }) {
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="mx-4 sm:mx-8 md:mx-20 relative rounded-xl overflow-hidden shadow-lg"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Background Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/30 z-10"
        variants={overlayVariants}
      />

      {/* Image Container */}
      <motion.div
        className="w-full h-full"
        variants={imageVariants}
      >
        <Image
          width={1920}
          height={1080}
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          src={url}
          alt="Banner background"
          priority
        />
      </motion.div>

      {/* Content Container */}
      <motion.div 
        className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Banner;
