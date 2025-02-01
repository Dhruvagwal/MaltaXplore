"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DatePicker } from "@/components/ui/datepicker";
import { Separator } from "@/components/ui/separator";

import ReviewsPage from "@/components/cui/reviews-page";
import TopPicks from "@/components/Home/topPicks";

import { contactUs, booking } from "@/data/link";

import { useBooking } from "@/context/bookingContext";
import { useAuthState } from "@/context/ueAuthContext";
import { useServicesState } from "@/context/servicesContext";

import { cn } from "@/lib/utils";

import {
  Heart,
  MapPin,
  Share2,
  Star,
  X,
  Check,
  Minus,
  User,
  Clock5,
} from "lucide-react";
import { supabase } from "@/supabaseConfig";
import Tilt from "react-parallax-tilt";
import addUserToDatabase from "@/features/addUser";
import { getUserLikes } from "@/features/getUserLikes";
import { getServiceById } from "@/features/getServiceById";
import { getUserFromDatabase } from "@/features/getUser";

function TourismPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, session, setSession, setUser } = useAuthState();
  const { likeService, unlikeService } = useServicesState();
  const {
    adults,
    setAdults,
    child,
    setChild,
    totalPrice,
    setTotalPrice,
    date,
    setDate,
    endDate,
    setEndDate,
  } = useBooking();
  const [isLiked, setIsLiked] = useState(false);
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setIsLoading(true);

      try {
        const fetchedService = await getServiceById(id);
        setService(fetchedService);
      } catch (error) {
        console.error("Error fetching service:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  useEffect(() => {
    if (service?.price) {
      const calculatedPrice = service.price * (adults + child * 0.5);
      setTotalPrice(calculatedPrice);
    }
  }, [service, adults, child]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (service && user?.id) {
          const likesData = await getUserLikes(user?.id);

          if (likesData.length > 0) {
            const userLikes = likesData.some(
              (like) => like.service_id === service.id
            );

            setIsLiked(userLikes);
          } else {
            console.log("No likes data found for the user");
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, service]);

  const handleDateChange = (selectedDate) => {
    const formattedDate = new Date(selectedDate);

    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");

    const formattedDateString = `${year}-${month}-${day}`;

    setDate(formattedDateString);
  };

  const handleEndDateChange = (selectedDate) => {
    const formattedDate = new Date(selectedDate);

    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");

    const formattedDateString = `${year}-${month}-${day}`;

    setEndDate(formattedDateString);
  };

  const handleLikesbutton = async () => {
    try {
      if (isLiked) {
        await unlikeService(service, user.id);
        setIsLiked(false);
      } else {
        await likeService(service, user.id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };
  const handleBookNowButton = () => {
    const selectedDate = new Date(date);
    const currentDate = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (isNaN(selectedDate.getTime())) {
      return;
    }
    if (selectedDate < currentDate) {
      return;
    }
    if (session) {
      if (session?.user) {
        addUserToDatabase(session.user);
        const fetchUserData = async () => {
          const user = await getUserFromDatabase(session?.user.id);
          if (user) {
            setUser(user);
          }
        };
        fetchUserData();
      }

      router.push(`${booking.replace("[id]", id)}`);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="md:pt-24 mx-8 md:mx-20">
        {isLoading ? (
          <div className="space-y-2 mb-6 md:mb-8">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            {service?.name}{" "}
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {service?.images?.map((image, index) => {
            const parsedImage = JSON.parse(image);
            {
              /* Large main image */
            }
            if (index === 0) {
              // Large main image (first image)
              return (
                <div
                  key={index}
                  className="md:col-span-2 relative group overflow-hidden rounded-2xl h-full"
                >
                  {isLoading ? (
                    <Skeleton className="w-full h-[300px] sm:h-[350px] md:h-full" />
                  ) : (
                    <>
                      <img
                        src={parsedImage.url}
                        alt={parsedImage.name}
                        className="w-full h-[300px] sm:h-[350px] md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </>
                  )}
                </div>
              );
            }
            if (index === 1) {
              // Large main image (first image)
              return (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-2xl"
                >
                  {isLoading ? (
                    <Skeleton className="w-full h-[140px] sm:h-[165px] md:h-full" />
                  ) : (
                    <>
                      <img
                        src={parsedImage.url}
                        alt="Malta City"
                        className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </>
                  )}
                </div>
              );
            }

            {
              /* Right side images */
            }

            if (index === 2) {
              return (
                <div
                  key="right-images"
                  className="grid grid-rows-2 gap-3 md:gap-4 h-full"
                >
                  {[2, 3].map((i) => {
                    const img = JSON.parse(service?.images[i] || "{}"); // Handle possible undefined
                    return (
                      <div
                        key={i}
                        className="relative group overflow-hidden rounded-2xl"
                      >
                        {isLoading ? (
                          <Skeleton className="w-full h-[140px] sm:h-[165px] md:h-full" />
                        ) : (
                          <>
                            <img
                              src={img.url}
                              alt={img.name}
                              className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }

            return null; // Skip rendering for any additional images
          })}
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
                  <span className="line-clamp-1">{service?.location}</span>
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                  <Button
                    variant="outline"
                    className={cn(
                      "rounded-full w-10 h-10 p-0 text-primary bg-[#FFE4E5] hover:bg-[#FFE4E5]"
                    )}
                    onClick={handleLikesbutton}
                  >
                    <Heart
                      className={cn(isLiked && "fill-primary text-primary")}
                    />
                  </Button>
                </div>
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
      <section className="mx-8 md:mx-20 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div>
              {isLoading ? (
                <>
                  <div className="space-y-2 mb-6 md:mb-8">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>

                  {[...Array(service?.features?.length || 0)].map((_, i) => (
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
                  <h2 className="text-3xl font-bold">About {service?.name}</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 my-4 py-8 md:gap-4 bg-primary-foreground px-4 rounded-lg">
                    {service?.features?.map((f, index) => (
                      <div className="flex gap-2">
                        <Clock5 className="text-[#e03837]" />
                        <p>{f}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
                  ? [...Array(service?.specialBenefits?.length || 0)].map(
                      (_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      )
                    )
                  : service?.special_benefits?.map((benefit, index) => (
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
                    ? [...Array(service?.includes?.length || 0)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      ))
                    : service?.includes.map((item, index) => (
                        <div className="flex items-center gap-3" key={index}>
                          <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                </div>

                <div className="space-y-4">
                  {isLoading
                    ? [...Array(service?.excludes?.length || 0)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      ))
                    : service?.excludes.map((item, index) => (
                        <div className="flex items-center gap-3" key={index}>
                          <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            <ReviewsPage serviceId={id} />
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader className="bg-[#E5484D] text-white rounded-t-lg">
                {isLoading ? (
                  <Skeleton className="h-10 w-[80px]" />
                ) : (
                  <CardTitle className="text-3xl">${service?.price}</CardTitle>
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
                        "Start Date"
                      )}
                    </label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <DatePicker date={date} setDate={handleDateChange} />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {isLoading ? (
                        <Skeleton className="h-4 w-[60px]" />
                      ) : (
                        "End Date"
                      )}
                    </label>
                    {isLoading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <DatePicker
                        date={endDate}
                        setDate={handleEndDateChange}
                      />
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
                    <Button
                      className="w-full bg-[#E5484D] hover:bg-[#E5484D]/90 text-white transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={handleBookNowButton}
                    >
                      Book Now
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
        <div className="mx-8 md:mx-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {["/g1.png", "/g2.png", "/g3.png"].map((image, index) => (
              <div
                key={index}
                className="relative group rounded-2xl cursor-pointer"
              >
                <Tilt>
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-[300px] object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                </Tilt>
              </div>
            ))}
          </div>

          {/* Last two images in full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {["/g4.png", "/g5.png"].map((image, index) => (
              <div
                key={index}
                className="relative group rounded-2xl cursor-pointer"
              >
                <Tilt>
                  <img
                    src={image}
                    alt={`Gallery ${index + 4}`}
                    className="w-full h-[400px] object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TopPicks />
    </main>
  );
}

export default TourismPage;
