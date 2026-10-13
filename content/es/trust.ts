/**
 * Confianza — la sección se eliminó por completo de la página a petición
 * directa del cliente (alargaba la web sin aportar algo no cubierto ya en
 * el resto del recorrido). Este contenido ya no se renderiza en ningún
 * sitio: se conserva únicamente como base de conocimiento del chatbot, que
 * puede seguir usándolo para resolver objeciones frecuentes.
 */
export const trust = {
  sectionTitle: "Antes de escribirnos, esto es todo lo que necesitas saber.",
  pills: [
    "No vendemos horas ni proyectos cerrados",
    "Trabajamos con las herramientas que ya tienes",
    "Resultados medibles, no promesas",
    "Nunca desaparecemos después de la entrega",
  ],
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
