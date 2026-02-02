import React from 'react';

const ProgressBar = ({ value, color = 'primary', showLabel = false, height = 'md' }) => {
    const heightClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    const colorClasses = {
        primary: 'bg-primary-600',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
        purple: 'bg-purple-600',
        blue: 'bg-blue-600',
    };

    return (
        <div className="w-full">
            <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heightClasses[height]}`}>
                <div
                    className={`${heightClasses[height]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
            {showLabel && (
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
                    {value}%
                </span>
            )}
        </div>
    );
};

export default ProgressBar;
