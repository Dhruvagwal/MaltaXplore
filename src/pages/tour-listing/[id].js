"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  Feather,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { getUserLikes } from "@/features/getUserLikes";
import { useService } from "@/features/getServiceById";
import BookingCard from "@/components/Bookings/booking-card";
import { useServiceReviews } from "@/features/reviews/getServiceReviews";

function TourismPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, session, setSession, setUser } = useAuthState();
  const { likeService, unlikeService } = useServicesState();
  const [isLiked, setIsLiked] = useState(false);
  const { data: service, isLoading, isError } = useService(id);
  const {
    data: allReviews,
    isLoadingReviews,
    isErrorReviews,
  } = useServiceReviews(id);

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

  if (isLoading) {
    return (
      <div className="space-y-2 px-32">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-6 w-[70%]" />
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-white">
      <div className="md:pt-24 mx-8 md:mx-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
          {service?.name}{" "}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          {service?.images?.map((image, index) => {
            const parsedImage = JSON.parse(image);
            {
            }
            if (index === 0) {
              return (
                <div
                  key={index}
                  className="md:col-span-2 relative group overflow-hidden rounded-2xl h-full"
                >
                  <img
                    src={parsedImage.url}
                    alt={parsedImage.name}
                    className="w-full h-[300px] sm:h-[350px] md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
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
                  <img
                    src={parsedImage.url}
                    alt={parsedImage.name}
                    className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
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
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
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
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
              <Button
                variant="outline"
                className={cn(
                  "rounded-full w-10 h-10 p-0 text-primary bg-[#FFE4E5] hover:bg-[#FFE4E5]"
                )}
                onClick={handleLikesbutton}
              >
                <Heart className={cn(isLiked && "fill-primary text-primary")} />
              </Button>
            </div>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FFE4E5] text-[#E5484D] transition-all duration-300">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      {/* <section className="container mx-auto px-4 py-12"> */}
      <section className="mx-8 md:mx-20 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-3xl font-bold">About {service?.name}</h2>

              <div className="flex flex-wrap gap-4 py-4">
                {service?.features?.map((f, index) => (
                  <div className="flex p-2 px-4 rounded-full text-sm bg-primary-foreground w-fit gap-2">
                    <Feather className="text-primary h-4 w-4" />
                    <p>{f}</p>
                  </div>
                ))}
              </div>

              <p className="break-words">{service?.description}</p>
            </div>

            <Separator className="my-10" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Special Benefit
              </h2>
              <div className="space-y-4">
                {service?.special_benefits?.map((benefit, index) => (
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
                What Includes/Exclude
              </h2>

              <div className="flex flex-col md:flex-row gap-16">
                <div className="space-y-4">
                  {service?.includes.map((item, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      <Check className="h-5 w-5 bg-green-500 text-white rounded-full p-1" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {service?.excludes.map((item, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      <Minus className="h-5 w-5 bg-red-500 text-white rounded-full p-1" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Separator className="my-10" />
            {allReviews?.length > 0 && (
              <ReviewsPage serviceId={id} allReviews={allReviews} />
            )}
          </div>

          <BookingCard service={service} isLoading={isLoading} />
        </div>
      </section>
      <TopPicks />
    </main>
  );
}

export default TourismPage;
