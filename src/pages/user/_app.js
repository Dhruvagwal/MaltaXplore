import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppHeader } from "@/components/dashboard/app-header";
import { useEffect } from "react";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import addUserToDatabase from "@/features/addUser";
import { getUserFromDatabase } from "@/features/getUser";
import Auth from "@/components/auth";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Home,
  },
  {
    title: "Favorite Trip",
    url: "/user/favorite-trip",
    icon: Search,
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
    title: "Cancelled Bookings",
    url: "/user/cancelled-bookings",
    icon: Calendar,
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
  }, [session]);

  if (!session) {
    return <Auth />;
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
