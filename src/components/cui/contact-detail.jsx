"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import PromCodeDialog from "@/components/cui/promo-dialog";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { contactDetailsSchema } from "@/lib/schema";
import { useContactDetails } from "@/context/contactDetailsContext";

const ContactDetailsPage = ({ nextStep }) => {
  const { toast } = useToast();
  const {     
    setFname,
    setLname,
    setEmail,
    setPhone,
    } = useContactDetails();

  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    watch,
  } = useCustomForm({
    schema: contactDetailsSchema,
  });

  const handleSubmit = (data) => {    
    setFname(data.fname),
    setLname(data.lname),
    setEmail(data.email),
    setPhone(data.phone),
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
    <div>
      <div className="mt-16 pt-1">
        <p className="text-3xl font-semibold">Contact Details</p>
        <p className="py-2 text-muted-foreground">
          We'll use this information to send you confirmation and updates about
          your booking.
        </p>
      </div>

      <div className="my-8">
        <FormWrapper
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          onError={onError}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "fname",
                label: "First Name",
                placeholder: "Type your first name",
                type: "text",
              },
              {
                id: "lname",
                label: "Last Name",
                placeholder: "Type your last name",
                type: "text",
              },
            ].map((input) => (
              <FormInput
                id={input.id}
                title={input.label}
                placeholder={input.placeholder}
                required
                className="h-12"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "email",
                label: "Email",
                placeholder: "Type your email",
                type: "text",
              },
              {
                id: "phone",
                label: "Phone Number",
                placeholder: "Enter phone number",
                type: "number",
              },
            ].map((input) => (
              <div key={input.id} className="">
                <FormInput
                  id={input.id}
                  title={input.label}
                  placeholder={input.placeholder}
                  required
                  className="h-12"
                />
              </div>
            ))}
          </div>

          {/* <div className="w-1/2 mt-4">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <PhoneInput
                id="phone"
                defaultCountry="MT"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="mt-1"
              />
            </div> */}

          <div className="my-12">
            <p className="text-2xl font-semibold">Promo Code</p>
            <Separator className="my-4" />
            <PromCodeDialog />
          </div>

          <div className="flex justify-center">
            <Button
              variant="destructive"
              className="w-3/5 h-12 
     rounded-full"
              // onClick={nextStep}
            >
              Next
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
