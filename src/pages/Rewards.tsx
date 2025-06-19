import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Coins, Star, Zap, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  type: string;
  amount: number;
  claimed: boolean;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  canClaim: boolean;
}

interface InvestmentStrategy {
  min: number;
  max: number;
  minYield: number;
  maxYield: number;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface RewardsProps {
  usdtBalance: number;
  referralEarnings: number;
  lastRewardClaim: number;
  onClaimReward: (amount: number) => void;
  onUpdateLastRewardClaim: () => void;
}

const Rewards = ({ usdtBalance, referralEarnings, lastRewardClaim, onClaimReward, onUpdateLastRewardClaim }: RewardsProps) => {
  const { toast } = useToast();

  // Investment strategy tiers
  const investmentStrategy: InvestmentStrategy[] = [
    {
      min: 10,
      max: 100,
      minYield: 0.5,
      maxYield: 2,
      label: "$10 - $100",
      description: "Earn daily yields based on your bandwidth contribution to the network.",
      icon: Coins,
      gradient: "from-green-400 to-emerald-500",
    },
    {
      min: 100,
      max: 500,
      minYield: 2,
      maxYield: 4,
      label: "$100 - $500",
      description: "Higher tier with increased earning potential through network participation.",
      icon: Zap,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      min: 500,
      max: 1500,
      minYield: 4,
      maxYield: 6,
      label: "$500 - $1500",
      description: "Premium tier offering maximum yields for substantial network contributors.",
      icon: Star,
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  // Calculate reward percentage based on USDT balance
  const getRewardPercentage = (balance: number) => {
    if (balance >= 10 && balance <= 100) return 1.5; // 1.5% daily
    if (balance > 100 && balance <= 500) return 2.5; // 2.5% daily
    if (balance > 500 && balance <= 1500) return 3.5; // 3.5% daily
    return 0;
  };

  // Generate rewards (balance and referral)
  const generateRewards = (): Reward[] => {
    const balanceReward = {
      type: "Balance Reward",
      amount: (usdtBalance * getRewardPercentage(usdtBalance)) / 100,
      claimed: false,
      icon: DollarSign,
      gradient: "from-green-400 to-emerald-500",
      canClaim: Date.now() - lastRewardClaim >= 24 * 60 * 60 * 1000, // 24 hours
    };

    const referralReward = {
      type: "Referral Bonus",
      amount: referralEarnings,
      claimed: false,
      icon: Users,
      gradient: "from-blue-400 to-cyan-500",
      canClaim: Date.now() - lastRewardClaim >= 24 * 60 * 60 * 1000, // 24 hours
    };

    return [balanceReward, referralReward].filter((reward) => reward.amount > 0);
  };

  const rewards = generateRewards();

  // Handle reward claim
  const handleClaimReward = (index: number) => {
    const reward = rewards[index];
    if (reward.canClaim) {
      onClaimReward(reward.amount);
      onUpdateLastRewardClaim();
      toast({
        title: "Reward Claimed",
        description: `Successfully claimed ${reward.amount.toFixed(4)} USDT!`,
        duration: 3000,
      });
    } else {
      const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - (Date.now() - lastRewardClaim)) / (1000 * 60 * 60));
      toast({
        variant: "destructive",
        title: "Cannot Claim",
        description: `You can claim rewards in ${hoursLeft} hours.`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
            <Gift className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
            Available Rewards (Every 24 Hours)
          </CardTitle>
          <CardDescription className="text-base text-gray-600 dark:text-gray-300">
            Claim your rewards based on your USDT balance and referral performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {rewards.map((reward, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${reward.gradient}`}></div>
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${reward.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <reward.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-base text-gray-900 dark:text-white">{reward.type}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          ${reward.amount.toFixed(4)} USDT Reward
                        </div>
                        {!reward.canClaim && (
                          <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                            Available in{" "}
                            {Math.ceil((24 * 60 * 60 * 1000 - (Date.now() - lastRewardClaim)) / (1000 * 60 * 60))} hours
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleClaimReward(index)}
                      disabled={!reward.canClaim}
                      className={`${
                        reward.canClaim
                          ? `bg-gradient-to-r ${reward.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl`
                          : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
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
          <CardDescription className="text-base text-gray-600 dark:text-gray-300">
            Maximize your returns with strategic investment levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {investmentStrategy.map((strategy, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={`h-3 bg-gradient-to-r ${strategy.gradient}`}></div>
                  <div className="p-4 sm:p-6 flex items-start space-x-4">
                    <div
                      className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r ${strategy.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <strategy.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{strategy.label}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{strategy.description}</p>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 font-semibold"
                        >
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
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Achieve these goals to unlock exclusive rewards and grow your network
          </CardDescription>
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
                    <div className="text-sm text-gray-500 dark:text-gray-400">Unlock premium tier with 3.5% daily rewards</div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium"
                >
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
                <Badge
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium"
                >
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
                <Badge
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium"
                >
                  Active
                </Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rewards;