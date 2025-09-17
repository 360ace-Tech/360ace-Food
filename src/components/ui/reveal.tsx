'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useHasEnteredView } from '@/hooks/use-has-entered-view';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  variant?: 'fade-up' | 'fade-in';
};

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  },
  'fade-in': {
    hidden: { opacity: 0, filter: 'blur(6px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  }
};

export function Reveal({ children, className, delay = 0, threshold = 0.4, variant = 'fade-up' }: RevealProps) {
  const { ref, hasEntered } = useHasEnteredView<HTMLDivElement>(threshold);

  return (
    <motion.div
      ref={ref}
      className={clsx(className)}
      variants={variants[variant]}
      initial="hidden"
      animate={hasEntered ? 'visible' : 'hidden'}
      transition={{ delay, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
