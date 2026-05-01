const User = require('../models/User');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name, email, password: hashedPassword, phone
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Delete user profile
// @route   DELETE /api/auth/profile
// @access  Private
const deleteUserProfile = async (req, res) => {
    try {
        console.log('=== DELETE USER DEBUG ===');
        console.log('req.user:', req.user);
        console.log('req.user._id:', req.user?._id, 'type:', typeof req.user?._id);
        
        const userIdStr = String(req.user._id);
        const user = await User.findById(userIdStr);

        console.log('Found user:', user);

        if (user) {
            const apptsDeleted = await Appointment.deleteMany({ user: userIdStr });
            console.log(`Deleted appointments:`, apptsDeleted.deletedCount);
            
            const userDeleted = await User.deleteOne({ _id: userIdStr });
            console.log(`User deletion result:`, userDeleted.deletedCount);
            
            res.json({ message: 'User account and appointments deleted successfully' });
        } else {
            console.log('No user found with ID:', userIdStr);
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, deleteUserProfile };
