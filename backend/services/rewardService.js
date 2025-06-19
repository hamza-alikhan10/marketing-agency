const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Referral = require('../models/Referral');

class RewardService {
  async calculateAndDistributeRewards() {
    try {
      const users = await User.find({ 
        isActive: true, 
        usdtBalance: { $gte: 10 } 
      });

      for (const user of users) {
        await this.processUserRewards(user);
      }

      console.log(`Processed rewards for ${users.length} users`);
    } catch (error) {
      console.error('Error distributing rewards:', error);
    }
  }

  async processUserRewards(user) {
    try {
      const dailyReward = user.calculateDailyReward();
      
      if (dailyReward > 0) {
        // Add daily reward to user balance
        user.usdtBalance += dailyReward;
        user.totalEarnings += dailyReward;
        await user.save();

        // Create reward transaction
        await Transaction.create({
          user: user._id,
          type: 'reward',
          amount: dailyReward,
          status: 'confirmed',
          description: 'Daily yield reward'
        });

        // Process referral bonuses
        await this.processReferralBonuses(user, dailyReward);
      }
    } catch (error) {
      console.error(`Error processing rewards for user ${user._id}:`, error);
    }
  }

  async processReferralBonuses(user, dailyReward) {
    try {
      if (user.referredBy) {
        const referrer = await User.findById(user.referredBy);
        if (referrer && referrer.isActive) {
          const referral = await Referral.findOne({
            referrer: referrer._id,
            referred: user._id,
            isActive: true
          });

          if (referral) {
            const bonusAmount = dailyReward * (referral.bonusPercentage / 100);
            
            // Add bonus to referrer
            referrer.usdtBalance += bonusAmount;
            referrer.referralEarnings += bonusAmount;
            await referrer.save();

            // Update referral earnings
            referral.totalEarnings += bonusAmount;
            await referral.save();

            // Create referral bonus transaction
            await Transaction.create({
              user: referrer._id,
              type: 'referral_bonus',
              amount: bonusAmount,
              status: 'confirmed',
              description: `Referral bonus from ${user.email}`
            });
          }
        }
      }
    } catch (error) {
      console.error('Error processing referral bonuses:', error);
    }
  }

  async getReferralStats(userId) {
    try {
      const referrals = await Referral.find({ referrer: userId })
        .populate('referred', 'email usdtBalance totalEarnings createdAt')
        .sort({ createdAt: -1 });

      const stats = {
        totalReferrals: referrals.length,
        activeReferrals: referrals.filter(r => r.isActive).length,
        totalEarnings: referrals.reduce((sum, r) => sum + r.totalEarnings, 0),
        referrals: referrals.map(r => ({
          email: r.referred.email,
          investment: r.referred.usdtBalance,
          totalEarnings: r.referred.totalEarnings,
          referralEarnings: r.totalEarnings,
          joinedAt: r.createdAt,
          isActive: r.isActive
        }))
      };

      return stats;
    } catch (error) {
      console.error('Error getting referral stats:', error);
      throw error;
    }
  }
}

module.exports = new RewardService();