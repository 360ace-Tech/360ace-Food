"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [active, setActive] = useState<"home" | "services" | "process" | "insights" | null>(null);

  useEffect(() => {
    const sections: { id: string; key: typeof active }[] = [
      { id: "home", key: "home" },
      { id: "services", key: "services" },
      { id: "process", key: "process" },
      { id: "insights", key: "insights" },
    ];

    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const ob = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(key);
          });
        },
        { root: null, threshold: 0.3 }
      );
      ob.observe(el);
      observers.push(ob);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const itemClasses = (key: typeof active) =>
    `px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.19em] transition-all duration-300 ${
      active === key || (key === "insights" && pathname.startsWith("/insights"))
        ? "bg-brand text-white"
        : "text-neutral hover:text-dark hover:bg-white"
    }`;

  return (
    <nav className="fixed top-6 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
      <div className="pointer-events-auto glass-panel rounded-full px-3 py-2 flex items-center shadow-lg shadow-black/5 transition-transform hover:scale-[1.02] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
        <Link
          href="/"
          className="pl-5 pr-7 font-display font-bold text-lg md:text-xl tracking-tight text-dark hover:text-brand transition-colors flex items-center gap-2"
        >
          <Image
            src="/images/logo-dark.png"
            alt="360ace.FOOD logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span>
            360ACE. <span className="text-brand">FOOD</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-light rounded-full p-1">
          <Link href="/#home" scroll={false} className={itemClasses("home")}>
            Home
          </Link>
          <Link href="/#services" scroll={false} className={itemClasses("services")}>
            Services
          </Link>
          <Link href="/#process" scroll={false} className={itemClasses("process")}>
            Process
          </Link>
          <Link href="/insights" className={itemClasses("insights")}>
            Insights
          </Link>
        </div>

        <Link
          href="/contact"
          className="ml-2 md:ml-4 bg-brand hover:bg-brand/90 text-white px-7 md:px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.19em] transition-colors duration-300 flex items-center gap-2 group"
        >
          <span>Book consultation</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
