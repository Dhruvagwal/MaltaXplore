"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ClockAlert,
  Wallet,
  ChevronRight,
  LockKeyhole,
  Headphones,
  Phone,
  Info,
} from "lucide-react";
import { HoverCardComponent } from "@/components/cui/hover-card";
import { useBooking } from "@/context/bookingContext";
import { format } from "date-fns";
import { formatDate } from "@/utils/date";
import { currency } from "@/data/currency";
import { MoreOffersComponent } from "../cui/more-promo-code";

function BookingDetailCard() {
  const {
    tourData,
    startDate,
    endDate,
    adults,
    child,
    basePrice,
    taxesAndFees,
    discountAmount,
    finalPrice,
  } = useBooking();
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-8 ">
      <Card className="mt-20 w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex-1 text-base">
                {tourData?.name}
              </CardTitle>
              <CardDescription className="py-2">
                by{" "}
                <span className="underline">
                  {tourData?.supplieraccess?.name}
                </span>{" "}
              </CardDescription>
              <CardDescription className="pt-2 text-base">
                {tourData?.location}{" "}
              </CardDescription>
            </div>
            <img
              src={
                JSON.parse(tourData?.images?.[0] ?? "{}")?.url ??
                `https://picsum.photos/500/400?random=${1}`
              }
              alt="Description of the image"
              className="w-28 h-28 object-cover rounded-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="" />
          <div className="flex justify-between items-center text-sm my-4">
            <span className="text-muted-foreground">Start Date</span>
            <span>{formatDate(startDate)}</span>
          </div>
          <div className="flex justify-between items-center text-sm my-4">
            <span className="text-muted-foreground">End Date</span>
            <span>{formatDate(endDate)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Travellers</span>
            <span>
              {adults} Adults {child > 0 && `+ ${child} Children`}
            </span>
          </div>
          <Separator className="my-4" />

          <div className="flex justify-center items-center text-base gap-2">
            <HoverCardComponent
              title={"Cancellation Policy"}
              heading={"Cancellation Policy"}
              data={tourData?.cancellation_policy}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-[#E5484D] text-white rounded-b-xl flex flex-col justify-between py-8 font-semibold">
          <div className="flex justify-between items-center w-full">
            <span className="text-white/90">Base Price</span>
            <span className="text-white/90">
              {currency.sign}
              {basePrice}
            </span>
          </div>

          <div className="flex justify-between items-center w-full mt-2">
            <span className="text-white/90 flex justify-center items-center">
              Taxes and Fees{" "}
              <HoverCardComponent
                title={<Info size={16} color="white" />}
                heading={"Taxes and Fees"}
                data={"Disclaier: This includes transaction taxes"}
              />
            </span>
            <span className="text-white/90">
              +{currency.sign}
              {taxesAndFees}
            </span>
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <span className="text-white/90 flex items-center gap-2">
              Discount
              <MoreOffersComponent />
            </span>
            <span className="text-white/90">
              - {currency.sign}
              {discountAmount}
            </span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center w-full">
            <span className="text-white/90">Total</span>
            <span className="text-white/90">
              {currency.sign}
              {finalPrice}
            </span>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Book with confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="space-y-4 my-4">
            {[
              {
                icon: <Wallet />,
                title: "Lowest price guarantee",
                description: "Find it cheaper? We'll refund the difference",
              },
              {
                icon: <LockKeyhole />,
                title: "Privacy protection",
                description: "We use SSL encryption to keep your data secure",
              },
              {
                icon: <Headphones />,
                title: "24/7 global support",
                description: "Get the answers you need, when you need them",
              },
              {
                icon: <Phone />,
                title: "Give us a call",
                description: "We’d be happy to help you out with your booking",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-start items-center gap-x-4"
              >
                {item.icon}
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Call Now: 0000000000
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingDetailCard;
