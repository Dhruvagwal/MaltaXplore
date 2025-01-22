import React, { useEffect } from "react";
import UserWrapper from "./_app";
import { useAuthState } from "@/context/ueAuthContext";
import useCustomForm from "@/hooks/use-custom-form";
import { Card, CardContent } from "@/components/ui/card";
import { contactFormSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseConfig";
import { getUserFromDatabase } from "@/features/getUser";

const Settings = () => {
  const { user, setUser } = useAuthState();
  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    setValue,
  } = useCustomForm({
    schema: contactFormSchema,
    defaultValues: {
      name: user?.name,
      email: user?.email,
      mobile_no: user?.mobile_no,
      // message: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user?.name || "");
      setValue("email", user?.email || "");
      setValue("mobile_no", user?.mobile_no || "");
    }
  }, [user, setValue]);

  const handleSubmit = async (data) => {
    try {
      const { data: updatedData, error } = await supabase
        .from("users")
        .upsert(
          {
            id: user.id,
            email: data.email,
            name: data.name,
            mobile_no: data.mobile_no,
          },
          { onConflict: ["id"] }
        )
        .select();
      if (error) {
        console.error("Error updating user:", error);
        return;
      }
      console.log("Updated user:", updatedData);
    } catch (error) {
      console.error("Error during submit:", error);
    }
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
    <UserWrapper>
      <div>
        {" "}
        <h1 className="text-2xl md:text-3xl font-semibold">Settings</h1>
        <br />
        {/* <Card className="shadow-lg rounded-lg overflow-hidden md:p-8"> */}
          {/* <CardContent className="grid md:grid-cols-2 gap-12"> */}
            <div className="space-y-6 col-span-2">
              <FormWrapper
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                onError={onError}
              >
                <div className="space-y-2">
                  <FormInput
                    id="name"
                    title="Full Name"
                    placeholder="Full Name"
                    required
                    className={"h-12"}
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    id="email"
                    title="Email"
                    placeholder="Email"
                    required
                    className={"h-12"}
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    id="mobile_no"
                    title="Phone"
                    placeholder="Phone"
                    required
                    className={"h-12"}
                  />
                </div>
                {/* <div className="space-y-2">
                  <FormInput
                    id="message"
                    title="Message"
                    placeholder="Leave a message for us"
                    required
                    className={"h-16"}
                  />
                </div> */}
                <Button
                  type="submit"
                  className="w-full md:w-48  bg-red-600 hover:bg-red-700 text-white font-medium py-5 text-lg"
                >
                  Save Changes
                </Button>
              </FormWrapper>
            </div>
          {/* </CardContent> */}
        {/* </Card> */}
      </div>
    </UserWrapper>
  );
};

export default Settings;
