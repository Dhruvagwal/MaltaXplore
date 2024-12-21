import Faq from "@/components/cui/faq";
import { River } from "@/components/cui/river";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/ui/Navbar";
import { supplierRegistration } from "@/data/link";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function supplier() {
  const DEALS = [
    {
      name: "Unlock Unmatched Local Expertise",
      description:
        "Partner with MaltaXplore to bring unparalleled knowledge of Malta’s hidden gems to your clients, adding value through authentic, locally-curated experiences that only insiders can provide.",
    },
    {
      name: "Boost Your Brand with Exclusive Offerings",
      description:
        "Stand out by offering unique, captivating travel experiences that set you apart in a competitive market—crafted with MaltaXplore’s deep understanding of Malta’s rich culture and landscapes.",
    },
    {
      name: "Reliability and Dedicated Support",
      description:
        "Count on a reliable partnership backed by consistent support and competitive pricing, ensuring a seamless experience for both your team and clients every step of the way.",
    },
  ];
  const PARTNERS = [
    {
      title: "Access Authentic Malta Experiences",
      description:
        "Enhance your offerings with exclusive, locally-designed Malta journeys, providing clients with unforgettable, unique experiences.",
    },
    {
      title: "Flexible Partnership Packages",
      description:
        "Enjoy tailored partnership options to fit your business needs, allowing you to adapt and grow easily.",
    },
    {
      title: "Competitive Rates and Support",
      description:
        "Receive dedicated assistance, marketing support, and excellent rates, ensuring a seamless and rewarding partnership.",
    },
    {
      title: "Boost Brand and Loyalty",
      description:
        "Strengthen your brand’s reputation and build client loyalty by offering memorable, high-quality Malta adventures.",
    },
  ];
  return (
    <main>
      <div className="bg-gradient-to-br h-screen from-primary-foreground to-transparent">
        <Navbar />
        {/* Hero Section */}
        <div className="flex  gap-64 items-center px-32 pt-16">
          <div className="flex-1 flex flex-col gap-8">
            <h1 className="text-7xl leading-[1.3] font-bold">
              Join Malta’s
              <br />
              Leading Tourism
              <br /> Platform
            </h1>
            <p className="text-xl leading-[1.3] text-muted-foreground">
              Thank you for choosing to partner with
              <br />
              MaltaXplore, the go-to platform for booking <br />
              tours, experiences, and services in Malta.
            </p>
            <Button asChild size="lg" className="p-8 w-fit">
              <Link href={supplierRegistration}>Get Started Now</Link>
            </Button>
          </div>
          <div className="flex-1">
            <Image
              width={700}
              height={700}
              className="object-contain"
              src="/images/hero_supplier.png"
            />
          </div>
        </div>
      </div>
      {/* Steps */}
      <div className="p-16 border-2 text-center rounded-2xl border-primary/50 my-48 mx-32">
        <p className="text-3xl font-bold">Simple Process to Become Partner</p>
        <br />
        <div className="relative">
          <Image
            src="/images/supplier_steps.svg"
            width={1000}
            height={1000}
            className="w-full ml-4"
          />
          <div className="absolute w-full top-24 left-0">
            <div className="w-[95%] mx-auto grid grid-cols-3">
              <div className="flex-1 mt-8">
                <p className="font-bold text-xl">Register Your Plan</p>
                <br />
                <p className="w-[70%] mx-auto">
                  Complete a simple registration process and work with us to
                  design a partnership package tailored to your business needs.
                </p>
              </div>
              <div className="flex-1">
                <p className="font-bold text-xl">Connect with Our Team</p>
                <br />
                <p className="w-[70%] mx-auto">
                  Start by reaching out to discuss your goals and how a
                  partnership can enhance your offerings.
                </p>
              </div>
              <div className="flex-1 mt-8 ml-4">
                <p className="font-bold text-xl">Grow up Together</p>
                <br />
                <p className="w-[70%] mx-auto">
                  Begin offering exclusive Malta experiences to your clients,
                  supported by our team every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Deals */}
      <div className="my-48 px-32 text-center">
        <p className="text-3xl font-bold">
          Best Partnership Deal With MaltaXplore?
        </p>
        <div className="grid mt-16 grid-cols-3 gap-8">
          {DEALS.map((item, idx) => (
            <Card className="p-16" key={idx}>
              <CardHeader>
                <p className="font-bold text-xl">{item.name}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Benifits */}
      <div className="p-16 grid grid-cols-2 place-content-center my-48 px-32 text-center bg-red-100 cut_corner">
        <Image
          width={500}
          height={500}
          className="object-contain self-end"
          src="/images/benefits_supplier.svg"
        />
        <div className="">
          <p className="text-3xl font-bold">Benefit of Become Partner</p>
          <div className="grid grid-cols-2 gap-16 mt-16 text-left">
            {PARTNERS.map((item, index) => (
              <div key={index}>
                <p className="font-bold text-xl">{item.title}</p>
                <br />
                <p>{item.description}</p>
              </div>
            ))}
            <Button asChild size="lg" className="p-8 w-fit">
              <Link href={supplierRegistration}>Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <Faq
        data={[
          {
            question: "What are the benefits of partnering with MaltaXplore?",
            answer:
              "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
          },
          {
            question: "How do I register as a partner?",
            answer:
              "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
          },
          {
            question: "What type of businesses can partner with MaltaXplore?",
            answer:
              "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
          },
          {
            question: "Is there a minimum commitment required to partner?",
            answer:
              "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
          },
          {
            question:
              "Will my business receive marketing support from MaltaXplore?",
            answer:
              "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
          },
        ]}
      />
      <River />
    </main>
  );
}

export default supplier;
