import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Gift, 
  Wallet,
  LogOut,
  Menu,
  X 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import WalletConnection from "@/components/WalletConnection";
import DepositForm from "@/components/DepositForm";
import ReferralSystem from "@/components/ReferralSystem";
import RewardsClaim from "@/components/RewardsClaim";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout, updateNetworkSpeed } = useAuth();
  const { toast } = useToast();

  // Simulate network speed test
  useEffect(() => {
    const testSpeed = async () => {
      try {
        const startTime = performance.now();
        await fetch('https://picsum.photos/200/200?random=' + Date.now(), {
          cache: 'no-store',
          mode: 'cors',
        });
        const endTime = performance.now();
        
        const duration = (endTime - startTime) / 1000;
        const speedMbps = Math.max((40 * 8) / (duration * 1000), 5);
        const finalSpeed = Math.min(speedMbps * 2, 50);
        
        await updateNetworkSpeed(finalSpeed);
      } catch (error) {
        console.error('Speed test failed:', error);
        await updateNetworkSpeed(Math.random() * 25 + 15);
      }
    };

    testSpeed();
  }, [updateNetworkSpeed]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigation = [
    { id: "overview", icon: TrendingUp, label: "Overview" },
    { id: "wallet", icon: Wallet, label: "Wallet" },
    { id: "deposit", icon: DollarSign, label: "Deposit" },
    { id: "referrals", icon: Users, label: "Referrals" },
    { id: "rewards", icon: Gift, label: "Rewards" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b bg-gradient-to-r from-green-500 to-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-green-500 font-bold text-lg">L</span>
              </div>
              <span className="text-lg font-bold text-white">LazrChain</span>
            </div>
            <Button
              variant="ghost"
              className="lg:hidden text-white p-2"
              onClick={toggleSidebar}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <nav className="mt-4 flex-1 px-2">
          <div className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-2 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center space-x-2 text-sm font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="lg:hidden p-2"
                onClick={toggleSidebar}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {user?.tier?.toUpperCase()} Tier
              </Badge>
              <div className="text-sm text-muted-foreground">
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">USDT Balance</p>
                        <p className="text-2xl font-bold">${user?.usdtBalance?.toFixed(2) || '0.00'}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                        <p className="text-2xl font-bold">${user?.totalEarnings?.toFixed(4) || '0.0000'}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Referral Earnings</p>
                        <p className="text-2xl font-bold">${user?.referralEarnings?.toFixed(4) || '0.0000'}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Network Speed</p>
                        <p className="text-2xl font-bold">{user?.networkSpeed?.toFixed(1) || '0.0'} Mbps</p>
                      </div>
                      <Gift className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Get started with LazrChain investment platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      onClick={() => setActiveTab("wallet")}
                      variant="outline" 
                      className="h-20 flex-col"
                    >
                      <Wallet className="w-6 h-6 mb-2" />
                      Connect Wallet
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("deposit")}
                      variant="outline" 
                      className="h-20 flex-col"
                    >
                      <DollarSign className="w-6 h-6 mb-2" />
                      Deposit USDT
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("rewards")}
                      variant="outline" 
                      className="h-20 flex-col"
                    >
                      <Gift className="w-6 h-6 mb-2" />
                      Claim Rewards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "wallet" && <WalletConnection />}
          {activeTab === "deposit" && <DepositForm />}
          {activeTab === "referrals" && <ReferralSystem />}
          {activeTab === "rewards" && <RewardsClaim />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;