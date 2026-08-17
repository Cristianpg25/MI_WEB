import { cases } from "@/content/es/cases";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NodeNetwork } from "@/components/animations/NodeNetwork";

/**
 * Casos de Transformación — Dossier Cap. 12 + Anexo A / Blueprint 4.5.
 * Solo se publica el único caso confirmado como real y listo. La sección
 * está pensada para sostenerse bien con uno solo: comparación antes/después
 * con dos instancias del NodeNetwork + estructura de las cinco preguntas.
 */
export function Cases() {
  return (
    <section id="casos" className="relative bg-bg-primary py-[var(--space-3xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{cases.sectionTitle}</h2>
        </Reveal>

        {cases.items.map((item) => (
          <Reveal key={item.id}>
            <article className="grid gap-[var(--space-xl)] desktop:grid-cols-2">
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

              <div className="flex flex-col gap-[var(--space-m)]">
                <Eyebrow>{item.sector}</Eyebrow>

                <div>
                  <h3 className="type-h4 text-text-primary">Quién era la empresa</h3>
                  <p className="type-body mt-[var(--space-2xs)] text-text-secondary">{item.company}</p>
                </div>
                <div>
                  <h3 className="type-h4 text-text-primary">Qué estaba ocurriendo</h3>
                  <p className="type-body mt-[var(--space-2xs)] text-text-secondary">{item.whatWasHappening}</p>
                </div>
                <div>
                  <h3 className="type-h4 text-text-primary">Qué cambió</h3>
                  <p className="type-body mt-[var(--space-2xs)] text-text-secondary">{item.whatChanged}</p>
                </div>
                <div>
                  <h3 className="type-h4 text-text-primary">Resultado</h3>
                  <p className="type-body mt-[var(--space-2xs)] text-text-secondary">{item.result}</p>
                </div>

                <div className="rounded-card border border-border-visible bg-bg-secondary p-[var(--space-m)]">
                  <h3 className="type-label text-accent">Qué permitió</h3>
                  <p className="type-body mt-[var(--space-2xs)] text-text-primary">{item.whatItAllowed}</p>
                </div>
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
