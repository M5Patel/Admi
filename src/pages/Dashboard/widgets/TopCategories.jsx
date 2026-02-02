import React from 'react';
import Card from '../../../components/common/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import { formatCurrency } from '../../../utils/formatNumber';

const TopCategories = ({ data }) => {
    const categoryImages = {
        Electronics: '📱',
        'Sports goods': '⚽',
        Clothing: '👕',
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Top categories
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                    See more
                </button>
            </div>

            <div className="space-y-6">
                {data.map((category) => (
                    <div key={category.id}>
                        <div className="flex items-center gap-3 mb-2">
                            {/* Category Icon/Image */}
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                                {categoryImages[category.name] || '📦'}
                            </div>

                            {/* Category Info */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {category.name}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {category.percentage}%
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[60px] text-right">
                                            {formatCurrency(category.value)}
                                        </span>
                                    </div>
                                </div>
                                <ProgressBar
                                    value={category.percentage}
                                    color={category.id === 1 ? 'primary' : category.id === 2 ? 'purple' : 'warning'}
                                    height="sm"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TopCategories;
