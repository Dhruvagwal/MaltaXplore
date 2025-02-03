"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { useBooking } from "@/context/bookingContext";
import { getUserFromDatabase } from "@/features/getUser";
import addUserToDatabase from "@/features/addUser";
import { useAuthState } from "@/context/ueAuthContext";
import { useRouter } from "next/router";
import { contactUs, booking } from "@/data/link";
import { useToast } from "@/hooks/use-toast";
import useCustomForm from "@/hooks/use-custom-form";
import { bookingSchema } from "@/lib/schema";
import { currency } from "@/data/currency";
import { useEffect, useState } from "react";

const Count = ({ onUpdate, count, heading }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{heading}</label>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onUpdate(Math.max(0, count - 1))}
          className="hover:bg-primary-foreground hover:text-primary transition-colors"
        >
          -
        </Button>
        <span className="w-12 text-center">{count}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onUpdate(count + 1)}
          className="hover:bg-primary-foreground hover:text-primary transition-colors"
        >
          +
        </Button>
      </div>
    </div>
  );
};

const BookingCard = ({ service, isLoading }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuthState();
  const { FormWrapper, FormDatePicker, setValue, watch } = useCustomForm({
    schema: bookingSchema,
    defaultValues: {
      adults: 1,
      child: 0,
    },
  });
  const [disabled, setIsDisabled] = useState(true);

  const adults = watch("adults");
  const child = watch("child");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    const pStartDate = new Date(startDate).getTime();
    const pEndDate = new Date(endDate).getTime();
    if (
      pStartDate > new Date().getTime() &&
      pStartDate < pEndDate &&
      adults >= 1
    ) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [startDate, endDate, adults]);

  const totalPrice = service?.price * (adults + child / 2);

  const onSubmit = (query) => {
    console.log(query);
    query.startDate = new Date(query.startDate).getTime();
    query.endDate = new Date(query.endDate).getTime();

    router.push({
      pathname: `/bookings/[id]`,
      query: {
        ...query,
        id: service?.id,
      },
    });
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  if (isLoading || !service) {
    return;
  }
  return (
    <div>
      <Card className="sticky top-24">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-3xl">
            {currency.sign}
            {service?.price}
          </CardTitle>
          <div className="text-white/90">per person</div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <FormWrapper
            className="flex flex-col gap-6"
            onSubmit={onSubmit}
            onError={onError}
          >
            <FormDatePicker
              placeholder="Start Date"
              required
              title={"Start Date"}
              id="startDate"
            />
            <FormDatePicker
              placeholder="End Date"
              required
              title={"End Date"}
              id="endDate"
            />
            <Count
              count={adults}
              heading={"Adults"}
              onUpdate={(count) => setValue("adults", count)}
            />
            <Count
              count={child}
              heading={"Childrens"}
              onUpdate={(count) => setValue("child", count)}
            />

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-bold">
                  {currency.sign}
                  {totalPrice}
                </span>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-[1.02]"
                disabled={disabled}
              >
                Book Now
              </Button>

              <div className="text-center text-sm text-gray-500 mt-4">
                <Link
                  href={contactUs}
                  className="text-black hover:underline transition-all duration-300"
                >
                  Contact us for more details
                </Link>
              </div>
            </div>
          </FormWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
