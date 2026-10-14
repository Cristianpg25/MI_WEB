"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { hero } from "@/content/es/hero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Hero — Living System Hero (Dossier Cap. 8 / Blueprint 4.1). Titular con
 * mask-reveal palabra a palabra; la palabra clave del Cap. 20 en Instrument
 * Serif itálica + gradiente. Fondo: solo la textura de ruido global del
 * body (Cap. 22.7) — sin animación propia, a petición directa del cliente
 * (se retiró el fondo de nodos de todas las secciones).
 */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const words = hero.title.split(" ");
  const initialProp = prefersReducedMotion ? false : undefined;

  return (
    <section
      id="hero"
      // pt reserva espacio para la navbar fija: sin esto, en viewports bajos
      // (~700-760px, portátiles habituales) el titular queda pegado al
      // header en vez de sentirse centrado — Cap. 25, probar en el caso
      // más restrictivo, no en el más cómodo.
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary pt-[var(--space-2xl)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_78%)]" />

      <Container className="relative z-[var(--z-content)] flex flex-col items-center gap-[var(--space-l)] text-center">
        <h1 className="type-display-xl max-w-4xl text-text-primary" aria-label={hero.title}>
          <span aria-hidden="true">
            {words.map((word, i) => {
              const isAccent = word.replace(/[.,]/g, "") === hero.accentWord;
              return (
                <span key={i} className="inline-block overflow-hidden pb-2 pr-[0.28em] align-top">
                  <motion.span
                    className={cn(
                      "inline-block",
                      isAccent &&
                        "type-editorial bg-gradient-to-r from-accent-deep to-accent-light bg-clip-text text-transparent"
                    )}
                    initial={initialProp ?? { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: DURATION.revealMajor, ease: EASE.outSoft, delay: 0.15 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </h1>

        <motion.p
          className="type-lead max-w-xl text-text-secondary"
          initial={initialProp ?? { opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: DURATION.narrative, ease: EASE.outSoft, delay: 0.9 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-[var(--space-s)]"
          initial={initialProp ?? { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASE.outSoft, delay: 1.8 }}
        >
          <Button
            type="button"
            variant="primary"
            onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
            className="bg-[image:var(--gradient-primary)] text-white hover:text-white hover:shadow-[0_0_28px_var(--accent-glow)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
