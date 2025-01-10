"use client";
import React, { useState, useEffect } from "react";
import useCustomForm from "@/hooks/use-custom-form";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { StepperComponent } from "@/components/ui/stepper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactDetailsPage from "@/components/cui/contact-detail";
import ActivityDetailsPage from "@/components/cui/activity-detail";
import {
  ClockAlert,
  Wallet,
  ChevronRight,
  LockKeyhole,
  Headphones,
  Phone,
} from "lucide-react";
import { months, countries } from "@/data/data";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { cardSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import useFirebase from "@/hooks/use-firebase";
import { useRouter } from "next/router";
import { useBooking } from "@/context/bookingContext";
import { useContactDetails } from "@/context/contactDetailsContext";
import { v4 } from "uuid";

const stripePromise = loadStripe(
  "pk_test_51QeatsDk75aWHW4POpFQMr6DEc6Vg8MNxdR0La3Q7QTNKm9ej2fgSYaZhhSpTTf93dav99IkTt6QuINLkfpaZrAI00wF7qXy50"
); // Use the publishable key

//payment page
const PaymentDetailsPage = ({
  nextStep,
  cancellationPolicy,
  clientSecret,
  paymentIntentId,
}) => {
  const { adults, child, totalPrice, date } = useBooking();
  const { fname, lname, email, phone, pickupLocation } = useContactDetails();

  const [isProcessing, setIsProcessing] = useState(false);

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

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!clientSecret || !stripe || !elements) {
  //     console.error("Stripe.js or clientSecret has not loaded yet.");
  //     return;
  //   }

  //   try {
  //     setIsProcessing(true);

  //     // Confirm the payment with Stripe
  //     const { error, paymentIntent } = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //         return_url: "http://localhost:3000/complete",
  //       },
  //     });

  //     if (error) {
  //       console.error("Error:", error);
  //       alert(`Payment failed: ${error.message}`);
  //       console.log("Error details:", error);
  //     }

  //     const finalData = {
  //       contactDetails: {
  //         fname,
  //         lname,
  //         email,
  //         phone,
  //       },
  //       activityDetails: {
  //         location: pickupLocation,
  //       },
  //       bookingDetails: {
  //         adults: adults,
  //         childrens: child,
  //         totalPrice: totalPrice,
  //         date: date,
  //       },
  //       bookingDate: new Date().toISOString(),
  //       transactionId: paymentIntent.id,
  //     };

  //     if (paymentIntent.status === "succeeded") {
  //       console.log(paymentIntent.status);
  //       await writeData(`/bookings/${v4()}`, finalData);
  //       console.log("Payment successful:", paymentIntent);
  //       alert("Payment successful!");
  //     }
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientSecret || !stripe || !elements || isProcessing) {
      console.error("Stripe.js or clientSecret has not loaded yet.");
      return;
    }

    setIsProcessing(true);
    try {
      const finalData = {
        contactDetails: {
          fname,
          lname,
          email,
          phone,
        },
        activityDetails: {
          location: pickupLocation,
        },
        bookingDetails: {
          adults: adults,
          childrens: child,
          totalPrice: totalPrice,
          date: date,
        },
        status: false,
        bookingDate: new Date().toISOString(),
        paymentIntentId: paymentIntentId,
      };

      await writeData(`/bookings/${v4()}`, finalData);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/complete",
        },
      });

      if (error) {
        console.log(error.message);
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      if (error?.message) {
        console.log(error.message);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  return (
    <div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2"> */}
      {clientSecret && stripe && (
        // <Elements options={{ clientSecret }} stripe={stripePromise}>
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
                        {/* <CardElement options={{ hidePostalCode: false }} /> */}
                        {/* {clientSecret && stripe && elements && ( */}
                        <PaymentElement id="payment-element" />
                        {/* )} */}
                        {/* <FormWrapper
                            className="flex flex-col gap-6"
                            // onSubmit={handleSubmit}
                            onError={onError}
                          > */}
                        {/* {[
                        {
                          id: "cardHolderName",
                          label: `Cardholder Name`,
                          placeholder: "Type card holder name",
                          type: "text",
                        },
                        {
                          id: "cardNum",
                          label: `Credit/debit card number`,
                          placeholder: "Type credit/debit card number",
                          type: "number",
                        },
                      ].map((input) => (
                        <div className="col-span-1 w-full md:w-3/4">
                          <FormInput
                            id={input.id}
                            title={input.label}
                            placeholder={input.placeholder}
                            required
                            className="h-12"
                          />
                        </div>
                      ))} */}
                        {/* <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                        <div className="col-span-1 md:col-span-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                            <FormSelect
                              id="expirationMonth"
                              options={months}
                              title="Expiration month"
                              placeholder="Select a month"
                              className="bg-white h-12"
                              required
                            />
                            <FormSelect
                              id="expirationYear"
                              title="Expiration year"
                              options={Array.from(
                                { length: 20 },
                                (_, index) => new Date().getFullYear() + index
                              ).map((year) => ({
                                value: year.toString(),
                                label: year.toString(),
                              }))}
                              placeholder="Select a year"
                              className="bg-white h-12"
                              required
                            />
                            <FormInput
                              id={"cvvCode"}
                              title={"CVC Code"}
                              placeholder={"Type cvc code"}
                              className="h-12"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-span-2">
                          {" "}
                          <FormSelect
                            id="country"
                            options={countries}
                            title="Country"
                            placeholder="Select a country"
                            className="bg-white h-12"
                            required
                          />
                        </div>

                        <FormInput
                          id={"postalZipCode"}
                          title={"Postal/Zip Code"}
                          placeholder={"Type Postal/Zip code"}
                          className="h-12 space-y-2"
                          required
                        />
                      </div> */}
                        {/* <button type="submit" disabled={!stripe || isProcessing}>
                        {isProcessing ? "Processing..." : "Pay Now"}
                      </button>{" "} */}
                        {/* </FormWrapper> */}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
              <div className="flex flex-col justify-center items-center mt-12">
                <div className="text-2xl font-semibold">
                  Total Price: ${totalPrice}
                </div>
                <div className="flex justify-center items-center text-base gap-2 font-medium">
                  <ClockAlert size={16} /> {cancellationPolicy}
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

// const finalData = {
//         contactDetails: {
//           fname,
//           lname,
//           email,
//           phone,
//         },
//         activityDetails: {
//           location: pickupLocation,
//         },
//         bookingDetails: {
//           adults: adults,
//           childrens: child,
//           totalPrice: totalPrice,
//           date: date,
//         },
//         bookingDate: new Date().toISOString(),
//         transactionId: paymentIntent.id,
//       };

//       if (paymentIntent.status === "succeeded") {
//         console.log(paymentIntent.status);
//         await writeData(`/bookings/${v4()}`, finalData);
//         console.log("Payment successful:", paymentIntent);
//         alert("Payment successful!");

//booking page
const BookingPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const {
    crud: { readData, writeData },
  } = useFirebase();

  const { fname, lname, email, phone, pickupLocation } = useContactDetails();
  const { adults, child, totalPrice, date } = useBooking();

  const [activeStep, setActiveStep] = useState(0);

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeStep === 1 && totalPrice > 0 && email) {
      const fetchClientSecret = async () => {
        const response = await axios.post("/api/create-payment-intent", {
          amount: totalPrice * 100,
          currency: "usd",
          email,
        });
        console.log("response", response);
        setPaymentIntentId(response?.data?.paymentIntent?.id);
        setClientSecret(response?.data?.clientSecret);
      };
      fetchClientSecret();
    }
  }, [activeStep]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const fetchedData = await readData("services");
        // Extract all services into a flat array
        const allServices = Object.keys(fetchedData || {}).reduce(
          (acc, categoryKey) => {
            const subCategories = fetchedData[categoryKey];
            if (subCategories) {
              Object.keys(subCategories || {}).forEach((subCategoryKey) => {
                const subCategoryData = subCategories[subCategoryKey];
                if (subCategoryData) {
                  Object.keys(subCategoryData || {}).forEach((itemKey) => {
                    const item = subCategoryData[itemKey];
                    if (item) acc.push(item);
                  });
                }
              });
            }
            return acc;
          },
          []
        );

        setServices(allServices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  const tourData = services.find((service) => service.id === id);

  console.log("tourData", tourData);

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
              <ChevronRight size="14" /> Activity Details
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
                  cancellationPolicy={tourData?.cancellationPolicy}
                  clientSecret={clientSecret}
                  paymentIntentId={paymentIntentId}
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
                      {tourData?.title}
                    </CardTitle>
                    <CardDescription className="py-2">
                      by{" "}
                      <span className="underline">
                        {tourData?.createdBy?.name}
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
                  <span className="text-muted-foreground">Date</span>
                  <span>{date}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Travellers</span>
                  <span>
                    {adults} Adults {child > 0 && `+ ${child} Children`}
                  </span>
                </div>
                <Separator className="my-4" />

                <div className="flex justify-center items-center text-base gap-2">
                  <ClockAlert size={16} /> {tourData?.cancellationPolicy}
                </div>
              </CardContent>
              <CardFooter className="bg-[#E5484D] text-white rounded-b-xl flex justify-between items-center py-8 font-semibold">
                <span className="text-white/90">Total</span>
                <span className="text-white/90">${totalPrice}</span>
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
