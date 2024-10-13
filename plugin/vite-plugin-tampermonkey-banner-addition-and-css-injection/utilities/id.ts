export function generateNewVersionId(date: Date = new Date()): string {
    return date.getFullYear() - 2021 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}
