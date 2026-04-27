export function formatDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export function getHour(dateString) {
  return new Date(dateString).getHours();
}