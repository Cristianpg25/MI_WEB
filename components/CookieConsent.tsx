"use client";

import { useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

/**
 * Banner RGPD — Dossier Cap. 26. Bloquea por defecto los scripts no
 * esenciales hasta la decisión del usuario. Ninguna cookie no esencial
 * está activa todavía (Cap. 30.9), pero el banner debe existir desde el
 * primer día como base para conectar Consent Mode v2 cuando se active
 * analítica real.
 *
 * La visibilidad se deriva de localStorage vía useSyncExternalStore (mismo
 * patrón SSR-safe que useMediaQuery), sin setState síncrono en un efecto.
 */
type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-updated";

function applyConsent(consent: ConsentCategories) {
  // Punto de enganche para Google Consent Mode v2 (Cap. 26): cuando se
  // active GTM, aquí se llamaría a gtag('consent', 'update', { ... }).
  window.dispatchEvent(new CustomEvent<ConsentCategories>("consent-change", { detail: consent }));
}

function parseConsent(raw: string | null): ConsentCategories | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && "necessary" in parsed
      ? (parsed as ConsentCategories)
      : null;
  } catch {
    return null;
  }
}

function subscribeStoredConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getStoredConsent() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerStoredConsent() {
  return null;
}

function saveConsent(consent: ConsentCategories) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function CookieConsent() {
  const storedConsentRaw = useSyncExternalStore(
    subscribeStoredConsent,
    getStoredConsent,
    getServerStoredConsent
  );
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const visible = parseConsent(storedConsentRaw) === null;

  useEffect(() => {
    const parsed = parseConsent(storedConsentRaw);
    if (parsed) applyConsent(parsed);
  }, [storedConsentRaw]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Preferencias de cookies"
          className="fixed inset-x-0 bottom-0 z-[var(--z-modal)] flex justify-center px-[var(--margin-mobile)] pb-[var(--space-m)] tablet:px-[var(--margin-tablet)] desktop:px-[var(--margin-desktop)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: DURATION.reveal, ease: EASE.outSoft }}
        >
          <div className="w-full max-w-2xl rounded-card border border-border-visible bg-bg-secondary p-[var(--space-l)] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <p className="type-body text-text-primary">
              Usamos cookies necesarias para que la web funcione y, solo con tu permiso, cookies de
              analítica para entender cómo mejorarla. Puedes cambiar tu decisión cuando quieras desde
              la política de cookies.
            </p>

            {expanded && (
              <div className="mt-[var(--space-m)] flex flex-col gap-[var(--space-s)] border-t border-border-subtle pt-[var(--space-m)]">
                <label className="flex items-center justify-between gap-[var(--space-m)]">
                  <span className="type-small text-text-secondary">Necesarias (siempre activas)</span>
                  <input type="checkbox" checked disabled className="h-4 w-4 accent-accent" />
                </label>
                <label className="flex items-center justify-between gap-[var(--space-m)]">
                  <span className="type-small text-text-secondary">Analítica</span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-4 w-4 accent-accent"
                  />
                </label>
                <label className="flex items-center justify-between gap-[var(--space-m)]">
                  <span className="type-small text-text-secondary">Marketing</span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-4 w-4 accent-accent"
                  />
                </label>
              </div>
            )}

            <div className="mt-[var(--space-m)] flex flex-wrap gap-[var(--space-xs)]">
              <Button
                variant="primary"
                onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
              >
                Aceptar todas
              </Button>
              <Button
                variant="secondary"
                onClick={() => saveConsent({ necessary: true, analytics: false, marketing: false })}
              >
                Rechazar no esenciales
              </Button>
              {expanded ? (
                <Button
                  variant="tertiary"
                  onClick={() => saveConsent({ necessary: true, analytics, marketing })}
                >
                  Guardar preferencias
                </Button>
              ) : (
                <Button variant="tertiary" onClick={() => setExpanded(true)}>
                  Configurar
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
