'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate/60">Stay current</p>
      <p className="mt-3 text-sm text-slate/70">
        Monthly field notes on regulatory shifts and proactive food safety strategies.
      </p>
      <form
        className="mt-4 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus('success');
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-full border border-emerald-900/10 bg-white px-4 py-2 text-sm text-slate placeholder:text-slate/40 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/40"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Subscribe
        </button>
        {status === 'success' && <p className="text-xs text-ember">Thanks! Please confirm in your inbox.</p>}
        {status === 'error' && <p className="text-xs text-red-400">Something went wrong. Try again.</p>}
      </form>
    </div>
  );
}
