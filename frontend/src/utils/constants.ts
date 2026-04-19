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

export const ICT_SESSIONS = [
  {
    key: "asia",
    label: "Asia Session",
    open: { hour: 20, minute: 0 },
    close: { hour: 0, minute: 0 }, // next day
  },
  {
    key: "london",
    label: "London Session",
    open: { hour: 2, minute: 0 },
    close: { hour: 5, minute: 0 },
  },
  {
    key: "nyAm",
    label: "New York AM",
    open: { hour: 9, minute: 30 },
    close: { hour: 11, minute: 0 },
  },
  {
    key: "nyLunch",
    label: "New York Lunch",
    open: { hour: 12, minute: 0 },
    close: { hour: 13, minute: 0 },
  },
  {
    key: "nyPm",
    label: "New York PM",
    open: { hour: 13, minute: 30 },
    close: { hour: 16, minute: 0 },
  },
];

export const currencyOptions = [
  { name: "USD", value: "USD", label: "USD - US Dollar" },
  { name: "EUR", value: "EUR", label: "EUR - Euro" },
  { name: "GBP", value: "GBP", label: "GBP - British Pound" },
  { name: "JPY", value: "JPY", label: "JPY - Japanese Yen" },
  { name: "AUD", value: "AUD", label: "AUD - Australian Dollar" },
  { name: "CAD", value: "CAD", label: "CAD - Canadian Dollar" },
  { name: "CHF", value: "CHF", label: "CHF - Swiss Franc" },
  { name: "CNY", value: "CNY", label: "CNY - Chinese Yuan" },
  { name: "HKD", value: "HKD", label: "HKD - Hong Kong Dollar" },
  { name: "NZD", value: "NZD", label: "NZD - New Zealand Dollar" },
  { name: "SEK", value: "SEK", label: "SEK - Swedish Krona" },
  { name: "NOK", value: "NOK", label: "NOK - Norwegian Krone" },
  { name: "DKK", value: "DKK", label: "DKK - Danish Krone" },

  { name: "SGD", value: "SGD", label: "SGD - Singapore Dollar" },
  { name: "KRW", value: "KRW", label: "KRW - South Korean Won" },
  { name: "INR", value: "INR", label: "INR - Indian Rupee" },
  { name: "PHP", value: "PHP", label: "PHP - Philippine Peso" },
  { name: "THB", value: "THB", label: "THB - Thai Baht" },
  { name: "MYR", value: "MYR", label: "MYR - Malaysian Ringgit" },
  { name: "IDR", value: "IDR", label: "IDR - Indonesian Rupiah" },
  { name: "VND", value: "VND", label: "VND - Vietnamese Dong" },

  { name: "ZAR", value: "ZAR", label: "ZAR - South African Rand" },
  { name: "NGN", value: "NGN", label: "NGN - Nigerian Naira" },
  { name: "EGP", value: "EGP", label: "EGP - Egyptian Pound" },

  { name: "BRL", value: "BRL", label: "BRL - Brazilian Real" },
  { name: "MXN", value: "MXN", label: "MXN - Mexican Peso" },
  { name: "ARS", value: "ARS", label: "ARS - Argentine Peso" },
  { name: "CLP", value: "CLP", label: "CLP - Chilean Peso" },
  { name: "COP", value: "COP", label: "COP - Colombian Peso" },

  { name: "AED", value: "AED", label: "AED - UAE Dirham" },
  { name: "SAR", value: "SAR", label: "SAR - Saudi Riyal" },
  { name: "QAR", value: "QAR", label: "QAR - Qatari Riyal" },
  { name: "KWD", value: "KWD", label: "KWD - Kuwaiti Dinar" },

  { name: "TRY", value: "TRY", label: "TRY - Turkish Lira" },
  { name: "RUB", value: "RUB", label: "RUB - Russian Ruble" },
  { name: "PLN", value: "PLN", label: "PLN - Polish Zloty" },
  { name: "CZK", value: "CZK", label: "CZK - Czech Koruna" },
  { name: "HUF", value: "HUF", label: "HUF - Hungarian Forint" },
];
