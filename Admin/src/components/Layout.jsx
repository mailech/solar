import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Folder, MessageSquare, LogOut, Sun, Moon, List } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeContext';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/services', icon: Sun, label: 'Services' },
        { path: '/projects', icon: Folder, label: 'Projects' },
        { path: '/products', icon: ShoppingBag, label: 'Products' },
        { path: '/categories', icon: List, label: 'Categories' },
        { path: '/inquiries', icon: MessageSquare, label: 'Inquiries' },
    ];

    return (
        <div
            style={{
                backgroundColor: 'var(--sidebar-bg)',
                borderColor: 'var(--sidebar-border)'
            }}
            className="w-64 h-screen fixed left-0 top-0 flex flex-col z-20 border-r shadow-xl backdrop-blur-xl transition-theme"
        >
            <div className="p-8 flex items-center justify-center border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
                <Link to="/" className="flex items-center gap-3 no-underline px-2">
                    {/* Logo Icon */}
                    <img src={logo} alt="meraSolar" className="w-10 h-10 object-contain rounded-lg" />

                    {/* Text Mark */}
                    <div className="flex flex-col leading-none">
                        <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-main)' }}>
                            mera<span className="text-[var(--color-secondary)]">Solar</span>
                        </span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-l-2 border-[var(--color-secondary)]'
                                : 'text-[var(--color-text-muted)] hover:bg-[var(--color-text-main)]/5 hover:text-[var(--color-text-main)]'
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={isActive ? "drop-shadow-[0_0_8px_rgba(0,208,132,0.5)]" : "group-hover:text-[var(--color-text-main)] transition-colors"}
                            />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
                <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen transition-theme" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)' }}>
            <Sidebar />
            <div className="ml-64 p-8">
                <header
                    className="mb-8 flex justify-between items-center backdrop-blur-md p-4 rounded-2xl border sticky top-4 z-10 shadow-sm transition-theme"
                    style={{
                        backgroundColor: 'var(--sidebar-bg)', // Consistent with sidebar
                        borderColor: 'var(--color-border)'
                    }}
                >
                    <div>
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-main)' }}>Overview</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Welcome back, Admin</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-[var(--color-text-main)]/5 transition-colors"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D084] to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                            A
                        </div>
                    </div>
                </header>
                <main>{children}</main>
            </div>
            <ToastContainer position="bottom-right" theme={isDarkMode ? "dark" : "light"} />
        </div>
    );
};

export default Layout;
