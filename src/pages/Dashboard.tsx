
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Users, Coins, RefreshCw, DollarSign, TrendingUp, Gift, Star, LogOut, Wallet, Copy, UserPlus } from "lucide-react";
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
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleAuth = () => {
    if (isSignup) {
      if (userEmail && password && confirmPassword) {
        if (password !== confirmPassword) {
          toast({
            variant: "destructive",
            title: "Password Mismatch",
            description: "Passwords do not match.",
          });
          return;
        }
        setIsLoggedIn(true);
        setIsSignup(false);
        toast({
          title: "Account Created",
          description: `Welcome to RobinHood, ${userEmail}!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: "Please fill in all fields.",
        });
      }
    } else {
      if (userEmail && password) {
        setIsLoggedIn(true);
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
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsWalletConnected(false);
    setWalletAddress("");
    setUserEmail("");
    setPassword("");
    setConfirmPassword("");
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
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        {/* 3D Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-green-400 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg opacity-20 animate-ping"></div>
        </div>

        {/* Login/Signup Form */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="text-2xl font-bold text-white">RobinHood</span>
              </div>
              <CardTitle className="text-white text-2xl">
                {isSignup ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {isSignup ? "Join RobinHood and start earning" : "Sign in to your dashboard"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              {isSignup && (
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                />
              )}
              <Button 
                onClick={handleAuth} 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
              >
                {isSignup ? (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="text-center">
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-green-400 hover:text-green-300 text-sm"
                >
                  {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full z-10 lg:relative lg:z-auto">
        <div className="p-6 border-b bg-gradient-to-r from-green-500 to-blue-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-green-500 font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-white">RobinHood</span>
          </div>
        </div>

        <nav className="mt-6">
          <div className="space-y-2 px-4">
            {[
              { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
              { id: "referral", icon: Users, label: "Referral Program" },
              { id: "rewards", icon: Gift, label: "Rewards" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id 
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg" 
                    : "text-gray-600 hover:bg-gray-100 hover:scale-105"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "referral" && "Referral Program"}
              {activeTab === "rewards" && "Rewards"}
            </h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
              {!isWalletConnected && (
                <Button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-600 text-white w-full lg:w-auto">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">U</span>
                </div>
                <span className="text-gray-700 font-medium text-sm lg:text-base">Hello, {userEmail}!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Wallet Status */}
              {isWalletConnected && (
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">
                        Wallet Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* USDT Balance and Actions */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      USDT Balance
                    </CardTitle>
                    <CardDescription className="text-green-100">Manage your USDT deposits and withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="text-3xl font-bold text-gray-900 text-center">
                      ${usdtBalance.toFixed(2)} <span className="text-lg text-gray-500">USDT</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          type="number"
                          placeholder="Amount to deposit"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="border-green-200 focus:border-green-500"
                        />
                        <Button 
                          onClick={handleDeposit}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                          Deposit USDT
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          placeholder="Amount to withdraw"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                        />
                        <Button 
                          onClick={handleWithdraw}
                          variant="outline"
                          className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          Withdraw USDT
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Earnings Today */}
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Earnings Today
                    </CardTitle>
                    <CardDescription className="text-blue-100">Track your RH Coin earnings from network usage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="text-3xl font-bold text-gray-900 text-center">
                      {todayEarnings.toFixed(2)} <span className="text-lg text-gray-500">RH Coin</span>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Network usage (MB)"
                        value={networkUsage}
                        onChange={(e) => setNetworkUsage(e.target.value)}
                        className="flex-1 border-purple-200 focus:border-purple-500"
                      />
                      <Button 
                        onClick={handleRefreshEarnings}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 text-center bg-gray-50 p-2 rounded">
                      Rate: 0.01 RH Coin per MB of network usage
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Earnings Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Earnings Statistics
                  </CardTitle>
                  <CardDescription>Visual representation of your earnings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                      <p className="font-medium">Earnings Graph</p>
                      <p className="text-sm">Chart will show your daily earnings trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Past Earnings Table */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coins className="w-5 h-5 mr-2 text-yellow-500" />
                    Past Earnings
                  </CardTitle>
                  <CardDescription>History of your RH Coin earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount (RH Coin)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastEarnings.map((earning, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell>{earning.date}</TableCell>
                            <TableCell className="text-right font-medium">
                              {earning.amount.toFixed(1)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "referral" && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-500" />
                    Referral Program
                  </CardTitle>
                  <CardDescription>Invite friends and earn 10% of their earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
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
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{referrals.length}</div>
                      <div className="text-sm text-gray-600">Total Referrals</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {referrals.reduce((sum, ref) => sum + ref.earnings, 0).toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Total Earnings</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
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
                  <div className="overflow-x-auto">
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
                          <TableRow key={index} className="hover:bg-gray-50">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "rewards" && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-yellow-500" />
                    Available Rewards
                  </CardTitle>
                  <CardDescription>Claim your rewards and bonuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {rewards.map((reward, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <div>
                            <div className="font-medium">{reward.type}</div>
                            <div className="text-sm text-gray-500">{reward.amount} RH Coin</div>
                          </div>
                        </div>
                        {reward.claimed ? (
                          <Badge variant="default" className="bg-green-500">Claimed</Badge>
                        ) : (
                          <Button 
                            onClick={() => claimReward(index)}
                            size="sm"
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
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
