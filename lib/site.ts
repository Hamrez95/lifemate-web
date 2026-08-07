export const SITE_URL = "https://mylifemate.ir";
export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];
export type PageKey = "home" | "wellmate" | "caremate" | "ecosystem" | "about" | "contact" | "investors" | "privacy" | "terms" | "cookie-policy";

export const pagePath: Record<PageKey, string> = {
  home: "",
  wellmate: "wellmate",
  caremate: "caremate",
  ecosystem: "ecosystem",
  about: "about",
  contact: "contact",
  investors: "investors",
  privacy: "privacy",
  terms: "terms",
  "cookie-policy": "cookie-policy"
};

export const pathToPage = new Map<string, PageKey>(Object.entries(pagePath).map(([key, value]) => [value, key as PageKey]));

export function localizedPath(locale: Locale, page: PageKey) {
  const slug = pagePath[page];
  return `/${locale}${slug ? `/${slug}` : ""}`;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
