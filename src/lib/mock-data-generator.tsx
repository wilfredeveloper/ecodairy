// Utility to generate random number within a range
const randomInRange = (min: number, max: number, decimal = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimal));
};

// Feed types and additives with their nutritional info
const feedTypes = [
  {
    type: "Grass Silage",
    baseAmount: "15",
    nutritionalInfo:
      "High in fiber and protein. Contains essential vitamins and minerals.",
  },
  {
    type: "Corn Silage",
    baseAmount: "12",
    nutritionalInfo:
      "Energy-dense feed with good digestibility. Rich in starch.",
  },
  {
    type: "Mixed Hay",
    baseAmount: "10",
    nutritionalInfo: "Balanced fiber content. Good source of roughage.",
  },
];

const additiveTypes = [
  {
    type: "Probiotics",
    baseAmount: "50",
    nutritionalInfo:
      "Supports digestive health and immune function. May improve feed efficiency.",
  },
  {
    type: "Essential Oils",
    baseAmount: "30",
    nutritionalInfo:
      "Natural antimicrobial properties. Can enhance feed palatability.",
  },
  {
    type: "Yeast Culture",
    baseAmount: "45",
    nutritionalInfo:
      "Improves rumen function and fiber digestion. Stabilizes pH levels.",
  },
];

export interface Cow {
  id: number;
  name: string;
  age: number;
  weight: number;
  lactationStage: "early" | "mid" | "late";
  milkYield: number;
  feedIntake: number;
  currentMethaneEmission: number;
}

export interface ResponseData {
  dryMatterIntake: {
    type: string;
    amount: string;
    nutritionalInfo: string;
  };
  feedAdditive: {
    type: string;
    amount: string;
    nutritionalInfo: string;
  };
  milkYieldMethaneData: Array<{
    day: number;
    milkYield: number;
    methaneEmission: number;
  }>;
  summary: string;
  predictedMilkYield: number;
  predictedMethaneEmission: number;
}

const generateMockData = (cow: Cow, healthStatus: string): ResponseData => {
  // Adjust base values based on cow's characteristics and health
  const healthMultiplier =
    healthStatus === "Healthy" ? 1 : healthStatus === "Injured" ? 0.85 : 0.7;

  const lactationMultiplier =
    cow.lactationStage === "early"
      ? 1.2
      : cow.lactationStage === "mid"
      ? 1
      : 0.8;

  // Generate slightly varying feed recommendations
  const selectedFeed = feedTypes[Math.floor(Math.random() * feedTypes.length)];
  const selectedAdditive =
    additiveTypes[Math.floor(Math.random() * additiveTypes.length)];

  // Calculate base milk yield within realistic range
  const baseMilkYield = Math.min(
    40,
    Math.max(
      9,
      randomInRange(20, 30, 1) * healthMultiplier * lactationMultiplier
    )
  );

  // Generate historical data with realistic variations
  const milkYieldMethaneData = Array.from({ length: 5 }, (_, i) => {
    const dayVariation = randomInRange(-1.5, 1.5, 1);
    const baseMethane = cow.weight * 0.3 * healthMultiplier; // roughly 300g per 1000kg cow

    const dailyMilkYield = Math.min(
      40,
      Math.max(9, baseMilkYield + dayVariation)
    );
    return {
      day: i + 1,
      milkYield: dailyMilkYield,
      methaneEmission: baseMethane + randomInRange(-20, 20, 0),
    };
  });

  // Predict future values with slight optimization
  const predictedMilkYield = parseFloat(
    Math.min(40, Math.max(9, baseMilkYield + randomInRange(0, 2, 1))).toFixed(1)
  );
  const predictedMethane = parseFloat(
    (cow.weight * 0.3 * healthMultiplier - randomInRange(5, 15, 0)).toFixed(1)
  );

  // Generate feed amount based on cow weight and adjustments
  const feedAmount = (cow.weight * 0.03 * healthMultiplier).toFixed(1);

  // Generate context-aware summary
  const summary = `Based on ${
    cow.name
  }'s ${healthStatus.toLowerCase()} status and ${
    cow.lactationStage
  } lactation stage, we recommend ${
    selectedFeed.type
  } at ${feedAmount}kg/day supplemented with ${
    selectedAdditive.type
  }. This combination should ${
    healthStatus === "Healthy" ? "maintain the current" : "improve the"
  } milk yield while reducing methane emissions. ${
    healthStatus !== "Healthy" ? "Regular monitoring is advised." : ""
  }`;

  return {
    dryMatterIntake: {
      type: selectedFeed.type,
      amount: `${feedAmount} kg`,
      nutritionalInfo: selectedFeed.nutritionalInfo,
    },
    feedAdditive: {
      type: selectedAdditive.type,
      amount: `${randomInRange(
        Number(selectedAdditive.baseAmount) - 10,
        Number(selectedAdditive.baseAmount) + 10,
        0
      )} g`,
      nutritionalInfo: selectedAdditive.nutritionalInfo,
    },
    milkYieldMethaneData,
    summary,
    predictedMilkYield,
    predictedMethaneEmission: predictedMethane,
  };
};

// Replace your mockApiCall with this:
const mockApiCall = (cow: Cow, healthStatus: string): Promise<ResponseData> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(generateMockData(cow, healthStatus)), 3100)
  );

export { mockApiCall, generateMockData };
