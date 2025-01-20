import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { DotFilledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { tourListing } from "@/data/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "@/context/ueAuthContext";
import { useServicesState } from "@/context/servicesContext";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/supabaseConfig";

export const ServiceCard = ({
  index,
  data,
  className = "",
  loading,
  likes,
}) => {
  const { user } = useAuthState();
  const { likeService, unlikeService } = useServicesState();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes?.some((like) => like.service_id === data.id));
  }, [likes, data.id]);

  const handleLikesbutton = async () => {
    try {
      if (isLiked) {
        await unlikeService(data, user.id);
        setIsLiked(false);
      } else {
        await likeService(data, user.id);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  return (
    <Card className={className}>
      <div className="relative">
        {loading ? (
          <Skeleton className="rounded-t-xl w-full h-[300px]" />
        ) : (
          <Image
            height={500}
            width={400}
            className="rounded-t-xl w-full"
            src={`https://picsum.photos/500/400?random=${index}`}
          />
        )}
        <div className="absolute z-10 top-4 right-4 cursor-pointer transition-transform duration-200 transform hover:scale-110">
          {user && (
            <Button
              variant="outline"
              className={cn("rounded-full w-10 h-10 p-0")}
              onClick={handleLikesbutton}
            >
              <Heart className={cn(isLiked && "fill-primary text-primary")} />
            </Button>
          )}
        </div>
        <div className="backdrop-blur-sm bg-white bottom-4 right-4 rounded-full p-2 px-4 absolute z-10 flex items-center text-xs">
          {loading ? (
            <Skeleton className="w-[100px] h-[20px]" />
          ) : (
            <>
              <DotFilledIcon height={20} width={20} className="text-red-400" />{" "}
              {data.name} & More Info
            </>
          )}
        </div>
      </div>
      <CardContent className="p-8">
        <div className="flex justify-between items-center">
          {loading ? (
            <Skeleton className="w-[150px] h-[20px] text-ellipsis font-semibold" />
          ) : (
            <p className="text-base w-[50%] text-ellipsis font-semibold">
              {data.name}
            </p>
          )}
          <span>
            {loading ? (
              <Skeleton className="w-[100px] h-[20px]" />
            ) : (
              <>
                Starting at:{" "}
                <span className="text-primary font-bold text-base">
                  ${data.price}
                </span>
              </>
            )}
          </span>
        </div>
        <br />
        {loading ? (
          <Skeleton className="w-full h-[50px] text-muted-foreground text-ellipsis text-sm" />
        ) : (
          <p className="text-muted-foreground text-ellipsis text-sm">
            {data.description}
          </p>
        )}
        <br />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
          <Button asChild className="w-full">
            {loading ? (
              <Skeleton className="w-[200px] h-[40px]" />
            ) : (
              <Link href={`${tourListing.replace("[id]", data.id)}`}>
                Book Now
              </Link>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
