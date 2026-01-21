const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    system_size: {
        type: String
    },
    image_url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['Residential', 'Commercial', 'Industrial'],
        default: 'Residential'
    }
}, { timestamps: true });

ProjectSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Project', ProjectSchema);
