const express = require('express');
const User = require('../models/User');
const Referral = require('../models/Referral');
const auth = require('../middleware/auth');
const rewardService = require('../services/rewardService');

const router = express.Router();

// Get referral stats
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await rewardService.getReferralStats(req.user._id);
    res.json(stats);
  } catch (error) {
    console.error('Get referral stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get referral link
router.get('/link', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const referralLink = `${process.env.FRONTEND_URL}/register?ref=${user.referralCode}`;
    
    res.json({
      referralCode: user.referralCode,
      referralLink
    });
  } catch (error) {
    console.error('Get referral link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate referral code
router.get('/validate/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const referrer = await User.findOne({ referralCode: code });
    
    if (!referrer) {
      return res.status(404).json({ 
        valid: false, 
        message: 'Invalid referral code' 
      });
    }

    res.json({
      valid: true,
      referrer: {
        email: referrer.email,
        tier: referrer.tier
      }
    });
  } catch (error) {
    console.error('Validate referral code error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get referral performance
router.get('/performance', auth, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user._id })
      .populate('referred', 'email usdtBalance totalEarnings tier createdAt')
      .sort({ createdAt: -1 });

    const performance = referrals.map(referral => {
      const referred = referral.referred;
      const dailyReward = referred.usdtBalance * (referred.tier === 'gold' ? 0.05 : referred.tier === 'silver' ? 0.03 : 0.015);
      const referralBonus = dailyReward * (referral.bonusPercentage / 100);

      return {
        email: referred.email,
        investment: referred.usdtBalance,
        tier: referred.tier,
        dailyReward,
        referralBonus,
        totalEarnings: referral.totalEarnings,
        joinedAt: referral.createdAt,
        isActive: referral.isActive
      };
    });

    res.json({ performance });
  } catch (error) {
    console.error('Get referral performance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;