import React from 'react';
import Card from '../../../components/common/Card';
import MapChart from '../../../components/charts/MapChart';
import { formatCurrency, formatNumber } from '../../../utils/formatNumber';

const SalesByCountry = ({ data }) => {
    const displayCountries = data.filter(
        (country) => ['US', 'Canada', 'China'].includes(country.country)
    );

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Sales by country
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                    See more
                </button>
            </div>

            {/* Map */}
            <div className="mb-4">
                <MapChart data={data} />
            </div>

            {/* Country List */}
            <div className="space-y-3">
                {displayCountries.map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {country.country}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(country.sales)} sol {country.sales > 1 ? 'p.m' : 'p.m'}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[60px] text-right">
                                {formatCurrency(country.revenue)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default SalesByCountry;
