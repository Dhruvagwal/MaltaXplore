import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useCustomForm from "@/hooks/use-custom-form";
import {
  useServicesState,
  useServiceSubTypeState,
  useServiceTypeState,
} from "@/context/servicesContext";

import { CommentRatings } from "@/components/ui/rating";
import CPagination from "@/components/ui/CPagniation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Categories } from "@/components/cui/category";
import { ServiceCard } from "@/components/cui/ServiceCard";
import Banner from "@/components/cui/banner";

import { categories, maltaLocations } from "@/data/data";

import Lottie from "lottie-react";
import animationData from "../../public/empty.json";
import { supabase } from "@/supabaseConfig";
import { filtersSchema } from "@/lib/schema";
import { useAuthState } from "@/context/ueAuthContext";
import { getUserLikes } from "@/features/getUserLikes";
import { HeroSearch } from "@/components/Home/hero-search";
import { useAllServiceReviews } from "@/features/reviews/getServiceReviews";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const SIZE = 6;

function ExploreCategories() {
  const router = useRouter();
  const { query } = router;
  const { date, category, guest } = query;
  const {
    FormCheckbox,
    FormWrapper,
    FormSlider,
    FormInput,
    watch,
    setValue,
    FormCommand,
    register,
  } = useCustomForm({
    schema: filtersSchema,
  });
  const { user } = useAuthState();
  const { services, isLoading } = useServicesState();
  const { serviceType } = useServiceTypeState();
  const { serviceReviews } = useAllServiceReviews();
  const [likes, setLikes] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [checkedServiceTypeIds, setCheckedServiceTypeIds] = useState([]);
  const [serviceSubType, setServiceSubType] = useState([]);
  const range = watch("range");
  const min = watch("min");
  const max = watch("max");

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = await getUserLikes(user?.id);
      setLikes(likesData);
    };
    fetchLikes();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (checkedServiceTypeIds.length > 0) {
        let { data: servicesubtype, error } = await supabase
          .from("servicesubtype")
          .select("*")
          .in("service_id", checkedServiceTypeIds);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setServiceSubType(servicesubtype);
        }
      }
    };

    fetchData();
  }, [checkedServiceTypeIds]);

  useEffect(() => {
    if (!range) return;
    setValue("min", range[0]);
    setValue("max", range[1]);
  }, [range]);

  useEffect(() => {
    if (!range) return;
    setValue("range", [min, max]);
  }, [min, max]);

  useEffect(() => {
    if (!category && services.length > 0) {
      setFilteredData(services);
    }
  }, [category, services]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        let queryBuilder = supabase
          .from("services")
          .select("*")
          .eq("status", "active");
        if (category) {
          queryBuilder = queryBuilder.eq("service_type", category);
        }
        if (guest) {
          queryBuilder = queryBuilder.gte("maximum_group_size", guest);
        }

        let formattedDate = null;

        if (date) {
          const localDate = new Date(decodeURIComponent(date));
          localDate.setMinutes(
            localDate.getMinutes() - localDate.getTimezoneOffset()
          );
          formattedDate = localDate.toISOString().split("T")[0];
        }

        if (formattedDate) {
          queryBuilder = queryBuilder.eq("start_date", formattedDate);
        }

        const { data, error } = await queryBuilder;
        console.log("data", data)
        console.log("error", error)
        if (error) {
          console.error("Error fetching filtered data:", error);
        } else {
          setFilteredData(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    if (services.length > 0) {
      fetchFilteredData();
    }
  }, [category, guest, date, services]);

  // Get the current page from the query parameter or default to 0
  const currentPage =
    isNaN(parseInt(query.page, 10)) || parseInt(query.page, 10) < 0
      ? 0
      : parseInt(query.page, 10);

  // Split the data into chunks (4 items per page)
  const chunkedData = chunkArray(filteredData, SIZE);
  useEffect(() => {
    if (currentPage >= chunkedData.length) {
      handlePageChange(chunkedData.length - 1);
    }
  }, [currentPage, chunkedData.length]);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  const handleServiceTypeCheckboxChange = (id, isChecked) => {
    const Id = id?.split(".")[1];
    setCheckedServiceTypeIds((prev) =>
      isChecked ? [...prev, Id] : prev.filter((checkedId) => checkedId !== Id)
    );
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      let queryBuilder = supabase.from("services").select("*").eq("status" , "active");

      if (data.location) {
        queryBuilder = queryBuilder.eq("location", data.location);
      }

      if (data.min !== undefined && data.max !== undefined) {
        queryBuilder = queryBuilder
          .gte("price", data.min)
          .lte("price", data.max);
      }

      const selectedServiceTypes = Object.keys(data.type || {}).filter(
        (key) => data.type[key] === true
      );

      if (selectedServiceTypes.length > 0) {
        queryBuilder = queryBuilder.in("service_type", selectedServiceTypes);
      }

      const selectedSubTypes = Object.keys(data.sub || {}).filter(
        (key) => data.sub[key] === true
      );

      if (selectedSubTypes.length > 0) {
        queryBuilder = queryBuilder.in("service_sub_type", selectedSubTypes);
      }

      // const selectedRatigs = Object.keys(data.ratings || {}).filter(
      //   (key) => data.ratings[key] === true
      // );

      const { data: filterData, error } = await queryBuilder;
      console.log("filterData", filterData);

      if (error) {
        console.error("Error fetching filtered data:", error);
      } else {
        setFilteredData(filterData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const onError = () => {};

  return (
    <div className="from-primary-foreground to-transparent">
      <main className="pt-16">
        {/* Banner */}
        <Banner url="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
          <div className="flex justify-center items-center flex-col gap-2 md:gap-8">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Explore Experiences
            </p>
            {/* <HeroSearch className="transform-gpu" /> */}
            <Categories className="transform-gpu" />
          </div>
        </Banner>
        <div className="px-8 md:px-32 grid grid-cols-1 gap-8 md:grid-cols-6 py-16 mt-16">
          <div className="md:col-span-2 flex flex-col gap-6">
            <p className="text-3xl font-bold">Filter Your Needs</p>
            <div className="border p-4 rounded-lg">
              <FormWrapper
                className="flex flex-col gap-12 md:gap-6"
                onSubmit={onSubmit}
                onError={onError}
              >
                {/* Service Type */}
                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Select Service</p>
                  <Separator />
                  {serviceType?.map((cat) => (
                    <FormCheckbox
                      id={`type.${cat.id}`}
                      title={cat?.name}
                      key={cat.id}
                      onCheckboxChange={handleServiceTypeCheckboxChange}
                    />
                  ))}
                </div>

                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  {" "}
                  <p className="font-bold text-xl">Select Type</p>
                  <Separator />
                  <div className=" flex flex-col gap-4">
                    {" "}
                    {serviceSubType?.map((subCat) => (
                      <div key={subCat.id} className="flex flex-col gap-4">
                        <FormCheckbox
                          id={`sub.${subCat.id}`}
                          title={subCat.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Rating Score</p>
                  <Separator />
                  {[5, 4, 3, 2, 1].map((key) => (
                    <FormCheckbox
                      id={`ratings.${key}`}
                      title={<CommentRatings rating={key} name="ratings" />}
                    />
                  ))}
                </div>
                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Select Location</p>
                  <Separator />
                  <FormCommand id="location" options={maltaLocations} />
                </div>
                <Button>Apply Filter</Button>
              </FormWrapper>
            </div>
          </div>
          <div className="md:col-span-4 max-md:my-12">
            <p className="text-3xl font-bold">Results</p>
            <Separator className="my-4" />

            {!isLoading && filteredData.length === 0 ? (
              <div className="flex flex-col justify-center items-center my-40 gap-4">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={{ width: "300px", height: "300px" }}
                />
                <p className="text-xl font-bold text-gray-500">
                  No services found.
                </p>
              </div>
            ) : (
              <>
                <div className="gap-16 md:gap-4 grid grid-cols-1 md:grid-cols-2">
                  {Array.from({
                    length: isLoading ? 4 : chunkedData[currentPage]?.length,
                  }).map((_, index) => (
                    <ServiceCard
                      key={index}
                      index={index}
                      data={isLoading ? {} : chunkedData[currentPage][index]}
                      loading={isLoading}
                      className="col-span-1"
                      likes={likes}
                    />
                  ))}
                </div>

                <Separator className="my-4" />
                <CPagination
                  className="mx-auto"
                  size={SIZE}
                  data={chunkedData.map((_, idx) => idx)}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExploreCategories;
