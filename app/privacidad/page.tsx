import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Política de privacidad — ${siteConfig.brandName}`,
};

const PENDING_NOTICE =
  "Este texto sigue una estructura RGPD estándar y está pendiente de revisión por un profesional legal antes de su publicación definitiva.";

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad" updatedAt="17 de agosto de 2026">
      <p className="type-small rounded-card border border-border-visible bg-bg-secondary p-[var(--space-m)] text-text-tertiary">
        {PENDING_NOTICE}
      </p>

      <h2 className="type-h3 text-text-primary">1. Responsable del tratamiento</h2>
      <p>
        [Razón social pendiente], con NIF/CIF [NIF/CIF pendiente]. Correo de contacto:{" "}
        {siteConfig.contactEmail}.
      </p>

      <h2 className="type-h3 text-text-primary">2. Finalidad del tratamiento</h2>
      <p>
        Gestionar las consultas recibidas a través del correo de contacto, el asistente conversacional
        del sitio y la reserva de reuniones (Calendly), así como, únicamente si el usuario lo consiente,
        analizar el uso del sitio con fines estadísticos.
      </p>

      <h2 className="type-h3 text-text-primary">3. Legitimación</h2>
      <p>
        El consentimiento del interesado, otorgado al enviar sus datos, interactuar con el asistente
        conversacional o aceptar cookies no esenciales en el banner correspondiente.
      </p>

      <h2 className="type-h3 text-text-primary">4. Plazo de conservación</h2>
      <p>[Plazos de conservación pendientes de definir en la revisión legal].</p>

      <h2 className="type-h3 text-text-primary">5. Destinatarios</h2>
      <p>
        Los datos no se ceden a terceros salvo obligación legal. Se emplean proveedores tecnológicos
        (alojamiento, Calendly, proveedor de IA del asistente conversacional) que actúan como encargados
        del tratamiento conforme al artículo 28 RGPD.
      </p>

      <h2 className="type-h3 text-text-primary">6. Derechos de las personas interesadas</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a {siteConfig.contactEmail}.
      </p>

      <h2 className="type-h3 text-text-primary">7. Conversaciones con el asistente virtual</h2>
      <p>
        Las conversaciones con el asistente no se utilizan para entrenar modelos de terceros ni se
        conservan de forma indefinida. Si en el futuro se decide guardar un histórico anonimizado para
        mejorar las respuestas, esta política se actualizará antes de activarlo.
      </p>
    </LegalLayout>
  );
}
