'use client';

import { motion } from 'framer-motion';

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      {[0, 1, 2].map((line) => (
        <motion.span
          key={line}
          className="block h-0.5 w-6 bg-slate"
          animate={open ? menuVariants.open[line] : menuVariants.closed[line]}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const menuVariants = {
  closed: [
    { rotate: 0, translateY: 0, opacity: 1 },
    { opacity: 1 },
    { rotate: 0, translateY: 0, opacity: 1 }
  ],
  open: [
    { rotate: 45, translateY: 6 },
    { opacity: 0 },
    { rotate: -45, translateY: -6 }
  ]
};
