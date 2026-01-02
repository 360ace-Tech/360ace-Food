import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-[15vw] md:text-[12rem] leading-none tracking-tighter text-brand opacity-20">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-light">
          <div className="w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-dark mb-4">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-neutral text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back to
          exploring our food safety solutions.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="px-9 py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            <span>Back to home</span>
          </Link>

          <Link
            href="/#services"
            className="px-9 py-4 bg-white border border-brand-subtle text-dark rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center gap-2 group"
          >
            <span>View services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-16 pt-8 border-t border-neutral/10">
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-4">
            Popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#services"
              className="text-sm text-dark hover:text-brand transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#process"
              className="text-sm text-dark hover:text-brand transition-colors"
            >
              Process
            </Link>
            <Link
              href="/#experts"
              className="text-sm text-dark hover:text-brand transition-colors"
            >
              Experts
            </Link>
            <Link
              href="/#insights"
              className="text-sm text-dark hover:text-brand transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-dark hover:text-brand transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
