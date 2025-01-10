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

const CARD_DATA = [
  {
    id: 1,
    image: "https://example.com/image1.jpg",
    title: "Explore Malta’s Ancient Wonders",
    price: 150,
    description:
      "From UNESCO World Heritage sites to hidden catacombs, explore Malta’s rich history with our guided tours.",
    category: "cat-1", // Tour Operator
    subcategory: "cat1-sub1", // Guided Walking Tours
    location: "Valletta", // Added location
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
    title: "Luxury Yacht Charters",
    price: 500,
    description:
      "Sail the Mediterranean in style. Enjoy breathtaking views, exclusive access to hidden coves, and VIP service.",
    category: "cat-5", // Adventure Activities & Experiences
    subcategory: "cat5-sub2", // Paragliding
    location: "Sliema", // Added location
  },
  {
    id: 3,
    image: "https://example.com/image3.jpg",
    title: "Dine by the Sea",
    price: 500,
    description:
      "Taste authentic Maltese cuisine at our top seaside restaurants. From fresh seafood to local delicacies...",
    category: "cat-4", // Dining & Culinary
    subcategory: "cat4-sub3", // VIP/Executive Transportation
    location: "Mosta", // Added location
  },
  {
    id: 4,
    image: "https://example.com/image4.jpg",
    title: "Scuba Diving Adventures",
    price: 500,
    description:
      "Dive into the deep blue and discover Malta’s underwater treasures. Perfect for beginners and seasoned divers.",
    category: "cat-5", // Adventure Activities & Experiences
    subcategory: "cat5-sub3", // Ziplining
    location: "Gozo", // Added location
  },
  {
    id: 5,
    image: "https://example.com/image5.jpg",
    title: "Cultural Heritage Tour",
    price: 500,
    description:
      "Experience the cultural gems of Malta with expert-guided tours of museums, historical landmarks, and more.",
    category: "cat-1", // Tour Operator
    subcategory: "cat1-sub3", // Historical & Cultural Tours
    location: "Valletta", // Added location
  },
  {
    id: 6,
    image: "https://example.com/image6.jpg",
    title: "Mountain Hiking Trails",
    price: 500,
    description:
      "Embark on a breathtaking hike through Malta's rugged terrain, offering panoramic views of the Mediterranean.",
    category: "cat-5", // Adventure Activities & Experiences
    subcategory: "cat5-sub1", // Rock Climbing
    location: "Mellieha", // Added location
  },
  {
    id: 7,
    image: "https://example.com/image7.jpg",
    title: "Private Wine Tasting",
    price: 500,
    description:
      "Taste the finest wines from Malta's vineyards, paired with locally sourced delicacies in an exclusive setting.",
    category: "cat-4", // Dining & Culinary
    subcategory: "cat4-sub1", // Private Chauffeur
    location: "St. Julian's", // Added location
  },
  {
    id: 8,
    image: "https://example.com/image8.jpg",
    title: "Hot Air Balloon Ride",
    price: 150,
    description:
      "Soar above Malta’s stunning landscapes and take in panoramic views from a private hot air balloon ride.",
    category: "cat-5", // Adventure Activities & Experiences
    subcategory: "cat5-sub4", // Quad Biking
    location: "Birzebbuga", // Added location
  },
  {
    id: 9,
    image: "https://example.com/image9.jpg",
    title: "Island-Hopping Adventures",
    price: 500,
    description:
      "Explore Malta’s neighboring islands by boat, enjoying secluded beaches, charming villages, and crystal-clear waters.",
    category: "cat-5", // Adventure Activities & Experiences
    subcategory: "cat5-sub5", // Off-Road Jeep Safari
    location: "Rabat", // Added location
  },
  {
    id: 10,
    image: "https://example.com/image10.jpg",
    title: "Spa and Wellness Retreat",
    price: 500,
    description:
      "Relax and rejuvenate at one of Malta's luxury spas, offering treatments inspired by Mediterranean healing traditions.",
    category: "cat-7", // Conference & Business Meeting Venues
    subcategory: "cat7-sub5", // Catering Services
    location: "Mdina", // Added location
  },
];

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

  useEffect(() => {
    async function fetchData() {
      try {
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
      } catch (error) {
        console.error("Error fetching data:", error);
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
    if (category) {
      const filtered = services.filter(
        (service) => service.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredData(filtered.length > 0 ? filtered : []);
    }
  }, [category, services]);

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
            service.category?.toLowerCase() === category.toLowerCase()
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
          service.location.toLowerCase() === selectedLocation.toLowerCase()
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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const fetchedData = await fetchDataFromRealtimeDB();
  //       setData(fetchedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // console.log("service card data", data);
  // console.log("service card data", data["cat-1"]["cat1-sub4"]["02445462-a507-46aa-99ed-5e1205857bda"]);

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
            {filteredData.length === 0 ? (
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
                  {chunkedData[currentPage]?.map((item, index) => (
                    <ServiceCard
                      key={index}
                      className="col-span-1"
                      index={index}
                      data={item}
                    />
                  ))}
                </div>

                {/* <div className="gap-16 md:gap-4 grid grid-cols-1 md:grid-cols-2">
  {Object.keys(data || {}).map((categoryKey) => {
    // Iterate over each category (e.g., "cat-1")
    return Object.keys(data[categoryKey] || {}).map((subCategoryKey) => {
      // Iterate over each subcategory (e.g., "cat1-sub4")
      const subCategoryData = data[categoryKey]?.[subCategoryKey];

      // If the subcategory exists and has individual items, render them
      return subCategoryData ? (
        Object.keys(subCategoryData || {}).map((itemKey) => {
          // Iterate over each service card item (e.g., "02445462-a507-46aa-99ed-5e1205857bda")
          const item = subCategoryData[itemKey];

          // Render ServiceCard for each item
          return (
            <ServiceCard
              key={item.id || itemKey} // Use the ID or itemKey as the key
              className="col-span-1"
              index={itemKey} // Or use index if needed
              data={item} // Pass item data to ServiceCard
            />
          );
        })
      ) : null; // If subCategoryData is undefined, don't render
    });
  })}
</div> */}

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
