import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
}

/** Contenedor de ancho máximo — Cap. 29.4 (1440px, márgenes responsive). */
export function Container({ as: Tag = "div", className, children, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--margin-mobile)] tablet:px-[var(--margin-tablet)] desktop:px-[var(--margin-desktop)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("type-eyebrow text-accent", className)}>{children}</span>;
}
