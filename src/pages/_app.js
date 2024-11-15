import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/globals.css";
import "../services/i18n";
export default function App({ Component, pageProps }) {
  return (
    <ScrollArea className="h-[100vh] w-screen">
      <Component {...pageProps} />
    </ScrollArea>
  );
}
