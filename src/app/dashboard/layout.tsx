"use client";

import AppSidebar from "@/components/components-sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAIAssistantPage = pathname === "/dashboard/ai-assistant";

  return (
    <div className="flex h-screen">
      {!isAIAssistantPage && <AppSidebar />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
