"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type RecordEntry = { count: number; lastViewed: number };
const STORAGE_KEY = "article:viewCounts";

function readAll(): Record<string, RecordEntry> {
  try {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, RecordEntry>) : {};
  } catch {
    return {};
  }
}

function writeAll(map: Record<string, RecordEntry>) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return (n / 1000).toFixed(1) + "k";
  if (n < 1_000_000) return Math.round(n / 1000) + "k";
  return (n / 1_000_000).toFixed(1) + "m";
}

export default function ViewCount({
  slug,
  incrementOnMount = false,
  showZero = false,
  className,
}: {
  slug: string;
  incrementOnMount?: boolean;
  showZero?: boolean;
  className?: string;
}) {
  const [count, setCount] = useState<number | null>(null);

  // Initial read
  useEffect(() => {
    const map = readAll();
    setCount(map[slug]?.count ?? 0);
  }, [slug]);

  // Increment logic (session + 30m throttle)
  useEffect(() => {
    if (!incrementOnMount) return;
    const minIntervalMs = 1000 * 60 * 30; // 30 minutes
    const map = readAll();
    const rec = map[slug] ?? { count: 0, lastViewed: 0 };

    try {
      if (typeof window !== "undefined") {
        const sessionKey = `${STORAGE_KEY}:session:${slug}`;
        if (window.sessionStorage.getItem(sessionKey) === "1") return;
        window.sessionStorage.setItem(sessionKey, "1");
      }
    } catch {}

    if (Date.now() - (rec.lastViewed || 0) < minIntervalMs) return;

    const next = { count: Math.max(0, rec.count ?? 0) + 1, lastViewed: Date.now() };
    map[slug] = next;
    writeAll(map);
    setCount(next.count);
  }, [incrementOnMount, slug]);

  if (count === null) {
    return (
      <span className={className ?? "text-[10px] sm:text-xs text-neutral"} aria-label="Views">
        —
      </span>
    );
  }
  if (!showZero && count === 0) return null;

  const formatted = formatCount(count);

  return (
    <span
      className={
        className ??
        "inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral"
      }
      aria-label="Views"
    >
      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>{formatted}</span>
    </span>
  );
}

