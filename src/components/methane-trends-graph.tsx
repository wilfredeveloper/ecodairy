import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

type ChartDataPoint = {
  date: string;
  methane: number;
  milk: number;
};

const calculatePercentageChange = (
  data: Array<Pick<ChartDataPoint, 'methane' | 'milk'>>,
  metric: keyof Pick<ChartDataPoint, 'methane' | 'milk'>
): number => {
  if (!data || data.length < 2) return 0;

  const firstValue = data[0][metric];
  const lastValue = data[data.length - 1][metric];

  return Number((((lastValue - firstValue) / firstValue) * 100).toFixed(1));
};

const formatTrend = (change: number) => {
  const isPositive = change > 0;
  const absChange = Math.abs(change);
  return {
    value: absChange,
    isPositive,
    label: isPositive ? "up" : "down",
  };
};

const TrendIndicator = ({
  change,
  metric,
}: {
  change: number;
  metric: string;
}) => {
  const trend = formatTrend(change);
  const Icon = trend.isPositive ? TrendingUp : TrendingDown;

  // Determine if this trend is "good" based on the metric
  // For methane, down is good (green). For milk, up is good (blue)
  const isGoodTrend =
    (metric === "methane" && !trend.isPositive) ||
    (metric === "milk" && trend.isPositive);

  const colorClass = isGoodTrend ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center gap-1">
      {metric === "methane" ? "Methane emissions" : "Milk production"}{" "}
      {trend.label} by {trend.value}%
      <Icon className={`h-4 w-4 ${colorClass}`} />
    </div>
  );
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-sm">
        <p className="font-medium">{formatDate(label!)}</p>
        <p className="text-sm text-green-600">
          Milk Production: {payload[0].value} kg/day/cow
        </p>
        <p className="text-sm text-red-600">
          Methane Emissions: {payload[1].value} kg/day/cow
        </p>
      </div>
    );
  }
  return null;
};

const MethaneVsMilkChart = () => {
  const chartData: ChartDataPoint[] = [
    { date: "2024-10-02", methane: 28.5, milk: 29.2 },
    { date: "2024-10-09", methane: 28.3, milk: 29.7 },
    { date: "2024-10-16", methane: 28.9, milk: 27.9 },
    { date: "2024-10-23", methane: 27, milk: 29.9 },
    { date: "2024-10-30", methane: 27.4, milk: 30.05 },
  ];
  
  // Calculate percentage changes
  const methaneChange = calculatePercentageChange(
    chartData.map(({ methane, milk }) => ({ methane, milk })),
    "methane"
  );
  const milkChange = calculatePercentageChange(
    chartData.map(({ methane, milk }) => ({ methane, milk })),
    "milk"
  );

  return (
    <Card className="w-full bg-green-100 my-4">
      <CardHeader>
        <CardTitle>Methane Emissions vs Milk Production</CardTitle>
        <CardDescription>September 2024 Weekly Measurements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 30, // Space above the chart
                right: 30, // Space on the right
                left: 40, // Space on the left
                bottom: 20, // Space below the chart
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                label={{
                  value: "Date",
                  position: "bottom",
                  offset: 5,
                }}
              />
              <YAxis
                label={{
                  value: "Production / Emissions (kg/day/cow)",
                  angle: -90,
                  position: "insideCenter",
                  className: "text-sm",
                  offset: 15,
                }}
                domain={["dataMin - 1", "dataMax + 1"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="top"
                wrapperStyle={{
                  top: 0,
                  left: 0,
                  marginBottom: 30, // Space between the legend and the chart
                }}
              />
              <Bar
                dataKey="milk"
                fill="hsl(var(--chart-2))"
                name="Milk Production"
                radius={4}
              />
              <Bar
                dataKey="methane"
                fill="hsl(var(--chart-1))"
                name="Methane Emissions"
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex flex-col sm:flex-row gap-2 font-medium leading-none mx-auto">
          <TrendIndicator change={methaneChange} metric="methane" />
          <TrendIndicator change={milkChange} metric="milk" />
        </div>
        <div className="leading-none text-muted-foreground mx-auto">
          Showing weekly measurements for September 2024
        </div>
      </CardFooter>
    </Card>
  );
};

export default MethaneVsMilkChart;