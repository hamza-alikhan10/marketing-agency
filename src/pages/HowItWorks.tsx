import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, PieChart, TrendingUp, RefreshCw, Globe, Shield, Lock, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Wallet,
      title: "Deposit USDT",
      description: "Connect your wallet and deposit USDT to your LazrChain account. Your USDT is converted to LazrCoin for liquidity provision.",
      details: ["Secure wallet integration", "Instant deposit confirmation", "No hidden fees"]
    },
    {
      step: 2,
      icon: PieChart,
      title: "Provide Liquidity to LazrCoin",
      description: "Your funds are paired with LazrCoin in high-liquidity pools on decentralized exchanges.",
      details: ["Secure pools", "Real-time monitoring", "Optimized pair strategies"]
    },
    {
      step: 3,
      icon: TrendingUp,
      title: "Earn Up to 1% Daily Yields",
      description: "Earn yields from transaction fees and pool rewards, compounded daily.",
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
    { label: "LazrCoin Liquidity Pools", percentage: "80%", color: "bg-blue-500" },
    { label: "DeFi Yield Farming (LazrCoin-based)", percentage: "15%", color: "bg-green-500" },
    { label: "Stablecoin Reserves", percentage: "5%", color: "bg-purple-500" }
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed as needed

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0; // Reset to start
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(autoScroll, 30); // Smooth scrolling

    return () => clearInterval(intervalId);
  }, []);

  const valueCards = [
    {
      icon: Globe,
      title: "Discover Lazr",
      description: "Your internet has unused bandwidth. LazrChain helps you put it to work and get rewarded."
    },
    {
      icon: Shield,
      title: "Take Back Control",
      description: "Corporations use your unused internet bandwidth without asking. LazrChain lets you reclaim it."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "LazrChain only uses your unused internet bandwidth. Your personal information stays private."
    },
    {
      icon: Users,
      title: "Ownership Redefined",
      description: "The internet is powered by you. LazrChain puts the value back in your hands."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <Badge variant="secondary" className="text-sm">
              Trusted by over 10k+ Users
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Maximize Your USDT with <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">LazrCoin </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Don’t let your USDT sit idle—earn up to 1% daily yields by providing liquidity to RH Coin pools.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full px-6">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="mt-12 max-w-2xl w-full">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
            <img
              src="/1011.png"
              alt="LazrCoin Dashboard"
              className="relative w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* What is LazrChain Section */}
<section className="px-4 sm:px-6 lg:px-8 py-16">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">What is LazrChain and How Does it Work?</h2>
    <p className="text-lg text-muted-foreground mb-8">
      LazrChain is a platform where you earn daily rewards by providing both your idle USDT and unused internet bandwidth.
    </p>
    <div className="text-left space-y-4 text-muted-foreground">
      <p>
        With just three clicks, LazrChain lets you start earning by contributing liquidity to LazrCoin pools and sharing your internet bandwidth. 
        While most companies use your bandwidth without paying you, LazrChain changes that, you get rewarded as verified organizations use your internet speed for real-time operations.
      </p>
      <p>
        Your USDT is paired with LazrCoin in high-yield pools, and your bandwidth powers decentralized services. Rewards are transparently tracked on the blockchain and come from transaction fees, bandwidth demand, and pool incentives.
      </p>
      <p>
        It’s simple: <strong>you provide liquidity and internet speed.  We pay you.</strong>
      </p>
    </div>
  </div>
</section>


      {/* Why LazrChain Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LazrChain?</h2>
            <p className="text-muted-foreground">
              Empowering you to take control of your unused internet bandwidth and earn rewards.
            </p>
          </div>
          <div className="overflow-x-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto  snap-x snap-mandatory pb-4 "
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {valueCards.map((card, index) => (
                <Card
                  key={index}
                  className="min-w-[280px] max-w-[280px] snap-start bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20"
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">LazrCoin Allocation Strategy</h2>
            <p className="text-muted-foreground">
              See how your USDT deposits are strategically allocated to LazrCoin liquidity pools.
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
                    <p className="text-sm text-muted-foreground">Focused on LazrCoin pools with stablecoin pairing to reduce volatility.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">High Liquidity</h4>
                    <p className="text-sm text-muted-foreground">LazrCoin pools ensure fast withdrawals and low slippage.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Expert Management</h4>
                    <p className="text-sm text-muted-foreground">Our team optimizes pool performance and monitors market conditions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start Providing Liquidity Today and earn yields from RH Coin pools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/dashboard">
                Start Providing Liquidity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-500" asChild>
              <Link to="/dashboard">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
