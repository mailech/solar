const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        // Fetch products and populate category name if needed
        const products = await Product.find().populate('category_id', 'name');

        // Transform data to flat structure if frontend expects 'category_name'
        const data = products.map(product => {
            const productObj = product.toJSON();
            productObj.category_name = product.category_id ? product.category_id.name : null;
            return productObj;
        });

        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    const { title, price, capacity, category_id, image_url, tag, description, features } = req.body;
    try {
        const product = await Product.create({
            title, price, capacity, category_id, image_url, tag, description, features
        });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
