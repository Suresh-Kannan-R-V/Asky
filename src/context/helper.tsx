export const formatLabel = (segment: string) =>
    segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());



export const formatDateTime = (isoString: string) => {
    if (!isoString) return 'N/A';

    const date = new Date(isoString);

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(date).replace(',', '');
};