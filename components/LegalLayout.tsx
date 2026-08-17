import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="pb-[var(--space-2xl)] pt-[var(--space-3xl)]">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="type-small inline-flex items-center gap-2 text-text-tertiary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio
        </Link>
        <h1 className="type-h1 mt-[var(--space-l)] text-text-primary">{title}</h1>
        <p className="type-small mt-[var(--space-xs)] text-text-tertiary">
          Última actualización: {updatedAt}
        </p>
        <div className="type-body mt-[var(--space-xl)] flex flex-col gap-[var(--space-m)] text-text-secondary">
          {children}
        </div>
      </Container>
    </div>
  );
}
