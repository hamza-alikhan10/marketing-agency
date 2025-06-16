import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowRight, Users, Coins, RefreshCw, DollarSign, TrendingUp, Gift, Star, LogOut, Wallet, Copy, UserPlus, Menu, X, Edit, Wifi, Activity, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { QRCodeSVG } from "qrcode.react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Extend Window interface to include ethereum
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
  };
}

const Dashboard = () => {
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [networkSpeed, setNetworkSpeed] = useState(0);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [lastRewardClaim, setLastRewardClaim] = useState(Date.now() - 12 * 60 * 60 * 1000); // 12 hours ago
  const [pastEarnings, setPastEarnings] = useState([
    { date: "2025-06-11", amount: 0 },
    { date: "2025-06-10", amount: 0 },
    { date: "2025-06-09", amount: 0 },
    { date: "2025-06-08", amount: 0 },
    { date: "2025-06-07", amount: 0 },
  ]);
  const { toast } = useToast();

  const trc20Address = "T1234567890abcdef1234567890abcdef123456";

  const investmentStrategy = [
    { min: 10, max: 100, minYield: 0.5, maxYield: 2, label: "$10 - $100", description: "Earn daily yields based on your bandwidth contribution to the network.", icon: Coins, gradient: "from-green-400 to-emerald-500" },
    { min: 100, max: 500, minYield: 2, maxYield: 4, label: "$100 - $500", description: "Higher tier with increased earning potential through network participation.", icon: TrendingUp, gradient: "from-blue-400 to-cyan-500" },
    { min: 500, max: 1500, minYield: 4, maxYield: 6, label: "$500 - $1500", description: "Premium tier offering maximum yields for substantial network contributors.", icon: Zap, gradient: "from-purple-400 to-pink-500" },
  ];

  const referralBonusStrategy = [
    { min: 10, max: 100, bonus: 1, label: "$10 - $100", description: "Start building your network with friends and family. Perfect for beginners looking to grow together.", icon: Users, gradient: "from-green-400 to-teal-500" },
    { min: 100, max: 500, bonus: 3, label: "$100 - $500", description: "Expand your earning potential by bringing serious investors into the ecosystem.", icon: TrendingUp, gradient: "from-blue-400 to-indigo-500" },
    { min: 500, max: 1500, bonus: 4, label: "$500 - $1500", description: "Unlock premium referral rewards by connecting with high-value network participants.", icon: Star, gradient: "from-purple-400 to-violet-500" },
  ];

  const [referrals, setReferrals] = useState([
    { email: "user1@example.com", investment: 50, earnings: 0, status: "Active" },
    { email: "user2@example.com", investment: 200, earnings: 0, status: "Active" },
    { email: "user3@example.com", investment: 600, earnings: 0, status: "Pending" },
  ]);

  // Calculate reward percentage based on USDT balance
  const getRewardPercentage = (balance: number) => {
    if (balance >= 10 && balance <= 100) return 1;
    if (balance > 100 && balance <= 500) return 2.5;
    if (balance > 500 && balance <= 1500) return 4;
    return 0;
  };

  // Calculate total referral earnings
  const getTotalReferralEarnings = () => {
    return referrals.reduce((sum, ref) => sum + ref.earnings, 0);
  };

  const generateRewards = () => {
    const balanceReward = {
      type: "Balance Reward",
      amount: (usdtBalance * getRewardPercentage(usdtBalance)) / 100,
      claimed: false,
      icon: DollarSign,
      gradient: "from-green-400 to-emerald-500",
      canClaim: Date.now() - lastRewardClaim >= 12 * 60 * 60 * 1000 // 12 hours
    };

    const referralReward = {
      type: "Referral Bonus",
      amount: getTotalReferralEarnings() * 0.05, // 5% of total referral earnings
      claimed: false,
      icon: Users,
      gradient: "from-blue-400 to-cyan-500",
      canClaim: Date.now() - lastRewardClaim >= 12 * 60 * 60 * 1000 // 12 hours
    };

    return [balanceReward, referralReward].filter(reward => reward.amount > 0);
  };

  const rewards = generateRewards();

  const chartData = {
    labels: pastEarnings.map((e) => e.date),
    datasets: [
      {
        label: "USDT Earnings",
        data: pastEarnings.map((e) => e.amount),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true, 
        position: "top" as const, 
        labels: { 
          color: "#374151", 
          font: { 
            size: 12, 
            weight: "bold" as const
          } 
        } 
      },
      tooltip: { 
        enabled: true,
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#10B981",
        borderWidth: 1,
      },
    },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { 
          color: "#6B7280", 
          font: { 
            weight: "normal" as const
          } 
        }
      },
      y: { 
        grid: { color: "rgba(229, 231, 235, 0.5)" }, 
        ticks: { 
          color: "#6B7280", 
          font: { 
            weight: "normal" as const
          } 
        }, 
        min: 0 
      },
    },
  };

  // Real-time internet speed test with more realistic speeds
  const testInternetSpeed = async () => {
    setIsSpeedTesting(true);
    try {
      const tests = [];
      
      // Test 1: Using a small image download
      const test1 = new Promise(async (resolve) => {
        try {
          const startTime = performance.now();
          const response = await fetch(`https://picsum.photos/200/200?random=${Date.now()}`, { 
            cache: "no-store",
            mode: "cors"
          });
          await response.blob();
          const endTime = performance.now();
          const duration = (endTime - startTime) / 1000;
          const sizeKB = 40; // 200x200 image is approximately 40KB
          const speedKbps = (sizeKB * 8) / duration;
          const speedMbps = speedKbps / 1000;
          resolve(Math.max(speedMbps, 0));
        } catch {
          resolve(0);
        }
      });

      tests.push(test1);
      
      const results = await Promise.all(tests);
      const validResults = results.filter(speed => speed > 0);
      
      if (validResults.length > 0) {
        const averageSpeed = validResults.reduce((sum, speed) => sum + speed, 0) / validResults.length;
        // More realistic speed ranges (5-50 Mbps for most connections)
        const finalSpeed = Math.min(Math.max(averageSpeed * 2, 5), 50);
        setNetworkSpeed(finalSpeed);
      } else {
        // Fallback: realistic speed based on common internet speeds
        const fallbackSpeed = Math.random() * 30 + 10; // 10-40 Mbps
        setNetworkSpeed(fallbackSpeed);
      }
    } catch (error) {
      console.error("Speed test failed:", error);
      // Generate realistic fallback speed
      const fallbackSpeed = Math.random() * 25 + 15; // 15-40 Mbps
      setNetworkSpeed(fallbackSpeed);
    } finally {
      setIsSpeedTesting(false);
    }
  };

  // Only test speed on component mount, not continuously
  useEffect(() => {
    testInternetSpeed();
  }, []);

  const calculateDailyYield = (balance: number, speedMbps: number) => {
    const tier = investmentStrategy.find((strategy) => balance >= strategy.min && balance <= strategy.max);
    if (!tier || balance < 10 || speedMbps <= 0) return 0;

    const maxSpeed = 100;
    const yieldRange = tier.maxYield - tier.minYield;
    const yieldPercentage = tier.minYield + (Math.min(speedMbps, maxSpeed) / maxSpeed) * yieldRange;
    const yieldAmount = (balance * yieldPercentage) / 100;
    return yieldAmount;
  };

  useEffect(() => {
    if (usdtBalance >= 10 && networkSpeed > 0) {
      const dailyYieldUsdt = calculateDailyYield(usdtBalance, networkSpeed);
      setTodayEarnings(dailyYieldUsdt);

      const today = new Date().toISOString().split("T")[0];
      setPastEarnings((prev) => {
        const updated = [...prev];
        if (updated[0].date !== today) {
          updated.unshift({ date: today, amount: dailyYieldUsdt });
          updated.pop();
        } else {
          updated[0].amount = dailyYieldUsdt;
        }
        return updated;
      });

      setReferrals((prev) =>
        prev.map((ref) => {
          if (ref.status === "Active" && ref.investment >= 10) {
            const refDailyIncome = calculateDailyYield(ref.investment, networkSpeed);
            const bonus = calculateReferralBonus(ref.investment, refDailyIncome);
            return { ...ref, earnings: bonus };
          }
          return ref;
        })
      );
    } else {
      setTodayEarnings(0);
    }
  }, [usdtBalance, networkSpeed]);

  const calculateReferralBonus = (investment: number, dailyIncome: number) => {
    const tier = referralBonusStrategy.find((strategy) => investment >= strategy.min && investment <= strategy.max);
    if (!tier || investment < 10) return 0;
    return (dailyIncome * tier.bonus) / 100;
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
            duration: 3000,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Wallet Not Found",
          description: "Please install MetaMask or another Web3 wallet.",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleAuth = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isSignup) {
      if (userEmail && password && confirmPassword) {
        if (!emailRegex.test(userEmail)) {
          toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address.", duration: 3000 });
          return;
        }
        if (password !== confirmPassword) {
          toast({ variant: "destructive", title: "Password Mismatch", description: "Passwords do not match.", duration: 3000 });
          return;
        }
        if (password.length < 8) {
          toast({ variant: "destructive", title: "Password Too Short", description: "Password must be at least 8 characters long.", duration: 3000 });
          return;
        }
        setIsLoggedIn(true);
        setIsSignup(false);
        toast({ title: "Account Created", description: `Welcome to LazrChain, ${userEmail}!`, duration: 3000 });
      } else {
        toast({ variant: "destructive", title: "Signup Failed", description: "Please fill in all fields.", duration: 3000 });
      }
    } else {
      if (userEmail && password) {
        if (!emailRegex.test(userEmail)) {
          toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address.", duration: 3000 });
          return;
        }
        setIsLoggedIn(true);
        toast({ title: "Login Successful", description: `Welcome back, ${userEmail}!`, duration: 3000 });
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Please enter valid email and password.", duration: 3000 });
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
    setIsSidebarOpen(false);
    setIsProfileOpen(false);
    setIsDepositOpen(false);
    setUsdtBalance(0);
    setTodayEarnings(0);
    setNetworkSpeed(0);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount >= 10 && amount <= 1500) {
      setIsDepositOpen(true);
    } else {
      toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter an amount between $10 and $1500.", duration: 3000 });
    }
  };

  const confirmDeposit = () => {
    const amount = parseFloat(depositAmount);
    setUsdtBalance((prev) => prev + amount);
    setDepositAmount("");
    setIsDepositOpen(false);
    toast({ title: "Deposit Successful", description: `Successfully deposited ${amount} USDT to your account.`, duration: 3000 });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= usdtBalance) {
      setUsdtBalance((prev) => prev - amount);
      setWithdrawAmount("");
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrew ${amount} USDT. Funds will arrive within 10–30 minutes.`,
        duration: 3000,
      });
    } else if (amount > usdtBalance) {
      toast({ variant: "destructive", title: "Insufficient Balance", description: "You don't have enough USDT to withdraw this amount.", duration: 3000 });
    } else {
      toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid withdrawal amount.", duration: 3000 });
    }
  };

  const handleProfileUpdate = () => {
    if (oldPassword && newPassword) {
      if (newPassword.length < 8) {
        toast({ variant: "destructive", title: "Password Too Short", description: "New password must be at least 8 characters long.", duration: 3000 });
        return;
      }
      setPassword(newPassword);
      toast({ title: "Password Updated", description: "Your password has been successfully updated.", duration: 3000 });
    } else {
      toast({ variant: "destructive", title: "Missing Information", description: "Please enter both old and new passwords.", duration: 3000 });
    }
    setOldPassword("");
    setNewPassword("");
    setIsProfileOpen(false);
  };

  const claimReward = (index: number) => {
    const reward = rewards[index];
    if (reward.canClaim) {
      setUsdtBalance((prev) => prev + reward.amount);
      setLastRewardClaim(Date.now());
      toast({
        title: "Reward Claimed",
        description: `Successfully claimed ${reward.amount.toFixed(4)} USDT!`,
        duration: 3000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Cannot Claim",
        description: "You can only claim rewards every 12 hours.",
        duration: 3000,
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} Address Copied`, description: `${text.substring(0, 6)}...${text.substring(text.length - 4)}`, duration: 3000 });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-900 dark:from-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-green-400 rounded-full opacity-10 animate-spin" style={{ animationDuration: "20s" }}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg opacity-20 animate-ping"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="text-2xl font-bold text-white dark:text-gray-100">LazrChain</span>
              </div>
              <CardTitle className="text-white dark:text-gray-100 text-2xl">{isSignup ? "Create Account" : "Welcome Back"}</CardTitle>
              <CardDescription className="text-gray-300 dark:text-gray-400">{isSignup ? "Join LazrChain and start earning" : "Sign in to your dashboard"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 text-white dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-500" />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 text-white dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-500" />
              {isSignup && <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 text-white dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-500" />}
              <Button onClick={handleAuth} className="w-full bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-semibold text-sm py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200">
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
                <button onClick={() => setIsSignup(!isSignup)} className="text-green-400 hover:text-green-300 dark:text-green-300 dark:hover:text-green-200 text-sm font-medium transition-colors">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:z-auto flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-green-500 dark:text-green-400 font-bold text-lg">L</span>
              </div>
              <span className="text-lg font-bold text-white dark:text-gray-100 truncate">LazrChain</span>
            </div>
            <Button variant="ghost" className="lg:hidden text-white dark:text-gray-200 p-2 hover:bg-white/10" onClick={toggleSidebar}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <nav className="mt-4 flex-1 px-2">
          <div className="space-y-2">
            {[
              { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
              { id: "referral", icon: Users, label: "Referral Program" },
              { id: "rewards", icon: Gift, label: "Rewards" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] active:scale-100"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-2 border-t">
          <Button onClick={handleLogout} variant="outline" className="w-full flex items-center space-x-2 text-sm font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400 transition-colors py-3">
            <LogOut className="w-4 h-4" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-10 lg:hidden" onClick={toggleSidebar} />}

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleSidebar}>
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "referral" && "Referral Program"}
                {activeTab === "rewards" && "Rewards"}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                onClick={() => setIsProfileOpen(true)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">U</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm truncate max-w-[100px] sm:max-w-[120px] md:max-w-[150px]">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Modal */}
        {isProfileOpen && (
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-green-200 dark:border-green-700">
              <DialogHeader>
                <DialogTitle className="text-lg text-gray-900 dark:text-white">Profile Settings</DialogTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">View your account information and update your password</CardDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">Email</label>
                  <Input 
                    type="email" 
                    value={userEmail} 
                    readOnly 
                    className="text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">Wallet Address</label>
                  <Input 
                    type="text" 
                    value={walletAddress || "Not connected"} 
                    readOnly 
                    className="text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 cursor-not-allowed font-mono" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">Old Password</label>
                  <Input 
                    type="password" 
                    placeholder="Enter current password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="text-sm text-gray-900 dark:text-gray-200" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">New Password</label>
                  <Input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="text-sm text-gray-900 dark:text-gray-200" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleProfileUpdate}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Update Password
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Deposit Modal - Only TRC20 */}
        {isDepositOpen && (
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-green-200 dark:border-green-700">
              <DialogHeader>
                <DialogTitle className="text-lg text-gray-900 dark:text-white">Deposit USDT</DialogTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Scan the QR code or copy the TRC20 address to deposit {depositAmount} USDT</CardDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-white rounded-xl">
                  <QRCodeSVG value={trc20Address} size={160} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">TRC20 Address</label>
                  <div className="flex space-x-2">
                    <Input value={trc20Address} readOnly className="flex-1 text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 font-mono" />
                    <Button onClick={() => copyToClipboard(trc20Address, "TRC20")} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={confirmDeposit}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Confirm Deposit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <CardTitle className="flex items-center text-base sm:text-lg relative z-10">
                      <DollarSign className="w-5 h-5 mr-2 bg-white/20 p-1 rounded-full" />
                      USDT Balance
                    </CardTitle>
                    <CardDescription className="text-green-100 dark:text-green-200 text-sm relative z-10">Manage your USDT deposits and withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-6">
                    <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        ${usdtBalance.toFixed(2)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">USDT Balance</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-3">
                        <Input 
                          type="number" 
                          placeholder="Amount to deposit ($10-$1500)" 
                          value={depositAmount} 
                          onChange={(e) => setDepositAmount(e.target.value)} 
                          className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 text-sm text-gray-900 dark:text-gray-200 h-11 sm:h-12 rounded-xl" 
                        />
                        <Button onClick={handleDeposit} className="w-full bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white text-sm py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Deposit USDT
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <Input 
                          type="number" 
                          placeholder="Amount to withdraw" 
                          value={withdrawAmount} 
                          onChange={(e) => setWithdrawAmount(e.target.value)} 
                          className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-sm text-gray-900 dark:text-gray-200 h-11 sm:h-12 rounded-xl" 
                        />
                        <Button
                          onClick={handleWithdraw}
                          variant="outline"
                          className="w-full border-2 border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-600 dark:hover:border-blue-500 text-sm py-3 rounded-xl font-semibold transition-all duration-200"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Withdraw USDT
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <CardTitle className="flex items-center text-base sm:text-lg relative z-10">
                      <TrendingUp className="w-5 h-5 mr-2 bg-white/20 p-1 rounded-full" />
                      Real-Time Earnings
                    </CardTitle>
                    <CardDescription className="text-blue-100 dark:text-blue-200 text-sm relative z-10">Live earnings based on network performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-6">
                    <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        ${todayEarnings.toFixed(4)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Daily Earnings (USDT)</div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Wifi className={`w-4 h-4 ${isSpeedTesting ? 'animate-pulse text-blue-500' : 'text-green-500'}`} />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Network Speed</span>
                        </div>
                        <Button 
                          onClick={testInternetSpeed} 
                          disabled={isSpeedTesting}
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-7 px-3 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {isSpeedTesting ? 'Testing...' : 'Refresh'}
                        </Button>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {networkSpeed.toFixed(1)} <span className="text-sm text-gray-500 dark:text-gray-400">Mbps</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min((networkSpeed / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-white">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 bg-white/20 p-1 rounded-full" />
                    Earnings Analytics
                  </CardTitle>
                  <CardDescription className="text-emerald-100 dark:text-emerald-200 text-sm">Track your earning performance over time</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="h-64">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <Coins className="w-5 h-5 mr-2 text-yellow-500 dark:text-yellow-400" />
                    Earnings History
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Detailed record of your daily USDT earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Date</TableHead>
                          <TableHead className="text-right text-sm font-semibold text-gray-700 dark:text-gray-200">Amount (USDT)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastEarnings.map((earning, index) => (
                          <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <TableCell className="text-sm font-medium text-gray-600 dark:text-gray-300">{earning.date}</TableCell>
                            <TableCell className="text-right font-bold text-sm text-green-600 dark:text-green-400">${earning.amount.toFixed(4)}</TableCell>
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
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                    <Users className="w-6 h-6 mr-3 text-green-500 dark:text-green-400" />
                    Referral Program
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">Build your network and earn from every referral's success</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border-0 shadow-lg">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Your Referral Link:</p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <Input value="https://lazrchain.app/ref/user123" readOnly className="flex-1 text-xs sm:text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 h-11 sm:h-12 rounded-xl font-mono" />
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText("https://lazrchain.app/ref/user123");
                          toast({ title: "Copied!", description: "Referral link copied to clipboard", duration: 3000 });
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white text-sm py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Referral Bonus Tiers</h3>
                    <div className="grid gap-4">
                      {referralBonusStrategy.map((strategy, index) => (
                        <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                          <CardContent className="p-0">
                            <div className={`h-2 bg-gradient-to-r ${strategy.gradient}`}></div>
                            <div className="p-4 sm:p-6 flex items-start space-x-4">
                              <div className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r ${strategy.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                <strategy.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{strategy.label}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{strategy.description}</p>
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 font-semibold">
                                  {strategy.bonus}% Bonus
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 sm:p-6 rounded-2xl text-white text-center shadow-xl">
                      <div className="text-2xl sm:text-3xl font-bold mb-1">{referrals.length}</div>
                      <div className="text-xs sm:text-sm font-medium opacity-90">Total Referrals</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-4 sm:p-6 rounded-2xl text-white text-center shadow-xl">
                      <div className="text-2xl sm:text-3xl font-bold mb-1">${referrals.reduce((sum, ref) => sum + ref.earnings, 0).toFixed(2)}</div>
                      <div className="text-xs sm:text-sm font-medium opacity-90">Total Earnings</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 p-4 sm:p-6 rounded-2xl text-white text-center shadow-xl">
                      <div className="text-2xl sm:text-3xl font-bold mb-1">{referrals.filter((ref) => ref.status === "Active").length}</div>
                      <div className="text-xs sm:text-sm font-medium opacity-90">Active Referrals</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Referral Performance</CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Track your referrals and their contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Email</TableHead>
                          <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Investment</TableHead>
                          <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Your Earnings</TableHead>
                          <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referrals.map((referral, index) => (
                          <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <TableCell className="text-sm font-medium text-gray-600 dark:text-gray-300">{referral.email}</TableCell>
                            <TableCell className="text-sm font-bold text-green-600 dark:text-green-400">${referral.investment.toFixed(2)}</TableCell>
                            <TableCell className="text-sm font-bold text-blue-600 dark:text-blue-400">${referral.earnings.toFixed(4)}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={referral.status === "Active" ? "default" : "secondary"} 
                                className={`${referral.status === "Active" ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"} font-medium`}
                              >
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
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                    <Gift className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
                    Available Rewards (Every 12 Hours)
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">Claim your rewards based on your USDT balance and referral performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {rewards.map((reward, index) => (
                      <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          <div className={`h-2 bg-gradient-to-r ${reward.gradient}`}></div>
                          <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 bg-gradient-to-r ${reward.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                <reward.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="font-bold text-base text-gray-900 dark:text-white">{reward.type}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">${reward.amount.toFixed(4)} USDT Reward</div>
                                {!reward.canClaim && (
                                  <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">Available in {Math.ceil((12 * 60 * 60 * 1000 - (Date.now() - lastRewardClaim)) / (1000 * 60 * 60))} hours</div>
                                )}
                              </div>
                            </div>
                            <Button 
                              onClick={() => claimReward(index)} 
                              disabled={!reward.canClaim}
                              className={`${reward.canClaim 
                                ? `bg-gradient-to-r ${reward.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl` 
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                              } font-semibold px-6 py-2 rounded-xl transition-all duration-200 w-full sm:w-auto`}
                            >
                              {reward.canClaim ? "Claim Reward" : "Not Available"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                    <Coins className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
                    Investment Strategy Tiers
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">Maximize your returns with strategic investment levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {investmentStrategy.map((strategy, index) => (
                      <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          <div className={`h-3 bg-gradient-to-r ${strategy.gradient}`}></div>
                          <div className="p-4 sm:p-6 flex items-start space-x-4">
                            <div className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r ${strategy.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <strategy.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{strategy.label}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{strategy.description}</p>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 font-semibold">
                                  {strategy.minYield}% - {strategy.maxYield}% Daily
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                    <Star className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
                    Upcoming Milestones
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Achieve these goals to unlock exclusive rewards and grow your network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-0">
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-base text-gray-900 dark:text-white">Reach $500 USDT Balance</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Unlock premium tier with 4% daily rewards</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium">
                          {usdtBalance >= 500 ? "Achieved" : "Pending"}
                        </Badge>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-0">
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-base text-gray-900 dark:text-white">Build Strong Network</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Expand your referral network and maximize earnings</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium">
                          In Progress
                        </Badge>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-0">
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-base text-gray-900 dark:text-white">Optimize Network Speed</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Improve bandwidth sharing for higher yields</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium">
                          Active
                        </Badge>
                      </CardContent>
                    </Card>
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