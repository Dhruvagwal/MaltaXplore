import { CalendarIcon, ClockAlert } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
export function HoverCardComponent({ title, data, heading }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="gap-2">
          {title}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm">{heading}</h4>
            <p className="text-sm text-muted-foreground">{data}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
