"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navbar } from "@/content/es/navbar";
import { siteConfig } from "@/lib/site-config";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CalendlyPopupTrigger } from "@/components/ui/Calendly";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-navbar)] flex justify-center px-[var(--margin-mobile)] pt-[var(--space-s)] tablet:px-[var(--margin-tablet)] desktop:px-[var(--margin-desktop)]">
      <div
        className={cn(
          "flex w-full max-w-[var(--container-max)] origin-top items-center justify-between rounded-pill border border-border-subtle bg-bg-secondary/70 px-[var(--space-l)] py-[var(--space-xs)] backdrop-blur-md transition-transform duration-[var(--duration-hover)] ease-[var(--ease-standard)]",
          scrolled && "scale-[0.96]"
        )}
      >
        <a href="#hero" className="type-label text-text-primary">
          {siteConfig.brandName}
        </a>

        <nav className="hidden items-center gap-[var(--space-l)] desktop:flex">
          {navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="type-label text-text-secondary transition-colors duration-[var(--duration-hover)] hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden desktop:block">
          <CalendlyPopupTrigger label={navbar.cta} variant="secondary" />
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-text-primary desktop:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[var(--z-overlay)] flex flex-col items-center justify-center gap-[var(--space-l)] bg-bg-primary desktop:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASE.outSoft }}
          >
            <button
              type="button"
              className="absolute right-[var(--margin-mobile)] top-[var(--space-l)] text-text-primary"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {navbar.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-h3 text-text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <CalendlyPopupTrigger label={navbar.cta} variant="primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
