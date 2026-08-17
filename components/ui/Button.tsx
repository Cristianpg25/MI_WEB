"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface BaseProps {
  variant?: ButtonVariant;
  /** Ligero efecto magnético (Cap. 23) — activo por defecto en el primario. */
  magnetic?: boolean;
  className?: string;
  children?: ReactNode;
}

// Framer Motion redefine estos handlers con una firma distinta a la nativa
// del DOM; hay que excluirlos de los atributos nativos para que el spread
// sobre motion.a / motion.button no colisione de tipos.
type MotionConflictingHandlers =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd";

type ButtonAsLink = BaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children" | MotionConflictingHandlers>;

type ButtonAsButton = BaseProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | MotionConflictingHandlers>;

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-bg-primary hover:bg-gradient-to-r hover:from-accent-deep hover:to-accent-light hover:text-text-primary hover:shadow-[0_0_28px_var(--accent-glow)]",
  secondary:
    "bg-transparent text-text-primary border border-border-visible hover:border-accent hover:bg-bg-elevated",
  tertiary:
    "bg-transparent text-text-secondary px-0 py-0 hover:text-text-primary",
};

export function Button({ variant = "primary", magnetic, className, children, href, ...rest }: ButtonProps) {
  const isMagnetic = magnetic ?? variant === "primary";
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (!isMagnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClassName = cn(
    "type-button inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 transition-[background-color,border-color,box-shadow,color] duration-[var(--duration-hover)] ease-[var(--ease-standard)]",
    VARIANT_CLASSES[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        style={isMagnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={sharedClassName}
        {...(rest as Omit<ComponentPropsWithoutRef<"a">, MotionConflictingHandlers>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      style={isMagnetic ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={sharedClassName}
      {...(rest as Omit<ComponentPropsWithoutRef<"button">, MotionConflictingHandlers>)}
    >
      {children}
    </motion.button>
  );
}
