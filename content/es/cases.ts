/**
 * Casos de Transformación — Dossier Cap. 12, reescrito por petición directa
 * del cliente: se sustituye el caso real (control de calidad) por un
 * ejemplo genérico, mucho más corto y gráfico. Importante: precisamente
 * por no ser un caso real verificado, la sección nunca afirma que lo sea
 * — el tag se eligió para sonar profesional sin mentir sobre su origen
 * (ver conversación: se descartó etiquetarlo como caso real de cliente
 * por riesgo de publicidad engañosa si alguna vez se pide verificarlo).
 * Mismo principio de honestidad que ya aplica al contador de la sección
 * Problema (Cap. 9): nunca presentar una cifra de ejemplo como si fuera un
 * dato real de cliente.
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
