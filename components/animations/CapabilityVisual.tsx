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
import { cn } from "@/lib/utils";
import { NodeNetwork } from "./NodeNetwork";

/**
 * Visual abstracto por capacidad — Dossier Cap. 11 (prohíbe mockups,
 * dashboards o capturas) / Blueprint Cap. 4.4. Reutiliza el mismo motor de
 * nodos que el resto de la web (Cap. 16 — "un único lenguaje visual") con
 * una semilla propia por capacidad, más un glifo lineal minimalista
 * (Cap. 22.11) como único elemento distintivo — nunca iconografía de
 * robots ni "cerebros digitales" (prohibido explícitamente, Cap. 22).
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

const SEEDS: Record<string, number> = {
  "responde-sola": 101,
  "trabaja-sin-intervencion": 202,
  "informacion-unificada": 303,
  "decide-con-informacion": 404,
  "mas-visibilidad": 505,
  "escala-sin-caos": 606,
  "herramienta-a-medida": 707,
};

interface CapabilityVisualProps {
  id: string;
  className?: string;
}

export function CapabilityVisual({ id, className }: CapabilityVisualProps) {
  const Icon = ICONS[id] ?? Workflow;
  const seed = SEEDS[id] ?? 42;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border-subtle bg-bg-secondary",
        className
      )}
    >
      <NodeNetwork variant="stable" seed={seed} nodeCount={16} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border-visible bg-bg-elevated/80 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
