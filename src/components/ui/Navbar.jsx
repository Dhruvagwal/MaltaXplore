import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "./button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Input } from "./input";
import { home, supplier } from "@/data/link";

function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="mx-32 border-b-2 py-6">
      <nav className="flex gap-16 items-center justify-between">
        <div className="flex uppercase items-center gap-4">
          <Image src="images/black_logo.svg" height={150} width={150} />
          <div className="flex items-center gap-4">
            <Button size="sm" asChild className="ml-16" variant="ghost">
              <Link href={home}>Home</Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link href="#">About Us</Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link href="#">Services</Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link href="#">Tour Listing</Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link href={supplier}>Supplier</Link>
            </Button>
          </div>
        </div>
        <div className="flex uppercase items-center gap-4">
          <Button size="sm" asChild variant="outline">
            <Link href="#">{t("navbar.signup")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="#">{t("navbar.login")}</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
