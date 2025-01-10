const cryptoService = require("../services/cryptoService");
const fetchCoinService = require("../services/coinGeckoFetch");
const config = require("../config/config");
const { Http } = require("winston/lib/winston/transports");

//Note: Implementing getStats assuming that by fetching latest stats you meant doing an api call to gecko and not fetching it from the database
const getStats = async (req, res) => {
    try {
        const { coin } = req.query;

        if (!config.supportedCoins.includes(coin)) {
            return res.status(400).json({ message: 'Coin not supported' });
        }

        const stats = await fetchCoinService(coin);
        res.status(200).json(stats);
    } catch (err) {
        const statusCode = err.response?.status === 429 ? 503 : 500;
        return res.status(statusCode).json({ message: 'Unable to Fetch Stats At This Moment' });
    }
};

const getDeviation = async (req, res) => {
    try {
        const { coin } = req.query;

        if (!config.supportedCoins.includes(coin)) {
            return res.status(400).json({ message: 'Coin not supported' });
        }

        const deviation = await cryptoService.getDeviation(coin);
        res.status(200).json(deviation);
    } catch (err) {
        const statusCode = err.response?.status === 429 ? 503 : 500;
        return res.status(statusCode).json({ message: 'Unable to Fetch Deviation At This Moment' });
    }
};

const getRoutes = async (req, res) => {
    try {
        res.status(200).json({ message: "/stats, /deviation" });
    }
    catch (err) {
        res.status(500).json({ message: "Unable to Fetch Routes" });
    }
};

module.exports = { getStats, getDeviation, getRoutes };