/**
 * Casos de Transformación — Dossier Cap. 12, reescrito por petición directa
 * del cliente: se sustituye el caso real (control de calidad) por un
 * ejemplo ilustrativo genérico, mucho más corto y gráfico. Importante:
 * precisamente por dejar de ser un caso real verificado, se etiqueta
 * explícitamente como "Ejemplo ilustrativo" en la propia sección — el
 * mismo principio de honestidad que ya aplica al contador de la sección
 * Problema (Cap. 9): nunca presentar una cifra de ejemplo como si fuera un
 * dato real de cliente.
 */
export const cases = {
  sectionTitle: "Así de rápido se acumula el coste de un proceso manual.",
  tag: "Ejemplo ilustrativo",
  intro:
    "Una empresa recibe más de 300 informes en PDF cada mes — cada uno revisado y copiado a mano, uno por uno.",
  stats: [
    { value: "+300", label: "PDFs al mes" },
    { value: "~30h", label: "perdidas copiando datos" },
    { value: "~750€", label: "coste mensual estimado" },
  ],
  outcome:
    "Leer esos PDFs, extraer los datos y volcarlos solos es exactamente el tipo de proceso que automatizamos.",
} as const;
