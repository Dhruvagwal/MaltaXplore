"use client";
import React, { useReducer } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ref, set } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";

const initialState = {
  supplierType: "",
  businessName: "",
  contactPerson: "",
  phone: "",
  email: "",
  businessAddress: "",
  toursActivities: "",
  businessLicenseNumber: "",
  bankDetails: "",
};

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function SupplierRegistration() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (field) => (event) => {
    dispatch({ field, value: event.target.value });
  };

  const handleSelectChange = (field, value) => {
    dispatch({ field, value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", state);

    // const supplierId = Date.now().toString();

    // const supplierRef = ref(db, "suppliers/" + supplierId);

    // set(supplierRef, {
    //   supplierType: state.supplierType,
    //   businessName: state.businessName,
    //   contactPerson: state.contactPerson,
    //   phone: state.phone,
    //   email: state.email,
    //   businessAddress: state.businessAddress,
    //   toursActivities: state.toursActivities,
    //   businessLicenseNumber: state.businessLicenseNumber,
    //   bankDetails: state.bankDetails,
    // })
    //   .then(() => {
    //     console.log("Data successfully saved to Firebase!");
    //   })
    //   .catch((error) => {
    //     console.error("Error saving data to Firebase:", error);
    //   });
  };

  return (
    <div className="from-primary-foreground bg-gradient-to-br to-transparent">
      <main className="pt-16 px-16 md:px-32">
        <p className="text-4xl font-bold text-center">
          Join Malta’s Leading Tourism Platform
        </p>
        <Card className="mt-16 w-full md:w-[50vw] mx-auto">
          <CardHeader>
            <p className="text-2xl font-semibold mx-7">Supplier Registration</p>
          </CardHeader>
          <CardContent className="mx-8 my-4">
            <div>
              <label
                htmlFor="supplierType"
                className="block text-base font-semibold"
              >
                Supplier type
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("supplierType", value)
                }
              >
                <SelectTrigger id="supplierType" className="mt-2 h-16">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="hotels">Hotels</SelectItem>
                    <SelectItem value="things">Things to do</SelectItem>
                    <SelectItem value="restaurants">Restaurants</SelectItem>
                    <SelectItem value="homes">Holiday Homes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {[
              {
                id: "businessName",
                label: "Business Name",
                placeholder: "Type your business name",
              },
              {
                id: "contactPerson",
                label: "Contact Person",
                placeholder: "Contact person name",
              },
              { id: "phone", label: "Phone", placeholder: "Phone number" },
              { id: "email", label: "Email", placeholder: "Email address" },
              {
                id: "businessAddress",
                label: "Business Address",
                placeholder: "Business address",
              },
              {
                id: "businessLicenseNumber",
                label: "Business License Number",
                placeholder: "License number",
              },
              {
                id: "bankDetails",
                label: "Bank Details",
                placeholder: "Bank details",
              },
            ].map((input) => (
              <div key={input.id} className="mt-6">
                <label
                  htmlFor={input.id}
                  className="block text-base font-semibold"
                >
                  {input.label}
                </label>
                <Input
                  id={input.id}
                  type="text"
                  placeholder={input.placeholder}
                  className="mt-2 h-16"
                  value={state[input.id]}
                  onChange={handleChange(input.id)}
                />
              </div>
            ))}

            <div className="mt-6">
              <label
                htmlFor="toursActivities"
                className="block text-base font-semibold"
              >
                Tours/Activities
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("toursActivities", value)
                }
              >
                <SelectTrigger id="toursActivities" className="mt-2 h-16">
                  <SelectValue placeholder="Type of Tours/Activities Offered" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="sightseeing">Sightseeing</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="culinary">Culinary Tours</SelectItem>
                    <SelectItem value="cultural">Cultural Tours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button className="p-8 text-base mt-6" onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
        <div className="md:px-32 lg:px-64 mt-16">
          <p className="text-center">
            Our team will review your information and activate your account
            within 48 hours. Once approved, you’ll be able to list your
            services, manage bookings, and start growing your business with
            MaltaXplore.
          </p>
        </div>
      </main>
    </div>
  );
}

export default SupplierRegistration;
