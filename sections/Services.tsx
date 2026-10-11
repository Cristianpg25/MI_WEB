import {
  GitMerge,
  Layers,
  MessageCircle,
  Palette,
  Puzzle,
  Radar,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/content/es/services";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Servicios — sección nueva, deliberadamente NO narrativa: un grid
 * escaneable en lugar de scroll-jacking, justo después del Hero, para que
 * cualquier visitante entienda en segundos qué hacemos antes de decidir si
 * sigue el recorrido narrativo completo. Mismo lenguaje del Design System
 * (card, iconografía lineal — Cap. 22.11), sin canvas de nodos por tarjeta:
 * esta sección prioriza velocidad de lectura sobre cinemática.
 */
const ICONS: Record<string, LucideIcon> = {
  "atencion-automatizada": MessageCircle,
  "automatizacion-procesos": Workflow,
  "integracion-sistemas": GitMerge,
  "analisis-decisiones": Target,
  "visibilidad-seo": Radar,
  "software-a-medida": Puzzle,
  "arquitectura-escalable": Layers,
  "diseno-audiovisual": Palette,
};

export function Services() {
  return (
    <section id="servicios" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal className="flex flex-col gap-[var(--space-s)]">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2 className="type-h1 max-w-2xl text-text-primary">{services.sectionTitle}</h2>
          <p className="type-body-lg max-w-xl text-text-secondary">{services.subtitle}</p>
        </Reveal>

        <div className="grid gap-[var(--space-m)] tablet:grid-cols-2 desktop:grid-cols-3">
          {services.items.map((service, i) => {
            const Icon = ICONS[service.id] ?? Workflow;
            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-[var(--space-m)] rounded-card border border-border-subtle bg-bg-secondary p-[var(--space-l)] transition-colors duration-[var(--duration-hover)] hover:border-border-visible">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-visible bg-bg-elevated">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="type-h3 text-text-primary">{service.title}</h3>
                  <p className="type-small text-text-tertiary">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
