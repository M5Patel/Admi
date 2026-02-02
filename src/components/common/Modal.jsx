import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Reusable Modal Component
 * 
 * A modal is a dialog box that appears on top of the page content.
 * It's used for forms, confirmations, and displaying additional information.
 * 
 * PROPS:
 * - isOpen: boolean - Controls whether modal is visible or hidden
 * - onClose: function - Called when user clicks close button or backdrop
 * - title: string - The title shown at the top of the modal
 * - children: React nodes - The content inside the modal
 * - footer: React nodes (optional) - Buttons/actions at the bottom of modal
 * - size: string (optional) - 'sm', 'md', 'lg', 'xl' - Controls modal width
 */
const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    footer,
    size = 'md' // Default size is medium
}) => {
    // KEYBOARD SUPPORT: Close modal when user presses Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        // Add event listener when modal opens
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        // Cleanup: Remove event listener when modal closes
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    // Define modal width based on size prop
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        // Fixed overlay that covers entire screen
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop - semi-transparent background */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose} // Close modal when clicking outside
            />

            {/* Modal Container - centers the modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Modal Content */}
                <div 
                    className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all w-full ${sizeClasses[size]}`}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="Close modal"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal Body - Content goes here */}
                    <div className="p-6">
                        {children}
                    </div>

                    {/* Modal Footer (optional) - Usually contains action buttons */}
                    {footer && (
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
