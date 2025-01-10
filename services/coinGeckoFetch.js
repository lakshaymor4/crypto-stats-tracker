const axios = require('axios');
const config = require("../config/config");
const logger = require("../utils/logger");

const coinGeckoFetch = async (coinId) => {
    try {
        const queryParams = new URLSearchParams({
            ids: coinId,
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true
        }).toString();

        const response = await axios.get(`${config.coinGeckoApi}/simple/price?${queryParams}`);


        const coinData = response.data[coinId];

        return {
            priceUSD: coinData.usd,
            marketCapUSD: coinData.usd_market_cap,
            change24h: coinData.usd_24h_change
        };
    } catch (error) {
        logger.error(`Unable to fetch Data from CoinGecko for ${coinId}:`, error);
        throw error;
    }
};

module.exports = coinGeckoFetch;