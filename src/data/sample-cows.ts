export interface Cow {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  lastCalvingDate: string;
  pregnancyStatus: 'pregnant' | 'not_pregnant' | 'unknown';
  healthStatus: 'healthy' | 'sick' | 'recovering';
  dailyRecords: DailyRecord[];
}

export interface DailyRecord {
  date: string;
  milkProduction: number; // in liters
  feedIntake: number; // in kg
  waterIntake: number; // in liters
  healthNotes: string;
  temperature: number; // in Celsius
  weight: number; // in kg
}

export const sampleCows: Cow[] = [
  {
    id: "1",
    name: "Bessie",
    breed: "Friesian",
    age: 4,
    weight: 550,
    lastCalvingDate: "2023-12-15",
    pregnancyStatus: "not_pregnant",
    healthStatus: "healthy",
    dailyRecords: [
      {
        date: "2024-04-01",
        milkProduction: 25.5,
        feedIntake: 15,
        waterIntake: 60,
        healthNotes: "Normal appetite and behavior",
        temperature: 38.5,
        weight: 550
      },
      {
        date: "2024-04-02",
        milkProduction: 26.2,
        feedIntake: 15.5,
        waterIntake: 62,
        healthNotes: "Slightly increased milk production",
        temperature: 38.4,
        weight: 551
      }
    ]
  },
  {
    id: "2",
    name: "Daisy",
    breed: "Jersey",
    age: 3,
    weight: 450,
    lastCalvingDate: "2023-11-20",
    pregnancyStatus: "pregnant",
    healthStatus: "healthy",
    dailyRecords: [
      {
        date: "2024-04-01",
        milkProduction: 18.2,
        feedIntake: 12,
        waterIntake: 50,
        healthNotes: "Normal behavior, good appetite",
        temperature: 38.6,
        weight: 450
      },
      {
        date: "2024-04-02",
        milkProduction: 17.8,
        feedIntake: 12.5,
        waterIntake: 52,
        healthNotes: "Slight decrease in milk production",
        temperature: 38.5,
        weight: 451
      }
    ]
  },
  {
    id: "3",
    name: "Molly",
    breed: "Ayrshire",
    age: 5,
    weight: 500,
    lastCalvingDate: "2023-10-10",
    pregnancyStatus: "unknown",
    healthStatus: "sick",
    dailyRecords: [
      {
        date: "2024-04-01",
        milkProduction: 20.1,
        feedIntake: 10,
        waterIntake: 45,
        healthNotes: "Reduced appetite, showing signs of mastitis",
        temperature: 39.2,
        weight: 498
      },
      {
        date: "2024-04-02",
        milkProduction: 18.5,
        feedIntake: 9.5,
        waterIntake: 40,
        healthNotes: "Under treatment for mastitis",
        temperature: 39.0,
        weight: 497
      }
    ]
  }
]; 