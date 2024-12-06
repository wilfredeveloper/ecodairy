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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DailyDataRecordingComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCow, setSelectedCow] =
    useState<keyof typeof cowImages>("cow1");

  const cowImages = {
    cow1: "/cow-images/bessie.png",
    cow2: "/cow-images/daisy.png",
    cow3: "/cow-images/molly.png",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Here you would typically make an API call to your backend to save the daily data
    // For this example, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  // const [weatherData, setWeatherData] = useState(null);
  // const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // useEffect(() => {
  //   const fetchUserLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setUserLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //         },
  //         (error) => {
  //           console.error('Error getting user location:', error);
  //         }
  //       );
  //     } else {
  //       console.error('Geolocation is not supported by this browser.');
  //     }
  //   };
  
  //   fetchUserLocation();
  // }, []);

  // const weatherAPIKEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  // console.log("weatherAPIKEY", weatherAPIKEY);

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     if (userLocation) {
  //       try {
  //         const response = await axios.get(
  //           `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${weatherAPIKEY}&units=metric`
  //         );
  //         setWeatherData(response.data);
  //       } catch (error) {
  //         console.error('Error fetching weather data:', error);
  //       }
  //     }
  //   };
  
  //   fetchWeatherData();
  // }, [userLocation]);

  return (
    <main className="flex">
      <Card className="w-[500px] relative">
        <CardHeader>
          <Avatar className="h-[120px] w-[120px] mx-auto">
            <AvatarImage
              src={cowImages[selectedCow]}
              alt={selectedCow}
              className="object-cover"
            />
            <AvatarFallback>
              {selectedCow ? selectedCow.slice(0, 2).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>
          <CardTitle>Daily Data Recording</CardTitle>
          <CardDescription>Enter today&apos;s data for each cow</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cow-select">Select Cow</Label>
                <Select
                  value={selectedCow}
                  onValueChange={(value: string) =>
                    setSelectedCow(value as keyof typeof cowImages)
                  }
                  required
                >
                  <SelectTrigger id="cow-select">
                    <SelectValue placeholder="Select a cow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cow1">Bessie</SelectItem>
                    <SelectItem value="cow2">Daisy</SelectItem>
                    <SelectItem value="cow3">Molly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="milk-yield">Milk Yield (L)</Label>
                <Input
                  id="milk-yield"
                  type="number"
                  step="0.1"
                  placeholder="Enter milk yield"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="feed-intake">Feed Intake (kg)</Label>
                <Input
                  id="feed-intake"
                  type="number"
                  step="0.1"
                  placeholder="Enter feed intake"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="health-status">Health Status</Label>
                <Select required>
                  <SelectTrigger id="health-status">
                    <SelectValue
                      defaultValue={"healthy"}
                      placeholder="Select health status"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="sick">Sick</SelectItem>
                    <SelectItem value="injured">Injured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Any additional notes" />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Data"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
