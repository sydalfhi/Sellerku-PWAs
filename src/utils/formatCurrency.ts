export const formatCurrency = (amount: string) => {
    return `Rp ${parseInt(amount).toLocaleString('id-ID')}`;
};