import * as React from "react";
import { Button } from "@/components/ui/button";
import { signup, forgotPassword } from "@/data/link";
import useCustomForm from "@/hooks/use-custom-form";
import { loginSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseConfig";
import { useRouter } from "next/router";

function Login({ redirect = () => {} }) {
  const {
    FormWrapper,
    FormInput,
    formState: { isSubmitting },
  } = useCustomForm({
    schema: loginSchema,
  });

  const { toast } = useToast();

  const onSubmit = async (values) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Submission",
      description: "Please fill the form correctly",
    });
    console.error(errors);
  };

  return (
    <div className="p-16 flex flex-col">
      <Button
        className="self-end"
        variant="link"
        onClick={() => redirect("signup")}
      >
        Create an account
      </Button>
      <FormWrapper onSubmit={onSubmit} onError={onError}>
        <div className="h-full grid place-content-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Welcome Back!</h1>
            <h3 className="text-sm text-muted-foreground">
              Enter your email and password below to login
            </h3>
            <br />
            <FormInput
              required
              id="email"
              title="Email"
              type="email"
              placeholder="Type your email here"
            />
            <br />
            <FormInput
              required
              id="password"
              type="password"
              autoComplete="current-password"
              title="Password"
              placeholder="Type your password"
            />
            <Button
              onClick={() => redirect("forgetPassword")}
              className="w-fit self-end p-0"
              variant="link"
            >
              Forget Password?
            </Button>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Signing in..." : "Sign In With Email"}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              By clicking continue, you agree to our{" "}
              <Button className="p-0 text-muted-foreground" variant="link">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button className="p-0 text-muted-foreground" variant="link">
                Privacy Policy
              </Button>
              .
            </p>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}

export default Login;
