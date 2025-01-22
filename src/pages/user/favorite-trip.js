import React, { useState, useEffect } from "react";
import UserWrapper from "./_app";
import { useServicesState } from "@/context/servicesContext";
import { useAuthState } from "@/context/ueAuthContext";
import FavoriteEventComponent from "@/components/cui/favorite-trip";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";

const FavoriteTrip = () => {
  const { user } = useAuthState();
  const [userLikeServices, setUserLikeServices] = useState([]);
  const [likes, setLikes] = useState();

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
  }, [user, likes]);

  return (
    <UserWrapper>
      <div>
        {" "}
        <h1 className="text-2xl md:text-3xl font-semibold">Favorite Trip</h1>
        <br />
        <div className="flex flex-wrap gap-4 max-md:justify-center">
          {userLikeServices?.map((item, index) => (
            <FavoriteEventComponent key={index} data={item} likes={likes} />
          ))}
        </div>
      </div>
    </UserWrapper>
  );
};

export default FavoriteTrip;
