import Link from "next/link";
import { footer } from "@/content/es/footer";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { NodeNetwork } from "@/components/animations/NodeNetwork";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-bg-secondary">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <NodeNetwork variant="stable" nodeCount={24} seed={99} />
      </div>

      <Container className="relative grid gap-[var(--space-xl)] py-[var(--space-2xl)] tablet:grid-cols-2 desktop:grid-cols-4">
        <div className="flex flex-col gap-[var(--space-s)]">
          <span className="type-h4 text-text-primary">{siteConfig.brandName}</span>
          <p className="type-small max-w-xs text-text-secondary">{footer.tagline}</p>
        </div>

        <nav className="flex flex-col gap-[var(--space-xs)]" aria-label="Navegación">
          <span className="type-eyebrow text-text-tertiary">Navegación</span>
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

        <nav className="flex flex-col gap-[var(--space-xs)]" aria-label="Legal">
          <span className="type-eyebrow text-text-tertiary">Legal</span>
          {footer.legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-small text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-[var(--space-xs)]">
          <span className="type-eyebrow text-text-tertiary">Contacto</span>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="type-small text-text-secondary transition-colors hover:text-text-primary"
          >
            {siteConfig.contactEmail}
          </a>
          {siteConfig.linkedinUrl && (
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="type-small text-text-secondary transition-colors hover:text-text-primary"
            >
              LinkedIn
            </a>
          )}
        </div>
      </Container>

      <Container className="relative border-t border-border-subtle py-[var(--space-m)]">
        <p className="type-caption text-text-tertiary">
          © {year} {siteConfig.brandName}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
