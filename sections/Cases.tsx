import { FileSearch, Send, Table2 } from "lucide-react";
import { cases } from "@/content/es/cases";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NodeNetwork } from "@/components/animations/NodeNetwork";

/**
 * Casos de Transformación — Dossier Cap. 12 + Anexo A / Blueprint 4.5.
 * Solo se publica el único caso confirmado como real y listo; sin nombrar
 * el sector (anonimización reforzada a petición del cliente). Reescrito
 * para ser más corto, más visual y más concreto sobre dónde intervino la
 * agencia: comparación antes/después, 3 pasos de la intervención con
 * icono, y las cifras reales como elementos visuales en vez de enterradas
 * en párrafos.
 */
const STEP_ICONS = [FileSearch, Table2, Send];

export function Cases() {
  return (
    <section id="casos" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{cases.sectionTitle}</h2>
        </Reveal>

        {cases.items.map((item) => (
          <Reveal key={item.id}>
            <article className="flex flex-col gap-[var(--space-xl)]">
              <div className="grid items-center gap-[var(--space-xl)] desktop:grid-cols-2">
                <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle">
                  <div className="relative aspect-square bg-bg-secondary">
                    <NodeNetwork variant="fragmenting" seed={11} nodeCount={20} />
                    <span className="type-caption absolute bottom-[var(--space-xs)] left-[var(--space-xs)] text-text-tertiary">
                      Antes
                    </span>
                  </div>
                  <div className="relative aspect-square bg-bg-secondary">
                    <NodeNetwork variant="stable" seed={12} nodeCount={20} />
                    <span className="type-caption absolute bottom-[var(--space-xs)] left-[var(--space-xs)] text-text-tertiary">
                      Después
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-[var(--space-s)]">
                  <Eyebrow>{item.tag}</Eyebrow>
                  <p className="type-body-lg text-text-secondary">{item.intro}</p>
                  <p className="type-body text-text-tertiary">{item.before}</p>
                </div>
              </div>

              <div>
                <h3 className="type-label text-text-tertiary">Dónde intervinimos</h3>
                <div className="mt-[var(--space-s)] grid gap-[var(--space-s)] tablet:grid-cols-3">
                  {item.steps.map((step, i) => {
                    const Icon = STEP_ICONS[i] ?? FileSearch;
                    return (
                      <div
                        key={step.title}
                        className="flex flex-col gap-[var(--space-xs)] rounded-card border border-border-subtle bg-bg-secondary p-[var(--space-m)]"
                      >
                        <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                        <h4 className="type-label text-text-primary">{step.title}</h4>
                        <p className="type-small text-text-secondary">{step.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-[var(--space-m)] border-y border-border-subtle py-[var(--space-m)] tablet:grid-cols-3">
                {item.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="type-h2 block text-accent">{stat.value}</span>
                    <span className="type-small text-text-tertiary">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-card border border-border-visible bg-bg-secondary p-[var(--space-m)]">
                <p className="type-body-lg text-text-primary">{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <p className="type-h4 max-w-2xl text-text-secondary">{cases.closingText}</p>
        </Reveal>
      </Container>
    </section>
  );
}
