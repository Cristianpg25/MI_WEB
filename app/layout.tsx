import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { SiteChrome } from "@/components/SiteChrome";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const TITLE = `${siteConfig.brandName} — Descubre cuánto dinero pierde tu empresa por procesos manuales`;
const DESCRIPTION =
  "Analizamos tu empresa, detectamos dónde se pierde tiempo y dinero, y diseñamos el sistema que lo soluciona. Sin tecnicismos, con resultados medibles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${instrumentSerif.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
