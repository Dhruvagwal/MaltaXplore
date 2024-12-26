import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { CommentRatings } from "@/components/ui/rating";
import { Card } from "../ui/card";
import Link from "next/link";
import { ratingReviews } from "@/data/link";

export const Reviews = ({ heading = "" }) => {
  const REVIEW_DATA = [
    {
      review:
        "We had the most amazing time! Booking through MaltaXplore was easy and seamless. Highly recommend the sunset boat tour!",
      name: "Sarah",
      location: "United Kingdom",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.5,
    },
    {
      review:
        "We had the most amazing time! Booking through MaltaXplore was easy and seamless. Highly recommend the sunset boat tour!",
      name: "Sarah",
      location: "United Kingdom",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.5,
    },
    {
      review:
        "We had the most amazing time! Booking through MaltaXplore was easy and seamless. Highly recommend the sunset boat tour!",
      name: "Sarah",
      location: "United Kingdom",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4.5,
    },
  ];
  const ReviewCard = ({ data }) => (
    <Card className="p-8 border-2 hover:border-primary transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <Image src="images/el_quotes.svg" width={50} height={50} />

        <CommentRatings rating={data.rating} />
      </div>
      <br />
      <p>{data.review}</p>
      <br />
      <div className="flex items-center gap-4">
        <Image
          src={data.avatar}
          className="rounded-full h-12 object-cover w-12"
          width={50}
          height={50}
        />
        <div>
          <p className="text-xl font-semibold">{data.name}</p>
          <p className="text-muted-foreground">{data.location}</p>
        </div>
      </div>
    </Card>
  );
  return (
    <div className="my-48 text-center px-32">
      <div className="flex w-full justify-between">
        <div></div>
        <p className="text-5xl font-bold">{heading}</p>
        <div className="flex gap-2 self-end items-center justify-end">
          <Button variant="outline">
            <ArrowLeftIcon />
          </Button>
          <Button variant="outline">
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
      <div className="grid text-left mt-16 grid-cols-3 gap-6">
        {REVIEW_DATA.map((item) => (
          <ReviewCard data={item} />
        ))}
      </div>
      <br />
      <Button asChild size="lg" className="p-8">
        <Link href={ratingReviews}>Read More Reviews</Link>
      </Button>
    </div>
  );
};
