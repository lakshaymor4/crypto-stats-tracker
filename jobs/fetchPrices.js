const fetchCoinService = require("../services/coinGeckoFetch");
const cryptoService = require("../services/cryptoService");
const config = require("../config/config");
const logger = require("../utils/logger");

const fetchPrices = async () => {
    for (const coinId of config.supportedCoins) {
        try {
            const stats = await fetchCoinService(coinId);
            await cryptoService.savePriceData({
                coinId,
                ...stats,
                timestamp: new Date()
            });
            logger.info(`Successfully updated price for ${coinId}`);
        } catch (err) {
            logger.error(`Failed to update price for ${coinId}:`, err);
        }

    }
};

const start = () => {
    fetchPrices();

    setInterval(fetchPrices, config.jobInterval);
};

module.exports = { start };
