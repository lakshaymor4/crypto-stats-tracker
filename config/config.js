require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/crypto',
    coinGeckoApi: 'https://api.coingecko.com/api/v3',
    supportedCoins: ['bitcoin', 'ethereum', 'matic-network'],
    jobInterval: 2 * 60 * 60 * 1000,
};