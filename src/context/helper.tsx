export const formatLabel = (segment: string) =>
    segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());