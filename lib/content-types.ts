import type { Locale, PageKey } from "./site";

export type Nav = { home: string; ecosystem: string; wellmate: string; caremate: string; story: string; contact: string; early: string };
export type PageMeta = { title: string; description: string };

export type Dictionary = {
  dir: "rtl" | "ltr";
  nav: Nav;
  common: {
    learnMore: string; how: string; comingSoon: string; earlyAccess: string; products: string;
    privacyPill: string; disclaimer: string; chooseApps: string; close: string;
  };
  meta: Record<PageKey, PageMeta>;
  home: {
    eyebrow: string; title: string; highlight: string; intro: string;
    storyTitle: string; storyText: string;
    stepsTitle: string; steps: { title: string; text: string }[];
    productTitle: string; wellText: string; careText: string;
    connectTitle: string; connectText: string;
    trustTitle: string; trustText: string;
    aboutTitle: string; aboutText: string;
    partnerTitle: string; partnerText: string;
    faqTitle: string; faqs: { q: string; a: string }[];
  };
  wellmate: {
    eyebrow: string; title: string; intro: string; capabilities: string[];
    calendarTitle: string; calendarText: string; morningTitle: string; morningText: string;
    supportTitle: string; supportText: string;
  };
  caremate: {
    eyebrow: string; title: string; intro: string; capabilities: string[];
    consentTitle: string; consentText: string; moodTitle: string; moodText: string;
    togetherTitle: string; togetherText: string;
  };
  ecosystem: {
    eyebrow: string; title: string; intro: string; flowTitle: string;
    wellEvent: string; coreSteps: string[]; careSummary: string;
    permissionTitle: string; permissionText: string;
    futureTitle: string; futureText: string;
  };
  about: { title: string; intro: string; originTitle: string; originText: string; founderTitle: string; founderText: string; principleTitle: string; principles: string[] };
  contact: { title: string; intro: string; emailLabel: string; earlyTitle: string; earlyText: string };
  investors: { title: string; intro: string; noteTitle: string; noteText: string; cta: string };
  legal: { privacyTitle: string; privacy: string[]; termsTitle: string; terms: string[]; cookieTitle: string; cookie: string[] };
};
