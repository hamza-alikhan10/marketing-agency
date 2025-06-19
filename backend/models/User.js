const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  walletAddress: {
    type: String,
    default: null
  },
  usdtBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarnings: {
    type: Number,
    default: 0,
    min: 0
  },
  referralCode: {
    type: String,
    unique: true,
    required: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  referrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  referralEarnings: {
    type: Number,
    default: 0,
    min: 0
  },
  lastRewardClaim: {
    type: Date,
    default: Date.now
  },
  networkSpeed: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold'],
    default: 'bronze'
  }
}, {
  timestamps: true
});

// Generate referral code before saving
userSchema.pre('save', async function(next) {
  if (this.isNew && !this.referralCode) {
    this.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  
  // Update tier based on balance
  if (this.usdtBalance >= 500) {
    this.tier = 'gold';
  } else if (this.usdtBalance >= 100) {
    this.tier = 'silver';
  } else {
    this.tier = 'bronze';
  }
  
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getDailyYieldRate = function() {
  const balance = this.usdtBalance;
  const speed = this.networkSpeed;
  
  if (balance < 10 || speed <= 0) return 0;
  
  let baseRate;
  if (balance >= 500) {
    baseRate = 0.04 + (Math.min(speed, 100) / 100) * 0.02; // 4-6%
  } else if (balance >= 100) {
    baseRate = 0.02 + (Math.min(speed, 100) / 100) * 0.02; // 2-4%
  } else {
    baseRate = 0.005 + (Math.min(speed, 100) / 100) * 0.015; // 0.5-2%
  }
  
  return baseRate;
};

userSchema.methods.calculateDailyReward = function() {
  const rate = this.getDailyYieldRate();
  return this.usdtBalance * rate;
};

module.exports = mongoose.model('User', userSchema);