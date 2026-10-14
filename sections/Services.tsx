import { services } from "@/content/es/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFlipCard } from "@/components/ui/ServiceFlipCard";

/**
 * Servicios — título en recuadro con halo (a petición directa, con
 * captura de referencia incluida): mismo patrón de dos líneas
 * "Nuestros / Servicios" que ya usa divisualproject.com, con nuestro
 * acento azul en vez del dorado de la referencia. Grid de 3 por fila,
 * igual que ese sitio. La cara frontal de cada tarjeta solo nombra el
 * servicio; la descripción vive detrás y aparece al pulsar, con un giro
 * 3D — así la vista general es tan rápida de escanear como la del sitio
 * de referencia, y el detalle sigue a un clic de distancia.
 */
export function Services() {
  return (
    <section id="servicios" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal className="mx-auto w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-card border border-accent/50 bg-bg-secondary px-[var(--space-xl)] py-[var(--space-2xl)] text-center shadow-[0_0_80px_var(--accent-glow)]">
            <span className="type-lead text-text-secondary">{services.eyebrow}</span>
            <p className="type-display-l text-text-primary">{services.sectionTitle}</p>
          </div>
        </Reveal>

        <div className="grid gap-[var(--space-m)] tablet:grid-cols-3">
          {services.items.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <ServiceFlipCard title={service.title} description={service.description} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
