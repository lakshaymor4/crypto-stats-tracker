const axios = require('axios');
const config = require("../config/config");
const logger = require("../utils/logger");

// Function to fetch coin data from CoinGecko
const coinGeckoFetch = async (coinId) => {
    try {
        // Construct query parameters
        const queryParams = new URLSearchParams({
            ids: coinId,
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true
        }).toString();

        // Make a GET request to the CoinGecko API
        const response = await axios.get(`${config.coinGeckoApi}/simple/price?${queryParams}`);

        // Extract relevant data for the coin
        const coinData = response.data[coinId];

        return {
            priceUSD: coinData.usd,
            marketCapUSD: coinData.usd_market_cap,
            change24h: coinData.usd_24h_change
        };
    } catch (error) {
        // Log and rethrow the error if fetching fails
        logger.error(`Unable to fetch Data from CoinGecko for ${coinId}:`, error);
        throw error;
    }
};

module.exports = coinGeckoFetch;
