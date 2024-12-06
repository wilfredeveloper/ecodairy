"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserStore } from "@/providers/user-store-provider";

export default function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const login = useUserStore((state) => state.login);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SERVER_URL
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const apiUrl = `${baseUrl}/login/`;
      console.log("Data:", data);
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Login response:", responseData);

      if (!response.ok) {
        const errorMessage =
          responseData.error ||
          responseData.detail ||
          responseData.message ||
          Object.values(responseData).flat().join(", ") ||
          `Login failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const user = {
        id: responseData.user.user_id,
        fullName: responseData.user.full_name,
        email: responseData.user.email,
        phoneNumber: responseData.user.phone_number,
        subscriptionStatus: responseData.user.subscription_status,
        streak: responseData.user.streak,
      };

      // First, update the store (which will set the cookie)
      await login(user, responseData.access, responseData.refresh);

      // Then redirect after a small delay to ensure cookie is set
      setTimeout(() => {
        router.push(redirectPath);
      }, 100);

    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
    
    router.push(redirectPath);
  };

  return (
    <Card className="z-100">
      <CardHeader>
        <CardTitle>We are glad to have you back</CardTitle>
        <CardDescription>
          Please enter your details to access the system
        </CardDescription>
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
              {isLoading ? "Get Ready..." : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/dashboard/register/farmer" className="text-green-500">
            Register
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}