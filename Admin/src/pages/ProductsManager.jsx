import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Plus, Trash2, Edit2, Image, Package } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '', price: '', capacity: '', category_id: '', image_url: '', tag: '', description: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch products');
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categories');
            setCategories(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                toast.success('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simplified features for now
            const payload = { ...formData, features: [] };
            await axios.post('http://localhost:5000/api/products', payload);
            toast.success('Product added successfully');
            setShowModal(false);
            fetchProducts();
            setFormData({ title: '', price: '', capacity: '', category_id: '', image_url: '', tag: '', description: '' });
        } catch (error) {
            toast.error('Failed to add product');
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Products</h2>
                    <p className="text-text-muted">Manage your solar packages and equipment</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-background)] px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            {/* Table */}
            <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[var(--color-background)] border-b border-border">
                        <tr>
                            <th className="p-5 font-semibold text-text-muted">Image</th>
                            <th className="p-5 font-semibold text-text-muted">Title</th>
                            <th className="p-5 font-semibold text-text-muted">Category</th>
                            <th className="p-5 font-semibold text-text-muted">Price</th>
                            <th className="p-5 font-semibold text-text-muted">Capacity</th>
                            <th className="p-5 text-right font-semibold text-text-muted">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.length === 0 ? (
                            <tr><td colSpan="6" className="p-8 text-center text-text-muted">No products found. Add one to get started.</td></tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id} className="hover:bg-[var(--color-background)]/50 transition-colors">
                                    <td className="p-5">
                                        <div className="w-12 h-12 bg-[var(--color-background)] border border-border rounded-xl flex items-center justify-center overflow-hidden">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                            ) : <Package size={20} className="text-text-muted" />}
                                        </div>
                                    </td>
                                    <td className="p-5 font-medium text-text-main">{product.title}</td>
                                    <td className="p-5 text-text-muted">{product.category_name || '-'}</td>
                                    <td className="p-5 text-text-main font-semibold">₹{product.price}</td>
                                    <td className="p-5 text-text-muted">
                                        <span className="bg-[var(--color-background)] border border-border text-text-muted px-2 py-1 rounded-md text-sm">
                                            {product.capacity}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right flex justify-end items-center h-full pt-8">
                                        <button className="text-blue-500 hover:text-blue-600 mx-1 p-2 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-600 mx-1 p-2 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
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
                    <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-in fade-in zoom-in duration-200 no-scrollbar max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-border flex justify-between items-center bg-[var(--color-background)] sticky top-0 z-10">
                            <h3 className="text-xl font-bold text-text-main">Add New Product</h3>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-main transition-colors text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Product Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    value={formData.title}
                                    placeholder="e.g. 5kW Hybrid System"
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                        value={formData.price}
                                        placeholder="0.00"
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-2">Capacity</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. 5kW"
                                        value={formData.capacity}
                                        onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Category</label>
                                <select
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all appearance-none"
                                    value={formData.category_id}
                                    onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Image URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                        placeholder="https://..."
                                        value={formData.image_url}
                                        onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Description</label>
                                <textarea
                                    className="w-full bg-[var(--color-background)] border border-border rounded-xl px-4 py-3 text-text-main focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                    rows="3"
                                    placeholder="Product details..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex gap-3 justify-end pt-4 border-t border-border mt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-text-muted hover:bg-[var(--color-background)] rounded-xl transition-colors font-medium">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02] font-medium">Create Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ProductsManager;
