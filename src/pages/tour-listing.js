"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  MapPin,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Reviews from "@/components/cui/review";

const reviews = [
  {
    id: 1,
    name: "David Wilson",
    rating: 5,
    comment:
      "The guided tour of Valletta was incredible! Our guide was knowledgeable and passionate about Malta's history. The small group size made it very personal and engaging.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    date: "December 18, 2023",
  },
  {
    id: 2,
    name: "Sofia Martinez",
    rating: 5,
    comment:
      "The Blue Grotto boat tour was breathtaking! The water was crystal clear and the caves were stunning. The tour guides were very professional and made sure everyone was comfortable.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    date: "December 12, 2023",
  },
  {
    id: 3,
    name: "James Parker",
    rating: 4,
    comment:
      "Great experience at the ancient temples! The audio guide was very informative, and the sites were well-preserved. Would have loved a bit more time at each location though.",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    date: "December 8, 2023",
  },
];

function TourismPage() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section without 3D Tilt */}
      {/* <div className="pt-16 md:pt-24 container mx-auto px-4"> */}
      <div className="md:pt-24 mx-8 md:mx-32 md:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
          Explore Malta's Ancient Wonders
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Large main image */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-full">
            <img
              src={"./hero-1.jpg"}
              alt="Malta Ancient Ruins"
              className="w-full h-[300px] sm:h-[350px] md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Right side images */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src={"./hero-2.png"}
              alt="Malta City"
              className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="grid grid-rows-2 gap-3 md:gap-4">
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={"./hero-3.png"}
                alt="Malta Coast"
                className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={"./hero-4.jpg"}
                alt="Malta Architecture"
                className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-[#E5484D] text-[#E5484D]"
                />
              ))}
              <span className="ml-2 text-sm sm:text-base text-gray-600">
                5 (235 review)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">
                Dar Merhba Bik, 130, Triq Birbal, BZN 1708, Malta
              </span>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FFE4E5] text-[#E5484D] transition-all duration-300">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FFE4E5] text-[#E5484D] transition-all duration-300">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      {/* <section className="container mx-auto px-4 py-12"> */}
      <section className="mx-8 md:mx-32 md:px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About Destination</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Discover the timeless beauty and historical depth of Malta, a
                Mediterranean gem teeming with ancient marvels and captivating
                stories. From the awe-inspiring megalithic temples that predate
                the Egyptian pyramids, to the storied fortresses that have
                defended Malta for centuries, this island nation offers a
                journey through time like no other.
              </p>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Megalithic Temples:
                  </h3>
                  <p>
                    Visit the Ġgantija Temples on Gozo, one of the world's
                    oldest freestanding structures, recognized as a UNESCO World
                    Heritage site.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Mdina - The Silent City:
                  </h3>
                  <p>
                    Explore this ancient walled city, where quiet, winding
                    streets and medieval architecture transport you back in
                    time.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Stunning Fortifications:
                  </h3>
                  <p>
                    Tour the iconic fortresses of Valletta, including the
                    Grandmaster's Palace and Fort St. Elmo, testaments to
                    Malta's storied past.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader className="bg-[#E5484D] text-white rounded-t-lg">
                <CardTitle className="text-3xl">€550.00</CardTitle>
                <p className="text-white/90">per person</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Check In
                    </label>
                    <Select defaultValue="nov-4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nov-4">November 4, 2024</SelectItem>
                        <SelectItem value="nov-5">November 5, 2024</SelectItem>
                        <SelectItem value="nov-6">November 6, 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Adults
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="hover:bg-[#FFE4E5] hover:text-[#E5484D] transition-colors"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setAdults(adults + 1)}
                        className="hover:bg-[#FFE4E5] hover:text-[#E5484D] transition-colors"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Children
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="hover:bg-[#FFE4E5] hover:text-[#E5484D] transition-colors"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setChildren(children + 1)}
                        className="hover:bg-[#FFE4E5] hover:text-[#E5484D] transition-colors"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Total</span>
                    <span className="font-bold">
                      €{550 * (adults + children * 0.5)}.00
                    </span>
                  </div>
                  <Button className="w-full bg-[#E5484D] hover:bg-[#E5484D]/90 text-white transition-all duration-300 transform hover:scale-[1.02]">
                    Book Now
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    <button className="text-black hover:underline transition-all duration-300">
                      Contact us for more details
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-24 bg-white">
        {/* <div className="container mx-auto px-4"> */}
        <div className="mx-8 md:mx-32 md:px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {["./g1.png", "./g2.png", "./g3.png"].map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>

          {/* Last two images in full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {["./g4.png", "./g5.png"].map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 4}`}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews
        heading={"What Our Guests Are Saying"}
        title="Tour Experiences"
        subtitle="Hear what our guests have to say about their unforgettable Malta tours"
        reviews={reviews}
      />

      {/* Top Picks */}
      <section className="py-12 md:py-24 bg-white">
        {/* <div className="container px-4 mx-auto"> */}
        <div className="px-4 md:mx-32">
          <div className="max-md:mx-8 flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Top Picks for Your
              <br />
              Maltese Adventure
            </h2>
            <p className="text-gray-600 md:max-w-md text-lg">
              Start with our most popular experiences and tours—perfect for
              getting the most out of Malta.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out">
              {[
                {
                  title: "Explore Malta's Ancient Wonders",
                  description:
                    "From UNESCO World Heritage sites to hidden catacombs, explore Malta's rich history with our guided tours.",
                  price: "$500",
                  image: "./a1.jpg",
                },
                {
                  title: "Luxury Yacht Charters",
                  description:
                    "Sail the Mediterranean in style. Enjoy breathtaking views, exclusive access to hidden coves, and VIP service.",
                  price: "$500",
                  image: "./a2.png",
                },
                {
                  title: "Dine by the Sea - Seaside Restaurants",
                  description:
                    "Taste authentic Maltese cuisine at our top seaside restaurants. From fresh seafood to local delicacies, you'll love the view as much as the food.",
                  price: "$500",
                  image: "./a3.png",
                },
                {
                  title: "Scuba Diving Adventures",
                  description:
                    "Dive into the crystal-clear waters of the Mediterranean. Perfect for beginners and experienced divers alike.",
                  price: "$500",
                  image: "./a4.png",
                },
              ].map((pick, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentSlide
                      ? "w-full md:w-[40%] px-4"
                      : "hidden md:block md:w-[20%] px-2"
                  }`}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
                    <div className="relative overflow-hidden">
                      <img
                        src={pick.image}
                        alt={pick.title}
                        className={`w-full object-cover ${
                          index === currentSlide
                            ? "h-[300px] md:h-[500px]"
                            : "h-[200px] md:h-[300px]"
                        }`}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">
                          Restaurant & More Info
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3
                          className={`font-bold text-gray-900 ${
                            index === currentSlide
                              ? "text-xl md:text-2xl"
                              : "text-lg"
                          }`}
                        >
                          {pick.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            Starting at:
                          </div>
                          <div className="text-[#E5484D] font-bold text-xl">
                            {pick.price}
                          </div>
                        </div>
                      </div>
                      <p
                        className={`text-gray-600 mb-6 ${
                          index === currentSlide ? "text-base" : "text-sm"
                        }`}
                      >
                        {pick.description}
                      </p>
                      <Button className="w-full bg-[#E5484D] text-white hover:bg-[#E5484D]/90 transform hover:-translate-y-1 transition-all duration-300">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#E5484D]"
              onClick={() => {
                setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 3));
              }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#E5484D]"
              onClick={() => {
                setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 0));
              }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-4 md:gap-8 mt-8 md:mt-12">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              0{currentSlide + 1}
            </span>
            <div className="h-[2px] w-20 md:w-32 bg-gray-200">
              <div
                className="h-full bg-[#E5484D]"
                style={{ width: `${((currentSlide + 1) / 4) * 100}%` }}
              />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-gray-400">
              04
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TourismPage;
