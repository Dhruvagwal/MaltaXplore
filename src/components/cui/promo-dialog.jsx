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
import { Input } from "@/components/ui/input";
import { useBooking } from "@/context/bookingContext";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import { MoreOffersComponent } from "./more-promo-code";

const PromCodeDialog = ({ serviceId, setAppliedCode, appliedCode }) => {
  const { user } = useAuthState();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const { totalPrice, setDiscountedPrice, discountedPrice } = useBooking();
  const originalPrice = totalPrice;
  useEffect(() => {
    const fetchCodes = async () => {
      if (!originalPrice) return;
      let { data, error } = await supabase
        .from("service_promocodes")
        .select("promocodes(*)")
        .eq("service_id", serviceId);

      if (error) {
        console.error("Error fetching promo codes:", error);
        return;
      }

      const extractedPromoCodes = data.map((item) => item.promocodes);

      const applicableCodes = extractedPromoCodes.filter(
        (code) =>
          !code.min_ticket_price || originalPrice >= code.min_ticket_price
      );
      setPromoCodes(applicableCodes);
    };

    fetchCodes();
  }, [serviceId, originalPrice]);

  const applyPromoCode = async () => {
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
            service_id: serviceId,
            user_id: user?.id,
          },
        ])
        .select();

      if (error) throw error;

      setAppliedCode(selectedCode.id);

    let discountedPrice = originalPrice;

    if (selectedCode.type === "fixed") {
      discountedPrice = Math.max(
        0,
        originalPrice - selectedCode.discount_value
      );
    } else if (selectedCode.type === "percentage") {
      const discount = (originalPrice * selectedCode.discount_value) / 100;
      discountedPrice = Math.max(0, originalPrice - discount);
    }

    setDiscountedPrice(discountedPrice);
    console.log("Promo code applied successfully!");
    } catch (error) {
      console.error("Error applying promo code:", error.message);
    }
  };

  const removePromoCode = async () => {
    if (!appliedCode) {
      console.log("No promo code applied.");
      return;
    }

    try {
      const { error } = await supabase
        .from("promocodeusages")
        .delete()
        .eq("promo_code_id", appliedCode?.id);

        console.log(appliedCode)
      if (error) throw error;

      setDiscountedPrice(originalPrice);
      setAppliedCode("");
      setPromoCode("");

      console.log("Promo Code Removed. Total Price Reset:", originalPrice);
    } catch (error) {
      console.error("Error removing promo code:", error.message);
    }
  };

  return (
    <div>
      {/* Show "Enter Promo Code" Dialog if no promo code is applied */}
      {!appliedCode ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="underline text-muted-foreground">
              Enter promo code
            </button>
          </DialogTrigger>
          <DialogContent className="p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl">Promo Code</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter promo code here"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full h-12"
            />
            <DialogFooter className="mt-6">
              <Button variant="outline" className="w-24">
                Cancel
              </Button>
              <Button className="w-24" onClick={applyPromoCode}>
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        // If a promo code is applied, show the "Remove Promo Code" button
        <button
          className="underline text-muted-foreground text-red-500"
          onClick={removePromoCode}
        >
          Remove promo code
        </button>
      )}
    </div>
  );
};

export default PromCodeDialog;
