import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import DeleteConfirmation from '../../components/common/DeleteConfirmation';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageHelper';

/**
 * Customers Page - Complete CRUD Operations
 * 
 * This page manages customers with full Create, Read, Update, Delete functionality.
 * All data is stored in localStorage and persists across page refreshes.
 * 
 * FEATURES:
 * - Add new customers
 * - Edit existing customers
 * - Delete customers with confirmation
 * - Search customers by name/email
 * - Auto-load data from localStorage
 */

// Initial sample customers - used only if localStorage is empty
const INITIAL_CUSTOMERS = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234-567-8901',
        location: 'New York, USA',
        totalOrders: 12,
        status: 'Active',
        joinedDate: '2025-06-15'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 234-567-8902',
        location: 'Los Angeles, USA',
        totalOrders: 8,
        status: 'Active',
        joinedDate: '2025-08-20'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.j@email.com',
        phone: '+1 234-567-8903',
        location: 'Chicago, USA',
        totalOrders: 0,
        status: 'Inactive',
        joinedDate: '2025-12-10'
    }
];

const Customers = () => {
    // STATE MANAGEMENT
    // ===============

    // Customers list - loaded from localStorage or INITIAL_CUSTOMERS
    const [customers, setCustomers] = useState(() => {
        return getFromLocalStorage('customers', INITIAL_CUSTOMERS);
    });

    // Search query for filtering customers
    const [searchQuery, setSearchQuery] = useState('');

    // Modal state for Add/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    // Form data for add/edit
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        totalOrders: 0,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0]
    });

    // PERSISTENCE: Save to localStorage whenever customers change
    useEffect(() => {
        saveToLocalStorage('customers', customers);
    }, [customers]);

    // TABLE COLUMNS CONFIGURATION
    // ==========================
    const columns = [
        { 
            key: 'name', 
            label: 'Customer Name' 
        },
        { 
            key: 'email', 
            label: 'Email' 
        },
        { 
            key: 'phone', 
            label: 'Phone' 
        },
        { 
            key: 'location', 
            label: 'Location' 
        },
        { 
            key: 'totalOrders', 
            label: 'Orders',
            render: (value) => (
                <span className={value > 0 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500'}>
                    {value}
                </span>
            )
        },
        { 
            key: 'status', 
            label: 'Status',
            render: (value) => (
                <span className={`badge ${value === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                    {value}
                </span>
            )
        }
    ];

    // FILTERING: Filter customers based on search query
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // CRUD OPERATIONS
    // ==============

    // OPEN ADD MODAL
    const handleAddNew = () => {
        setIsEditMode(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            location: '',
            totalOrders: 0,
            status: 'Active',
            joinedDate: new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    // OPEN EDIT MODAL
    const handleEdit = (customer) => {
        setIsEditMode(true);
        setFormData(customer);
        setIsModalOpen(true);
    };

    // OPEN DELETE CONFIRMATION
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setIsDeleteModalOpen(true);
    };

    // CONFIRM DELETE
    const handleDeleteConfirm = () => {
        setCustomers(customers.filter(c => c.id !== customerToDelete.id));
        setIsDeleteModalOpen(false);
        setCustomerToDelete(null);
    };

    // HANDLE FORM INPUT CHANGES
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // SAVE CUSTOMER (Add or Edit)
    const handleSave = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // UPDATE existing customer
            setCustomers(customers.map(c => 
                c.id === formData.id ? formData : c
            ));
        } else {
            // ADD new customer
            const newCustomer = {
                ...formData,
                id: Date.now(),
                totalOrders: parseInt(formData.totalOrders)
            };
            setCustomers([...customers, newCustomer]);
        }

        // Close modal and reset form
        setIsModalOpen(false);
    };

    // RENDER
    // ======
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your customer database
                    </p>
                </div>
                {/* Add Customer Button */}
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    Add Customer
                </button>
            </div>

            {/* Search Bar */}
            <div className="card p-4">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search customers by name, email, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {/* Customers Table */}
            <Table
                columns={columns}
                data={filteredCustomers}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                emptyMessage="No customers found. Click 'Add Customer' to create one."
            />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Customer' : 'Add New Customer'}
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
                            {isEditMode ? 'Update' : 'Add'} Customer
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter customer name"
                        required
                    />

                    <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="customer@email.com"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 234-567-8900"
                            required
                        />

                        <FormInput
                            label="Total Orders"
                            type="number"
                            name="totalOrders"
                            value={formData.totalOrders}
                            onChange={handleInputChange}
                            min="0"
                            required
                        />
                    </div>

                    <FormInput
                        label="Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            label="Status"
                            type="select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                            required
                        />

                        <FormInput
                            label="Joined Date"
                            type="date"
                            name="joinedDate"
                            value={formData.joinedDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={`Delete "${customerToDelete?.name}"?`}
                message="This customer and all associated data will be permanently removed."
            />
        </div>
    );
};

export default Customers;
