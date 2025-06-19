import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, Star, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define interfaces for referral and strategy
interface Referral {
  email: string;
  investment: number;
  dailyReward: number;
  referralEarnings: number;
  status: string;
}

interface ReferralBonusStrategy {
  min: number;
  max: number;
  bonus: number;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface ReferralProgramProps {
  usdtBalance: number;
  networkSpeed: number;
  onReferralEarningsUpdate: (earnings: number) => void; // Callback to update Dashboard
}

const ReferralProgram = ({ usdtBalance, networkSpeed, onReferralEarningsUpdate }: ReferralProgramProps) => {
  const { toast } = useToast();

  // Referral bonus strategy based on referred user's balance
  const referralBonusStrategy: ReferralBonusStrategy[] = [
    {
      min: 10,
      max: 100,
      bonus: 8,
      label: "$10 - $100",
      description: "Earn 8% of your referral's daily rewards. Perfect for beginners building their network.",
      icon: Users,
      gradient: "from-green-400 to-teal-500",
    },
    {
      min: 100,
      max: 500,
      bonus: 15,
      label: "$100 - $500",
      description: "Earn 15% of your referral's daily rewards. Ideal for growing your network with serious investors.",
      icon: TrendingUp,
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      min: 500,
      max: 1500,
      bonus: 18,
      label: "$500 - $1500",
      description: "Earn 18% of your referral's daily rewards. Maximize earnings with high-value network participants.",
      icon: Star,
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  // Investment strategy for calculating daily yield (same as Dashboard)
  const investmentStrategy = [
    { min: 10, max: 100, minYield: 0.5, maxYield: 2 },
    { min: 100, max: 500, minYield: 2, maxYield: 4 },
    { min: 500, max: 1500, minYield: 4, maxYield: 6 },
  ];

  // State for referrals
  const [referrals, setReferrals] = useState<Referral[]>([
    { email: "user1@example.com", investment: 80, dailyReward: 0, referralEarnings: 0, status: "Active" }, // Changed to $80 for example
    { email: "user2@example.com", investment: 200, dailyReward: 0, referralEarnings: 0, status: "Active" },
    { email: "user3@example.com", investment: 600, dailyReward: 0, referralEarnings: 0, status: "Pending" },
  ]);

  // Calculate daily yield for a given balance and network speed
  const calculateDailyYield = (balance: number, speedMbps: number) => {
    const tier = investmentStrategy.find((strategy) => balance >= strategy.min && balance <= strategy.max);
    if (!tier || balance < 10 || speedMbps <= 0) return 0;

    const maxSpeed = 100;
    const yieldRange = tier.maxYield - tier.minYield;
    const yieldPercentage = tier.minYield + (Math.min(speedMbps, maxSpeed) / maxSpeed) * yieldRange;
    const yieldAmount = (balance * yieldPercentage) / 100;
    return yieldAmount;
  };

  // Calculate referral bonus based on referred user's daily reward
  const calculateReferralBonus = (investment: number, dailyReward: number) => {
    const tier = referralBonusStrategy.find((strategy) => investment >= strategy.min && investment <= strategy.max);
    if (!tier || investment < 10 || dailyReward <= 0) return 0;
    return (dailyReward * tier.bonus) / 100;
  };

  // Update referrals' daily rewards and referral earnings daily
  useEffect(() => {
    if (networkSpeed > 0) {
      setReferrals((prev) =>
        prev.map((ref) => {
          if (ref.status === "Active" && ref.investment >= 10) {
            const dailyReward = calculateDailyYield(ref.investment, networkSpeed);
            const referralEarnings = calculateReferralBonus(ref.investment, dailyReward);
            return { ...ref, dailyReward, referralEarnings };
          }
          return { ...ref, dailyReward: 0, referralEarnings: 0 };
        })
      );
    }
  }, [networkSpeed]);

  // Notify Dashboard of total referral earnings
  useEffect(() => {
    const totalEarnings = referrals.reduce((sum, ref) => sum + ref.referralEarnings, 0);
    onReferralEarningsUpdate(totalEarnings);
  }, [referrals, onReferralEarningsUpdate]);

  // Calculate total referral earnings
  const getTotalReferralEarnings = () => {
    return referrals.reduce((sum, ref) => sum + ref.referralEarnings, 0);
  };

  // Copy referral link to clipboard
  const copyReferralLink = () => {
    const referralLink = "https://lazrchain.app/ref/user123";
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Copied!", description: "Referral link copied to clipboard", duration: 3000 });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
            <Users className="w-6 h-6 mr-3 text-green-500 dark:text-green-400" />
            Referral Program
          </CardTitle>
          <CardDescription className="text-base text-gray-600 dark:text-gray-300">
            Build your network and earn daily from your referrals' rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Referral Link */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border-0 shadow-lg">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Your Referral Link:</p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Input
                value="https://lazrchain.app/ref/user123"
                readOnly
                className="flex-1 text-xs sm:text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 h-11 sm:h-12 rounded-xl font-mono"
              />
              <Button
                onClick={copyReferralLink}
                className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white text-sm py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>

          {/* Referral Bonus Tiers */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Referral Bonus Tiers</h3>
            <div className="grid gap-4">
              {referralBonusStrategy.map((strategy, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className={`h-2 bg-gradient-to-r ${strategy.gradient}`}></div>
                    <div className="p-4 sm:p-6 flex items-start space-x-4">
                      <div
                        className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r ${strategy.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <strategy.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{strategy.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{strategy.description}</p>
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 font-semibold"
                        >
                          {strategy.bonus}% of Referral's Daily Reward
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 sm:p-6 rounded-2xl text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl font-bold mb-1">{referrals.length}</div>
              <div className="text-xs sm:text-sm font-medium opacity-90">Total Referrals</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-4 sm:p-6 rounded-2xl text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl font-bold mb-1">${getTotalReferralEarnings().toFixed(4)}</div>
              <div className="text-xs sm:text-sm font-medium opacity-90">Daily Earnings</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 p-4 sm:p-6 rounded-2xl text-white text-center shadow-xl">
              <div className="text-2xl sm:text-3xl font-bold mb-1">{referrals.filter((ref) => ref.status === "Active").length}</div>
              <div className="text-xs sm:text-sm font-medium opacity-90">Active Referrals</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Performance Table */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Referral Performance</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Track your referrals and their daily contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Email</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Investment</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Daily Reward</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Your Earnings</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <TableCell className="text-sm font-medium text-gray-600 dark:text-gray-300">{referral.email}</TableCell>
                    <TableCell className="text-sm font-bold text-green-600 dark:text-green-400">
                      ${referral.investment.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      ${referral.dailyReward.toFixed(4)}
                    </TableCell>
                    <TableCell className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      ${referral.referralEarnings.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={referral.status === "Active" ? "default" : "secondary"}
                        className={`${
                          referral.status === "Active"
                            ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        } font-medium`}
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
  );
};

export default ReferralProgram;