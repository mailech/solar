const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            data: projects
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
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({
            success: true,
            data: project
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
        // Map category to 'type' if needed, or stick to the schema
        const project = await Project.create({
            title, location, system_size: capacity, // Mapping capacity to system_size as per schema
            type: category || 'Residential', // Default to Residential if not provided
            image_url: image_url || '',
            description
            // Note: co2_offset and homes_powered are not in the Project Schema I created, 
            // I should update the schema if these fields are critical, or just not save them for now.
            // For now, I will save only what is in schema + strict mode will ignore others unless I add them.
        });

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
