import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { sampleCows } from "@/data/sample-cows";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Format the cow data for the context
    const cowDataContext = sampleCows.map(cow => `
      ### ${cow.name} (${cow.breed})
      - **Age**: ${cow.age} years
      - **Weight**: ${cow.weight} kg
      - **Health Status**: ${cow.healthStatus}
      - **Pregnancy Status**: ${cow.pregnancyStatus}
      - **Last Calving**: ${cow.lastCalvingDate}
      - **Recent Milk Production**: ${cow.dailyRecords[cow.dailyRecords.length - 1].milkProduction} liters
      - **Recent Feed Intake**: ${cow.dailyRecords[cow.dailyRecords.length - 1].feedIntake} kg
      - **Recent Health Notes**: ${cow.dailyRecords[cow.dailyRecords.length - 1].healthNotes}
    `).join('\n\n');

    const context = `
      You are an AI assistant for dairy farmers in Kenya. 
      Your role is to provide expert advice on:
      1. Dairy cow management
      2. Milk production optimization
      3. Feed management
      4. Health and disease prevention
      5. Market information and pricing
      
      Here is the current data for the farm's cows:
      ${cowDataContext}
      
      Please provide practical, actionable advice based on Kenyan farming conditions and the specific data provided.
      Format your response in markdown with:
      - Clear headings
      - Bullet points for recommendations
      - Bold text for important points
      - Tables if presenting data comparisons
      - Code blocks for any specific measurements or formulas
      
      Focus on:
      - Identifying any health concerns
      - Suggesting improvements for milk production
      - Providing feed recommendations
      - Noting any concerning trends in the data
    `;

    const prompt = `${context}\n\nUser: ${message}`;

    const result = await model.generateContentStream(prompt);
    
    // Create a TransformStream to handle the streaming response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    
    // Process the stream
    (async () => {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          await writer.write(new TextEncoder().encode(text));
        }
      } catch (error) {
        console.error("Error in streaming:", error);
      } finally {
        await writer.close();
      }
    })();

    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 