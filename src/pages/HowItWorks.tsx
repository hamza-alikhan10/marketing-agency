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
      description: "Connect your wallet and deposit USDT to your RobinHood account. Your USDT is converted to RH Coin for liquidity provision.",
      details: ["Secure wallet integration", "Instant deposit confirmation", "No hidden fees"]
    },
    {
      step: 2,
      icon: PieChart,
      title: "Provide Liquidity to RH Coin",
      description: "Your funds are paired with RH Coin in high-liquidity pools on decentralized exchanges.",
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
    { label: "RH Coin Liquidity Pools", percentage: "80%", color: "bg-blue-500" },
    { label: "DeFi Yield Farming (RH Coin-based)", percentage: "15%", color: "bg-green-500" },
    { label: "Stablecoin Reserves", percentage: "5%", color: "bg-purple-500" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <Badge variant="secondary" className="text-sm">
              Trusted by over 1M+ Users
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Maximize Your USDT with <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">RH Coin Liquidity</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Don't let your USDT sit idle—earn up to 1% daily yields by providing liquidity to RH Coin pools.
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
              alt="RH Coin Dashboard"
              className="relative w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* What is RobinHood Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What is RobinHood and How Does it Work?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            RobinHood is a platform where millions of users provide liquidity to RH Coin pools to earn daily yields from their idle USDT.
          </p>
          <div className="text-left space-y-4 text-muted-foreground">
            <p>
              With just three clicks, RobinHood lets you start providing liquidity with your USDT. Your funds are paired with RH Coin 
              in high-yield liquidity pools, and your participation earns you daily rewards. These rewards come from transaction fees 
              and pool incentives, tracked transparently on the blockchain.
            </p>
            <p>
              RobinHood creates a system where everyone benefits - DeFi protocols get liquidity, and you earn passive income. 
              Since you already hold USDT, why not put your idle funds to work earning up to 1% daily yields?
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Earning in 3 Steps</h2>
            <p className="text-muted-foreground">Get started with RobinHood and begin earning yields today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <CardTitle className="text-lg">Create Account</CardTitle>
                <CardDescription>Connect your wallet to your RobinHood account</CardDescription>
              </CardHeader>
            </Card>
            <Card className="relative">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <CardTitle className="text-lg">Deposit USDT</CardTitle>
                <CardDescription>Add your USDT to start providing liquidity</CardDescription>
              </CardHeader>
            </Card>
            <Card className="relative">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <CardTitle className="text-lg">Earn</CardTitle>
                <CardDescription>Watch your yields compound daily automatically</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How Your Funds Are Protected */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Your Funds Are Protected</h2>
            <p className="text-muted-foreground">
              Your security is our top priority when providing liquidity to RH Coin pools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Security</CardTitle>
                  <CardDescription>Protected Fund Management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our philosophy is to protect your funds from unauthorized access. 
                    All liquidity pools are audited smart contracts with transparent operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Private Keys</CardTitle>
                  <CardDescription>You Always Maintain Control</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    RobinHood never has access to your private keys. Your wallet remains under your complete control,
                    and you can withdraw your funds at any time.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Why This Strategy Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Audited Smart Contracts</h4>
                    <p className="text-sm text-muted-foreground">All RH Coin pools use battle-tested, audited smart contracts for maximum security.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Insurance Coverage</h4>
                    <p className="text-sm text-muted-foreground">Additional insurance coverage protects against smart contract risks.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">24/7 Monitoring</h4>
                    <p className="text-sm text-muted-foreground">Our team monitors all pools round-the-clock for optimal performance and security.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Boost Your Rewards with Our Referral Program</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Invite friends to join RobinHood & grow your earnings together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-500">10%</CardTitle>
                <CardDescription>Commission on all referral earnings</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-500">Unlimited</CardTitle>
                <CardDescription>Number of friends you can refer</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-purple-500">Lifetime</CardTitle>
                <CardDescription>Duration of referral rewards</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Fund Allocation Flow */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">RH Coin Allocation Strategy</h2>
            <p className="text-muted-foreground">
              See how your USDT deposits are strategically allocated to RH Coin liquidity pools.
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
                    <p className="text-sm text-muted-foreground">Focused on RH Coin pools with stablecoin pairing to reduce volatility.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">High Liquidity</h4>
                    <p className="text-sm text-muted-foreground">RH Coin pools ensure fast withdrawals and low slippage.</p>
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

      {/* Returns Explanation */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">How We Generate Up to 1% Daily Yields</CardTitle>
              <CardDescription>
                Our focused approach to RH Coin liquidity provision
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Liquidity Provision</h3>
                <p className="text-sm text-muted-foreground">
                  Earn fees from RH Coin trading activity in pools
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Yield Farming</h3>
                <p className="text-sm text-muted-foreground">
                  Stake RH Coin in DeFi protocols for additional rewards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Pool Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Automated strategies maximize yield efficiency
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
            Start providing liquidity today and earn yields from RH Coin pools.
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
