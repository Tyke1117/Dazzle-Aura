const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const connectDB = async () => {
    try {
await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding...');
        
        await Service.deleteMany();

        const services = [
            {
                name: 'Bridal Henna (Hands & Feet)',
                description: 'Exquisite, detailed henna designs for brides.',
                price: 150,
                duration: 120,
                category: 'Henna',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMd2jwMmok4XTnMIMy_quZDP3BIsMMrFY64j9j_=s1600'
            },
            {
                name: 'Intricate Braiding',
                description: 'Specialized intricate hair braiding for events.',
                price: 50,
                duration: 60,
                category: 'Hair',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMGioaIowOh1tDuhVixPupZ3NGM1c9rW0_ewC0D=s1600'
            },
            {
                name: 'Classic Curls & Styling',
                description: 'Elegant curling and hair treatments for a fresh look.',
                price: 70,
                duration: 45,
                category: 'Hair',
                image: 'https://lh3.googleusercontent.com/p/AF1QipON-6TUZyeX2tr_jdpKcNUQZvl5WBT5jMR0eVmh=s1600'
            },
            {
                name: 'Festive Henna (Single)',
                description: 'Simple and elegant henna designs for festive occasions.',
                price: 40,
                duration: 30,
                category: 'Henna',
                image: 'https://lh3.googleusercontent.com/p/AF1QipO-sn6rXo3LMLiL3qK6dWPQh-LISB_AvwT9GDmj=s1600'
            }
        ];

        await Service.insertMany(services);
        console.log('Services seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
