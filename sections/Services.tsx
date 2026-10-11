import { services } from "@/content/es/services";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Servicios — grid de tarjetas sin icono: título + línea divisoria fina +
 * descripción, cada tarjeta con fondo propio. Patrón tomado directamente
 * de cómo divisualproject.com estructura su sección de servicios (a
 * petición directa: "estudia como tiene las cards... y diseña algo muy
 * similar"), adaptado a nuestros 8 servicios y al Design System propio.
 */
export function Services() {
  return (
    <section id="servicios" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal className="flex flex-col gap-[var(--space-s)]">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2 className="type-h1 max-w-2xl text-text-primary">{services.sectionTitle}</h2>
          <p className="type-body-lg max-w-xl text-text-secondary">{services.subtitle}</p>
        </Reveal>

        <div className="grid gap-[var(--space-xs)] tablet:grid-cols-2 desktop:grid-cols-4">
          {services.items.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-[var(--space-s)] bg-bg-secondary p-[var(--space-l)] transition-colors duration-[var(--duration-hover)] hover:bg-bg-elevated">
                <h3 className="type-h4 uppercase tracking-wide text-text-primary">{service.title}</h3>
                <span className="h-px w-10 bg-border-visible" aria-hidden="true" />
                <p className="type-small text-text-tertiary">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
