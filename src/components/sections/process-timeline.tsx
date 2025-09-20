'use client';

import { motion } from 'framer-motion';
import { getProcess } from '@/lib/content';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

const itemVariants = {
  initial: { y: 0, scale: 1, borderColor: 'rgba(30, 80, 40, 0.15)' },
  hover: {
    y: -8,
    scale: 1.02,
    borderColor: 'rgba(123, 191, 63, 0.55)',
    transition: { type: 'spring', stiffness: 220, damping: 18 }
  }
};

export function ProcessTimeline() {
  const steps = getProcess();

  return (
    <section id="process" className="anchor-offset mx-auto mt-24 w-full max-w-6xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Process"
          title="Clarity at every stage of engagement."
          description="A partnership designed to reveal insights quickly, deploy with precision, and sustain measurable performance."
        />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial="initial"
            whileHover="hover"
            variants={itemVariants}
            className="relative rounded-3xl border border-emerald-900/10 bg-white/90 p-5 text-slate shadow-sm sm:p-6"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ember/90 text-sm font-semibold text-midnight shadow-brand">
                {index + 1}
              </div>
              <h3 className="font-display text-lg text-midnight">{step.step}</h3>
              <p className="mt-3 text-sm text-slate/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
