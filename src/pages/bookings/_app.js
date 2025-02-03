import { BookingProvider } from "@/context/bookingContext";

export default function App({ Component, pageProps }) {

  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}
