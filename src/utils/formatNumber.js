export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
};

export const formatCurrency = (amount, currency = '$') => {
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);

    return `${currency}${formatted}`;
};

export const formatPercentage = (value, decimals = 2) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};
