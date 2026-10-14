"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CalendlyPopupTrigger } from "@/components/ui/Calendly";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content: `Hola, soy el asistente de ${siteConfig.brandName}. Puedo contarte cómo trabajamos, qué capacidades tiene el sistema y cómo ha funcionado en otras empresas. ¿Qué te gustaría saber?`,
};

/**
 * Widget flotante — Dossier Cap. 30.6. No visible desde el primer segundo
 * del Hero: aparece solo cuando el visitante llega a Capacidades, la
 * sección que este chat manifiesta de forma interactiva (Cap. 30.1).
 */
export function ChatWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById("capacidades");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold es una fracción del área TOTAL del target, no del viewport.
      // Capacidades ocupa varias alturas de pantalla, así que un umbral alto
      // (p. ej. 0.2) nunca llegaría a cumplirse con solo un viewport visible.
      // Cualquier intersección real (> 0) ya significa que el usuario llegó.
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await res.json()) as { reply: string; suggestBooking?: boolean };
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.suggestBooking) setShowBooking(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ahora mismo no puedo responder, pero puedes reservar una llamada directamente.",
        },
      ]);
      setShowBooking(true);
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-[var(--space-m)] right-[var(--space-m)] z-[var(--z-overlay)] flex flex-col items-end gap-[var(--space-s)]">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`Asistente de ${siteConfig.brandName}`}
            className="flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-card border border-border-subtle bg-bg-secondary shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: DURATION.reveal, ease: EASE.outSoft }}
          >
            <div className="flex items-center justify-between border-b border-border-subtle px-[var(--space-m)] py-[var(--space-s)]">
              <span className="type-label text-text-primary">Asistente de {siteConfig.brandName}</span>
              <button
                type="button"
                aria-label="Cerrar chat"
                onClick={() => setOpen(false)}
                className="text-text-tertiary transition-colors hover:text-text-primary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-[var(--space-s)] overflow-y-auto px-[var(--space-m)] py-[var(--space-m)]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "type-small max-w-[85%] rounded-card px-[var(--space-s)] py-[var(--space-xs)]",
                    m.role === "user"
                      ? "ml-auto bg-bg-elevated text-text-primary"
                      : "mr-auto border border-border-subtle bg-transparent text-text-secondary"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex gap-1 rounded-card border border-border-subtle px-[var(--space-s)] py-[var(--space-xs)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary [animation-delay:300ms]" />
                </div>
              )}
              {showBooking && (
                <div className="mr-auto">
                  <CalendlyPopupTrigger label="Reservar una llamada" variant="secondary" />
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-[var(--space-xs)] border-t border-border-subtle p-[var(--space-s)]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                aria-label="Escribe tu pregunta"
                className="type-small flex-1 rounded-pill border border-border-subtle bg-bg-primary px-[var(--space-s)] py-[var(--space-2xs)] text-text-primary outline-none focus:border-accent"
              />
              <button
                type="submit"
                aria-label="Enviar"
                disabled={loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-text-primary text-bg-primary disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.div
            className="flex w-[280px] flex-col gap-[var(--space-s)] rounded-card bg-white p-[var(--space-s)] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: DURATION.reveal, ease: EASE.outSoft }}
          >
            <div className="flex items-center gap-[var(--space-xs)]">
              {/* Placeholder — sustituir por la imagen de la mascota cuando llegue */}
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-deep to-accent-light text-white">
                <Sparkles className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="type-label text-black">¿Necesitas ayuda?</span>
            </div>

            <div className="flex items-center gap-[var(--space-xs)]">
              <CalendlyPopupTrigger
                label="Hablemos ahora"
                variant="primary"
                icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                className="flex-1 justify-center rounded-pill bg-black px-[var(--space-m)] py-[var(--space-xs)] text-white hover:bg-black hover:text-white hover:shadow-none"
              />
              <button
                type="button"
                aria-label="Abrir chat"
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-80"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
