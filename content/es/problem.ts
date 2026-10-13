export const problem = {
  contextPhrase: "Todo esto ocurre antes de que termine la mañana.",
  // Tareas reveladas progresivamente con el scroll — orden exacto del Cap. 28.3.
  // minutesPerDay alimenta el contador tiempo → dinero; es una estimación
  // ilustrativa de referencia, no un dato medido.
  tasks: [
    { label: "Responder correos", minutesPerDay: 35, tag: "Manual" },
    { label: "Enviar presupuestos", minutesPerDay: 25, tag: "Pendiente" },
    { label: "Actualizar el CRM", minutesPerDay: 20, tag: "Duplicado" },
    { label: "Responder WhatsApp", minutesPerDay: 30, tag: "Esperando respuesta" },
    { label: "Buscar información", minutesPerDay: 25, tag: "Requiere revisión" },
    { label: "Copiar datos entre programas", minutesPerDay: 20, tag: "Duplicado" },
  ],
  workingDaysPerMonth: 22,
  hourlyCostEUR: 15,
  closingText:
    "Todo este tiempo tiene un coste. Y ese coste ya lo está pagando tu empresa.",
} as const;
