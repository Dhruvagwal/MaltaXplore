import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import { cancelBookingSchema } from "@/lib/schema";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateBookingStatus } from "@/features/updateBookingStatus";
import axios from "axios";

export const CancelBookingDialog = ({ bookingDetails }) => {
  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: cancelBookingSchema,
  });

  const handleCancelBooking = async (state) => {
    console.log("Booking ID:", bookingDetails?.id);

    try {
      const response = await axios.post("/api/refund", {
        paymentIntentId: bookingDetails?.payment_intent_id,
      });

      if (response.data && response.data.status === "succeeded") {
        console.log("Updating DB to cancelled!", bookingDetails?.id);

        const updatedBooking = await updateBookingStatus(bookingDetails?.id);

        const paymentData = {
          booking_id: bookingDetails?.id,
          user_id: bookingDetails?.created_by,
          supplier_id: bookingDetails?.supplier_id,
          service_id: bookingDetails?.service_id,
          amount: bookingDetails?.service_base_price,
          payment_intent_id: bookingDetails?.payment_intent_id,
          message: state?.message,
          done_by: user?.id,
        };

        const { data, error } = await supabase
          .from("payments")
          .insert([paymentData]);

        console.log(error);

        console.log(
          "Booking successfully cancelled! and payments inserted",
          data
        );
      }
    } catch (error) {
      console.error(
        "Error occurred during refund:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <Button variant=""> Cancel Booking</Button>
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl">Cancel Booking</DialogTitle>
          </DialogHeader>
          <FormWrapper
            className="flex flex-col gap-6"
            onSubmit={handleCancelBooking}
            onError={onError}
          >
            <div className="space-y-2">
              <FormInput
                id="message"
                title="Message"
                placeholder="Type message"
                required
              />
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" variant={"default"}>
                Cancel{" "}
              </Button>
            </DialogFooter>
          </FormWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
};
