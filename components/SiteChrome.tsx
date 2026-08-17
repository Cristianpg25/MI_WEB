"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

/** Chrome del sitio: Lenis + Navbar + contenido + Footer + Chat + Cookies. */
export function SiteChrome({ children }: { children: ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </>
  );
}
