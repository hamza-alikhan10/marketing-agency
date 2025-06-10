
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Users, Clock, DollarSign, BarChart } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Active Users", value: "12,450+", icon: Users },
    { label: "Total Invested", value: "$2.4M USDT", icon: DollarSign },
    { label: "Daily Returns", value: "1%", icon: TrendingUp },
    { label: "Platform Uptime", value: "99.9%", icon: Clock },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DeFi Investor",
      content: "Consistent 1% daily returns with complete transparency. The best crypto investment platform I've used.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Crypto Trader",
      content: "Professional team, secure platform, and reliable payouts. Highly recommended for steady crypto income.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Investment Advisor",
      content: "Finally, a platform that combines security with consistent returns. The transparency is impressive.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            1% Daily Returns
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
            Earn 1% Daily with
            <br />
            USDT Deposits
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Secure blockchain-based operations managed by crypto experts. 
            Pool your USDT into high-liquidity strategies and earn consistent daily returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" asChild>
              <Link to="/plans">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/plans">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time USDT Stats Widget */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <BarChart className="w-6 h-6" />
                Live USDT Market Data
              </CardTitle>
              <CardDescription>Real-time statistics and platform performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">$1.0001</div>
                  <div className="text-sm text-muted-foreground">USDT Price</div>
                  <div className="text-xs text-green-500">+0.01%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">$24,456</div>
                  <div className="text-sm text-muted-foreground">24h Returns Paid</div>
                  <div className="text-xs text-green-500">+5.2%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Deposits</div>
                  <div className="text-xs text-green-500">+12</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RobinHood?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional crypto asset management with transparent operations and consistent returns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-green-500 mb-4" />
                <CardTitle>Secure & Transparent</CardTitle>
                <CardDescription>
                  Blockchain-based operations with full transparency and secure smart contracts.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-blue-500 mb-4" />
                <CardTitle>Consistent Returns</CardTitle>
                <CardDescription>
                  1% daily returns through expert-managed high-liquidity crypto strategies.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-purple-500 mb-4" />
                <CardTitle>Expert Management</CardTitle>
                <CardDescription>
                  Professional team with years of crypto market experience and risk management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied investors earning daily returns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join RobinHood today and start earning 1% daily returns on your USDT deposits.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/plans">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
