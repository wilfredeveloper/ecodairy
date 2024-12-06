import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricComparisonProps {
  title: string;
  currentValue: number;
  predictedValue: number;
  maxValue: number;
  unit: string;
  thresholds: { low: number; high: number };
  isPositiveGood?: boolean;
}

const MetricComparison: React.FC<MetricComparisonProps> = ({ 
  title, 
  currentValue, 
  predictedValue, 
  maxValue, 
  unit, 
  thresholds,
}) => {
  const percentage = Math.abs(((predictedValue - currentValue) / currentValue) * 100).toFixed(1);
  const isMethane = title.toLowerCase().includes('methane');
  
  // For methane: improvement is when predicted is lower than current
  // For milk: improvement is when predicted is higher than current
  const isImprovement = isMethane ? 
    (predictedValue < currentValue) : 
    (predictedValue > currentValue);

  const getColor = (value: number, type: 'methane' | 'milk') => {
    if (type === 'methane') {
      if (value < thresholds.low) return 'text-green-500';
      if (value > thresholds.high) return 'text-red-500';
      return 'text-amber-500';
    } else {
      if (value < thresholds.low) return 'text-red-500';
      if (value > thresholds.high) return 'text-green-500';
      return 'text-amber-500';
    }
  };

  const getIcon = () => {
    // For methane: show down arrow (green) when predicted is lower, up arrow (red) when higher
    // For milk: show up arrow (green) when predicted is higher, down arrow (red) when lower
    if (isMethane) {
      return predictedValue < currentValue ? (
        <ArrowDownIcon className="w-5 h-5 text-green-500" />
      ) : (
        <ArrowUpIcon className="w-5 h-5 text-red-500" />
      );
    } else {
      return predictedValue > currentValue ? (
        <ArrowUpIcon className="w-5 h-5 text-green-500" />
      ) : (
        <ArrowDownIcon className="w-5 h-5 text-red-500" />
      );
    }
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Current</span>
            <span className={`text-2xl font-bold ${getColor(currentValue, isMethane ? 'methane' : 'milk')}`}>
              {currentValue} {unit}
            </span>
          </div>
          <div className="flex items-center">
            {getIcon()}
            <span className={`text-lg font-semibold ${isImprovement ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}%
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground">Predicted</span>
            <span className={`text-2xl font-bold ${getColor(predictedValue, isMethane ? 'methane' : 'milk')}`}>
              {predictedValue} {unit}
            </span>
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-xs text-muted-foreground">0</div>
            <div className="text-xs text-muted-foreground">{maxValue}</div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(currentValue / maxValue) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
            />
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(predictedValue / maxValue) * 100}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                isImprovement ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface Recommendation {
  predictedMilkYield: number;
  predictedMethaneEmission: number;
}
interface ComparativeMetricsProps {
  recommendations: Recommendation;
  currentMilkYield: number | undefined;
  currentMethaneEmission: number | undefined;
}

export default function ComparativeMetrics({ recommendations, currentMilkYield, currentMethaneEmission }: ComparativeMetricsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MetricComparison
        title="Milk Yield"
        currentValue={currentMilkYield || 0}
        predictedValue={recommendations.predictedMilkYield}
        maxValue={40}
        unit="L"
        thresholds={{ low: 20, high: 27 }}
        isPositiveGood={true}
      />
      <MetricComparison
        title="Methane Emission"
        currentValue={currentMethaneEmission || 0}
        predictedValue={recommendations.predictedMethaneEmission}
        maxValue={500}
        unit="g"
        thresholds={{ low: 350, high: 380 }}
        isPositiveGood={false}
      />
    </div>
  );
}