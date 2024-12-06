"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cow } from "@/lib/mock-data-generator";

interface FeedEfficiencyAnalysisProps {
  cowsData: Cow[];
}

// const chartConfig = {
//   efficiency: {
//     label: "Feed Efficiency",
//   },
// } satisfies ChartConfig;

export function FeedEfficiencyAnalysis({
  cowsData,
}: FeedEfficiencyAnalysisProps) {
  const averageEfficiency = React.useMemo(() => {
    return (
      cowsData.reduce(
        (sum, data) => sum + data.milkYield / data.feedIntake,
        0
      ) / cowsData.length
    );
  }, [cowsData]);

  return (
    <Card className="bg-green-100">
      <CardHeader>
        <CardTitle>Feed Efficiency Analysis</CardTitle>
        <CardDescription>Milk yield per kg of feed intake</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
              data={cowsData
                .map((cow) => ({
                  name: cow.name,
                  efficiency: cow.milkYield / cow.feedIntake,
                }))
                .sort((a, b) => b.efficiency - a.efficiency)}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="efficiency"
                name="Milk (L) per kg Feed"
                radius={[5, 5, 5, 5]}
              >
                {cowsData
                  .map((cow) => ({
                    name: cow.name,
                    efficiency: cow.milkYield / cow.feedIntake,
                  }))
                  .sort((a, b) => b.efficiency - a.efficiency)
                  .map((cow) => {
                    const efficiency = cow.efficiency;
                    return (
                      <Cell
                        key={cow.name}
                        fill={
                          efficiency < 0.5
                            ? "rgba(255, 0, 0, 0.6)"
                            : "hsl(var(--chart-2))"
                        }
                      />
                    );
                  })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col items-center justify-center">
        <CardDescription>
          Average Feed Efficiency: {averageEfficiency.toFixed(2)} L/kg
        </CardDescription>
        <CardDescription>
          Red bars indicate cows with feed efficiency below 0.6 L/kg
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
