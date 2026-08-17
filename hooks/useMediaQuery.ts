"use client";

import { useCallback, useSyncExternalStore } from "react";
import { BREAKPOINTS } from "@/lib/motion";

/**
 * Hook de breakpoint SSR-safe vía useSyncExternalStore: evita el parpadeo
 * de hidratación de un `useState` + `useEffect` (servidor y primer render
 * de cliente comparten el mismo snapshot antes de sincronizar con el real).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Atajo — Cap. 4.3 del Blueprint: scroll horizontal solo desde 1280px. */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
