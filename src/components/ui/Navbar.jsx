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

function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="mx-32 border-b-2 py-6">
      <nav className="flex gap-16 items-center justify-between">
        <div className="flex uppercase items-center gap-4">
          <Image src="images/black_logo.svg" height={150} width={150} />
          <div className="flex items-center gap-4">
            <Button size="sm" asChild className="ml-16" variant="ghost">
              <Link href="#">{t("navbar.explore")}</Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link href="#">{t("navbar.events")}</Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link href="#">{t("navbar.askUs")}</Link>
            </Button>
          </div>
        </div>
        <Input placeholder="Search Here..." className="bg-white flex-1"/>
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
