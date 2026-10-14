import { services } from "@/content/es/services";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFlipCard } from "@/components/ui/ServiceFlipCard";

/**
 * Servicios — grid de 3 por fila, igual que divisualproject.com (a
 * petición directa, con captura de referencia incluida). La cara frontal
 * de cada tarjeta solo nombra el servicio; la descripción vive detrás y
 * aparece al pulsar, con un giro 3D — así la vista general es tan rápida
 * de escanear como la del sitio de referencia, y el detalle sigue a un
 * clic de distancia para quien lo quiera.
 */
export function Services() {
  return (
    <section id="servicios" className="relative bg-bg-primary py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal className="flex flex-col gap-[var(--space-s)]">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2 className="type-h1 max-w-2xl text-text-primary">{services.sectionTitle}</h2>
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
