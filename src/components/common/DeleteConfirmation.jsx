import React from 'react';
import Modal from './Modal';
import { FiAlertTriangle } from 'react-icons/fi';

/**
 * Delete Confirmation Modal Component
 * 
 * This component shows a confirmation dialog before deleting an item.
 * It helps prevent accidental deletions.
 * 
 * PROPS:
 * - isOpen: boolean - Controls whether modal is visible
 * - onClose: function - Called when user clicks cancel
 * - onConfirm: function - Called when user confirms deletion
 * - title: string - Title of the item being deleted
 * - message: string (optional) - Custom confirmation message
 * - isDeleting: boolean (optional) - Shows loading state on confirm button
 */
const DeleteConfirmation = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message = 'Are you sure you want to delete this item? This action cannot be undone.',
    isDeleting = false
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Deletion"
            size="sm"
            footer={
                <>
                    {/* Cancel Button */}
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    {/* Delete/Confirm Button */}
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </>
            }
        >
            {/* Warning Icon */}
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <FiAlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                {/* Message Content */}
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        {message}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmation;
