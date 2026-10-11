import { capabilities } from "./capabilities";
import { services } from "./services";
import { methodology } from "./methodology";
import { trust } from "./trust";
import { cases } from "./cases";

/**
 * Base de conocimiento del chatbot — Dossier Cap. 30.4 / Blueprint Cap. 6.
 * Se construye en tiempo de build/petición a partir de los mismos
 * content/es/*.ts que alimentan la web, nunca como documento aparte: así
 * el bot nunca puede contradecir a la propia landing. No añade ningún dato
 * que no exista ya en el Content Deck.
 */
export function buildKnowledgeBase(): string {
  const servicesBlock = services.items.map((s) => `- ${s.title}: ${s.description}`).join("\n");

  const capabilitiesBlock = capabilities.items
    .map(
      (c, i) =>
        `${i + 1}. ${c.title}\n   ${c.description}\n   Problema que resuelve: ${c.problem}\n   Beneficio: ${c.benefit}\n   Resultado: ${c.result}`
    )
    .join("\n\n");

  const methodologyBlock = methodology.phases
    .map((p, i) => `${i + 1}. ${p.title} ${p.description}`)
    .join("\n");

  const guaranteesBlock = trust.guarantees.items.map((g) => `- ${g}`).join("\n");

  const objectionsBlock = trust.objections.items
    .map((o) => `P: ${o.question}\nR: ${o.answer}`)
    .join("\n\n");

  const casesBlock = cases.items
    .map(
      (c) =>
        `Caso — ${c.sector}\nQuién era la empresa: ${c.company}\nQué estaba ocurriendo: ${c.whatWasHappening}\nQué cambió: ${c.whatChanged}\nResultado: ${c.result}\nQué permitió: ${c.whatItAllowed}`
    )
    .join("\n\n");

  return [
    `## Servicios que ofrecemos\n${servicesBlock}`,
    `## Las siete capacidades del sistema\n${capabilitiesBlock}`,
    `## Cierre de capacidades\n${capabilities.closingStatement}`,
    `## Metodología de trabajo (cinco fases)\n${methodologyBlock}`,
    `## Transparencia\n${trust.transparency.text}`,
    `## Cómo medimos el éxito\n${trust.measurement.text}`,
    `## Garantías\n${guaranteesBlock}`,
    `## Evidencia\n${trust.evidence.text}`,
    `## Objeciones frecuentes ya resueltas en la web\n${objectionsBlock}`,
    `## Casos de transformación reales publicados\n${casesBlock}`,
  ].join("\n\n");
}
