const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await User.findOne({ email: 'admin@glowupstudio.com' });
        if (adminExists) {
            await User.deleteOne({ email: 'admin@glowupstudio.com' });
            console.log('Existing admin deleted.');
        }

        console.log('Admin cleanup complete. No new admin created.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
