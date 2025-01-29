import React, { useEffect, useState } from "react";
import UserWrapper from "./_app";
import { useAuthState } from "@/context/ueAuthContext";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";
import BookingCardComponentNew from "@/components/cui/booking-card-new";
import { getPastUpcomingBookings } from "@/features/dashboard/getPastUpcomingBookings.js";

const PastBooking = () => {
  const { user } = useAuthState();
  const [likes, setLikes] = useState();
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    const fetchedBookings = async () => {
      try {
        if (user) {
          const pastServices = await getPastUpcomingBookings(user?.id);
          setPastBookings(pastServices.pastBookings);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchedBookings();
  }, [user, likes]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServices = await getServices();
      if (fetchedServices && user?.id) {
        const likesData = await getUserLikes(user.id);
        setLikes(likesData);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  // console.log("pastBookings", pastBookings);


  return (
    <UserWrapper>
      <div>
        {" "}
        <h1 className="text-2xl md:text-3xl font-semibold">Past Booking</h1>
        <br />
        <div className="flex flex-wrap gap-4 max-md:justify-center">
          {pastBookings?.map((item, index) => (
            <BookingCardComponentNew
              key={index}
              data={item?.services}
              likes={likes}
              bookingsData={item?.servicebookings}
            />
          ))}
        </div>
      </div>
    </UserWrapper>
  );
};

export default PastBooking;
