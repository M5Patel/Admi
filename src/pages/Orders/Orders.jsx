import React, { useState, useEffect } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import DeleteConfirmation from '../../components/common/DeleteConfirmation';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageHelper';

const INITIAL_ORDERS = [
    {
        id: 1,
        customerName: 'John Doe',
        orderDate: '2026-02-01',
        status: 'Delivered',
        total: 249.99,
        items: 'Wireless Headphones x2'
    },
    {
        id: 2,
        customerName: 'Jane Smith',
        orderDate: '2026-02-02',
        status: 'Processing',
        total: 89.99,
        items: 'Coffee Maker x1'
    },
    {
        id: 3,
        customerName: 'Mike Johnson',
        orderDate: '2026-01-30',
        status: 'Pending',
        total: 199.99,
        items: 'Smart Watch x1'
    }
];

const Orders = () => {
    // STATE MANAGEMENT
    // ===============

    // Orders list - loaded from localStorage or INITIAL_ORDERS
    const [orders, setOrders] = useState(() => {
        return getFromLocalStorage('orders', INITIAL_ORDERS);
    });

    // Filter by status
    const [statusFilter, setStatusFilter] = useState('All');

    // Modal state for Add/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    // Form data for add/edit
    const [formData, setFormData] = useState({
        customerName: '',
        orderDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        total: '',
        items: ''
    });

    // PERSISTENCE: Save to localStorage whenever orders change
    useEffect(() => {
        saveToLocalStorage('orders', orders);
    }, [orders]);

    // TABLE COLUMNS CONFIGURATION
    // ==========================
    const columns = [
        { 
            key: 'customerName', 
            label: 'Customer Name' 
        },
        { 
            key: 'orderDate', 
            label: 'Order Date',
            render: (value) => new Date(value).toLocaleDateString()
        },
        { 
            key: 'status', 
            label: 'Status',
            // Custom render for status badge
            render: (value) => {
                const statusColors = {
                    'Pending': 'badge-warning',
                    'Processing': 'badge-info',
                    'Delivered': 'badge-success',
                    'Cancelled': 'badge-danger'
                };
                return (
                    <span className={`badge ${statusColors[value] || 'badge-info'}`}>
                        {value}
                    </span>
                );
            }
        },
        { 
            key: 'items', 
            label: 'Items' 
        },
        { 
            key: 'total', 
            label: 'Total',
            render: (value) => `$${parseFloat(value).toFixed(2)}`
        }
    ];

    // FILTERING: Filter orders based on status
    const filteredOrders = statusFilter === 'All' 
        ? orders 
        : orders.filter(order => order.status === statusFilter);

    // CRUD OPERATIONS
    // ==============

    // OPEN ADD MODAL
    const handleAddNew = () => {
        setIsEditMode(false);
        setFormData({
            customerName: '',
            orderDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            total: '',
            items: ''
        });
        setIsModalOpen(true);
    };

    // OPEN EDIT MODAL
    const handleEdit = (order) => {
        setIsEditMode(true);
        setFormData(order);
        setIsModalOpen(true);
    };

    // OPEN DELETE CONFIRMATION
    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setIsDeleteModalOpen(true);
    };

    // CONFIRM DELETE
    const handleDeleteConfirm = () => {
        setOrders(orders.filter(o => o.id !== orderToDelete.id));
        setIsDeleteModalOpen(false);
        setOrderToDelete(null);
    };

    // HANDLE FORM INPUT CHANGES
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // SAVE ORDER (Add or Edit)
    const handleSave = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // UPDATE existing order
            setOrders(orders.map(o => 
                o.id === formData.id ? formData : o
            ));
        } else {
            // ADD new order
            const newOrder = {
                ...formData,
                id: Date.now(),
                total: parseFloat(formData.total)
            };
            setOrders([...orders, newOrder]);
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
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage customer orders
                    </p>
                </div>
                {/* Add Order Button */}
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    Add Order
                </button>
            </div>

            {/* Status Filter */}
            <div className="card p-4">
                <div className="flex items-center gap-3">
                    <FiFilter className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</span>
                    <div className="flex gap-2 flex-wrap">
                        {['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                    statusFilter === status
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <Table
                columns={columns}
                data={filteredOrders}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                emptyMessage="No orders found. Click 'Add Order' to create one."
            />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Order' : 'Add New Order'}
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
                            {isEditMode ? 'Update' : 'Add'} Order
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <FormInput
                        label="Customer Name"
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        placeholder="Enter customer name"
                        required
                    />

                    <FormInput
                        label="Order Date"
                        type="date"
                        name="orderDate"
                        value={formData.orderDate}
                        onChange={handleInputChange}
                        required
                    />

                    <FormInput
                        label="Items"
                        type="textarea"
                        name="items"
                        value={formData.items}
                        onChange={handleInputChange}
                        placeholder="e.g., Wireless Headphones x2, Coffee Maker x1"
                        rows={3}
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
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Processing', label: 'Processing' },
                                { value: 'Delivered', label: 'Delivered' },
                                { value: 'Cancelled', label: 'Cancelled' }
                            ]}
                            required
                        />

                        <FormInput
                            label="Total ($)"
                            type="number"
                            name="total"
                            value={formData.total}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
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
                title={`Delete order for "${orderToDelete?.customerName}"?`}
                message="This order will be permanently removed from your records."
            />
        </div>
    );
};

export default Orders;
