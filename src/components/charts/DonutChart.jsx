import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import { formatNumber } from '../../utils/formatNumber';

const DonutChart = ({ data, totalOrders }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b'];

    const CustomLabel = ({ cx, cy }) => {
        return (
            <g>
                <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs"
                    fill={isDark ? '#9ca3af' : '#6b7280'}
                >
                    Total
                </text>
                <text
                    x={cx}
                    y={cy + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-semibold"
                    fill={isDark ? '#f3f4f6' : '#111827'}
                >
                    {formatNumber(totalOrders)}
                </text>
            </g>
        );
    };

    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex flex-col gap-2 mt-4">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-gray-700 dark:text-gray-300">{entry.value}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {entry.payload.value}%
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={CustomLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                    }}
                />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DonutChart;
