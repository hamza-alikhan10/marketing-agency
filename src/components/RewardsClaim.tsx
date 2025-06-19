import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface RewardData {
  dailyReward: {
    amount: number;
    canClaim: boolean;
    nextClaimIn: number;
  };
  totalEarnings: number;
  referralEarnings: number;
  currentTier: string;
  yieldRate: number;
}

const RewardsClaim = () => {
  const [rewards, setRewards] = useState<RewardData | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { updateUser } = useAuth();

  useEffect(() => {
    loadRewards();
    
    // Refresh rewards every minute
    const interval = setInterval(loadRewards, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadRewards = async () => {
    try {
      const data = await apiService.getRewards();
      setRewards(data);
    } catch (error) {
      console.error('Failed to load rewards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const claimReward = async () => {
    if (!rewards?.dailyReward.canClaim) return;

    setIsClaiming(true);
    
    try {
      const result = await apiService.claimReward();
      
      toast({
        title: 'Reward Claimed!',
        description: `Successfully claimed ${result.amount.toFixed(4)} USDT`,
      });

      // Refresh rewards and user data
      await Promise.all([loadRewards(), updateUser()]);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Claim Failed',
        description: error.message || 'Failed to claim reward',
      });
    } finally {
      setIsClaiming(false);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold': return 'text-yellow-600';
      case 'silver': return 'text-gray-600';
      default: return 'text-orange-600';
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case 'gold': return 'default';
      case 'silver': return 'secondary';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-muted rounded w-full"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!rewards) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Failed to load rewards data</p>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = rewards.dailyReward.canClaim 
    ? 100 
    : ((24 - rewards.dailyReward.nextClaimIn) / 24) * 100;

  return (
    <div className="space-y-6">
      {/* Daily Reward Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Daily Reward
          </CardTitle>
          <CardDescription>
            Claim your daily yield reward every 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${rewards.dailyReward.amount.toFixed(4)}
            </div>
            <p className="text-sm text-muted-foreground">
              Available to claim
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Next claim in:</span>
              <span className="font-medium">
                {rewards.dailyReward.canClaim 
                  ? 'Available now!' 
                  : `${rewards.dailyReward.nextClaimIn} hours`
                }
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <Button
            onClick={claimReward}
            disabled={!rewards.dailyReward.canClaim || isClaiming}
            className="w-full"
            size="lg"
          >
            {isClaiming ? 'Claiming...' : 
             rewards.dailyReward.canClaim ? 'Claim Reward' : 
             `Available in ${rewards.dailyReward.nextClaimIn}h`}
          </Button>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">${rewards.totalEarnings.toFixed(4)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Referral Earnings</p>
                <p className="text-2xl font-bold">${rewards.referralEarnings.toFixed(4)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Investment Tier</CardTitle>
          <CardDescription>
            Higher tiers unlock better yield rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Current Tier:</span>
            <Badge variant={getTierBadgeVariant(rewards.currentTier)}>
              <span className={`capitalize ${getTierColor(rewards.currentTier)}`}>
                {rewards.currentTier}
              </span>
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Daily Yield Rate:</span>
            <span className="text-green-600 font-bold">
              {rewards.yieldRate.toFixed(2)}%
            </span>
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Bronze:</strong> $10-$99 → 0.5-2% daily</p>
            <p><strong>Silver:</strong> $100-$499 → 2-4% daily</p>
            <p><strong>Gold:</strong> $500-$1500 → 4-6% daily</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsClaim;