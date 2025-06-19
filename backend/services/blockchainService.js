const TronWeb = require('tronweb');
const axios = require('axios');

class BlockchainService {
  constructor() {
    this.tronWeb = new TronWeb({
      fullHost: process.env.TRON_NETWORK,
      headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
      privateKey: process.env.PRIVATE_KEY
    });
    
    this.usdtContractAddress = process.env.USDT_CONTRACT_ADDRESS;
  }

  async verifyTransaction(txHash) {
    try {
      const transaction = await this.tronWeb.trx.getTransaction(txHash);
      
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      const transactionInfo = await this.tronWeb.trx.getTransactionInfo(txHash);
      
      return {
        isValid: transactionInfo.receipt && transactionInfo.receipt.result === 'SUCCESS',
        amount: this.parseUSDTAmount(transaction),
        fromAddress: this.tronWeb.address.fromHex(transaction.raw_data.contract[0].parameter.value.owner_address),
        toAddress: this.tronWeb.address.fromHex(transaction.raw_data.contract[0].parameter.value.to_address),
        blockNumber: transactionInfo.blockNumber,
        gasUsed: transactionInfo.receipt ? transactionInfo.receipt.energy_usage_total : 0
      };
    } catch (error) {
      console.error('Error verifying transaction:', error);
      throw new Error('Failed to verify transaction');
    }
  }

  parseUSDTAmount(transaction) {
    try {
      const contract = transaction.raw_data.contract[0];
      if (contract.type === 'TriggerSmartContract') {
        const parameter = contract.parameter.value;
        if (parameter.contract_address === this.tronWeb.address.toHex(this.usdtContractAddress)) {
          // Parse USDT transfer amount (6 decimals)
          const data = parameter.data;
          const amount = parseInt(data.slice(-16), 16) / 1000000; // USDT has 6 decimals
          return amount;
        }
      }
      return 0;
    } catch (error) {
      console.error('Error parsing USDT amount:', error);
      return 0;
    }
  }

  async sendUSDT(toAddress, amount) {
    try {
      const contract = await this.tronWeb.contract().at(this.usdtContractAddress);
      const amountInSun = Math.floor(amount * 1000000); // USDT has 6 decimals
      
      const transaction = await contract.transfer(toAddress, amountInSun).send();
      
      return {
        txHash: transaction,
        success: true
      };
    } catch (error) {
      console.error('Error sending USDT:', error);
      throw new Error('Failed to send USDT');
    }
  }

  async getUSDTBalance(address) {
    try {
      const contract = await this.tronWeb.contract().at(this.usdtContractAddress);
      const balance = await contract.balanceOf(address).call();
      return balance / 1000000; // Convert from 6 decimals
    } catch (error) {
      console.error('Error getting USDT balance:', error);
      return 0;
    }
  }

  isValidTronAddress(address) {
    return this.tronWeb.isAddress(address);
  }
}

module.exports = new BlockchainService();