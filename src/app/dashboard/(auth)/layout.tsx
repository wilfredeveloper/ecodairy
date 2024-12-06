import { AutoCarousel } from "@/components/auto-carousel";
import AuroraEllipse from "@/components/ui/aurora-ellipse";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const slides = [
    {
      image: "/bg.jpg",
      title: "Welcome to EcoDairy.AI",
      description:
        "Join us in revolutionizing dairy farming with AI-powered insights to boost milk yield and reduce emissions.",
    },
    {
      image: "/bg2.jpg",
      title: "Eco-Friendly Farming",
      description:
        "Optimize your feed strategy for healthier cows and a sustainable future with our data-driven recommendations.",
    },
    {
      image: "/bg.jpg",
      title: "Intelligent Insights",
      description:
        "EcoDairy.AI empowers you to make informed choices, enhancing productivity while supporting the environment.",
    },
  ];

  return (
    <div className="flex items-center gap-12 justify-evenly h-[85vh] w-[80vw]">
      <AuroraEllipse />
      <AutoCarousel slides={slides} />
      <main className="mx-auto">{children}</main>
    </div>
  );
}
