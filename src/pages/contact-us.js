"use client";

import React from "react";
import { motion } from "framer-motion";
import Banner from "@/components/cui/banner";
import ChatSection from "@/components/cui/ChatSection";
import Faq from "@/components/cui/faq";
import ContactForm from "@/components/cui/contactForm";

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
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Banner url="/contact-us.png">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              Contact Us
            </motion.h1>
          </Banner>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8 md:py-12"
        >
          <ContactForm />
        </motion.div>

        {/* Chat Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-4 sm:mx-8 md:mx-20 mt-8 md:mt-16"
        >
          <ChatSection />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Faq data={faqData} />
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;
