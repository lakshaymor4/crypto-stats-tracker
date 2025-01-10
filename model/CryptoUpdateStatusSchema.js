const mongoose = require('mongoose');

const CryptoUpdateStatusSchema = new Schema({
    coinId: {
        type: String,
        required: true,
        enum: ['bitcoin', 'matic-network', 'ethereum'],
        unique: true
    },
    lastSuccessfulUpdate: {
        type: Date,
        required: true
    },
    lastUpdateStatus: {
        type: String,
        enum: ['success', 'failed'],
        required: true
    },
    errorMessage: {
        type: String
    }
}, {
    timestamps: true
});

const CryptoUpdateStatus = mongoose.model('CryptoUpdateStatus', CryptoUpdateStatusSchema);
module.exports = CryptoUpdateStatus;