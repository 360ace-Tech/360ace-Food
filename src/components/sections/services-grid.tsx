'use client';

import { motion } from 'framer-motion';
import { getServices } from '@/lib/content';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

const cardVariants = {
  initial: { y: 0, rotateX: 0, rotateY: 0, boxShadow: '0 25px 60px -40px rgba(20, 60, 30, 0.25)' },
  hover: {
    y: -10,
    rotateX: 4,
    rotateY: -3,
    boxShadow: '0 45px 80px -40px rgba(20, 60, 30, 0.35)'
  }
};

export function ServicesGrid() {
  const serviceGroups = getServices();

  return (
    <section id="services" className="anchor-offset mx-auto mt-24 w-full max-w-6xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="End-to-end programs tailored to your operating reality."
          description="Modular engagements that strengthen compliance, accelerate innovation, and empower teams to own food safety outcomes."
        />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <motion.article
              key={group.category}
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white/90 p-6 text-slate shadow-brand sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -inset-px bg-gradient-to-br from-ember/10 via-transparent to-transparent" />
              </div>
              <h3 className="font-display text-xl text-midnight">{group.category}</h3>
              <p className="mt-3 text-sm text-slate/70">{group.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate/70">
                {group.services.map((service) => (
                  <li key={service} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
