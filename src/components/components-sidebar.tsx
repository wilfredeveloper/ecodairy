"use client";

import React from "react";
import {
  Calendar,
  Home,
  Bell,
  Tractor,
  TrendingUp,
  Vegan,
  ChevronDown,
  Settings,
  LogOut,
  User,
  BrainCircuit,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/providers/user-store-provider";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Statistics", href: "/dashboard/statistics", icon: TrendingUp },
  {
    name: "Daily Data Recording",
    href: "/dashboard/record-daily-data",
    icon: Calendar,
  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: BrainCircuit,
  },
  {
    name: "Marketplace",
    href: "/dashboard/marketplace",
    icon: ShoppingCart,
  },
];

const registerItems = [
  { name: "Add Cow", href: "/dashboard/register/cow", icon: Vegan },
  {
    name: "Add Farm",
    href: "/dashboard/register/farmer",
    icon: Tractor,
  },
];

export default function AppSidebar() {
  const storedRecommendations = {
    Bessie: {
      "2023-06-01": "Recommendation for Bessie on June 1st",
      "2023-06-02": "Recommendation for Bessie on June 2nd",
    },
    Daisy: {
      "2023-06-01": "Recommendation for Daisy on June 1st",
    },
    Molly: {
      "2023-06-03": "Recommendation for Molly on June 3rd",
    },
  };

  const logout = useUserStore((state) => state.logout);
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isAuthenticated = true;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link
          href="/dashboard"
          className="flex flex-col items-center space-x-2"
        >
          <Image
            src="/logo.png"
            alt="EcoDairy.AI"
            width={100}
            height={100}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-green-800">EcoDairy.AI</span>
        </Link>
      </SidebarHeader>
      {isAuthenticated ? (
        <>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>AI</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="h-20 cursor-pointer bg-emerald-500 text-white text-md"
                    >
                      <Link href="/dashboard/feed-optimization">
                        <BrainCircuit className="h-8 w-8" />
                        <span>Get Feed Plan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Stored Recommendations</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Object.entries(storedRecommendations).map(
                    ([cowName, dates]) => (
                      <SidebarMenuItem key={cowName}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                              <Vegan className="h-4 w-4 mr-2" />
                              <span>{cowName}</span>
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {Object.entries(dates).map(([date]) => (
                              <DropdownMenuItem key={date}>
                                <Link
                                  href={`/dashboard/history/${cowName}/${date}`}
                                >
                                  {date}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Farm Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {registerItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Notifications</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/notifications">
                        <div className="flex items-center justify-between">
                          <Bell className="me-2 h-4 w-4" />
                          <span>Notifications</span>
                        </div>
                        <Badge className="bg-red-300">3</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span>User Profile</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </>
      ) : (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <Link href="/dashboard/login">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Login to Your Farm
                </Button>
              </Link>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
