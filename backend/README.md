# LazrChain Backend

A comprehensive backend API for the LazrChain crypto investment platform with wallet integration, deposits, rewards, and referral system.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Wallet Integration**: TRON wallet connection and USDT (TRC20) transaction verification
- **Deposit System**: Automated deposit verification using blockchain transactions
- **Reward System**: Daily yield calculation and distribution based on investment tiers
- **Referral Program**: Multi-level referral system with percentage-based bonuses
- **Transaction Management**: Complete transaction history and status tracking
- **Automated Jobs**: Daily reward distribution using cron jobs

## Installation

1. **Clone and Setup**
```bash
cd backend
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Database Setup**
```bash
# Make sure MongoDB is running
# The application will connect automatically
```

4. **Start the Server**
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/wallet` - Update wallet address
- `PUT /api/auth/network-speed` - Update network speed

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions/deposit` - Create deposit
- `POST /api/transactions/withdraw` - Create withdrawal
- `GET /api/transactions/:txHash` - Get transaction by hash

### Referrals
- `GET /api/referrals/stats` - Get referral statistics
- `GET /api/referrals/link` - Get referral link
- `GET /api/referrals/validate/:code` - Validate referral code
- `GET /api/referrals/performance` - Get referral performance

### Rewards
- `GET /api/rewards` - Get available rewards
- `POST /api/rewards/claim` - Claim daily reward
- `GET /api/rewards/history` - Get reward history

## Investment Tiers

### Bronze Tier ($10 - $99)
- Daily yield: 0.5% - 2%
- Referral bonus: 8%

### Silver Tier ($100 - $499)
- Daily yield: 2% - 4%
- Referral bonus: 15%

### Gold Tier ($500 - $1500)
- Daily yield: 4% - 6%
- Referral bonus: 18%

## Blockchain Integration

The platform integrates with TRON blockchain for USDT (TRC20) transactions:

- **Transaction Verification**: Automatic verification of deposits using TronGrid API
- **Withdrawal Processing**: Automated USDT transfers to user wallets
- **Balance Tracking**: Real-time balance updates based on blockchain events

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation and sanitization
- **Password Hashing**: Bcrypt password hashing with salt rounds
- **CORS Protection**: Configurable CORS settings
- **Helmet Security**: Security headers with Helmet.js

## Automated Systems

### Daily Reward Distribution
- Runs daily at 00:00 UTC
- Calculates yields based on user balance and network speed
- Distributes referral bonuses automatically
- Creates transaction records for all rewards

### Referral System
- Automatic referral relationship creation
- Percentage-based bonus calculation
- Lifetime referral tracking
- Multi-tier bonus structure

## Database Schema

### User Model
- Authentication and profile data
- Wallet and balance information
- Referral relationships
- Investment tier tracking

### Transaction Model
- Complete transaction history
- Blockchain transaction data
- Status tracking and verification
- Gas and fee information

### Referral Model
- Referrer-referred relationships
- Bonus percentage tracking
- Earnings accumulation
- Activity status

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/lazrchain

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Blockchain Configuration
TRON_NETWORK=https://api.trongrid.io
USDT_CONTRACT_ADDRESS=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
PRIVATE_KEY=your_tron_private_key
TRONGRID_API_KEY=your_trongrid_api_key

# Referral Configuration
REFERRAL_BONUS_PERCENTAGE=10
DAILY_REWARD_PERCENTAGE=1

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Development

### Running Tests
```bash
npm test
```

### Code Structure
```
backend/
├── config/          # Database and configuration
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic services
├── middleware/      # Express middleware
├── jobs/           # Cron jobs and scheduled tasks
└── server.js       # Main application file
```

### Adding New Features

1. **Create Model**: Define data structure in `models/`
2. **Add Routes**: Create API endpoints in `routes/`
3. **Implement Service**: Add business logic in `services/`
4. **Add Middleware**: Create validation/auth in `middleware/`
5. **Update Tests**: Add test coverage

## Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT secret
4. Configure TRON mainnet endpoints
5. Set up SSL certificates
6. Configure reverse proxy (nginx)

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Monitoring

- **Health Check**: `GET /api/health`
- **Error Logging**: Comprehensive error logging
- **Performance Metrics**: Request timing and database queries
- **Blockchain Monitoring**: Transaction verification status

## Support

For technical support or questions:
- Check the API documentation
- Review error logs
- Contact the development team

## License

MIT License - see LICENSE file for details