import React, { useState } from "react";
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

const PromCodeDialog = () => {
  const [promoCode, setPromoCode] = useState("");

  const applyPromoCode = () => {
    console.log("Promo Code Applied:", promoCode);
  };

  return (
    <div>
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
    </div>
  );
};

export default PromCodeDialog;
