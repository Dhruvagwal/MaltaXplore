import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/globals.css";
import "../services/i18n";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/cui/footer";
import { BookingProvider } from "@/context/bookingContext";
import { ContactDetailsProvider } from "@/context/contactDetailsContext";
import { AddressProvider } from "@/context/addressContext";
import { useAuthState } from "@/context/ueAuthContext";
import useFirebase from "@/hooks/use-firebase";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function App({ Component, pageProps }) {
  const { setAuth, setUser } = useAuthState();
  const {
    auth: { getUserInfo },
  } = useFirebase();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (!res) return;
      setAuth(true);
      setUser(res);
    });
  }, []);

  return (
    <>
      <ScrollArea
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-[100%] antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Toaster />
        <Navbar />
        <BookingProvider>
          <ContactDetailsProvider>
            <AddressProvider>
              <Component {...pageProps} />
            </AddressProvider>
          </ContactDetailsProvider>
        </BookingProvider>
        <Footer />
      </ScrollArea>
    </>
  );
}
