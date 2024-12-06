"use client";

import { notFound, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MilkIcon as Cow } from 'lucide-react'
import Link from "next/link"

type Recommendation = {
  dryMatterIntake: { type: string; amount: string };
  feedAdditive: { type: string; amount: string };
  milkYield: number;
  methaneEmission: number;
  healthStatus: string;
  summary: string;
};

type Recommendations = {
  [cowName: string]: {
    [date: string]: Recommendation;
  };
};

// This would typically come from your database or API
const getRecommendation = (cowName: string, date: string): Recommendation | undefined => {
  // Dummy data for demonstration
  const recommendations: Recommendations = {
    "Bessie": {
      "2023-06-01": {
        dryMatterIntake: { type: "Grass Silage", amount: "15 kg" },
        feedAdditive: { type: "Probiotics", amount: "50 g" },
        milkYield: 25,
        methaneEmission: 400,
        healthStatus: "Healthy",
        summary: "Bessie is doing well. Maintain current feed plan with slight increase in probiotics."
      },
      "2023-06-02": {
        dryMatterIntake: { type: "Corn Silage", amount: "14 kg" },
        feedAdditive: { type: "Enzymes", amount: "30 g" },
        milkYield: 26,
        methaneEmission: 390,
        healthStatus: "Healthy",
        summary: "Bessie's milk yield has improved. Continue with the current plan."
      }
    },
    "Daisy": {
      "2023-06-01": {
        dryMatterIntake: { type: "Alfalfa Hay", amount: "13 kg" },
        feedAdditive: { type: "Yeast Culture", amount: "40 g" },
        milkYield: 22,
        methaneEmission: 420,
        healthStatus: "Injured",
        summary: "Daisy is recovering from a minor injury. Adjusted feed plan to support recovery."
      }
    },
    "Molly": {
      "2023-06-03": {
        dryMatterIntake: { type: "Mixed Ration", amount: "16 kg" },
        feedAdditive: { type: "Mineral Blend", amount: "60 g" },
        milkYield: 28,
        methaneEmission: 380,
        healthStatus: "Healthy",
        summary: "Molly is performing exceptionally well. Maintain current feed plan."
      }
    }
  }

  return recommendations[cowName]?.[date]
}

export default function RecommendationPage() {
  const params = useParams()
  const cowName = Array.isArray(params.cowName) ? params.cowName[0] : params.cowName;
  const date = Array.isArray(params.date) ? params.date[0] : params.date;
  
  const recommendation = getRecommendation(cowName, date)

  if (!recommendation) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/dashboard" className="flex items-center text-blue-500 hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      
      <div className="flex items-center mb-6">
        <Cow className="h-8 w-8 mr-2 text-green-600" />
        <h1 className="text-3xl font-bold">{params.cowName}&apos;s Recommendation</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Feed Plan for {params.date}</CardTitle>
          <CardDescription>Daily nutrition and additive recommendation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feed Type</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dry Matter Intake ({recommendation.dryMatterIntake.type})</TableCell>
                <TableCell>{recommendation.dryMatterIntake.amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Feed Additive ({recommendation.feedAdditive.type})</TableCell>
                <TableCell>{recommendation.feedAdditive.amount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Milk Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recommendation.milkYield} L</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Methane Emission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recommendation.methaneEmission} g</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant={recommendation.healthStatus === "Healthy" ? "default" : "destructive"}>
            {recommendation.healthStatus}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{recommendation.summary}</p>
        </CardContent>
      </Card>
    </div>
  )
}