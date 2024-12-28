import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { MapPin, Phone, Mail, FacebookIcon, TwitterIcon } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

const ContactForm = () => {
  return (
    <div className="max-w-6xl mx-8 md:mx-32 grid md:grid-cols-2 gap-12">
      {/* Contact Form */}
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-8">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  placeholder="First Name"
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  placeholder="Last Name"
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="your mail address"
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                placeholder="your phone number"
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea
                placeholder="leave a message for us"
                rows={4}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 text-lg">
              Send Now
            </Button>
          </form>
        </CardContent>
      </Card>

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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact us:</h2>
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
    </div>
  );
};

export default ContactForm;
