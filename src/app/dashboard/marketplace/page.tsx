import { Marketplace } from "@/components/marketplace";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
      <p className="text-muted-foreground mb-8">
        Connect with milk buyers, feed suppliers, and service providers in your area.
        Find the best deals and services for your dairy farm.
      </p>
      <Marketplace />
    </div>
  );
} 