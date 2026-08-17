import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Política de cookies — ${siteConfig.brandName}`,
};

const PENDING_NOTICE =
  "Este listado se completa y revisa al final del desarrollo, según qué integraciones de analítica o marketing acaben activas (Google Consent Mode v2). Pendiente de revisión legal.";

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de cookies" updatedAt="17 de agosto de 2026">
      <p className="type-small rounded-card border border-border-visible bg-bg-secondary p-[var(--space-m)] text-text-tertiary">
        {PENDING_NOTICE}
      </p>

      <h2 className="type-h3 text-text-primary">1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
        información sobre tu visita.
      </p>

      <h2 className="type-h3 text-text-primary">2. Cookies que utilizamos actualmente</h2>
      <div className="overflow-x-auto rounded-card border border-border-subtle">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="type-label px-[var(--space-s)] py-[var(--space-xs)] text-text-primary">Nombre</th>
              <th className="type-label px-[var(--space-s)] py-[var(--space-xs)] text-text-primary">Tipo</th>
              <th className="type-label px-[var(--space-s)] py-[var(--space-xs)] text-text-primary">Finalidad</th>
              <th className="type-label px-[var(--space-s)] py-[var(--space-xs)] text-text-primary">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="type-small px-[var(--space-s)] py-[var(--space-xs)] text-text-secondary">
                cookie-consent
              </td>
              <td className="type-small px-[var(--space-s)] py-[var(--space-xs)] text-text-secondary">
                Necesaria (localStorage)
              </td>
              <td className="type-small px-[var(--space-s)] py-[var(--space-xs)] text-text-secondary">
                Guarda tu decisión sobre cookies para no volver a preguntarte
              </td>
              <td className="type-small px-[var(--space-s)] py-[var(--space-xs)] text-text-secondary">
                Hasta que la borres o cambies tu preferencia
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Todavía no hay ninguna cookie de analítica o marketing activa. Calendly y el asistente
        conversacional funcionan sin cookies de seguimiento; si en el futuro se activa analítica (GA4,
        GTM, Meta Pixel), esta tabla se actualizará y solo se cargará tras tu consentimiento explícito.
      </p>

      <h2 className="type-h3 text-text-primary">3. Cómo gestionar tus preferencias</h2>
      <p>
        Puedes cambiar tu decisión en cualquier momento desde el banner de cookies, visible al final de
        cualquier página del sitio, o escribiendo a {siteConfig.contactEmail}.
      </p>
    </LegalLayout>
  );
}
