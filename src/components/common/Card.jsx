import React from 'react';

const Card = ({ children, className = '', hover = false, padding = 'default' }) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`card ${paddingClasses[padding]} ${hover ? 'hover:shadow-card-hover cursor-pointer' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
