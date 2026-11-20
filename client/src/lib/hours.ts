import { BUSINESS_HOURS } from "./constants";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const LAGOS_TIME_ZONE = "Africa/Lagos";

/**
 * Reads the current date/time as it is in Lagos right now, regardless of
 * the visitor's own device timezone — so the "open now" badge is correct
 * for a Lagos business no matter where the page is loaded from.
 */
function getLagosNow(): { dayIndex: number; minutesSinceMidnight: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LAGOS_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  const dayIndex = DAY_NAMES.findIndex((d) => d.startsWith(weekday));
  return { dayIndex: dayIndex === -1 ? 0 : dayIndex, minutesSinceMidnight: hour * 60 + minute };
}

export function isOpenNow(): boolean {
  const { dayIndex, minutesSinceMidnight } = getLagosNow();
  const today = BUSINESS_HOURS[dayIndex];
  if (!today) return false;

  const [openH, openM, closeH, closeM] = today;
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return minutesSinceMidnight >= openMinutes && minutesSinceMidnight < closeMinutes;
}

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0 ? `${displayHour} ${period}` : `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function getHoursLabel(dayIndex: number): string {
  const entry = BUSINESS_HOURS[dayIndex];
  if (!entry) return "Closed";
  const [openH, openM, closeH, closeM] = entry;
  return `${formatTime(openH, openM)} – ${formatTime(closeH, closeM)}`;
}

export function getTodayLabel(): string {
  const { dayIndex } = getLagosNow();
  return `${DAY_NAMES[dayIndex]}: ${getHoursLabel(dayIndex)}`;
}