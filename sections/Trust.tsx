import { trust } from "@/content/es/trust";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Confianza — reducida a petición directa del cliente a un título + una
 * fila de frases cortas. Nada de acordeón ni bloques con párrafos: ver
 * nota en content/es/trust.ts.
 */
export function Trust() {
  return (
    <section id="confianza" className="relative bg-bg-primary py-[var(--space-l)]">
      <Container className="flex flex-col items-center gap-[var(--space-m)] text-center">
        <Reveal>
          <h2 className="type-h4 max-w-xl text-text-secondary">{trust.sectionTitle}</h2>
        </Reveal>

        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-[var(--space-m)] gap-y-[var(--space-xs)]">
            {trust.pills.map((pill, i) => (
              <li key={pill} className="flex items-center gap-[var(--space-m)]">
                <span className="type-small text-text-primary">{pill}</span>
                {i < trust.pills.length - 1 && (
                  <span className="hidden h-1 w-1 rounded-pill bg-border-visible tablet:block" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
