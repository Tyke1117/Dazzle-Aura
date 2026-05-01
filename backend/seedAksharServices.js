const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const connectDB = async () => {
    try {
await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for DazzleAura services seeding with soft/cute images...');
        
        await Service.deleteMany();

        const services = [
            { name: 'Signature Bridal Journey', description: 'Comprehensive bridal packages tailored to your vision.', price: 300, duration: 180, category: 'Bridal', image: 'https://loremflickr.com/800/600/bride,soft/all?lock=201' },
            { name: 'Precision Brow Sculpting', description: 'Precise and clean eyebrow shaping.', price: 15, duration: 15, category: 'Threading', image: 'https://loremflickr.com/800/600/brows,feminine/all?lock=202' },
            { name: 'Illuminating Glow Facial', description: 'Rejuvenating facials for glowing, healthy skin.', price: 60, duration: 45, category: 'Skincare', image: 'https://loremflickr.com/800/600/facial,pastel/all?lock=203' },
            { name: 'Bespoke Precision Cut', description: 'Professional haircut and basic styling.', price: 40, duration: 45, category: 'Hair', image: 'https://loremflickr.com/800/600/haircut,girl/all?lock=204' },
            { name: 'Elegant Event Styling', description: 'Elegant styling for any occasion.', price: 60, duration: 60, category: 'Hair', image: 'https://loremflickr.com/800/600/cute,hairstyling/all?lock=205' },
            { name: 'Gentle Facial Threading', description: 'Gentle facial hair removal via threading.', price: 25, duration: 20, category: 'Threading', image: 'https://loremflickr.com/800/600/face,soft/all?lock=206' },
            { name: 'Flawless Airbrush Artistry', description: 'Professional makeup application.', price: 85, duration: 60, category: 'Makeup', image: 'https://loremflickr.com/800/600/makeup,pink/all?lock=207' },
            { name: 'Glamour & Editorial Makeup', description: 'Customized luxury makeup palettes.', price: 100, duration: 60, category: 'Makeup', image: 'https://loremflickr.com/800/600/lipstick,cute/all?lock=208' },
            { name: 'Classic Gel Manicure', description: 'Classic manicure with premium polish.', price: 35, duration: 45, category: 'Nails', image: 'https://loremflickr.com/800/600/nails,pink/all?lock=209' },
            { name: 'Tranquil Swedish Massage', description: 'Relaxing therapeutic body massage.', price: 80, duration: 60, category: 'Spa', image: 'https://loremflickr.com/800/600/spa,relaxing/all?lock=210' },
            { name: 'DazzleAura Concierge (At-Home Service)', description: 'Premium salon services delivered to your location.', price: 150, duration: 120, category: 'Mobile', image: 'https://loremflickr.com/800/600/aesthetic,bag/all?lock=211' },
            { name: 'Restorative Spa Pedicure', description: 'Luxurious spa pedicure.', price: 45, duration: 45, category: 'Nails', image: 'https://loremflickr.com/800/600/pedicure,flower/all?lock=212' },
            { name: 'Deep Hydration Wash & Blowout', description: 'Deep cleansing and intense hydration.', price: 30, duration: 30, category: 'Hair', image: 'https://loremflickr.com/800/600/hair,shampoo/all?lock=213' },
            { name: 'Ultimate Relaxation Spa Day', description: 'Full body relaxing spa treatments.', price: 120, duration: 90, category: 'Spa', image: 'https://loremflickr.com/800/600/spa,roses/all?lock=214' },
            { name: 'Silky Smooth Essential Wax', description: 'Smooth and long-lasting hair removal.', price: 40, duration: 30, category: 'Waxing', image: 'https://loremflickr.com/800/600/waxing,soft/all?lock=215' },
            { name: 'Traditional Intricate Mehndi Art', description: 'Intricate traditional henna art.', price: 50, duration: 60, category: 'Henna', image: 'https://loremflickr.com/800/600/mehndi,wedding/all?lock=216' },
            { name: 'Full Body Silk Wax Premium', description: 'Complete full body wax using gentle hard wax.', price: 150, duration: 90, category: 'Waxing', image: 'https://loremflickr.com/800/600/skin,glow/all?lock=217' },
            { name: 'Bohemian & Fishtail Braiding', description: 'Expert braiding styles and intricate patterns.', price: 60, duration: 60, category: 'Hair', image: 'https://loremflickr.com/800/600/braids,girl/all?lock=218' },
            { name: 'Gentle Brazilian Wax', description: 'Comfortable and quick intimate waxing.', price: 65, duration: 30, category: 'Waxing', image: 'https://loremflickr.com/800/600/smooth,legs/all?lock=219' },
            { name: 'Signature Split-End Dusting', description: 'Transformative split-end cleanup.', price: 40, duration: 45, category: 'Hair', image: 'https://loremflickr.com/800/600/scissors,salon/all?lock=220' },
            { name: 'Keratin Smooth & Shine Therapy', description: 'Transformative smoothing and frizz control.', price: 150, duration: 120, category: 'Hair', image: 'https://loremflickr.com/800/600/shiny,hair/all?lock=221' },
            { name: 'Revitalizing Scalp & Hair Spa', description: 'Deep nourishing therapy for damaged hair.', price: 70, duration: 60, category: 'Hair', image: 'https://loremflickr.com/800/600/hairspa,relax/all?lock=222' },
            { name: 'Sun-Kissed Balayage & Highlights', description: 'Custom foil highlights or balayage.', price: 120, duration: 120, category: 'Hair', image: 'https://loremflickr.com/800/600/blonde,balayage/all?lock=223' },
            { name: '24K Gold Luxury Facial', description: 'Illuminating gold flake facial for premium glow.', price: 140, duration: 60, category: 'Skincare', image: 'https://loremflickr.com/800/600/skincare,gold/all?lock=224' },
            { name: 'The Ultimate Mani-Pedi Escape', description: 'The ultimate hand and foot luxury treatment.', price: 75, duration: 90, category: 'Nails', image: 'https://loremflickr.com/800/600/nails,spa/all?lock=225' },
            { name: 'Clarifying Scalp Detox Wash', description: 'Refreshing standard hair and scalp wash.', price: 15, duration: 15, category: 'Hair', image: 'https://loremflickr.com/800/600/water,hair/all?lock=226' },
            { name: 'Complete Bridal & Bridesmaid Artistry', description: 'Comprehensive makeup package for bride and bridal party.', price: 400, duration: 180, category: 'Bridal', image: 'https://loremflickr.com/800/600/bridesmaid,wedding/all?lock=227' }
        ];

        await Service.insertMany(services);
        console.log('DazzleAura Services seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
