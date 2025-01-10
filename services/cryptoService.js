const CryptoPrice = require("../model/CryptoPriceSchema");
const CryptoUpdateStatus = require("../model/CryptoPriceSchema");
const logger = require("../utils/logger");

const savePriceData = async (coinData) => {
    try {
        const priceData = await CryptoPrice.create(coinData);
        await priceData.save();

        await CryptoUpdateStatus.findOneAndUpdate(
            { coinId: coinData.coinId }, {
            lastSuccessfulUpdate: new Date(),
            lastUpdateStatus: 'success'
        }, { upsert: true });
    } catch (err) {
        logger.error(`Unable to save price for ${coinData.coinId}:`, err);
        throw err;
    }
};

const getDeviation = async (coinId) => {
    try {
        const data = await CryptoPrice.find({ coinId }).sort({ timestamp: -1 }).limit(100);
        if (data.length == 0) {
            throw new Error(`No data found for ${coinId}`);
        }

        const values = data.map(p => p.priceUSD);
        const mean = values.reduce((a, b) => a + b) / values.length;
        const squareDiffs = values.map(value => Math.pow(value - mean, 2));
        const deviation = Math.sqrt(squareDiffs.reduce((a, b) => a + b) / values.length);

        return { deviation: parseFloat(deviation.toFixed(2)) };

    } catch (err) {
        logger.error(`Error Occured while calculating deviation for ${coinId}:`, err);
        throw err;
    }
};

module.exports = { savePriceData, getDeviation };