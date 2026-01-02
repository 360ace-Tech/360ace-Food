"use client";

import { useEffect, useMemo, useRef } from "react";
import { Leaf } from "lucide-react";

class Node {
  angle: number;
  radius: number;
  speed: number;
  wobble: number;
  x = 0;
  y = 0;
  alpha: number;
  cluster: boolean;

  constructor(h: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 80 + Math.random() * 240;
    this.speed = 0.0008 + Math.random() * 0.0018;
    this.wobble = (Math.random() - 0.5) * (h * 0.6);
    this.alpha = 0.32 + Math.random() * 0.38;
    this.cluster = Math.random() < 0.4; // increase clustered nodes for richer pockets
  }

  update(w: number, h: number) {
    this.angle += this.speed;
    this.x = w / 2 + Math.cos(this.angle) * this.radius;
    this.y =
      h / 2 +
      this.wobble * Math.sin(this.angle * 0.45) +
      Math.sin(Date.now() * 0.001 + this.radius) * 12;
  }
}

export default function HeroMolecule() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const leafRefs = useRef<HTMLDivElement[]>([]);

  // choose a subset of indices to host leaves
  const leafIndices = useMemo(() => {
    const set = new Set<number>();
    const totalLeaves = 34;
    while (set.size < totalLeaves) set.add(Math.floor(Math.random() * 90));
    return Array.from(set.values());
  }, []);

  const leafSizes = useMemo(() => {
    // blend of small and large leaves
    return [...new Array(34)].map(() => {
      const large = Math.random() < 0.4;
      return large ? 30 + Math.floor(Math.random() * 12) : 12 + Math.floor(Math.random() * 8);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      if (!wrapper) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.floor(wrapper.clientWidth);
      h = Math.floor(wrapper.clientHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // init nodes
    nodesRef.current = [];
    const COUNT = 62; // tuned overall density
    for (let i = 0; i < COUNT; i++) nodesRef.current.push(new Node(h));

    // map leaf indices to dom elements
    leafRefs.current = leafRefs.current.slice(0, leafIndices.length);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) nodes[i].update(w, h);

      // connections (variable density)
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const d = Math.hypot(dx, dy);
          const isClusterPair = ni.cluster || nj.cluster;
          const maxD = isClusterPair ? 125 : 66; // richer clusters, less global clutter
          if (d < maxD) {
            const t = 1 - d / maxD; // proximity factor
            ctx.strokeStyle = isClusterPair
              ? `rgba(100,116,139,${0.24 * t})`
              : `rgba(148,163,184,${0.12 * t})`;
            const lw = isClusterPair ? 0.6 + 0.6 * t : 0.4 + 0.3 * t; // thicker as nodes are closer
            ctx.lineWidth = lw;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.stroke();
          }
        }
      }

      // position leaves at selected node positions
      for (let k = 0; k < leafIndices.length; k++) {
        const idx = leafIndices[k];
        const n = nodes[idx % nodes.length];
        const el = leafRefs.current[k];
        if (el && n) {
          const s = leafSizes[k] || 18;
          el.style.transform = `translate(${n.x - s / 2}px, ${n.y - s / 2}px)`;
          el.style.opacity = String(0.7);
        }
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [leafIndices]);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" aria-hidden />
      {/* Leaves positioned by RAF (no React re-render) */}
      {leafIndices.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) leafRefs.current[i] = el;
          }}
          className="absolute z-10"
          style={{ opacity: 0, width: leafSizes[i], height: leafSizes[i] }}
        >
          <Leaf className="text-brand" width={leafSizes[i]} height={leafSizes[i]} strokeWidth={1.6} />
        </div>
      ))}
    </div>
  );
}
