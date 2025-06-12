
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Wifi, Coins, Globe } from "lucide-react";

const Dashboard = () => {
  const trustedUsers = [
    {
      name: "RH User 1",
      achievement: "Earned 500 RH Coins in 1 month!",
      avatar: "1"
    },
    {
      name: "RH User 2", 
      achievement: "Easy setup, passive income!",
      avatar: "2"
    },
    {
      name: "RH User 3",
      achievement: "Secure and rewarding!",
      avatar: "3"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Wifi className="w-4 h-4 mr-2" />
            Bandwidth Sharing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
            Earn RH Coin with
            <br />
            Your Unused Internet
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join over 1.0M+ users sharing bandwidth to earn RH Coin rewards.
            Don't let your leftover internet go to waste. Earn RH Coin by sharing what you don't use.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            Start Earning Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          {/* Animated Network Visual */}
          <div className="mt-16 relative">
            <div className="flex justify-center items-center space-x-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Users Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary mr-2" />
              <h2 className="text-3xl font-bold">Trusted by over 1.0M+ Users</h2>
            </div>
            <p className="text-muted-foreground">
              See what our community is saying about earning RH Coin through bandwidth sharing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustedUsers.map((user, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{user.avatar}</span>
                  </div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{user.achievement}"</p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Teaser */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">How It Works</CardTitle>
              <CardDescription>
                Learn how sharing your internet earns you RH Coin rewards through our simple process.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Share Bandwidth</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your unused internet connection
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Network Contribution</h3>
                  <p className="text-sm text-muted-foreground">
                    Help build a decentralized network
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Earn RH Coin</h3>
                  <p className="text-sm text-muted-foreground">
                    Get rewarded with RH Coin tokens
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to="/how-it-works">
                  See How It Works
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-7xl mx-auto text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1.0M+</div>
              <div className="text-lg opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.4M</div>
              <div className="text-lg opacity-90">RH Coins Distributed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Network Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
