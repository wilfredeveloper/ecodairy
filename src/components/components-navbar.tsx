"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Plus } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Statistics", href: "/dashboard/statistics"},
  { name: "Daily Data Recording", href: "/dashboard/record-daily-data" },
];

const registerItems = [
  { name: "Add Cow", href: "/dashboard/register/cow" },
  { name: "Register Farmer", href: "/dashboard/register/farmer" },
];

export function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (pathname === "/dashboard" || pathname === "/" || pathname === "/subscribe") {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed top-8 w-[70vw] mx-auto left-0 right-0 z-50 transition-all rounded-full px-8 duration-300 ease-in-out",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-gray-50/50 shadow-sm",
        isVisible ? "translate-y-0" : "-translate-y-full -top-full"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-center flex-col">
            <Link
              href="/dashboard"
              className="text-2xl flex items-center font-bold text-green-800 p-4"
            >
              <Image
                src="/logo.png"
                alt="EcoDairy.AI"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-sm text-green-500">Ecodairy.AI</p>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            {navItems.map((item) => (
                <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                  ? "text-primary text-green-400 font-bold underline underline-offset-4 underline-[4px]"
                  : "text-muted-foreground"
                )}
                >
                {item.name}
                </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Register <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {registerItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : ""
                      )}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {navItems.concat(registerItems).map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : ""
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
