const fetchCoinService = require("../services/coinGeckoFetch");
const cryptoService = require("../services/cryptoService");
const config = require("../config/config");
const logger = require("../utils/logger");

// Function to fetch prices for supported coins
const fetchPrices = async () => {
    for (const coinId of config.supportedCoins) {
        try {
            // Fetch coin stats and save them to the database
            const stats = await fetchCoinService(coinId);
            await cryptoService.savePriceData({
                coinId,
                ...stats,
                timestamp: new Date()
            });
            logger.info(`Successfully updated price for ${coinId}`);
        } catch (err) {
            // Log any errors that occur
            logger.error(`Failed to update price for ${coinId}:`, err);
        }
    }
};

// Function to start the price fetching job
const start = () => {
    fetchPrices();
    // Schedule the job to run at regular intervals
    setInterval(fetchPrices, config.jobInterval);
};

module.exports = { start };
