import AppSidebar from "@/components/components-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="overflow-y-auto px-8 py-16">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
