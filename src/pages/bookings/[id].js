"use client";
import React, { useState } from "react";
import { StepperComponent } from "@/components/ui/stepper";
import ContactDetailsPage from "@/components/Bookings/contact-detail";
import ActivityDetailsPage from "@/components/Bookings/activity-detail";
import PaymentDetailsPage from "@/components/Bookings/paymentDetails";
import { BookingProvider, useBooking } from "@/context/bookingContext";
import { ChevronRight } from "lucide-react";
import BookingDetailCard from "@/components/Bookings/booking-detail-card";

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <BookingProvider>
      <div className="px-20 pt-12">
        <StepperComponent
          activeStep={activeStep}
          nextStep={nextStep}
          setActiveStep={setActiveStep}
        />
        <div>
          {activeStep === 1 && (
            <button
              className="flex items-center text-muted-foreground text-sm pl-0 hover:cursor-pointer hover:bg-none pt-4"
              onClick={() => setActiveStep(0)}
            >
              <ChevronRight size="14" /> Contact Details
            </button>
          )}
          {activeStep === 2 && (
            <div className="flex gap-2">
              <button
                className="flex items-center text-muted-foreground text-sm pl-0 hover:cursor-pointer hover:bg-none pt-4"
                onClick={() => setActiveStep(0)}
              >
                <ChevronRight size="14" /> Contact Details
              </button>
              <button
                className="flex items-center text-muted-foreground text-sm pl-0 hover:cursor-pointer hover:bg-none pt-4"
                onClick={prevStep}
              >
                <ChevronRight size="14" /> Address Details
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-24">
            <div className="col-span-1 md:col-span-2">
              {activeStep ===   0 && <ContactDetailsPage nextStep={nextStep} />}
              {activeStep === 1 && <ActivityDetailsPage nextStep={nextStep} />}
              {activeStep === 2 && <PaymentDetailsPage nextStep={nextStep} />}
            </div>
            <BookingDetailCard />
          </div>
        </div>
      </div>
    </BookingProvider>
  );
};

export default BookingPage;
