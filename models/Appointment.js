const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true }, // Date of appointment
    timeSlot: { type: String, required: true }, // e.g., "10:00 AM"
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
        default: 'pending' 
    },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
