import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowRight, Users, Coins, DollarSign, TrendingUp, Gift, Star, Copy, UserPlus, Menu, X, Edit, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { QRCodeCanvas } from "qrcode.react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [networkSpeed, setNetworkSpeed] = useState(0); // Speed in Mbps
  const [todayEarnings, setTodayEarnings] = useState(0); // USDT
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pastEarnings, setPastEarnings] = useState([
    { date: "2025-06-11", amount: 0 },
    { date: "2025-06-10", amount: 0 },
    { date: "2025-06-09", amount: 0 },
    { date: "2025-06-08", amount: 0 },
    { date: "2025-06-07", amount: 0 },
  ]);
  const { toast } = useToast();

  // Mock addresses for deposit
  const bep20Address = "0x1234567890abcdef1234567890abcdef12345678";
  const trc20Address = "T1234567890abcdef1234567890abcdef123456";

  const investmentStrategy = [
    { min: 10, max: 100, minYield: 0.5, maxYield: 2, label: "$10 - $100", description: "Earn 0.5% to 2% daily yield based on bandwidth usage." },
    { min: 100, max: 500, minYield: 2, maxYield: 4, label: "$100 - $500", description: "Earn 2% to 4% daily yield based on bandwidth usage." },
    { min: 500, max: 1500, minYield: 4, maxYield: 6, label: "$500 - $1500", description: "Earn 4% to 6% daily yield based on bandwidth usage." },
  ];

  const referralBonusStrategy = [
    { min: 10, max: 100, bonus: 5, label: "$10 - $100", description: "Earn 5% of your referrals' daily income for investments between $10 and $100." },
    { min: 100, max: 500, bonus: 8, label: "$100 - $500", description: "Earn 8% of your referrals' daily income for investments between $100 and $500." },
    { min: 500, max: 1500, bonus: 10, label: "$500 - $1500", description: "Earn 10% of your referrals' daily income for investments between $500 and $1500." },
  ];

  const [referrals, setReferrals] = useState([
    { email: "user1@example.com", investment: 50, earnings: 0, status: "Active" },
    { email: "user2@example.com", investment: 200, earnings: 0, status: "Active" },
    { email: "user3@example.com", investment: 600, earnings: 0, status: "Pending" },
  ]);

  const rewards = [
    { type: "Daily Login", amount: 1.0, claimed: true },
    { type: "First Deposit", amount: 10.0, claimed: false },
    { type: "Referral Bonus", amount: 5.0, claimed: false },
    { type: "Weekly Activity", amount: 3.0, claimed: false },
  ];

  const chartData = {
    labels: pastEarnings.map((e) => e.date),
    datasets: [
      {
        label: "USDT Earnings",
        data: pastEarnings.map((e) => e.amount),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const, labels: { color: "#374151", font: { size: 12 } } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#374151" } },
      y: { grid: { color: "#E5E7EB" }, ticks: { color: "#374151" }, min: 0 },
    },
  };

  // Fetch internet speed using Cloudflare API
  useEffect(() => {
    const fetchInternetSpeed = async () => {
      try {
        const startTime = performance.now();
        const response = await fetch("https://speed.cloudflare.com/__down?bytes=1000000", { cache: "no-store" });
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000; // seconds
        const bytes = 1000000; // 1MB
        const speedBps = bytes * 8 / duration; // bits per second
        const speedMbps = speedBps / 1000000; // Mbps
        setNetworkSpeed(speedMbps);
      } catch (error) {
        console.error("Failed to fetch internet speed:", error);
        setNetworkSpeed(10); // Fallback to 10 Mbps
      }
    };
    fetchInternetSpeed();
    const interval = setInterval(fetchInternetSpeed, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Calculate daily yield in USDT based on investment tier and bandwidth
  const calculateDailyYield = (balance: number, speedMbps: number) => {
    const tier = investmentStrategy.find((strategy) => balance >= strategy.min && balance <= strategy.max);
    if (!tier || balance < 10 || speedMbps <= 0) return 0;

    // Map speed (0–100 Mbps) to yield range (minYield to maxYield)
    const maxSpeed = 100;
    const yieldRange = tier.maxYield - tier.minYield;
    const yieldPercentage = tier.minYield + (Math.min(speedMbps, maxSpeed) / maxSpeed) * yieldRange;
    const yieldAmount = (balance * yieldPercentage) / 100;
    return yieldAmount;
  };

  // Update earnings and referrals based on network speed
  useEffect(() => {
    if (usdtBalance >= 10 && networkSpeed > 0) {
      const dailyYieldUsdt = calculateDailyYield(usdtBalance, networkSpeed);
      setTodayEarnings(dailyYieldUsdt);

      // Update past earnings
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

      // Update referral earnings
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

  const handleAuth = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isSignup) {
      if (userEmail && password && confirmPassword) {
        if (!emailRegex.test(userEmail)) {
          toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address.", duration: 2000 });
          return;
        }
        if (password !== confirmPassword) {
          toast({ variant: "destructive", title: "Password Mismatch", description: "Passwords do not match.", duration: 2000 });
          return;
        }
        if (password.length < 8) {
          toast({ variant: "destructive", title: "Password Too Short", description: "Password must be at least 8 characters long.", duration: 2000 });
          return;
        }
        setIsLoggedIn(true);
        setIsSignup(false);
        toast({ title: "Account Created", description: `Welcome to LazrChain, ${userEmail}!`, duration: 2000 });
      } else {
        toast({ variant: "destructive", title: "Signup Failed", description: "Please fill in all fields.", duration: 2000 });
      }
    } else {
      if (userEmail && password) {
        if (!emailRegex.test(userEmail)) {
          toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address.", duration: 2000 });
          return;
        }
        setIsLoggedIn(true);
        toast({ title: "Login Successful", description: `Welcome back, ${userEmail}!`, duration: 2000 });
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Please enter valid email and password.", duration: 2000 });
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSidebarOpen(false);
    setIsProfileOpen(false);
    setIsDepositOpen(false);
    setUsdtBalance(0);
    setTodayEarnings(0);
    setNetworkSpeed(0);
    toast({ title: "Logged Out", description: "You have been successfully logged out.", duration: 2000 });
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount >= 10 && amount <= 1500) {
      setIsDepositOpen(true);
    } else {
      toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter an amount between $10 and $1500.", duration: 2000 });
    }
  };

  const confirmDeposit = () => {
    const amount = parseFloat(depositAmount);
    setUsdtBalance((prev) => prev + amount);
    setDepositAmount("");
    setIsDepositOpen(false);
    toast({ title: "Deposit Successful", description: `Successfully deposited ${amount} USDT to your account.`, duration: 2000 });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= usdtBalance) {
      setUsdtBalance((prev) => prev - amount);
      setWithdrawAmount("");
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrew ${amount} USDT. Funds will arrive within 10–30 minutes.`,
        duration: 2000,
      });
    } else if (amount > usdtBalance) {
      toast({ variant: "destructive", title: "Insufficient Balance", description: "You don't have enough USDT to withdraw this amount.", duration: 2000 });
    } else {
      toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid withdrawal amount.", duration: 2000 });
    }
  };

  const handleProfileUpdate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let updated = false;
    if (newEmail && newEmail !== userEmail) {
      if (!emailRegex.test(newEmail)) {
        toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address.", duration: 2000 });
        return;
      }
      setUserEmail(newEmail);
      updated = true;
    }
    if (newPassword) {
      if (newPassword.length < 8) {
        toast({ variant: "destructive", title: "Password Too Short", description: "New password must be at least 8 characters long.", duration: 2000 });
        return;
      }
      setPassword(newPassword);
      updated = true;
    }
    if (updated) {
      toast({ title: "Profile Updated", description: "Your profile details have been successfully updated.", duration: 2000 });
    } else {
      toast({ title: "No Changes", description: "No changes were made to your profile.", duration: 2000 });
    }
    setNewEmail("");
    setNewPassword("");
    setIsProfileOpen(false);
  };

  const claimReward = (index: number) => {
    const updatedRewards = [...rewards];
    updatedRewards[index].claimed = true;
    toast({ title: "Reward Claimed", description: `Successfully claimed ${updatedRewards[index].amount} LazrCoin!`, duration: 2000 });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} Address Copied`, description: `${text.substring(0, 6)}...${text.substring(text.length - 4)}`, duration: 2000 });
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
              <Button onClick={handleAuth} className="w-full bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-semibold text-sm py-2 sm:py-3">
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
                <button onClick={() => setIsSignup(!isSignup)} className="text-green-400 hover:text-green-300 dark:text-green-300 dark:hover:text-green-200 text-sm">
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
            <Button variant="ghost" className="lg:hidden text-white dark:text-gray-200 p-2" onClick={toggleSidebar}>
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
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] active:scale-100"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-10 lg:hidden" onClick={toggleSidebar} />}

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="lg:hidden p-2" onClick={toggleSidebar}>
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </Button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
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
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm truncate max-w-[100px] sm:max-w-[120px]">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Modal */}
{isProfileOpen && (
  <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-20 flex items-center justify-center p-4">
    <Card className="w-full max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="relative">
        <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
          <Edit className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" />
          Edit Profile
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Update your password</CardDescription>
        <Button
          variant="ghost"
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={() => setIsProfileOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">Email</label>
          <Input
            type="email"
            value={userEmail}
            disabled
            className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">Wallet Address</label>
          <Input
            type="text"
            value={bep20Address}
            disabled
            className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">New Password</label>
          <Input
            type="password"
            placeholder="Enter new password (min 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleProfileUpdate}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white text-sm py-2"
          >
            Save Changes
          </Button>
          <Button
            onClick={() => setIsProfileOpen(false)}
            variant="outline"
            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm py-2"
          >
            Cancel
          </Button>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-400 dark:hover:border-red-500 text-sm py-2"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </CardContent>
    </Card>
  </div>
)}

        {/* Deposit Modal */}
        {isDepositOpen && (
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-green-200 dark:border-green-700">
              <DialogHeader>
                <DialogTitle className="text-lg text-gray-900 dark:text-white">Deposit USDT</DialogTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Scan the QR code or copy the address to deposit {depositAmount} USDT</CardDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <QRCodeCanvas value={bep20Address} size={160} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">BEP20 Address</label>
                  <div className="flex space-x-2">
                    <Input value={bep20Address} readOnly className="flex-1 text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700" />
                    <Button onClick={() => copyToClipboard(bep20Address, "BEP20")} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 block">TRC20 Address</label>
                  <div className="flex space-x-2">
                    <Input value={trc20Address} readOnly className="flex-1 text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700" />
                    <Button onClick={() => copyToClipboard(trc20Address, "TRC20")} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={confirmDeposit}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white"
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow border-gray-200 dark:border-gray-700">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white">
                    <CardTitle className="flex items-center text-base">
                      <DollarSign className="w-4 h-4 mr-2" />
                      USDT Balance
                    </CardTitle>
                    <CardDescription className="text-green-100 dark:text-green-200 text-sm">Manage your USDT deposits and withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                      ${usdtBalance.toFixed(2)} <span className="text-base text-gray-500 dark:text-gray-400">USDT</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <Input type="number" placeholder="Amount to deposit ($10-$1500)" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 text-sm text-gray-900 dark:text-gray-200" />
                        <Button onClick={handleDeposit} className="w-full bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white text-sm py-2 sm:py-3">
                          Deposit USDT
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Input type="number" placeholder="Amount to withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-sm text-gray-900 dark:text-gray-200" />
                        <Button
                          onClick={handleWithdraw}
                          variant="outline"
                          className="w-full border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:border-blue-600 dark:hover:border-blue-500 text-sm py-2 sm:py-3"
                        >
                          Withdraw USDT
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow border-gray-200 dark:border-gray-700">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white">
                    <CardTitle className="flex items-center text-base">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Earnings Today
                    </CardTitle>
                    <CardDescription className="text-blue-100 dark:text-blue-200 text-sm">Daily yields based on bandwidth usage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">${todayEarnings.toFixed(2)} <span className="text-sm text-gray-500 dark:text-gray-400">USDT</span></div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Daily Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-300">Internet Speed: {networkSpeed.toFixed(1)} Mbps</div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {usdtBalance >= 10 && networkSpeed > 0
                          ? `Earning $${todayEarnings.toFixed(2)} USDT based on ${networkSpeed.toFixed(1)} Mbps`
                          : "Deposit $10+ to start earning"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-gray-900 dark:text-white">
                    <TrendingUp className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" />
                    Earnings Statistics
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Visual representation of your earnings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-gray-900 dark:text-white">
                    <Coins className="w-4 h-4 mr-2 text-yellow-500 dark:text-yellow-400" />
                    Past Earnings
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">History of your USDT earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-sm text-gray-700 dark:text-gray-200">Date</TableHead>
                          <TableHead className="text-right text-sm text-gray-700 dark:text-gray-200">Amount (USDT)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastEarnings.map((earning, index) => (
                          <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <TableCell className="text-sm text-gray-600 dark:text-gray-300">{earning.date}</TableCell>
                            <TableCell className="text-right font-medium text-sm text-gray-600 dark:text-gray-300">${earning.amount.toFixed(2)}</TableCell>
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
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 border-green-200 dark:border-green-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-gray-900 dark:text-white">
                    <Users className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" />
                    Referral Program
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Invite friends and earn bonuses based on their investments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Your Referral Link:</p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Input value="https://lazrchain.app/ref/user123" readOnly className="flex-1 text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText("https://lazrchain.app/ref/user123");
                          toast({ title: "Copied!", description: "Referral link copied to clipboard", duration: 2000 });
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white text-sm py-2 sm:py-2.5"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Referral Bonus Strategy:</p>
                    {referralBonusStrategy.map((strategy, index) => (
                      <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                        <CardContent className="p-4 flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{strategy.label}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{strategy.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Bonus: {strategy.bonus}% of referral's daily income</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-300">{referrals.length}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Total Referrals</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-green-600 dark:text-green-300">{referrals.reduce((sum, ref) => sum + ref.earnings, 0).toFixed(2)}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Total Earnings (USDT)</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-300">{referrals.filter((ref) => ref.status === "Active").length}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Active Referrals</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900 dark:text-white">Referral History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-sm text-gray-700 dark:text-gray-200">Email</TableHead>
                          <TableHead className="text-sm text-gray-700 dark:text-gray-200">Investment (USDT)</TableHead>
                          <TableHead className="text-sm text-gray-700 dark:text-gray-200">Earnings (USDT)</TableHead>
                          <TableHead className="text-sm text-gray-700 dark:text-gray-200">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referrals.map((referral, index) => (
                          <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <TableCell className="text-sm text-gray-600 dark:text-gray-300 truncate">{referral.email}</TableCell>
                            <TableCell className="text-sm text-gray-600 dark:text-gray-300">${referral.investment.toFixed(2)}</TableCell>
                            <TableCell className="text-sm text-gray-600 dark:text-gray-300">${referral.earnings.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={referral.status === "Active" ? "default" : "secondary"} className={referral.status === "Active" ? "bg-green-500 dark:bg-green-600" : "bg-gray-200 dark:bg-gray-600"}>{referral.status}</Badge>
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
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-yellow-200 dark:border-yellow-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-gray-900 dark:text-white">
                    <Gift className="w-4 h-4 mr-2 text-yellow-500 dark:text-yellow-400" />
                    Available Rewards
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Claim your rewards and bonuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {rewards.map((reward, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-shadow">
                        <div className="flex items-center space-x-3">
                          <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                          <div>
                            <div className="font-medium text-sm text-gray-900 dark:text-white">{reward.type}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">${reward.amount.toFixed(2)} USDT</div>
                          </div>
                        </div>
                        {reward.claimed ? (
                          <Badge variant="default" className="bg-green-500 dark:bg-green-600 text-xs">Claimed</Badge>
                        ) : (
                          <Button onClick={() => claimReward(index)} size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 hover:from-yellow-600 hover:to-orange-600 dark:hover:from-yellow-700 dark:hover:to-orange-700 text-white text-xs py-1.5">
                            Claim
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-base text-gray-900 dark:text-white">
                    <Coins className="w-4 h-4 mr-2 text-yellow-500 dark:text-yellow-400" />
                    Investment Strategy
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Earn daily yields based on your USDT investment and bandwidth usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentStrategy.map((strategy, index) => (
                      <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                        <CardContent className="p-4 flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{strategy.label}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{strategy.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Yield Range: {strategy.minYield}% to {strategy.maxYield}% daily</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900 dark:text-white">Upcoming Rewards</CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Complete these tasks to unlock more rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-white">Deposit 100 USDT</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Reward: $5.00 USDT</div>
                      </div>
                      <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-white">Refer 5 Friends</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Reward: $25.00 USDT</div>
                      </div>
                      <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">Pending</Badge>
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