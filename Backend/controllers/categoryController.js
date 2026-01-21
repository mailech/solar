const Category = require('../models/Category');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create category
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await Category.create({ name, description });
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
