import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "./button";
import {
  aboutUs,
  contactUs,
  home,
  maltapass,
  supplier,
} from "@/data/link";

function Navbar() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="py-6 bg-gradient-to-br from-primary-foreground to-transparent relative z-50 w-full">
      <nav className="flex uppercase items-center justify-between md:mx-32 mx-8">
        <div className="flex gap-16">
          <div className="flex items-center">
            <Link href={home}>
              <Image src="images/black_logo.svg" height={150} width={200} />
            </Link>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center md:gap-4 gap-6 absolute md:static top-full left-0 md:bg-transparent bg-white px-8 md:p-0 z-40 w-full`}
          >
            <div className="flex md:flex-row flex-col items-center gap-4 mx-auto">
              <Button
                size="sm"
                asChild
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href={home}>Home</Link>
              </Button>
              <Button
                size="sm"
                asChild
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href={aboutUs}>About Us</Link>
              </Button>
              <Button
                size="sm"
                asChild
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href={maltapass}>Maltapass</Link>
              </Button>
              <Button
                size="sm"
                asChild
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href={supplier}>Supplier</Link>
              </Button>
              <Button
                size="sm"
                asChild
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href={contactUs}>Contact Us</Link>
              </Button>
            </div>

            <div className="md:hidden flex flex-col md:flex-row gap-4 max-md:mt-4 w-full">
              <Button
                size="sm"
                asChild
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href="#">{t("navbar.signup")}</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="w-full md:w-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Link href="#">{t("navbar.login")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Signup and Login Buttons */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            asChild
            variant="outline"
            className="md:w-auto w-full max-md:hidden"
          >
            <Link href="#">{t("navbar.signup")}</Link>
          </Button>
          <Button size="sm" asChild className="md:w-auto w-full max-md:hidden">
            <Link href="#">{t("navbar.login")}</Link>
          </Button>

          {/* Hamburger Menu */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
