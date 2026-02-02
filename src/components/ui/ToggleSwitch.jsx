import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors">
                <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-6' : 'translate-x-0'
                        }`}
                >
                    {isDark ? (
                        <FiMoon className="w-3 h-3 text-gray-700" />
                    ) : (
                        <FiSun className="w-3 h-3 text-yellow-500" />
                    )}
                </div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
                {isDark ? 'Dark' : 'Light'}
            </span>
        </button>
    );
};

export default ToggleSwitch;
