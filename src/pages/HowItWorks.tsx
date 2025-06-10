
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, PieChart, TrendingUp, RefreshCw } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Wallet,
      title: "Deposit USDT",
      description: "Connect your wallet and deposit USDT to your RobinHood account. Minimum deposit starts at $100 USDT.",
      details: ["Secure wallet integration", "Instant deposit confirmation", "No hidden fees"]
    },
    {
      step: 2,
      icon: PieChart,
      title: "We Allocate to Liquid Crypto Assets",
      description: "Our expert team allocates your funds into high-liquidity crypto coins and DeFi strategies.",
      details: ["Diversified portfolio", "Risk management", "Real-time monitoring"]
    },
    {
      step: 3,
      icon: TrendingUp,
      title: "Earn 1% Daily Returns",
      description: "Your investment generates consistent 1% daily returns through our proven strategies.",
      details: ["Daily compounding", "Transparent reporting", "Automated calculations"]
    },
    {
      step: 4,
      icon: RefreshCw,
      title: "Withdraw Anytime",
      description: "Access your profits and principal with flexible withdrawal options available 24/7.",
      details: ["Instant withdrawals", "No lock-up periods", "Multiple payout options"]
    }
  ];

  const flowData = [
    { label: "Your USDT Deposit", percentage: "100%", color: "bg-blue-500" },
    { label: "High-Liquidity Crypto", percentage: "60%", color: "bg-green-500" },
    { label: "DeFi Yield Farming", percentage: "25%", color: "bg-purple-500" },
    { label: "Liquidity Pools", percentage: "15%", color: "bg-yellow-500" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple Steps to
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Consistent Returns</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Understand how our platform generates 1% daily returns through expert crypto asset allocation.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline">{step.step}</Badge>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fund Allocation Flow */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fund Allocation Strategy</h2>
            <p className="text-muted-foreground">
              See how your USDT deposits are strategically allocated across liquid crypto assets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {flowData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-sm font-bold">{item.percentage}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Why This Strategy Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Diversified Risk</h4>
                    <p className="text-sm text-muted-foreground">Spread across multiple liquid assets to minimize risk.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">High Liquidity</h4>
                    <p className="text-sm text-muted-foreground">All assets maintain high liquidity for instant withdrawals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Expert Management</h4>
                    <p className="text-sm text-muted-foreground">Professional team monitors and adjusts allocations daily.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Returns Explanation */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">How We Generate 1% Daily Returns</CardTitle>
              <CardDescription>
                Our multi-strategy approach to consistent profit generation
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Arbitrage Trading</h3>
                <p className="text-sm text-muted-foreground">
                  Profit from price differences across multiple exchanges
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Yield Farming</h3>
                <p className="text-sm text-muted-foreground">
                  Earn yields from DeFi protocols and liquidity provision
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Market Making</h3>
                <p className="text-sm text-muted-foreground">
                  Generate returns through automated market making strategies
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of investors earning 1% daily returns with our proven strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/plans">
                View Investment Plans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-500" asChild>
              <Link to="/security">Learn About Security</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
