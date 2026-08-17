/**
 * Duraciones y curvas de aceleración — Dossier Cap. 29.6, como constantes JS
 * reutilizables desde GSAP y Framer Motion. Misma fuente de verdad que los
 * tokens CSS en app/globals.css; no duplicar valores fuera de aquí.
 */

// Segundos (Framer Motion y GSAP usan segundos por defecto).
export const DURATION = {
  micro: 0.2, // microinteracciones: 150–250ms
  hover: 0.25, // hover: 200–300ms
  reveal: 0.65, // apariciones: 500–800ms
  revealMajor: 1.0, // revelados importantes: 800–1200ms
  narrative: 1.3, // transiciones narrativas: 1000–1500ms
} as const;

// Array [x1,y1,x2,y2] — formato que acepta Framer Motion directamente.
export const EASE = {
  standard: [0.4, 0, 0.2, 1],
  outSoft: [0.16, 1, 0.3, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
} as const;

// Mismas curvas en formato string CSS — para GSAP (gsap.to({ ease: ... })).
export const EASE_CSS = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  outSoft: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOutSoft: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

// Cap. 29.7 — mismos umbrales que app/globals.css, para lógica JS (useMediaQuery).
export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1279,
  desktop: 1280,
} as const;
