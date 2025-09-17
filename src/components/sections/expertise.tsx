import Image from 'next/image';
import { getRecognitions } from '@/lib/content';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export function Expertise() {
  const recognitions = getRecognitions();

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Featured Expertise"
          title="Meet Dr. Ifeoluwa Adekoya"
          description="PhD Food Technologist, ISO 9001:2015 Lead Auditor, and Lean Six Sigma Green Belt with a decade of impact across the food, research, and pharmaceutical industries."
        />
      </Reveal>
      <div className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Reveal className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-white/95 p-6 text-slate shadow-brand" delay={0.05}>
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate/10">
            <Image
              src="/images/ifeoluwa-placeholder.png"
              alt="Dr. Ifeoluwa Adekoya"
              width={600}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-6 text-sm text-slate/70">
            Dr. Adekoya partners with institutions like CSIR and IAFP to deliver high-impact training, compliance programs,
            and scientific research support that strengthen Africa's food systems.
          </p>
        </Reveal>
        <div className="space-y-6">
          <Reveal className="rounded-3xl border border-emerald-900/10 bg-white/95 p-8 text-slate shadow-brand" delay={0.1}>
            <p className="text-sm uppercase tracking-[0.32em] text-slate/60">Recognitions</p>
            <ul className="mt-5 space-y-4 text-sm text-slate/70">
              {recognitions.map((recognition) => (
                <li key={recognition.name}>
                  <p className="font-semibold text-midnight">{recognition.name}</p>
                  <p>{recognition.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-emerald-900/10 bg-white/95 p-8 text-slate shadow-brand" delay={0.15}>
            <p className="text-sm uppercase tracking-[0.32em] text-slate/60">Collaboration Highlights</p>
            <ul className="mt-5 space-y-2 text-sm text-slate/70">
              <li>Council for Scientific and Industrial Research (CSIR)</li>
              <li>International Association for Food Protection (IAFP)</li>
              <li>Agri-food SMEs and leading laboratories across Africa</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
