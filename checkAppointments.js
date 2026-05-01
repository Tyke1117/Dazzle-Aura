const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Appointment = require('./models/Appointment');
require('./models/User');
require('./models/Service');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    try {
        const apps = await Appointment.find({});
        console.log(JSON.stringify(apps, null, 2));
    } catch(err) {
        console.log("ERRORRR:", err);
    }
    process.exit();
});
