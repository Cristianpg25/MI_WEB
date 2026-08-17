"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Sistema de nodos — Dossier Cap. 22.1 / Blueprint Cap. 5.
 * Un único motor Canvas 2D reutilizado en toda la web mediante variantes
 * narrativas (conectividad, actividad, nodos aislados), nunca un motor
 * visual distinto por sección. Posiciones seedeadas y reproducibles;
 * aristas por vecinos más cercanos; pulsos nunca todos a la vez;
 * IntersectionObserver para pausar el rAF fuera de viewport;
 * prefers-reduced-motion → un único frame estático, sin animar.
 */
export type NodeNetworkVariant =
  | "seed"
  | "connected"
  | "fragmenting"
  | "reorganizing"
  | "stable";

interface NodeNetworkProps {
  className?: string;
  /** Variante objetivo — el motor interpola suavemente hacia ella. */
  variant?: NodeNetworkVariant;
  /** Junto a `toVariant` + `progress`, permite control fino desde scroll (ScrollTrigger). */
  fromVariant?: NodeNetworkVariant;
  toVariant?: NodeNetworkVariant;
  /** 0..1 — si se define junto a from/toVariant, sustituye la interpolación automática. */
  progress?: number;
  nodeCount?: number;
  seed?: number;
  /** Reactividad al cursor — Cap. 8, solo en el Hero. */
  interactive?: boolean;
}

type VariantParams = {
  connectivity: number;
  activity: number;
  broken: number;
  brightness: number;
};

const VARIANT_PARAMS: Record<NodeNetworkVariant, VariantParams> = {
  seed: { connectivity: 0.08, activity: 0.12, broken: 0.55, brightness: 0.45 },
  connected: { connectivity: 0.55, activity: 0.4, broken: 0.1, brightness: 0.75 },
  fragmenting: { connectivity: 0.22, activity: 0.22, broken: 0.45, brightness: 0.55 },
  reorganizing: { connectivity: 0.48, activity: 0.5, broken: 0.2, brightness: 0.72 },
  stable: { connectivity: 0.72, activity: 0.58, broken: 0.02, brightness: 0.92 },
};

/** Semilla/tamaño compartidos por defecto — mismo grafo "vivo" entre Hero, Problema y Transformación (Cap. 9/10: continuidad, misma red). */
export const PRIMARY_NETWORK_SEED = 7;
export const PRIMARY_NETWORK_NODE_COUNT = 42;

const ACCENT_RGB = "91, 140, 255";
const NEUTRAL_RGB = "180, 184, 194";

function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface SimNode {
  x: number;
  y: number;
  isolationThreshold: number;
  radius: number;
  phase: number;
}

interface SimEdge {
  a: number;
  b: number;
  activationThreshold: number;
}

interface Pulse {
  edgeIndex: number;
  t: number;
  speed: number;
  reverse: boolean;
}

export function NodeNetwork({
  className,
  variant = "connected",
  fromVariant,
  toVariant,
  progress,
  nodeCount = PRIMARY_NETWORK_NODE_COUNT,
  seed = PRIMARY_NETWORK_SEED,
  interactive = false,
}: NodeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // "Latest ref": el motor se crea una sola vez; variant/progress se leen
  // cada frame para poder animar sin recrear la simulación en cada scroll tick.
  const stateRef = useRef({ variant, fromVariant, toVariant, progress });
  useEffect(() => {
    stateRef.current = { variant, fromVariant, toVariant, progress };
  });

  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;

    const rand = mulberry32(seed * 1000 + nodeCount);
    const nodes: SimNode[] = Array.from({ length: nodeCount }, () => ({
      x: rand(),
      y: rand(),
      isolationThreshold: rand(),
      radius: 1.6 + rand() * 1.8,
      phase: rand() * Math.PI * 2,
    }));

    const K = 3;
    const edgeMap = new Map<string, SimEdge>();
    nodes.forEach((node, i) => {
      const nearest = nodes
        .map((other, j) => ({
          j,
          d: i === j ? Infinity : Math.hypot(node.x - other.x, node.y - other.y),
        }))
        .sort((p, q) => p.d - q.d)
        .slice(0, K);
      nearest.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeMap.has(key)) {
          edgeMap.set(key, {
            a: Math.min(i, j),
            b: Math.max(i, j),
            activationThreshold: rand(),
          });
        }
      });
    });
    const edges = Array.from(edgeMap.values());

    let pulses: Pulse[] = [];
    let animationFrame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    const startTime = performance.now();

    function resize() {
      const parent = canvasEl!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl!.width = Math.max(1, Math.round(width * dpr));
      canvasEl!.height = Math.max(1, Math.round(height * dpr));
      canvasEl!.style.width = `${width}px`;
      canvasEl!.style.height = `${height}px`;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function currentTargetParams(): VariantParams {
      const { variant: v, fromVariant: fv, toVariant: tv, progress: p } = stateRef.current;
      if (fv && tv && typeof p === "number") {
        const a = VARIANT_PARAMS[fv];
        const b = VARIANT_PARAMS[tv];
        const t = Math.min(1, Math.max(0, p));
        return {
          connectivity: lerp(a.connectivity, b.connectivity, t),
          activity: lerp(a.activity, b.activity, t),
          broken: lerp(a.broken, b.broken, t),
          brightness: lerp(a.brightness, b.brightness, t),
        };
      }
      return VARIANT_PARAMS[v];
    }

    let eased: VariantParams = { ...currentTargetParams() };

    function drawStaticFrame() {
      const target = currentTargetParams();
      renderFrame(target, 0);
    }

    function renderFrame(params: VariantParams, elapsedSeconds: number) {
      context!.clearRect(0, 0, width, height);
      const pointer = pointerRef.current;

      const isolated = nodes.map(
        (n) => smoothstep(params.broken - 0.12, params.broken + 0.12, n.isolationThreshold) < 0.5
      );

      edges.forEach((edge) => {
        const alpha = 1 - smoothstep(params.connectivity - 0.15, params.connectivity + 0.15, edge.activationThreshold);
        if (alpha <= 0.02 || isolated[edge.a] || isolated[edge.b]) return;

        const nodeA = nodes[edge.a];
        const nodeB = nodes[edge.b];
        const ax = nodeA.x * width;
        const ay = nodeA.y * height;
        const bx = nodeB.x * width;
        const by = nodeB.y * height;

        context!.beginPath();
        context!.moveTo(ax, ay);
        context!.lineTo(bx, by);
        context!.strokeStyle = `rgba(${NEUTRAL_RGB}, ${alpha * params.brightness * 0.28})`;
        context!.lineWidth = 1;
        context!.stroke();
      });

      pulses.forEach((pulse) => {
        const edge = edges[pulse.edgeIndex];
        const alpha = 1 - smoothstep(params.connectivity - 0.15, params.connectivity + 0.15, edge.activationThreshold);
        if (alpha <= 0.02) return;
        const nodeA = nodes[edge.a];
        const nodeB = nodes[edge.b];
        const t = pulse.reverse ? 1 - pulse.t : pulse.t;
        const px = lerp(nodeA.x, nodeB.x, t) * width;
        const py = lerp(nodeA.y, nodeB.y, t) * height;
        const fade = Math.sin(Math.min(1, pulse.t) * Math.PI);

        context!.beginPath();
        context!.arc(px, py, 2.2, 0, Math.PI * 2);
        context!.fillStyle = `rgba(${ACCENT_RGB}, ${fade * params.brightness})`;
        context!.fill();
      });

      nodes.forEach((node, i) => {
        const nx = node.x * width;
        const ny = node.y * height;
        let intensity = isolated[i] ? 0.25 : 0.65;

        if (interactive && pointer.active) {
          const dist = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          intensity += smoothstep(0.22, 0, dist) * 0.5;
        }

        const breathing = elapsedSeconds > 0 ? 0.85 + 0.15 * Math.sin(elapsedSeconds * 0.6 + node.phase) : 1;

        context!.beginPath();
        context!.arc(nx, ny, node.radius, 0, Math.PI * 2);
        context!.fillStyle = isolated[i]
          ? `rgba(${NEUTRAL_RGB}, ${intensity * params.brightness * breathing * 0.6})`
          : `rgba(${ACCENT_RGB}, ${intensity * params.brightness * breathing})`;
        context!.fill();
      });
    }

    function tick(now: number) {
      if (!visible) return;
      const elapsedSeconds = (now - startTime) / 1000;
      const target = currentTargetParams();
      const driven = typeof stateRef.current.progress === "number";
      const smoothing = driven ? 1 : 0.04;

      eased = {
        connectivity: lerp(eased.connectivity, target.connectivity, smoothing),
        activity: lerp(eased.activity, target.activity, smoothing),
        broken: lerp(eased.broken, target.broken, smoothing),
        brightness: lerp(eased.brightness, target.brightness, smoothing),
      };

      pulses = pulses.filter((p) => p.t <= 1);
      edges.forEach((edge, idx) => {
        const alpha = 1 - smoothstep(eased.connectivity - 0.15, eased.connectivity + 0.15, edge.activationThreshold);
        if (alpha > 0.3 && Math.random() < eased.activity * 0.003 && pulses.length < 10) {
          pulses.push({ edgeIndex: idx, t: 0, speed: 0.35 + Math.random() * 0.35, reverse: Math.random() < 0.5 });
        }
      });
      pulses.forEach((p) => {
        p.t += p.speed * 0.016;
      });

      renderFrame(eased, elapsedSeconds);
      animationFrame = requestAnimationFrame(tick);
    }

    resize();

    if (prefersReducedMotion) {
      drawStaticFrame();
    } else {
      animationFrame = requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) drawStaticFrame();
    });
    if (canvasEl.parentElement) resizeObserver.observe(canvasEl.parentElement);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !prefersReducedMotion) {
          cancelAnimationFrame(animationFrame);
          animationFrame = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(canvasEl);

    function handlePointerMove(e: PointerEvent) {
      const rect = canvasEl!.getBoundingClientRect();
      pointerRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    }
    function handlePointerLeave() {
      pointerRef.current.active = false;
    }

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [seed, nodeCount, interactive, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
