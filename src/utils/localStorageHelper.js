/**
 * LocalStorage Helper Utilities
 * 
 * This file contains helper functions to interact with browser's localStorage.
 * localStorage is used to store data that persists even after the browser is closed.
 * 
 * BEGINNER TIP: localStorage can only store strings, so we use JSON.stringify() 
 * to convert objects/arrays to strings, and JSON.parse() to convert them back.
 */

/**
 * Get data from localStorage
 * 
 * @param {string} key - The key to retrieve data from localStorage
 * @param {*} defaultValue - Default value to return if key doesn't exist or error occurs
 * @returns {*} The parsed data from localStorage or defaultValue
 * 
 * EXAMPLE:
 * const products = getFromLocalStorage('products', []);
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
        // Get the item from localStorage
        const item = localStorage.getItem(key);
        
        // If item exists, parse it from JSON string to JavaScript object/array
        // If item is null (doesn't exist), return the default value
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        // If any error occurs (like invalid JSON), log it and return default value
        console.error(`Error reading from localStorage key "${key}":`, error);
        return defaultValue;
    }
};

/**
 * Save data to localStorage
 * 
 * @param {string} key - The key to store data under
 * @param {*} data - The data to store (will be converted to JSON string)
 * @returns {boolean} True if successful, false if error occurred
 * 
 * EXAMPLE:
 * saveToLocalStorage('products', productsArray);
 */
export const saveToLocalStorage = (key, data) => {
    try {
        // Convert the data to a JSON string and save it to localStorage
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        // If any error occurs (like quota exceeded), log it and return false
        console.error(`Error saving to localStorage key "${key}":`, error);
        return false;
    }
};

/**
 * Remove data from localStorage
 * 
 * @param {string} key - The key to remove from localStorage
 * @returns {boolean} True if successful, false if error occurred
 * 
 * EXAMPLE:
 * removeFromLocalStorage('products');
 */
export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage key "${key}":`, error);
        return false;
    }
};

/**
 * Clear all data from localStorage
 * USE WITH CAUTION: This will remove ALL localStorage data
 */
export const clearAllLocalStorage = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};
