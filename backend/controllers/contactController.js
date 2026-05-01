const Contact = require('../models/Contact');

const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        const createdContact = await contact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitContactForm, getContactMessages };
