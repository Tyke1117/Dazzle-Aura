const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
    category: { type: String, required: true }, // e.g., Hair, Facial, Bridal
    image: { type: String }, // image URL reference
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
