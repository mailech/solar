import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Mail, Calendar, User, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/contact');
            setInquiries(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch inquiries');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await axios.delete(`http://localhost:5000/api/contact/${id}`);
                toast.success('Inquiry deleted');
                fetchInquiries();
            } catch (error) {
                toast.error('Failed to delete inquiry');
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <Layout>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-main">Inquiries</h2>
                <p className="text-text-muted">View messages from users</p>
            </div>

            <div className="space-y-4">
                {inquiries.length === 0 ? (
                    <div className="bg-surface p-12 rounded-2xl shadow-sm border border-border text-center text-text-muted">
                        No inquiries found yet.
                    </div>
                ) : (
                    inquiries.map(inquiry => (
                        <div key={inquiry.id} className="bg-surface p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center border border-blue-500/10">
                                        <User size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-text-main">{inquiry.name}</h4>
                                        <div className="flex items-center text-sm text-text-muted gap-3 mt-0.5">
                                            <span className="flex items-center gap-1.5"><Mail size={14} /> {inquiry.email}</span>
                                            {inquiry.phone && <span className="text-text-muted/50">•</span>}
                                            {inquiry.phone && <span>{inquiry.phone}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xs font-medium text-text-muted bg-[var(--color-background)] px-2 py-1 rounded-md border border-border flex items-center gap-1.5">
                                        <Calendar size={12} /> {formatDate(inquiry.createdAt)}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(inquiry.id)}
                                        className="text-red-400 hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete Inquiry"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="ml-16 pl-4 border-l-2 border-border/60">
                                {inquiry.service_interest && (
                                    <div className="mb-2">
                                        <span className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider bg-[var(--color-secondary)]/10 px-2 py-0.5 rounded">
                                            {inquiry.service_interest}
                                        </span>
                                    </div>
                                )}
                                <p className="text-text-muted leading-relaxed">{inquiry.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
};

export default Inquiries;
