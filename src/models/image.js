const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    kryptonianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kryptonian', required: true },
    imageBase64: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);

