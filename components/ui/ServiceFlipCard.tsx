"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceFlipCardProps {
  title: string;
  description: string;
}

/**
 * Tarjeta de servicio con giro 3D al pulsar: la cara frontal solo nombra
 * el servicio (como en divisualproject.com), la trasera revela la
 * descripción. Transform CSS puro, sin librería — la rotación es
 * contenido (texto distinto detrás), no decoración, así que se mantiene
 * también con reduced motion, solo sin la transición animada. El indicador
 * en la esquina (un + / − dentro de un círculo fino, sin texto) da la
 * pista de que se puede interactuar sin ocupar una línea aparte.
 */
export function ServiceFlipCard({ title, description }: ServiceFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      aria-pressed={flipped}
      aria-label={flipped ? `${title}. Pulsa para volver.` : `${title}. Pulsa para ver la descripción.`}
      className="block h-full w-full text-left [perspective:1400px]"
    >
      <div
        className={cn(
          "relative min-h-[11rem] w-full transition-transform duration-500 ease-[var(--ease-out-soft)] motion-reduce:transition-none [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div className="group absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-xs)] rounded-card border border-border-subtle bg-bg-secondary p-[var(--space-l)] text-center transition-colors duration-[var(--duration-hover)] [backface-visibility:hidden] hover:border-border-visible">
          <h3 className="type-h3 uppercase tracking-wide text-accent">{title}</h3>
          <span className="h-px w-10 bg-border-visible" aria-hidden="true" />
          <span className="absolute bottom-[var(--space-s)] right-[var(--space-s)] flex h-7 w-7 items-center justify-center rounded-full border border-border-visible text-text-tertiary transition-colors duration-[var(--duration-hover)] group-hover:border-accent group-hover:text-accent">
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>

        <div className="group absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-xs)] rounded-card border border-border-visible bg-bg-elevated p-[var(--space-l)] text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="type-small text-text-secondary">{description}</p>
          <span className="absolute bottom-[var(--space-s)] right-[var(--space-s)] flex h-7 w-7 items-center justify-center rounded-full border border-border-visible text-text-tertiary transition-colors duration-[var(--duration-hover)] group-hover:border-accent group-hover:text-accent">
            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
      </div>
    </button>
  );
}
