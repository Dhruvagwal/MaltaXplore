"use client";
import React from "react";
import useCustomForm from "@/hooks/use-custom-form";
import { Button } from "@/components/ui/button";
import { maltaLocations } from "@/data/data";
import { ChevronRight } from "lucide-react";
import { activityDetailsSchema } from "@/lib/schema";
import { useContactDetails } from "@/context/contactDetailsContext";
import { useToast } from "@/hooks/use-toast";

const ActivityDetailsPage = ({ nextStep }) => {
    const { toast } = useToast();
  
  const { fname, setFname, lname, setLname, setPickupLocation } =
    useContactDetails();
  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
  } = useCustomForm({
    schema: activityDetailsSchema,
  });

  const handleSubmit = async (data) => {
    setFname(data.fname || fname);
    setLname(data.lname || lname);
    setPickupLocation(data.location);
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
        <p className="text-3xl font-semibold my-8">Activity Details</p>

        <div className="my-6">
          <p className="col-span-2 text-base font-medium my-1">
            Lead Traveller
          </p>
          <FormWrapper
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
            onError={onError}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  id: "fname",
                  label: "First Name",
                  placeholder: "Type your first name",
                  type: "text",
                  value: fname,
                },
                {
                  id: "lname",
                  label: "Last Name",
                  placeholder: "Type your last name",
                  type: "text",
                  value: lname,
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

            <div className="col-span-2 my-6">
              {/* <p className="font-medium text-sm mt-2">
                The provider offers pickup from select locations.
              </p> */}

              <FormSelect
                id="location"
                options={maltaLocations}
                title="Pickup Location"
                placeholder="Select a location"
                className="bg-white h-12"
                required
              />
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
