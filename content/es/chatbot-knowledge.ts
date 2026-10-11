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

  const trustBlock = trust.pills.map((p) => `- ${p}`).join("\n");

  const objectionsBlock = trust.objections
    .map((o) => `P: ${o.question}\nR: ${o.answer}`)
    .join("\n\n");

  const casesBlock = `Ejemplo ilustrativo (no es un caso real de cliente, es una ilustración del tipo de coste que resolvemos): ${cases.intro} Cifras ilustrativas: ${cases.stats
    .map((s) => `${s.value} ${s.label}`)
    .join(" · ")}. ${cases.outcome}`;

  return [
    `## Servicios que ofrecemos\n${servicesBlock}`,
    `## Las siete capacidades del sistema\n${capabilitiesBlock}`,
    `## Cierre de capacidades\n${capabilities.closingStatement}`,
    `## Metodología de trabajo (cinco fases)\n${methodologyBlock}`,
    `## Principios de confianza\n${trustBlock}`,
    `## Objeciones frecuentes ya resueltas en la web\n${objectionsBlock}`,
    `## Ejemplo ilustrativo del coste de un proceso manual\n${casesBlock}`,
  ].join("\n\n");
}
