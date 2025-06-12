
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Users, Wifi, Coins, Globe, RefreshCw, DollarSign, TrendingUp, Gift, Star, LogOut, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [networkUsage, setNetworkUsage] = useState("");
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const { toast } = useToast();

  const pastEarnings = [
    { date: "2025-06-11", amount: 5.0 },
    { date: "2025-06-10", amount: 3.5 },
    { date: "2025-06-09", amount: 4.2 },
    { date: "2025-06-08", amount: 2.8 },
    { date: "2025-06-07", amount: 6.1 },
  ];

  const referrals = [
    { email: "user1@example.com", earnings: 25.5, status: "Active" },
    { email: "user2@example.com", earnings: 18.2, status: "Active" },
    { email: "user3@example.com", earnings: 12.8, status: "Pending" },
  ];

  const rewards = [
    { type: "Daily Login", amount: 1.0, claimed: true },
    { type: "First Deposit", amount: 10.0, claimed: true },
    { type: "Referral Bonus", amount: 5.0, claimed: false },
    { type: "Weekly Activity", amount: 3.0, claimed: false },
  ];

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Wallet Not Found",
          description: "Please install MetaMask or another Web3 wallet.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
      });
    }
  };

  const handleLogin = () => {
    if (userEmail && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userEmail}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please enter valid email and password.",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsWalletConnected(false);
    setWalletAddress("");
    setUserEmail("");
    setPassword("");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleDeposit = () => {
    if (!isWalletConnected) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
      });
      return;
    }

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
    if (!isWalletConnected) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
      });
      return;
    }

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

  const claimReward = (index: number) => {
    const updatedRewards = [...rewards];
    updatedRewards[index].claimed = true;
    toast({
      title: "Reward Claimed",
      description: `Successfully claimed ${updatedRewards[index].amount} RH Coin!`,
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Login to RobinHood</CardTitle>
            <CardDescription className="text-center">
              Access your dashboard and start earning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} className="w-full bg-green-500 hover:bg-green-600">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-800">RobinHood</span>
          </div>
        </div>

        <nav className="mt-6">
          <div className="space-y-2 px-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "dashboard" 
                  ? "bg-green-100 text-green-700 border-r-2 border-green-500" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("referral")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "referral" 
                  ? "bg-green-100 text-green-700 border-r-2 border-green-500" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Referral Program</span>
            </button>

            <button
              onClick={() => setActiveTab("rewards")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "rewards" 
                  ? "bg-green-100 text-green-700 border-r-2 border-green-500" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Gift className="w-5 h-5" />
              <span>Rewards</span>
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "referral" && "Referral Program"}
              {activeTab === "rewards" && "Rewards"}
            </h1>
            <div className="flex items-center space-x-4">
              {!isWalletConnected && (
                <Button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-600">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => setShowLogin(!showLogin)}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">U</span>
                </div>
                <span className="text-gray-700 font-medium">Hello, {userEmail}!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Wallet Status */}
              {isWalletConnected && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Wallet Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* USDT Balance and Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              {/* Earnings Statistics */}
              <Card className="bg-white shadow">
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
              <Card className="bg-white shadow">
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
          )}

          {activeTab === "referral" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Referral Program</CardTitle>
                  <CardDescription>Invite friends and earn 10% of their earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-2">Your Referral Link:</p>
                    <div className="flex space-x-2">
                      <Input 
                        value="https://robinhood.app/ref/user123" 
                        readOnly 
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => {
                          navigator.clipboard.writeText("https://robinhood.app/ref/user123");
                          toast({ title: "Copied!", description: "Referral link copied to clipboard" });
                        }}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{referrals.length}</div>
                      <div className="text-sm text-gray-600">Total Referrals</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {referrals.reduce((sum, ref) => sum + ref.earnings, 0).toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Total Earnings</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {referrals.filter(ref => ref.status === "Active").length}
                      </div>
                      <div className="text-sm text-gray-600">Active Referrals</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Referral History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Earnings</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals.map((referral, index) => (
                        <TableRow key={index}>
                          <TableCell>{referral.email}</TableCell>
                          <TableCell>{referral.earnings.toFixed(1)} RH Coin</TableCell>
                          <TableCell>
                            <Badge variant={referral.status === "Active" ? "default" : "secondary"}>
                              {referral.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "rewards" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Claim your rewards and bonuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {rewards.map((reward, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <div>
                            <div className="font-medium">{reward.type}</div>
                            <div className="text-sm text-gray-500">{reward.amount} RH Coin</div>
                          </div>
                        </div>
                        {reward.claimed ? (
                          <Badge variant="default">Claimed</Badge>
                        ) : (
                          <Button 
                            onClick={() => claimReward(index)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Claim
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Rewards</CardTitle>
                  <CardDescription>Complete these tasks to unlock more rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div>
                        <div className="font-medium">Deposit 100 USDT</div>
                        <div className="text-sm text-gray-500">Reward: 5.0 RH Coin</div>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div>
                        <div className="font-medium">Refer 5 Friends</div>
                        <div className="text-sm text-gray-500">Reward: 25.0 RH Coin</div>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
