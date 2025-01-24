import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuthState } from "@/context/ueAuthContext";
import { useBooking } from "@/context/bookingContext";
import { supabase } from "@/supabaseConfig";

export function MoreOffersComponent({
  serviceId,
  setAppliedCode,
  appliedCode,
}) {
  const { user } = useAuthState();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const { totalPrice, setDiscountedPrice, discountedPrice } = useBooking();
  const originalPrice = totalPrice;

  console.log(promoCodes);
  useEffect(() => {
    const fetchCodes = async () => {
      if (!originalPrice) return;
      let { data: promocodes, error } = await supabase
        .from("promocodes")
        .select("*")
        .eq("service_id", serviceId);
      if (error) {
        console.error("Error fetching promo codes:", error);
      } else {
        // Filter promo codes where originalPrice is greater than min_ticket_price
        const applicableCodes = promocodes.filter(
          (code) =>
            !code.min_ticket_price || originalPrice >= code.min_ticket_price
        );
        setPromoCodes(applicableCodes);
      }
    };

    fetchCodes();
  }, [serviceId]);

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

      setAppliedCode(selectedCode);

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

  const applyButton = async (promoCodee) => {
    console.log("promoCodee", promoCodee);
    if (!promoCodee) {
      console.log("Please enter a promo code.");
      return;
    }

    const selectedCode = promoCodes.find(
      (code) => code.code === promoCodee?.code
    );

    console.log("selectedCode", selectedCode);

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

      setAppliedCode(selectedCode);
      setPromoCode(selectedCode.code);

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
    <Sheet className="w-[800px]">
      <SheetTrigger asChild>
        <Button variant="outline" className="text-xs px-4">
          More Offers
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>More Offers</SheetTitle>
          {/* <SheetDescription>
          Enter promo code
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex item-center gap-4 py-8">
          <Input
            placeholder="Enter promo code here"
            value={appliedCode?.code}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full"
            disabled={!!appliedCode} // Disable input if appliedCode exists
          />
          {appliedCode ? (
            <Button className="w-24" onClick={removePromoCode}>
              Remove
            </Button>
          ) : (
            <Button className="w-24" onClick={applyPromoCode}>
              Apply
            </Button>
          )}
        </div>

        <div>
          <SheetTitle>Available Coupons</SheetTitle>

          {promoCodes?.map((p) => (
            <Card
              key={p.code}
              className="w-full mt-6 border border-gray-300 rounded-none shadow-none"
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="border-2 border-dashed uppercase w-28 py-2 text-center text-xs bg-red-100 border-red-500 font-semibold">
                    {p.code}{" "}
                  </div>{" "}
                  <Button
                    variant={"default"}
                    className="w-24"
                    onClick={() => applyButton(p)}
                  >
                    Apply
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {" "}
                <div className="font-bold">
                  {p?.type === "fixed"
                    ? `Get flat $${p?.discount_value} off`
                    : `Get ${p?.discount_value}% off`}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
