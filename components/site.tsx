import Image from "next/image";
import Link from "next/link";
import { Accordion, MobileMenu, ProductModal, ThemeToggle } from "./client";
import { copy, ui } from "@/lib/content";
import { localizedPath, type Locale, type PageKey } from "@/lib/site";

export function Logo({ locale }: { locale: Locale }) {
  return <Link className="brand" href={localizedPath(locale, "home")} aria-label="LifeMate home"><span className="brand-mark" aria-hidden="true"><i /><i /></span><strong>LifeMate</strong></Link>;
}

export function Header({ locale, page }: { locale: Locale; page: PageKey }) {
  const t = copy[locale];
  const u = ui[locale];
  const otherLocale: Locale = locale === "fa" ? "en" : "fa";
  const nav: { page: PageKey; label: string }[] = [
    { page: "home", label: t.nav.home }, { page: "ecosystem", label: t.nav.ecosystem }, { page: "wellmate", label: t.nav.wellmate }, { page: "caremate", label: t.nav.caremate }, { page: "about", label: t.nav.story }, { page: "contact", label: t.nav.contact }
  ];
  const navLinks = nav.map((item) => <Link key={item.page} className={page === item.page ? "active" : ""} href={localizedPath(locale, item.page)}>{item.label}</Link>);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo locale={locale} />
        <nav className="desktop-nav" aria-label={u.aria.primaryNavigation}>{navLinks}</nav>
        <div className="header-actions">
          <Link className="language-switch" href={localizedPath(otherLocale, page)} hrefLang={otherLocale}>{otherLocale.toUpperCase()}</Link>
          <ThemeToggle label={u.aria.themeToggle} />
          <ProductModal buttonLabel={t.common.products} closeLabel={t.common.close}>
            <div className="product-picker">
              <Link href={localizedPath(locale, "wellmate")}><span className="picker-icon well">W</span><div><strong>WellMate</strong><small>{u.picker.wellSubtitle}</small></div><span>{u.picker.arrow}</span></Link>
              <Link href={localizedPath(locale, "caremate")}><span className="picker-icon care">C</span><div><strong>CareMate</strong><small>{u.picker.careSubtitle}</small></div><span>{u.picker.arrow}</span></Link>
            </div>
          </ProductModal>
          <MobileMenu label={u.aria.openMenu}><nav aria-label={u.aria.mobileMenu}>{navLinks}</nav></MobileMenu>
        </div>
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const u = ui[locale];
  return <footer className="footer"><div className="container footer-grid"><div><Logo locale={locale} /><p>{u.footer.description}</p></div><div><strong>{u.footer.products}</strong><Link href={localizedPath(locale,"wellmate")}>WellMate</Link><Link href={localizedPath(locale,"caremate")}>CareMate</Link></div><div><strong>{u.footer.company}</strong><Link href={localizedPath(locale,"about")}>{t.nav.story}</Link><Link href={localizedPath(locale,"investors")}>{u.footer.partnerships}</Link><Link href={localizedPath(locale,"contact")}>{t.nav.contact}</Link></div><div><strong>{u.footer.legal}</strong><Link href={localizedPath(locale,"privacy")}>{u.footer.privacy}</Link><Link href={localizedPath(locale,"terms")}>{u.footer.terms}</Link><Link href={localizedPath(locale,"cookie-policy")}>{u.footer.cookie}</Link></div></div><div className="container footer-bottom"><p>{t.common.disclaimer}</p><span>© 2026 LifeMate</span></div></footer>;
}

export function PageShell({ locale, page, children }: { locale: Locale; page: PageKey; children: React.ReactNode }) {
  return <><a className="skip-link" href="#main">{ui[locale].aria.skip}</a><Header locale={locale} page={page} /><main id="main">{children}</main><Footer locale={locale} /></>;
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  return <Link className={`button button-${variant}`} href={href}>{children}</Link>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "well" | "care" | "neutral" | "purple" }) { return <span className={`badge badge-${tone}`}>{children}</span>; }
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <article className={`card ${className}`}>{children}</article>; }
export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) { return <section className={`section ${className}`} id={id}><div className="container">{children}</div></section>; }

export function Mascot({ kind, alt = "" }: { kind: "wellmate" | "caremate"; alt?: string }) {
  const src = kind === "caremate" ? "/images/mascots/caremate.svg" : "/images/mascots/wellmate.webp";
  return <Image className={`mascot mascot-${kind}`} src={src} alt={alt} width={kind === "wellmate" ? 763 : 900} height={1200} sizes="(max-width: 520px) 100px, (max-width: 900px) 160px, 240px" />;
}

export function DownloadBadge({ store, comingSoon }: { store: string; comingSoon: string }) {
  return <span className="download-badge" aria-disabled="true"><span className="store-mark" aria-hidden="true">◈</span><span><small>{store}</small><strong>{comingSoon}</strong></span><i>{comingSoon}</i></span>;
}

export function PhoneFrame({ type, locale, dark = false }: { type: "wellmate" | "caremate"; locale: Locale; dark?: boolean }) {
  const u = ui[locale];
  return <div className={`phone-frame phone-${type} ${dark ? "phone-dark" : ""}`} aria-label={type === "wellmate" ? u.aria.wellPhone : u.aria.carePhone}><div className="phone-bezel"><span className="dynamic-island" /><div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>{type === "wellmate" ? <WellMateScreen locale={locale} /> : <CareMateScreen locale={locale} />}</div></div>;
}

function WellMateScreen({ locale }: { locale: Locale }) {
  const p = ui[locale].phone.well;
  const days = ui[locale].calendar.days;
  const number = (value: number) => locale === "fa" ? new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(value) : String(value);
  return <div className="app-screen well-screen" dir={locale === "fa" ? "rtl" : "ltr"}><div className="app-title"><span className="mini-mascot">●</span><strong>{p.title}</strong><span>⋮</span></div><div className="calendar-card"><div className="calendar-head"><b>{p.calendarMonth}</b><span>‹  ›</span></div><div className="calendar-grid">{days.map((day,index)=><span className="day-name" key={`${day}-${index}`}>{day}</span>)}{Array.from({length:28},(_,i)=><span className={i===12?"selected":i===14?"alert-day":""} key={i}>{number(i+1)}</span>)}</div></div><AppRow icon="💊" title={p.vitamin} meta={p.vitaminMeta} done /><AppRow icon="🩺" title={p.cardiology} meta={p.cardiologyMeta} /><AppRow icon="🚶" title={p.walk} meta={p.walkMeta} /><div className="phone-nav"><span className="active">⌂</span><span>▦</span><span>♡</span><span>☷</span></div></div>;
}

function CareMateScreen({ locale }: { locale: Locale }) {
  const p = ui[locale].phone.care;
  return <div className="app-screen care-screen" dir={locale === "fa" ? "rtl" : "ltr"}><div className="app-title"><span className="mini-mascot care">♥</span><strong>{p.title}</strong><span>⋮</span></div><div className="person-card"><span className="avatar">{p.personInitial}</span><div><small>{p.personKicker}</small><strong>{p.personName}</strong></div><span className="online-dot">●</span></div><div className="calendar-card compact-calendar"><div className="calendar-head"><b>{p.today}</b><span>{p.calendarMonth}</span></div><div className="care-summary"><span>✓</span><div><small>{p.morningMedication}</small><strong>{p.done}</strong></div><time>08:00</time></div></div><AppRow icon="💊" title={p.vitamin} meta={p.vitaminMeta} done /><AppRow icon="♡" title={p.mood} meta={p.moodMeta} done /><div className="family-summary"><strong>{p.familyHealth}</strong><div><span>3</span><small>{p.events}</small></div></div><div className="phone-nav"><span className="active">⌂</span><span>♙</span><span>♡</span><span>▦</span></div></div>;
}

function AppRow({ icon, title, meta, done }: { icon: string; title: string; meta: string; done?: boolean }) {
  return <div className="app-row"><span className="app-row-icon">{icon}</span><div><strong>{title}</strong><small>{meta}</small></div>{done ? <span className="done-dot">✓</span> : <span>›</span>}</div>;
}

export function ConnectionFlow({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale].ecosystem;
  return <div className={`connection-flow ${compact ? "compact" : ""}`}><div className="flow-node flow-well"><span>✓</span><strong>WellMate</strong>{!compact && <small>{t.wellEvent}</small>}</div><div className="flow-line"><i /></div><div className="flow-core"><span className="brand-mark" aria-hidden="true"><i/><i/></span><strong>LifeMate</strong>{!compact && <small>{ui[locale].ecosystem.connectionCore}</small>}</div><div className="flow-line"><i /></div><div className="flow-node flow-care"><span>♡</span><strong>CareMate</strong>{!compact && <small>{t.careSummary}</small>}</div></div>;
}

export function ConsentPanel({ locale }: { locale: Locale }) {
  const c = ui[locale].consent;
  return <div className="consent-panel"><div><strong>{c.title}</strong><small>{c.subtitle}</small></div><label><span>{c.share}</span><b>{c.shareValue}</b></label><label><span>{c.with}</span><b>{c.withValue}</b></label><label><span>{c.duration}</span><b>{c.durationValue}</b></label><div className="toggle-row"><span>{c.active}</span><span className="fake-toggle" aria-hidden="true"><i /></span></div></div>;
}

export function StoreRow({ locale }: { locale: Locale }) {
  const comingSoon = copy[locale].common.comingSoon;
  const stores = ui[locale].stores;
  return <div className="store-row"><DownloadBadge store="Google Play" comingSoon={comingSoon} /><DownloadBadge store={stores.bazaar} comingSoon={comingSoon} /><DownloadBadge store={stores.myket} comingSoon={comingSoon} /></div>;
}

export function FeatureCard({ icon, title, text, tone = "neutral" }: { icon: string; title: string; text: string; tone?: "well" | "care" | "neutral" | "purple" }) {
  return <Card className={`feature-card tone-${tone}`}><span className="feature-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p></Card>;
}

export function FAQ({ locale }: { locale: Locale }) {
  const t = copy[locale].home;
  return <Section className="faq-section"><div className="section-heading centered"><Badge>{ui[locale].faqBadge}</Badge><h2>{t.faqTitle}</h2></div><Accordion items={t.faqs} /></Section>;
}

export function Breadcrumb({ locale, label }: { locale: Locale; page: PageKey; label: string }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={localizedPath(locale,"home")}>{copy[locale].nav.home}</Link><span>›</span><span aria-current="page">{label}</span></nav>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input className="input" {...props} />; }
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className="textarea" {...props} />; }
export function FormError({ children }: { children: React.ReactNode }) { return <p className="form-error" role="alert">{children}</p>; }
export function Loading({ label = "Loading" }: { label?: string }) { return <div className="loading" role="status"><span className="spinner" aria-hidden="true" />{label}</div>; }
export function EmptyState({ title, text }: { title: string; text: string }) { return <div className="empty-state"><span>◇</span><h3>{title}</h3><p>{text}</p></div>;
