import { capabilities } from "@/content/es/capabilities";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityVisual } from "@/components/animations/CapabilityVisual";
import { cn } from "@/lib/utils";

/**
 * Capacidades del Sistema — Dossier Cap. 11 + Anexo B / Blueprint 4.4.
 * Siete capacidades (la séptima añadida por el Anexo B), layout de dos
 * columnas alternando el lado del visual entre pares e impares para que
 * la sección "respire" (Cap. 17 — modular pero no repetitivo).
 */
export function Capabilities() {
  return (
    <section id="capacidades" className="relative bg-bg-primary py-[var(--space-3xl)]">
      <Container className="flex flex-col gap-[var(--space-3xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{capabilities.sectionTitle}</h2>
        </Reveal>

        <div className="flex flex-col gap-[var(--space-2xl)]">
          {capabilities.items.map((capability, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={capability.id}>
                <div className="grid items-center gap-[var(--space-xl)] desktop:grid-cols-2">
                  <div className={cn(reversed && "desktop:order-2")}>
                    <CapabilityVisual id={capability.id} />
                  </div>
                  <div className={cn("flex flex-col gap-[var(--space-s)]", reversed && "desktop:order-1")}>
                    <Eyebrow>Capacidad {String(i + 1).padStart(2, "0")}</Eyebrow>
                    <h3 className="type-h2 text-text-primary">{capability.title}</h3>
                    <p className="type-body-lg text-text-secondary">{capability.description}</p>
                    <dl className="mt-[var(--space-s)] flex flex-col gap-[var(--space-xs)] border-t border-border-subtle pt-[var(--space-s)]">
                      <div>
                        <dt className="type-label text-text-tertiary">Problema</dt>
                        <dd className="type-small text-text-secondary">{capability.problem}</dd>
                      </div>
                      <div>
                        <dt className="type-label text-text-tertiary">Beneficio</dt>
                        <dd className="type-small text-text-secondary">{capability.benefit}</dd>
                      </div>
                      <div>
                        <dt className="type-label text-text-tertiary">Resultado</dt>
                        <dd className="type-small text-text-secondary">{capability.result}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="type-h3 max-w-2xl text-text-primary">{capabilities.closingStatement}</p>
        </Reveal>
      </Container>
    </section>
  );
}
