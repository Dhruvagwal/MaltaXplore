import Banner from "@/components/cui/banner";
import { Categories } from "@/components/cui/category";
import { ServiceCard } from "@/components/cui/ServiceCard";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import { CommentRatings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { categories, maltaLocations } from "@/data/data";
import useCustomForm from "@/hooks/use-custom-form";
import React, { useEffect } from "react";
import CPagination from "@/components/ui/CPagniation";
import { useRouter } from "next/router";

const CARD_DATA = [
  {
    image: "https://example.com/image1.jpg",
    title: "Explore Malta’s Ancient Wonders",
    description:
      "From UNESCO World Heritage sites to hidden catacombs, explore Malta’s rich history with our guided tours.",
  },
  {
    image: "https://example.com/image2.jpg",
    title: "Luxury Yacht Charters",
    description:
      "Sail the Mediterranean in style. Enjoy breathtaking views, exclusive access to hidden coves, and VIP service.",
  },
  {
    image: "https://example.com/image3.jpg",
    title: "Dine by the Sea",
    description:
      "Taste authentic Maltese cuisine at our top seaside restaurants. From fresh seafood to local delicacies...",
  },
  {
    image: "https://example.com/image4.jpg",
    title: "Scuba Diving Adventures",
    description:
      "Dive into the deep blue and discover Malta’s underwater treasures. Perfect for beginners and seasoned divers.",
  },
  {
    image: "https://example.com/image5.jpg",
    title: "Cultural Heritage Tour",
    description:
      "Experience the cultural gems of Malta with expert-guided tours of museums, historical landmarks, and more.",
  },
  {
    image: "https://example.com/image6.jpg",
    title: "Mountain Hiking Trails",
    description:
      "Embark on a breathtaking hike through Malta's rugged terrain, offering panoramic views of the Mediterranean.",
  },
  {
    image: "https://example.com/image7.jpg",
    title: "Private Wine Tasting",
    description:
      "Taste the finest wines from Malta's vineyards, paired with locally sourced delicacies in an exclusive setting.",
  },
  {
    image: "https://example.com/image8.jpg",
    title: "Hot Air Balloon Ride",
    description:
      "Soar above Malta’s stunning landscapes and take in panoramic views from a private hot air balloon ride.",
  },
  {
    image: "https://example.com/image9.jpg",
    title: "Island-Hopping Adventures",
    description:
      "Explore Malta’s neighboring islands by boat, enjoying secluded beaches, charming villages, and crystal-clear waters.",
  },
  {
    image: "https://example.com/image10.jpg",
    title: "Spa and Wellness Retreat",
    description:
      "Relax and rejuvenate at one of Malta's luxury spas, offering treatments inspired by Mediterranean healing traditions.",
  },
  {
    image: "https://example.com/image11.jpg",
    title: "Private Helicopter Tour",
    description:
      "Fly over Malta in a private helicopter and admire stunning aerial views of the islands and coastline.",
  },
  {
    image: "https://example.com/image12.jpg",
    title: "Cooking Class with Local Chef",
    description:
      "Learn the secrets of Maltese cuisine in an exclusive cooking class with a renowned local chef.",
  },
  {
    image: "https://example.com/image13.jpg",
    title: "Private Beach Party",
    description:
      "Host a private beach party with VIP access, entertainment, and a gourmet catering service on Malta's most exclusive beaches.",
  },
  {
    image: "https://example.com/image14.jpg",
    title: "Historic Walking Tour of Valletta",
    description:
      "Discover the beauty of Valletta, Malta's capital, through a guided walking tour of its magnificent architecture and rich history.",
  },
  {
    image: "https://example.com/image15.jpg",
    title: "Water Sports Adventure",
    description:
      "Get your adrenaline pumping with an array of water sports activities including jet-skiing, wakeboarding, and parasailing.",
  },
  {
    image: "https://example.com/image16.jpg",
    title: "Art Gallery Tour",
    description:
      "Explore Malta’s artistic legacy with visits to some of its most renowned art galleries and exhibitions.",
  },
  {
    image: "https://example.com/image17.jpg",
    title: "Exclusive Golf Getaway",
    description:
      "Enjoy a luxury golfing experience at Malta’s premier golf courses, with exclusive packages for members and non-members alike.",
  },
  {
    image: "https://example.com/image18.jpg",
    title: "Luxury Car Rental",
    description:
      "Cruise around Malta in a luxury car, with a wide selection of top models and personalized chauffeur services available.",
  },
  {
    image: "https://example.com/image19.jpg",
    title: "Photography Workshop",
    description:
      "Enhance your photography skills with a hands-on workshop guided by professional photographers at picturesque locations.",
  },
  {
    image: "https://example.com/image20.jpg",
    title: "Maltese Islands Yacht Race",
    description:
      "Be part of the thrilling yacht race around the Maltese islands and experience the excitement of competitive sailing.",
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

  // Get the current page from the query parameter or default to 0
  const currentPage = parseInt(query.page, 10) || 0;

  // Split the data into chunks (4 items per page)
  const chunkedData = chunkArray(CARD_DATA, SIZE);

  useEffect(() => {
    if (currentPage >= chunkedData.length) {
      // If the page is out of range, set the last page
      handlePageChange(chunkedData.length - 1);
    }
  }, [currentPage, chunkedData.length]);

  return (
    <div className="from-primary-foreground to-transparent">
      <Navbar />
      <main className="pt-16">
        {/* Banner */}
        <Banner url="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
          <div className="flex justify-center items-center flex-col gap-8">
            <p className="text-3xl font-bold text-white">Explore Experiences</p>
            <Categories />
          </div>
        </Banner>
        <div className="px-32 grid gap-8 grid-cols-6 py-16 mt-16">
          <div className="col-span-2 flex flex-col gap-6">
            <p className="text-3xl font-bold">Filter Your Needs</p>
            <div className="border p-4 rounded-lg">
              <FormWrapper
                className="flex flex-col gap-6"
                onSubmit={onSubmit}
                onError={onError}
              >
                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Select Service</p>
                  <Separator />
                  {Object.keys(categories).map((key) => (
                    <FormCheckbox id={key} title={categories[key].name} />
                  ))}
                </div>

                <div className="flex bg-primary-foreground p-4 rounded-lg flex-col gap-4">
                  <p className="font-bold text-xl">Select Type</p>
                  <Separator />
                  {Object.keys(categories).map((key) => (
                    <FormCheckbox id={key} title={categories[key].name} />
                  ))}
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
                <Button>Apply Filter</Button>
              </FormWrapper>
            </div>
          </div>
          <div className="col-span-4">
            <p className="text-3xl font-bold">Results</p>
            <Separator className="my-4" />
            <div className="gap-4 grid grid-cols-2">
              {chunkedData[currentPage].map((item, index) => (
                <ServiceCard
                  key={index}
                  className="col-span-1"
                  index={index}
                  data={item}
                />
              ))}
            </div>
            <Separator className="my-4" />
            <CPagination
              className="mx-auto"
              size={SIZE}
              data={chunkedData.map((_, idx) => idx)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExploreCategories;
