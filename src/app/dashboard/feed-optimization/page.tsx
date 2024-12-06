"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MilkIcon as Cow, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Cow as CowInterface,
  generateMockData,
} from "@/lib/mock-data-generator";
import { cowsData } from "@/views/dashboard/dashboard-view";
import ComparativeMetrics from "@/components/comparative-metrics";

// Mock data for demonstration
const cows = [
  { id: 1, name: "Bessie", image: "/cow-images/bessie.png" },
  { id: 2, name: "Daisy", image: "/cow-images/daisy.png" },
  { id: 3, name: "Molly", image: "/cow-images/molly.png" },
];

interface ResponseData {
  dryMatterIntake: {
    type: string;
    amount: string;
    nutritionalInfo: string;
  };
  feedAdditive: {
    type: string;
    amount: string;
    nutritionalInfo: string;
  };
  milkYieldMethaneData: {
    day: number;
    milkYield: number;
    methaneEmission: number;
  }[];
  summary: string;
  predictedMilkYield: number;
  predictedMethaneEmission: number;
}

const healthStatuses = ["Healthy", "Injured", "Chronically Sick"];

const mockApiCall = (cow: CowInterface, healthStatus: string): Promise<ResponseData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockData(cow, healthStatus));
    });
  });

interface DonutChartProps {
  value: number;
  maxValue: number;
  title: string;
  thresholds: {
    low: number;
    high: number;
  };
}

const DonutChart: React.FC<DonutChartProps> = ({
  value,
  maxValue,
  title,
  thresholds,
}) => {
  const percentage = (value / maxValue) * 100;
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color;
  if (title.toLowerCase() === "grams") {
    if (value < thresholds.low) {
      color = "text-green-500";
    } else if (value > thresholds.high) {
      color = "text-red-500";
    } else {
      color = "text-amber-500";
    }
  } else {
    if (value < thresholds.low) {
      color = "text-red-500";
    } else if (value > thresholds.high) {
      color = "text-green-500";
    } else {
      color = "text-amber-500";
    }
  }

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          className={color}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-2xl font-bold"
        >
          {value}
        </text>
      </svg>
      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
};

export default function Component() {
  const [selectedCow, setSelectedCow] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [showHealthChips, setShowHealthChips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ResponseData | null>(
    null
  );
  const [streamedSummary, setStreamedSummary] = useState("");
  // const [storedRecommendations, setStoredRecommendations] = useState<{
  //   [key: string]: { [key: string]: ResponseData };
  // }>({});

  const [showSelectionUI, setShowSelectionUI] = useState(true);
  interface HistoryEntry {
    cowId: string;
    cowName: string | undefined;
    healthStatus: string;
    timestamp: string;
    data: ResponseData;
  }

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  useEffect(() => {
    if (selectedCow) {
      setShowHealthChips(true);
    } else {
      setShowHealthChips(false);
      setHealthStatus("");
    }
  }, [selectedCow]);

  const [currentMilkYield, setCurrentMilkYield] = useState<number | undefined>(undefined);
  const [currentMethaneEmission, setCurrentMethaneEmission] = useState<number | undefined>(undefined);

  const handleGetRecommendations = async () => {
    setLoading(true);
    const selectedCowData = cowsData.find(
      (cow) => cow.id === Number(selectedCow)
    );
    console.log("selected cow:", selectedCow);
    setCurrentMilkYield(selectedCowData?.milkYield);
    setCurrentMethaneEmission(selectedCowData?.currentMethaneEmission);

    console.log("Selected cow data", selectedCowData);
    if (!selectedCowData) return;
    const data = await mockApiCall(
      { ...selectedCowData, id: selectedCowData.id },
      healthStatus
    );
    setRecommendations(data);
    setLoading(false);
    streamSummary(data.summary);
    setShowSelectionUI(false);
    // Store the new recommendations
    const newHistoryEntry = {
      cowId: selectedCow,
      cowName: cows.find((cow) => cow.id.toString() === selectedCow)?.name,
      healthStatus,
      timestamp: new Date().toLocaleString(),
      data,
    };

    setHistory((prev) => [newHistoryEntry, ...prev]);
    console.log("History", history);
  };

  const handleSelectDifferentCow = () => {
    setShowSelectionUI(true);
    setSelectedCow("");
    setHealthStatus("");
    setRecommendations(null);
    setStreamedSummary("");
  };

  const streamSummary = (summary: string) => {
    let i = 0;
    const interval = setInterval(() => {
      setStreamedSummary((prev) => prev + summary[i]);
      i++;
      if (i === summary.length) clearInterval(interval);
    }, 25);
  };

  interface RecommendationTableProps {
    title: string;
    data: {
      type: string;
      amount: string;
      nutritionalInfo: string;
    };
  }

  const RecommendationTable = ({ title, data }: RecommendationTableProps) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{data.type}</TableCell>
              <TableCell>{data.amount}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Nutritional Analysis
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {data.nutritionalInfo}
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Try to get the cow's name or id from params using useParams from next 14
  const params = useSearchParams();
  const cowName = params.get("cowName");

  useEffect(() => {
    if (cowName) {
      // Find the cow ID that matches the name from the URL
      const cow = cowsData.find((cow) => cow.name === cowName);
      if (cow) {
        setSelectedCow(cow.id.toString());
      }
    }
  }, [cowName]);

  return (
    <div className="mx-auto p-6 space-y-6">
      <Card className="w-[75vw]">
        <CardHeader>
          <CardTitle>Smart Feed Advisor</CardTitle>
          <CardDescription>
            {showSelectionUI
              ? "To get recommendations, please select a cow and health status below"
              : "Current recommendations and analysis"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {showSelectionUI ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex space-x-4 items-center justify-between"
              >
                <div className="space-y-4">
                  <Select onValueChange={setSelectedCow} value={selectedCow}>
                    <SelectTrigger className="w-[20rem]">
                      <SelectValue placeholder="Select a cow">
                        {selectedCow
                          ? cows.find(
                              (cow) => cow.id.toString() === selectedCow
                            )?.name
                          : "Select a cow"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {cows.map((cow) => (
                        <SelectItem key={cow.id} value={cow.id.toString()}>
                          {cow.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <AnimatePresence>
                    {showHealthChips && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-2"
                      >
                        {healthStatuses.map((status) => (
                          <Button
                            key={status}
                            variant={
                              healthStatus === status ? "default" : "outline"
                            }
                            onClick={() => setHealthStatus(status)}
                            className="rounded-full"
                          >
                            {status}
                          </Button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleGetRecommendations}
                    disabled={!selectedCow || !healthStatus || loading}
                    className="w-[20rem]"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Cow className="mr-2 h-4 w-4" />
                    )}
                    Get Feed Recommendations
                  </Button>
                </div>
                {selectedCow && (
                  <div className="w-[240px] h-[240px] bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={
                        cows.find((cow) => cow.id.toString() === selectedCow)
                          ?.image
                      }
                      alt={`Cow ${selectedCow}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-between items-center"
              >
                <Button
                  onClick={handleSelectDifferentCow}
                  className="w-[20rem]"
                >
                  <Cow className="mr-2 h-4 w-4" />
                  Select Different Cow
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {recommendations && (
        <div className="grid gap-8 grid-cols-2">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <RecommendationTable
                title="Nutrient-Rich Feed Blend"
                data={recommendations.dryMatterIntake}
              />
              <RecommendationTable
                title="Feed Additive"
                data={recommendations.feedAdditive}
              />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-4">Comparative Metrics</h2>
              <ComparativeMetrics recommendations={recommendations} currentMilkYield={currentMilkYield} currentMethaneEmission={currentMethaneEmission} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Milk Yield and Methane Emission Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={recommendations.milkYieldMethaneData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="milkYield"
                      stroke="#8884d8"
                      name="Milk Yield (L)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="methaneEmission"
                      stroke="#82ca9d"
                      name="Methane Emission (g)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            {recommendations && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Predicted Milk Yield</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <DonutChart
                      value={recommendations.predictedMilkYield}
                      maxValue={40}
                      title="Liters"
                      thresholds={{ low: 20, high: 27 }}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Predicted Methane Emission</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <DonutChart
                      value={recommendations.predictedMethaneEmission}
                      maxValue={500}
                      title="Grams"
                      thresholds={{ low: 350, high: 380 }}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
            <Card className="h-[20rem] mt-8 bg-emerald-200">
              <CardHeader>
                <CardTitle>Recommendation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{streamedSummary}</p>
                {streamedSummary.length < recommendations.summary.length && (
                  <span className="inline-flex ml-1">
                    <span className="animate-bounce mx-0.5">.</span>
                    <span className="animate-bounce animation-delay-200 mx-0.5">
                      .
                    </span>
                    <span className="animate-bounce animation-delay-400 mx-0.5">
                      .
                    </span>
                  </span>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* {Object.keys(storedRecommendations).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Stored Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(storedRecommendations).map(([cowId, dates]) => (
              <div key={cowId}>
                <h3 className="text-lg font-semibold mb-2">Cow {cowId}</h3>
                {Object.entries(dates).map(([date, data]) => (
                  <div key={date} className="mb-4">
                    <h4 className="text-md font-medium">{date}</h4>
                    <p>{data.summary}</p>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
