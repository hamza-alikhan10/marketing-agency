const express = require('express');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Get available rewards
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const now = new Date();
    const lastClaim = new Date(user.lastRewardClaim);
    const timeDiff = now - lastClaim;
    const hoursSinceLastClaim = timeDiff / (1000 * 60 * 60);

    const canClaim = hoursSinceLastClaim >= 24;
    const dailyReward = user.calculateDailyReward();

    const rewards = {
      dailyReward: {
        amount: dailyReward,
        canClaim,
        nextClaimIn: canClaim ? 0 : Math.ceil(24 - hoursSinceLastClaim)
      },
      totalEarnings: user.totalEarnings,
      referralEarnings: user.referralEarnings,
      currentTier: user.tier,
      yieldRate: user.getDailyYieldRate() * 100
    };

    res.json(rewards);
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim daily reward
router.post('/claim', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const now = new Date();
    const lastClaim = new Date(user.lastRewardClaim);
    const timeDiff = now - lastClaim;
    const hoursSinceLastClaim = timeDiff / (1000 * 60 * 60);

    if (hoursSinceLastClaim < 24) {
      return res.status(400).json({ 
        message: 'Reward not available yet',
        nextClaimIn: Math.ceil(24 - hoursSinceLastClaim)
      });
    }

    const dailyReward = user.calculateDailyReward();
    
    if (dailyReward <= 0) {
      return res.status(400).json({ message: 'No reward available' });
    }

    // Update user balance and last claim time
    user.usdtBalance += dailyReward;
    user.totalEarnings += dailyReward;
    user.lastRewardClaim = now;
    await user.save();

    // Create reward transaction
    const transaction = new Transaction({
      user: user._id,
      type: 'reward',
      amount: dailyReward,
      status: 'confirmed',
      description: 'Daily yield reward claimed'
    });

    await transaction.save();

    res.json({
      message: 'Reward claimed successfully',
      amount: dailyReward,
      newBalance: user.usdtBalance,
      transaction
    });
  } catch (error) {
    console.error('Claim reward error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reward history
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const rewards = await Transaction.find({
      user: req.user._id,
      type: { $in: ['reward', 'referral_bonus'] }
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments({
      user: req.user._id,
      type: { $in: ['reward', 'referral_bonus'] }
    });

    res.json({
      rewards,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get reward history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;