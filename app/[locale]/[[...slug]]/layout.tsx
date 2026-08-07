import { locales, pagePath } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  const paths = Object.values(pagePath);
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      slug: path ? path.split("/") : []
    }))
  );
}

export default function PublicPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
