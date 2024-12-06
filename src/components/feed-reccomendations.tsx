import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Cow {
  id: number;
  lactationStage: "early" | "mid" | "late";
}

interface FeedRecommendationsProps {
  selectedCow: string;
  cowsData: Cow[];
}

const FeedRecommendations: React.FC<FeedRecommendationsProps> = ({ selectedCow, cowsData }) => {
  // Helper function to get cow details
  const getCowDetails = () => {
    if (selectedCow === "all") return null;
    return cowsData.find((cow) => cow.id === Number(selectedCow));
  };

  const selectedCowDetails = getCowDetails();

  // Get appropriate feed mix based on cow's lactation stage and characteristics
  const getFeedMix = () => {
    if (selectedCow === "all") {
      return {
        baseMix: {
          title: "Standard TMR Base Mix",
          components: [
            "40% Corn silage",
            "25% Alfalfa hay",
            "20% Ground corn",
            "10% Soybean meal",
            "5% Mineral/vitamin premix"
          ],
          methaneReduction: "3-5%",
          milkYield: "Baseline"
        }
      };
    }

    const cow = selectedCowDetails;
    // Customize based on lactation stage
    if (cow?.lactationStage === "early") {
      return {
        baseMix: {
          title: "High-Energy Early Lactation Mix",
          components: [
            "45% Corn silage",
            "20% Alfalfa hay",
            "25% Ground corn",
            "8% Bypass protein blend",
            "2% Fat supplement",
          ],
          methaneReduction: "4-6%",
          milkYield: "+2-3%"
        }
      };
    } else if (cow?.lactationStage === "mid") {
      return {
        baseMix: {
          title: "Balanced Mid-Lactation Mix",
          components: [
            "42% Corn silage",
            "28% Alfalfa hay",
            "18% Ground corn",
            "10% Protein blend",
            "2% Mineral mix"
          ],
          methaneReduction: "3-5%",
          milkYield: "+1-2%"
        }
      };
    } else {
      return {
        baseMix: {
          title: "Late Lactation/Dry Mix",
          components: [
            "50% Grass hay",
            "30% Corn silage",
            "15% Ground corn",
            "5% Protein/mineral mix"
          ],
          methaneReduction: "2-4%",
          milkYield: "Maintenance"
        }
      };
    }
  };

  const additiveOptions = [
    {
      name: "3-NOP",
      dosage: "60-80 mg/kg DMI",
      methaneReduction: "20-30%",
      milkEffect: "No significant change",
      notes: "Scientifically proven methane inhibitor"
    },
    {
      name: "Essential Oils Blend",
      dosage: "0.5-1.0 g/kg DMI",
      methaneReduction: "8-12%",
      milkEffect: "+1-2%",
      notes: "Contains garlic, cinnamon, and oregano oils"
    },
    {
      name: "Seaweed (Asparagopsis)",
      dosage: "0.2% of DMI",
      methaneReduction: "45-65%",
      milkEffect: "Variable",
      notes: "Emerging solution, limited availability"
    }
  ];

  const feedMix = getFeedMix();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Feed Recommendations</CardTitle>
        <CardDescription>
          Optimized for {selectedCow === "all" ? "herd-wide" : "individual"} methane reduction and milk yield
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="base" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="base">Base Feed Mix</TabsTrigger>
            <TabsTrigger value="additives">Recommended Additives</TabsTrigger>
          </TabsList>
          
          <TabsContent value="base">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{feedMix.baseMix.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Components:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {feedMix.baseMix.components.map((component, idx) => (
                      <li key={idx} className="text-sm">{component}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="bg-white p-3 rounded">
                    <p className="text-sm font-medium text-green-700">
                      Expected Methane Reduction
                    </p>
                    <p className="text-lg font-semibold">
                      {feedMix.baseMix.methaneReduction}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="text-sm font-medium text-blue-700">
                      Expected Milk Yield
                    </p>
                    <p className="text-lg font-semibold">
                      {feedMix.baseMix.milkYield}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additives">
            <div className="space-y-4">
              {additiveOptions.map((additive, idx) => (
                <div key={idx} className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{additive.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Recommended Dosage:</p>
                      <p className="text-sm">{additive.dosage}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Notes:</p>
                      <p className="text-sm">{additive.notes}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-white p-2 rounded">
                      <p className="text-sm text-green-700">
                        Methane Reduction: {additive.methaneReduction}
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="text-sm text-blue-700">
                        Milk Yield: {additive.milkEffect}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedCowDetails && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Individual Adjustments:</h4>
            <p className="text-sm">
              Feed recommendations are adjusted based on:
              {selectedCowDetails.lactationStage === "early" && (
                " high energy needs for early lactation, with increased bypass protein and energy density"
              )}
              {selectedCowDetails.lactationStage === "mid" && (
                " balanced nutrition for sustained production, with moderate protein and energy levels"
              )}
              {selectedCowDetails.lactationStage === "late" && (
                " reduced energy density and protein content for late lactation/dry period"
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedRecommendations;