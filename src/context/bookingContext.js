import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "./ueAuthContext";
import { useService } from "@/features/getServiceById";
import { getTaxRate, useTaxRate } from "@/features/getTaxAndRate";

const BookingContext = createContext();

// Custom hook to access the context
export const useBooking = () => {
  return useContext(BookingContext);
};

// Provider component
export const BookingProvider = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthState();
  const {
    id,
    adults: sadults,
    child: schild,
    startDate,
    endDate,
  } = router.query;

  const { data: taxRate } = useTaxRate();
  const { data: tourData } = useService(id);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const adults = sadults ? Number(sadults) : 1;
  const child = schild ? Number(schild) : 0;

  const totalPrice = tourData?.price * (adults + child / 2);

  const basePrice = Number(totalPrice);
  const taxesAndFees = basePrice * taxRate?.[0]?.tax_rate;
  const discountAmount = basePrice - Number(100);

  const finalPrice = basePrice + taxesAndFees - discountAmount;


  useEffect(() => {
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
  }, []);

  // error management - invalid data, not logged in
  // useEffect(() => {
  //   const pStartDate = new Date(startDate).getTime();
  //   const pEndDate = new Date(endDate).getTime();
  //   if (
  //     pStartDate > new Date().getTime() &&
  //     pStartDate < pEndDate &&
  //     adults >= 1
  //   ) {
  //   } else {
  //     router.replace("/404");
  //   }

  //   // if (!user) {
  //   //   router.push(dashboard);
  //   // }
  // }, []);

  return (
    <BookingContext.Provider
      value={{
        id,
        adults,
        child,
        startDate,
        endDate,
        taxRate,
        totalPrice,
        tourData,
        taxesAndFees,
        discountAmount,
        basePrice,
        clientSecret,
        finalPrice,
        paymentIntentId
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
