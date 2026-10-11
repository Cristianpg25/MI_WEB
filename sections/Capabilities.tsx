"use client";

import { useState } from "react";
import {
  ChevronDown,
  GitMerge,
  Layers,
  MessageCircle,
  Puzzle,
  Radar,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { capabilities } from "@/content/es/capabilities";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Capacidades del Sistema — Dossier Cap. 11 + Anexo B / Blueprint 4.4.
 * Siete capacidades (la séptima añadida por el Anexo B).
 *
 * Lista de acordeón en vez de siete bloques a pantalla completa: la misma
 * profundidad (problema → beneficio → resultado) sigue disponible, pero
 * bajo demanda, no forzando el scroll — Servicios ya da la vista rápida,
 * esta sección es la capa de profundidad para quien quiera abrirla.
 */
const ICONS: Record<string, LucideIcon> = {
  "responde-sola": MessageCircle,
  "trabaja-sin-intervencion": Workflow,
  "informacion-unificada": GitMerge,
  "decide-con-informacion": Target,
  "mas-visibilidad": Radar,
  "escala-sin-caos": Layers,
  "herramienta-a-medida": Puzzle,
};

type Capability = (typeof capabilities.items)[number];

export function Capabilities() {
  return (
    <section id="capacidades" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{capabilities.sectionTitle}</h2>
        </Reveal>

        <Reveal>
          <div className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {capabilities.items.map((capability) => (
              <CapabilityRow key={capability.id} capability={capability} />
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="type-h4 max-w-2xl text-text-secondary">{capabilities.closingStatement}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function CapabilityRow({ capability }: { capability: Capability }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[capability.id] ?? Workflow;
  const panelId = `capability-panel-${capability.id}`;
  const buttonId = `capability-trigger-${capability.id}`;

  return (
    <div>
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-[var(--space-m)] py-[var(--space-m)] text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-visible bg-bg-elevated">
          <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="flex-1">
          <span className="type-h4 block text-text-primary">{capability.title}</span>
          <span className="type-small mt-[2px] block text-text-secondary">{capability.description}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-[var(--duration-hover)]",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

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
          <dl className="grid gap-[var(--space-s)] pb-[var(--space-m)] desktop:grid-cols-3 desktop:pl-[3.25rem]">
            <div>
              <dt className="type-label text-text-tertiary">Problema</dt>
              <dd className="type-small mt-[var(--space-2xs)] text-text-secondary">{capability.problem}</dd>
            </div>
            <div>
              <dt className="type-label text-text-tertiary">Beneficio</dt>
              <dd className="type-small mt-[var(--space-2xs)] text-text-secondary">{capability.benefit}</dd>
            </div>
            <div>
              <dt className="type-label text-text-tertiary">Resultado</dt>
              <dd className="type-small mt-[var(--space-2xs)] text-text-secondary">{capability.result}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
