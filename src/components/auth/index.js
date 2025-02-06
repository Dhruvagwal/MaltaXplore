import React, { useEffect, useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import ForgotPassword from "./forget-password";
import { Card } from "../ui/card";
import {
  CalendarDays,
  ChartLine,
  ChartNoAxesCombined,
  Euro,
  HandCoins,
  Handshake,
  LayoutDashboard,
  ListCheck,
  SquareCheck,
} from "lucide-react";

function index() {
  const { push, query } = useRouter();

  const searchParams = useSearchParams();
  const active = searchParams.get("auth");
  const setActive = (auth) =>
    push({ query: { ...query, auth } }, undefined, {
      shallow: true,
    });
  useEffect(() => {
    setActive("login");
  }, []);

  const pages = {
    login: <Login redirect={setActive} />,
    signup: <Signup redirect={setActive} />,
    forgetPassword: <ForgotPassword redirect={setActive} />,
  };
  return (
    <div>
      <div className="w-screen">
        {/* Left Image Section */}
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url('/images/malta_hero.jpg')",
          }}
          className="bg-zinc-900 bg-no-repeat bg-cover min-h-screen"
        >
          <div className="bg-[rgba(0,0,0,0.5)] h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-screen py-20 px-6 md:px-20">
            <div className="">
              <a href="/">
                {" "}
                <img
                  className="h-20"
                  src="/images/white_logo.svg"
                  alt="Malta Explore Logo"
                />
              </a>
              <br />
              <h1 className="text-3xl font-bold text-white">
                Why Join MaltaXplore ?
              </h1>
              <div>
                <div className="flex gap-2 items-center py-8">
                  <SquareCheck className="w-8 h-8 fill-green-500" />
                  <span className="font-semibold text-white text-xl">
                    For Suppliers & Tour Operators
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Free Listing:",
                      description: "No cost to showcase your tours",
                      icon: ListCheck,
                    },
                    {
                      title: "Automated Payments:",
                      description: "Secure and timely payouts",
                      icon: Euro,
                    },
                    {
                      title: "More Bookings:",
                      description: "Reach more tourists instantly.",
                      icon: CalendarDays,
                    },
                    {
                      title: "Marketing Boost:",
                      description: "Featured in ads & social media",
                      icon: ChartNoAxesCombined,
                    },
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        <Icon className="w-10 h-10 text-white" />
                        <div>
                          <p className="font-semibold text-white text-lg">
                            {feature.title}
                          </p>
                          <p className="text-white text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex gap-2 items-center py-8">
                  <SquareCheck className="w-8 h-8 fill-green-500" />
                  <span className="font-semibold text-white text-xl">
                    For Resellers & Travel Agents
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Earn Commission:",
                      description: "upto 10% per bookings.",
                      icon: HandCoins,
                    },
                    {
                      title: "Instant Sales:",
                      description: "Access top-rated experiences.",
                      icon: ChartLine,
                    },
                    {
                      title: "Easy Dashboard:",
                      description: "Track earnings & manage sales",
                      icon: LayoutDashboard,
                    },
                    {
                      title: "Trusted Partner:",
                      description: "Sell with confidence.",
                      icon: Handshake,
                    },
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        <Icon className="w-10 h-10 text-white" />
                        <div>
                          <p className="font-semibold text-white text-lg">
                            {feature.title}
                          </p>
                          <p className="text-white text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Card className="lg:mx-20 place-content-center">{pages[active]}</Card>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default index;
