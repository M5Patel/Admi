export const kpiStats = [
    {
        id: 1,
        title: 'Revenue',
        value: 116925,
        change: 7.4,
        period: 'since last month',
        isCurrency: true,
    },
    {
        id: 2,
        title: 'Orders',
        value: 24645,
        change: 1.08,
        period: 'since last month',
        isCurrency: false,
    },
    {
        id: 3,
        title: 'Customers',
        value: 16125,
        change: 4.47,
        period: 'since last month',
        isCurrency: false,
    },
];

// Product Returns Data (Bar Chart)
export const productReturnsData = [
    { day: '1', Mishipment: 18, Defective: 12, Other: 8 },
    { day: '3', Mishipment: 22, Defective: 15, Other: 10 },
    { day: '5', Mishipment: 20, Defective: 18, Other: 12 },
    { day: '7', Mishipment: 25, Defective: 20, Other: 15 },
    { day: '9', Mishipment: 30, Defective: 12, Other: 18 },
    { day: '11', Mishipment: 28, Defective: 22, Other: 14 },
    { day: '13', Mishipment: 32, Defective: 25, Other: 20 },
    { day: '15', Mishipment: 35, Defective: 28, Other: 22 },
    { day: '17', Mishipment: 30, Defective: 20, Other: 18 },
    { day: '19', Mishipment: 38, Defective: 30, Other: 25 },
    { day: '21', Mishipment: 35, Defective: 25, Other: 20 },
    { day: '23', Mishipment: 40, Defective: 28, Other: 22 },
    { day: '25', Mishipment: 38, Defective: 32, Other: 24 },
    { day: '27', Mishipment: 42, Defective: 30, Other: 26 },
    { day: '29', Mishipment: 40, Defective: 28, Other: 24 },
    { day: '31', Mishipment: 45, Defective: 35, Other: 28 },
];

// Total Sales Data (Donut Chart)
export const totalSalesData = [
    { name: 'Direct', value: 49, orders: 24645 },
    { name: 'Affiliate', value: 32, orders: 16000 },
    { name: 'Sponsored', value: 19, orders: 9500 },
];

// Visitors Data (Line Chart)
export const visitorsData = [
    { day: 'Mon', visitors: 6000 },
    { day: 'Tue', visitors: 7500 },
    { day: 'Wed', visitors: 8200 },
    { day: 'Thu', visitors: 8800 },
    { day: 'Fri', visitors: 9500 },
    { day: 'Sat', visitors: 7200 },
    { day: 'Sun', visitors: 6500 },
];

// Sales by Country Data
export const salesByCountry = [
    {
        country: 'US',
        sales: 3942,
        revenue: 101200,
        coordinates: [-95.7129, 37.0902]
    },
    {
        country: 'Canada',
        sales: 958,
        revenue: 8400,
        coordinates: [-106.3468, 56.1304]
    },
    {
        country: 'China',
        sales: 745,
        revenue: 7300,
        coordinates: [104.1954, 35.8617]
    },
    {
        country: 'Australia',
        sales: 196,
        revenue: 1500,
        people: '196',
        purchase: '$1.5k',
        coordinates: [133.7751, -25.2744]
    },
];

// Top Categories Data
export const topCategories = [
    {
        id: 1,
        name: 'Electronics',
        percentage: 62.8,
        value: 86600,
        image: null,
    },
    {
        id: 2,
        name: 'Sports goods',
        percentage: 24.52,
        value: 28200,
        image: null,
    },
    {
        id: 3,
        name: 'Clothing',
        percentage: 13.96,
        value: 11400,
        image: null,
    },
];
