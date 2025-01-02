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
import { useState, useEffect } from "react";
import { categories } from "@/data/data";
import { DatePicker } from "../ui/datepicker";
import { Input } from "../ui/input";
import { search } from "@/data/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

export const Categories = ({ className }) => {
  const router = useRouter();
  const { query } = router;
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
        "md:flex items-center relative z-10 md:gap-2 p-2 md:p-4 border bg-white mx-auto w-fit shadow-lg rounded-xl max-md:space-y-1",
        className
      )}
    >
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
          <Component1Icon />
          Categories
        </p>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[10vw]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(categories).map((category) => (
                <SelectItem key={category} value={category}>
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
          Date
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
      <Button asChild className="md:p-9 flex items-center gap-2 text-xl">
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
