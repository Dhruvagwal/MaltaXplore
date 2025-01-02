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
  Check,
  Minus,
  User,
  Clock5,
} from "lucide-react";
import Reviews from "@/components/cui/review";
import { TopPicks } from ".././index";
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import ReviewsPage from "@/components/cui/reviews-page";

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

const CARD_DATA = [
  {
    id: 1,
    image: "",
    title: "Explore Malta’s Ancient Wonders",
    description:
      "From UNESCO World Heritage sites to hidden catacombs, explore Malta’s rich history with our guided tours.",
  },
  {
    id: 2,
    image: "",
    title: "Luxury Yacht Charters",
    description:
      "Sail the Mediterranean in style. Enjoy breathtaking views, exclusive access to hidden coves, and VIP service.",
  },
  {
    id: 3,
    image: "",
    title: "Dine by the Sea",
    description:
      "Taste authentic Maltese cuisine at our top seaside restaurants. From fresh seafood to local delicacies...",
  },
  {
    id: 4,
    image: "",
    title: "Scuba Diving Adventures",
    description:
      "Dive into the deep blue and discover Malta’s underwater treasures. Perfect for beginners and seasoned divers.",
  },
];

function TourismPage() {
  const router = useRouter();
  const { id } = router.query;

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const tourData = CARD_DATA.find((item) => item.id === parseInt(id));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section without 3D Tilt */}
      {/* <div className="pt-16 md:pt-24 container mx-auto px-4"> */}
      <div className="md:pt-24 mx-8 md:mx-32 md:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
          {tourData?.title}{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Large main image */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-full">
            <img
              src={"/hero-1.jpg"}
              alt="Malta Ancient Ruins"
              className="w-full h-[300px] sm:h-[350px] md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Right side images */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src={"/hero-2.png"}
              alt="Malta City"
              className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="grid grid-rows-2 gap-3 md:gap-4">
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={"/hero-3.png"}
                alt="Malta Coast"
                className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={"/hero-4.jpg"}
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
            <div>
              <h2 className="text-3xl font-bold">
                About {tourData?.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 py-12 gap-4">
                <div className="flex gap-2">
                  <Clock5 className="text-[#e03837]" />
                  <p>Nov 16 - 20</p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <Clock5 className="text-[#e03837]" />
                  <p>10 Person</p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <Clock5 className="text-[#e03837]" />
                  <p>Free Wifi</p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <Clock5 className="text-[#e03837]" />
                  <p>Pickup</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p>
                  Discover the timeless beauty and historical depth of Malta, a
                  Mediterranean gem teeming with ancient marvels and captivating
                  stories. From the awe-inspiring megalithic temples that
                  predate the Egyptian pyramids, to the storied fortresses that
                  have defended Malta for centuries, this island nation offers a
                  journey through time like no other.
                </p>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Megalithic Temples:
                    </h3>
                    <p>
                      Visit the Ġgantija Temples on Gozo, one of the world's
                      oldest freestanding structures, recognized as a UNESCO
                      World Heritage site.
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

            <Separator className="my-10" />

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Special Benefit
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                  <span className="text-gray-600">
                    Discover the timeless beauty and historical depth of Malta
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                  <span className="text-gray-600">
                    Discover the timeless beauty and historical depth of Malta
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                  <span className="text-gray-600">
                    Discover the timeless beauty and historical depth of Malta
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                  <span className="text-gray-600">
                    Discover the timeless beauty and historical depth of Malta
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                  <span className="text-gray-600">
                    Discover the timeless beauty and historical depth of Malta
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                What Includes/Exclude
              </h2>
              <div className="flex flex-col md:flex-row gap-16">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />{" "}
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />{" "}
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />{" "}
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />{" "}
                    <span className="text-gray-600">Discover the timeless</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            <div>
              <ReviewsPage />
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
            {["/g1.png", "/g2.png", "/g3.png"].map((image, index) => (
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
            {["/g4.png", "/g5.png"].map((image, index) => (
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
      {/* <Reviews
        heading={"What Our Guests Are Saying"}
        title="Tour Experiences"
        subtitle="Hear what our guests have to say about their unforgettable Malta tours"
        reviews={reviews}
      /> */}

      {/* Top Picks */}
      <TopPicks />
    </main>
  );
}

export default TourismPage;
