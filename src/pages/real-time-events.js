import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useCustomForm from "@/hooks/use-custom-form";

import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CPagination from "@/components/ui/CPagniation";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Banner from "@/components/cui/banner";
import EventCard from "@/components/cui/event";

import { SearchIcon, XIcon } from "lucide-react";
import { useEvents } from "@/features/getEvents";
import { formatDateToDDMMYYYY } from "@/utils/date";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array?.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const SIZE = 6;

function RealTimeEvents() {
  const router = useRouter();
  const { query } = router;
  const [date, setDate] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: events } = useEvents();
  const [searchedEvents, setSearchedEvents] = useState(events);
  const [buttonState, setButtonState] = useState(false);
  const { watch, setValue } = useCustomForm({});
  useEffect(() => {
    const formattedDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    const dEvents = events?.filter((e) => {
      console.log("Event Date:", e.event_date);
      console.log("Formatted Date:", formattedDate);
      return e?.event_date === formattedDate;
    });
    setSearchedEvents(dEvents);
  }, [date, events]);

  // Get the current page from the query parameter or default to 0
  const currentPage = parseInt(query.page, 10) || 0;

  // Split the data into chunks (6 items per page)
  const chunkedData = chunkArray(searchedEvents, SIZE);

  useEffect(() => {
    if (currentPage >= chunkedData.length) {
      handlePageChange(chunkedData.length - 1);
    }
  }, [currentPage, chunkedData.length]);

  // Handle page change and update the URL query param
  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchedEvents(events);
      setButtonState(false);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered) {
        setButtonState(true);
      }
      setSearchedEvents(filtered);
    }
  };

  return (
    <div className="from-primary-foreground to-transparent">
      <main className="pt-16">
        {/* Banner */}
        <Banner url="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
          <p className="text-3xl font-bold text-white">Real Time Events</p>
        </Banner>

        <div className="px-8 md:px-32 py-16 mt-16">
          {/* heading */}
          <div className="flex flex-col md:flex-row justify-between items-center max-md:gap-4">
            <p className="text-3xl font-bold">Today’s Events</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <DatePicker
                date={date}
                onChange={setDate}
                placeholder={"Select Date"}
                className={"w-full "}
              />
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search by character"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[10vw]"
                />
                {buttonState === true ? (
                  <Button
                    className="p-2 px-3"
                    onClick={() => {
                      setSearchTerm("");
                      setButtonState(false);
                      setSearchedEvents(events);
                    }}
                  >
                    <XIcon width={15} height={15} />
                  </Button>
                ) : (
                  <Button className="p-2 px-3" onClick={handleSearch}>
                    <SearchIcon width={15} height={15} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* events */}
          <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {chunkedData[currentPage]?.map((item, index) => (
              <EventCard
                key={index}
                title={item.title}
                description={item.description}
                start_time={item.start_time}
                end_time={item.end_time}
                date={item.date}
                url={item.image}
                location={item.location}
                redirect_url={item.redirect_url}
                more_info_url={item.more_info}
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

        <div className="px-8 md:px-32 py-16">
          <p className="text-3xl font-bold mb-8 text-center">Upcoming Events</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((item, index) => (
              <EventCard
                key={index}
                title={item.title}
                description={item.description}
                start_time={item.start_time}
                end_time={item.end_time}
                date={item.date}
                url={item.image}
                location={item.location}
                redirect_url={item.redirect_url}
                more_info_url={item.more_info}
              />
            ))}
          </div>
        </div>
        <div className="px-8 md:px-32 pt-16">
          <p className="text-3xl font-bold mb-8 text-center">
            Event locations and nearby services
          </p>
          <iframe
            width="600"
            className="w-full bg-zinc-50 p-4 border rounded-lg"
            height="800"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Malta&zoom=12&maptype=roadmap"
          ></iframe>
        </div>
      </main>
    </div>
  );
}

export default RealTimeEvents;
