import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/globals.css";
import "../services/i18n";

import localFont from "next/font/local";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/cui/footer";
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
  return (
    <>
      <ScrollArea
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-screen antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Navbar />
        <Component {...pageProps} />
      <Footer />
      </ScrollArea>
    </>
  );
}
