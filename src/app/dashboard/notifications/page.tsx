"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "@/components/notis-item";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const notifications = [
  {
    type: "alert" as const,
    title: "High Methane Level Detected",
    description: "Barn 3 methane levels above threshold",
    time: "5 minutes ago",
    read: false,
  },
  {
    type: "health" as const,
    title: "Cow Health Alert",
    description: "Bessie showing irregular activity patterns. Veterinary check recommended.",
    time: "30 minutes ago",
    avatar: "/vet.jpg",
    read: false,
  },
  {
    type: "delivery" as const,
    title: "Feed Delivery Scheduled",
    description: "Ordered Probiotics arriving tomorrow at 08:00",
    time: "1 hour ago",
    read: false,
  },
  {
    type: "maintenance" as const,
    title: "Equipment Maintenance Due",
    description: "Automated milking system in Parlor 2 requires scheduled maintenance",
    time: "4 hours ago",
    read: true,
  },
  {
    type: "weather" as const,
    title: "Weather Alert",
    description: "Heavy rain forecast for next 24 hours. Check barn drainage systems.",
    time: "5 hours ago",
    read: true,
  },
  {
    type: "production" as const,
    title: "Milk Production Report",
    description: "Daily yield: 2,450 gallons. 3% above weekly average.",
    time: "Yesterday",
    read: true,
  },
];

export default function NotificationsPanel() {
  return (
    <div className="flex h-full flex-col w-[80vw]">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-lg font-semibold">Farm Notifications</h2>
          <p className="text-sm text-muted-foreground">
            {notifications.filter(n => !n.read).length} alerts requiring attention
          </p>
        </div>
        <Button variant="ghost" size="sm" className="gap-2">
          <CheckCheck className="h-4 w-4" />
          Clear all alerts
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              {...notification}
              onDismiss={() => console.log('Dismissed notification', index)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}