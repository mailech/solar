const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.submitContactForm = async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, email, subject, message } = req.body;

    try {
        const Inquiry = require('../models/Inquiry');
        const newInquiry = new Inquiry({
            fullName,
            email,
            subject,
            message
        });

        await newInquiry.save();

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: newInquiry
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error submitting contact form'
        });
    }
};

exports.getAllInquiries = async (req, res) => {
    try {
        const Inquiry = require('../models/Inquiry'); // Ensure model is imported preferably top-level but here for minimal diff context if needed, better to move to top
        // Actually, let's just use the Inquiry model directly. 
        // Wait, the previous code used `db.execute` which implies MySQL but we switched to Mongoose.
        // I need to check if Inquiry model is being used. 
        // The current file doesn't import the model properly. 
        // Use the existing Mongoose pattern.

        const Inquiry = require('../models/Inquiry');
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteInquiry = async (req, res) => {
    try {
        const Inquiry = require('../models/Inquiry');
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted' });
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
