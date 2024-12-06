import { DashboardView } from "@/views/dashboard/dashboard-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EcoDairy.AI | Dashboard",
  description: "...",
};

export default function Home() {
  return <DashboardView />;
}
