const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments, getAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createAppointment)
    .get(protect, admin, getAppointments);

router.route('/myappointments').get(protect, getMyAppointments);
router.route('/:id/status').put(protect, admin, updateAppointmentStatus);

module.exports = router;
