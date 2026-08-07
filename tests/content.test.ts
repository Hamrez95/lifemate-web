import { describe, expect, it } from "vitest";
import { copy } from "@/lib/content";
import { locales, pagePath } from "@/lib/site";

describe("localized content", () => {
  it("contains metadata for every public page in every locale", () => {
    for (const locale of locales) {
      for (const page of Object.keys(pagePath)) {
        const meta = copy[locale].meta[page as keyof typeof copy.fa.meta];
        expect(meta.title.length).toBeGreaterThan(8);
        expect(meta.description.length).toBeGreaterThan(40);
      }
    }
  });

  it("keeps LifeMate separate from downloadable products", () => {
    expect(copy.fa.home.intro).toContain("WellMate");
    expect(copy.fa.home.intro).toContain("CareMate");
    expect(copy.en.home.faqs[0].a).toContain("not a standalone downloadable app");
  });

  it("includes the medical disclaimer in both languages", () => {
    expect(copy.fa.common.disclaimer).toContain("جایگزین پزشک");
    expect(copy.en.common.disclaimer).toContain("does not replace");
  });
});
