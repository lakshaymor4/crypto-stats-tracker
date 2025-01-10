const mongoose = require('mongoose');

const CryptoPriceSchema = new mongoose.Schema({
    coinId: {
        type: String,
        required: true,
        enum: ['bitcoin', 'matic-network', 'ethereum'],
        index: true
    },
    priceUSD: {
        type: Number,
        required: true
    },
    marketCapUSD: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});
const CryptoPrice = mongoose.model('CryptoPrice', CryptoPriceSchema);
module.exports = CryptoPrice;