import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge, Breadcrumb, ButtonLink, Card, ConnectionFlow, ConsentPanel, FAQ, FeatureCard, Mascot, PageShell, PhoneFrame, Section, StoreRow } from "@/components/site";
import { copy, ui } from "@/lib/content";
import { isLocale, localizedPath, pathToPage, SITE_URL, type Locale, type PageKey } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug?: string[] }> };

function resolvePage(localeRaw: string, slug?: string[]) {
  if (!isLocale(localeRaw)) return null;
  const joined = slug?.join("/") ?? "";
  const page = pathToPage.get(joined);
  if (!page) return null;
  return { locale: localeRaw, page } as { locale: Locale; page: PageKey };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeRaw, slug } = await params;
  const resolved = resolvePage(localeRaw, slug);
  if (!resolved) return {};
  const { locale, page } = resolved;
  const t = copy[locale].meta[page];
  const canonical = `${SITE_URL}${localizedPath(locale, page)}`;
  const alternateLocale: Locale = locale === "fa" ? "en" : "fa";
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical, languages: { [locale]: canonical, [alternateLocale]: `${SITE_URL}${localizedPath(alternateLocale, page)}`, "x-default": `${SITE_URL}/fa` } },
    openGraph: { type: "website", locale: locale === "fa" ? "fa_IR" : "en_US", url: canonical, siteName: "LifeMate", title: t.title, description: t.description },
    twitter: { card: "summary_large_image", title: t.title, description: t.description }
  };
}

export default async function LocalizedPage({ params }: Props) {
  const { locale: localeRaw, slug } = await params;
  const resolved = resolvePage(localeRaw, slug);
  if (!resolved) notFound();
  const { locale, page } = resolved;
  return <PageShell locale={locale} page={page}><Schema locale={locale} page={page} />{renderPage(locale, page)}</PageShell>;
}

function Schema({ locale, page }: { locale: Locale; page: PageKey }) {
  const t = copy[locale];
  const graph: Record<string, unknown>[] = [
    { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "LifeMate", url: SITE_URL, founder: { "@type": "Person", name: "Hamidreza Pakpour", jobTitle: "Founder of LifeMate" } },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "LifeMate", inLanguage: ["fa", "en"] },
    { "@type": "WebPage", url: `${SITE_URL}${localizedPath(locale,page)}`, name: t.meta[page].title, description: t.meta[page].description, inLanguage: locale }
  ];
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: page === "home"
      ? [{ "@type": "ListItem", position: 1, name: t.nav.home, item: `${SITE_URL}${localizedPath(locale, "home")}` }]
      : [
          { "@type": "ListItem", position: 1, name: t.nav.home, item: `${SITE_URL}${localizedPath(locale, "home")}` },
          { "@type": "ListItem", position: 2, name: t.meta[page].title, item: `${SITE_URL}${localizedPath(locale, page)}` }
        ]
  });
  if (page === "home") graph.push({ "@type": "FAQPage", mainEntity: t.home.faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) });
  if (page === "wellmate" || page === "caremate") graph.push({ "@type": "SoftwareApplication", name: page === "wellmate" ? "WellMate" : "CareMate", applicationCategory: "HealthApplication", description: t.meta[page].description, isPartOf: { "@id": `${SITE_URL}/#org` } });
  if (page === "contact") graph.push({ "@type": "ContactPage", url: `${SITE_URL}${localizedPath(locale,"contact")}` });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

function renderPage(locale: Locale, page: PageKey) {
  switch (page) {
    case "home": return <HomePage locale={locale} />;
    case "wellmate": return <WellMatePage locale={locale} />;
    case "caremate": return <CareMatePage locale={locale} />;
    case "ecosystem": return <EcosystemPage locale={locale} />;
    case "about": return <AboutPage locale={locale} />;
    case "contact": return <ContactPage locale={locale} />;
    case "investors": return <InvestorsPage locale={locale} />;
    case "privacy": return <LegalPage locale={locale} kind="privacy" />;
    case "terms": return <LegalPage locale={locale} kind="terms" />;
    case "cookie-policy": return <LegalPage locale={locale} kind="cookie" />;
  }
}

function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const u = ui[locale];
  return <>
    <section className="hero home-hero"><div className="container hero-grid"><div className="hero-copy"><Badge tone="well">{t.home.eyebrow}</Badge><h1>{t.home.title}<span>{t.home.highlight}</span></h1><p>{t.home.intro}</p><div className="hero-actions"><ButtonLink href={localizedPath(locale,"contact")}>{t.common.earlyAccess}</ButtonLink><ButtonLink href="#how" variant="secondary">{t.common.how}</ButtonLink></div><div className="family-chips"><div className="avatar-stack">{u.home.avatarInitials.map((initial)=><span key={initial}>{initial}</span>)}</div><small>{u.home.familyNote}</small></div></div><div className="hero-visual"><div className="phone-pair"><PhoneFrame type="wellmate" locale={locale} /><PhoneFrame type="caremate" locale={locale} /></div><Mascot kind="wellmate" alt={u.home.wellMascotAlt}/><Mascot kind="caremate" alt={u.home.careMascotAlt}/><FloatingCard className="float-a" icon="💊" title={u.home.vitaminTitle} value={u.home.vitaminValue}/><FloatingCard className="float-b" icon="♡" title={u.home.moodTitle} value={u.home.moodValue}/></div></div></section>

    <Section className="story-band"><div className="story-grid"><div><Badge>{u.home.storyBadge}</Badge><h2>{t.home.storyTitle}</h2><p>{t.home.storyText}</p></div><div className="question-flow"><span>⌂</span><i>→</i><span>?</span><i>→</i><span>✦</span><i>→</i><span className="brand-mark"><i/><i/></span></div></div></Section>

    <Section id="how" className="steps-section"><div className="section-heading centered"><h2>{t.home.stepsTitle}</h2></div><div className="three-steps">{t.home.steps.map((step,index)=><Card key={step.title} className={`step-card step-${index+1}`}><span>{index+1}</span><h3>{step.title}</h3><p>{step.text}</p></Card>)}</div></Section>

    <Section className="product-band"><div className="section-heading centered"><Badge>{t.home.productTitle}</Badge><h2>{u.home.productHeading}</h2></div><div className="product-showcase"><Card className="product-panel well-panel"><div><Badge tone="well">WellMate</Badge><h3>{u.home.wellLabel}</h3><p>{t.home.wellText}</p><ul>{t.wellmate.capabilities.slice(0,4).map((item)=><li key={item}>✓ {item}</li>)}</ul><ButtonLink href={localizedPath(locale,"wellmate")} variant="ghost">{t.common.learnMore}</ButtonLink></div><div className="mini-phone-wrap"><PhoneFrame type="wellmate" locale={locale}/><Mascot kind="wellmate" /></div></Card><Card className="product-panel care-panel"><div><Badge tone="care">CareMate</Badge><h3>{u.home.careLabel}</h3><p>{t.home.careText}</p><ul>{t.caremate.capabilities.slice(0,4).map((item)=><li key={item}>✓ {item}</li>)}</ul><ButtonLink href={localizedPath(locale,"caremate")} variant="ghost">{t.common.learnMore}</ButtonLink></div><div className="mini-phone-wrap"><PhoneFrame type="caremate" locale={locale}/><Mascot kind="caremate" /></div></Card></div></Section>

    <Section className="connection-section"><div className="split-heading"><div><Badge tone="purple">{t.common.privacyPill}</Badge><h2>{t.home.connectTitle}</h2></div><p>{t.home.connectText}</p></div><ConnectionFlow locale={locale}/></Section>

    <Section className="trust-section"><div className="trust-grid"><div className="shield-visual"><span>♡</span></div><div><Badge>{u.home.trustBadge}</Badge><h2>{t.home.trustTitle}</h2><p>{t.home.trustText}</p><div className="trust-points"><span>▣ {u.home.trustPoints[0]}</span><span>◉ {u.home.trustPoints[1]}</span><span>✓ {u.home.trustPoints[2]}</span></div></div><ConsentPanel locale={locale}/></div></Section>

    <Section className="teaser-section"><div className="teaser-grid"><Card className="about-teaser"><Mascot kind="wellmate"/><div><h2>{t.home.aboutTitle}</h2><p>{t.home.aboutText}</p><ButtonLink href={localizedPath(locale,"about")} variant="ghost">{t.common.learnMore}</ButtonLink></div></Card><Card className="partner-teaser"><div className="briefcase" aria-hidden="true">▣</div><div><h2>{t.home.partnerTitle}</h2><p>{t.home.partnerText}</p><ButtonLink href={localizedPath(locale,"investors")} variant="secondary">{u.home.privateMeeting}</ButtonLink></div><Mascot kind="caremate"/></Card></div></Section>

    <FAQ locale={locale}/>

    <Section className="early-access"><div className="early-card"><div><Badge tone="care">{t.common.earlyAccess}</Badge><h2>{u.home.earlyTitle}</h2><p>{u.home.earlyText}</p><StoreRow locale={locale}/><ButtonLink href={localizedPath(locale,"contact")}>{t.common.earlyAccess}</ButtonLink></div><Mascot kind="caremate"/></div></Section>
  </>;
}

function WellMatePage({ locale }: { locale: Locale }) {
  const t=copy[locale]; const p=t.wellmate; const u=ui[locale];
  return <><ProductHero locale={locale} kind="wellmate" eyebrow={p.eyebrow} title={p.title} intro={p.intro}/><Section><div className="capability-grid">{p.capabilities.map((item,index)=><FeatureCard key={item} tone="well" icon={["💊","▦","♥","✓","□","▤"][index]} title={item} text={u.well.capabilityText}/>)}</div></Section><Section className="well-detail"><div className="detail-grid"><Card className="calendar-feature"><div><Badge tone="well">{u.well.calendarBadge}</Badge><h2>{p.calendarTitle}</h2><p>{p.calendarText}</p></div><BigCalendar locale={locale}/></Card><Card className="morning-feature"><div><h2>{p.morningTitle}</h2><p>{p.morningText}</p></div><div className="morning-list">{u.well.morningItems.map((item)=><span key={item}>✓ {item}</span>)}</div><Mascot kind="wellmate"/></Card></div></Section><Section className="support-strip"><div className="support-grid"><Mascot kind="wellmate"/><div><h2>{p.supportTitle}</h2><p>{p.supportText}</p><ConnectionFlow locale={locale} compact/></div><PhoneFrame type="caremate" locale={locale}/></div></Section><ProductComingSoon locale={locale} kind="wellmate"/></>;
}

function CareMatePage({ locale }: { locale: Locale }) {
  const t=copy[locale]; const p=t.caremate; const u=ui[locale];
  return <><ProductHero locale={locale} kind="caremate" eyebrow={p.eyebrow} title={p.title} intro={p.intro}/><Section className="care-consent"><div className="consent-intro"><Mascot kind="wellmate"/><div className="shield-visual small"><span>♡</span></div><div><h2>{p.consentTitle}</h2><p>{p.consentText}</p></div></div><div className="three-trust">{u.care.trustItems.map((item)=><Card key={item}><span>✓</span><h3>{item}</h3></Card>)}</div></Section><Section><div className="detail-grid"><Card className="mood-card"><div><Badge tone="care">{u.care.checkin}</Badge><h2>{p.moodTitle}</h2><p>{p.moodText}</p><ul>{u.care.moodItems.map((item)=><li key={item}>✓ {item}</li>)}</ul></div><PhoneFrame type="caremate" locale={locale}/></Card><Card className="together-card"><div><h2>{p.togetherTitle}</h2><p>{p.togetherText}</p><ConnectionFlow locale={locale} compact/></div><div className="dual-mini"><PhoneFrame type="wellmate" locale={locale}/><PhoneFrame type="caremate" locale={locale}/></div></Card></div></Section><ProductComingSoon locale={locale} kind="caremate"/></>;
}

function EcosystemPage({ locale }: { locale: Locale }) {
  const t=copy[locale]; const p=t.ecosystem; const u=ui[locale];
  return <><section className="page-hero ecosystem-hero"><div className="container"><Breadcrumb locale={locale} page="ecosystem" label={t.nav.ecosystem}/><div className="ecosystem-head"><div><Badge>{p.eyebrow}</Badge><h1>{p.title}</h1><p>{p.intro}</p><div className="principle-row"><span>✓ {u.ecosystem.principles[0]}</span><span>▣ {u.ecosystem.principles[1]}</span><span>♡ {u.ecosystem.principles[2]}</span></div></div><ConnectionFlow locale={locale}/></div></div></section><Section className="event-flow"><div className="section-heading centered"><h2>{p.flowTitle}</h2></div><div className="event-grid"><Card className="event-card well-event"><Badge tone="well">1 · WellMate</Badge><PhoneFrame type="wellmate" locale={locale}/><strong>{p.wellEvent}</strong></Card><Card className="core-event"><Badge>2 · LifeMate</Badge><span className="brand-mark big"><i/><i/></span>{p.coreSteps.map((step)=><span key={step}>✓ {step}</span>)}</Card><Card className="event-card care-event"><Badge tone="care">3 · CareMate</Badge><PhoneFrame type="caremate" locale={locale}/><strong>{p.careSummary}</strong></Card></div></Section><Section className="permission-section"><div className="permission-grid"><div className="shield-visual"><span>♡</span></div><div><Badge tone="purple">{t.common.privacyPill}</Badge><h2>{p.permissionTitle}</h2><p>{p.permissionText}</p><ul>{u.ecosystem.permissionItems.map((item)=><li key={item}>{item}</li>)}</ul></div><ConsentPanel locale={locale}/></div></Section><Section className="future-section"><div className="section-heading centered"><h2>{p.futureTitle}</h2><p>{p.futureText}</p></div><div className="future-grid">{[1,2,3].map((i)=><Card className="future-card" key={i}><span>▣</span><div className="blur-lines"><i/><i/><i/></div><Badge>{t.common.comingSoon}</Badge></Card>)}</div></Section></>;
}

function AboutPage({ locale }: { locale: Locale }) { const t=copy[locale]; const p=t.about; const u=ui[locale]; return <><SimpleHero locale={locale} page="about" title={p.title} intro={p.intro}/><Section><div className="about-grid"><Card><Badge>{u.about.storyBadge}</Badge><h2>{p.originTitle}</h2><p>{p.originText}</p></Card><Card className="founder-card"><div className="neutral-founder" aria-hidden="true"><span>HP</span></div><div><Badge>{p.founderTitle}</Badge><h2>Hamidreza Pakpour</h2><p>{p.founderText}</p></div></Card></div></Section><Section className="principles"><div className="section-heading centered"><h2>{p.principleTitle}</h2></div><div className="principle-cards">{p.principles.map((item,index)=><Card key={item}><span>{index+1}</span><h3>{item}</h3></Card>)}</div></Section></>; }

function ContactPage({ locale }: { locale: Locale }) { const t=copy[locale]; const p=t.contact; const u=ui[locale]; return <><SimpleHero locale={locale} page="contact" title={p.title} intro={p.intro}/><Section><div className="contact-card"><div><Badge>{p.emailLabel}</Badge><a className="contact-email" href="mailto:Hamidrezapakpour95@gmail.com">Hamidrezapakpour95@gmail.com</a><p>{u.contact.note}</p></div><div><h2>{p.earlyTitle}</h2><p>{p.earlyText}</p><a className="button button-primary" href={`mailto:Hamidrezapakpour95@gmail.com?subject=${encodeURIComponent("LifeMate Early Access")}`}>{t.common.earlyAccess}</a></div></div></Section></>; }

function InvestorsPage({ locale }: { locale: Locale }) { const t=copy[locale]; const p=t.investors; const u=ui[locale]; return <><SimpleHero locale={locale} page="investors" title={p.title} intro={p.intro}/><Section><Card className="investor-card"><div className="briefcase big">▣</div><div><Badge tone="purple">{u.investors.badge}</Badge><h2>{p.noteTitle}</h2><p>{p.noteText}</p><a className="button button-primary" href={`mailto:Hamidrezapakpour95@gmail.com?subject=${encodeURIComponent("LifeMate Private Meeting")}`}>{p.cta}</a></div><Mascot kind="caremate"/></Card></Section></>; }

function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy"|"terms"|"cookie" }) { const t=copy[locale]; const page: PageKey = kind === "privacy" ? "privacy" : kind === "terms" ? "terms" : "cookie-policy"; const title=kind === "privacy" ? t.legal.privacyTitle : kind === "terms" ? t.legal.termsTitle : t.legal.cookieTitle; const paragraphs=kind === "privacy" ? t.legal.privacy : kind === "terms" ? t.legal.terms : t.legal.cookie; return <><SimpleHero locale={locale} page={page} title={title} intro={t.meta[page].description}/><Section><article className="legal-card">{paragraphs.map((text,index)=><section key={text}><h2>{String(index+1).padStart(2,"0")}</h2><p>{text}</p></section>)}<aside>{t.common.disclaimer}</aside></article></Section></>; }

function ProductHero({ locale, kind, eyebrow, title, intro }: { locale: Locale; kind: "wellmate"|"caremate"; eyebrow: string; title: string; intro: string }) { const t=copy[locale]; return <section className={`page-hero product-hero ${kind}-hero`}><div className="container"><Breadcrumb locale={locale} page={kind} label={kind === "wellmate" ? "WellMate" : "CareMate"}/><div className="product-hero-grid"><div><Badge tone={kind === "wellmate" ? "well" : "care"}>{eyebrow}</Badge><h1><span className="latin-title">{kind === "wellmate" ? "WellMate" : "CareMate"}</span>{title}</h1><p>{intro}</p><div className="hero-actions"><ButtonLink href={localizedPath(locale,"contact")}>{t.common.earlyAccess}</ButtonLink><ButtonLink href={localizedPath(locale,"ecosystem")} variant="secondary">{t.common.learnMore}</ButtonLink></div></div><div className="product-hero-visual"><div className="phone-pair product-pair"><PhoneFrame type={kind} locale={locale}/><PhoneFrame type={kind} locale={locale}/></div><Mascot kind={kind}/></div></div></div></section>; }

function ProductComingSoon({ locale, kind }: { locale: Locale; kind: "wellmate"|"caremate" }) { const t=copy[locale]; const u=ui[locale]; return <Section className={`product-soon ${kind}-soon`}><div className="soon-card"><div><Badge tone={kind === "wellmate" ? "well" : "care"}>{t.common.comingSoon}</Badge><h2>{kind === "wellmate" ? u.product.wellSoonTitle : u.product.careSoonTitle}</h2><p>{u.product.soonText}</p><StoreRow locale={locale}/><ButtonLink href={localizedPath(locale,"contact")}>{t.common.earlyAccess}</ButtonLink></div><Mascot kind={kind}/></div></Section>; }

function SimpleHero({ locale, page, title, intro }: { locale: Locale; page: PageKey; title: string; intro: string }) { return <section className="page-hero simple-hero"><div className="container"><Breadcrumb locale={locale} page={page} label={title}/><div className="simple-hero-copy"><Badge>{copy[locale].nav.home} / LifeMate</Badge><h1>{title}</h1><p>{intro}</p></div></div></section>; }

function FloatingCard({ className, icon, title, value }: { className: string; icon: string; title: string; value: string }) { return <div className={`floating-card ${className}`}><span>{icon}</span><div><strong>{title}</strong><small>{value}</small></div></div>; }

function BigCalendar({ locale }: { locale: Locale }) { const c=ui[locale].calendar; const number=(value:number)=>locale === "fa" ? new Intl.NumberFormat("fa-IR", { useGrouping:false }).format(value) : String(value); return <div className="big-calendar"><div className="big-calendar-head"><strong>{c.month}</strong><span>‹ ›</span></div><div className="big-calendar-grid">{c.days.map((day,index)=><b key={`${day}-${index}`}>{day}</b>)}{Array.from({length:35},(_,i)=><span className={i===12?"green":i===14?"red":i===20?"blue":""} key={i}>{number(i+1)}</span>)}</div><div className="calendar-legend"><span><i className="dot red"/>{c.medication}</span><span><i className="dot blue"/>{c.checkup}</span><span><i className="dot green"/>{c.routine}</span></div></div>; }
