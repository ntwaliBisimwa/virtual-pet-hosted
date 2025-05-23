export function minutesElapsedSince(timestamp) {
    const now = Date.now();
    return Math.floor((now - timestamp) / (1000 * 60)); // Convert ms → minutes
  }
  