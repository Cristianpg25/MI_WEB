"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number | string;
  y?: number;
  blur?: boolean;
  once?: boolean;
  /** Fracción del elemento que debe estar visible para disparar — Cap. 29.6. */
  amount?: number;
  /**
   * Recorta el área de disparo del viewport (formato CSS margin, p. ej.
   * "0px 0px -15% 0px" para exigir que el elemento suba más antes de
   * revelarse). Por defecto sin recorte, igual que antes.
   */
  margin?: string;
}

/** Wrapper estándar de aparición: fade + x/y + blur opcional al entrar en viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = DURATION.reveal,
  x = 0,
  y = 24,
  blur = false,
  once = true,
  amount = 0.3,
  margin,
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount, margin }}
      transition={{ duration, ease: EASE.outSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
