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
import {
  useServicesState,
  useServiceTypeState,
} from "@/context/servicesContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { dbNames } from "@/utils/fetch";
import { useSupabaseGetAllQuery } from "@/utils/query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFirebase from "@/hooks/use-firebase";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import { getUserFromDatabase } from "@/features/getUser";

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

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { setServices, setIsLoading } = useServicesState();
  const { setServiceType, setIsServiceTypeLoading } = useServiceTypeState();
  const { setUser, setSession } = useAuthState();

  useEffect(() => {
    const fetchData = async () => {
      let { data: services, error } = await supabase
        .from("services")
        .select("*, supplieraccess(*)")
        .eq("status", "active");
      console.log(services);
      setServices(services);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let { data: servicetype, error } = await supabase
        .from("servicetype")
        .select("*");
      setServiceType(servicetype);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      const user = await getUserFromDatabase(data?.user.id);
      setUser(user);
      setSession(data);
    };

    fetchUserData();
  }, []);

  const isDashboard =
    currentPath.split("/")[1] !== "user" &&
    currentPath.split("/")[1] !== "admin";

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollArea
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-[100%] antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Toaster />
        {isDashboard && <Navbar />}{" "}
        <BookingProvider>
          <ContactDetailsProvider>
            <AddressProvider>
              <DataDownload />
              <Component {...pageProps} />
            </AddressProvider>
          </ContactDetailsProvider>
        </BookingProvider>
        {isDashboard && <Footer />}{" "}
      </ScrollArea>
    </QueryClientProvider>
  );
}

const DataDownload = () => {
  useSupabaseGetAllQuery(dbNames.servicetype);
  useSupabaseGetAllQuery(dbNames.servicesubtype);
  return <></>;
};
