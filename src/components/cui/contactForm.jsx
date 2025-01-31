import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, FacebookIcon, TwitterIcon } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import useCustomForm from "@/hooks/use-custom-form";
import { contactFormSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseConfig";

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: contactFormSchema,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: response, error } = await supabase
        .from("contacts")
        .insert(data)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting the form: ", error);
      setLoading(false);
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

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const socialIconHover = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-20 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg rounded-lg overflow-hidden md:py-12">
          <CardContent className="p-4 md:p-8 grid md:grid-cols-3 gap-8 md:gap-16 lg:gap-32 md:px-16 lg:px-32">
            {/* Form Section */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6 col-span-2"
            >
              <FormWrapper
                className="flex flex-col gap-4 md:gap-6"
                onSubmit={handleSubmit}
                onError={onError}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div 
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <FormInput
                      id="first_name"
                      title="First Name"
                      placeholder="First Name"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <FormInput
                      id="last_name"
                      title="Last Name"
                      placeholder="Last Name"
                      required
                    />
                  </motion.div>
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 md:py-5 text-lg transition-all duration-300"
                  >
                    {loading ? "Sending..." : "Send Now"}
                  </Button>
                </motion.div>
              </FormWrapper>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Location */}
              <motion.div whileHover={{ x: 5 }}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
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
              </motion.div>

              {/* Contact Info */}
              <motion.div whileHover={{ x: 5 }}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  Contact us:
                </h2>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5 text-red-600" />
                    <p className="text-gray-600">123-456-789</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <Mail className="w-5 h-5 text-red-600" />
                    <p className="text-gray-600">maltaxplore@gmail.com</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Links */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  Social Links:
                </h2>
                <div className="flex gap-4">
                  {[TwitterIcon, FacebookIcon, InstagramLogoIcon, GitHubLogoIcon].map((Icon, index) => (
                    <motion.div
                      key={index}
                      variants={socialIconHover}
                      whileHover="hover"
                    >
                      <Icon className="w-5 h-5 text-red-600 cursor-pointer" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactForm;
