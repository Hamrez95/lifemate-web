import type { Locale } from "./site";
import type { Dictionary } from "./content-types";
import { fa } from "./copy-fa";
import { en } from "./copy-en";
import { uiFa } from "./ui-fa";
import { uiEn } from "./ui-en";

export const copy: Record<Locale, Dictionary> = { fa, en };
export const ui = { fa: uiFa, en: uiEn } as const;
