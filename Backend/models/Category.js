const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

// Ensure virtuals are included in JSON output (maps _id to id)
CategorySchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Category', CategorySchema);
