import React from "react";
import Link from "next/link";
import { search } from "@/data/link";
import { Button } from "@/components/ui/button";
import { Component1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useServiceTypeState } from "@/context/servicesContext";

export const HeroSearch = ({ className }) => {
    const router = useRouter();
    const { query } = router;
    const { serviceType } = useServiceTypeState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [guest, setGuest] = useState();
  
    const buildQuery = () => {
      const query = {};
      if (category) query.category = category;
      if (guest) query.guest = guest;
      if (date) query.date = String(date);
      return query;
    };
  
    useEffect(() => {
      if (query.category) {
        setCategory(query.category);
      }
    }, [query.category]);
  
    return (
      <div
        className={cn(
          "flex gap-2 md:gap-6 p-12 md:p-4 border bg-white w-full shadow-lg rounded-2xl max-md:space-y-1s",
          className
        )}
      >
        <div>
          <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
            <Component1Icon />
            Categories
          </p>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-16 rounded-2xl">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {serviceType?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
            <Component1Icon />
            Date
          </p>
          <DatePicker
            date={date}
            setDate={setDate}
            className="h-16 rounded-2xl"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
            <Component1Icon />
            Add Guest
          </p>
          <Input
            onChange={(e) => setGuest(e.target.value)}
            placeholder="Search Here..."
            type="number"
            className="h-16 rounded-2xl"
          />
        </div>
        <Button
          asChild
          className="p-8 mt-12 flex items-center gap-2 text-xl rounded-full"
        >
          <Link
            href={{
              pathname: search,
              query: buildQuery(),
            }}
          >
            <MagnifyingGlassIcon /> Search
          </Link>
        </Button>
      </div>
    );
  };