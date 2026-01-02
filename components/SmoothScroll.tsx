"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    rafRef.current = raf;
    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    // Smooth anchor link handling
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href) return;
      const isHashOnly = href.startsWith("#");
      const isRootHash = href.startsWith("/#") && window.location.pathname === "/";
      if (!(isHashOnly || isRootHash)) return;
      const hash = isHashOnly ? href : href.slice(1);
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -10 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    const smoothToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const start = performance.now();
      const maxMs = 3000; // robust retry to outlast loader/images
      const step = () => {
        const el = document.querySelector(hash) as HTMLElement | null;
        if (el) {
          lenis.scrollTo(el, { offset: -88 }); // account for fixed nav
        }
        if (performance.now() - start < maxMs) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const onHashChange = () => smoothToHash();
    window.addEventListener("hashchange", onHashChange);

    // If page loads with a hash, scroll to it smoothly
    if (window.location.hash) smoothToHash();

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      if (rafRef.current) gsap.ticker.remove(rafRef.current);
      lenis.destroy();
    };
  }, []);

  // After any route change, if a hash exists, scroll to it smoothly once the DOM is ready.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (!window.location.hash) return;
    // after route change, perform the robust hash scroll
    const raf = () => {
      const hash = window.location.hash;
      const start = performance.now();
      const maxMs = 3000;
      const tick = () => {
        const el = document.querySelector(hash) as HTMLElement | null;
        if (el) lenis.scrollTo(el, { offset: -88 });
        if (performance.now() - start < maxMs) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    raf();
  }, [pathname]);

  return <>{children}</>;
}
