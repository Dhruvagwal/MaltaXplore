import React, { useEffect, useState } from "react";
import UserWrapper from "./_app";
import FavoriteEventComponent from "@/components/cui/favorite-trip";
import { supabase } from "@/supabaseConfig";
import { getUpcomingServices } from "@/features/dashboard/getUpcomingServices";
import { useAuthState } from "@/context/ueAuthContext";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";

const UpcomingBooking = () => {
  const { user } = useAuthState();
  const [likes, setLikes] = useState();
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    const fetchedBookings = async () => {
      try {
        if (user) {
          const upcomingServices = await getUpcomingServices(user?.id);
          setUpcomingBookings(upcomingServices);
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

  return (
    <UserWrapper>
      <div>
        {" "}
        <h1 className="text-2xl md:text-3xl font-semibold">Upcoming Booking</h1>
        <br />
        <div className="flex flex-wrap gap-4 max-md:justify-center">
          {upcomingBookings?.map((item, index) => (
            <FavoriteEventComponent
              key={index}
              data={item}
              className="330px"
              likes={likes}
            />
          ))}
        </div>
      </div>
    </UserWrapper>
  );
};

export default UpcomingBooking;
