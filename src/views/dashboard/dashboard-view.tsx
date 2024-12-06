"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Droplet,
  ThermometerSun,
  Bell,
  BarChart as BarChartIcon,
  Icon,
  Zap,
  WalletCards,
  BrainCircuit,
} from "lucide-react";
import { cowHead } from "@lucide/lab";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MethaneVsMilkChart from "@/components/methane-trends-graph";
import { FeedEfficiencyAnalysis } from "@/components/feed-efficiency-analysis-graph";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useUserStore } from "@/providers/user-store-provider";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import NotAuthenticatedComponent from "@/components/not-authenticated";
import MethaneMonitor from "@/components/live-methane-monitoring-graph";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { sendWhatsAppMessage } from "@/lib/send-whatsapp-message";
import CowAlert from "@/components/cows-alert-card";
import { Cow } from "@/lib/mock-data-generator";
import Image from "next/image";

// Mock data generation functions
// const generateData = (startDate: Date, days: number): any[] => {
//   const data = [];
//   let methane = 150;
//   let milk = 20;

//   for (let i = 0; i < days; i++) {
//     const date = new Date(startDate);
//     date.setDate(date.getDate() + i);

//     // Simulate a reduction in methane and increase in milk production over time
//     methane = Math.max(80, methane - Math.random() * 2);
//     milk = Math.min(35, milk + Math.random() * 0.5);

//     data.push({
//       date: date.toLocaleDateString(),
//       methane: Math.floor(methane),
//       milk: Math.floor(milk),
//     });
//   }
//   return data;
// };

export const cowsData: Cow[] = [
  {
    id: 1,
    name: "Bessie",
    age: 3,
    weight: 257, // kg
    lactationStage: "mid",
    milkYield: 22, // liters per day
    feedIntake: 33, // kg per day
    currentMethaneEmission: 107,
  },
  {
    id: 2,
    name: "Daisy",
    age: 2,
    weight: 300, // kg
    lactationStage: "early",
    milkYield: 20, // liters per day
    feedIntake: 39, // kg per day
    currentMethaneEmission: 113,
  },
  {
    id: 3,
    name: "Molly",
    age: 2,
    weight: 337, // kg
    lactationStage: "late",
    milkYield: 19, // liters per day
    feedIntake: 42, // kg per day
    currentMethaneEmission: 97,
  },
];

// const averageEfficiency =
//   cowsData.reduce((sum, data) => sum + data.milkYield / data.feedIntake, 0) /
//   cowsData.length;

// interface ChartData {
//   date: string;
//   methane: number;
//   milk: number;
// }

export function DashboardView() {
  // const [selectedCow, setSelectedCow] = useState("all");


  const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");
  const { toast } = useToast();

  const handleSendReport = async () => {
    // Trim the zero in contactInfo and add the country code
    contactInfo.replace(/^0/, "+254");

    console.log("contactInfo: ", contactInfo);
    await sendWhatsAppMessage(contactInfo, "Your monthly report is ready!");
    toast({
      title: "Report Sent",
      description: `Your report has been sent to ${contactInfo}`,
    });
    setOpen(false);
  };

  const [activeTab, setActiveTab] = useState("overview");

  const handleIoTCardClick = () => {
    setActiveTab("iot");
  };

  if (!user) {
    return <NotAuthenticatedComponent />;
  }

  return (
    <main className="">
      <div className="flex items-center mb-8">
        <div className="flex items-center justify-center flex-col">
          <Avatar className="me-4">
            <Image
              src={"/person.jpg"}
              alt={"image"}
              height={400}
              width={400}
              className="object-cover"
            />
            <AvatarFallback>Th</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Hello {user?.fullName.split(" ")[0] || "Guest"}
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Your stats today
            </p>
          </div>
        </div>
        <DividerVerticalIcon className="h-20 w-8 text-muted-foreground mx-8" />
        <div className="flex items-center gap-8">
          {/* show streaks and number using lightning bolt icon */}
          <div className="flex items-center space-x-2">
            <Zap className="h-12 w-12 fill-yellow-400 stroke-none" />
            <div>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-bold">4 days</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Zap className="h-12 w-12 fill-gray-300 stroke-none" />
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <DividerVerticalIcon className="h-20 w-8 text-muted-foreground mx-8" />
        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <WalletCards className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-sm text-muted-foreground">
                Subscription Status
              </p>
              <Badge variant="outline" className="text-green-600 bg-green-100">
                {user?.subscriptionStatus || "Free"}
              </Badge>
            </div>
            <Link href="/subscribe">
              <Button variant="outline" className="ms-4" size="sm">
                Upgrade
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Button
        asChild
        className=" cursor-pointer mb-8 bg-emerald-500 text-white text-md"
      >
        <Link href="/dashboard/feed-optimization">
          <BrainCircuit className="h-8 w-8" />
          <span>AI Feed Plan</span>
        </Link>
      </Button>
      <Button
        asChild
        className=" cursor-pointer mb-8 mx-2 bg-emerald-500 text-white text-md"
      >
        <Link href="/dashboard/record-daily-data">
          <BrainCircuit className="h-8 w-8" />
          <span>Record Today&apos;s Data</span>
        </Link>
      </Button>

      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="overview"
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Trends & Analytics
          </TabsTrigger>
          <TabsTrigger
            value="cows&data"
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Cows & Data
          </TabsTrigger>
          <TabsTrigger
            value="iot"
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            IoT & Notifications
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Tabs contents */}

        {/* Overview Panel */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-purple-400" onClick={handleIoTCardClick}>
              <CardHeader className="flex flex-row items-center">
                <Bell className="h-6 w-6 text-blue-600 mr-2" />
                <div>
                  <CardTitle>IoT Notifications</CardTitle>
                  <CardDescription>
                    Real-time updates from methane sensors connected to cows in
                    the barn
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-100"
                  >
                    All systems operational
                  </Badge>
                  <p>
                    Monitoring 1 connected device <br /> Last update: a few seconds ago
                    ago
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Methane Emissions
                </CardTitle>
                <Icon iconNode={cowHead} className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">112 g/day</div>
                <p className="text-xs text-muted-foreground">
                  -4% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Milk Yield
                </CardTitle>
                <Droplet className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.5 L/day</div>
                <p className="text-xs text-muted-foreground">
                  +6% from last month
                </p>
              </CardContent>
            </Card>

            {/* Weather Impact Alert */}
            <Card className="bg-orange-100 border-orange-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <ThermometerSun className="h-6 w-6 text-orange-600 mr-2" />
                <div>
                  <CardTitle>Weather Impact Alert</CardTitle>
                  <CardDescription>
                    High temperatures expected this week
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Increased temperatures may lead to heat stress. Consider
                  adjusting feeding times and increasing water availability.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="">
            {/* Trends & Analytics */}
            <MethaneVsMilkChart />
            {/* Feed Efficiency Analysis */}
            <FeedEfficiencyAnalysis cowsData={cowsData} />
          </div>
        </TabsContent>

        {/* Cow Selection Dropdown */}
        <TabsContent value="trends">
          {/* Trends & Analytics and Feed Efficiency Analysis */}
          <div className="">
            {/* Trends & Analytics */}
            <MethaneVsMilkChart />
            {/* Feed Efficiency Analysis */}
            <FeedEfficiencyAnalysis cowsData={cowsData} />
          </div>
        </TabsContent>

        <TabsContent value="cows&data">
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Detailed Cow Data */}
            <CowAlert cowsData={cowsData} />
          </div>
        </TabsContent>

        {/* IoT Integration & Notifications */}
        <TabsContent value="iot">
          <Card className="">
            <CardHeader className="flex flex-row items-center">
              <Bell className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <CardTitle>IoT Notifications</CardTitle>
                <CardDescription>
                  Real-time updates from methane sensors connected to cows in
                  the barn
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="text-green-600 bg-green-100"
                >
                  All systems operational
                </Badge>
                <p>
                  {/* Monitoring 1 connected device <br /> Last update: 3 seconds
                  ago */}
                  No connected devices
                </p>
                <Badge className="text-green-600 bg-green-100">
                  Demo Account
                </Badge>
              </div>
            </CardContent>
          </Card>
          <MethaneMonitor />
        </TabsContent>

        {/* Monthly Report Summary */}
        <TabsContent value="reports">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center">
              <BarChartIcon className="h-6 w-6 text-purple-600 mr-2" />
              <div>
                <CardTitle>Monthly Report Summary</CardTitle>
                <CardDescription>
                  Key performance indicators for the past month
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Average Daily Milk Yield:</strong> 28.5 L/cow
                </p>
                <p>
                  <strong>Average Methane Emissions:</strong> 112 g/cow/day
                </p>
                <p>
                  <strong>Feed Efficiency:</strong> 1.8 L milk / kg feed
                </p>
                <p>
                  <strong>Health Incidents:</strong> 3 (2 resolved, 1 ongoing)
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2">View Full Report</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>Monthly Full Report</DialogTitle>
                      <DialogDescription>
                        Detailed performance metrics for the past month
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 items-start gap-20">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <h3 className="font-semibold col-span-2">
                            Milk Production
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Total:
                          </p>
                          <p>8,550 L</p>
                          <p className="text-sm text-muted-foreground">
                            Average:
                          </p>
                          <p>28.5 L/cow/day</p>
                          <p className="text-sm text-muted-foreground">
                            Top Producer:
                          </p>
                          <p>Bessie</p>
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                          <h3 className="font-semibold col-span-2">
                            Methane Emissions
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Total:
                          </p>
                          <p>33,600 g</p>
                          <p className="text-sm text-muted-foreground">
                            Average:
                          </p>
                          <p>112 g/cow/day</p>
                          <p className="text-sm text-muted-foreground">
                            Lowest Emitter:
                          </p>
                          <p>Daisy</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-start lg:mt-4 gap-20">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <h3 className="font-semibold col-span-2">
                            Feed Efficiency
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Average:
                          </p>
                          <p>1.8 L milk / kg feed</p>
                          <p className="text-sm text-muted-foreground">
                            Best Performer:
                          </p>
                          <p>Molly</p>
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                          <h3 className="font-semibold col-span-2">
                            Health Incidents
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Bessie:
                          </p>
                          <p>Mild fever (Resolved)</p>
                          <p className="text-sm text-muted-foreground">
                            Daisy:
                          </p>
                          <p>Lameness (Ongoing)</p>
                          <p className="text-sm text-muted-foreground">
                            Molly:
                          </p>
                          <p>Mastitis (Resolved)</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="mx-2">Export reports</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Export your report</DialogTitle>
                      <DialogDescription>
                        Choose how you&apos;d like to receive your report.
                      </DialogDescription>
                    </DialogHeader>
                    <RadioGroup
                      value={contactMethod}
                      onValueChange={setContactMethod}
                      className="mb-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone">Phone (Whatsapp)</Label>
                      </div>
                    </RadioGroup>
                    <Label htmlFor="contact-info">
                      {contactMethod === "email"
                        ? "Email Address"
                        : "Phone Number"}
                    </Label>
                    <Input
                      id="contact-info"
                      value={contactInfo}
                      onChange={(e) => {
                        // if contact method is phone, remove the zero at the beginning of the phone number and add the country code
                        if (contactMethod === "phone") {
                          setContactInfo(e.target.value.replace(/^0/, "+254"));
                        } else {
                          setContactInfo(e.target.value);
                        }
                      }}
                      placeholder={
                        contactMethod === "email"
                          ? "Enter your email"
                          : "Enter your phone number"
                      }
                      className="mb-4"
                    />
                    <Button onClick={handleSendReport}>Send Report</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
