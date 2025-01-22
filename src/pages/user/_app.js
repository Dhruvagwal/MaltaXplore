import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppHeader } from "@/components/dashboard/app-header";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/supabaseConfig";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuthState } from "@/context/ueAuthContext";
import addUserToDatabase from "@/features/addUser";
import { getUserFromDatabase } from "@/features/getUser";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Home,
  },
  {
    title: "Upcoming Bookings",
    url: "/user/upcoming-bookings",
    icon: Inbox,
  },
  {
    title: "Past Bookings",
    url: "/user/past-bookings",
    icon: Calendar,
  },
  {
    title: "Favorite Trip",
    url: "/user/favorite-trip",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];

export default function UserWrapper({ children, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { session, setSession, setUser } = useAuthState();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        addUserToDatabase(session.user);

        const fetchUserData = async () => {
          const user = await getUserFromDatabase(session?.user.id);
          if (user) {
            setUser(user);
          }
        };

        fetchUserData();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflow-hidden">
          <Sidebar>
            <SidebarHeader>
              <div className="flex justify-center items-center">
                <Link href={"/"}>
                  <Image
                    src="/images/black_logo.svg"
                    height={100}
                    width={150}
                  />
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={currentPath == item.url}
                          asChild
                        >
                          <Link href={item.url} className="w-fit">
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <AppHeader />
            {/* <SidebarTrigger /> */}
            <SidebarInset>
              <main className="p-8">{children}</main>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
