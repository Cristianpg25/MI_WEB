/**
 * Solo se publica el caso confirmado como real y listo por el Anexo A.1
 * (control de calidad, anonimizado — ni nombre de empresa ni sector se
 * revelan, a petición expresa: cuanto más concreto el sector, más fácil
 * identificar a la empresa real). El Anexo A.2 documenta un segundo caso
 * todavía pendiente de confirmación del cliente — no se incluye aquí ni
 * como placeholder: el propio Dossier prohíbe que contenido
 * `[PENDIENTE-DATO-REAL]` llegue a producción (Blueprint 4.5). Añadir el
 * array cuando haya más casos confirmados.
 *
 * Reestructurado a petición del cliente: copy más corto y concreto, sin
 * nombrar el sector, con los pasos exactos de la intervención y las
 * cifras como elementos visuales en vez de enterradas en párrafos. Ninguna
 * cifra nueva — las mismas tres del Anexo A.1 (200-250 análisis/mes,
 * 11-16h recuperadas/mes, cero transcripción manual).
 */
export const cases = {
  sectionTitle: "Esto ya está funcionando en empresas como la tuya.",
  closingText:
    "Distintas empresas, un mismo patrón: procesos desconectados, tiempo que se pierde sin darse cuenta, y un sistema que lo reorganiza todo sin añadir complejidad.",
  items: [
    {
      id: "control-calidad-agroalimentario",
      tag: "Control de calidad",
      intro:
        "Gestionan el control de calidad de sus productos mediante análisis periódicos — varios cientos de informes cada mes.",
      before:
        "Cada análisis llegaba por correo en PDF. Alguien tenía que abrirlo, copiar los resultados a mano en un Excel y, si salía «no apto», escribir y enviar un correo pidiendo una nueva muestra — una a una, cientos de veces al mes.",
      steps: [
        {
          title: "Lectura automática del correo",
          detail: "En cuanto llega el PDF, los resultados se extraen solos.",
        },
        {
          title: "Volcado directo al Excel",
          detail: "Sin copiar ni pegar nada a mano — y el PDF queda archivado solo.",
        },
        {
          title: "Aviso automático si «no apto»",
          detail: "El correo pidiendo una nueva muestra sale sin que nadie tenga que redactarlo.",
        },
      ],
      stats: [
        { value: "11-16h", label: "recuperadas cada mes" },
        { value: "200-250", label: "análisis gestionados al mes" },
        { value: "0", label: "transcripciones manuales" },
      ],
      outcome:
        "La persona que antes revisaba correos uno a uno ahora dedica ese tiempo a hacer seguimiento y detectar patrones — no a copiar datos.",
    },
  ],
} as const;
