import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FiGrid,
    FiShoppingCart,
    FiPackage,
    FiUsers,
    FiHelpCircle,
    FiSettings,
    FiLogOut,
    FiFileText
} from 'react-icons/fi';
import ToggleSwitch from '../ui/ToggleSwitch';

const Sidebar = () => {
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    const navItems = [  
        { name: 'Dashboard', icon: FiGrid, path: '/' },
        { name: 'Orders', icon: FiShoppingCart, path: '/orders' },
        { name: 'Products', icon: FiPackage, path: '/products' },
        { name: 'Customers', icon: FiUsers, path: '/customers' },
        { name: 'Get Help', icon: FiHelpCircle, path: '/help' },
        { name: 'Settings', icon: FiSettings, path: '/settings' },
    ];

    const bottomItems = [
        { name: 'Log out', icon: FiLogOut, path: '/logout' },
        { name: 'Report', icon: FiFileText, path: '/report' },
    ];

    // Navigate to Dashboard when logo is clicked
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300"
            style={{ width: 'var(--sidebar-width)', zIndex: 50 }}>
            <div className="flex flex-col h-full">
                {/* LOGO HEADER - Now clickable and navigates to Dashboard */}
                <div 
                    onClick={handleLogoClick}
                    className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer group transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-750"
                    style={{ 
                        height: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '0 24px'
                    }}
                >
                    {/* Logo Box with hover animation */}
                    <div 
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                            flexShrink: 0,
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        className="group-hover:transform group-hover:scale-110 group-hover:shadow-lg"
                    >
                        <span style={{ 
                            color: '#ffffff', 
                            fontWeight: '700', 
                            fontSize: '20px',
                            fontFamily: 'Inter, sans-serif'
                        }}>W</span>
                    </div>
                    
                    {/* Brand Name */}
                    <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" style={{ 
                        fontFamily: 'Inter, sans-serif'
                    }}>WiseWay</span>
                </div>
                
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm">{item.name}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <ul className="space-y-1">
                            {bottomItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.path}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200"
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm">{item.name}</span>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                {/* Theme Toggle */}
                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    <ToggleSwitch />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
