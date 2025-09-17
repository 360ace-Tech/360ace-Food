import { Hero } from '@/components/sections/hero';
import { TrustedStrip } from '@/components/sections/trusted-strip';
import { ServicesGrid } from '@/components/sections/services-grid';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { Expertise } from '@/components/sections/expertise';
import { Testimonials } from '@/components/sections/testimonials';
import { Insights } from '@/components/sections/insights';
import { CTABand } from '@/components/sections/cta-band';
import { getBlogSummaries } from '@/lib/blog';

export default async function MarketingPage() {
  const insights = (await getBlogSummaries()).slice(0, 3);

  return (
    <div className="pb-24">
      <Hero />
      <TrustedStrip />
      <ServicesGrid />
      <ProcessTimeline />
      <Expertise />
      <Testimonials />
      <Insights posts={insights} />
      <CTABand />
    </div>
  );
}
