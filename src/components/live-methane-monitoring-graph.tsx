import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

// Utility function to generate methane data with smoother transitions
type MethaneData = { time: string; value: number };

const generateMethaneData = (prevData: MethaneData[] = []) => {
  const now = new Date();
  let newValue;
  
  if (prevData.length === 0) {
    // Initial value - start in the middle range
    newValue = Math.floor(Math.random() * (60 - 45) + 45); // Start in middle range
  } else {
    // Generate new value with max 5% change from previous
    const lastValue = prevData[prevData.length - 1].value;
    const maxChange = lastValue * 0.05; // 5% max change
    const change = (Math.random() * maxChange * 2) - maxChange; // Random change between -5% and +5%
    newValue = Math.max(30, Math.min(97, lastValue + change)); // Clamp between 30 and 97
  }
  
  // Keep last 2 minutes of readings (40 readings at 3-second intervals)
  const newData = [
    ...prevData.slice(-39),
    {
      time: now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      value: Math.round(newValue)
    }
  ];
  
  return newData;
};

// Utility function to determine methane level status
const getMethaneStatus = (value: number) => {
  if (value < 45) return { level: 'Low', color: '#22c55e' };      // Below 45g is low
  if (value < 75) return { level: 'Medium', color: '#eab308' };   // 45-75g is medium
  return { level: 'High', color: '#ef4444' };                     // Above 75g is high
};


const MethaneMonitor = () => {
  const [data, setData] = useState<MethaneData[]>([]);
  const [currentValue, setCurrentValue] = useState<number | null>(null);

  useEffect(() => {
    // Initial data
    const initialData = generateMethaneData();
    setData(initialData);
    setCurrentValue(initialData[0]?.value);

    // Update every 10 seconds
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = generateMethaneData(prevData);
        setCurrentValue(newData[newData.length - 1]?.value);
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentStatus = currentValue ? getMethaneStatus(currentValue) : null;

  return (
    <Card className="w-[75vw] mt-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl">Methane Levels</span>
            <span className="text-sm text-gray-500">Live monitoring (2-minute window)</span>
          </div>
          {currentStatus && (
            <Alert className={`w-auto inline-flex items-center h-10 px-4 py-2 ${
              currentStatus.level === 'High' ? 'bg-red-100' :
              currentStatus.level === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              <AlertTriangle className={`h-4 w-4 mr-2 ${
                currentStatus.level === 'High' ? 'text-red-500' :
                currentStatus.level === 'Medium' ? 'text-yellow-500' : 'text-green-500'
              }`} />
              <AlertDescription className="m-0">
                <span className="font-medium">{currentValue}g</span>
                <span className="ml-2 text-sm">({currentStatus.level})</span>
              </AlertDescription>
            </Alert>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Time (HH:mm:ss)', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[45, 75]}
                label={{ value: 'Methane (g)', angle: -90, position: 'insideLeft', offset: 10 }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}g`, 'Methane']}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={currentStatus?.color || '#2563eb'}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MethaneMonitor;