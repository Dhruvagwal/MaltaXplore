"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PromCodeDialog from "@/components/cui/promo-dialog";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { contactDetailsSchema } from "@/lib/schema";
import { useContactDetails } from "@/context/contactDetailsContext";
import { useBooking } from "@/context/bookingContext";
import { supabase } from "@/supabaseConfig";
import { useRouter } from "next/router";
import { MoreOffersComponent } from "../cui/more-promo-code";

const ContactDetailsPage = ({ nextStep }) => {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const { setUserId, setUserEmail } = useContactDetails();
  const { adults, child } = useBooking();
  const totalForms = adults + child;

  const { FormWrapper, FormInput } = useCustomForm({
    schema: contactDetailsSchema,
  });
  const [appliedCode, setAppliedCode] = useState("");

  const handleSubmit = async (data) => {
    const formData = [];
    for (let i = 0; i < totalForms; i++) {
      formData.push({
        name: data[`name${i}`],
        email: data[`email${i}`],
        mobile_no: data[`mobile_no${i}`],
      });
    }
    setUserEmail(formData[0]?.email);
    const userIds = [];
    try {
      // Iterate through all form data
      for (const user of formData) {
        const { email, name, mobile_no } = user;

        const { data: authUsers } = await supabase.auth.admin.listUsers();
        const existingAuthUser = authUsers.users.find((u) => u.email === email);

        let authId;
        if (existingAuthUser) {
          authId = existingAuthUser.id;
          console.log(`User already exists in Auth with ID: ${authId}`);
        } else {
          const { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({
              email,
              password: Math.random().toString(36).slice(-10),
            });

          if (signUpError) throw new Error(`Error signing up user: ${email}`);
          authId = signUpData.user.id;
          console.log(`New user signed up with ID: ${authId}`);
        }

        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (existingUser) {
          console.log(`User already exists in users table: ${email}`);
          userIds.push(existingUser.id);
        } else {
          const { data: insertedUser, error: insertError } = await supabase
            .from("users")
            .insert({
              name,
              email,
              mobile_no,
              auth_id: authId,
            })
            .select("id")
            .single();

          if (insertError)
            throw new Error(`Error inserting user into users table: ${email}`);
          console.log(`User inserted into users table: ${email}`);
          userIds.push(insertedUser.id);
        }
        setUserId(userIds);
      }

      nextStep();
    } catch (error) {
      console.error("Error processing users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred while processing user data. Please try again.",
      });
    }
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: errors,
    });
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
          {[...Array(totalForms)].map((_, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 space-y-2">
              <p className="text-lg font-semibold py-2">Person {index + 1}</p>
              <div className="">
                {[
                  {
                    id: `name${index}`,
                    label: "Full Name",
                    placeholder: "Type your full name",
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
                    id: `mobile_no${index}`,
                    label: "Phone Number",
                    placeholder: "Enter phone number",
                  },
                ].map((input) => (
                  <FormInput
                    key={input.id}
                    id={input.id}
                    title={input.label}
                    placeholder={input.placeholder}
                    // required
                    className="h-12"
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="my-12">
            <p className="text-2xl font-semibold flex gap-2 items-center">
              Promo Code{" "}
              <MoreOffersComponent
                serviceId={id}
                setAppliedCode={setAppliedCode}
                appliedCode={appliedCode}
              />
            </p>
            <Separator className="my-4" />
            <PromCodeDialog
              serviceId={id}
              setAppliedCode={setAppliedCode}
              appliedCode={appliedCode}
            />
          </div>

          <div className="flex justify-center">
            <Button variant="destructive" className="w-3/5 h-12 rounded-full">
              Next
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
