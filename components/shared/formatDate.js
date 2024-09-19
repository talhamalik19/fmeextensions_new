export function formatPublishDate(date) {
  try {
    const formattedDate = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));

    // Check if formattedDate is a valid string
    if (formattedDate && formattedDate !== 'Invalid Date') {
      return formattedDate;
    } else {
      // Return a default value or the original date if formatting fails
      return date;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    // Return a default value or the original date if an error occurs
    return date;
  }
}
