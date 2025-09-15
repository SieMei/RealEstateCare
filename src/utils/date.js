export function formatDate(isoString, format = 'datetime') {
  if (!isoString) return "-";
  try {
    const date = new Date(isoString);
    if (isNaN(date)) return isoString; 

    if (format === 'date') {
      return date.toLocaleDateString("nl-NL");
    }

   // standaard: 'datetime'
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (e) {
    return isoString;
  }
}
