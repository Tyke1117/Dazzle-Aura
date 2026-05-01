const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const connectDB = async () => {
    try {
await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding all services...');
        
        await Service.deleteMany();

        const services = [
            { name: 'Signature Bridal Henna', description: 'Intricate, full-arm and leg bespoke henna designs for the modern bride. Premium organic henna used.', price: 250, duration: 180, category: 'Bridal', image: 'https://lh3.googleusercontent.com/p/AF1QipMd2jwMmok4XTnMIMy_quZDP3BIsMMrFY64j9j_=s1600' },
            { name: 'Bridal Makeup Artistry', description: 'Flawless HD airbrush makeup utilizing luxury brands like Charlotte Tilbury and Dior. Includes consultation.', price: 350, duration: 120, category: 'Bridal' },
            { name: 'Festive Henna Art', description: 'Elegant traditional henna designs tailored for festivals and special events.', price: 65, duration: 45, category: 'Henna', image: 'https://lh3.googleusercontent.com/p/AF1QipNmK-uygJulfVqLL5ZkV22Q-3wwNxCeFMiFo5nx=s1600' },
            
            { name: 'Bespoke Precision Haircut', description: 'Tailored haircut from master stylists, including deep conditioning and a voluminous blowout.', price: 85, duration: 60, category: 'Hair' },
            { name: 'Balayage & Color Melt', description: 'Custom hand-painted highlights providing a natural, sun-kissed gradient effect.', price: 220, duration: 180, category: 'Hair' },
            { name: 'Keratin Smoothing Treatment', description: 'Keratin-infused restorative treatment eliminating frizz and delivering a glossy finish.', price: 180, duration: 120, category: 'Hair' },
            { name: 'Intricate Event Braiding', description: 'Specialized braiding techniques tailored for galas, proms, or editorial looks.', price: 75, duration: 60, category: 'Hair', image: 'https://lh3.googleusercontent.com/p/AF1QipMGioaIowOh1tDuhVixPupZ3NGM1c9rW0_ewC0D=s1600' },
            { name: 'Classic Hollywood Curls', description: 'Voluminous, lasting curls set to perfection for premium events.', price: 90, duration: 60, category: 'Hair', image: 'https://lh3.googleusercontent.com/p/AF1QipON-6TUZyeX2tr_jdpKcNUQZvl5WBT5jMR0eVmh=s1600' },

            { name: '24K Gold Luxury Facial', description: 'Our signature anti-aging facial utilizing pure 24K gold leaf to boost collagen and illuminate skin.', price: 200, duration: 90, category: 'Skincare' },
            { name: 'Diamond Microdermabrasion', description: 'Advanced exfoliation sweeping away dead skin cells to reveal a brighter, smoother complexion.', price: 140, duration: 60, category: 'Skincare' },
            { name: 'Organic Herbal Glow Facial', description: 'Custom-blended botanical ingredients delivering intense hydration and a natural glow.', price: 110, duration: 60, category: 'Skincare' },

            { name: 'Eyebrow Threading & Shaping', description: 'Precise architectural brow shaping to frame your face perfectly.', price: 20, duration: 15, category: 'Threading' },
            { name: 'Full Face Threading', description: 'Complete facial hair removal using gentle, precise threading techniques.', price: 45, duration: 30, category: 'Threading' },
            { name: 'Luxury Full Body Wax', description: 'Premium hard wax treatment enriched with aloe for a painless, silky smooth finish.', price: 160, duration: 90, category: 'Waxing' },
            { name: 'Brazilian Wax', description: 'Expert, quick, and comfortable waxing using high-end sensitive hard wax.', price: 65, duration: 30, category: 'Waxing' }
        ];

        await Service.insertMany(services);
        console.log('All 15 premium services seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
