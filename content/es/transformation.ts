// El campo `variant` referencia los identificadores de NodeNetworkVariant
// (components/animations/NodeNetwork.tsx) por valor literal, sin importar
// el tipo aquí — content/ no depende de components/.
export const transformation = {
  phases: [
    {
      id: "fragmentado",
      title: "Sistema fragmentado",
      message: "Cada proceso funciona por su cuenta.",
      variant: "fragmenting",
    },
    {
      id: "primeras-conexiones",
      title: "Primeras conexiones",
      message: "La información empieza a moverse sola.",
      variant: "reorganizing",
    },
    {
      id: "automatizacion-invisible",
      title: "Automatización invisible",
      message: "Lo que antes esperaba a una persona, ya no espera.",
      variant: "reorganizing",
    },
    {
      id: "sistema-inteligente",
      title: "Sistema inteligente",
      message: "Tu empresa deja de perder tiempo en repetir tareas.",
      variant: "stable",
    },
    {
      id: "preparada-para-crecer",
      title: "Empresa preparada para crecer",
      message: "Y está lista para crecer sin volverse más compleja.",
      variant: "stable",
    },
  ],
} as const;
