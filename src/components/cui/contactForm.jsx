import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { MapPin, Phone, Mail, FacebookIcon, TwitterIcon } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import useCustomForm from "@/hooks/use-custom-form";
import { contactFormSchema } from "@/lib/schema";
import useFirebase from "@/hooks/use-firebase";
import { v4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();

  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
  } = useCustomForm({
    schema: contactFormSchema,
  });

  const {
    crud: { writeData },
  } = useFirebase();

  const handleSubmit = async (data) => {
    try {
      await writeData(`/contacts/${v4()}`, data);
      toast({
        variant: "success",
        title: "Form Submitted",
        description: "Thank you for contacting us!",
      });
    } catch (error) {
      console.error("Error submitting the form: ", error);
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
    <div className="max-w-7xl mx-8 md:mx-48">
      {/* Contact Form */}
      <Card className="shadow-lg rounded-lg overflow-hidden md:py-12">
        <CardContent className="p-8 grid md:grid-cols-3 gap-12 md:gap-32 md:px-32">
          <div className="space-y-6 col-span-2">
            <FormWrapper
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              onError={onError}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormInput
                    id="fname"
                    title="First Name"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    id="lname"
                    title="Last Name"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <FormInput
                  id="email"
                  title="Email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  id="phone"
                  title="Phone"
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  id="message"
                  title="Message"
                  placeholder="Leave a message for us"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-5 text-lg"
              >
                Send Now
              </Button>
            </FormWrapper>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Our Location:
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-red-600" />
                <p className="text-gray-600">
                  20, Guze Ellul Mercer Str, Iklin
                  <br />
                  IKL1371 MALTA
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Contact us:
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <p className="text-gray-600">123-456-789</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <p className="text-gray-600">maltaxplore@gmail.com</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Social Links:
              </h2>
              <div className="flex gap-4">
                <TwitterIcon className="w-5 h-5 text-red-600" />
                <FacebookIcon className="w-5 h-5 text-red-600" />
                <InstagramLogoIcon className="w-5 h-5 text-red-600" />
                <GitHubLogoIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
