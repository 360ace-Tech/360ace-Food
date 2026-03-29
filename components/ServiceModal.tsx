"use client";

/**
 * ServiceModal — animated popup slide presentation for each service.
 *
 * ── UPDATING CONTENT ──────────────────────────────────────────────────────────
 * All content is driven by `data/services-detail.json`.
 * To update a service: edit the relevant entry in that file.
 *   • `title`, `tagline`, `description`  — shown in the modal header
 *   • `slides[]`                          — one slide per feature/capability
 *     - `icon`    → Lucide icon name (must be listed in ICON_MAP below)
 *     - `feature` → slide headline
 *     - `detail`  → 2–3 sentence explanation
 *     - `stat`    → optional { value, label } callout in top-right
 *
 * To add a new icon, add it to both the import list and ICON_MAP below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useLayoutEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  FileCheck,
  ClipboardCheck,
  Factory,
  Microscope,
  Thermometer,
  Scale,
  BadgeCheck,
  AlertTriangle,
  Search,
  FileEdit,
  GitBranch,
  Folder,
  FlaskConical,
  BarChart2,
  Link2,
  Wrench,
  Workflow,
  PieChart,
  Atom,
  BookOpen,
  CheckSquare,
  FileSearch,
  PenTool,
  RefreshCw,
  CalendarDays,
  LayoutTemplate,
  Users2,
  TrendingUp,
  MapPin,
  FileStack,
  Tag,
  Shield,
  Globe,
  Calculator,
} from "lucide-react";

// ── Icon registry — add new icons here + to the import above ──────────────────
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  FileCheck,
  ClipboardCheck,
  Factory,
  Microscope,
  Thermometer,
  Scale,
  BadgeCheck,
  AlertTriangle,
  Search,
  FileEdit,
  GitBranch,
  Folder,
  FlaskConical,
  BarChart2,
  Link2,
  Wrench,
  Workflow,
  PieChart,
  Atom,
  BookOpen,
  CheckSquare,
  FileSearch,
  PenTool,
  RefreshCw,
  CalendarDays,
  LayoutTemplate,
  Users2,
  TrendingUp,
  MapPin,
  FileStack,
  Tag,
  Shield,
  Globe,
  Calculator,
};

// ── Types (mirrors services-detail.json shape) ────────────────────────────────
export interface ServiceSlide {
  icon: string;
  feature: string;
  detail: string;
  stat?: { value: string; label: string };
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: "emerald" | "orange" | "slate"; // kept for JSON compatibility, not used in UI
  slides: ServiceSlide[];
}

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  // ── SYNC reset slide index when a different service opens ──────────────────
  // useLayoutEffect runs before the next paint, so `currentSlide` is 0 on
  // the very first render with the new service — prevents slides[N] = undefined.
  useLayoutEffect(() => {
    setCurrentSlide(0);
  }, [service?.id]);

  // ── Open animation ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!service) return;

    const tl = gsap.timeline();
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    ).fromTo(
      panelRef.current,
      { scale: 0.88, opacity: 0, y: 28 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" },
      "-=0.25"
    );

    gsap.fromTo(
      slideRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.32 }
    );

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [service?.id]); // re-run only when the service identity changes

  // ── Close animation ───────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 16,
      duration: 0.3,
      ease: "power2.in",
    }).to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");
  }, [onClose]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
      if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, currentSlide, handleClose]);

  // ── Slide transition ──────────────────────────────────────────────────────
  const goToSlide = useCallback(
    (index: number) => {
      if (!service || animating) return;
      const total = service.slides.length;
      const next = ((index % total) + total) % total;
      if (next === currentSlide) return;

      const direction = next > currentSlide ? 1 : -1;
      setAnimating(true);

      gsap.to(slideRef.current, {
        x: -55 * direction,
        opacity: 0,
        duration: 0.26,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlide(next);
          gsap.fromTo(
            slideRef.current,
            { x: 55 * direction, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.36,
              ease: "power3.out",
              onComplete: () => setAnimating(false),
            }
          );
        },
      });
    },
    [service, animating, currentSlide]
  );

  // ── Guard: nothing to render ──────────────────────────────────────────────
  if (!service) return null;

  const total = service.slides.length;
  // Safety: clamp index so slides[idx] is never undefined even during
  // the single-frame gap before useLayoutEffect resets currentSlide.
  const safeIdx = Math.min(currentSlide, total - 1);
  const slide = service.slides[safeIdx];
  if (!slide) return null;

  const SlideIcon = ICON_MAP[slide.icon] ?? ArrowRight;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{ opacity: 0 }}
      onClick={(e) => e.target === backdropRef.current && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-dark/50"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-brand-subtle"
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-brand-subtle px-6 sm:px-8 py-5 rounded-t-3xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-1">
                {service.tagline}
              </p>
              <h2 className="font-display font-bold text-lg sm:text-xl leading-tight text-dark">
                {service.title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-subtle flex items-center justify-center text-neutral hover:border-brand/40 hover:text-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Slide content ── */}
        <div className="px-6 sm:px-8 pt-6 pb-4">
          <div ref={slideRef} style={{ opacity: 0 }}>

            {/* Slide position + optional stat */}
            <div className="flex items-center justify-between mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-brand">
                <span className="opacity-60">Feature</span>
                <span>{safeIdx + 1} / {total}</span>
              </span>
              {slide.stat && (
                <div className="text-right">
                  <p className="font-display font-bold text-xl text-dark leading-none">
                    {slide.stat.value}
                  </p>
                  <p className="text-[10px] text-neutral uppercase tracking-wider mt-0.5">
                    {slide.stat.label}
                  </p>
                </div>
              )}
            </div>

            {/* Icon + Feature headline */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <SlideIcon className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-dark leading-tight mb-1.5">
                  {slide.feature}
                </h3>
                <div className="w-8 h-0.5 bg-brand rounded-full" />
              </div>
            </div>

            {/* Expanded detail */}
            <p className="text-neutral text-sm sm:text-base leading-relaxed">
              {slide.detail}
            </p>
          </div>
        </div>

        {/* ── Footer navigation ── */}
        <div className="sticky bottom-0 bg-white border-t border-brand-subtle px-6 sm:px-8 py-4 rounded-b-3xl">
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Dot progress indicators */}
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Slide indicators"
            >
              {service.slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === safeIdx}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    i === safeIdx
                      ? "bg-brand w-5 h-1.5"
                      : "bg-emerald-200 w-1.5 h-1.5 hover:bg-brand/50"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToSlide(safeIdx - 1)}
                disabled={animating}
                className="w-9 h-9 rounded-full border border-brand-subtle flex items-center justify-center text-neutral hover:border-brand/40 hover:text-dark transition-colors disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToSlide(safeIdx + 1)}
                disabled={animating}
                className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand/90 transition-colors disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label="Next feature"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={handleClose}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 transition-all"
          >
            Enquire about this service
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
