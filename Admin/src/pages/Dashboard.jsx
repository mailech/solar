import React from 'react';
import Layout from '../components/Layout';
import { Package, Folder, MessageSquare, Users } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-surface p-6 rounded-xl shadow-sm border border-border flex items-center gap-4 hover:border-border-hover transition-all duration-300">
        <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
            {/* Note: In tailwind v4 we might need exact colors or just use style if dynamic classes perform odd */}
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-text-muted font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-text-main">{value}</h3>
        </div>
    </div>
);

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Package, Folder, MessageSquare, Users, Layers, AlertCircle } from 'lucide-react';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-surface p-6 rounded-xl shadow-sm border border-border flex items-center gap-4 hover:border-border-hover transition-all duration-300">
        <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-text-muted font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-text-main">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        services: 0,
        projects: 0,
        inquiries: 0,
        categories: 0
    });
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/dashboard/stats`);
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                setStats(data.counts);
                setRecentInquiries(data.recentInquiries || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-full text-red-500">
                    <AlertCircle size={48} className="mb-4" />
                    <p>Error loading dashboard: {error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <StatCard
                    title="Total Projects"
                    value={stats.projects}
                    icon={Folder}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Active Products"
                    value={stats.products}
                    icon={Package}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Services"
                    value={stats.services}
                    icon={Layers}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Categories"
                    value={stats.categories}
                    icon={Users}
                    color="bg-pink-500"
                />
                <StatCard
                    title="Inquiries"
                    value={stats.inquiries}
                    icon={MessageSquare}
                    color="bg-amber-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries Widget */}
                <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
                    <h3 className="text-lg font-bold text-text-main mb-4">Recent Inquiries</h3>
                    {recentInquiries.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-text-muted">
                            <MessageSquare size={24} className="opacity-50 mb-2" />
                            <span>No recent messages</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentInquiries.map((inquiry) => (
                                <div key={inquiry._id} className="flex justify-between items-start border-b border-border pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-semibold text-text-main">{inquiry.fullName}</p>
                                        <p className="text-sm text-text-muted truncate max-w-[200px]">{inquiry.subject}</p>
                                    </div>
                                    <span className="text-xs text-text-muted bg-background px-2 py-1 rounded">
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Placeholder Chart / Summary */}
                <div className="bg-surface p-6 rounded-xl shadow-sm border border-border flex flex-col items-center justify-center text-text-muted">
                    <div className="p-4 bg-background rounded-full mb-3">
                        <Folder size={24} className="opacity-50" />
                    </div>
                    <span>Data Overview (More charts coming soon)</span>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
