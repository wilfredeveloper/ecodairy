import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, BrainCircuit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Link from "next/link";

interface Cow {
  id: number;
  name: string;
  age: number;
  weight: number;
  lactationStage: "early" | "mid" | "late";
  milkYield: number;
  feedIntake: number;
  currentMethaneEmission: number;
}

interface CowAlertProps {
  cowsData: Cow[];
}

const generateMonthlyData = (cow: Cow) => {
  const data = [];
  const today = new Date();
  const normalMilkYield = {
    early: 35,
    mid: 25,
    late: 18,
  }[cow.lactationStage];

  // Generate 30 days of data
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate declining milk yield
    const declineFactor = 1 - (i < 15 ? (15 - i) * 0.02 : 0); // Start decline in last 15 days
    const dailyMilkYield = (
      normalMilkYield *
      declineFactor *
      (0.95 + Math.random() * 0.1)
    ).toFixed(1);

    // Simulate increased methane emissions (inverse relationship with milk yield)
    const baseEmission = 400; // base methane emission in grams/day
    const emissionIncrease = (1 - declineFactor) * 100; // emissions increase as milk yield decreases
    const methaneEmission = (
      baseEmission +
      emissionIncrease * (0.95 + Math.random() * 0.1)
    ).toFixed(1);

    data.push({
      date: date.toLocaleDateString(),
      milkYield: parseFloat(dailyMilkYield),
      methaneEmission: parseFloat(methaneEmission),
    });
  }
  return data;
};

const CowDetailedAnalysis = ({ cow }: { cow: Cow }) => {
  const monthlyData = generateMonthlyData(cow);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mt-8">
      <Button
        variant="secondary"
        className="bg-emerald-400"
        onClick={() => {
          setIsVisible(!isVisible);
          if (!isVisible) {
            setTimeout(() => {
              document
                .getElementById(`details-${cow.id}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        }}
      >
        {isVisible ? "Hide Analysis" : "See Detailed Analysis"}
      </Button>
      {isVisible && (
        <h1 className="text-xl font-bold my-2">
          Showing Analysis for {cow.name}
        </h1>
      )}

      {isVisible && (
        <div id={`details-${cow.id}`} className="space-y-6 mt-6">
          <div className="gap-6 grid grid-cols-2">
            {/* Milk Yield Chart */}
            <Card className="animate-[fadeIn_0.5s_ease-in] my-4">
              <CardHeader>
                <CardTitle>Milk Yield Trend (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).getDate().toString()
                        }
                      />
                      <YAxis yAxisId="left" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="milkYield"
                        stroke="#2563eb"
                        name="Milk Yield (L/day)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Methane Emissions Chart */}
            <Card className="animate-[fadeIn_0.7s_ease-in] my-4">
              <CardHeader>
                <CardTitle>Methane Emissions Trend (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).getDate().toString()
                        }
                      />
                      <YAxis yAxisId="left" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="methaneEmission"
                        stroke="#dc2626"
                        name="Methane Emission (g/day)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card className="animate-[fadeIn_0.9s_ease-in] my-4">
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2">
                  <div className="animate-[slideInRight_0.5s_ease-in]">
                    <h4 className="font-semibold mb-2">Current Status:</h4>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Milk yield is{" "}
                        {(
                          (monthlyData[29].milkYield /
                            monthlyData[0].milkYield -
                            1) *
                          100
                        ).toFixed(1)}
                        % lower than 30 days ago
                      </li>
                      <li>
                        Methane emissions have increased by{" "}
                        {(
                          (monthlyData[29].methaneEmission /
                            monthlyData[0].methaneEmission -
                            1) *
                          100
                        ).toFixed(1)}
                        %
                      </li>
                      <li>
                        Current production is below expected range for{" "}
                        {cow.lactationStage} lactation stage
                      </li>
                    </ul>
                  </div>
                  <div className="animate-[slideInRight_0.7s_ease-in]">
                    <h4 className="font-semibold mb-2">Possible Causes:</h4>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Dietary imbalance or feed quality issues</li>
                      <li>Potential subclinical health conditions</li>
                      <li>Environmental stress factors</li>
                      <li>
                        Rumen microbiome disruption (indicated by increased
                        methane emissions)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="animate-[slideInRight_0.9s_ease-in]">
                  <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                  {/* Show the button for getting AI feed reccomendations */}
                  <Button
                    asChild
                    className=" cursor-pointer mb-8 bg-emerald-500 text-white text-md"
                  >
                    <Link
                      href={{
                        pathname: "/dashboard/feed-optimization",
                        query: { cowName: cow.name },
                      }}
                    >
                      <BrainCircuit className="h-8 w-8" />
                      <span>Get AI Feed Plan</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const CowAlert: React.FC<CowAlertProps> = ({ cowsData }) => {
  const [selectedCowId, setSelectedCowId] = useState<number | null>(null);

  const needsAttention = (cow: Cow) => {
    const lowYieldThresholds = {
      early: 33.5,
      mid: 20,
      late: 15,
    };
    const highEmissionThreshold = 100;
    return (
      cow.currentMethaneEmission > highEmissionThreshold ||
      cow.milkYield < lowYieldThresholds[cow.lactationStage]
    );
  };

  const cowsNeedingAttention = cowsData.filter(needsAttention);
  const selectedCow = cowsNeedingAttention.find(
    (cow) => cow.id === selectedCowId
  );

  return (
    <div className="space-y-6">
      {cowsNeedingAttention.length > 0 && (
        <Alert variant="destructive" className="border-yellow-500">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <AlertTitle className="ml-2 text-xl font-bold">
            {cowsNeedingAttention.length} Cows Need Attention
          </AlertTitle>
          <AlertDescription className="mt-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Select a cow to view details:
                </label>
                <Select
                  value={selectedCowId?.toString()}
                  onValueChange={(value) => setSelectedCowId(parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a cow..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cowsNeedingAttention.map((cow) => (
                      <SelectItem key={cow.id} value={cow.id.toString()}>
                        {cow.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-8">
        {selectedCow && (
          <div className="animate-[fadeIn_0.3s_ease-in]">
            <Alert variant="destructive" className="border-yellow-500">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <AlertTitle className="ml-2 text-xl font-bold">
                {selectedCow.name}&apos;s Status
              </AlertTitle>
              <AlertDescription className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <img
                      src={`/cow-images/${selectedCow.name.toLowerCase()}.png`}
                      alt={`Cow ${selectedCow.name}`}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-semibold">Age:</div>
                      <div>{selectedCow.age} years</div>
                      <div className="font-semibold">Weight:</div>
                      <div>{selectedCow.weight} kg</div>
                      <div className="font-semibold">Lactation Stage:</div>
                      <div className="capitalize">
                        {selectedCow.lactationStage}
                      </div>
                      <div className="font-semibold">Milk Yield:</div>
                      <div className="text-yellow-600 font-bold">
                        {selectedCow.milkYield} L/day
                      </div>
                      <div className="font-semibold">Feed Intake:</div>
                      <div>{selectedCow.feedIntake} kg/day</div>
                    </div>
                    <div className="mt-4 p-2 bg-yellow-50 rounded-md">
                      <p className="text-sm text-yellow-800">
                        Detected Issue: Low milk production for{" "}
                        {selectedCow.lactationStage} lactation stage. <br />
                        Recommended actions:
                        <ul className="list-disc ml-4 mt-1">
                          <li>Review feed composition</li>
                          <li>Schedule veterinary check-up</li>
                          <li>Monitor water intake</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Detailed Cow Data</CardTitle>
            <CardDescription>
              Individual cow statistics and comparisons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
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
                    <TableCell>{cow.currentMethaneEmission}</TableCell>
                    <TableCell>{cow.milkYield}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Detailed analysis section */}
      {selectedCow && <CowDetailedAnalysis cow={selectedCow} />}
    </div>
  );
};
export default CowAlert;
