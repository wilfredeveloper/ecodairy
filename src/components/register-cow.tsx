"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterCowComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Here you would typically make an API call to your backend to save the cow data
    // For this example, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <Card className="w-[32rem] ">
      <CardHeader>
        <CardTitle>Register New Cow</CardTitle>
        <CardDescription>Enter the details of the new cow</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter cow's name" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="breed">Breed</Label>
              <Input id="breed" placeholder="Enter cow's breed" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="breed">Body Weight</Label>
              <Input
                id="body-weight"
                name=""
                placeholder="Enter cow's breed"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="age">Age (in years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter cow's approximate age in years"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select
                required
                onValueChange={(value) => setGender(value as "male" | "female")}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {gender === "female" && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lactation-stage">Lactation Stage</Label>
                <Select required>
                  <SelectTrigger id="lactation-stage">
                    <SelectValue placeholder="Select lactation stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early">Early</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Cow"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
