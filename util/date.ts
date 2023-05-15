function formatDate(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat('tr-TR', options);
  const date = new Date(timestamp);
  return formatter.format(date);
}
export { formatDate };
