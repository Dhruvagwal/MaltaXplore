"use client";
import React, { useEffect } from "react";
import useCustomForm from "@/hooks/use-custom-form";
import { Button } from "@/components/ui/button";
import { maltaLocations } from "@/data/data";
import { ChevronRight } from "lucide-react";
import { activityDetailsSchema } from "@/lib/schema";
import { useAddress } from "@/context/addressContext";
import { useToast } from "@/hooks/use-toast";

const ActivityDetailsPage = ({ nextStep }) => {
  const { toast } = useToast();
  const { setPickupLocation, setStreet, setCity, setState, setPostalCode } =
    useAddress();
  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
  } = useCustomForm({
    schema: activityDetailsSchema,
  });

  const handleSubmit = async (data) => {
    setPickupLocation(data.location);
    setStreet(data.street);
    setCity(data.city);
    setState(data.state);
    setPostalCode(data.postalCode);
    nextStep();
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

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  id: "street",
                  label: "Street Address",
                  placeholder: "Type your Street name",
                  type: "text",
                },
                {
                  id: "city",
                  label: "City/Town",
                  placeholder: "Type your city name",
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

            <div className="grid grid-cols-2 gap-4">
              {[
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
