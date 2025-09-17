import Link from 'next/link';
import Image from 'next/image';
import { getBlogSummaries } from '@/lib/blog';
import { formatDate } from '@/lib/date';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export default async function InsightsPage() {
  const posts = await getBlogSummaries();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-6 pb-24 pt-24">
      <Reveal variant="fade-in">
        <div className="rounded-3xl border border-emerald-900/10 bg-white/95 p-10 shadow-brand">
          <SectionHeading
            eyebrow="Insights"
            title="Ideas to keep your food systems resilient"
            description="Explore deep dives on compliance strategy, training design, and research partnerships from Dr. Ifeoluwa Adekoya."
          />
        </div>
      </Reveal>
      <div className="grid gap-12">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={0.05 * index}>
            <article
              className="group overflow-hidden rounded-3xl border border-emerald-900/10 bg-white/95 shadow-brand transition hover:-translate-y-1 hover:border-ember/40"
            >
              <Link href={`/insights/${post.slug}`} className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[220px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-ember/15 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <Image
                    src={post.heroImage ?? '/images/blog-lab.jpg'}
                    alt={post.title}
                    width={640}
                    height={420}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-8">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate/60">
                    <span>{formatDate(post.date)}</span>
                    {post.tags?.length ? <span className="text-ember">{post.tags[0]}</span> : null}
                  </div>
                  <h2 className="font-display text-3xl text-midnight group-hover:text-ember">{post.title}</h2>
                  <p className="text-sm text-slate/70">{post.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-ember">
                    Read article
                    <span aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
