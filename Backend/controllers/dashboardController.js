const Product = require('../models/Product');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');
const Category = require('../models/Category');

exports.getDashboardStats = async (req, res) => {
    try {
        const [
            productCount,
            serviceCount,
            projectCount,
            inquiryCount,
            categoryCount
        ] = await Promise.all([
            Product.countDocuments(),
            Service.countDocuments(),
            Project.countDocuments(),
            Inquiry.countDocuments(),
            Category.countDocuments()
        ]);

        const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            counts: {
                products: productCount,
                services: serviceCount,
                projects: projectCount,
                inquiries: inquiryCount,
                categories: categoryCount
            },
            recentInquiries
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
