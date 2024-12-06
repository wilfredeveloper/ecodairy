"use client";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCheck,
  Clock,
  Mail,
  MessageSquare,
  Package,
  UserPlus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";

type NotificationItemProps = {
  type:
    | "alert"
    | "health"
    | "delivery"
    | "system"
    | "maintenance"
    | "weather"
    | "production"
    | "inventory";

  title: string;

  description: string;

  time: string;

  read: boolean;

  avatar?: string;

  onDismiss: () => void;
};

export function NotificationItem({
  type,
  title,
  description,
  time,
  read = false,
  avatar,
  onDismiss,
}: NotificationItemProps) {
  const [isRead, setIsRead] = useState(read);

  const icons = {
    alert: Bell,
    health: Bell,
    delivery: Package,
    system: Bell,
    maintenance: Bell,
    weather: Bell,
    production: Bell,
    inventory: Bell,
    message: MessageSquare,
    mention: Mail,
    follow: UserPlus,
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "group relative flex items-start gap-4 p-4 rounded-lg transition-colors",
        !isRead && "bg-secondary/50",
        isRead && "bg-background hover:bg-secondary/30"
      )}
    >
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isRead && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsRead(true)}
          >
            <CheckCheck className="h-4 w-4" />
          </Button>
        )}
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {avatar ? (
        <Avatar className="h-9 w-9">
          <img src={avatar} alt="Avatar" className="object-cover" />
        </Avatar>
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      )}

      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 pt-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
    </div>
  );
}
