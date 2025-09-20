'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getTestimonials } from '@/lib/content';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export function Testimonials() {
  const testimonials = getTestimonials();
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted across food manufacturing, labs, and innovation hubs."
        />
      </Reveal>
      <Reveal delay={0.1}>
        <motion.div
          whileHover={{ boxShadow: '0 30px 80px -50px rgba(20, 60, 30, 0.35)' }}
          className="mt-12 rounded-3xl border border-emerald-900/10 bg-white px-6 py-8 text-slate shadow-brand sm:px-8 sm:py-12"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={testimonial.quote}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-lg"
          >
            <p className="font-light text-slate/80">“{testimonial.quote}”</p>
            <footer className="text-sm uppercase tracking-[0.24em] text-slate/60">
              {testimonial.author} · {testimonial.company}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-end gap-3">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.quote}
              type="button"
              aria-label={`Show testimonial ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
              className={`h-2.5 w-7 rounded-full transition ${
                itemIndex === index ? 'bg-ember' : 'bg-slate/20'
              }`}
            />
            ))}
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
