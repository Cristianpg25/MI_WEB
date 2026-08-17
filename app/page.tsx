import { Hero } from "@/sections/Hero";
import { Problem } from "@/sections/Problem";
import { Transformation } from "@/sections/Transformation";
import { Capabilities } from "@/sections/Capabilities";
import { Cases } from "@/sections/Cases";
import { Methodology } from "@/sections/Methodology";
import { Trust } from "@/sections/Trust";
import { CTA } from "@/sections/CTA";

// Orden narrativo — Dossier Cap. 5.2 y Cap. 8 a 15 (siete actos + Metodología
// entre Casos y Confianza, según las transiciones explícitas de esos capítulos).
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Transformation />
      <Capabilities />
      <Cases />
      <Methodology />
      <Trust />
      <CTA />
    </>
  );
}
