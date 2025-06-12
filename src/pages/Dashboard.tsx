
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Wifi, Coins, Globe, RefreshCw, DollarSign, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [networkUsage, setNetworkUsage] = useState("");
  const [todayEarnings, setTodayEarnings] = useState(0);
  const { toast } = useToast();

  const pastEarnings = [
    { date: "2025-06-11", amount: 5.0 },
    { date: "2025-06-10", amount: 3.5 },
    { date: "2025-06-09", amount: 4.2 },
    { date: "2025-06-08", amount: 2.8 },
    { date: "2025-06-07", amount: 6.1 },
  ];

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

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setUsdtBalance(prev => prev + amount);
      setDepositAmount("");
      toast({
        title: "Deposit Successful",
        description: `Successfully deposited ${amount} USDT to your account.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
      });
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= usdtBalance) {
      setUsdtBalance(prev => prev - amount);
      setWithdrawAmount("");
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrew ${amount} USDT from your account.`,
      });
    } else if (amount > usdtBalance) {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: "You don't have enough USDT to withdraw this amount.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
      });
    }
  };

  const handleRefreshEarnings = () => {
    const usage = parseFloat(networkUsage);
    if (usage > 0) {
      const earnings = usage * 0.01;
      setTodayEarnings(earnings);
      toast({
        title: "Earnings Updated",
        description: `Today's earnings: ${earnings.toFixed(2)} RH Coin`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Usage",
        description: "Please enter valid network usage in MB.",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Welcome Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back! Track your earnings and manage your account.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">U</span>
              </div>
              <span className="text-gray-700 font-medium">Hello, User!</span>
            </div>
          </div>

          {/* USDT Balance and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  USDT Balance
                </CardTitle>
                <CardDescription>Manage your USDT deposits and withdrawals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-gray-900">
                  ${usdtBalance.toFixed(2)} USDT
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Amount to deposit"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="mb-2"
                    />
                    <Button 
                      onClick={handleDeposit}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      Deposit USDT
                    </Button>
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Amount to withdraw"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="mb-2"
                    />
                    <Button 
                      onClick={handleWithdraw}
                      variant="outline"
                      className="w-full"
                    >
                      Withdraw USDT
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Today */}
            <Card className="bg-white shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Earnings Today
                </CardTitle>
                <CardDescription>Track your RH Coin earnings from network usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-gray-900">
                  {todayEarnings.toFixed(2)} RH Coin
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Network usage (MB)"
                    value={networkUsage}
                    onChange={(e) => setNetworkUsage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleRefreshEarnings}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Rate: 0.01 RH Coin per MB of network usage
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Earnings Statistics Placeholder */}
          <Card className="bg-white shadow mb-8">
            <CardHeader>
              <CardTitle>Earnings Statistics</CardTitle>
              <CardDescription>Visual representation of your earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                  <p>Earnings graph placeholder</p>
                  <p className="text-sm">Chart will show your daily earnings trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Past Earnings Table */}
          <Card className="bg-white shadow mb-8">
            <CardHeader>
              <CardTitle>Past Earnings</CardTitle>
              <CardDescription>History of your RH Coin earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount (RH Coin)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastEarnings.map((earning, index) => (
                    <TableRow key={index}>
                      <TableCell>{earning.date}</TableCell>
                      <TableCell className="text-right font-medium">
                        {earning.amount.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background via-background to-muted/20">
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
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
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
              <Card key={index} className="text-center bg-white shadow">
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
