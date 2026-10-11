"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/content/es/hero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NodeNetwork, type NodeNetworkVariant } from "@/components/animations/NodeNetwork";
import { DURATION, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Hero — Living System Hero (Dossier Cap. 8 / Blueprint 4.1).
 * El fondo ya está vivo al cargar (variante "seed", el sistema "aprendiendo")
 * y se asienta en "connected" tras la entrada. Titular con mask-reveal
 * palabra a palabra; la palabra clave del Cap. 20 en Instrument Serif
 * itálica + gradiente. CTA retrasado ~1.8s para no competir con la lectura.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [variant, setVariant] = useState<NodeNetworkVariant>("seed");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => setVariant("connected"), 1800);
    return () => clearTimeout(timeout);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const words = hero.title.split(" ");
  const initialProp = prefersReducedMotion ? false : undefined;

  return (
    <section
      id="hero"
      ref={sectionRef}
      // pt reserva espacio para la navbar fija: sin esto, en viewports bajos
      // (~700-760px, portátiles habituales) el titular queda pegado al
      // header en vez de sentirse centrado — Cap. 25, probar en el caso
      // más restrictivo, no en el más cómodo.
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary pt-[var(--space-2xl)]"
    >
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y: bgY }}>
        <NodeNetwork variant={variant} interactive />
      </motion.div>
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
          initial={initialProp ?? { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASE.outSoft, delay: 1.8 }}
        >
          <Button href={hero.cta.href} variant="primary">
            {hero.cta.label}
          </Button>
        </motion.div>
      </Container>

      <motion.div
        className="absolute bottom-[var(--space-l)] left-1/2 z-[var(--z-content)] -translate-x-1/2"
        aria-hidden="true"
        initial={initialProp ?? { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.reveal, delay: 2.2 }}
      >
        <div className="h-8 w-5 rounded-pill border border-border-visible">
          <motion.div
            className="mx-auto mt-1.5 h-1.5 w-1 rounded-pill bg-accent"
            animate={prefersReducedMotion ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
