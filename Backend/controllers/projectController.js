const { mysqlPool } = require('../config/db');

exports.getAllProjects = async (req, res) => {
    try {
        const [rows] = await mysqlPool.execute('SELECT * FROM projects');
        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error fetching projects'
        });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const [rows] = await mysqlPool.execute('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error fetching project'
        });
    }
};

exports.createProject = async (req, res) => {
    const { title, location, category, capacity, completion_date, description, co2_offset, homes_powered } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Map fields to match schema.sql structure
        // Schema has: title, location, category, capacity, completion_date, image_url, description, co2_offset, homes_powered
        const sql = `INSERT INTO projects (title, location, category, capacity, completion_date, image_url, description, co2_offset, homes_powered) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await mysqlPool.execute(sql, [
            title,
            location,
            category || 'Residential',
            capacity,
            completion_date,
            image_url,
            description,
            co2_offset,
            homes_powered
        ]);

        const newProject = {
            id: result.insertId, title, location, category, capacity, completion_date, image_url, description, co2_offset, homes_powered
        };

        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await mysqlPool.execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
