"use client";

import { useId, useState } from "react";
import {
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
 *
 * Diagrama radial: la empresa en el centro, las siete capacidades
 * alrededor — sustituye al acordeón vertical (demasiado texto, demasiado
 * alto) por un único gráfico interactivo. Misma geometría en todos los
 * tamaños (nunca se abandona la metáfora "todo rodea a tu empresa"): en
 * pantallas estrechas los nodos pierden la etiqueta de texto (serían
 * ilegibles a ese radio) y quedan solo como icono, con el nombre
 * accesible por aria-label y visible igualmente en el panel central al
 * seleccionarlos.
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

const ITEMS = capabilities.items;
const COUNT = ITEMS.length;
const RADIUS = 40;

function nodePosition(index: number) {
  const angle = (index / COUNT) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ITEMS[activeIndex];
  const panelId = useId();

  return (
    <section id="capacidades" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col items-center gap-[var(--space-xl)]">
        <Reveal className="w-full">
          <h2 className="type-h1 max-w-2xl text-text-primary">{capabilities.sectionTitle}</h2>
        </Reveal>

        <Reveal className="w-full">
          <div className="relative mx-auto aspect-square w-full max-w-[600px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {ITEMS.map((item, i) => {
                const { x, y } = nodePosition(i);
                const isActive = i === activeIndex;
                return (
                  <line
                    key={item.id}
                    x1={50}
                    y1={50}
                    x2={x}
                    y2={y}
                    stroke={isActive ? "var(--accent)" : "var(--border-visible)"}
                    strokeWidth={isActive ? 0.4 : 0.2}
                    className="transition-[stroke,stroke-width] duration-[var(--duration-hover)]"
                  />
                );
              })}
            </svg>

            <div
              id={panelId}
              role="status"
              aria-live="polite"
              className="absolute left-1/2 top-1/2 flex w-[56%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[var(--space-2xs)] rounded-card border border-border-visible bg-bg-secondary px-[var(--space-m)] py-[var(--space-m)] text-center"
            >
              <span className="type-eyebrow text-accent">Tu empresa</span>
              <p className="type-label text-text-primary tablet:hidden">{active.title}</p>
              <p className="type-h4 hidden text-text-primary tablet:block">{active.title}</p>
              <p className="type-caption hidden text-text-secondary tablet:block">{active.description}</p>
            </div>

            {ITEMS.map((item, i) => {
              const { x, y } = nodePosition(i);
              const Icon = ICONS[item.id] ?? Workflow;
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={panelId}
                  aria-label={item.title}
                  onClick={() => setActiveIndex(i)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[var(--space-2xs)]"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border bg-bg-elevated transition-colors duration-[var(--duration-hover)] tablet:h-12 tablet:w-12",
                      isActive ? "border-accent" : "border-border-visible"
                    )}
                  >
                    <Icon
                      className={cn("h-4 w-4 tablet:h-5 tablet:w-5", isActive ? "text-accent" : "text-text-tertiary")}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className={cn(
                      "type-caption hidden max-w-[7rem] text-center tablet:block",
                      isActive ? "text-text-primary" : "text-text-tertiary"
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
