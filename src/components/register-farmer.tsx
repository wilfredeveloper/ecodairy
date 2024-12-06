"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function RegisterFarmerComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      full_name: formData.get("name"),
      farm_name: formData.get("farm-name"), // Changed to match Django's naming convention
      email: formData.get("email"),
      telephone: formData.get("phone"), // Changed to match Django's naming convention
      county: formData.get("county"),
      password: formData.get("password"), // Added password field
      subscription_status: false
    };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_SERVER_URL ||
        "http://192.168.16.105:8000/api";
      // const baseUrl = "http://192.168.16.105:8000/api"
      const apiUrl = `${baseUrl}/register/`; // Removed /api/ to match your endpoint

      console.log("Sending registration request to:", apiUrl);
      console.log("Request data:", data);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        // Handle specific error messages from the backend
        const errorMessage =
          responseData.error ||
          responseData.detail ||
          responseData.message ||
          Object.values(responseData).flat().join(", ") ||
          `Registration failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }

      if (responseData.access && responseData.refresh) {
        localStorage.setItem("accessToken", responseData.access);
        localStorage.setItem("refreshToken", responseData.refresh);
        window.location.href = "/dashboard/login";
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[32rem] z-100">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>Already have an account?</CardTitle>
          <Button asChild variant={"link"} className="text-gray-600">
            <Link href="/dashboard/login">
              Login <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="farm-name">Farm Name</Label>
              <Input
                id="farm-name"
                name="farm-name"
                placeholder="Enter your farm name"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                pattern="[0-9]*"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="county">County of residence</Label>
              <Input
                id="county"
                name="county"
                placeholder="Nakuru, Kiambu etc"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
