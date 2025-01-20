"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewSection = ({ heading, allReviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + allReviews.length) % allReviews.length
    );
  };

  return (
    <section className="py-12 md:py-16 md:px-4">
      <div className="max-w-7xl mx-8 md:mx-auto">
        {/* Title and Navigation */}
        <div className="md:flex md:justify-between items-center mb-12 md:mb-20 space-y-8 md:space-y-0 ">
          <h2 className="text-4xl max-md:text-center font-bold">{heading}</h2>
          <div className="flex gap-8 md:gap-2 max-md:justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full w-10 h-10 border-2"
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full w-10 h-10 border-2 text-red-500 border-red-500 hover:bg-red-50"
            >
              →
            </Button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16">
          {[-1, 0, 1].map((offset) => {
            const index =
              (currentIndex + offset + allReviews.length) % allReviews.length;
            const review = allReviews[index];
            const isActive = offset === 0;

            return (
              <div
                key={review?.id}
                className={`bg-white p-8 rounded-2xl ${
                  isActive
                    ? "ring-2 ring-red-500 md:scale-125 md:z-10"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-4xl text-gray-300 font-serif">"</span>
                  <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star,i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          star <= review?.rating
                            ? "fill-red-500 text-red-500"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{review?.description}</p>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={review?.user?.avatar}
                      alt={review?.user?.name}
                    />
                    <AvatarFallback>
                      {" "}
                      {review?.users.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold"> {review?.users.name}</h3>
                    <p className="text-sm text-gray-500">{review?.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Read More Button */}
        <div className="text-center mt-12 md:mt-20">
          <Button
            variant="default"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded"
          >
            <Link href={"/reviews"}>Read More Reviews</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
