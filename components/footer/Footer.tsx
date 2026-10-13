import Link from "next/link";
import { footer } from "@/content/es/footer";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { NodeNetwork } from "@/components/animations/NodeNetwork";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-bg-secondary">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <NodeNetwork variant="stable" nodeCount={16} seed={99} />
      </div>

      <Container className="relative flex flex-col gap-[var(--space-m)] py-[var(--space-l)]">
        <div className="flex flex-col gap-[var(--space-m)] tablet:flex-row tablet:items-start tablet:justify-between">
          <div className="flex flex-col gap-[var(--space-2xs)]">
            <span className="type-h4 text-text-primary">{siteConfig.brandName}</span>
            <p className="type-small max-w-xs text-text-secondary">{footer.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-[var(--space-m)] gap-y-[var(--space-2xs)]" aria-label="Navegación">
            {footer.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-small text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-[var(--space-xs)] border-t border-border-subtle pt-[var(--space-s)] tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="type-caption text-text-tertiary">
            © {year} {siteConfig.brandName}. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-x-[var(--space-m)] gap-y-[var(--space-2xs)]">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-caption text-text-tertiary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="type-caption text-text-tertiary transition-colors hover:text-text-primary"
            >
              {siteConfig.contactEmail}
            </a>
            {siteConfig.linkedinUrl && (
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="type-caption text-text-tertiary transition-colors hover:text-text-primary"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
