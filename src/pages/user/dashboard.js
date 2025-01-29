"use client";
import React, { useState, useEffect } from "react";

import FavoriteEventComponent from "@/components/cui/favorite-trip";
import BookingTableComponent from "@/components/cui/bookings-table";
import BoookingsCard from "@/components/cui/bookings-card";
import { useAuthState } from "@/context/ueAuthContext";
import UserWrapper from "./_app";
import { getPastUpcomingBookings } from "@/features/dashboard/getPastUpcomingBookings.js";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";

const Dashboard = () => {
  const { user } = useAuthState();
  const [userLikeServices, setUserLikeServices] = useState([]);
  const [likes, setLikes] = useState();
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);

  console.log("pastBookings", pastBookings);
  console.log("upcomingBookings", upcomingBookings);

  useEffect(() => {
    const fetchedBookings = async () => {
      try {
        if (user) {
          const upcomingServices = await getPastUpcomingBookings(user?.id);
          setUpcomingBookings(upcomingServices.upcomingBookings);
          setPastBookings(upcomingServices.pastBookings);
          setCancelledBookings(upcomingServices.cancelledBookings);
          setPastBookings(upcomingServices.pastBookings);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchedBookings();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServices = await getServices();
      if (fetchedServices && user?.id) {
        const likesData = await getUserLikes(user.id);

        if (likesData.length > 0) {
          setLikes(likesData);
          const userLikes = fetchedServices.filter((service) =>
            likesData.some((like) => like.service_id === service.id)
          );
          setUserLikeServices(userLikes);
        } else {
          console.log("No likes data found for the user");
        }
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <UserWrapper>
      <div className="">
        <h1 className="text-2xl md:text-3xl font-semibold">
          All Booking Update
        </h1>
        <br />
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Rectangle Card */}
          <BoookingsCard
            count={
              pastBookings?.filter((item) => item?.service !== null).length +
              upcomingBookings?.filter((item) => item?.service !== null).length +
              cancelledBookings?.filter((item) => item?.service !== null).length
            }
            heading={"Total Bookings"}
          />
          <BoookingsCard
            count={
              upcomingBookings?.filter((item) => item?.service !== null).length
            }
            heading={"Upcoming Bookings"}
          />
          <BoookingsCard
            count={
              pastBookings?.filter((item) => item?.service !== null).length
            }
            heading={"Past Bookings"}
          />
        </div>

        <div className="mt-16">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Upcoming & Past Booking
          </h1>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BookingTableComponent
              heading={"Upcoming Bookings"}
              data={upcomingBookings}
            />
            <BookingTableComponent
              heading={"Past Bookings"}
              data={pastBookings}
            />
          </div>
        </div>
        {userLikeServices?.length > 0 && (
          <div className="mt-16">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Your favorite Trip
            </h1>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {userLikeServices?.map((item, index) => (
                <FavoriteEventComponent key={index} data={item} likes={likes} />
              ))}
            </div>
          </div>
        )}
      </div>
    </UserWrapper>
  );
};

export default Dashboard;
