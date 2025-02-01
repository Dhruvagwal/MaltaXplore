"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { useBooking } from "@/context/bookingContext";
import { getUserFromDatabase } from "@/features/getUser";
import addUserToDatabase from "@/features/addUser";
import { useAuthState } from "@/context/ueAuthContext";
import { useRouter } from "next/router";
import { contactUs, booking } from "@/data/link";
import { useToast } from "@/hooks/use-toast";
import useCustomForm from "@/hooks/use-custom-form";
import { bookingSchema } from "@/lib/schema";
import { currency } from "@/data/currency";

const BookingCard = ({ service, isLoading }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user, session, setSession, setUser } = useAuthState();
  const { adults, setAdults, child, setChild, totalPrice, date, endDate } =
    useBooking();
  const { FormWrapper, FormDatePicker } = useCustomForm({
    schema: bookingSchema,
  });

  if (isLoading || !service) {
    return;
  }

  const handleBookNowButton = (data) => {
    console.log(data);
    // const selectedDate = new Date(date);
    // const currentDate = new Date();

    // selectedDate.setHours(0, 0, 0, 0);
    // currentDate.setHours(0, 0, 0, 0);

    // if (isNaN(selectedDate.getTime())) {
    //   return;
    // }

    // if (selectedDate < currentDate) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid Form Submission",
    //     description: "Please check the form for errors and try again.",
    //   });
    // }
    // if (session) {
    //   if (session?.user) {
    //     addUserToDatabase(session.user);
    //     const fetchUserData = async () => {
    //       const user = await getUserFromDatabase(session?.user.id);
    //       if (user) {
    //         setUser(user);
    //       }
    //     };
    //     fetchUserData();
    //   }

    //   router.push(`${booking.replace("[id]", service?.id)}`);
    // } else {
    //   supabase.auth.getSession().then(({ data: { session } }) => {
    //     setSession(session);
    //   });
    // }
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  return (
    <div>
      <Card className="sticky top-24">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-3xl">
            {currency.sign}
            {service?.price}
          </CardTitle>
          <div className="text-white/90">per person</div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <FormWrapper
            className="flex flex-col gap-6"
            onSubmit={handleBookNowButton}
            onError={onError}
          >
            <div className="space-y-4">
              <div>
                <FormDatePicker
                  required
                  title={"Start Date"}
                  id={"startdate"}
                  placeholder={"Start Date"}
                />
              </div>

              <div>
                <FormDatePicker
                  required
                  title={"End Date"}
                  id={"endDate"}
                  placeholder={"End Date"}
                />{" "}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Adults</label>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="hover:bg-primary-foreground hover:text-primary transition-colors"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAdults(adults + 1)}
                    className="hover:bg-primary-foreground hover:text-primary transition-colors"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Children
                </label>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setChild(Math.max(0, child - 1))}
                    className="hover:bg-primary-foreground hover:text-primary transition-colors"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{child}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setChild(child + 1)}
                    className="hover:bg-primary-foreground hover:text-primary transition-colors"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-bold">€{totalPrice}.00</span>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-[1.02]">
                Book Now
              </Button>

              <div className="text-center text-sm text-gray-500 mt-4">
                <Link
                  href={contactUs}
                  className="text-black hover:underline transition-all duration-300"
                >
                  Contact us for more details
                </Link>
              </div>
            </div>
          </FormWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
