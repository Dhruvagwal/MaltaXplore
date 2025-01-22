import React, { useEffect, useState } from "react";
import AdminWrapper from "./_app";
import { getAllBookings } from "@/features/getBookings";
import BookingList from "@/components/admin/booking-list";

const BookingDashboard = () => {
  const [bookings, serBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedBookings = await getAllBookings();
      serBookings(fetchedBookings);
    };

    fetchData();
  }, []);

  const headings = [
    "Service Name",
    "Date",
    "Location",
    "Booked By",
    "Total Ticket Booked",
    "booking Date",
    "Pickup-Location",
    "Payment Status",
    "Pay-Intent Id",
  ];
  console.log(bookings);
  return (
    <AdminWrapper>
      <div className="text-2xl font-semibold mb-4">Booking List</div>
      <BookingList headings={headings} data={bookings} />
    </AdminWrapper>
  );
};

export default BookingDashboard;
