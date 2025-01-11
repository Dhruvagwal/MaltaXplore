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
import { useBooking } from "@/context/bookingContext";

const ContactDetailsPage = ({ nextStep }) => {
  const { toast } = useToast();
  const { addContact } = useContactDetails();
  const { adults, child, totalPrice, date } = useBooking();

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
    const personArray = Object.keys(data).reduce((acc, key, index) => {
      const personIndex = key.match(/\d+/)[0]; 
      const personData = {
        fname: data[`fname${personIndex}`],
        lname: data[`lname${personIndex}`],
        email: data[`email${personIndex}`],
        phone: data[`phone${personIndex}`],
      };
      if (!acc[personIndex]) acc[personIndex] = personData;
      return acc;
    }, []);
  
    personArray.forEach((person) => {
      addContact(person); 
    });
  
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

  const totalForms = adults + child;

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
          {[...Array(totalForms)].map((_, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 space-y-2">
              <p className="text-lg font-semibold py-2">Person {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: `fname${index}`,
                    label: "First Name",
                    placeholder: "Type first name",
                  },
                  {
                    id: `lname${index}`,
                    label: "Last Name",
                    placeholder: "Type last name",
                  },
                ].map((input) => (
                  <FormInput
                    key={input.id}
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
                    id: `email${index}`,
                    label: "Email",
                    placeholder: "Type email",
                  },
                  {
                    id: `phone${index}`,
                    label: "Phone Number",
                    placeholder: "Enter phone number",
                  },
                ].map((input) => (
                  <FormInput
                    key={input.id}
                    id={input.id}
                    title={input.label}
                    placeholder={input.placeholder}
                    required
                    className="h-12"
                  />
                ))}
              </div>
            </div>
          ))}

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
