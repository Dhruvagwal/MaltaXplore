import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CalendarCheck, History } from "lucide-react";
import FavoriteEventComponent from "@/components/cui/favorite-trip";
import BookingTableComponent from "@/components/cui/bookings-table";
import { useAuthState } from "@/context/ueAuthContext";
import useFirebase from "@/hooks/use-firebase";
import { TopPicks } from "./index";

const Dashboard = () => {
  const {
    crud: { readData },
  } = useFirebase();
  const { user } = useAuthState();
  const [userLikeServices, setUserLikeServices] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBookings, setTotalBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedData = await readData("services");

      const allServices = Object.values(fetchedData || {}).flatMap((category) =>
        Object.values(category || {}).flatMap((subCategory) =>
          Object.values(subCategory || {}).filter(Boolean)
        )
      );

      setServices(allServices);
      setIsLoading(false);

      if (user?.uid) {
        const likedServices = allServices.filter((service) =>
          service.likes?.includes(user.uid)
        );
        setUserLikeServices(likedServices);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const fetchedData = await readData("bookings");
        if (fetchedData) {
          const userBookings = Object.values(fetchedData).filter(
            (booking) => booking.userUid === user?.uid
          );
          setTotalBookings(userBookings);

          const currentDate = new Date();

          const upcoming = [];
          const past = [];

          userBookings.forEach((booking) => {
            const bookingDate = new Date(booking?.bookingDetails?.date);

            if (bookingDate >= currentDate) {
              upcoming.push(booking);
            } else {
              past.push(booking);
            }
          });

          setUpcomingBookings(upcoming);
          setPastBookings(past);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user?.uid) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      <div className="px-8 md:px-32 py-16">
        <h1 className="text-3xl font-semibold">All Booking Update</h1>
        {}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rectangle Card */}
          <Card className="max-w-md w-full mx-auto p-4 bg-white shadow-lg rounded-3xl">
            <CardHeader>
              <div className="flex gap-4 items-center">
                <div>
                  <CalendarCheck className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Total Bookings</h2>
                </div>
              </div>
              <CardDescription className="pl-12">
                Showing <span className="text-red-500">total</span> booking
              </CardDescription>
            </CardHeader>
            <CardContent className="place-self-center">
              <div className="text-7xl font-bold">{totalBookings?.length}</div>
            </CardContent>
          </Card>

          <Card className="max-w-md w-full mx-auto p-4 bg-white shadow-lg rounded-3xl">
            <CardHeader>
              <div className="flex gap-4 items-center">
                <div>
                  <CalendarCheck className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Upcoming Bookings</h2>
                </div>
              </div>
              <CardDescription className="pl-12">
                Showing <span className="text-red-500">total</span> booking
              </CardDescription>
            </CardHeader>
            <CardContent className="place-self-center">
              <div className="text-7xl font-bold">
                {upcomingBookings?.length}
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-md w-full mx-auto p-4 bg-white shadow-lg rounded-3xl">
            <CardHeader>
              <div className="flex gap-4 items-center">
                <div>
                  <History className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Past Bookings</h2>
                </div>
              </div>
              <CardDescription className="pl-12">
                Showing <span className="text-red-500">total</span> booking
              </CardDescription>
            </CardHeader>
            <CardContent className="place-self-center">
              <div className="text-7xl font-bold">{pastBookings?.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-16">
          <h1 className="text-3xl font-semibold">Upcoming & Past Booking</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
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
          <div className="pt-16">
            <h1 className="text-3xl font-semibold">Your favorite Trip</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
              {userLikeServices?.map((item, index) => (
                <FavoriteEventComponent key={index} data={item} refetch={fetchData}/>
              ))}
            </div>
          </div>
        )}
      </div>
      <TopPicks services={services} loading={isLoading} />
    </div>
  );
};

export default Dashboard;
