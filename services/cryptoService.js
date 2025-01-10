const CryptoPrice = require("../model/CryptoPriceSchema");
const CryptoUpdateStatus = require("../model/CryptoPriceSchema");
const logger = require("../utils/logger");

// Function to save price data to the database
const savePriceData = async (coinData) => {
    try {
        // Save the price data
        const priceData = await CryptoPrice.create(coinData);
        await priceData.save();

        // Update the status of the last update
        await CryptoUpdateStatus.findOneAndUpdate(
            { coinId: coinData.coinId },
            {
                lastSuccessfulUpdate: new Date(),
                lastUpdateStatus: 'success'
            },
            { upsert: true }
        );
    } catch (err) {
        // Log any errors that occur
        logger.error(`Unable to save price for ${coinData.coinId}:`, err);
        throw err;
    }
};

// Function to calculate the deviation of a coin's price
const getDeviation = async (coinId) => {
    try {
        // Retrieve the last 100 price entries for the coin
        const data = await CryptoPrice.find({ coinId }).sort({ timestamp: -1 }).limit(100);
        if (data.length == 0) {
            throw new Error(`No data found for ${coinId}`);
        }

        // Calculate the mean and standard deviation
        const values = data.map(p => p.priceUSD);
        const mean = values.reduce((a, b) => a + b) / values.length;
        const squareDiffs = values.map(value => Math.pow(value - mean, 2));
        const deviation = Math.sqrt(squareDiffs.reduce((a, b) => a + b) / values.length);

        return { deviation: parseFloat(deviation.toFixed(2)) };

    } catch (err) {
        // Log any errors that occur
        logger.error(`Error occurred while calculating deviation for ${coinId}:`, err);
        throw err;
    }
};

module.exports = { savePriceData, getDeviation };
