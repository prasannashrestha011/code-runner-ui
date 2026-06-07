/**
 * Parse a human-readable duration string to nanoseconds.
 * Supports: "30m", "1h", "5s", "1h30m", "2h30m10s"
 * Go's time.Duration JSON-unmarshals from integer nanoseconds.
 */
export function parseDurationToNanoseconds(duration: string): number {
  if (!duration || duration.trim() === "") return 0;

  const cleaned = duration.trim().toLowerCase();
  let totalMs = 0;

  const hours = cleaned.match(/(\d+)\s*h/);
  const minutes = cleaned.match(/(\d+)\s*m(?!s)/);
  const seconds = cleaned.match(/(\d+)\s*s/);

  if (hours) totalMs += parseInt(hours[1]) * 3_600_000;
  if (minutes) totalMs += parseInt(minutes[1]) * 60_000;
  if (seconds) totalMs += parseInt(seconds[1]) * 1_000;

  // milliseconds → nanoseconds
  return totalMs * 1_000_000;
}

/**
 * Convert nanoseconds to a human-readable duration string.
 */
export function nanosecondsToHuman(ns: number): string {
  if (!ns || ns <= 0) return "0s";

  const totalSeconds = Math.floor(ns / 1_000_000_000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
}
