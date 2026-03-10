"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const loaderBar = loaderBarRef.current;
    if (!loader || !loaderBar) return;

    const tlLoader = gsap.timeline();
    tlLoader
      .to(loaderBar, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });
  }, []);

  return (
    <div ref={loaderRef} className="loader" id="loader">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src="/images/logo-dark.png"
          alt="360ACE Food Logo"
          width={48}
          height={48}
          className="w-10 h-10 md:w-12 md:h-12"
        />
        <div className="font-display font-bold text-3xl md:text-4xl tracking-tighter text-dark">
          360ACE.<span className="text-brand">FOOD</span>
        </div>
      </div>
      <div className="w-64 h-[2px] bg-gray-100 rounded-full overflow-hidden">
        <div ref={loaderBarRef} className="loader-bar" id="loader-bar"></div>
      </div>
    </div>
  );
}
