"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { problem } from "@/content/es/problem";
import { Container } from "@/components/ui/Container";
import { NodeNetwork } from "@/components/animations/NodeNetwork";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * El Problema — The Hidden Cost Timeline (Dossier Cap. 9 / Blueprint 4.2).
 * Sección pinned: el progreso 0→1 del ScrollTrigger controla cuántas
 * tareas están reveladas, cuándo aparecen las etiquetas de contexto y la
 * transición del contador de tiempo → dinero. Probado para viewports bajos
 * (~700-760px): paddings contenidos y contador con clamp() ligado a vh.
 */
const TOTAL_TASKS = problem.tasks.length;
const TASK_REVEAL_END = 0.7;
const MONEY_TRANSITION_START = 0.78;
const CLOSING_TEXT_START = 0.9;

function formatTime(totalMinutesPerMonth: number) {
  const hours = totalMinutesPerMonth / 60;
  if (hours < 1) return `${Math.round(totalMinutesPerMonth)} min al mes`;
  return `${hours.toFixed(1)} h al mes`;
}

function formatEUR(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Problem() {
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
  // el estado final, sin depender de un setState síncrono dentro del efecto.
  const effectiveProgress = prefersReducedMotion ? 1 : progress;

  const revealFraction = Math.min(1, effectiveProgress / TASK_REVEAL_END);
  const visibleTaskCount = Math.ceil(revealFraction * TOTAL_TASKS);

  const visibleMinutesPerDay = problem.tasks
    .slice(0, visibleTaskCount)
    .reduce((sum, task) => sum + task.minutesPerDay, 0);
  const visibleMinutesPerMonth = visibleMinutesPerDay * problem.workingDaysPerMonth;
  const visibleHoursPerMonth = visibleMinutesPerMonth / 60;

  const moneyFraction = Math.max(
    0,
    Math.min(1, (effectiveProgress - MONEY_TRANSITION_START) / (1 - MONEY_TRANSITION_START))
  );
  const moneyValue = visibleHoursPerMonth * problem.hourlyCostEUR;

  const showClosing = effectiveProgress >= CLOSING_TEXT_START;

  return (
    <section id="problema" ref={wrapperRef} className="relative h-[420vh] bg-bg-primary">
      <div ref={panelRef} className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="absolute inset-0">
          <NodeNetwork fromVariant="connected" toVariant="fragmenting" progress={effectiveProgress} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_82%)]" />

        <Container className="relative z-[var(--z-content)] flex h-full flex-col justify-between pb-[var(--space-m)] pt-[var(--space-2xl)]">
          {/* Zona superior — frase contextual */}
          <p className="type-eyebrow text-text-tertiary">{problem.contextPhrase}</p>

          {/* Zona central — tareas reveladas progresivamente */}
          <ul className="flex flex-1 flex-col justify-center gap-[var(--space-xs)]">
            {problem.tasks.map((task, i) => {
              const isVisible = i < visibleTaskCount;
              const showTag = isVisible && effectiveProgress > 0.4;
              return (
                <li
                  key={task.label}
                  className={cn(
                    "type-body-lg flex flex-wrap items-center gap-[var(--space-xs)] text-text-primary transition-all duration-[var(--duration-reveal)] ease-[var(--ease-out-soft)]",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  )}
                >
                  <span>{task.label}</span>
                  <span
                    className={cn(
                      "type-caption rounded-pill border border-border-subtle px-[var(--space-xs)] py-[2px] text-text-tertiary transition-opacity duration-[var(--duration-reveal)]",
                      showTag ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {task.tag}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Zona inferior — contador tiempo → dinero */}
          <div className="flex w-full flex-col items-start gap-[var(--space-2xs)]">
            <div className="relative h-[clamp(2.5rem,7vh,4.5rem)] w-full">
              <span
                className="absolute inset-0 flex items-center whitespace-nowrap text-[clamp(2rem,6.5vh,4.5rem)] font-semibold text-text-primary transition-opacity duration-300"
                style={{ opacity: 1 - moneyFraction }}
              >
                {formatTime(visibleMinutesPerMonth)}
              </span>
              <span
                className="absolute inset-0 flex items-center whitespace-nowrap text-[clamp(2rem,6.5vh,4.5rem)] font-semibold text-accent transition-opacity duration-300"
                style={{ opacity: moneyFraction }}
              >
                {formatEUR(moneyValue)} al mes
              </span>
            </div>
            <p className="type-caption text-text-tertiary">{problem.estimateDisclaimer}</p>
            <p
              className={cn(
                "type-h4 max-w-lg pt-[var(--space-xs)] text-text-primary transition-opacity duration-[var(--duration-narrative)]",
                showClosing ? "opacity-100" : "opacity-0"
              )}
            >
              {problem.closingText}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
