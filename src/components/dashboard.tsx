"use client";

// import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Droplet,
  ThermometerSun,
  Bell,
  BarChart as BarChartIcon,
  Icon,
  Zap,
  WalletCards,
} from "lucide-react";
import { cowHead } from "@lucide/lab";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toast } from "@/components/ui/toast";
// import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { ChartConfig } from "@/components/ui/chart";
import MethaneVsMilkChart from "./methane-trends-graph";
import { FeedEfficiencyAnalysis } from "./feed-efficiency-analysis-graph";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import CowSelectionAndFeed from "./cow-selection-and-feed";
import { cowsData } from "@/views/dashboard/dashboard-view";

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

// const averageEfficiency =
//   cowsData.reduce((sum, data) => sum + data.milkYield / data.feedIntake, 0) /
//   cowsData.length;

interface ChartData {
  date: string;
  methane: number;
  milk: number;
}

export function Dashboard() {
  // const [selectedCow, setSelectedCow] = useState("all");

  const chartData: ChartData[] = [
    { date: "2024-09-02", methane: 27.7, milk: 29.2 }, // Week 1
    { date: "2024-09-09", methane: 27.9, milk: 29.9 }, // Week 2
    { date: "2024-09-16", methane: 28.1, milk: 30.6 }, // Week 3
    { date: "2024-09-23", methane: 28.3, milk: 31.3 }, // Week 4
    { date: "2024-09-30", methane: 28.5, milk: 32.0 }, // End of month
  ];

  // const { toast } = useToast();

  // const formatDate = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // const CustomTooltip = ({
  //   active,
  //   payload,
  //   label,
  // }: {
  //   active: boolean;
  //   payload: any[];
  //   label: string;
  // }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="bg-white p-4 border rounded-lg shadow-sm">
  //         <p className="font-medium">{formatDate(label)}</p>
  //         <p className="text-sm text-green-600">
  //           Milk Production: {payload[0].value} kg/day/cow
  //         </p>
  //         <p className="text-sm text-red-600">
  //           Methane Emissions: {payload[1].value} kg/day/cow
  //         </p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  // const generateFullReport = () => {
  //   return {
  //     milkProduction: {
  //       total: 8550,
  //       average: 28.5,
  //       topProducer: "Bessie",
  //     },
  //     methaneEmissions: {
  //       total: 33600,
  //       average: 112,
  //       lowestEmitter: "Daisy",
  //     },
  //     feedEfficiency: {
  //       average: 1.8,
  //       bestPerformer: "Molly",
  //     },
  //     healthIncidents: [
  //       { cow: "Bessie", issue: "Mild fever", status: "Resolved" },
  //       { cow: "Daisy", issue: "Lameness", status: "Ongoing" },
  //       { cow: "Molly", issue: "Mastitis", status: "Resolved" },
  //     ],
  //   };
  // };

  // const chartConfig = {
  //   methane: {
  //     label: "Methane",
  //     color: "hsl(var(--chart-1))",
  //   },
  //   milk: {
  //     label: "Milk",
  //     color: "hsl(var(--chart-2))",
  //   },
  // } satisfies ChartConfig;

  // const pieChartConfig = {
  //   efficiency: {
  //     label: "Feed Efficiency",
  //   },
  // } satisfies ChartConfig;

  console.log("====> chart data: ", chartData);

  return (
    <div className="mx-auto">
      <div className="flex items-center mb-8">
        <div className="flex items-center justify-center flex-col">
          <Avatar className="h-[100px] w-[100px] me-4">
            <AvatarImage
              src={"/person-placeholder.png"}
              alt={"image"}
              className="object-cover"
            />
            <AvatarFallback>Th</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-green-800">Hello Thuku,</h1>
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
              <p className="text-2xl font-bold">37 days</p>
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
                Free trial
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

      {/* Overview Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Methane Emissions
            </CardTitle>
            <Icon iconNode={cowHead} className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112 g/day</div>
            <p className="text-xs text-muted-foreground">-4% from last month</p>
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
            <p className="text-xs text-muted-foreground">+6% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Herd Health Status
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              1 cow needs attention
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
              Increased temperatures may lead to heat stress. Consider adjusting
              feeding times and increasing water availability.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cow Selection Dropdown */}
      <CowSelectionAndFeed cowsData={cowsData} />

      {/* Trends & Analytics and Feed Efficiency Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Trends & Analytics */}
        <MethaneVsMilkChart />
        {/* Feed Efficiency Analysis */}
        <FeedEfficiencyAnalysis cowsData={cowsData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Detailed Cow Data */}
        <Card className="">
          <CardHeader>
            <CardTitle>Detailed Cow Data</CardTitle>
            <CardDescription>
              Individual cow statistics and comparisons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Weight (kg)</TableHead>
                  <TableHead>Lactation Stage</TableHead>
                  <TableHead>Today&apos;s Methane (g)</TableHead>
                  <TableHead>Today&apos;s Milk (L)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cowsData.map((cow) => (
                  <TableRow key={cow.id}>
                    <TableCell>{cow.name}</TableCell>
                    <TableCell>{cow.age}</TableCell>
                    <TableCell>{cow.weight}</TableCell>
                    <TableCell>{cow.lactationStage}</TableCell>
                    <TableCell>
                      {Math.floor(Math.random() * (150 - 80) + 80)}
                    </TableCell>
                    <TableCell>
                      {Math.floor(Math.random() * (35 - 20) + 20)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* IoT Integration & Notifications */}
        <Card className="">
          <CardHeader className="flex flex-row items-center">
            <Bell className="h-6 w-6 text-blue-600 mr-2" />
            <div>
              <CardTitle>IoT Notifications</CardTitle>
              <CardDescription>
                Real-time updates from methane sensors connected to cows in the
                barn
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="outline" className="text-green-600 bg-green-100">
                All systems operational
              </Badge>
              <p>Monitoring 3 connected devices. Last update: 13 days ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Report Summary */}
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
                      <p className="text-sm text-muted-foreground">Total:</p>
                      <p>8,550 L</p>
                      <p className="text-sm text-muted-foreground">Average:</p>
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
                      <p className="text-sm text-muted-foreground">Total:</p>
                      <p>33,600 g</p>
                      <p className="text-sm text-muted-foreground">Average:</p>
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
                      <p className="text-sm text-muted-foreground">Average:</p>
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
                      <p className="text-sm text-muted-foreground">Bessie:</p>
                      <p>Mild fever (Resolved)</p>
                      <p className="text-sm text-muted-foreground">Daisy:</p>
                      <p>Lameness (Ongoing)</p>
                      <p className="text-sm text-muted-foreground">Molly:</p>
                      <p>Mastitis (Resolved)</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Toast />
    </div>
  );
}
