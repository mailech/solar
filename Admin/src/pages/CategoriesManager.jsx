import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';

const CategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categories');
            setCategories(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure? Deleting a category usually requires removing its products first.')) {
            try {
                await axios.delete(`http://localhost:5000/api/categories/${id}`);
                toast.success('Category deleted');
                fetchCategories();
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/categories', formData);
            toast.success('Category added');
            setShowModal(false);
            fetchCategories();
            setFormData({ name: '', description: '' });
        } catch (error) {
            toast.error('Failed to add category');
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Categories</h2>
                    <p className="text-text-muted">Organize your products</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-background)] px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                    <Plus size={20} /> Add Category
                </button>
            </div>

            <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[var(--color-background)] border-b border-border">
                        <tr>
                            <th className="p-5 font-semibold text-text-muted">ID</th>
                            <th className="p-5 font-semibold text-text-muted">Name</th>
                            <th className="p-5 font-semibold text-text-muted">Description</th>
                            <th className="p-5 text-right font-semibold text-text-muted">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {categories.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-text-muted">No categories found.</td></tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat.id} className="hover:bg-[var(--color-background)]/50 transition-colors">
                                    <td className="p-5 text-text-muted text-sm">#{cat.id.substring(0, 6)}...</td>
                                    <td className="p-5 font-medium text-text-main">{cat.name}</td>
                                    <td className="p-5 text-text-muted">{cat.description}</td>
                                    <td className="p-5 text-right flex justify-end">
                                        <button className="text-blue-500 hover:text-blue-600 mx-1 p-2 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-600 mx-1 p-2 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
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
                    <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-border flex justify-between items-center bg-[var(--color-background)]">
                            <h3 className="text-xl font-bold text-text-main">Add Category</h3>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-main transition-colors text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    value={formData.name}
                                    placeholder="e.g. Solar Panels"
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Description</label>
                                <textarea
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    rows="3"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex gap-3 justify-end pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-text-muted hover:bg-[var(--color-background)] rounded-xl transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02] font-medium">Create Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default CategoriesManager;
