const { mysqlPool } = require('../config/db');

exports.getAllServices = async (req, res) => {
    try {
        const [rows] = await mysqlPool.execute('SELECT * FROM services');
        res.status(200).json({
            success: true,
            data: rows
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
        const [rows] = await mysqlPool.execute('SELECT * FROM services WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({
            success: true,
            data: rows[0]
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
        const [result] = await mysqlPool.execute(
            'INSERT INTO services (title, description, icon, category, link) VALUES (?, ?, ?, ?, ?)',
            [title, description, icon, category, link]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, title, description, icon, category, link } });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await mysqlPool.execute('DELETE FROM services WHERE id = ?', [req.params.id]);
        res.status(200).json({ success: true, message: 'Service deleted' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
