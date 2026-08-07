"use client";

import { useEffect, useId, useRef, useState } from "react";

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useDialogA11y(open: boolean, containerRef: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      const first = containerRef.current?.querySelector<HTMLElement>(focusableSelector);
      first?.focus();
    });

    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;
      const focusable = Array.from(containerRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => !element.hasAttribute("hidden"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", keyHandler);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open, containerRef, onClose]);
}

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("lifemate-theme", next);
  };

  return (
    <button className="icon-button theme-toggle" type="button" onClick={toggle} aria-label={label}>
      <span aria-hidden="true">◐</span>
    </button>
  );
}

export function MobileMenu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mobile-menu-wrap">
      <button className="icon-button menu-button" type="button" aria-label={label} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      {open ? <div className="mobile-menu" id={id} onClick={() => setOpen(false)}>{children}</div> : null}
    </div>
  );
}

export function ProductModal({ buttonLabel, closeLabel, children }: { buttonLabel: string; closeLabel: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLElement | null>(null);
  const close = () => setOpen(false);
  useDialogA11y(open, dialogRef, close);

  return (
    <>
      <button className="button button-primary header-cta" type="button" onClick={() => setOpen(true)}>{buttonLabel}</button>
      {open ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={close}>
          <section ref={dialogRef} className="modal-card" role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-head"><h2 id={titleId}>{buttonLabel}</h2><button className="icon-button" type="button" onClick={close} aria-label={closeLabel}>×</button></div>
            {children}
          </section>
        </div>
      ) : null}
    </>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return <div className="accordion">{items.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>;
}

export function Button({ children, onClick, type = "button" }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return <button className="button button-primary" type={type} onClick={onClick}>{children}</button>;
}

export function Modal({ open, title, closeLabel, onClose, children }: { open: boolean; title: string; closeLabel: string; onClose: () => void; children: React.ReactNode }) {
  const dialogRef = useRef<HTMLElement | null>(null);
  useDialogA11y(open, dialogRef, onClose);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section ref={dialogRef} className="modal-card" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><h2>{title}</h2><button className="icon-button" type="button" onClick={onClose} aria-label={closeLabel}>×</button></div>{children}</section></div>;
}

export function Toast({ children }: { children: React.ReactNode }) { return <div className="toast" role="status" aria-live="polite">{children}</div>; }
