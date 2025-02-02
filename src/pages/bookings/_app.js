import { BookingProvider } from "@/context/bookingContext";
import { dashboard } from "@/data/link";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}
