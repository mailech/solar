const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    service_interest: {
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Resolved'],
        default: 'New'
    }
}, { timestamps: true });

InquirySchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
