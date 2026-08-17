import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CalendlyPopupTrigger } from "@/components/ui/Calendly";
import { NodeNetwork } from "@/components/animations/NodeNetwork";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 opacity-50">
        <NodeNetwork variant="fragmenting" seed={404} nodeCount={30} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_80%)]" />

      <Container className="relative flex flex-col items-center gap-[var(--space-m)] text-center">
        <span className="type-eyebrow text-accent">Error 404</span>
        <h1 className="type-h1 text-text-primary">Esta página no forma parte del sistema.</h1>
        <p className="type-body-lg max-w-md text-text-secondary">
          El enlace puede haber cambiado o ya no existir. Vuelve al inicio o reserva tu diagnóstico
          directamente.
        </p>
        <div className="flex flex-wrap justify-center gap-[var(--space-s)]">
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
          <CalendlyPopupTrigger label="Reservar diagnóstico" variant="secondary" />
        </div>
      </Container>
    </div>
  );
}
