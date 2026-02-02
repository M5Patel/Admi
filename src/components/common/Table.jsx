import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

/**
 * Reusable Table Component
 * 
 * This component displays data in a table format with action buttons.
 * It includes hover effects, responsive design, and empty state handling.
 * 
 * PROPS:
 * - columns: array - Array of column definitions: [{key: 'name', label: 'Name', render: (optional) function}]
 * - data: array - Array of data objects to display
 * - onEdit: function - Called when edit button is clicked, receives row data
 * - onDelete: function - Called when delete button is clicked, receives row data
 * - emptyMessage: string (optional) - Message shown when no data
 */
const Table = ({ 
    columns = [], 
    data = [], 
    onEdit, 
    onDelete,
    emptyMessage = 'No data available'
}) => {
    // If no data, show empty state
    if (data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            <table className="w-full">
                {/* Table Header */}
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                        {/* Render column headers */}
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {/* Actions column header */}
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                            {/* Render each column cell */}
                            {columns.map((column, colIndex) => (
                                <td 
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                                >
                                    {/* If column has custom render function, use it. Otherwise, show value directly */}
                                    {column.render 
                                        ? column.render(row[column.key], row) 
                                        : row[column.key]
                                    }
                                </td>
                            ))}

                            {/* Action Buttons */}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-2">
                                    {/* Edit Button */}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                    )}

                                    {/* Delete Button */}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
