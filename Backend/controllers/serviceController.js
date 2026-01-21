const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error fetching services'
        });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error fetching service'
        });
    }
};

exports.createService = async (req, res) => {
    const { title, description, icon, category, link } = req.body;
    try {
        const service = await Service.create({
            title, description, icon, category, link
        });
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Service deleted' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
