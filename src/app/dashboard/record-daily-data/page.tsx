import { DailyDataRecordingComponent } from "@/components/daily-data-recording";

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-center">
        <div className="max-w-lg">
          <h1 className="text-4xl mb-8 text-gray-900 font-bold">
            Please enter the amounts you recorded today
          </h1>
          <meta
            name="description"
            content="Enter the measured amounts you recorded today to help us make more accurate recommendations."
          />
          <meta
            name="keywords"
            content="daily data recording, accurate recommendations, measured amounts"
          />
          <p className="text-gray-400">
            This helps us make the reccomendations more accurate
          </p>
        </div>
        <DailyDataRecordingComponent />
      </main>
    </div>
  );
}
