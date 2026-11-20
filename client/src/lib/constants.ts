// TODO: swap the remaining placeholder values (email, socials) for the real ones.
export const PHONE_DISPLAY = "+234 803 090 6441";
export const WHATSAPP_NUMBER = "2348030906441"; // digits only, no "+" or spaces — used in wa.me links
export const EMAIL = "info@chivicsconnections.com";
export const INSTAGRAM_URL = "https://instagram.com/chivicsconnections";
export const FACEBOOK_URL = "https://facebook.com/chivicsconnections";

export const BUSINESS_ADDRESS =
  "Block 24 Plot 3079D, Ago Palace Way, Amuwo Odofin, Lagos, by Mopol Junction";
export const BUSINESS_MAPS_URL = "https://maps.google.com/?cid=13743968797141400310";
export const BUSINESS_LAT = 6.4769218;
export const BUSINESS_LNG = 3.310376;

// Index 0 = Sunday ... 6 = Saturday, matching Date#getDay(). Each entry is
// [openHour, openMinute, closeHour, closeMinute] in 24h time, or null if closed.
export const BUSINESS_HOURS: readonly (readonly [number, number, number, number] | null)[] = [
  null, // Sunday — closed
  [7, 0, 18, 30], // Monday
  [7, 0, 18, 30], // Tuesday
  [7, 0, 18, 30], // Wednesday
  [7, 30, 18, 30], // Thursday
  [7, 0, 18, 30], // Friday
  [7, 0, 18, 30], // Saturday
];
 