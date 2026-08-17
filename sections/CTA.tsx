"use client";

import { motion } from "framer-motion";
import { cta } from "@/content/es/cta";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CalendlyInlineEmbed } from "@/components/ui/Calendly";
import { Reveal } from "@/components/ui/Reveal";
import { DURATION, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * CTA Final — The First Step (Dossier Cap. 15 / Blueprint 4.8). Mensaje
 * único, sin listas ni tarjetas. Un glow sutil pulsa una vez al entrar en
 * viewport en lugar del epílogo de convergencia de pulsos completo — misma
 * culminación visual discreta, sin recalcular una animación de partículas.
 */
export function CTA() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="cta" className="relative overflow-hidden bg-bg-primary py-[var(--space-3xl)]">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)" }}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: DURATION.narrative, ease: EASE.outSoft }}
      />

      <Container className="relative flex flex-col items-center gap-[var(--space-l)] text-center">
        <Reveal>
          <p className="type-eyebrow text-text-tertiary">{cta.narrativeLine}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="type-display-l max-w-2xl text-text-primary">{cta.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="type-lead max-w-xl text-text-secondary">{cta.subtitle}</p>
        </Reveal>

        <Reveal delay={0.3} className="flex w-full max-w-2xl flex-col gap-[var(--space-s)]">
          <span className="type-label text-text-primary">{cta.primaryCta}</span>
          <CalendlyInlineEmbed />
        </Reveal>

        <Reveal delay={0.35}>
          <Button href={cta.secondaryCta.href} variant="tertiary">
            {cta.secondaryCta.label}
          </Button>
        </Reveal>

        <Reveal delay={0.4}>
          <ul className="flex flex-wrap justify-center gap-[var(--space-m)]">
            {cta.trustIndicators.map((indicator) => (
              <li key={indicator} className="type-caption text-text-tertiary">
                {indicator}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
