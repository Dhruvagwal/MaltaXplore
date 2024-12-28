import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ChatSection() {
  return (
    <div className="bg-[#E5484D] rounded-xl overflow-hidden">
      {/* <div className="container mx-auto px-4 py-12"> */}
      <div className="mx-auto px-4 md:px-28 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://s3-alpha-sig.figma.com/img/1d4d/f6d3/19d4ef8c894e7c37c4adb6d9d646e64d?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BoB1PJAwVcYrZ1QK8XK3tonbQFpcfp0xWf0xsyKa70GsCl7~hYjJWNyBhISz8Blt9e36mN~YVya2BEmaZCNAWXqLL7ouBQG2vT5ySrZsRadpKzKyWjneYglvqCoIp8Y7LUj7QLGPxCqz~U4QS9eksZLhcpVfLMco5Js2l6yIwenAq-ZKaAu~1odM7zeiD7VSBO2KKdKCAD-iu7MXMknpDQTutkzvz~x3BaqeHDJo85gbkc~W20gOcQ0STN1OsOrGWOig9v-2VK7MhLOvXLO52abQnZm2L-0K9s0ovtI~0agQf0u8fTNxkKulcUd80RdB9QlomYyz3zw9f-12ENth5w__"
              alt="Customer Service Team"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold">Got questions about Malta?</h2>
            <p className="ext-2xl md:text-4xl font-bold">We're here to help – let's chat!</p>
            <Button className="bg-white text-[#E5484D] hover:bg-white/90">
              Live Chat With Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
