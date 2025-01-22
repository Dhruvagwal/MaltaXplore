import React, { useEffect, useState } from "react";
import UserWrapper from "./_app";
import FavoriteEventComponent from "@/components/cui/favorite-trip";
import { getPastServices } from "@/features/dashboard/getPastServices";
import { useAuthState } from "@/context/ueAuthContext";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";

const PastBooking = () => {
  const { user } = useAuthState();
  const [likes, setLikes] = useState();
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    const fetchedBookings = async () => {
      try {
        if (user) {
          const pastServices = await getPastServices(user?.id);
          setPastBookings(pastServices);
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
        <h1 className="text-2xl md:text-3xl font-semibold">Past Booking</h1>
        <br />
        <div className="flex flex-wrap gap-4 max-md:justify-center">
          {pastBookings?.map((item, index) => (
            <FavoriteEventComponent key={index} data={item} likes={likes} />
          ))}
        </div>
      </div>
    </UserWrapper>
  );
};

export default PastBooking;
