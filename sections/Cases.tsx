import { CheckCircle2, ChevronLeft, Database, Mail, ScanText, type LucideIcon } from "lucide-react";
import { cases } from "@/content/es/cases";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NodeNetwork } from "@/components/animations/NodeNetwork";

/**
 * Ejemplo ilustrativo del coste de un proceso manual — ver nota en
 * content/es/cases.ts. Deliberadamente corto: una frase, un par de
 * visuales de apoyo y las cifras como elemento gráfico principal.
 */
const FLOW_ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  "scan-text": ScanText,
  database: Database,
  "check-circle": CheckCircle2,
};

// El array se recorre ya invertido: el paso 1 queda a la derecha y el
// último a la izquierda, para que el diagrama se lea de derecha a
// izquierda (a petición directa) sin depender de trucos de flex-direction.
const flowRightToLeft = [...cases.flow].reverse();

export function Cases() {
  return (
    <section id="casos" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{cases.sectionTitle}</h2>
        </Reveal>

        <Reveal>
          <div className="grid items-center gap-[var(--space-xl)] desktop:grid-cols-2">
            <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle">
              <div className="relative aspect-[4/3] bg-bg-secondary">
                <NodeNetwork variant="fragmenting" seed={11} nodeCount={18} />
              </div>
              <div className="relative aspect-[4/3] bg-bg-secondary">
                <NodeNetwork variant="stable" seed={12} nodeCount={18} />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-s)]">
              <Eyebrow>{cases.tag}</Eyebrow>
              <p className="type-body-lg text-text-secondary">{cases.intro}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-[var(--space-m)] border-y border-border-subtle py-[var(--space-m)] tablet:grid-cols-3">
            {cases.stats.map((stat) => (
              <div key={stat.label}>
                <span className="type-h1 block text-accent">{stat.value}</span>
                <span className="type-small text-text-tertiary">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-start justify-center gap-x-[var(--space-xs)] gap-y-[var(--space-m)]">
            {flowRightToLeft.map((step, i) => {
              const Icon = FLOW_ICONS[step.icon] ?? Database;
              return (
                <div key={step.label} className="flex items-center gap-[var(--space-xs)]">
                  <div className="flex flex-col items-center gap-[var(--space-2xs)]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-visible bg-bg-elevated">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="type-caption max-w-[6rem] text-center text-text-tertiary">{step.label}</span>
                  </div>
                  {i < flowRightToLeft.length - 1 && (
                    <ChevronLeft className="h-5 w-5 shrink-0 text-text-tertiary" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
