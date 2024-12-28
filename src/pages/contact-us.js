"use client";

import React from "react";
import Banner from "@/components/cui/banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";
import ChatSection from "@/components/cui/ChatSection";
import Faq from "@/components/cui/faq";
import ContactForm from "@/components/cui/ContactForm";

const faqData = [
  {
    question: "What are your business hours?",
    answer:
      "Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM (CET). During peak season (June-September), we also offer weekend support from 10:00 AM to 4:00 PM.",
  },
  {
    question: "How can I book a tour?",
    answer:
      "You can book a tour directly through our website by selecting your preferred tour and date. Alternatively, you can contact our team via email or phone for assistance with group bookings or custom tour requests.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer free cancellation up to 48 hours before your scheduled tour. For cancellations within 48 hours, a 50% fee applies. No-shows are charged in full. Special conditions may apply for private tours and peak season bookings.",
  },
  {
    question: "Do you offer private tours?",
    answer:
      "Yes, we offer private tours for all our destinations. Private tours can be customized to your preferences and schedule. Please contact us directly to arrange a private tour.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For group bookings, we can also arrange special payment terms.",
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="">
          <Banner url="https://s3-alpha-sig.figma.com/img/fc25/458a/3e1b4f4a9926b7f3d91b10f931a0568a?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q3bswHrQWskga2vcPwHIvSTBWovCIByZaU5rh1ZDxkpb1IyeWDBPmBfxUXiCUMuHHzVtNm6CRkPWLv-Vmi~CkVIjS6Dbj4izvR19gEySHGDT2h9FEqqLsV8AGfXBRcTzCFOTheXedbBcRZANt7xuiY6qPw7GMqBYIMyDZfv5i12~o1w~XCOWgsPHW6PRwcZNK9budzAGLiGOLSK-~abL5zk279Pf5zzQgM~7L1J97DPpadwTkMYGTgC94va3tbMqcAseONRDQIhDvj~myu9RT3Iz-Bmy71UTspGFPwXerfLaho4sqDM1oxAIQIwaZp5URosmsipsVCdrLX3y4P41Eg__">
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          </Banner>
        </div>

        <div className="mx-8 md:mx-32 md:px-4 py-12">
          <ContactForm />

          <div className="mt-16">
            <ChatSection />
          </div>
        </div>
        <Faq data={faqData} />
      </main>
    </div>
  );
};

export default ContactPage;
