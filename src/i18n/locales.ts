export const localeOptions = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
] as const;

export type Locale = (typeof localeOptions)[number]["code"];

export function isLocale(value: string): value is Locale {
  return localeOptions.some((locale) => locale.code === value);
}
