/**
 * Casos de Transformación — Dossier Cap. 12. La sección visible se
 * eliminó por completo a petición directa del cliente (ver conversación:
 * título, recuadro visual, tag, cifras y gráfico explicativo, todo
 * fuera). Este contenido ya no se renderiza en ningún sitio: se conserva
 * únicamente como base de conocimiento del chatbot. Importante: nunca fue
 * (ni debe presentarse en el chatbot como) un caso real de cliente — es
 * un ejemplo ilustrativo, mismo principio de honestidad que ya aplica al
 * contador de la sección Problema (Cap. 9).
 */
export const cases = {
  sectionTitle: "Así de rápido se acumula el coste de un proceso manual.",
  tag: "Caso de uso",
  intro:
    "Una empresa recibe más de 300 informes en PDF cada mes — cada uno revisado y copiado a mano, uno por uno.",
  stats: [
    { value: "+300", label: "PDFs al mes" },
    { value: "~30h", label: "perdidas copiando datos" },
    { value: "~450€", label: "coste mensual estimado" },
  ],
  // Flujo del proceso automatizado — se lee de derecha a izquierda (a
  // petición directa), icono + etiqueta muy breve por paso.
  flow: [
    { icon: "mail", label: "Llega el PDF" },
    { icon: "scan-text", label: "El sistema lo lee" },
    { icon: "database", label: "Extrae los datos" },
    { icon: "check-circle", label: "Los vuelca solo" },
  ],
} as const;
