import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { search } from "@/data/link";
import Link from "next/link";

const CategoryCard = ({ data, index }) => {
  return (
    <Card className="col-span-1 group hover:text-white hover:bg-primary transition-all ease-in-out p-4 text-left">
      <div className="relative overflow-visible">
        <div className="cut-bottom_right_corner  rounded-xl overflow-hidden">
          <Image
            height={400}
            width={400}
            className=" w-full group-hover:scale-125 transition-all ease-in-out"
            src={`https://picsum.photos/500/400?random=${index}`}
          />
        </div>
        <Button
          asChild
          variant="outline"
          className="rounded-full p-6 text-black group-hover:scale-125 transition-all ease-in-out absolute bottom-0 rotate-[33deg] border h-auto right-0 "
        >
          <Link
            href={{
              pathname: search,
              query: { category: data.category },
            }}
          >
            <ArrowTopRightIcon />
          </Link>
        </Button>
      </div>

      <div className="mt-16">
        <p className="text-xl font-semibold">{data.name}</p>
        <p className="group-hover:text-gray-200 text-white">{data.desc}</p>
      </div>
    </Card>
  );
};

export default CategoryCard;
