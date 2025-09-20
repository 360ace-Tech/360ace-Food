import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(123,191,63,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(246,164,82,0.16),_transparent_60%),linear-gradient(180deg,_#f0f6ee,_#dbeee1)] px-6 py-16 text-slate">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[12%] top-[18%] h-64 w-64 rounded-full bg-ember/18 blur-[140px]" />
        <div className="absolute right-[15%] bottom-[12%] h-72 w-72 rounded-full bg-sage/16 blur-[160px]" />
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <span className="font-display text-sm tracking-[0.32em] text-slate/70">360ACE.FOOD</span>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-ember">Page not found</p>
          <h1 className="font-display text-4xl text-midnight sm:text-5xl">We couldn’t find the flavour you’re after.</h1>
          <p className="text-base text-slate/70 sm:text-lg">
            The page may have moved or no longer exists. Explore our services, or return to the homepage to keep building safer food systems.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#home"
            className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Back to homepage
          </Link>
          <Link
            href="/insights"
            className="inline-flex items-center justify-center rounded-full border border-emerald-900/15 bg-white px-6 py-3 text-sm font-semibold text-slate/80 transition hover:-translate-y-0.5 hover:border-ember/40"
          >
            Browse insights
          </Link>
        </div>
      </div>
    </div>
  );
}
