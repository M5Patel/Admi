import React from 'react';

/**
 * Reusable Form Input Component
 * 
 * This component handles different types of form inputs (text, email, number, etc.)
 * with consistent styling and theme support.
 * 
 * PROPS:
 * - label: string - The label text above the input
 * - type: string - Input type: 'text', 'email', 'number', 'tel', 'date', 'textarea', 'select'
 * - name: string - The input name (used for form handling)
 * - value: any - The current value of the input
 * - onChange: function - Called when input value changes
 * - placeholder: string (optional) - Placeholder text
 * - required: boolean (optional) - Whether field is required
 * - options: array (optional) - For 'select' type: [{value: '', label: ''}]
 * - rows: number (optional) - For 'textarea' type: number of rows
 * - min: number (optional) - For 'number' type: minimum value
 * - max: number (optional) - For 'number' type: maximum value
 * - step: number (optional) - For 'number' type: step value
 */
const FormInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder = '',
    required = false,
    options = [],
    rows = 4,
    min,
    max,
    step = 'any',
    disabled = false
}) => {
    // Base CSS classes for all input types
    const baseInputClasses = `
        w-full px-4 py-2 
        bg-gray-50 dark:bg-gray-700 
        border border-gray-200 dark:border-gray-600 
        rounded-lg 
        text-gray-900 dark:text-white 
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200
    `;

    // Render different input types based on 'type' prop
    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        rows={rows}
                        disabled={disabled}
                        className={`${baseInputClasses} resize-none`}
                    />
                );

            case 'select':
                return (
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        className={baseInputClasses}
                    >
                        <option value="">{placeholder || 'Select an option'}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'number':
                return (
                    <input
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                        className={baseInputClasses}
                    />
                );

            default: // text, email, tel, date, etc.
                return (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        className={baseInputClasses}
                    />
                );
        }
    };

    return (
        <div className="w-full">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {/* Input Field */}
            {renderInput()}
        </div>
    );
};

export default FormInput;
