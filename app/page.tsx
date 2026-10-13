import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Problem } from "@/sections/Problem";
import { Transformation } from "@/sections/Transformation";
import { Capabilities } from "@/sections/Capabilities";
import { Cases } from "@/sections/Cases";
import { Methodology } from "@/sections/Methodology";
import { CTA } from "@/sections/CTA";

// Orden narrativo — Dossier Cap. 5.2 y Cap. 8 a 15. Servicios se añade justo
// tras el Hero (fuera del Dossier original): da orientación rápida de qué
// hacemos antes de pedirle al visitante que siga el recorrido narrativo
// completo — ver conversación sobre acortar la web. La sección de Confianza
// (antes tras Metodología) se eliminó por completo a petición directa del
// cliente: alargaba la página sin aportar algo que no esté ya cubierto en
// el resto del recorrido. Su contenido se conserva en content/es/trust.ts
// únicamente para que el chatbot pueda seguir resolviendo objeciones.
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Problem />
      <Transformation />
      <Capabilities />
      <Cases />
      <Methodology />
      <CTA />
    </>
  );
}
