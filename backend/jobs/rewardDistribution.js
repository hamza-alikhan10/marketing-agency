const cron = require('node-cron');
const rewardService = require('../services/rewardService');

// Run daily at 00:00 UTC
const scheduleRewardDistribution = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Starting daily reward distribution...');
    try {
      await rewardService.calculateAndDistributeRewards();
      console.log('Daily reward distribution completed successfully');
    } catch (error) {
      console.error('Error in daily reward distribution:', error);
    }
  }, {
    timezone: "UTC"
  });

  console.log('Reward distribution job scheduled');
};

module.exports = { scheduleRewardDistribution };