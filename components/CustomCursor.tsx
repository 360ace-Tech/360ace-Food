"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursorDot = cursorDotRef.current;
    const cursorCircle = cursorCircleRef.current;
    if (!cursorDot || !cursorCircle) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      if (cursorCircle) {
        cursorCircle.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      }
    };
    gsap.ticker.add(tick);

    const hoverTargets = document.querySelectorAll("a, button, .group, .card");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("hover-active"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("hover-active"));
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorCircleRef} className="cursor-circle"></div>
    </>
  );
}
