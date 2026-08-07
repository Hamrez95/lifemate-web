import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://mylifemate.ir/sitemap.xml", host: "https://mylifemate.ir" };
}
