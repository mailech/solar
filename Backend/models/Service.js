const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String, // Storing icon name for Lucide React or similar
        required: true
    },
    category: {
        type: String // e.g. 'residential', 'commercial'
    },
    link: {
        type: String
    }
}, { timestamps: true });

ServiceSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Service', ServiceSchema);
