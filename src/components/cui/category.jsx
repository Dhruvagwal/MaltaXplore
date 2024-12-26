import { Component1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { categories } from "@/data/data";
import { DatePicker } from "../ui/datepicker";
import { Input } from "../ui/input";
import { search } from "@/data/link";
import { cn } from "@/lib/utils";

export const Categories = ({className}) => {
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [guest, setGuest] = useState();
  return (
    <div
      className={cn(
        "flex items-center relative z-10 gap-2 p-4 border bg-white mx-auto w-fit shadow-lg rounded-xl",
        className
      )}
    >
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
          <Component1Icon />
          Categories
        </p>
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[10vw]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(categories).map((category) => (
                <SelectItem value={category}>
                  {categories[category].name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
          <Component1Icon />
          Categories
        </p>
        <DatePicker date={date} setDate={setDate} />
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
        />
      </div>
      <Button asChild className="p-9 flex items-center gap-2 text-xl">
        <Link
          href={{
            pathname: search,
            query: { category, guest, date: String(date) },
          }}
        >
          <MagnifyingGlassIcon /> Search
        </Link>
      </Button>
    </div>
  );
};
