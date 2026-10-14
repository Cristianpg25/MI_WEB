/**
 * Servicios — sección nueva (no estaba en el Dossier original). Pensada
 * como respuesta directa a "nuestra web es demasiado extensa, no deja claro
 * qué hacemos": una traducción concreta y escaneable de las capacidades
 * narrativas del Cap. 11, para el visitante que quiere entender en segundos
 * qué contratamos exactamente — antes de comprometerse con el recorrido
 * narrativo completo (Problema → Transformación → Capacidades → Casos).
 *
 * Los títulos aquí SÍ nombran el servicio directamente (a diferencia de
 * Capacidades, que nunca nombra la tecnología) porque esa es la función de
 * esta sección: claridad inmediata. Las descripciones mantienen el
 * Diccionario de traducción (Cap. 7.2) — resultado de negocio, no jerga.
 */
export const services = {
  eyebrow: "Nuestros",
  sectionTitle: "Servicios",
  items: [
    {
      id: "atencion-automatizada",
      title: "Chatbot y Agentes",
      description:
        "Un asistente que responde a tus clientes a cualquier hora, entrenado con la información real de tu negocio — nunca una conversación genérica.",
    },
    {
      id: "automatizacion-procesos",
      title: "Automatización de procesos",
      description:
        "Conectamos tus herramientas para que cada proceso active al siguiente solo, sin que nadie tenga que empujarlo a mano.",
    },
    {
      id: "auditoria-negocio",
      title: "Auditoría de negocio",
      description:
        "Revisamos tus procesos y herramientas actuales para detectar dónde se pierde tiempo y dinero, y qué automatizar primero para notarlo antes.",
    },
    {
      id: "publicidad-online",
      title: "Publicidad Online",
      description:
        "Campañas de publicidad online dirigidas a tu cliente ideal, para que entren clientes nuevos de forma constante — no solo cuando te acuerdas de invertir.",
    },
    {
      id: "software-a-medida",
      title: "Software a medida",
      description: "Herramientas internas o de cara al cliente, construidas para tu forma de trabajar — no al revés.",
    },
    {
      id: "diseno-audiovisual",
      title: "Diseño audiovisual y gráfico",
      description:
        "Imágenes de producto, piezas publicitarias y carteles con la identidad de tu marca — contenido visual listo para vender, no solo para informar.",
    },
  ],
} as const;
