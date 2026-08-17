/**
 * Único punto de configuración de datos específicos de la agencia.
 * Cuando lleguen los datos reales del cliente (nombre de marca, dominio,
 * email, enlace de reservas — ver tabla de bloqueantes al cierre del
 * Dossier), solo hay que tocar este archivo o las variables de entorno.
 *
 * `brandName` usa "NODO" como placeholder de desarrollo: el nombre real de
 * marca todavía no ha sido entregado por el cliente. Se eligió por
 * coherencia temporal con el lenguaje visual del sitio (sistema de nodos,
 * Cap. 22.1), no como propuesta de naming definitiva.
 */
export const siteConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "NODO",
  brandTagline:
    "Sistemas inteligentes para empresas que quieren dejar de perder tiempo y dinero.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hola@example.com",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  bookingFallbackSubject: "Quiero reservar un diagnóstico",
} as const;
