import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Phone } from "lucide-react";
import { home, aboutUs, contactUs, search, tourListing } from "@/data/link";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="mt-48 h-full text-white/80 relative">
      <Image
        width={1000}
        height={1000}
        className="w-screen max-md:hidden"
        src="/images/footer_back.svg"
      />
      <div className="absolute flex flex-col w-full py-16 px-8 md:px-32 top-16 left-0">
        <div className="flex flex-col md:flex-row max-md:space-y-8 items-center justify-between">
          <p className="text-3xl text-white font-semibold uppercase leading-[1.3]">
            {" "}
            So why late? one steep <br /> far from a tour
          </p>
          <div className="flex max-md:w-full gap-2">
            <Input
              className="bg-white text-black"
              placeholder="Your Email Address"
            />
            <Button variant="secondary" className="">
              Send
            </Button>
          </div>
        </div>
        <Separator className="my-8 bg-white/40" />
        <div className="grid py-8 h-full max-md:space-y-8 md:grid-cols-5">
          <div>
            <Image src="images/white_logo.svg" height={150} width={150} />
            <br />
            <p>
              Immerse yourself in stunning visuals and captivating stories as
              you navigate through our website.{" "}
            </p>
            <br />
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 border border-white/20 rounded-full hover:bg-white/10"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-white/20 rounded-full hover:bg-white/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-white/20 rounded-full hover:bg-white/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-white/20 rounded-full hover:bg-white/10"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div></div>
          <div className="flex flex-col gap-4">
            <p className="font-bold">About Us</p>
            <Link href={home}>Home</Link>
            <Link href={aboutUs}>About Us</Link>
            <Link href={tourListing}>Destination</Link>
            <Link href={contactUs}>Contact us</Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold">Services</p>
            <Link href={contactUs}>Support</Link>
            <Link href={search}>Explore</Link>
            <Link href={contactUs}>Get in Touch</Link>
            {/* <Link href={contactUs}>Get in Touch</Link> */}
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold">Contact Info</p>
            <p>20, Guze Ellul Mercer Str, Iklin IKL1371 MALTA</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 border border-white/20 rounded-full hover:bg-white/10"
              >
                <Phone className="w-4 h-4" />
              </a>
              <p>123-456-789</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 border border-white/20 rounded-full hover:bg-white/10"
              >
                <EnvelopeClosedIcon className="w-4 h-4" />
              </a>
              <p>info@maltaxplore.com</p>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-white/40" />
        <p className="text-center text-white/40">
          © maltaxplore 2024 , All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
