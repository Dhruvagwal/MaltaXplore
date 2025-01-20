"use client";
import React from "react";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { maltaLocations } from "@/data/data";
import { activityDetailsSchema } from "@/lib/schema";
import { useAddress } from "@/context/addressContext";

const ActivityDetailsPage = ({ nextStep }) => {
  const { toast } = useToast();
  const {
    setPickupLocation,
    setCity,
    setState,
    setPostalCode,
    setAddLine1,
    setAddLine2,
  } = useAddress();
  const { FormWrapper, FormInput, FormSelect } = useCustomForm({
    schema: activityDetailsSchema,
  });

  const handleSubmit = async (data) => {
    setPickupLocation(data.location);
    setCity(data.city);
    setState(data.state);
    setPostalCode(data.postalCode);
    setAddLine1(data.addLine1);
    setAddLine2(data.addLine2), nextStep();
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-2">
        <p className="text-3xl font-semibold my-8">Address Details</p>

        <div className="">
          <FormWrapper
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
            onError={onError}
          >
            <div className="col-span-2">
              <FormSelect
                id="location"
                options={maltaLocations}
                title="Pickup Location"
                placeholder="Select a location"
                className="bg-white h-12"
                required
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  id: "addLine1",
                  label: "Address Line 1",
                  placeholder: "Type your address",
                  type: "text",
                },
                {
                  id: "addLine2",
                  label: "Address Line 2",
                  placeholder: "Type your address",
                  type: "text",
                },
              ].map((input) => (
                <FormInput
                  id={input.id}
                  title={input.label}
                  placeholder={input.placeholder}
                  required
                  value={input.value}
                  className="h-12"
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  id: "city",
                  label: "City/Town",
                  placeholder: "Type your city name",
                  type: "text",
                },
                {
                  id: "state",
                  label: "State",
                  placeholder: "Type your state name",
                  type: "text",
                },
                {
                  id: "postalCode",
                  label: "Zip/Postal Code",
                  placeholder: "Type your last name",
                  type: "text",
                },
                
              ].map((input) => (
                <FormInput
                  id={input.id}
                  title={input.label}
                  placeholder={input.placeholder}
                  required
                  value={input.value}
                  className="h-12"
                />
              ))}
            </div>

            <div className="my-8 flex justify-center">
              <Button
                variant="destructive"
                className="w-3/5 h-12 
         rounded-full"
              >
                Next
              </Button>
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
