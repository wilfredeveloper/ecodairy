"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  BarChart2,
  ShoppingCart,
  AlertCircle,
  Icon,
} from "lucide-react";
import { cowHead } from "@lucide/lab";
import Image from "next/image";
import Link from "next/link";

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: "Basic",
      title: "Digital Farm Assistant",
      price: isAnnual ? 5400 : 500,
      description: "Perfect for small farms with 1-5 cows",
      features: [
        "Basic production tracking (milk records)",
        "Simple feed calculator",
        "Basic health records",
        "SMS alerts/reminders",
      ],
      icon: cowHead,
    },
    {
      name: "Professional",
      title: "Farm Manager Pro",
      price: isAnnual ? 16200 : 1500,
      description: "Ideal for medium farms with 5-15 cows",
      features: [
        "Everything in Basic, plus:",
        "Advanced analytics",
        "Feed optimization tools",
        "Profit/loss tracking",
        "Market price updates",
        "Basic veterinary advisory",
      ],
      icon: BarChart2,
      popular: true,
    },
    {
      name: "Enterprise",
      title: "Complete Farm Solution",
      price: isAnnual ? 32400 : 3000,
      description: "Designed for large farms with 15+ cows",
      features: [
        "Everything in Professional, plus:",
        "Priority marketplace access",
        "Advanced veterinary support",
        "AI-powered insights",
        "Export reports",
        "Multiple farm management",
      ],
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center justify-center">
          <Link
            href="/"
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
          <h1 className="text-4xl font-extrabold text-green-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Select the perfect plan to optimize your dairy farm management
          </p>
          <Link href="/dashboard/register/farmer">
            <Button className="mt-4">Continue to free trial</Button>
          </Link>
        </div>

        <div className="mt-12 sm:mt-16 flex justify-center items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-green-600"
          />
          <span className="text-sm font-medium text-gray-500">
            Annual
            <Badge variant="secondary" className="ml-2">
              Save 10%
            </Badge>
          </span>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.popular ? "border-green-500 border-2" : ""}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Icon iconNode={cowHead} className="h-8 w-8 text-green-500" />
                  {tier.popular && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Most Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <CardDescription>{tier.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                  KES {tier.price}
                  <span className="ml-1 text-2xl font-medium text-gray-500">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>
                <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 h-6 w-6 text-green-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  Get started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-6 lg:p-8">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Why Choose Our Service?
            </h2>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">
                Save 10-15% on feed costs through optimization
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">
                Better health monitoring leads to fewer cattle losses
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">
                Market insights help you get better prices for your milk
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">
                30-day free trial and discounts for annual subscriptions
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
