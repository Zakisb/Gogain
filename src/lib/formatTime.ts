export default function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) {
    return `${seconds}secs`;
  } else {
    return `${minutes}min ${seconds}secs`;
  }
}
