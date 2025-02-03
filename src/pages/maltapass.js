"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Reviews from "@/components/cui/review";
import { River } from "@/components/cui/river";
import { MapPin, Gift, Calendar } from "lucide-react";
import Tilt from "react-parallax-tilt";

const reviews = [
  {
    id: 1,
    name: "Sarah Thompson",
    rating: 5,
    comment:
      "The MaltaPass was the best investment for our trip! We saved so much money and got to see all the major attractions without any hassle. The skip-the-line feature was especially helpful during peak hours.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    date: "December 15, 2023",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    comment:
      "Great value for money! We used the pass for museums, boat tours, and historical sites. The only minor issue was that some attractions required advance booking.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    date: "December 10, 2023",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    rating: 5,
    comment:
      "Absolutely fantastic! The digital pass was so convenient, and the included audio guides really enhanced our experience at the historical sites. Would highly recommend!",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    date: "December 5, 2023",
  },
];

function maltapass() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const discountBadgeAnimation = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.3
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="relative bg-[#E5484D] mx-4 md:mx-8 lg:mx-20 rounded-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2 items-center">
            {/* Left Content */}
            <motion.div 
              variants={slideIn}
              className="text-white space-y-4 md:space-y-6 p-8 md:p-12 lg:p-16 xl:pl-24 relative z-10"
            >
              <motion.span 
                variants={fadeInUp}
                className="text-sm md:text-base font-medium inline-block"
              >
                MaltaPass
              </motion.span>
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Unlock the Best of
                <br /> Malta with One Pass
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-base md:text-lg opacity-90 max-w-xl"
              >
                The MaltaPass is your ultimate key to discovering Malta's rich
                history, stunning landscapes, and vibrant culture—all while saving
                money and making your journey hassle-free.
              </motion.p>
            </motion.div>

            {/* Right Content with Image and Discount Badge */}
            <motion.div 
              variants={scaleIn}
              className="relative h-full min-h-[300px] md:min-h-[500px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="/images/metapasshero.svg"
                  alt="Malta Harbor"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              {/* Animated Discount Badge */}
              <motion.div
                variants={discountBadgeAnimation}
                whileHover={{ scale: 1.1 }}
                className="absolute right-4 top-4 md:right-[85%] md:top-[25%] w-[120px] h-[120px] md:w-[180px] md:h-[180px] bg-white rounded-full flex flex-col items-center justify-center text-[#E5484D] font-bold shadow-lg"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-4xl md:text-7xl leading-none"
                >
                  30%
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs md:text-sm mt-1"
                >
                  UP TO OFF
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated gradient overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/10 to-transparent"
          />
        </motion.section>

        {/* What is MaltaPass Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16 md:py-24"
        >
          <div className="mx-auto md:mx-20 max-md:px-8">
            <motion.div 
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div 
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="place-items-center"
              >
                <img src="/group.png" className="w-full h-full" alt="Group" />
              </motion.div>

              <motion.div 
                variants={slideIn}
                className="max-md:mx-8 space-y-8"
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold"
                >
                  What is the MaltaPass?
                </motion.h2>
                <p className="text-gray-600">
                  The MaltaPass is an all-inclusive travel pass designed to
                  offer you:
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-[#E5484D]" />
                    <div>
                      <h3 className="font-semibold">
                        Free or Discounted Entry
                      </h3>
                      <p className="text-gray-600">
                        to top attractions and experiences.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Gift className="w-6 h-6 text-[#E5484D]" />
                    <div>
                      <h3 className="font-semibold">Exclusive Deals</h3>
                      <p className="text-gray-600">
                        at restaurants, shops, and activities.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Calendar className="w-6 h-6 text-[#E5484D]" />
                    <div>
                      <h3 className="font-semibold">Easy Planning</h3>
                      <p className="text-gray-600">
                        with access to a curated list of the best places to
                        visit.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Whether you're in Malta for a day or an entire week, the
                  MaltaPass ensures you enjoy everything the island has to offer
                  without overspending.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Overview Section */}
        <section className="py-16 md:py-24 bg-[#FFF1F2]">
          {/* <div className="container mx-auto px-4"> */}
          <div className="mx-8 md:mx-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Overview of Benefits
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why Choose MaltaPass?
              </h3>
              <p className="text-gray-600">
                The MaltaPass offers unmatched convenience, savings, and access,
                making it the ultimate travel companion for exploring Malta.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-6">
                      Save Money on Top Attractions
                    </h3>
                    <p className="mb-4">
                      With the MaltaPass, you'll enjoy free entry or significant
                      discounts at Malta's most popular and must-see
                      destinations, including:
                    </p>
                    <div className="space-y-6">
                      {[
                        {
                          number: "01",
                          title: "Historic Sites:",
                          description:
                            "The Hypogeum, St. John's Co-Cathedral, and Hagar Qim Temples.",
                        },
                        {
                          number: "02",
                          title: "UNESCO World Heritage Locations:",
                          description:
                            "Gain access to sites like the Megalithic Temples and the ancient city of Mdina.",
                        },
                        {
                          number: "03",
                          title: "Museums:",
                          description:
                            "Save on admission to the National Museum of Archaeology, Malta Maritime Museum, and many more.",
                        },
                      ].map((item) => (
                        <div key={item.number} className="flex gap-4">
                          <span className="text-4xl font-bold text-gray-200">
                            {item.number}
                          </span>
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-6">
                      Dining Discounts
                    </h3>
                    <p className="mb-4">
                      Taste the flavors of Malta while saving on dining
                      experiences:
                    </p>
                    <div className="space-y-6">
                      {[
                        {
                          number: "01",
                          title: "Exclusive Restaurant Offers:",
                          description:
                            "Enjoy up to 20% off at a curated list of Malta's top-rated restaurants and cafes.",
                        },
                        {
                          number: "02",
                          title: "Food Tours:",
                          description:
                            "Discounts on guided food and wine tours to experience Malta's culinary heritage.",
                        },
                        {
                          number: "03",
                          title: "Local Markets and Shops:",
                          description:
                            "Save on souvenirs, artisanal products, and gourmet treats.",
                        },
                      ].map((item) => (
                        <div key={item.number} className="flex gap-4">
                          <span className="text-4xl font-bold text-gray-200">
                            {item.number}
                          </span>
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* Pass Options Section */}
        <section className="py-16 md:py-24">
          {/* <div className="container mx-auto px-4"> */}
          <div className="mx-8 md:mx-32 md:px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Choose the Pass That Fits Your Trip
            </h2>
            <p className="text-center mb-16 text-gray-600">
              Whether you're planning a quick getaway or a leisurely vacation,
              the MaltaPass offers flexible options to suit every itinerary.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {/* 1-Day Pass */}
              <Card className="flex flex-col h-full">
                <CardContent className="flex-1 flex flex-col p-4">
                  {" "}
                  <img
                    src="/church.png"
                    width={600}
                    height={400}
                    alt="Malta Church"
                    className="w-full object-cover rounded-lg"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold">1-Day Pass</h3>
                      <span className="text-2xl font-bold">$2500</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Perfect for short visits or day-trippers looking to make
                      the most of a limited schedule.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-semibold">What's Included:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>
                          • Access to a curated selection of Malta's top
                          attractions.
                        </li>
                        <li>• Discounts at popular restaurants and cafes.</li>
                        <li>
                          • Free entry or discounts on select guided tours, such
                          as harbor cruises or historical walking tours.
                        </li>
                        <li>
                          • Transportation savings, including free use of key
                          public transport routes for the day.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold">Who It's For:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>
                          • Day-travelers or cruise visitors who want a packed
                          day of sightseeing.
                        </li>
                        <li>
                          • Travelers with a tight schedule who prefer the
                          highlights.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-auto p-6">
                    <Button className="w-full bg-[#E5484D] hover:bg-[#E5484D]/90">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 1-Week Pass */}
              <Card className="flex flex-col h-full">
                <CardContent className="flex-1 flex flex-col p-4">
                  <img
                    src="/coast-line.png"
                    width={600}
                    height={450}
                    alt="Malta Coastline"
                    className="w-full object-cover rounded-lg"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold">1-Week Pass</h3>
                      <span className="text-2xl font-bold">$2500</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Designed for longer stays, giving you the freedom to
                      explore at a relaxed pace while maximizing value.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-semibold">What's Included:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>
                          • Unlimited access to all included attractions, tours,
                          and activities.
                        </li>
                        <li>
                          • Extended dining and shopping discounts throughout
                          your trip.
                        </li>
                        <li>
                          • Additional savings on outdoor adventures like
                          diving, kayaking, and cultural workshops.
                        </li>
                        <li>
                          • Discounts on car rentals or weekly transport
                          options, ideal for reaching Malta's hidden gems.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold">Who It's For:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>
                          • Families, couples, or solo travelers on a vacation.
                        </li>
                        <li>
                          • Those who want to immerse themselves in Malta's
                          everything without rushing.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-auto p-6">
                    <Button className="w-full bg-[#E5484D] hover:bg-[#E5484D]/90">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <Reviews
          title="What Pass Holders Say"
          subtitle="Discover why travelers love using MaltaPass for their adventures"
          reviews={reviews}
        />

        {/* CTA Section */}
        {/* <section className="relative h-[500px] flex items-center justify-center text-white mx-8 md:mx-32">
          <img
            src="https://s3-alpha-sig.figma.com/img/5191/7d17/b9ffd59f31132d2e75ac2ba73e001f7c?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NMxJOqWiGg0mx~T-kZB6M3WqsR-HJFTZkrfUofgyJva0mWM~4CwLynp2wpfOTd~v1nSBiXej-Cov~a0xfeGn6vzoPlY5HsTlr1YppYu~KOR~enqW3YKGDwNJprh8syzrGjpYqVde3nEjLgvjYFRpqZYCl2xmnbrTJFwnPWIGsgx7sHKmhY8-6jgCCIq3-q0UR35VWobYORmw3cg6sniP~Y~isZTM1~f4P2eUZOdwbxPK48QartJvpXO5ULP~ffmo~lYkNDBxhNF-p-opfE~ROHl~7id6u6z3bIUGW6xNpKk9VTyyG3YT3f0QVjuAxZp6tpjG72pDkc1-Q6xnYJeK7w__"
            alt="Malta Seascape"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
           <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl md:text-5xl font-bold">
              Ready to Experience Malta Like Never Before?
            </h2>
            <p className="text-lg opacity-90">
              Start exploring now and book the best tours, activities, and
              dining experiences on the island.
            </p>
            <Button size="lg" className="bg-[#E5484D] hover:bg-[#E5484D]/90">
              Get Malta Pass Now
            </Button>
          </div>
        </section> */}
        <River />
      </main>
    </div>
  );
}

export default maltapass;
