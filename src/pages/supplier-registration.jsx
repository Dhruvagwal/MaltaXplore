import { Card, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/ui/Navbar";
import React from "react";

function SupplierRegistration() {
  return (
    <div className="from-primary-foreground bg-gradient-to-br to-transparent">
      <Navbar />
      <main className="pt-16 px-32">
        <p className="text-3xl font-bold text-center">
          Join Malta’s Leading Tourism Platform
        </p>
        <Card className="mt-16 w-[50vw] mx-auto">
          <CardHeader>
            <p className="text-xl font-bold">Supplier Registration</p>
          </CardHeader>
        </Card>
        <div className="px-64 mt-16">
          <p className="text-center">
            Our team will review your information and activate your account
            within 48 hours. Once approved, you’ll be able to list your
            services, manage bookings, and start growing your business with
            MaltaXplore
          </p>
        </div>
      </main>
    </div>
  );
}

export default SupplierRegistration;
