/**
 * Confianza — drásticamente reducido a petición directa del cliente: de
 * cinco bloques (transparencia, medición, garantías, evidencia,
 * objeciones) a un título + una fila de frases cortas. Sin acordeón, sin
 * párrafos. Las cuatro frases condensan lo más fuerte de cada bloque
 * anterior — ningún dato nuevo, solo mucho más corto.
 */
export const trust = {
  sectionTitle: "Antes de escribirnos, esto es todo lo que necesitas saber.",
  pills: [
    "No vendemos horas ni proyectos cerrados",
    "Trabajamos con las herramientas que ya tienes",
    "Resultados medibles, no promesas",
    "Nunca desaparecemos después de la entrega",
  ],
  // No se renderizan en la página (la sección ya no lleva acordeón) — se
  // mantienen solo para que el chatbot pueda responder objeciones
  // frecuentes con algo más de detalle que las cuatro frases de arriba.
  objections: [
    {
      question: "Ya uso varios programas.",
      answer: "Trabajamos con los sistemas que ya tienes, no te pedimos que los cambies.",
    },
    {
      question: "¿Tengo que cambiar mi forma de trabajar?",
      answer: "No. Adaptamos la tecnología a tu empresa, nunca al revés.",
    },
    {
      question: "¿Esto sustituirá a mi equipo?",
      answer: "No. Elimina tareas repetitivas, no el talento de las personas.",
    },
    {
      question: "Mi empresa es pequeña.",
      answer: "Ahí suele haber más margen de mejora, no menos.",
    },
  ],
} as const;
