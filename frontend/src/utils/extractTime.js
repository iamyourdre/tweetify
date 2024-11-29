export function extractTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}