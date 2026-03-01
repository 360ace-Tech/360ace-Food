"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import data from "@/data/consultants.json" assert { type: "json" };
import site from "@/data/site";
import JsonLd from "@/components/JsonLd";
import { Award, Share2, Home } from "lucide-react";
// Note: generateMetadata cannot be exported from a client component; if needed,
// we can move metadata logic into a server layout or route-level layout.

type Consultant = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string[];
  credentials: string[];
};

export default function BioPage() {
  const params = useParams();
  const id = params.id as string;
  const consultant = (data as Consultant[]).find((c) => c.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const ctx = gsap.context(() => {
      gsap.from(".bio-hero, .bio-content > *", { opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  if (!consultant) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-neutral">Consultant not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />

      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1100px] mx-auto bio-hero">
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Person",
              name: consultant.name,
              image: consultant.avatar,
              url: `${site.url}/bio/${consultant.id}`,
              jobTitle: consultant.role || null,
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Experts", item: `${site.url}/#experts` },
                { "@type": "ListItem", position: 3, name: consultant.name, item: `${site.url}/bio/${consultant.id}` },
              ],
            }}
          />
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-neutral">
              <li>
                <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
                  <Home className="w-4 h-4" /> Home
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href="/#experts" className="hover:text-brand">Experts</Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-dark font-medium">{consultant.name}</li>
            </ol>
          </nav>
          <div className="grid grid-cols-[auto,1fr] gap-4 md:gap-8 items-start">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
              <Image src={consultant.avatar} alt={consultant.name} width={256} height={256} className="w-full h-full object-cover object-[50%_0%] lg:object-center" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-dark mb-1">{consultant.name}</h1>
              {consultant.role && <p className="text-brand font-semibold">{consultant.role}</p>}
              <div className="mt-3"><button className="inline-flex items-center gap-2 text-sm text-neutral hover:text-brand" onClick={() => navigator.share?.({ title: consultant.name, url: typeof window!=="undefined"?window.location.href:undefined }).catch(()=>{})}><Share2 className="w-4 h-4" /> Share</button></div>
              <article className="mt-4 md:mt-6 card p-5 md:p-8 bio-content">
                {consultant.bio.map((p, i) => (
                  <p className="text-neutral mb-4" key={i}>{p}</p>
                ))}
              </article>
            </div>
            <aside className="mt-6 col-span-2 card p-6 md:p-8">
              <h2 className="font-display font-semibold text-xl text-dark mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-brand" /> Credentials</h2>
              <ul className="space-y-2 text-sm text-neutral">
                {consultant.credentials.map((c, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand" /> <span>{c}</span></li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
