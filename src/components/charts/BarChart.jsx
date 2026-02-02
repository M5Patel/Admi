import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';

const CustomBarChart = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const colors = {
        Mishipment: '#94a3b8',
        Defective: '#cbd5e1',
        Other: '#e2e8f0',
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#374151' : '#e5e7eb'}
                    vertical={false}
                />
                <XAxis
                    dataKey="day"
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: isDark ? '#f3f4f6' : '#111827',
                    }}
                    cursor={{ fill: isDark ? '#374151' : '#f3f4f6' }}
                />
                <Legend
                    wrapperStyle={{
                        paddingTop: '20px',
                        fontSize: '13px',
                    }}
                    iconType="circle"
                />
                <Bar dataKey="Mishipment" fill={colors.Mishipment} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Defective" fill={colors.Defective} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Other" fill={colors.Other} radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;
