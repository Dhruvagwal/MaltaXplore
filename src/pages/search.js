import Banner from "@/components/cui/banner";
import { Categories } from "@/components/cui/category";
import { ServiceCard } from "@/components/cui/ServiceCard";
import { Button } from "@/components/ui/button";
import { CommentRatings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { categories, maltaLocations } from "@/data/data";
import useCustomForm from "@/hooks/use-custom-form";
import React, { useState, useEffect } from "react";
import CPagination from "@/components/ui/CPagniation";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import animationData from "../../public/empty.json";
import { get, ref } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";

async function fetchDataFromRealtimeDB() {
  try {
    const snapshot = await get(ref(db, "services"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log("No data available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Realtime DB data:", error);
    return [];
  }
}

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
  const [services, setServices] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const fetchedData = await fetchDataFromRealtimeDB();

        // Extract all services into a flat array
        const allServices = Object.keys(fetchedData || {}).reduce(
          (acc, categoryKey) => {
            const subCategories = fetchedData[categoryKey];
            if (subCategories) {
              Object.keys(subCategories || {}).forEach((subCategoryKey) => {
                const subCategoryData = subCategories[subCategoryKey];
                if (subCategoryData) {
                  Object.keys(subCategoryData || {}).forEach((itemKey) => {
                    const item = subCategoryData[itemKey];
                    if (item) acc.push(item); // Add the item to the flat array
                  });
                }
              });
            }
            return acc;
          },
          []
        );

        setServices(allServices);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const {
    FormCheckbox,
    FormWrapper,
    FormSlider,
    FormInput,
    watch,
    setValue,
    FormCommand,
  } = useCustomForm({});

  const onSubmit = () => {};
  const onError = () => {};

  const range = watch("range");
  const min = watch("min");
  const max = watch("max");

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
    if (services.length > 0) {
      let filtered = services;

      if (category) {
        filtered = filtered.filter(
          (service) =>
            service.category?.toLowerCase() === category.toLowerCase()
        );
      }

      if (guest) {
        filtered = filtered.filter(
          (service) => service?.maxGroupSize >= guest
        );
      }

      setFilteredData(filtered.length > 0 ? filtered : []);
    }
  }, [category, guest, services]);

  // Get the current page from the query parameter or default to 0
  const currentPage =
    isNaN(parseInt(query.page, 10)) || parseInt(query.page, 10) < 0
      ? 0
      : parseInt(query.page, 10);

  // Split the data into chunks (4 items per page)
  const chunkedData = chunkArray(filteredData, SIZE);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  useEffect(() => {
    if (currentPage >= chunkedData.length) {
      // If the page is out of range, set the last page
      handlePageChange(chunkedData.length - 1);
    }
  }, [currentPage, chunkedData.length]);

  //apply button
  const handleApplyFilterButton = async () => {
    let filtered = services;

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((service) =>
        selectedCategories.some(
          (category) =>
            service.mainCategory?.toLowerCase() === category.toLowerCase()
        )
      );
    }

    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((service) =>
        selectedSubcategories.some(
          (subCategory) =>
            service.subCategory?.toLowerCase() === subCategory.toLowerCase()
        )
      );
    }

    // Price range filter
    if (min !== undefined && max !== undefined) {
      filtered = filtered.filter((service) => {
        const price = parseFloat(service.price);
        return price >= min && price <= max;
      });
    }

    //location based filter
    const selectedLocation = watch("location");
    if (selectedLocation) {
      filtered = filtered.filter(
        (service) =>
          service?.location?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    setFilteredData(filtered);
  };

  const handleCategoryChange = (categoryKey, isChecked) => {
    setSelectedCategories((prev) => {
      if (isChecked) {
        return [...prev, categoryKey];
      } else {
        return prev.filter((key) => key !== categoryKey);
      }
    });

    if (!isChecked) {
      setSelectedSubcategories((prev) =>
        prev.filter((sub) => !categories[categoryKey]?.subcategories[sub])
      );
    }
  };

  const handleSubcategoryChange = (categoryKey, subKey, isChecked) => {
    setSelectedSubcategories((prev) => {
      if (isChecked) {
        return [...prev, subKey];
      } else {
        return prev.filter((sub) => sub !== subKey);
      }
    });
  };

  return (
    <div className="from-primary-foreground to-transparent">
      <main className="pt-16">
        {/* Banner */}
        <Banner url="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
          <div className="flex justify-center items-center flex-col gap-2 md:gap-8">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Explore Experiences
            </p>
            <Categories />
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
                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Select Service</p>
                  <Separator />
                  {Object.keys(categories).map((key) => (
                    <FormCheckbox
                      id={key}
                      title={categories[key].name}
                      onChange={(isChecked) =>
                        handleCategoryChange(key, isChecked)
                      }
                    />
                  ))}
                </div>

                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  {" "}
                  <p className="font-bold text-xl">Select Type</p>
                  <Separator />
                  {selectedCategories.length > 0 && (
                    <div className=" flex flex-col gap-4">
                      {" "}
                      {selectedCategories.map((categoryKey) => (
                        <div key={categoryKey} className="flex flex-col gap-4">
                          {/* <p className="font-semibold text-lg">
                            {categories[categoryKey].name} Subcategories
                          </p> */}
                          {Object.keys(
                            categories[categoryKey].subcategories
                          ).map((subKey) => (
                            <FormCheckbox
                              key={subKey}
                              id={subKey}
                              title={
                                categories[categoryKey].subcategories[subKey]
                              }
                              onChange={(isChecked) =>
                                handleSubcategoryChange(
                                  categoryKey,
                                  subKey,
                                  isChecked
                                )
                              }
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Rating Score</p>
                  <Separator />
                  {[5, 4, 3, 2, 1].map((key) => (
                    <FormCheckbox
                      id={String(key)}
                      title={<CommentRatings rating={key} />}
                    />
                  ))}
                </div>
                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Filter Price</p>
                  <Separator />
                  <FormSlider id="range" min={10} max={500} />
                  <div className="flex items-center gap-4">
                    <FormInput
                      className={"bg-white"}
                      placeholder="Minimum"
                      type="number"
                      id="min"
                    />
                    <Separator className="w-10 pt-1 rounded-full bg-primary" />
                    <FormInput
                      className={"bg-white"}
                      placeholder="Maximum"
                      type="number"
                      id="max"
                    />
                  </div>
                </div>
                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Select Location</p>
                  <Separator />
                  <FormCommand id="location" options={maltaLocations} />
                </div>
                <Button onClick={handleApplyFilterButton}>Apply Filter</Button>
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
