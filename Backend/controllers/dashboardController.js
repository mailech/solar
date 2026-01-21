const Inquiry = require('../models/Inquiry');
const { mysqlPool } = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        // Hybrid Queries: MySQL for Content, MongoDB for Inquiries
        const [products] = await mysqlPool.execute('SELECT COUNT(*) as count FROM products');
        const [services] = await mysqlPool.execute('SELECT COUNT(*) as count FROM services');
        const [projects] = await mysqlPool.execute('SELECT COUNT(*) as count FROM projects');
        const [categories] = await mysqlPool.execute('SELECT COUNT(*) as count FROM categories');

        const inquiryCount = await Inquiry.countDocuments();

        const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            counts: {
                products: products[0].count,
                services: services[0].count,
                projects: projects[0].count,
                categories: categories[0].count,
                inquiries: inquiryCount,
            },
            recentInquiries
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
