import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white pt-16 pb-8 px-6 border-t border-neutral/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo-light.png"
                alt="360ACE.FOOD logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg bg-slate-900 object-contain p-1.5"
              />
              <span className="font-display font-bold text-2xl tracking-tight text-dark">
                360ACE.<span className="text-brand">FOOD</span>
              </span>
            </div>
            <p className="text-sm text-neutral max-w-md">
              Safeguarding food systems with evidence-based strategy, agile implementation, and
              enduring partnerships across the world.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral/60 mb-1">
              Explore
            </span>
            <Link href="/#home" scroll={false} className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Home</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/#services" scroll={false} className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Services</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/#process" scroll={false} className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Process</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/#experts" scroll={false} className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Experts</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral/60 mb-1">
              Resources
            </span>
            <Link href="/self-check" className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Self-check</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/insights" className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Insights</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-1 text-sm text-dark transition-colors hover:text-brand">
              <span className="link-underline">Contact</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-neutral/10 gap-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral/60 footer-copy">
            © {year} 360ace.Food Consulting. <span className="copy-extra">All rights reserved.</span>
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral/60 hover:text-dark"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral/60 hover:text-dark"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
