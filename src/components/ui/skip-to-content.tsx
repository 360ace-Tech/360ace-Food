'use client';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-midnight focus:px-4 focus:py-2 focus:text-mist"
    >
      Skip to content
    </a>
  );
}
