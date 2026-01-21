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

const Dashboard = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Projects"
                    value="12"
                    icon={Folder}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Active Products"
                    value="24"
                    icon={Package}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="New Inquiries"
                    value="5"
                    icon={MessageSquare}
                    color="bg-amber-500"
                />
                <StatCard
                    title="Total Services"
                    value="8"
                    icon={Users}
                    color="bg-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-xl shadow-sm border border-border h-64 flex flex-col items-center justify-center text-text-muted">
                    <div className="p-4 bg-background rounded-full mb-3">
                        <Package size={24} className="opacity-50" />
                    </div>
                    <span>No Recent Activity</span>
                </div>
                <div className="bg-surface p-6 rounded-xl shadow-sm border border-border h-64 flex flex-col items-center justify-center text-text-muted">
                    <div className="p-4 bg-background rounded-full mb-3">
                        <Folder size={24} className="opacity-50" />
                    </div>
                    <span>Project Overview Chart (Empty)</span>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
