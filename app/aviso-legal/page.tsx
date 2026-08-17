import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Aviso legal — ${siteConfig.brandName}`,
};

const PENDING_NOTICE =
  "Este texto sigue una estructura RGPD estándar y está pendiente de revisión por un profesional legal antes de su publicación definitiva. Los datos fiscales entre corchetes son placeholders.";

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso legal" updatedAt="17 de agosto de 2026">
      <p className="type-small rounded-card border border-border-visible bg-bg-secondary p-[var(--space-m)] text-text-tertiary">
        {PENDING_NOTICE}
      </p>

      <h2 className="type-h3 text-text-primary">1. Datos identificativos</h2>
      <p>
        Titular: [Razón social pendiente]
        <br />
        NIF/CIF: [NIF/CIF pendiente]
        <br />
        Domicilio social: [Dirección pendiente]
        <br />
        Correo de contacto: {siteConfig.contactEmail}
        <br />
        Registro mercantil: [Datos de inscripción pendientes]
      </p>

      <h2 className="type-h3 text-text-primary">2. Objeto</h2>
      <p>
        Este aviso legal regula el uso del sitio web {siteConfig.domain}, cuya finalidad es informar
        sobre los servicios de {siteConfig.brandName} y facilitar el contacto con potenciales clientes.
      </p>

      <h2 className="type-h3 text-text-primary">3. Condiciones de uso</h2>
      <p>
        El acceso a este sitio web es gratuito y no requiere suscripción previa. El usuario se
        compromete a hacer un uso adecuado de los contenidos y a no emplearlos para fines ilícitos.
      </p>

      <h2 className="type-h3 text-text-primary">4. Propiedad intelectual</h2>
      <p>
        Los contenidos, el diseño y el código fuente de este sitio son titularidad de{" "}
        {siteConfig.brandName} salvo indicación contraria, y están protegidos por la normativa de
        propiedad intelectual aplicable.
      </p>

      <h2 className="type-h3 text-text-primary">5. Legislación aplicable</h2>
      <p>[Jurisdicción y fuero pendientes de definir en la revisión legal].</p>
    </LegalLayout>
  );
}
