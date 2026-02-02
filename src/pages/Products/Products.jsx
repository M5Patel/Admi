import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import DeleteConfirmation from '../../components/common/DeleteConfirmation';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageHelper';

/**
 * Products Page - Complete CRUD Operations
 * 
 * This page manages products with full Create, Read, Update, Delete functionality.
 * All data is stored in localStorage and persists across page refreshes.
 * 
 * FEATURES:
 * - Add new products
 * - Edit existing products
 * - Delete products with confirmation
 * - Search/filter products
 * - Auto-load data from localStorage
 */

// Initial sample products - used only if localStorage is empty
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 79.99,
        stock: 45,
        status: 'In Stock',
        dateAdded: '2026-01-15'
    },
    {
        id: 2,
        name: 'Smart Watch',
        category: 'Electronics',
        price: 199.99,
        stock: 0,
        status: 'Out of Stock',
        dateAdded: '2026-01-20'
    },
    {
        id: 3,
        name: 'Coffee Maker',
        category: 'Home Appliances',
        price: 89.99,
        stock: 23,
        status: 'In Stock',
        dateAdded: '2026-01-25'
    }
];

const Products = () => {
    // STATE MANAGEMENT
    // ===============

    // Products list - loaded from localStorage or INITIAL_PRODUCTS
    const [products, setProducts] = useState(() => {
        return getFromLocalStorage('products', INITIAL_PRODUCTS);
    });

    // Search query for filtering products
    const [searchQuery, setSearchQuery] = useState('');

    // Modal state for Add/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Form data for add/edit
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'In Stock',
        dateAdded: new Date().toISOString().split('T')[0]
    });

    // PERSISTENCE: Save to localStorage whenever products change
    useEffect(() => {
        saveToLocalStorage('products', products);
    }, [products]);

    // TABLE COLUMNS CONFIGURATION
    // ==========================
    const columns = [
        { 
            key: 'name', 
            label: 'Product Name' 
        },
        { 
            key: 'category', 
            label: 'Category' 
        },
        { 
            key: 'price', 
            label: 'Price',
            // Custom render function to format price
            render: (value) => `$${parseFloat(value).toFixed(2)}`
        },
        { 
            key: 'stock', 
            label: 'Stock',
            // Custom render for stock with color coding
            render: (value) => (
                <span className={value > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {value}
                </span>
            )
        },
        { 
            key: 'status', 
            label: 'Status',
            // Custom render for status badge
            render: (value) => (
                <span className={`badge ${value === 'In Stock' ? 'badge-success' : 'badge-danger'}`}>
                    {value}
                </span>
            )
        }
    ];

    // FILTERING: Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // CRUD OPERATIONS
    // ==============

    // OPEN ADD MODAL
    const handleAddNew = () => {
        setIsEditMode(false);
        setFormData({
            name: '',
            category: '',
            price: '',
            stock: '',
            status: 'In Stock',
            dateAdded: new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    // OPEN EDIT MODAL
    const handleEdit = (product) => {
        setIsEditMode(true);
        setFormData(product);
        setIsModalOpen(true);
    };

    // OPEN DELETE CONFIRMATION
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    // CONFIRM DELETE
    const handleDeleteConfirm = () => {
        // Filter out the product to delete
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    // HANDLE FORM INPUT CHANGES
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-update status based on stock
        if (name === 'stock') {
            setFormData(prev => ({
                ...prev,
                status: parseInt(value) > 0 ? 'In Stock' : 'Out of Stock'
            }));
        }
    };

    // SAVE PRODUCT (Add or Edit)
    const handleSave = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // UPDATE existing product
            setProducts(products.map(p => 
                p.id === formData.id ? formData : p
            ));
        } else {
            // ADD new product
            const newProduct = {
                ...formData,
                id: Date.now(), // Simple ID generation using timestamp
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            };
            setProducts([...products, newProduct]);
        }

        // Close modal and reset form
        setIsModalOpen(false);
        setFormData({
            name: '',
            category: '',
            price: '',
            stock: '',
            status: 'In Stock',
            dateAdded: new Date().toISOString().split('T')[0]
        });
    };

    // RENDER
    // ======
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your product inventory
                    </p>
                </div>
                {/* Add Product Button */}
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="card p-4">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {/* Products Table */}
            <Table
                columns={columns}
                data={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                emptyMessage="No products found. Click 'Add Product' to create one."
            />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Product' : 'Add New Product'}
                footer={
                    <>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                        >
                            {isEditMode ? 'Update' : 'Add'} Product
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <FormInput
                        label="Product Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                    />

                    <FormInput
                        label="Category"
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g., Electronics, Clothing"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            label="Price ($)"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />

                        <FormInput
                            label="Stock Quantity"
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>

                    <FormInput
                        label="Status"
                        type="select"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        options={[
                            { value: 'In Stock', label: 'In Stock' },
                            { value: 'Out of Stock', label: 'Out of Stock' }
                        ]}
                        required
                    />
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={`Delete "${productToDelete?.name}"?`}
                message="This product will be permanently removed from your inventory."
            />
        </div>
    );
};

export default Products;
