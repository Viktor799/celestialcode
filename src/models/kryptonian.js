const mongoose = require('mongoose');

const kryptonianSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    confirmed: { type: Boolean, default: false },
    apiKey: { type: String, unique: true },
    isValidApiKey: { type: Boolean, default: true }
});

module.exports = mongoose.model('Kryptonian', kryptonianSchema);

