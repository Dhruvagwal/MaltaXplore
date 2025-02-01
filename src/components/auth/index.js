import React, { useEffect, useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import ForgotPassword from "./forget-password";

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
    <div className="grid grid-cols-2 h-screen w-screen">
      {/* Left Image Section */}
      <div
        style={{
          backgroundImage: "url('/images/malta_hero.jpg')",
        }}
        className="bg-zinc-900 bg-no-repeat bg-cover"
      >
        <div className="bg-[rgba(0,0,0,0.5)] p-16 h-full w-full">
          <a href="/">
            {" "}
            <img
              className="h-20"
              src="/images/logo.svg"
              alt="Malta Explore Logo"
            />
          </a>
        </div>
      </div>{" "}
      {pages[active]}
    </div>
  );
}

export default index;
