import React from 'react';
import Card from '../../../components/common/Card';
import { FiTrendingUp, FiTrendingDown, FiMoreVertical } from 'react-icons/fi';
import { formatCurrency, formatNumber, formatPercentage } from '../../../utils/formatNumber';

const StatCard = ({ title, value, change, period, isCurrency = false }) => {
    const isPositive = change >= 0;

    return (
        <Card className="relative">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {isCurrency ? formatCurrency(value) : formatNumber(value)}
                    </h3>
                    <div className="flex items-center gap-2">
                        {isPositive ? (
                            <FiTrendingUp className="w-4 h-4 text-success" />
                        ) : (
                            <FiTrendingDown className="w-4 h-4 text-danger" />
                        )}
                        <span
                            className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'
                                }`}
                        >
                            {formatPercentage(change)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {period}
                        </span>
                    </div>
                </div>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <FiMoreVertical className="w-5 h-5 text-gray-400" />
                </button>
            </div>
        </Card>
    );
};

export default StatCard;
