import { BookingProvider } from "@/context/bookingContext";
import { dashboard } from "@/data/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { 
        if(!session) {
            router.push(dashboard)
        }
    });
  }, []);

  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}
