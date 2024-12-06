import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Brain,
  Binary,
  LineChart,
  Settings,
  CloudRain,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="absolute w-full h-[600px] bg-gradient-to-b from-green-100/50 to-transparent top-0 -z-10" />

      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="EcoDairy.AI"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-green-800">EcoDairy.AI</h1>
              <p className="text-sm text-green-600">
                Powered by Artificial Intelligence
              </p>
            </div>
          </div>
          <div className="space-x-6">
            <Link
              href="#how-it-works"
              className="text-green-700 hover:text-green-900"
            >
              How It Works
            </Link>
            <Link
              href="#impact"
              className="text-green-700 hover:text-green-900"
            >
              Impact
            </Link>
            <Button variant="outline" className="mr-2">
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/subscribe">Start Free Trial</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 flex items-center justify-between">
          <div className="w-1/2 pr-8">
            <h1 className="text-6xl font-bold text-green-800 mb-6">
              AI-Powered Feed Management for
              <span className="text-blue-600"> Sustainable Dairy Farming</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Revolutionizing dairy farming in Kenya through AI-optimized feed
              formulations that reduce methane emissions while maximizing milk
              production and cattle health.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/register/farmer">
                  Start Optimizing Today{" "}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600">30%</h3>
                <p className="text-sm text-gray-600">Methane Reduction</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600">15%</h3>
                <p className="text-sm text-gray-600">Milk Yield Increase</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600">20%</h3>
                <p className="text-sm text-gray-600">Feed Cost Savings</p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg blur-lg opacity-75" />
              <Image
                src="/api/placeholder/600/400"
                alt="AI-powered dairy farming"
                width={600}
                height={400}
                className="rounded-lg relative"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
              How Our AI Powers Your Farm
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <Card className="border-t-4 border-t-green-500">
                <CardHeader>
                  <Brain className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Smart Feed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  Our AI analyzes local feed ingredients and market prices to
                  create optimal feed mixtures that reduce methane emissions
                  while maintaining nutrition.
                </CardContent>
              </Card>
              <Card className="border-t-4 border-t-blue-500">
                <CardHeader>
                  <Binary className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Predictive Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  Machine learning algorithms predict milk yield and health
                  outcomes based on feed combinations, helping you make
                  data-driven decisions.
                </CardContent>
              </Card>
              <Card className="border-t-4 border-t-purple-500">
                <CardHeader>
                  <Settings className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Custom Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  Get personalized feed formulations based on your specific farm
                  conditions, local ingredients, and production goals.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section
          id="impact"
          className="py-16 bg-gradient-to-b from-green-50 to-blue-50"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
              Real Impact for Kenyan Farmers
            </h2>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card className="transform hover:scale-105 transition-transform">
                  <CardHeader>
                    <CloudRain className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle>Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• 30% reduction in methane emissions</li>
                      <li>• Sustainable farming practices</li>
                      <li>• Lower carbon footprint</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="transform hover:scale-105 transition-transform">
                  <CardHeader>
                    <LineChart className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle>Economic Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>• 15% increase in milk production</li>
                      <li>• 20% reduction in feed costs</li>
                      <li>• Higher profit margins</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg blur-lg opacity-75" />
                <Image
                  src="/api/placeholder/500/400"
                  alt="Happy Kenyan farmer"
                  width={500}
                  height={400}
                  className="rounded-lg relative"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    &apos;EcoDairy.AI helped me reduce costs while increasing my milk
                    production. It&apos;s a game-changer for Kenyan farmers.&apos;
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    - John Kamau, Dairy Farmer in Kiambu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Join the Future of Sustainable Dairy Farming
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start optimizing your feed mix today with our AI-powered platform.
              Free trial available for Kenyan farmers.
            </p>
            <Button
              size="lg"
              className="bg-white text-green-800 hover:bg-gray-100"
            >
              <Link href="/subscribe">
                Start Your Free Trial <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-4">
                EcoDairy.AI
              </h3>
              <p className="text-gray-600">
                Empowering Kenyan dairy farmers with AI-driven solutions for
                sustainable farming.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features">Features</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/case-studies">Case Studies</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/community">Community</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 EcoDairy.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
