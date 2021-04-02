const mongoose = require('mongoose')

const ConectorSchema = new mongoose.Schema({
    name: String,
    type: String,
    privacy: String,
    base_url: String,
    logo_url: String,
    category: String,
    description: String,
    status: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Conector', ConectorSchema);