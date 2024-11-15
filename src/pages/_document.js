import { Html, Head, Main, NextScript } from "next/document";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
