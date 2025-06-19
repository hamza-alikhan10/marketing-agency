const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation, validateRequest } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', registerValidation, validateRequest, async (req, res) => {
  try {
    const { email, password, referralCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Handle referral
    let referredBy = null;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referredBy = referrer._id;
      }
    }

    // Create user
    const user = new User({
      email,
      password,
      referredBy
    });

    await user.save();

    // Create referral relationship if applicable
    if (referredBy) {
      const Referral = require('../models/Referral');
      await Referral.create({
        referrer: referredBy,
        referred: user._id,
        referralCode
      });

      // Add to referrer's referrals array
      await User.findByIdAndUpdate(referredBy, {
        $push: { referrals: user._id }
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        referralCode: user.referralCode,
        usdtBalance: user.usdtBalance
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', loginValidation, validateRequest, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        referralCode: user.referralCode,
        usdtBalance: user.usdtBalance,
        walletAddress: user.walletAddress,
        totalEarnings: user.totalEarnings,
        referralEarnings: user.referralEarnings,
        tier: user.tier
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('referrals', 'email usdtBalance totalEarnings');

    res.json({
      user: {
        id: user._id,
        email: user.email,
        referralCode: user.referralCode,
        usdtBalance: user.usdtBalance,
        walletAddress: user.walletAddress,
        totalEarnings: user.totalEarnings,
        referralEarnings: user.referralEarnings,
        networkSpeed: user.networkSpeed,
        tier: user.tier,
        referrals: user.referrals,
        lastRewardClaim: user.lastRewardClaim
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update wallet address
router.put('/wallet', auth, async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    const blockchainService = require('../services/blockchainService');
    if (!blockchainService.isValidTronAddress(walletAddress)) {
      return res.status(400).json({ message: 'Invalid TRON address' });
    }

    await User.findByIdAndUpdate(req.user._id, { walletAddress });
    
    res.json({ message: 'Wallet address updated successfully' });
  } catch (error) {
    console.error('Update wallet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update network speed
router.put('/network-speed', auth, async (req, res) => {
  try {
    const { networkSpeed } = req.body;
    
    if (networkSpeed < 0 || networkSpeed > 1000) {
      return res.status(400).json({ message: 'Invalid network speed' });
    }

    await User.findByIdAndUpdate(req.user._id, { networkSpeed });
    
    res.json({ message: 'Network speed updated successfully' });
  } catch (error) {
    console.error('Update network speed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;