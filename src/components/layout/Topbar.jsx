import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ title = 'Dashboard' }) => {
    const navigate = useNavigate();
    
    return (
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
            style={{
                height: 'var(--topbar-height)',
                zIndex: 10
            }}>
            <div className="flex items-center justify-between h-full px-8" style={{ marginLeft: 'var(--sidebar-width)' }}>
                {/* Page Title */}
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h1>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    
                    {/* User Profile */}
                    <button 
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1.5 transition-colors"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">PM</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
