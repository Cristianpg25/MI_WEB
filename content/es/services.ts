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
  eyebrow: "Servicios",
  sectionTitle: "Así ponemos esto en marcha.",
  subtitle:
    "Cada capacidad que vas a ver a lo largo de la página se apoya en un servicio concreto. Esto es exactamente lo que hacemos por tu negocio.",
  items: [
    {
      id: "atencion-automatizada",
      title: "Atención y chatbots inteligentes",
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
      id: "integracion-sistemas",
      title: "Integración de sistemas y datos",
      description:
        "Unificamos CRM, ERP, hojas de cálculo y correo en un único flujo, para que la información deje de duplicarse.",
    },
    {
      id: "analisis-decisiones",
      title: "Análisis y decisiones con IA",
      description:
        "Organizamos tus datos para que decidir sea más rápido y con más certeza, no más intuición.",
    },
    {
      id: "visibilidad-seo",
      title: "Visibilidad y SEO",
      description:
        "Más oportunidades entrando desde donde tus clientes ya están buscando, sin depender de la suerte.",
    },
    {
      id: "software-a-medida",
      title: "Software a medida",
      description: "Herramientas internas o de cara al cliente, construidas para tu forma de trabajar — no al revés.",
    },
    {
      id: "arquitectura-escalable",
      title: "Arquitectura de sistemas escalables",
      description:
        "Diseñamos para que tu empresa pueda crecer, aceptar más trabajo y atender a más clientes sin que nada se rompa por el camino.",
    },
    {
      id: "diseno-audiovisual",
      title: "Diseño audiovisual y gráfico",
      description:
        "Imágenes de producto, piezas publicitarias y carteles con la identidad de tu marca — contenido visual listo para vender, no solo para informar.",
    },
  ],
} as const;
