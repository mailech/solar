const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { body } = require('express-validator');

// Validation Rules
const contactValidation = [
    body('fullName').notEmpty().withMessage('Full Name is required'),
    body('email').isEmail().withMessage('Valid Email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required')
];

router.post('/', contactValidation, contactController.submitContactForm);
router.get('/', contactController.getAllInquiries);
router.delete('/:id', contactController.deleteInquiry);

module.exports = router;
