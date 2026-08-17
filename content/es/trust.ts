export const trust = {
  sectionTitle: "Antes de que nos escribas, esto es lo que deberías saber.",
  transparency: {
    label: "Transparencia",
    text: "No vendemos herramientas, ni horas, ni proyectos cerrados. Diseñamos sistemas para que tu empresa trabaje mejor.",
  },
  measurement: {
    label: "Cómo medimos el éxito",
    text: "Tiempo recuperado. Procesos eliminados. Errores reducidos. Horas automatizadas. Capacidad adicional generada. Medimos resultados, no entregables.",
  },
  guarantees: {
    label: "Garantías",
    items: [
      "Nunca implantamos procesos que no entendemos primero.",
      "Nunca automatizamos algo sin optimizarlo antes.",
      "Nunca desaparecemos después de la entrega.",
      "Siempre validamos que el sistema funciona antes de darlo por terminado.",
    ],
  },
  // Cap. 28.8 marcaba este bloque como [PENDIENTE-DATO-REAL]. Siguiendo el
  // Blueprint 4.7, no se fabrica una cifra de ejemplo: se remite al caso
  // real ya mostrado en la sección anterior.
  evidence: {
    label: "Evidencia",
    text: "Todavía estamos reuniendo cifras agregadas de conjunto. Lo que ya puedes ver es cómo trabajamos: el caso real de la sección anterior muestra el tipo de resultado que buscamos en cada proyecto — medible y verificable, nunca una cifra de ejemplo.",
  },
  objections: {
    label: "Objeciones frecuentes",
    items: [
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
  },
  ctaTransition: "Descubrir cuánto dinero está perdiendo hoy tu empresa y qué oportunidades de mejora existen.",
} as const;
