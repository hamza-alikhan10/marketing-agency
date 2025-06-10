
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight } from "lucide-react";

const Plans = () => {
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState(30);

  const calculateReturns = (principal: number, days: number) => {
    const dailyReturn = principal * 0.01; // 1% daily
    const totalReturn = dailyReturn * days;
    const finalAmount = principal + totalReturn;
    return {
      dailyReturn,
      totalReturn,
      finalAmount,
      weeklyReturn: dailyReturn * 7,
      monthlyReturn: dailyReturn * 30
    };
  };

  const returns = calculateReturns(amount, duration);

  const plans = [
    {
      name: "Starter",
      minAmount: 100,
      maxAmount: 999,
      features: [
        "1% Daily Returns",
        "Instant Withdrawals",
        "24/7 Support",
        "Basic Dashboard"
      ],
      recommended: false
    },
    {
      name: "Professional",
      minAmount: 1000,
      maxAmount: 9999,
      features: [
        "1% Daily Returns",
        "Priority Withdrawals",
        "24/7 Priority Support",
        "Advanced Dashboard",
        "Weekly Reports"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      minAmount: 10000,
      maxAmount: 100000,
      features: [
        "1% Daily Returns",
        "Instant Priority Withdrawals",
        "Dedicated Account Manager",
        "Real-time Analytics",
        "Daily Reports",
        "Custom Strategies"
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Investment Plans</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Investment Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            All plans offer the same 1% daily returns with different minimum deposits and features.
          </p>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Calculator className="w-6 h-6" />
                ROI Calculator
              </CardTitle>
              <CardDescription>
                Calculate your potential returns with our 1% daily return strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="amount" className="text-base font-medium">
                      Investment Amount (USDT)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="text-lg h-12 mt-2"
                      min="100"
                      max="100000"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum: $100 USDT
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration" className="text-base font-medium mb-4 block">
                      Investment Duration: {duration} days
                    </Label>
                    <Slider
                      id="duration"
                      min={1}
                      max={365}
                      step={1}
                      value={[duration]}
                      onValueChange={(value) => setDuration(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1 day</span>
                      <span>365 days</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-500">
                          ${returns.dailyReturn.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Daily Return</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-500">
                          ${returns.weeklyReturn.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Weekly Return</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-500">
                          ${returns.monthlyReturn.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Return</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <ArrowRight className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-500">
                          ${returns.finalAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Final Amount</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold mb-2">Investment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Initial Investment:</span>
                    <div className="font-bold">${amount.toLocaleString()} USDT</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Returns ({duration} days):</span>
                    <div className="font-bold text-green-500">+${returns.totalReturn.toFixed(2)} USDT</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ROI:</span>
                    <div className="font-bold text-blue-500">{((returns.totalReturn / amount) * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Plans Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Investment Plans</h2>
            <p className="text-muted-foreground">
              Choose the plan that best fits your investment goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.recommended ? 'ring-2 ring-green-500' : ''}`}>
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    ${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()} USDT
                  </CardDescription>
                  <div className="text-3xl font-bold text-green-500 mt-4">
                    1%
                    <span className="text-lg text-muted-foreground"> daily</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.recommended ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Start Investing</h2>
            <p className="text-muted-foreground">
              Simple steps to begin earning daily returns
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground text-sm">
                Sign up and complete verification in minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Deposit USDT</h3>
              <p className="text-muted-foreground text-sm">
                Transfer USDT to your investment wallet
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Start Earning</h3>
              <p className="text-muted-foreground text-sm">
                Watch your balance grow with 1% daily returns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Earning Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of investors earning consistent daily returns with RobinHood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Create Account
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-500">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;
