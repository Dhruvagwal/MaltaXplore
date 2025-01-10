"use client";

import { useState, useEffect } from "react";
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
import { get, ref } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { contactUs, booking } from "@/data/link";
import Link from "next/link";
import { useBooking } from "@/context/bookingContext";

async function fetchDataFromRealtimeDB() {
  try {
    const snapshot = await get(ref(db, "services"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log("No data available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Realtime DB data:", error);
    return [];
  }
}

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
  const router = useRouter();
  const { id } = router.query;
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const {
    adults,
    setAdults,
    child,
    setChild,
    totalPrice,
    setTotalPrice,
    date,
    setDate,
  } = useBooking();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const fetchedData = await fetchDataFromRealtimeDB();
        // Extract all services into a flat array
        const allServices = Object.keys(fetchedData || {}).reduce(
          (acc, categoryKey) => {
            const subCategories = fetchedData[categoryKey];
            if (subCategories) {
              Object.keys(subCategories || {}).forEach((subCategoryKey) => {
                const subCategoryData = subCategories[subCategoryKey];
                if (subCategoryData) {
                  Object.keys(subCategoryData || {}).forEach((itemKey) => {
                    const item = subCategoryData[itemKey];
                    if (item) acc.push(item);
                  });
                }
              });
            }
            return acc;
          },
          []
        );

        setServices(allServices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  const tourData = services.find((service) => service.id === id);
  useEffect(() => {
    if (tourData?.price) {
      const calculatedPrice = tourData.price * (adults + child * 0.5);
      setTotalPrice(calculatedPrice);
    }
  }, [tourData, adults, child]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section without 3D Tilt */}
      {/* <div className="pt-16 md:pt-24 container mx-auto px-4"> */}
      <div className="md:pt-24 mx-8 md:mx-32 md:px-4">
        {isLoading ? (
          <div className="space-y-2 mb-6 md:mb-8">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            {tourData?.title}{" "}
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Large main image */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-full">
            {isLoading ? (
              <Skeleton className="w-full h-[300px] sm:h-[350px] md:h-full" />
            ) : (
              <>
                <img
                  src={"/hero-1.jpg"}
                  alt="Malta Ancient Ruins"
                  className="w-full h-[300px] sm:h-[350px] md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
          </div>

          {/* Right side images */}
          <div className="relative group overflow-hidden rounded-2xl">
            {isLoading ? (
              <Skeleton className="w-full h-[140px] sm:h-[165px] md:h-full" />
            ) : (
              <>
                <img
                  src={"/hero-2.png"}
                  alt="Malta City"
                  className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
          </div>
          <div className="grid grid-rows-2 gap-3 md:gap-4">
            <div className="relative group overflow-hidden rounded-2xl">
              {isLoading ? (
                <Skeleton className="w-full h-[140px] sm:h-[165px] md:h-full" />
              ) : (
                <>
                  <img
                    src={"/hero-3.png"}
                    alt="Malta Coast"
                    className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </>
              )}
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
            {isLoading ? (
              <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-40 sm:w-60" />
                </div>
              </div>
            ) : (
              <>
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
                  <span className="line-clamp-1">{tourData?.location}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            {isLoading ? (
              <>
                <Skeleton className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
                <Skeleton className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
              </>
            ) : (
              <>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FFE4E5] text-[#E5484D] transition-all duration-300">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FFE4E5] text-[#E5484D] transition-all duration-300">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      {/* <section className="container mx-auto px-4 py-12"> */}
      <section className="mx-8 md:mx-32 md:px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div>
              {isLoading ? (
                <>
                  <div className="space-y-2 mb-6 md:mb-8">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>

                  {[...Array(tourData?.features?.length || 0)].map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 md:grid-cols-4 my-4 py-8 gap-4 bg-primary-foreground px-4"
                    >
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold">
                    About {tourData?.title}
                  </h2>

                  {tourData?.features?.map((f, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 md:grid-cols-4 my-4 py-8 gap-4 bg-primary-foreground px-4"
                    >
                      <div className="flex gap-2">
                        <Clock5 className="text-[#e03837]" />
                        <p>{f}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="prose prose-lg max-w-none">
                {isLoading ? (
                  <div className="prose prose-lg max-w-none">
                    <Skeleton className="h-6 w-[60%]" />

                    <Skeleton className="h-4 w-full mt-4" />

                    <div className="mt-8 space-y-6">
                      <div>
                        <Skeleton className="h-6 w-[60%]" />
                        <Skeleton className="h-4 w-full mt-2" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-[60%]" />
                        <Skeleton className="h-4 w-full mt-2" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-[60%]" />
                        <Skeleton className="h-4 w-full mt-2" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <p>{tourData?.description}</p>
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
                          streets and medieval architecture transport you back
                          in time.
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
                )}
              </div>
            </div>

            <Separator className="my-10" />

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {isLoading ? (
                  <Skeleton className="h-6 w-[250px]" />
                ) : (
                  "Special Benefit"
                )}
              </h2>

              <div className="space-y-4">
                {isLoading
                  ? [...Array(tourData?.specialBenefits?.length || 0)].map(
                      (_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      )
                    )
                  : tourData?.specialBenefits?.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-6 md:w-5 bg-green-500 text-white rounded-full p-1" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
              </div>
            </div>

            <Separator className="my-10" />

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {isLoading ? (
                  <Skeleton className="h-6 w-[250px]" />
                ) : (
                  "What Includes/Exclude"
                )}
              </h2>

              <div className="flex flex-col md:flex-row gap-16">
                <div className="space-y-4">
                  {isLoading
                    ? [
                        ...Array(
                          tourData?.includes?.filter((item) => item.isIncluded)
                            .length || 0
                        ),
                      ].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      ))
                    : tourData?.includes
                        ?.filter((item) => item.isIncluded)
                        .map((item) => (
                          <div
                            className="flex items-center gap-3"
                            key={item.id}
                          >
                            <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />
                            <span className="text-gray-600">{item.text}</span>
                          </div>
                        ))}
                </div>

                <div className="space-y-4">
                  {isLoading
                    ? [
                        ...Array(
                          tourData?.includes?.filter((item) => !item.isIncluded)
                            .length || 0
                        ),
                      ].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      ))
                    : tourData?.includes
                        ?.filter((item) => !item.isIncluded)
                        .map((item) => (
                          <div
                            className="flex items-center gap-3"
                            key={item.id}
                          >
                            <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />
                            <span className="text-gray-600">{item.text}</span>
                          </div>
                        ))}
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
                {isLoading ? (
                  <Skeleton className="h-10 w-[80px]" />
                ) : (
                  <CardTitle className="text-3xl">${tourData?.price}</CardTitle>
                )}
                <div className="text-white/90">
                  {isLoading ? (
                    <Skeleton className="h-4 w-[150px]" />
                  ) : (
                    "per person"
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {isLoading ? (
                        <Skeleton className="h-4 w-[60px]" />
                      ) : (
                        "Check In"
                      )}
                    </label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Select
                        defaultValue="nov-4"
                        onValueChange={(value) => setDate(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nov-4">
                            November 4, 2024
                          </SelectItem>
                          <SelectItem value="nov-5">
                            November 5, 2024
                          </SelectItem>
                          <SelectItem value="nov-6">
                            November 6, 2024
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {isLoading ? (
                        <Skeleton className="h-4 w-[60px]" />
                      ) : (
                        "Adults"
                      )}
                    </label>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </div>
                    ) : (
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
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {isLoading ? (
                        <Skeleton className="h-4 w-[60px]" />
                      ) : (
                        "Children"
                      )}
                    </label>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[40px]" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setChild(Math.max(0, child - 1))}
                          className="hover:bg-[#FFE4E5] hover:text-[#E5484D] transition-colors"
                        >
                          -
                        </Button>
                        <span className="w-12 text-center">{child}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setChild(child + 1)}
                          className="hover:bg-[#FFE4E5] hover:text-[#E5484D] transition-colors"
                        >
                          +
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  {isLoading ? (
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-4 w-[80px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  ) : (
                    <div className="flex justify-between mb-2">
                      <span>Total</span>
                      <span className="font-bold">€{totalPrice}.00</span>
                    </div>
                  )}

                  {isLoading ? (
                    <Skeleton className="h-12 w-full rounded-lg" />
                  ) : (
                    <Button className="w-full bg-[#E5484D] hover:bg-[#E5484D]/90 text-white transition-all duration-300 transform hover:scale-[1.02]">
                      <Link href={`${booking.replace("[id]", id)}`}>
                        Book Now
                      </Link>
                    </Button>
                  )}

                  <div className="text-center text-sm text-gray-500 mt-4">
                    {isLoading ? (
                      <Skeleton className="h-4 w-[250px]" />
                    ) : (
                      <Link
                        href={contactUs}
                        className="text-black hover:underline transition-all duration-300"
                      >
                        Contact us for more details
                      </Link>
                    )}
                  </div>
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
      <TopPicks services={services} loading={isLoading} />
    </main>
  );
}

export default TourismPage;
