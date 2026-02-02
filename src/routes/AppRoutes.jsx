import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Orders from '../pages/Orders/Orders';
import Products from '../pages/Products/Products';
import Customers from '../pages/Customers/Customers';
import Settings from '../pages/Settings/Settings';
import Profile from '../pages/Profile/Profile';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout title="Dashboard"><Dashboard /></MainLayout>} />
            <Route path="/orders" element={<MainLayout title="Orders"><Orders /></MainLayout>} />
            <Route path="/products" element={<MainLayout title="Products"><Products /></MainLayout>} />
            <Route path="/customers" element={<MainLayout title="Customers"><Customers /></MainLayout>} />
            <Route path="/settings" element={<MainLayout title="Settings"><Settings /></MainLayout>} />
            <Route path="/profile" element={<MainLayout title="Profile"><Profile /></MainLayout>} />
            <Route path="/help" element={<MainLayout title="Help"><div>Help page</div></MainLayout>} />
            <Route path="/report" element={<MainLayout title="Report"><div>Report page</div></MainLayout>} />
            <Route path="/logout" element={<MainLayout title="Logout"><div>Logging out...</div></MainLayout>} />
        </Routes>
    );
};

export default AppRoutes;
