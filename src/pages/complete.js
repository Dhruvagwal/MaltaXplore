import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import success from "../../public/success.json";
import failed from "../../public/failed.json";
import loadingAnimation from "../../public/loading.json";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { sendEmail, sendEmailToBookingPersons } from "@/features/sendEmail";
import getPaymentDetails from "@/features/getPaymentDetails";
import { supabase } from "@/supabaseConfig";
const stripePromise = loadStripe(
  "pk_test_51QeatsDk75aWHW4POpFQMr6DEc6Vg8MNxdR0La3Q7QTNKm9ej2fgSYaZhhSpTTf93dav99IkTt6QuINLkfpaZrAI00wF7qXy50"
);

const CompletePage = () => {
  const router = useRouter();
  const [session, setSession] = useState();
  const {
    bookingId,
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
  } = router.query;

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      setSession(data);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchBookingPersons = async () => {
      try {
        const { data: bookingData, error: bookingError } = await supabase
          .from("servicebookingperson")
          .select("user_id, service_id")
          .eq("booking_id", bookingId);

        if (bookingError) {
          console.log(bookingError);
          return;
        }

        if (bookingData.length > 0) {
          const userIds = bookingData.map((booking) => booking.user_id);
          const serviceIds = bookingData.map((booking) => booking.service_id);

          const [usersRes, servicesRes] = await Promise.all([
            supabase.from("users").select("*").in("id", userIds),
            supabase.from("services").select("*").in("id", serviceIds),
          ]);

          if (usersRes.error || servicesRes.error) {
            console.log(usersRes.error || servicesRes.error);
            return;
          }

          const filteredUsers = usersRes.data.filter(
            (user) => user.auth_id !== session?.user.id
          );

          setUsers(filteredUsers);
          setService(servicesRes.data);
        }
      } catch (err) {}
    };

    if (bookingId) {
      fetchBookingPersons();
    }
  }, [bookingId]);

  useEffect(() => {
    const details = getPaymentDetails(
      stripePromise,
      payment_intent_client_secret,
      setLoading
    );
    details.then((d) => setPaymentDetails(d));
  }, [payment_intent_client_secret]);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (paymentDetails?.status === "succeeded" && paymentDetails) {
        const { data, error } = await supabase
          .from("servicebookings")
          .update({ payment_status: true, status: "confirmed" })
          .eq("payment_intent_id", paymentDetails.id);

        if (error) {
          console.error("Error updating payment status:", error);
        } else {
          console.log("Payment status updated successfully:", data);
        }

        if (
          paymentDetails &&
          paymentDetails.status === "succeeded" &&
          service?.length > 0
        ) {
          await sendEmail(paymentDetails);
          const templateDetails = {
            Booking_id: bookingId,
            service_name: service[0]?.name,
            service_date: "-",
            service_location: service[0]?.location,
            booker_name: session?.user.id,
            total_tickets_booked: users.length + 1,
          };

          for (const user of users) {
            const emailTemplate = {
              ...templateDetails,
              guest_name: user.name,
              email: user.email,
              id: user.id,
            };
            await sendEmailToBookingPersons(emailTemplate);
          }
        }
      }
    };

    updatePaymentStatus();
  }, [paymentDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 my-10">
      {!loading && redirect_status && (
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div>
              {!loading &&
              redirect_status &&
              redirect_status === "succeeded" ? (
                <Lottie animationData={success} loop={false} autoplay={true} />
              ) : (
                <Lottie animationData={failed} loop={false} autoplay={true} />
              )}
            </div>
            <h1 className="text-2xl font-bold">
              {redirect_status && redirect_status === "succeeded"
                ? "🎉 Payment Successful!"
                : "❌ Payment Failed"}
            </h1>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium">
              {redirect_status === "succeeded"
                ? "Your payment has been successfully processed."
                : "Your payment could not be completed. Please try again."}
            </p>
            {redirect_status && paymentDetails && (
              <div className="px-8 py-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-muted-foreground text-sm">
                    Amount Paid:
                  </div>
                  <div className="font-medium">
                    ${(paymentDetails.amount / 100).toFixed(2)}{" "}
                    {paymentDetails.currency?.toUpperCase()}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-muted-foreground text-sm">
                    Payment Method:
                  </div>
                  <div className="font-medium">
                    {paymentDetails.payment_method_types
                      ?.join(", ")
                      ?.toUpperCase()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-muted-foreground text-sm">
                    Payment Time:
                  </div>
                  <div className="font-medium">
                    {new Date(paymentDetails.created * 1000).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600">
              Payment Intent ID:{" "}
              <span className="font-mono">{payment_intent}</span>
            </p>
          </CardContent>
          <CardFooter className="flex justify-center mt-6">
            <Link
              href="/"
              className={`px-6 py-2 rounded-md text-white ${
                redirect_status === "succeeded"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } transition`}
            >
              Home
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CompletePage;
