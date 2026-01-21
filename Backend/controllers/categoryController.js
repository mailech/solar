const { mysqlPool } = require('../config/db');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const [rows] = await mysqlPool.execute('SELECT * FROM categories');
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create category
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const [result] = await mysqlPool.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.status(201).json({ success: true, data: { id: result.insertId, name, description } });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        await mysqlPool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
