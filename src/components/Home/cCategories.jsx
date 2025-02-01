import React from "react";
import CategoryCard from "@/components/cui/CategoryCard";
import { useServiceTypeState } from "@/context/servicesContext";

const CCategories = () => {
  const { serviceType } = useServiceTypeState();
  return (
    <div className="p-16 px-8 md:px-20 relative text-center bg-red-100 mt-32 r_cut_corner">
      <div className="text-center">
        <p className="text-4xl md:text-5xl font-bold">Explore by Categories</p>
        <br />
        <p className="text-xl md:text-2xl text-muted-foreground">
          What Would You Like to Do?
        </p>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceType?.map((item, index) => (
          <CategoryCard key={index} index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CCategories;
