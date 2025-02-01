import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ChatSection() {
  return (
    <div className="bg-[#E5484D] rounded-xl overflow-hidden">
      {/* <div className="container mx-auto px-4 py-12"> */}
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Image
            src="./call-center.jpg"
            alt="Customer Service Team"
            width={1000}
            height={1000}
            className="rounded-r-3xl"
          />
          <div className="text-white py-12 space-y-6">
            <h2 className="text-4xl font-bold">Got questions about Malta?</h2>
            <p className="ext-2xl md:text-4xl font-bold">
              We're here to help – let's chat!
            </p>
            <p>Click on Chat Icon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
