import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgeBase } from "@/content/es/chatbot-knowledge";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

/**
 * Proxy server-side hacia el proveedor de IA del chatbot — Dossier Cap. 30.5.
 * La clave de API nunca se expone en el cliente, vive solo en esta variable
 * de entorno del servidor. Si no hay clave configurada, el endpoint responde
 * igualmente con un mensaje honesto + derivación a Calendly — nunca un
 * error técnico visible ni un widget roto (Cap. 30.5, fallback).
 */

// Rate limiting básico en memoria. No persiste entre instancias serverless
// — para producción real conviene un almacén compartido (p. ej. Redis).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_MESSAGES = 20;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_MESSAGES;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface OpenAIChatResponse {
  choices?: { message?: { content?: string } }[];
}

const DEGRADED_REPLY =
  "Todavía no está conectado mi acceso a información en tiempo real, pero puedo derivarte directamente: lo mejor es verlo en una llamada de 20 minutos. ¿Reservamos una?";

function buildSystemPrompt(): string {
  return [
    `Eres el asistente conversacional de ${siteConfig.brandName}, una agencia que transforma procesos empresariales ineficientes en sistemas inteligentes. De cara al visitante, eres simplemente "el asistente de ${siteConfig.brandName}" — nunca menciones ChatGPT, OpenAI, modelos de lenguaje ni la tecnología subyacente.`,
    `Tono: lenguaje de negocio, nunca técnico. Consultivo, nunca insistente. Seguridad sin arrogancia. Nunca uses el miedo como recurso. Habla siempre del cliente, no de la agencia.`,
    `Diccionario de traducción — usa siempre la columna de la derecha: "automatización" → "horas recuperadas"; "chatbot" → "atención disponible 24/7"; "integración" → "un único flujo de trabajo"; "Inteligencia Artificial" (a secas) → "decisiones más rápidas y procesos más eficientes"; "software a medida" → "una herramienta adaptada a tu forma de trabajar".`,
    `Regla de contención — la más importante: solo puedes responder con la información de la BASE DE CONOCIMIENTO de más abajo. Si la pregunta no puede responderse con ella, dilo con naturalidad y deriva a reservar una llamada — nunca completes con conocimiento general del modelo.`,
    `Nunca: des presupuestos, precios ni plazos exactos; prometas resultados concretos para la empresa del visitante; inventes datos, cifras o casos que no estén en la base de conocimiento; mantengas conversaciones fuera del ámbito de la agencia; pidas activamente datos personales sensibles.`,
    `Cuando la conversación lo justifique (dudas ya resueltas, interés en avanzar, o pregunta fuera de alcance), invita con naturalidad a reservar una llamada de 20 minutos, sin presionar.`,
    `Respuestas breves — esto es un widget de chat pequeño, nunca párrafos largos. Máximo 3-4 frases.`,
    `## BASE DE CONOCIMIENTO\n${buildKnowledgeBase()}`,
  ].join("\n\n");
}

function shouldSuggestBooking(reply: string): boolean {
  return /reserv|llamada|diagnóstico|20 minutos/i.test(reply);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: DEGRADED_REPLY, suggestBooking: true });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];

  if (isRateLimited(ip)) {
    return NextResponse.json({
      reply: "Hemos hablado bastante por aquí — para seguir, lo mejor es reservar una llamada de 20 minutos.",
      suggestBooking: true,
    });
  }

  if (!apiKey) {
    return NextResponse.json({ reply: DEGRADED_REPLY, suggestBooking: true });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // Cabeceras recomendadas por OpenRouter para identificar la app en
        // su dashboard — no son obligatorias para que la petición funcione.
        "HTTP-Referer": siteConfig.domain,
        "X-Title": siteConfig.brandName,
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_CHAT_MODEL || "openai/gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 300,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter respondió ${response.status}`);
    }

    const data = (await response.json()) as OpenAIChatResponse;
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "No he podido generar una respuesta. Prueba a reformular la pregunta o reserva una llamada.";

    return NextResponse.json({ reply, suggestBooking: shouldSuggestBooking(reply) });
  } catch {
    return NextResponse.json({ reply: DEGRADED_REPLY, suggestBooking: true });
  }
}
