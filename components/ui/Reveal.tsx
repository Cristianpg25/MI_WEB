"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
}

/** Wrapper estándar de aparición: fade + x/y + blur opcional al entrar en viewport. */
export function Reveal({ children, className, delay = 0, x = 0, y = 24, blur = false, once = true }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: DURATION.reveal, ease: EASE.outSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
