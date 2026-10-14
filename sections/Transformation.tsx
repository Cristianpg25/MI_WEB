"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { transformation } from "@/content/es/transformation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NodeNetwork } from "@/components/animations/NodeNetwork";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = transformation.phases;

/**
 * La Transformación — The Living Enterprise Journey (Dossier Cap. 10 /
 * Blueprint 4.3). Desktop (≥1280px): scroll vertical traducido a
 * desplazamiento horizontal sobre las 5 fases, dentro de un contenedor
 * pinned. Mobile/tablet: nunca se replica el scroll horizontal — se
 * reinterpreta como tarjetas apiladas con el mismo copy (Cap. 25).
 */
export function Transformation() {
  const isDesktop = useIsDesktop();

  return (
    <section id="transformacion" className="relative bg-bg-primary">
      {isDesktop ? <TransformationDesktop /> : <TransformationMobile />}
    </section>
  );
}

function TransformationDesktop() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!wrapper || !panel) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        pin: panel,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, wrapper);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Con reduced motion no se monta el ScrollTrigger: se muestra directamente
  // la fase final, sin depender de un setState síncrono dentro del efecto.
  const effectiveProgress = prefersReducedMotion ? 1 : progress;
  const panelProgress = effectiveProgress * PHASES.length;
  const activeIndex = Math.min(PHASES.length - 1, Math.floor(panelProgress));
  const translatePercent = effectiveProgress * (PHASES.length - 1) * 100;

  return (
    // 55vh de scroll por fase (no 100vh): suficiente para sentir el
    // desplazamiento horizontal sin alargar la página innecesariamente.
    <div ref={wrapperRef} className="relative" style={{ height: `${PHASES.length * 55}vh` }}>
      <div ref={panelRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <NodeNetwork fromVariant="fragmenting" toVariant="stable" progress={effectiveProgress} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_85%)]" />

        <div
          className="relative flex h-full will-change-transform"
          style={{ width: `${PHASES.length * 100}vw`, transform: `translateX(-${translatePercent}vw)` }}
        >
          {PHASES.map((phase, i) => {
            const distance = Math.abs(panelProgress - (i + 0.5));
            const opacity = Math.max(0.25, 1 - distance);
            return (
              <div
                key={phase.id}
                className="flex h-full w-screen shrink-0 items-center justify-center px-[var(--margin-desktop)]"
              >
                <div className="max-w-xl text-center" style={{ opacity }}>
                  <span className="type-eyebrow text-accent">{phase.title}</span>
                  <p className="type-h2 mt-[var(--space-s)] text-text-primary">{phase.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-[var(--space-l)] left-1/2 z-[var(--z-content)] flex -translate-x-1/2 gap-[var(--space-xs)]">
          {PHASES.map((phase, i) => (
            <span
              key={phase.id}
              className={cn(
                "h-1.5 rounded-pill transition-all duration-[var(--duration-hover)]",
                activeIndex === i ? "w-6 bg-accent" : "w-1.5 bg-border-visible"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TransformationMobile() {
  return (
    <Container className="flex flex-col gap-[var(--space-2xl)] py-[var(--space-2xl)]">
      {PHASES.map((phase, i) => (
        <Reveal
          key={phase.id}
          delay={i * 0.05}
          duration={DURATION.revealMajor}
          x="-60%"
          y={0}
          amount={0.4}
          margin="0px 0px -15% 0px"
        >
          <div className="relative overflow-hidden rounded-card border border-border-subtle bg-bg-secondary p-[var(--space-l)]">
            <div className="absolute inset-0 opacity-40">
              <NodeNetwork variant={phase.variant} seed={200 + i} nodeCount={24} />
            </div>
            <div className="relative">
              <span className="type-eyebrow text-accent">{phase.title}</span>
              <p className="type-h3 mt-[var(--space-s)] text-text-primary">{phase.message}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </Container>
  );
}
