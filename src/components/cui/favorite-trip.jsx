import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useAuthState } from "@/context/ueAuthContext";
import useFirebase from "@/hooks/use-firebase";
import { Heart } from "lucide-react";

function FavoriteTripComponent({ data, refetch }) {
  const { user } = useAuthState();
  const {
    crud: { updateData, readData },
  } = useFirebase();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data && user?.uid) {
      const likes = data.likes || [];
      setIsLiked(likes.includes(user.uid));
    }
  }, [data, user]);

  const handleLikesbutton = async () => {
    if (data && user?.uid) {
      const likes = data.likes || [];

      const updatedLikes = likes.includes(user.uid)
        ? likes
        : [...likes, user.uid];

      const finalData = {
        ...data,
        likes: updatedLikes,
      };

      try {
        await updateData({
          [`/services/${data?.mainCategory}/${data?.subCategory}/${data.id}`]:
            finalData,
        });
        refetch();
        setIsLiked(true);
        console.log("Data updated successfully!");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const handleUnlikesbutton = async () => {
    if (data && user?.uid) {
      const likes = data.likes || [];

      const updatedLikes = likes.filter((uid) => uid !== user.uid);

      const finalData = {
        ...data,
        likes: updatedLikes,
      };

      try {
        await updateData({
          [`/services/${data?.mainCategory}/${data?.subCategory}/${data.id}`]:
            finalData,
        });
        refetch();
        setIsLiked(false);
        console.log("Data updated successfully!");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (
    <Card className="border rounded-2xl bg-zinc-50">
      <div className="relative">
        <Image
          width={500}
          height={500}
          className="w-full rounded-t-2xl h-64 object-cover"
          src={"/adventure.jpg"}
          alt={data.title}
        />
        <div className="absolute z-10 top-4 right-4 cursor-pointer transition-transform duration-200 transform hover:scale-110">
          {!isLiked ? (
            <Heart
              className="w-4 h-4 sm:w-5 sm:h-5"
              onClick={handleLikesbutton}
            />
          ) : (
            <img
              src="/heart.png"
              className="w-4 h-4 sm:w-5 sm:h-5"
              onClick={handleUnlikesbutton}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col my-4 gap-2 px-6">
        <div className="flex justify-between font-semibold text-sm gap-8">
          <div className="relative group">
            <p className="text-lg font-bold line-clamp-1">{data?.title}</p>
            <span className="absolute top-full left-0 z-10 hidden w-max max-w-xs p-2 bg-white shadow-lg rounded-md group-hover:block">
              {data?.title}
            </span>
          </div>
          <p className="text-lg font-semibold">${data?.price}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="font-medium text-base">{data?.duration}</p>
        </div>
      </div>
    </Card>
  );
}

export default FavoriteTripComponent;
