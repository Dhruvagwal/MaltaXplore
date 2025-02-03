import React from "react";
import Link from "next/link";
import { search } from "@/data/link";
import { Button } from "@/components/ui/button";
import { Component1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
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

const searchItemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};

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
    <motion.div
      initial="initial"
      animate="animate"
      className={cn(
        "flex flex-col md:flex-row gap-4 md:gap-6 p-6 md:p-8 border bg-white w-full shadow-lg rounded-2xl",
        className
      )}
    >
      <motion.div
        variants={searchItemVariants}
        className="flex-1 min-w-0"
        custom={0}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground flex items-center gap-1 mb-2"
        >
          <Component1Icon />
          Categories
        </motion.p>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-12 md:h-16 rounded-xl md:rounded-2xl">
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
      </motion.div>
      <motion.div
        variants={searchItemVariants}
        className="flex-1 min-w-0"
        custom={1}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground flex items-center gap-1 mb-2"
        >
          <Component1Icon />
          Date
        </motion.p>
        <DatePicker
          date={date}
          onChange={setDate}
          className="h-12 md:h-16 rounded-xl md:rounded-2xl"
          placeholder={"Select Date"}
        />
      </motion.div>
      <motion.div
        variants={searchItemVariants}
        className="flex-1 min-w-0"
        custom={2}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground flex items-center gap-1 mb-2"
        >
          <Component1Icon />
          Add Guest
        </motion.p>
        <Input
          onChange={(e) => setGuest(e.target.value)}
          placeholder="Number of guests"
          type="number"
          className="h-12 md:h-16 rounded-xl md:rounded-2xl"
        />
      </motion.div>
      <motion.div
        variants={searchItemVariants}
        custom={3}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          asChild
          className="h-12 md:h-16 px-6 md:px-8 mt-0 md:mt-6 flex items-center gap-2 text-base md:text-xl rounded-xl md:rounded-full"
        >
          <Link
            href={{
              pathname: search,
              query: buildQuery(),
            }}
          >
            <motion.div
              initial={{ x: -5 }}
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Search</span>
            </motion.div>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};
