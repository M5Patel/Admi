import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatCard from './widgets/StatCard';
import SalesByCountry from './widgets/SalesByCountry';
import TopCategories from './widgets/TopCategories';
import CustomBarChart from '../../components/charts/BarChart';
import DonutChart from '../../components/charts/DonutChart';
import LineChart from '../../components/charts/LineChart';
import {
    kpiStats,
    productReturnsData,
    totalSalesData,
    visitorsData,
    salesByCountry,
    topCategories,
} from '../../data/dashboardData';
import { FiDownload, FiHelpCircle, FiCalendar } from 'react-icons/fi';

const Dashboard = () => {
    const totalOrders = totalSalesData.reduce((sum, item) => sum + item.orders, 0);

    return (
        <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiStats.map((stat) => (
                    <StatCard key={stat.id} {...stat} />
                ))}
            </div>

            {/* Charts Row 1: Product Returns & Total Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Returns */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Product return (Qty)
                            </h3>
                            <FiHelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    <CustomBarChart data={productReturnsData} />
                </Card>

                {/* Total Sales */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Total sales
                            </h3>
                            <FiHelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    <DonutChart data={totalSalesData} totalOrders={totalOrders} />
                </Card>
            </div>

            {/* Charts Row 2: Visitors & Sales by Country */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitors */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Visitors
                            </h3>
                            <FiHelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="mb-4">
                        <div className="inline-block bg-gray-900 dark:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                            8.8k pal
                        </div>
                    </div>
                    <LineChart data={visitorsData} />
                </Card>

                {/* Sales by Country */}
                <SalesByCountry data={salesByCountry} />
            </div>

            {/* Bottom Row: Top Categories & Product Guidelines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Categories - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <TopCategories data={topCategories} />

                    {/* Download Report Button */}
                    <div className="mt-6">
                        <Button
                            variant="success"
                            size="md"
                            icon={<FiDownload className="w-4 h-4" />}
                            className="w-full"
                        >
                            Download report
                        </Button>
                    </div>
                </div>

                {/* Product Guidelines - Takes 1 column */}
                <Card>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Product guildlines
                    </h3>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mb-4 hover:underline cursor-pointer">
                        Learn more
                    </p>

                    {/* Illustration */}
                    <div className="flex items-center justify-center py-8">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <svg
                                className="w-20 h-20 text-gray-400 dark:text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
