"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { methodology } from "@/content/es/methodology";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Metodología de Trabajo — Dossier Cap. 13 / Blueprint 4.6. Línea vertical
 * central cuyo progreso de dibujo sigue el scroll vía Framer Motion
 * (useScroll + useTransform, sin GSAP/pinning). Fases alternando lado en
 * desktop, apiladas en mobile — resuelto solo con CSS responsive.
 */
export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="metodologia" className="relative bg-bg-primary py-[var(--space-3xl)]">
      <Container className="flex flex-col gap-[var(--space-2xl)]">
        <Reveal>
          <h2 className="type-h1 max-w-2xl text-text-primary">{methodology.sectionTitle}</h2>
        </Reveal>

        <div ref={containerRef} className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border-subtle desktop:left-1/2" />
          <motion.div
            className="absolute left-4 top-0 w-px bg-accent desktop:left-1/2"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-[var(--space-2xl)]">
            {methodology.phases.map((phase, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={phase.id}>
                  <div className="relative pl-[var(--space-xl)] desktop:grid desktop:grid-cols-2 desktop:gap-[var(--space-xl)] desktop:pl-0">
                    <span className="absolute left-4 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-pill bg-accent desktop:left-1/2" />
                    <div className={cn(reversed ? "desktop:order-2 desktop:text-left" : "desktop:text-right")}>
                      <span className="type-eyebrow text-text-tertiary">
                        Fase {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="type-h3 mt-[var(--space-2xs)] text-text-primary">{phase.title}</h3>
                      <p className="type-body mt-[var(--space-2xs)] text-text-secondary">{phase.description}</p>
                    </div>
                    <div className={cn("hidden desktop:block", reversed && "desktop:order-1")} aria-hidden="true" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
