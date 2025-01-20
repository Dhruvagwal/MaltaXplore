"use client";
import React, { useState } from "react";

import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import useFirebase from "@/hooks/use-firebase";

import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useContactDetails } from "@/context/contactDetailsContext";
import { useAddress } from "@/context/addressContext";
import { useBooking } from "@/context/bookingContext";
import { useAuthState } from "@/context/ueAuthContext";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { cardSchema } from "@/lib/schema";
import { ClockAlert } from "lucide-react";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { supabase } from "@/supabaseConfig";
//payment page
const PaymentDetailsPage = ({
  clientSecret,
  paymentIntentId,
  tourData,
  finalPrice
}) => {
  const { session, user } = useAuthState();

  const router = useRouter();
  const { id } = router.query;
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    watch,
  } = useCustomForm({
    schema: cardSchema,
  });

  const {
    crud: { writeData },
  } = useFirebase();

  const { adults, child, totalPrice, date } = useBooking();
  const { contactDetails, userId } = useContactDetails();
  const {
    pickupLocation,
    city,
    state,
    postalCode,
    addLine1,
    addLine2,
  } = useAddress();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !user || !clientSecret || !stripe || !elements || isProcessing) {
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
            payment_intent_id: paymentIntentId,
            created_by: user?.id,
            pickup_location: pickupLocation,
            city,
            address_line_1: addLine1,
            address_line_2: addLine2,
            state,
            postal_code: postalCode,
            country: "india",
          },
        ])
        .select();

      if (response.status === 201) {
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
            return_url: `http://localhost:3000/complete?bookingId=${bookingId}`,
          },
        });

        if (error) {
          console.log(error.message);
        }
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
                {" "}
                <Card className="">
                  <Accordion type="single" collapsible className="">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="py-0 px-4 hover:no-underline">
                        <div className="flex justify-start">
                          Credit/Debit Card{" "}
                          <img src="https://static.tacdn.com/img2/solutions/shoppingcart/cc_AMEX_icon_no_bg.svg"></img>
                          <img src="https://static.tacdn.com/img2/solutions/shoppingcart/cc_Visa_icon_no_bg.svg"></img>
                          <img src="https://static.tacdn.com/img2/solutions/shoppingcart/cc_Mastercard_icon_no_bg.svg"></img>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 mt-6">
                        <PaymentElement id="payment-element" />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
              <div className="flex flex-col justify-center items-center mt-12">
                <div className="text-2xl font-semibold">
                  Total Price: ${finalPrice}
                </div>
                <div className="flex justify-center items-center text-base gap-2 font-medium">
                  <ClockAlert size={16} /> {tourData?.cancellation_policy}
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

              <div className="flex justify-center">
                <Button
                  variant="destructive"
                  className="bg-[#f1b203] text-black font-semibold text-base w-3/5 h-12 
            rounded-full"
                  id="submit"
                  disabled={!stripe || !elements || isProcessing}
                  // onClick={handleSubmit}
                >
                  {isProcessing ? "Processing..." : "Complete Booking"}
                </Button>
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

export default PaymentDetailsPage;
