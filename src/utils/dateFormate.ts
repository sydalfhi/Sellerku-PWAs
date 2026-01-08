
// params
// dateStr: string dalam format "YYYY-MM-DD"
export const formatTanggal = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    return `${day} ${bulan[month - 1]} ${year}`;
};