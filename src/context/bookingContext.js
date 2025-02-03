import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "./ueAuthContext";
import { useService } from "@/features/getServiceById";
import { useTaxRate } from "@/features/getTaxAndRate";
import axios from "axios";
import { currency } from "@/data/currency";
import { usePromoCodes } from "@/features/getPromoCodes";
import { supabase } from "@/supabaseConfig";

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
  const [discountedPrice, setDiscountedPrice] = useState();
  const [appliedCode, setAppliedCode] = useState("");
  const adults = sadults ? Number(sadults) : 1;
  const child = schild ? Number(schild) : 0;

  const totalPrice = tourData?.price * (adults + child / 2);
  const basePrice = Number(totalPrice);
  const taxesAndFees = (basePrice * taxRate?.[0]?.tax_rate) / 100;
  const discountAmount = discountedPrice
    ? basePrice - Number(discountedPrice)
    : 0;
  const finalPrice = basePrice + taxesAndFees - discountAmount;
  useEffect(() => {
    if (!user?.email || !finalPrice) return;
    const fetchClientSecret = async () => {
      const response = await axios.post("/api/create-payment-intent", {
        amount: finalPrice * 100,
        currency: currency.type,
        email: user?.email,
      });
      setPaymentIntentId(response?.data?.paymentIntent?.id);
      setClientSecret(response?.data?.clientSecret);
    };
    fetchClientSecret();
  }, [finalPrice]);

  const { data: promoCodes } = usePromoCodes(id, totalPrice);

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

  const applyPromoCode = async (promoCode) => {
    console.log("promoCode", promoCode);

    if (!promoCode) {
      console.log("Please enter a promo code.");
      return;
    }

    const selectedCode = promoCodes.find((code) => code.code === promoCode);

    if (!selectedCode) {
      console.log("Invalid or inapplicable promo code.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("promocodeusages")
        .insert([
          {
            promo_code_id: selectedCode.id,
            service_id: id,
            user_id: user?.id,
          },
        ])
        .select();

      if (error) throw error;

      setAppliedCode(selectedCode);

      let discountedPrice = totalPrice;

      if (selectedCode.type === "fixed") {
        discountedPrice = Math.max(0, totalPrice - selectedCode.discount_value);
      } else if (selectedCode.type === "percentage") {
        const discount = (totalPrice * selectedCode.discount_value) / 100;
        discountedPrice = Math.max(0, totalPrice - discount);
      }

      setDiscountedPrice(discountedPrice);
    } catch (error) {
      console.error("Error applying promo code:", error.message);
    }
  };

  const removePromoCode = async (reset) => {
    if (!appliedCode) {
      console.log("No promo code applied.");
      return;
    }

    try {
      const { error } = await supabase
        .from("promocodeusages")
        .delete()
        .eq("promo_code_id", appliedCode?.id);

      if (error) throw error;

      setDiscountedPrice(basePrice);
      setAppliedCode("");
      reset();
      console.log("Promo Code Removed. Total Price Reset:", basePrice);
    } catch (error) {
      console.error("Error removing promo code:", error.message);
    }
  };

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
        clientSecret,
        paymentIntentId,
        setDiscountedPrice,
        applyPromoCode,
        appliedCode,
        setAppliedCode,
        promoCodes,
        removePromoCode,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
