"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { StepperComponent } from "@/components/ui/stepper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactDetailsPage from "@/components/Bookings/contact-detail";
import ActivityDetailsPage from "@/components/Bookings/activity-detail";
import PaymentDetailsPage from "@/components/Bookings/paymentDetails";
import { useBooking } from "@/context/bookingContext";
import { useContactDetails } from "@/context/contactDetailsContext";
import {
  ClockAlert,
  Wallet,
  ChevronRight,
  LockKeyhole,
  Headphones,
  Phone,
  Info,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useServicesState } from "@/context/servicesContext";
import { useAuthState } from "@/context/ueAuthContext";
import { HoverCardComponent } from "@/components/cui/hover-card";
import { getTaxRate } from "@/features/getTaxAndRate";

const stripePromise = loadStripe(process.env.NEXT_PUBLISHABLE_KEY);

const BookingPage = () => {
  const { user } = useAuthState();
  const router = useRouter();
  const { id, adults, child, startDate, endDate } = router.query;
  const { services } = useServicesState();
  // const { discountedPrice } = useBooking();
  console.log(adults, child, startDate, endDate);

  const [activeStep, setActiveStep] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const tourData = services.find((service) => service.id === id);
  const totalPrice = tourData?.price * (adults + child / 2);

  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        const taxAndRate = await getTaxRate();
        if (taxAndRate && taxAndRate.length > 0) {
          setTaxRate(taxAndRate[0].tax_rate / 100);
        }
        console.log("Fetched tax rate:", taxAndRate);
      } catch (error) {
        console.error("Error fetching tax rate:", error);
      }
    };

    fetchTaxRate();
  }, []);
  const basePrice = Number(totalPrice);
  const taxesAndFees = basePrice * taxRate;
  const discountAmount =
     basePrice - Number()

  const finalPrice =

  useEffect(() => {
    if (activeStep === 1 && totalPrice > 0 && user.email) {
      const fetchClientSecret = async () => {
        const response = await axios.post("/api/create-payment-intent", {
          amount: finalPrice * 100,
          currency: "usd",
          email: user?.email,
        });
        console.log(response);
        setPaymentIntentId(response?.data?.paymentIntent?.id);
        setClientSecret(response?.data?.clientSecret);
      };
      fetchClientSecret();
    }
  }, [activeStep]);

  const nextStep = () => {
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="md:pt-12">
      <StepperComponent
        activeStep={activeStep}
        nextStep={nextStep}
        setActiveStep={setActiveStep}
      />

      <Separator className="mt-8" />
      <div className="min-h-screen bg-white max-w-7xl mx-8 md:mx-24 xl:mx-48">
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
            {activeStep === 0 && <ContactDetailsPage nextStep={nextStep} />}
            {activeStep === 1 && <ActivityDetailsPage nextStep={nextStep} />}
            {activeStep === 2 && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentDetailsPage
                  nextStep={nextStep}
                  clientSecret={clientSecret}
                  paymentIntentId={paymentIntentId}
                  tourData={tourData}
                  finalPrice={finalPrice.toFixed(2)}
                  taxRate={taxRate}
                  discountAmount={discountAmount}
                />
              </Elements>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-8 place-self-center ">
            <Card className="mt-20 w-full sm:w-[400px]">
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
                    src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-360x240/07/ae/17/80.jpg"
                    alt="Description of the image"
                    className="w-28 h-28 object-cover rounded-md"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="" />
                <div className="flex justify-between items-center text-sm my-4">
                  <span className="text-muted-foreground">Start Date</span>
                  <span>{startDate?.toString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm my-4">
                  <span className="text-muted-foreground">End Date</span>
                  <span>{endDate?.toString()}</span>
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
                  <span className="text-white/90">${basePrice}</span>
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
                    +${taxesAndFees}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <span className="text-white/90">Discount </span>
                  <span className="text-white/90">
                    - ${discountAmount}
                  </span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center w-full">
                  <span className="text-white/90">Total</span>
                  <span className="text-white/90">
                    ${finalPrice}
                  </span>
                </div>
              </CardFooter>
            </Card>

            <Card className="w-full sm:w-[400px]">
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
                      description:
                        "Find it cheaper? We'll refund the difference",
                    },
                    {
                      icon: <LockKeyhole />,
                      title: "Privacy protection",
                      description:
                        "We use SSL encryption to keep your data secure",
                    },
                    {
                      icon: <Headphones />,
                      title: "24/7 global support",
                      description:
                        "Get the answers you need, when you need them",
                    },
                    {
                      icon: <Phone />,
                      title: "Give us a call",
                      description:
                        "We’d be happy to help you out with your booking",
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
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
