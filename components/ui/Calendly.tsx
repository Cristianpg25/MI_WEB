"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

/**
 * Integración de Calendly — Dossier Cap. 29.8 / Blueprint Cap. 7.
 * Script cargado en lazy-load bajo demanda (nunca en el <head> global):
 * el popup lo carga el propio clic del CTA de navbar; el embed inline lo
 * carga el montaje de la sección CTA final. Si NEXT_PUBLIC_CALENDLY_URL no
 * está configurado, ambos triggers caen a un `mailto:` funcional en vez de
 * quedar rotos.
 */
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
      }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (calendlyScriptPromise) return calendlyScriptPromise;

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar el widget de Calendly"));
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

function mailtoHref(subject: string) {
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`;
}

interface CalendlyPopupTriggerProps {
  label: string;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

/** CTA de navbar — popup, no saca al usuario del scroll narrativo. */
export function CalendlyPopupTrigger({ label, className, variant = "secondary" }: CalendlyPopupTriggerProps) {
  if (!siteConfig.calendlyUrl) {
    return (
      <Button href={mailtoHref(siteConfig.bookingFallbackSubject)} variant={variant} className={className}>
        {label}
      </Button>
    );
  }

  async function handleClick() {
    try {
      await loadCalendlyScript();
      window.Calendly?.initPopupWidget({ url: siteConfig.calendlyUrl });
    } catch {
      window.location.href = mailtoHref(siteConfig.bookingFallbackSubject);
    }
  }

  return (
    <Button type="button" variant={variant} className={className} onClick={handleClick}>
      {label}
    </Button>
  );
}

/** CTA final — embed inline, para que reservar se sienta parte del mismo recorrido. */
export function CalendlyInlineEmbed({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!siteConfig.calendlyUrl || !containerRef.current) return;
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return;
        window.Calendly.initInlineWidget({
          url: siteConfig.calendlyUrl,
          parentElement: containerRef.current,
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!siteConfig.calendlyUrl || failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-[var(--space-m)] rounded-card border border-border-subtle bg-bg-secondary p-[var(--space-l)] text-center",
          className
        )}
      >
        <p className="type-body text-text-secondary max-w-md">
          El calendario de reservas todavía no está conectado. Escríbenos y te respondemos para
          encontrar hueco.
        </p>
        <Button href={mailtoHref(siteConfig.bookingFallbackSubject)} variant="primary">
          Escribir para reservar
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("min-h-[700px] w-full overflow-hidden rounded-card bg-bg-secondary", className)}
    />
  );
}
