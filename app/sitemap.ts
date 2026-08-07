import type { MetadataRoute } from "next";
import { locales, localizedPath, pagePath, type PageKey } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(pagePath) as PageKey[];
  return locales.flatMap((locale) => pages.map((page) => ({ url: `https://mylifemate.ir${localizedPath(locale, page)}`, lastModified: new Date("2026-08-07"), changeFrequency: page === "home" ? "weekly" as const : "monthly" as const, priority: page === "home" ? 1 : ["wellmate","caremate","ecosystem"].includes(page) ? 0.9 : 0.6, alternates: { languages: { fa: `https://mylifemate.ir${localizedPath("fa", page)}`, en: `https://mylifemate.ir${localizedPath("en", page)}` } } })));
}
