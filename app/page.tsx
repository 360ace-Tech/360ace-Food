"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import HeroMolecule from "@/components/HeroMolecule";
import {
  ArrowRight,
  Compass,
  LineChart,
  Users,
  Beaker,
  FileText,
  TestTube2,
  BookOpenCheck,
  FileBadge2,
  Mic,
  Ship,
  ClipboardList,
  CheckCircle2,
  Building2,
  Globe2,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tlHero = gsap.timeline();
      tlHero
        .from(".hero-line", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 2.3,
        })
        .to(
          ".hero-text",
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          ".hero-tag",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=1"
        )
        .to(
          "#hero-canvas",
          {
            opacity: 1,
            duration: 2,
          },
          "-=1"
        )
        .to(
          ".hero-card",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=1"
        );

      // Scroll Reveals
      document.querySelectorAll(".reveal-trigger").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      // Marquee Animation
      gsap.to(".marquee-content", {
        xPercent: -100,
        repeat: -1,
        duration: 30,
        ease: "linear",
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Loader />
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative w-full overflow-hidden pt-16 lg:pt-0 min-h-[65vh] lg:min-h-screen">
        <div className="grid lg:grid-cols-2 h-full min-h-screen w-full">
          {/* Left: Typography */}
          <div className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-20 order-2 lg:order-1 z-10 bg-white">
            <div className="overflow-hidden mb-6">
              <div className="hero-tag opacity-0 translate-y-4 inline-flex items-center gap-2 border border-brand-subtle rounded-full px-3 py-1 mb-2 bg-light/80">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.26em] font-semibold text-neutral">
                  PhD-led expertise
                </span>
              </div>
            </div>

            <h1 className="font-display font-bold text-[10.5vw] sm:text-[8.5vw] lg:text-[4.6vw] leading-[0.9] tracking-tighter text-dark mb-8 md:mb-10 text-balance">
              <div className="overflow-hidden">
                <span className="block hero-line">Science-led protection</span>
              </div>
              <div className="overflow-hidden">
                <span className="block hero-line">for resilient, trusted</span>
              </div>
              <div className="overflow-hidden">
                <span className="block hero-line text-brand">food systems.</span>
              </div>
            </h1>

            <p className="hero-text opacity-0 text-base md:text-lg lg:text-xl text-neutral font-normal max-w-xl leading-relaxed mb-10">
              Dr. Ifeoluwa Adekoya helps quality leaders anticipate risk, engineer compliant
              operations, and build consumer confidence through evidence-based strategy, training,
              and research partnerships.
            </p>

            <div className="hero-text opacity-0 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <a
                href="#contact"
                className="group relative px-9 py-4 rounded-full inline-flex items-center justify-center overflow-hidden bg-brand hover:bg-brand/90 text-white transition-all"
              >
                <span className="relative z-10 font-bold text-[11px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Book a consultation
                </span>
              </a>

              <a
                href="#services"
                className="group flex items-center gap-3 text-sm font-medium text-dark hover:text-brand transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-brand-subtle flex items-center justify-center group-hover:border-brand/60 transition-colors">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-[12px] uppercase tracking-[0.25em] font-semibold text-neutral group-hover:text-brand">
                  Explore capabilities
                </span>
              </a>
            </div>
          </div>

          {/* Right: Abstract Visual */}
          <div className="hidden lg:flex relative h-full w-full bg-light order-1 lg:order-2 overflow-hidden items-center justify-center">
            {/* CSS Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Molecule network + leaf nodes (desktop only) */}
            <div className="hidden lg:flex w-full h-full select-none pointer-events-none relative">
              <HeroMolecule />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-8 md:bottom-10 left-6 md:left-auto md:right-10 bg-white/85 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-white shadow-xl z-20 max-w-xs hero-card opacity-0 translate-y-10 hidden lg:block">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl md:text-4xl font-display font-bold text-dark leading-none">
                  10<span className="text-brand text-2xl align-top">+</span>
                </span>
                <LineChart className="text-brand w-5 h-5" />
              </div>
              <p className="text-xs text-neutral leading-relaxed">
                Years delivering quality systems across food, pharma, and research — with ISO
                9001:2015 and Lean Six Sigma Green Belt expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee: Standards & Compliance */}
      <div className="py-10 md:py-12 border-y border-neutral/5 overflow-hidden bg-white">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-neutral/40 mb-6 md:mb-8">
          Standards &amp; Compliance Focus
        </p>
        <div className="marquee-container flex whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity duration-500">
          <div className="marquee-content flex gap-10 md:gap-20 px-8 items-center font-display text-lg md:text-2xl font-semibold text-neutral/40 select-none">
            <span>HACCP PROGRAMS</span>
            <span>GHP &amp; GMP</span>
            <span>BRCGS READINESS</span>
            <span>CFIA GUIDANCE</span>
            <span>ISO 9001:2015</span>
            <span>LEAN SIX SIGMA</span>
            <span>LAB QA SYSTEMS</span>
            <span>HACCP PROGRAMS</span>
            <span>GHP &amp; GMP</span>
            <span>BRCGS READINESS</span>
            <span>CFIA GUIDANCE</span>
            <span>ISO 9001:2015</span>
            <span>LEAN SIX SIGMA</span>
            <span>LAB QA SYSTEMS</span>
          </div>
          <div
            className="marquee-content flex gap-10 md:gap-20 px-8 items-center font-display text-lg md:text-2xl font-semibold text-neutral/40 select-none"
            aria-hidden="true"
          >
            <span>HACCP PROGRAMS</span>
            <span>GHP &amp; GMP</span>
            <span>BRCGS READINESS</span>
            <span>CFIA GUIDANCE</span>
            <span>ISO 9001:2015</span>
            <span>LEAN SIX SIGMA</span>
            <span>LAB QA SYSTEMS</span>
            <span>HACCP PROGRAMS</span>
            <span>GHP &amp; GMP</span>
            <span>BRCGS READINESS</span>
            <span>CFIA GUIDANCE</span>
            <span>ISO 9001:2015</span>
            <span>LEAN SIX SIGMA</span>
            <span>LAB QA SYSTEMS</span>
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <section id="impact" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Overview */}
            <div className="lg:col-span-4 sticky top-28">
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-5 text-dark">
                Impact at a glance.
              </h2>
              <div className="w-12 h-1 bg-brand mb-7"></div>
              <p className="text-neutral text-base md:text-lg leading-relaxed mb-7">
                We deliver science-led food safety, regulatory, and quality assurance consulting
                for organizations ready to elevate compliance and consumer trust.
              </p>
              <ul className="space-y-3 text-sm text-neutral">
                <li className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand"></span>
                  <span>ISO 9001:2015 Lead Auditor &amp; Lean Six Sigma Green Belt.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand"></span>
                  <span>30+ peer-reviewed publications guiding food safety innovation.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Trusted advisor to SMEs, laboratories, and multinational brands.</span>
                </li>
              </ul>
            </div>

            {/* Metrics & Capabilities */}
            <div className="lg:col-span-8 grid gap-10">
              {/* Metrics */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-trigger">
                <div className="card p-5 sm:p-6 flex flex-col justify-between">
                  <span className="text-2xl md:text-3xl font-display font-bold text-dark mb-1">
                    10<span className="text-brand text-xl align-top">+</span>
                  </span>
                  <p className="text-xs md:text-sm text-neutral leading-snug">
                    Years delivering quality systems across food, pharma, and research.
                  </p>
                </div>
                <div className="card p-5 sm:p-6 flex flex-col justify-between">
                  <span className="text-2xl md:text-3xl font-display font-bold text-dark mb-1">
                    30<span className="text-brand text-xl align-top">+</span>
                  </span>
                  <p className="text-xs md:text-sm text-neutral leading-snug">
                    Peer-reviewed publications and technical papers driving innovation.
                  </p>
                </div>
                <div className="card p-5 sm:p-6 flex flex-col justify-between">
                  <span className="text-2xl md:text-3xl font-display font-bold text-dark mb-1">
                    10
                  </span>
                  <p className="text-xs md:text-sm text-neutral leading-snug">
                    African countries supported with training and compliance programs.
                  </p>
                </div>
                <div className="card p-5 sm:p-6 flex flex-col justify-between">
                  <span className="text-2xl md:text-3xl font-display font-bold text-dark mb-1">
                    5<span className="text-brand text-xl align-top">+</span>
                  </span>
                  <p className="text-xs md:text-sm text-neutral leading-snug">
                    Certifications including ISO 9001:2015 Lead Auditor &amp; Lean Six Sigma Green
                    Belt.
                  </p>
                </div>
              </div>

              {/* Capabilities */}
              <div className="grid md:grid-cols-2 gap-6 reveal-trigger">
                <div className="card p-6 sm:p-8">
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-brand mb-4">
                    Core capabilities
                  </p>
                  <ul className="space-y-3 text-sm text-neutral">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-[2px] flex-shrink-0" />
                      <span>HACCP, GMP, and BRC readiness programs.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-[2px] flex-shrink-0" />
                      <span>Laboratory protocol development and validation.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-[2px] flex-shrink-0" />
                      <span>Regulatory and labeling submissions.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand mt-[2px] flex-shrink-0" />
                      <span>Scientific research leadership and publication support.</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6 sm:p-8 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral mb-4">
                    Who we support
                  </p>
                  <ul className="space-y-3 text-sm text-neutral">
                    <li className="flex gap-2">
                      <Building2 className="w-4 h-4 text-brand mt-[2px]" />
                      <span>Food and agri-food manufacturers and processors.</span>
                    </li>
                    <li className="flex gap-2">
                      <TestTube2 className="w-4 h-4 text-brand mt-[2px]" />
                      <span>Quality-control and analytical laboratories.</span>
                    </li>
                    <li className="flex gap-2">
                      <Globe2 className="w-4 h-4 text-brand mt-[2px]" />
                      <span>Exporters and importers targeting Canadian markets.</span>
                    </li>
                    <li className="flex gap-2">
                      <GraduationCap className="w-4 h-4 text-brand mt-[2px]" />
                      <span>Researchers, academic teams, and policy stakeholders.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 bg-light border-t border-neutral/5">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <div>
              <span className="font-mono text-[11px] text-brand uppercase tracking-[0.32em] mb-3 block">
                Services
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tight text-dark mb-3">
                End-to-end programs tailored to your operating reality.
              </h2>
              <p className="text-neutral text-sm md:text-base max-w-xl">
                Modular engagements that strengthen compliance, accelerate innovation, and empower
                teams to own food safety outcomes.
              </p>
            </div>
            <div className="flex gap-3 text-[11px] font-mono uppercase tracking-[0.26em] text-neutral/60">
              <span className="px-3 py-1 rounded-full border border-brand-subtle bg-white/70">
                Training
              </span>
              <span className="px-3 py-1 rounded-full border border-brand-subtle bg-white/70">
                Advisory
              </span>
              <span className="px-3 py-1 rounded-full border border-brand-subtle bg-white/70">
                Research
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">
            {/* Service 1 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Food Safety &amp; GMP Training
                  </h3>
                  <p className="text-sm text-neutral">
                    From compliance to excellence — onsite and virtual programs that embed Good
                    Manufacturing and Hygienic Practices into daily operations and strengthen
                    food-safety culture.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
                  <span>
                    GMP/GHP &amp; Food Safety training for production, QA, and leadership teams.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
                  <span>Training records, certificates, and audit-ready documentation.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
                  <span>Competency evaluation and follow-up refresher sessions.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
                  <span>Real-world examples and guidance tailored to each facility.</span>
                </li>
              </ul>
            </article>

            {/* Service 2 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Technical Training
                  </h3>
                  <p className="text-sm text-neutral">
                    Building technical confidence from farm to fork — specialized trainings that
                    strengthen analytical, processing, and quality skills.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Food Safety and Microbiology.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Food Processing and Preservation.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Food Laws and Legislation.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Quality and Regulatory Compliance.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Allergen Management and Label Control.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Root Cause Analysis and Internal Auditing.</span></li>
              </ul>
            </article>

            {/* Service 3 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Quality System Documentation
                  </h3>
                  <p className="text-sm text-neutral">
                    Clear, practical, and audit-ready documentation that fits your operations.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>SOP &amp; SSOP development aligned with CFIA, Health Canada, and global standards.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Tailored, workflow-based procedures for every department.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Records designed for easy audit presentation.</span></li>
              </ul>
            </article>

            {/* Service 4 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Laboratory Methods Advisory &amp; Training
                  </h3>
                  <p className="text-sm text-neutral">
                    From testing to trust — building reliable, compliant laboratory systems through
                    practical, results-focused programs.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <TestTube2 className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Guidance on selection of food-testing methods.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Training in sampling, analysis, and data interpretation.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Coordination with accredited third-party laboratories.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Ongoing technical troubleshooting and method optimization.</span></li>
              </ul>
            </article>

            {/* Service 5 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Research Support
                  </h3>
                  <p className="text-sm text-neutral">
                    From concept to publication — structured guidance that enhances scientific rigor
                    and credibility.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <BookOpenCheck className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Research design, data organization, and protocol development.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Statistical analysis and data interpretation.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Experimental method development for food &amp; agri-food studies.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Manuscript formatting and journal submission support.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Academic and technical manuscript review and plagiarism check.</span></li>
              </ul>
            </article>

            {/* Service 6 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Proposal &amp; Grant Development
                  </h3>
                  <p className="text-sm text-neutral">
                    From ideas to impact — transforming research and industry concepts into
                    funder-ready proposals.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <FileBadge2 className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Proposal review for clarity, alignment, and technical accuracy.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Grant-writing support for research, community, or industry projects.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Advisory assistance for reporting, resubmission, and funder feedback.</span></li>
              </ul>
            </article>

            {/* Service 7 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Conference &amp; Insight Support
                  </h3>
                  <p className="text-sm text-neutral">
                    Elevating thought leadership through evidence-rich storytelling and impactful
                    knowledge sharing.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Conference planning, session coordination, and speaker management.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Presentation &amp; poster development with data-driven visuals.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Training &amp; workshop facilitation for diverse audiences.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Impact reporting and capacity-building documentation.</span></li>
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-brand hover:text-brand/70 mt-2"
              >
                View conferences we have supported
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </article>

            {/* Service 8 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Food Import Readiness &amp; Compliance
                  </h3>
                  <p className="text-sm text-neutral">
                    From source to shelf — ensuring imported food products meet Canadian safety and
                    labeling standards.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>CFIA &amp; Health Canada guidance for specific product categories.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Import permits, documentation, and compliance preparation.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Advisory on food product analysis to ensure safety and quality.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Packaging, labeling, and market-entry advisory.</span></li>
              </ul>
            </article>

            {/* Service 9 */}
            <article className="card p-7 sm:p-8 flex flex-col justify-between gap-5 reveal-trigger">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-xl mb-2 text-dark">
                    Regulatory &amp; Audit Readiness
                  </h3>
                  <p className="text-sm text-neutral">
                    From compliance to confidence — systems, documentation, and training that keep
                    you inspection-ready.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-brand" />
                </div>
              </div>
              <ul className="list-none pl-0 m-0 space-y-2 text-[13px] text-neutral">
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Advisory and on-site audit support (CFIA, BRCGS, customer, and internal audits).</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Local and international regulatory compliance interpretation and implementation.</span></li>
                <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span><span>Nutritional value calculation &amp; compliant labeling for retail markets.</span></li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl mb-12 md:mb-16">
            <span className="font-mono text-[11px] text-brand uppercase tracking-[0.32em] mb-3 block">
              Engagement model
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-dark mb-4">
              Clarity at every stage of engagement.
            </h2>
            <p className="text-neutral text-sm md:text-base">
              A partnership designed to reveal insights quickly, with precision, and sustain
              measurable performance.
            </p>
          </div>

          <div className="grid md:[grid-template-columns:0.7fr_1.3fr] gap-12 items-start">
            {/* Vertical line / labels */}
            <div className="hidden md:flex flex-col items-start">
              <p className="text-[11px] font-mono uppercase tracking-[0.32em] text-neutral/50 mb-4">
                From first call to continuous improvement
              </p>
              <div className="relative pl-4">
                <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-brand/40 via-slate-200 to-brand/40"></div>
                <ul className="space-y-8 text-sm text-neutral">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-semibold">
                      1
                    </span>
                    <span>Assess: understand your current systems &amp; objectives.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-semibold">
                      2
                    </span>
                    <span>Design: co-create tailored plans and documentation.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-semibold">
                      3
                    </span>
                    <span>Implement: deliver training &amp; advisory sessions.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-semibold">
                      4
                    </span>
                    <span>Monitor: review data, audits, and system performance.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-semibold">
                      5
                    </span>
                    <span>Elevate: embed continuous improvement &amp; innovation.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-5">
              <div className="card p-6 md:p-7 reveal-trigger">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-neutral/60 mb-2">
                  Step 01
                </p>
                <h3 className="font-display font-semibold text-xl mb-2">Assess</h3>
                <p className="text-sm text-neutral">
                  We evaluate your current systems, workflows, and goals to identify compliance gaps
                  and opportunities for improvement across your value chain.
                </p>
              </div>
              <div className="card p-6 md:p-7 reveal-trigger">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-neutral/60 mb-2">
                  Step 02
                </p>
                <h3 className="font-display font-semibold text-xl mb-2">Design</h3>
                <p className="text-sm text-neutral">
                  We create tailored solutions — training programs, documentation, compliance
                  strategies, or project plans — aligned with your operations and objectives.
                </p>
              </div>
              <div className="card p-6 md:p-7 reveal-trigger">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-neutral/60 mb-2">
                  Step 03
                </p>
                <h3 className="font-display font-semibold text-xl mb-2">Implement</h3>
                <p className="text-sm text-neutral">
                  We deliver practical, hands-on support through onsite or virtual training,
                  advisory sessions, and technical collaboration with your teams.
                </p>
              </div>
              <div className="card p-6 md:p-7 reveal-trigger">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-neutral/60 mb-2">
                  Step 04
                </p>
                <h3 className="font-display font-semibold text-xl mb-2">Monitor</h3>
                <p className="text-sm text-neutral">
                  We track progress, measure results, and verify compliance to ensure your systems
                  remain effective, audit-ready, and resilient.
                </p>
              </div>
              <div className="card p-6 md:p-7 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 reveal-trigger">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-neutral/60 mb-2">
                  Step 05
                </p>
                <h3 className="font-display font-semibold text-xl mb-2">Elevate</h3>
                <p className="text-sm text-neutral mb-4">
                  We strengthen long-term capability and drive continuous improvement — empowering
                  your team to sustain excellence and stay ahead of industry standards.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand hover:text-brand/70"
                >
                  Discuss your roadmap
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-light border-t border-neutral/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <span className="font-mono text-[11px] text-brand uppercase tracking-[0.32em] mb-3 block">
                Featured expertise
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-dark">
                Meet our experts.
              </h2>
            </div>
            <p className="text-neutral text-sm md:text-base max-w-md">
              PhD-trained specialists with experience across food manufacturing, laboratories,
              academia, and regulatory-focused research programs in Africa and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {/* Expert 1 */}
            <article className="card p-6 sm:p-8 flex flex-col gap-5 md:gap-6 reveal-trigger">
              <div className="flex items-start gap-5">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/ifeoluwa-placeholder.png"
                    alt="Dr. Ifeoluwa Adekoya"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg md:text-xl text-dark">
                    Dr. Ifeoluwa Adekoya
                  </h3>
                  <p className="text-[13px] text-brand font-semibold mb-2">
                    PhD Food Technologist
                  </p>
                  <p className="text-sm text-neutral">
                    PhD Food Technologist, ISO 9001:2015 Lead Auditor, and Lean Six Sigma Green Belt
                    with a decade of impact across the food, research, and pharmaceutical
                    industries.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral/60 mb-2">
                    Credentials
                  </p>
                  <ul className="space-y-2 text-[13px] text-neutral">
                    <li>ISO 9001:2015 Lead Auditor &amp; Lean Six Sigma Green Belt.</li>
                    <li>30+ peer-reviewed publications guiding food safety innovation.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral/60 mb-2">
                    Collaborations
                  </p>
                  <ul className="space-y-2 text-[13px] text-neutral">
                    <li>Council for Scientific and Industrial Research (CSIR).</li>
                    <li>International Association for Food Protection (IAFP).</li>
                    <li>Agri-food SMEs and leading laboratories across Africa.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Expert 2 */}
            <article className="card p-6 sm:p-8 flex flex-col gap-5 md:gap-6 reveal-trigger">
              <div className="flex items-start gap-5">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/jb.jpeg"
                    alt="Dr. Ajibola Oyedeji"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg md:text-xl text-dark">
                    Dr. Ajibola Oyedeji
                  </h3>
                  <p className="text-[13px] text-brand font-semibold mb-2">
                    Food Scientist (PhD Food Science and Technology)
                  </p>
                  <p className="text-sm text-neutral">
                    Over ten years of experience in research, quality assurance, methods and product
                    development, and laboratory analysis across food systems.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral/60 mb-2">
                    Credentials
                  </p>
                  <ul className="space-y-2 text-[13px] text-neutral">
                    <li>10+ years in research, QA, and laboratory analysis.</li>
                    <li>PhD in Food Science and Technology.</li>
                    <li>ISO 17025-compliant methods and QA framework development.</li>
                    <li>Leadership in product development and process optimization.</li>
                    <li>40+ Web of Science-indexed publications and contributions.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral/60 mb-2">
                    Collaborations
                  </p>
                  <ul className="space-y-2 text-[13px] text-neutral">
                    <li>Food manufacturers and processors.</li>
                    <li>Accredited testing laboratories.</li>
                    <li>Academic and policy bodies.</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 md:mb-14">
            <div>
              <span className="font-mono text-[11px] text-brand uppercase tracking-[0.32em] mb-3 block">
                Insights
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-dark mb-2">
                Timely intelligence for your quality teams.
              </h2>
              <p className="text-neutral text-sm md:text-base max-w-xl">
                Curated articles that keep stakeholders proactive on emerging risks and regulatory
                change.
              </p>
            </div>
            <a
              href="/insights"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand hover:text-brand/70"
            >
              View all insights
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Article 1 */}
            <article className="card p-6 md:p-7 reveal-trigger hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 transition-transform duration-300">
              <p className="text-[11px] font-mono uppercase tracking-[0.32em] text-neutral/60 mb-3">
                July 18, 2024
              </p>
              <h3 className="font-display font-semibold text-xl mb-3 text-dark">
                Engineering safer food systems through proactive compliance
              </h3>
              <p className="text-sm text-neutral mb-4">
                How forward-looking quality teams can blend science, technology, and culture to stay
                ahead of regulatory demands.
              </p>
              <a
                href="/insights/engineering-safe-systems"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand hover:text-brand/70"
              >
                Read article
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </article>

            {/* Article 2 */}
            <article className="card p-6 md:p-7 reveal-trigger hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 transition-transform duration-300">
              <p className="text-[11px] font-mono uppercase tracking-[0.32em] text-neutral/60 mb-3">
                June 2, 2024
              </p>
              <h3 className="font-display font-semibold text-xl mb-3 text-dark">
                Designing food safety training that sticks
              </h3>
              <p className="text-sm text-neutral mb-4">
                Move beyond slide decks with immersive learning experiences that shift frontline
                behaviour.
              </p>
              <a
                href="/insights/designing-training-that-sticks"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand hover:text-brand/70"
              >
                Read article
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),transparent_55%),radial-gradient(circle_at_bottom,_rgba(248,113,113,0.16),transparent_55%)] opacity-70 pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-brand-subtle mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-[0.32em] text-neutral">
              Partner with us
            </span>
          </div>

          <h2 className="font-display font-bold text-[9vw] md:text-[4.5vw] leading-[0.95] tracking-tight text-dark mb-5">
            Ready to elevate your food safety posture?
          </h2>
          <p className="text-neutral text-sm md:text-base max-w-2xl mx-auto mb-10">
            Let's co-design a roadmap that aligns compliance, capability, and innovation across your
            value chain. Share your current challenges and we will respond with a clear,
            science-backed path forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="/contact"
              className="px-9 py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 w-full sm:w-auto"
            >
              Book a consultation
            </a>
            <a
              href="#services"
              className="px-9 py-4 bg-white border border-brand-subtle text-dark rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
            >
              Explore services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
