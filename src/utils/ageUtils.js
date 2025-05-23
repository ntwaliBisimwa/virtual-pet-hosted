export function calculateAge(birthdate) {
    const now = Date.now();
    return Math.floor((now - birthdate) / (1000 * 60)); // 1 min = 1 pet day
  }
  