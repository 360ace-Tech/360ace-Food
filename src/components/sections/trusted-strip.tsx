'use client';

import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { getStats } from '@/lib/content';
import { useHasEnteredView } from '@/hooks/use-has-entered-view';
import { Reveal } from '@/components/ui/reveal';

type StatProps = {
  value: string;
  label: string;
};

function StatCard({ value, label }: StatProps) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);
  const { ref, hasEntered } = useHasEnteredView<HTMLDivElement>();

  useEffect(() => {
    if (!hasEntered) return;
    const controls = animate(count, numeric, { duration: 1.6, ease: 'easeOut' });
    return controls.stop;
  }, [count, hasEntered, numeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 1, opacity: 0 }}
      whileInView={{ scale: 1.02, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="flex flex-col gap-2 rounded-2xl border border-emerald-900/10 bg-white px-5 py-4 transition hover:border-ember/40"
    >
      <motion.span className="font-display text-3xl text-midnight">
        {display}
      </motion.span>
      <p className="text-sm text-slate/70">{label}</p>
    </motion.div>
  );
}

export function TrustedStrip() {
  const stats = getStats();

  return (
    <section className="mt-24">
      <Reveal>
        <div className="mx-auto grid w-full max-w-5xl gap-5 rounded-3xl border border-emerald-900/10 bg-white/90 px-5 py-8 text-slate shadow-brand sm:gap-6 sm:px-6 sm:py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
