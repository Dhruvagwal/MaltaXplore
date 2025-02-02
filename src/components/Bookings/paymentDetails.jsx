"use client";
import React, { useEffect, useState } from "react";

import useCustomForm from "@/hooks/use-custom-form";
import { toast, useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { useContactDetails } from "@/context/contactDetailsContext";
import { useAddress } from "@/context/addressContext";
import { useBooking } from "@/context/bookingContext";
import { useAuthState } from "@/context/ueAuthContext";

import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";

import { cardSchema } from "@/lib/schema";
import { useRouter } from "next/router";
import { supabase } from "@/supabaseConfig";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);

//payment page
const PaymentDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuthState();
  const { userId } = useContactDetails();
  const { pickupLocation, city, state, postalCode, addLine1, addLine2 } =
    useAddress();
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    paymentIntentId,
    tourData,
    finalPrice,
    taxRate,
    discountAmount,
    totalPrice,
    startDate,
    endDate,
    clientSecret,
  } = useBooking();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !clientSecret || !stripe || !elements || isProcessing) {
      console.error("Stripe.js or clientSecret has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await supabase
        .from("servicebookings")
        .insert([
          {
            service_id: id,
            supplier_id: tourData?.supplier_access_id,
            payment_status: false,
            status: "failed",
            payment_intent_id: paymentIntentId,
            created_by: user?.id,
            pickup_location: pickupLocation,
            city,
            address_line_1: addLine1,
            address_line_2: addLine2,
            state,
            postal_code: postalCode,
            country: "india",
            start_date: new Date(startDate),
            end_date: new Date(endDate),
            service_base_price: totalPrice,
            fees: taxRate,
            discount_amount: discountAmount,
          },
        ])
        .select();

      console.log(response);
      if (response.status !== 201) {
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: "Payment Failed, try again",
        });
        return;
      }

      const bookingId = response?.data[0]?.id;

      const serviceBookingPersons = [
        ...userId.map((user) => ({
          user_id: user,
          service_id: id,
          supplier_id: tourData?.supplier_access_id,
          booking_id: bookingId,
        })),
        {
          user_id: user?.id,
          service_id: id,
          supplier_id: tourData?.supplier_access_id,
          booking_id: bookingId,
        },
      ];

      const res = await supabase
        .from("servicebookingperson")
        .insert(serviceBookingPersons)
        .select();

      console.log("Service Booking Persons Added:", res);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/complete?bookingId=${bookingId}`,
        },
      });

      if (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.error(error?.message || "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {clientSecret && stripe && (
        <form className="w-full" id="payment-form" onSubmit={handleSubmit}>
          {" "}
          <div className="col-span-2">
            <p className="text-3xl font-semibold my-8">Payment Details</p>

            <div className="my-6">
              <p className="text-base font-medium my-2">Pay with:</p>
              <div>
                <PaymentElement id="payment-element" />
              </div>
              <div className="flex flex-col mt-4">
                <div className="text-2xl flex items-center justify-between">
                  <span> Total Price: €{finalPrice}</span>
                  <Button
                    variant="destructive"
                    className="bg-[#f1b203] text-black font-semibold text-base w-3/5 h-12 rounded-full"
                    id="submit"
                    disabled={!stripe || !elements || isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Complete Booking"}
                  </Button>
                </div>
                <p className="text-sm my-4">
                  By clicking "Complete Booking", you acknowledge that you have
                  read and are bound by
                  <span>
                    MaltaXplore's Terms & Privacy and Cookies Statement;
                    Viator's Terms;
                  </span>{" "}
                  plus the tour operator's rules & regulations (see listing for
                  more details).
                </p>
              </div>

              <p className="text-sm my-4">
                Your booking is facilitated by MaltaXplore, but a third-party
                tour operator provides the tour/activity directly to you.
              </p>
              <p className="text-sm my-4">
                Your statement will list MaltaXplore as the merchant for this
                transaction
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const PaymentDetailsPage = ({ nextStep = () => {} }) => {
  const { clientSecret } = useBooking();
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentDetails nextStep={nextStep} />
    </Elements>
  );
};

export default PaymentDetailsPage;
