"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { trust } from "@/content/es/trust";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Confianza — Confidence Architecture (Dossier Cap. 14 / Blueprint 4.7).
 * Cinco bloques en el orden psicológico exacto: transparencia → medición →
 * garantías → evidencia → objeciones. El bloque de evidencia no fabrica
 * cifras: remite al caso real ya mostrado en la sección anterior.
 */
export function Trust() {
  return (
    <section id="confianza" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{trust.sectionTitle}</h2>
        </Reveal>

        <Reveal>
          <Block label={trust.transparency.label}>
            <p className="type-body-lg text-text-secondary">{trust.transparency.text}</p>
          </Block>
        </Reveal>

        <Reveal>
          <Block label={trust.measurement.label}>
            <p className="type-body-lg text-text-secondary">{trust.measurement.text}</p>
          </Block>
        </Reveal>

        <Reveal>
          <Block label={trust.guarantees.label}>
            <ul className="flex flex-col gap-[var(--space-xs)]">
              {trust.guarantees.items.map((g) => (
                <li key={g} className="type-body-lg flex gap-[var(--space-xs)] text-text-secondary">
                  <span className="text-accent" aria-hidden="true">
                    —
                  </span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal>
          <Block label={trust.evidence.label}>
            <p className="type-body-lg text-text-secondary">{trust.evidence.text}</p>
          </Block>
        </Reveal>

        <Reveal>
          <Block label={trust.objections.label}>
            <div className="flex flex-col divide-y divide-border-subtle border-t border-border-subtle">
              {trust.objections.items.map((item, i) => (
                <Accordion key={item.question} question={item.question} answer={item.answer} index={i} />
              ))}
            </div>
          </Block>
        </Reveal>

        <Reveal>
          <p className="type-h4 max-w-xl text-text-primary">{trust.ctaTransition}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--space-s)] desktop:grid desktop:grid-cols-[200px_1fr] desktop:gap-[var(--space-xl)]">
      <Eyebrow>{label}</Eyebrow>
      <div>{children}</div>
    </div>
  );
}

function Accordion({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `objection-panel-${index}`;
  const buttonId = `objection-trigger-${index}`;

  return (
    <div>
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="type-body-lg flex w-full items-center justify-between gap-[var(--space-m)] py-[var(--space-s)] text-left text-text-primary"
      >
        {question}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-[var(--duration-hover)]",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {/*
        Técnica grid-template-rows (0fr → 1fr) en vez de animar `height` con
        Framer Motion: evita forzar un layout/medición por frame y es
        interrumpible — preferencia CSS > librería JS del skill de revisión
        de animaciones (Emil Kowalski / Arsenal WEB TOP).
      */}
      <div
        className="grid transition-[grid-template-rows] duration-[var(--duration-reveal)] ease-[var(--ease-out-soft)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            "overflow-hidden transition-opacity duration-[var(--duration-reveal)] ease-[var(--ease-out-soft)]",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="type-body pb-[var(--space-s)] text-text-secondary">{answer}</p>
        </div>
      </div>
    </div>
  );
}
