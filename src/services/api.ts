const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    // Only access localStorage when window is defined (browser environment)
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth methods
  async register(email: string, password: string, referralCode?: string) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, referralCode }),
    });
    
    if (data.token) {
      this.token = data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.token);
      }
    }
    
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      this.token = data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.token);
      }
    }
    
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateWallet(walletAddress: string) {
    return this.request('/auth/wallet', {
      method: 'PUT',
      body: JSON.stringify({ walletAddress }),
    });
  }

  async updateNetworkSpeed(networkSpeed: number) {
    return this.request('/auth/network-speed', {
      method: 'PUT',
      body: JSON.stringify({ networkSpeed }),
    });
  }

  // Transaction methods
  async getTransactions(page = 1, limit = 10, type?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(type && { type }),
    });
    
    return this.request(`/transactions?${params}`);
  }

  async createDeposit(amount: number, txHash: string) {
    return this.request('/transactions/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount, txHash }),
    });
  }

  async createWithdrawal(amount: number, toAddress: string) {
    return this.request('/transactions/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, toAddress }),
    });
  }

  async getTransaction(txHash: string) {
    return this.request(`/transactions/${txHash}`);
  }

  // Referral methods
  async getReferralStats() {
    return this.request('/referrals/stats');
  }

  async getReferralLink() {
    return this.request('/referrals/link');
  }

  async validateReferralCode(code: string) {
    return this.request(`/referrals/validate/${code}`);
  }

  async getReferralPerformance() {
    return this.request('/referrals/performance');
  }

  // Reward methods
  async getRewards() {
    return this.request('/rewards');
  }

  async claimReward() {
    return this.request('/rewards/claim', {
      method: 'POST',
    });
  }

  async getRewardHistory(page = 1, limit = 10) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    return this.request(`/rewards/history?${params}`);
  }

  // Utility methods
  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export const apiService = new ApiService();