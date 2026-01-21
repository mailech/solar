import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Plus, Trash2, Edit2, Folder, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '', location: '', capacity: '', image_url: '', description: '', category: 'Residential'
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch projects');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`http://localhost:5000/api/projects/${id}`);
                toast.success('Project deleted');
                fetchProjects();
            } catch (error) {
                toast.error('Failed to delete project');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use FormData if you want to support file uploads later, currently JSON with image URL
            // If the backend expects multipart/form-data for file upload, we need to adjust.
            // Based on my controller update, I allowed standard JSON for 'image_url' string or file.
            // If frontend sends only text fields for now, axios.post JSON is fine.
            await axios.post('http://localhost:5000/api/projects', formData);
            toast.success('Project added');
            setShowModal(false);
            fetchProjects();
            setFormData({ title: '', location: '', capacity: '', image_url: '', description: '', category: 'Residential' });
        } catch (error) {
            toast.error('Failed to add project');
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Projects</h2>
                    <p className="text-text-muted">Showcase your successful installations</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-background)] px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                    <Plus size={20} /> Add Project
                </button>
            </div>

            <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[var(--color-background)] border-b border-border">
                        <tr>
                            <th className="p-5 font-semibold text-text-muted">Preview</th>
                            <th className="p-5 font-semibold text-text-muted">Title</th>
                            <th className="p-5 font-semibold text-text-muted">Location</th>
                            <th className="p-5 font-semibold text-text-muted">System Size</th>
                            <th className="p-5 font-semibold text-text-muted">Type</th>
                            <th className="p-5 text-right font-semibold text-text-muted">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {projects.length === 0 ? (
                            <tr><td colSpan="6" className="p-8 text-center text-text-muted">No projects found.</td></tr>
                        ) : (
                            projects.map(project => (
                                <tr key={project.id} className="hover:bg-[var(--color-background)]/50 transition-colors">
                                    <td className="p-5">
                                        <div className="w-16 h-12 bg-[var(--color-background)] border border-border rounded-lg overflow-hidden flex items-center justify-center">
                                            {project.image_url ? (
                                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                            ) : <Folder size={20} className="text-text-muted opacity-50" />}
                                        </div>
                                    </td>
                                    <td className="p-5 font-medium text-text-main">{project.title}</td>
                                    <td className="p-5 text-text-muted flex items-center gap-1">
                                        <MapPin size={14} /> {project.location}
                                    </td>
                                    <td className="p-5 text-text-main">{project.system_size || project.capacity}</td>
                                    <td className="p-5 text-text-muted">
                                        <span className="bg-[var(--color-background)] border border-border px-2 py-1 rounded text-xs uppercase tracking-wide">
                                            {project.type || project.category}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right flex justify-end items-center h-full pt-8">
                                        <button className="text-blue-500 hover:text-blue-600 mx-1 p-2 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-600 mx-1 p-2 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-border animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-border flex justify-between items-center bg-[var(--color-background)]">
                            <h3 className="text-xl font-bold text-text-main">Add Project</h3>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-main transition-colors text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    value={formData.title}
                                    placeholder="e.g. Villa Solar Installation"
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Location</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">System Size</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                        value={formData.capacity}
                                        placeholder="10kW"
                                        onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Project Type</label>
                                <select
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    value={formData.image_url}
                                    placeholder="https://..."
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Description</label>
                                <textarea
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    rows="2"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex gap-3 justify-end pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-text-muted hover:bg-[var(--color-background)] rounded-xl transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02] font-medium">Create Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ProjectsManager;
