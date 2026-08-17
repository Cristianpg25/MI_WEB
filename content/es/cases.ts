/**
 * Solo se publica el caso confirmado como real y listo por el Anexo A.1
 * (control de calidad agroalimentario, anonimizado). El Anexo A.2 documenta
 * un segundo caso todavía pendiente de confirmación del cliente — no se
 * incluye aquí ni como placeholder: el propio Dossier prohíbe que
 * contenido `[PENDIENTE-DATO-REAL]` llegue a producción (Blueprint 4.5).
 * Añadir el array cuando haya más casos confirmados.
 */
export const cases = {
  sectionTitle: "Esto ya está funcionando en empresas como la tuya.",
  closingText:
    "Distintas empresas, un mismo patrón: procesos desconectados, tiempo que se pierde sin darse cuenta, y un sistema que lo reorganiza todo sin añadir complejidad.",
  items: [
    {
      id: "control-calidad-agroalimentario",
      sector: "Sector agroalimentario · Control de calidad",
      company:
        "Empresa del sector agroalimentario que gestiona el control de calidad de sus productos mediante análisis periódicos — varios cientos de informes cada mes.",
      whatWasHappening:
        "Cada análisis llegaba por correo en forma de PDF. Una persona del equipo tenía que abrir cada correo, leer el informe, copiar a mano los resultados en un Excel de seguimiento y guardar el PDF ya archivado. Cuando un análisis salía «no apto», además había que redactar y enviar un correo pidiendo una nueva muestra. Con 200-250 análisis cada mes, esa tarea ocupaba una parte importante del día a día de una persona — y un despiste al transcribir un dato podía pasar desapercibido.",
      whatChanged:
        "Ahora, en cuanto llega el correo, los resultados se extraen y se vuelcan solos en el Excel, y el PDF queda guardado y organizado sin que nadie tenga que hacerlo. Si el resultado es «no apto», el correo pidiendo una nueva muestra sale automáticamente, sin esperar a que alguien lo detecte y lo redacte.",
      result:
        "Entre 11 y 16 horas al mes que antes se dedicaban a revisar correos y transcribir datos a mano — más de dos jornadas completas de trabajo cada mes. El riesgo de error humano al transcribir un resultado desaparece, porque ya no hay transcripción manual.",
      whatItAllowed:
        "La persona que antes revisaba correos uno a uno ahora dedica ese tiempo a lo que sí necesita criterio humano — hacer seguimiento, detectar patrones en los análisis o atender tareas que antes esperaban turno.",
    },
  ],
} as const;
