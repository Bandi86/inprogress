export function formatDateTime(badTime: string) {
  let formattedDate = new Date(badTime).toLocaleString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    /* second: 'numeric',
    timeZone: 'UTC', // Állítsd az időzónát a sajátodra */
  });

  return formattedDate;
}
