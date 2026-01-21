const { mysqlPool } = require('../config/db');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await mysqlPool.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    const { title, price, capacity, category_id, image_url, tag, description, features } = req.body;
    try {
        const sql = `INSERT INTO products (title, price, capacity, category_id, image_url, tag, description, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const featuresJson = JSON.stringify(features || []);
        const [result] = await mysqlPool.execute(sql, [title, price, capacity, category_id, image_url, tag, description, featuresJson]);

        const newProduct = { id: result.insertId, title, price, capacity, category_id, image_url, tag, description, features };
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await mysqlPool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
