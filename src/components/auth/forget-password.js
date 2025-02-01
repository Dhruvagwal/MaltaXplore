import * as React from "react";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseConfig";
import { forgetPasswordSchema } from "@/lib/schema";

function ForgotPassword({ redirect = () => {} }) {
  const {
    FormWrapper,
    FormInput,
    formState: { isSubmitting },
  } = useCustomForm({
    schema: forgetPasswordSchema,
  });

  const { toast } = useToast();
  const onSubmit = async (val) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      val.email,
      {
        redirectTo: `https://${window.location.origin}/update-password`,
      }
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const onError = (data) => {
    toast({
      variant: "destructive",
      title: "Invalid Submission",
      description: "Please fill the form correctly",
    });
    console.error(data);
  };

  return (
    <div className="p-16 flex flex-col">
      <Button
        className="self-end"
        variant="link"
        onClick={() => redirect("login")}
      >
        Login
      </Button>
      <FormWrapper onSubmit={onSubmit} onError={onError}>
        <div className="h-full grid place-content-center">
          <div className="flex w-[30vw] flex-col gap-1">
            <h1 className="text-2xl font-semibold">Forgot Password</h1>
            <h3 className="text-sm text-muted-foreground">
              Enter your email to continue
            </h3>
            <br />
            <FormInput
              id="email"
              title="Email"
              placeholder="Type your email here"
            />
            <br />
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Sign In With Email
            </Button>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}

export default ForgotPassword;
