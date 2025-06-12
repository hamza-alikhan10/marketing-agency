
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

      
    </div>
  );
};

export default Dashboard;
