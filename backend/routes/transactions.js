const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { depositValidation, withdrawalValidation, validateRequest } = require('../middleware/validation');
const blockchainService = require('../services/blockchainService');

const router = express.Router();

// Get user transactions
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    
    const query = { user: req.user._id };
    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create deposit
router.post('/deposit', auth, depositValidation, validateRequest, async (req, res) => {
  try {
    const { amount, txHash } = req.body;

    // Check if transaction already exists
    const existingTx = await Transaction.findOne({ txHash });
    if (existingTx) {
      return res.status(400).json({ message: 'Transaction already processed' });
    }

    // Verify transaction on blockchain
    const verification = await blockchainService.verifyTransaction(txHash);
    
    if (!verification.isValid) {
      return res.status(400).json({ message: 'Invalid transaction' });
    }

    if (verification.amount !== amount) {
      return res.status(400).json({ message: 'Amount mismatch' });
    }

    // Create transaction record
    const transaction = new Transaction({
      user: req.user._id,
      type: 'deposit',
      amount,
      txHash,
      status: 'confirmed',
      fromAddress: verification.fromAddress,
      toAddress: verification.toAddress,
      blockNumber: verification.blockNumber,
      gasUsed: verification.gasUsed,
      description: 'USDT deposit'
    });

    await transaction.save();

    // Update user balance
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { usdtBalance: amount }
    });

    res.status(201).json({
      message: 'Deposit confirmed successfully',
      transaction
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create withdrawal
router.post('/withdraw', auth, withdrawalValidation, validateRequest, async (req, res) => {
  try {
    const { amount, toAddress } = req.body;

    const user = await User.findById(req.user._id);
    
    if (user.usdtBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Create pending transaction
    const transaction = new Transaction({
      user: req.user._id,
      type: 'withdrawal',
      amount,
      status: 'pending',
      toAddress,
      description: 'USDT withdrawal'
    });

    await transaction.save();

    try {
      // Send USDT
      const result = await blockchainService.sendUSDT(toAddress, amount);
      
      // Update transaction with success
      transaction.status = 'confirmed';
      transaction.txHash = result.txHash;
      await transaction.save();

      // Update user balance
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { usdtBalance: -amount }
      });

      res.json({
        message: 'Withdrawal processed successfully',
        transaction,
        txHash: result.txHash
      });
    } catch (blockchainError) {
      // Update transaction with failure
      transaction.status = 'failed';
      await transaction.save();
      
      throw blockchainError;
    }
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({ message: 'Withdrawal failed' });
  }
});

// Get transaction by hash
router.get('/:txHash', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      txHash: req.params.txHash,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;