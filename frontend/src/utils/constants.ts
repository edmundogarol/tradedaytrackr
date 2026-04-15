export const TIMEZONE_OPTIONS = [
  { label: "UTC (Coordinated Universal Time)", value: "UTC" },

  // 🌏 Asia
  { label: "GMT+8 — Manila", value: "Asia/Manila" },
  { label: "GMT+8 — Singapore", value: "Asia/Singapore" },
  { label: "GMT+8 — Hong Kong", value: "Asia/Hong_Kong" },
  { label: "GMT+8 — Shanghai (China)", value: "Asia/Shanghai" },
  { label: "GMT+7 — Bangkok", value: "Asia/Bangkok" },
  { label: "GMT+7 — Jakarta", value: "Asia/Jakarta" },
  { label: "GMT+9 — Tokyo", value: "Asia/Tokyo" },
  { label: "GMT+9 — Seoul", value: "Asia/Seoul" },
  { label: "GMT+5:30 — India (Kolkata)", value: "Asia/Kolkata" },
  { label: "GMT+5 — Pakistan (Karachi)", value: "Asia/Karachi" },
  { label: "GMT+4 — Dubai", value: "Asia/Dubai" },
  { label: "GMT+3 — Riyadh", value: "Asia/Riyadh" },

  // 🌍 Europe
  { label: "GMT+0 — London", value: "Europe/London" },
  { label: "GMT+1 — Berlin", value: "Europe/Berlin" },
  { label: "GMT+1 — Paris", value: "Europe/Paris" },
  { label: "GMT+1 — Madrid", value: "Europe/Madrid" },
  { label: "GMT+1 — Rome", value: "Europe/Rome" },
  { label: "GMT+2 — Athens", value: "Europe/Athens" },
  { label: "GMT+2 — Helsinki", value: "Europe/Helsinki" },
  { label: "GMT+3 — Moscow", value: "Europe/Moscow" },

  // 🌎 North America
  { label: "GMT-5 — New York (EST/EDT)", value: "America/New_York" },
  { label: "GMT-6 — Chicago (CST/CDT)", value: "America/Chicago" },
  { label: "GMT-7 — Denver (MST/MDT)", value: "America/Denver" },
  { label: "GMT-8 — Los Angeles (PST/PDT)", value: "America/Los_Angeles" },
  { label: "GMT-4 — Toronto", value: "America/Toronto" },
  { label: "GMT-6 — Mexico City", value: "America/Mexico_City" },

  // 🌎 South America
  { label: "GMT-3 — São Paulo", value: "America/Sao_Paulo" },
  { label: "GMT-3 — Buenos Aires", value: "America/Argentina/Buenos_Aires" },
  { label: "GMT-5 — Bogotá", value: "America/Bogota" },
  { label: "GMT-4 — Santiago", value: "America/Santiago" },

  // 🌍 Africa
  { label: "GMT+2 — Cairo", value: "Africa/Cairo" },
  { label: "GMT+1 — Lagos", value: "Africa/Lagos" },
  { label: "GMT+2 — Johannesburg", value: "Africa/Johannesburg" },

  // 🌏 Australia & Pacific
  { label: "GMT+10 — Sydney", value: "Australia/Sydney" },
  { label: "GMT+10 — Melbourne", value: "Australia/Melbourne" },
  { label: "GMT+8 — Perth", value: "Australia/Perth" },
  { label: "GMT+12 — Auckland", value: "Pacific/Auckland" },
  { label: "GMT+13 — Fiji", value: "Pacific/Fiji" },
];

export const ICT_MACROS = [
  {
    key: "london",
    label: "London Open",
    open: { hour: 2, minute: 33 },
    close: { hour: 3, minute: 0 },
  },
  {
    key: "london2",
    label: "London Continuation",
    open: { hour: 4, minute: 3 },
    close: { hour: 4, minute: 30 },
  },
  {
    key: "nyAm",
    label: "NY AM 1",
    open: { hour: 8, minute: 50 },
    close: { hour: 9, minute: 10 },
  },
  {
    key: "nyAm2",
    label: "NY AM 2",
    open: { hour: 9, minute: 50 },
    close: { hour: 10, minute: 10 },
  },
  {
    key: "nyAm3",
    label: "NY AM 3",
    open: { hour: 10, minute: 50 },
    close: { hour: 11, minute: 10 },
  },
  {
    key: "nyLunch",
    label: "NY Lunch",
    open: { hour: 11, minute: 50 },
    close: { hour: 12, minute: 10 },
  },
  {
    key: "nyPm",
    label: "NY PM",
    open: { hour: 13, minute: 10 },
    close: { hour: 13, minute: 40 },
  },
  {
    key: "nyLast",
    label: "NY Power Hour",
    open: { hour: 15, minute: 15 },
    close: { hour: 15, minute: 45 },
  },
];
