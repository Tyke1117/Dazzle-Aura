const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
const { serviceId, date, timeSlot, notes } = req.body;

        if (!serviceId || !date || !timeSlot) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Normalize date for same-day comparison
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0,0,0,0);

        const existingAppointment = await Appointment.findOne({ 
            service: serviceId,
            date: {
                $gte: normalizedDate,
                $lt: new Date(normalizedDate.getTime() + 24*60*60*1000)
            },
            timeSlot,
            status: { $ne: 'cancelled' } 
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked for this service' });
        }

        const appointment = new Appointment({
            user: req.user._id,
            service: serviceId,
            date,
            timeSlot,
            notes
        });

        const createdAppointment = await appointment.save();

        await createdAppointment.populate('service', 'name price duration');
        await createdAppointment.populate('user', 'name email');

        // Send acknowledgement email to the customer
        if (createdAppointment.user && createdAppointment.user.email) {
            const sendEmail = require('../utils/sendEmail');
            const message = `Hello ${createdAppointment.user.name},\n\nWe have received your booking request for ${createdAppointment.service?.name} on ${new Date(createdAppointment.date).toLocaleDateString()} at ${createdAppointment.timeSlot}.\n\nYour appointment is currently pending. You will receive another email once it is approved by our staff.\n\nThank you,\nDazzleAura`;
            
            await sendEmail({
                email: createdAppointment.user.email,
                subject: 'Booking Received - DazzleAura',
                message
            });
        }

        res.status(201).json(createdAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments/myappointments
// @access  Private
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user._id })
            .populate('service', 'name price duration image');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate('user', 'id name email phone')
            .populate('service', 'name price duration');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private/Admin
const updateAppointmentStatus = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('user', 'name email').populate('service', 'name');

        if (appointment) {
            appointment.status = req.body.status || appointment.status;

            const updatedAppointment = await appointment.save();

            // Send confirmation email
            if (req.body.status === 'confirmed' && appointment.user && appointment.user.email) {
                const sendEmail = require('../utils/sendEmail');
                const message = `Hello ${appointment.user.name},\n\nYour appointment for ${appointment.service?.name || 'our services'} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.timeSlot} has been confirmed.\n\nThank you for choosing DazzleAura!`;
                
                await sendEmail({
                    email: appointment.user.email,
                    subject: 'Appointment Confirmed - DazzleAura',
                    message
                });
            }

            res.json(updatedAppointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createAppointment, getMyAppointments, getAppointments, updateAppointmentStatus };

