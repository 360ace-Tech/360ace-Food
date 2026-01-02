"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Briefcase, GitBranch, Mail, Newspaper, Users } from "lucide-react";

export default function MobileFloatNav() {
  const pathname = usePathname();
  const [active, setActive] = useState<
    "home" | "services" | "process" | "experts" | "insights" | "contact" | null
  >(null);
  const [hintAll, setHintAll] = useState<boolean>(true);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    // Auto-hint once for ~3s
    const t = setTimeout(() => setHintAll(false), 3000);

    // Single observer that picks the most-visible section
    type SectionKey = "home" | "services" | "process" | "experts" | "contact";
    const map: Record<SectionKey, SectionKey> = {
      home: "home",
      services: "services",
      process: "process",
      experts: "experts",
      contact: "contact",
    };
    const ids: SectionKey[] = ["home", "services", "process", "experts", "contact"];
    const els = ids
      .map((id) => ({ id, el: document.getElementById(id) as HTMLElement | null }))
      .filter((x): x is { id: SectionKey; el: HTMLElement } => !!x.el);

    let obs: IntersectionObserver | null = null;
    if (els.length && pathname === "/") {
      obs = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) {
            const key = map[(visible.target as HTMLElement).id as SectionKey];
            if (key) setActive(key);
          }
        },
        { root: null, rootMargin: "-45% 0% -45% 0%", threshold: [0.1, 0.25, 0.5, 0.75] }
      );
      els.forEach(({ el }) => obs!.observe(el));

      // fallback: compute closest section to viewport center on scroll
      let ticking = false;
      const compute = () => {
        ticking = false;
        if (pathname !== "/") return;
        const center = window.innerHeight * 0.45;
        let bestId: SectionKey | null = null;
        let bestDist = Infinity;
        els.forEach(({ id, el }) => {
          const r = el.getBoundingClientRect();
          const mid = r.top + r.height / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = id;
          }
        });
        if (bestId) setActive(map[bestId]);
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(compute);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      // immediate compute
      compute();
      // cleanup additions
      const prevDisconnect = obs.disconnect.bind(obs);
      obs.disconnect = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        prevDisconnect();
      };
    }

    return () => {
      clearTimeout(t);
      obs?.disconnect();
    };
  }, [pathname]);

  const btn = (isActive: boolean) =>
    `group h-10 w-10 rounded-full grid place-items-center transition relative ${
      isActive ? "bg-brand text-white" : "text-neutral hover:text-dark hover:bg-white/80"
    }`;

  const tip = (label: string, index: number) =>
    `absolute right-12 z-50 bg-white text-dark border border-white/60 text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none flex items-center gap-1 \
     ${hintAll || hovered === index ? "opacity-100 -translate-x-1" : "opacity-0 translate-x-0"} \
     group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200`;

  const dot = "w-1.5 h-1.5 rounded-full bg-brand";
  const enter = (i: number) => { setHintAll(false); setHovered(i); };
  const leave = () => setHovered(null);
  const showTop = pathname === "/" && active && active !== "home";

  return (
    <div className="fixed right-3 top-20 z-50 md:hidden pointer-events-auto">
      <div className="flex flex-col gap-2 bg-white/60 border border-white/40 rounded-full p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-xl items-center">
        
        <Link
          href="/#home"
          scroll={false}
          aria-label="Home"
          className={btn(pathname === "/" ? active === "home" : false)}
          onMouseEnter={() => enter(0)}
          onMouseLeave={leave}
          onFocus={() => enter(0)}
          onBlur={leave}
          onTouchStart={() => enter(0)}
          onTouchEnd={leave}
          onClick={() => { setHovered(null); setHintAll(false); }}
        >
          <Home className="h-4 w-4" />
          <span className={tip("Home", 0)}><span className={dot} />Home</span>
        </Link>

        <Link
          href="/#services"
          scroll={false}
          aria-label="Services"
          className={btn(pathname === "/" ? active === "services" : false)}
          onMouseEnter={() => enter(1)}
          onMouseLeave={leave}
          onFocus={() => enter(1)}
          onBlur={leave}
          onTouchStart={() => enter(1)}
          onTouchEnd={leave}
          onClick={() => { setHovered(null); setHintAll(false); }}
        >
          <Briefcase className="h-4 w-4" />
          <span className={tip("Services", 1)}><span className={dot} />Services</span>
        </Link>

        <Link
          href="/#process"
          scroll={false}
          aria-label="Process"
          className={btn(pathname === "/" ? active === "process" : false)}
          onMouseEnter={() => enter(2)}
          onMouseLeave={leave}
          onFocus={() => enter(2)}
          onBlur={leave}
          onTouchStart={() => enter(2)}
          onTouchEnd={leave}
          onClick={() => { setHovered(null); setHintAll(false); }}
        >
          <GitBranch className="h-4 w-4" />
          <span className={tip("Process", 2)}><span className={dot} />Process</span>
        </Link>

        <Link
          href="/#experts"
          scroll={false}
          aria-label="Experts"
          className={btn(pathname === "/" ? active === "experts" : false)}
          onMouseEnter={() => enter(3)}
          onMouseLeave={leave}
          onFocus={() => enter(3)}
          onBlur={leave}
          onTouchStart={() => enter(3)}
          onTouchEnd={leave}
          onClick={() => { setHovered(null); setHintAll(false); }}
        >
          <Users className="h-4 w-4" />
          <span className={tip("Experts", 3)}><span className={dot} />Experts</span>
        </Link>

        <Link
          href="/insights"
          aria-label="Insights"
          className={btn(pathname.startsWith("/insights"))}
          onMouseEnter={() => enter(4)}
          onMouseLeave={leave}
          onFocus={() => enter(4)}
          onBlur={leave}
          onTouchStart={() => enter(4)}
          onTouchEnd={leave}
          onClick={() => { setHovered(null); setHintAll(false); }}
        >
          <Newspaper className="h-4 w-4" />
          <span className={tip("Insights", 4)}><span className={dot} />Insights</span>
        </Link>

        <Link
          href="/contact"
          aria-label="Contact"
          className={btn(pathname === "/contact")}
          onMouseEnter={() => enter(5)}
          onMouseLeave={leave}
          onFocus={() => enter(5)}
          onBlur={leave}
          onTouchStart={() => enter(5)}
          onTouchEnd={leave}
          onClick={() => { setHovered(null); setHintAll(false); }}
        >
          <Mail className="h-4 w-4" />
          <span className={tip("Contact", 5)}><span className={dot} />Contact</span>
        </Link>

        {showTop && (
          <Link
            href="/#home"
            scroll={false}
            aria-label="Back to top"
            className={btn(false)}
            onMouseEnter={() => enter(6)}
            onMouseLeave={leave}
            onFocus={() => enter(6)}
            onBlur={leave}
            onTouchStart={() => enter(6)}
            onTouchEnd={leave}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="text-current" aria-hidden>
              <path d="M12 5l7 7H5z" fill="currentColor" />
            </svg>
            <span className={tip("Top", 6)}><span className={dot} />Top</span>
          </Link>
        )}
      </div>
    </div>
  );
}
