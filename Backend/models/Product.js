const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image_url: {
        type: String
    },
    tag: {
        type: String
    },
    description: {
        type: String
    },
    features: {
        type: Array,
        default: []
    }
}, { timestamps: true });

ProductSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Product', ProductSchema);
