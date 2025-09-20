'use client';

import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const defaultTarget = dayjs().add(14, 'day');
const segments = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

dayjs.extend(duration);

type CountdownProps = {
  targetIso: string;
};

export default function MaintenanceCountdown({ targetIso }: CountdownProps) {
  const targetDate = useMemo(() => dayjs(targetIso), [targetIso]);
  const [remaining, setRemaining] = useState(() => computeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(computeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {segments.map((segment) => (
          <CountdownCard key={segment} label={segment} value={remaining[segment.toLowerCase() as keyof Remaining]} />
        ))}
      </div>
      <p className="text-sm text-slate/60">
        Launch target: <span className="font-semibold text-slate/80">{targetDate.format('MMMM D, YYYY • h:mm A')}</span>
      </p>
      <div className="flex flex-col gap-3 rounded-2xl bg-white/60 p-4 text-sm text-slate/70 backdrop-blur md:flex-row md:items-center md:justify-between">
        <span className="font-semibold text-slate/80">Stay in the loop</span>
        <form
          className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-end"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-sm focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-midnight px-5 py-2 text-sm font-semibold text-white shadow-brand transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Notify me
          </button>
        </form>
      </div>
    </div>
  );
}

type Remaining = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function computeRemaining(targetDate: dayjs.Dayjs): Remaining {
  const diff = Math.max(targetDate.diff(dayjs()), 0);
  const dur = dayjs.duration(diff);
  const formatSegment = (value: number) => value.toString().padStart(2, '0');

  return {
    days: formatSegment(Math.floor(dur.asDays())),
    hours: formatSegment(dur.hours()),
    minutes: formatSegment(dur.minutes()),
    seconds: formatSegment(dur.seconds())
  };
}

type CountdownCardProps = {
  label: (typeof segments)[number];
  value: string;
};

function CountdownCard({ label, value }: CountdownCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-900/15 bg-white/80 p-4 text-center shadow-brand">
      <div className="font-display text-3xl text-midnight sm:text-4xl">{value}</div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate/60">{label}</p>
    </div>
  );
}
