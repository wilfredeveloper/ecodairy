"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Search, ShoppingCart, Package, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Listing {
  id: string;
  type: "buyer" | "feed" | "service";
  title: string;
  description: string;
  price?: string;
  location: string;
  contact: string;
}

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // TODO: Replace with actual data from API
  const listings: Listing[] = [
    {
      id: "1",
      type: "buyer",
      title: "Milk Processing Company",
      description: "Looking to buy fresh milk daily. Minimum 50 liters per day.",
      price: "KES 50 per liter",
      location: "Nairobi",
      contact: "+254 700 000 000",
    },
    {
      id: "2",
      type: "feed",
      title: "Premium Dairy Feed",
      description: "High-quality dairy feed with 18% protein content.",
      price: "KES 2,500 per 50kg bag",
      location: "Kiambu",
      contact: "+254 700 000 001",
    },
    {
      id: "3",
      type: "service",
      title: "Veterinary Services",
      description: "Mobile veterinary services for dairy farms.",
      price: "KES 1,500 per visit",
      location: "Nakuru",
      contact: "+254 700 000 002",
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" || listing.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for buyers, feed, or services..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="buyer">Buyers</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="service">Services</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {listing.type === "buyer" ? (
                    <Users className="h-5 w-5" />
                  ) : listing.type === "feed" ? (
                    <Package className="h-5 w-5" />
                  ) : (
                    <ShoppingCart className="h-5 w-5" />
                  )}
                  {listing.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  {listing.description}
                </p>
                {listing.price && (
                  <p className="font-semibold mb-2">{listing.price}</p>
                )}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{listing.location}</span>
                  <span>{listing.contact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 